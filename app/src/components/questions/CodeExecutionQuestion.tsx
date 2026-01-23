"use client";

import { useState, useCallback } from "react";
import { Question } from "@/types";

interface CodeExecutionQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean, output: string) => void;
  disabled?: boolean;
}

// Piston API language mappings
const PISTON_LANGUAGES: Record<string, { language: string; version: string }> = {
  c: { language: "c", version: "10.2.0" },
  cpp: { language: "c++", version: "10.2.0" },
  java: { language: "java", version: "15.0.2" },
  python: { language: "python", version: "3.10.0" },
};

interface PistonResponse {
  run: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
  compile?: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
}

export default function CodeExecutionQuestion({
  question,
  onAnswer,
  disabled = false,
}: CodeExecutionQuestionProps) {
  const [code, setCode] = useState(question.starterCode || "");
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [testResults, setTestResults] = useState<
    { input: string; expected: string; actual: string; passed: boolean }[]
  >([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const runCode = useCallback(
    async (input: string = ""): Promise<{ output: string; error: string | null }> => {
      const langConfig = PISTON_LANGUAGES[question.language || "python"];
      if (!langConfig) {
        return { output: "", error: `Unsupported language: ${question.language}` };
      }

      try {
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: langConfig.language,
            version: langConfig.version,
            files: [
              {
                name: getFileName(question.language || "python"),
                content: code,
              },
            ],
            stdin: input,
          }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const result: PistonResponse = await response.json();

        // Check for compilation errors
        if (result.compile && result.compile.code !== 0) {
          return {
            output: "",
            error: `Compilation error:\n${result.compile.stderr || result.compile.output}`,
          };
        }

        // Check for runtime errors
        if (result.run.code !== 0 && result.run.stderr) {
          return {
            output: result.run.stdout,
            error: `Runtime error:\n${result.run.stderr}`,
          };
        }

        return {
          output: result.run.stdout.trim(),
          error: null,
        };
      } catch (err) {
        return {
          output: "",
          error: err instanceof Error ? err.message : "Unknown error occurred",
        };
      }
    },
    [code, question.language]
  );

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setError(null);
    setOutput("");

    const result = await runCode();
    setOutput(result.output);
    setError(result.error);
    setIsRunning(false);
  }, [runCode]);

  const handleSubmit = useCallback(async () => {
    if (!question.testCases || question.testCases.length === 0) {
      // No test cases, just run the code
      await handleRun();
      return;
    }

    setIsRunning(true);
    setError(null);
    setTestResults([]);

    const results: { input: string; expected: string; actual: string; passed: boolean }[] = [];
    let allPassed = true;

    for (const testCase of question.testCases) {
      const result = await runCode(testCase.input);

      if (result.error) {
        results.push({
          input: testCase.input,
          expected: testCase.expectedOutput,
          actual: result.error,
          passed: false,
        });
        allPassed = false;
      } else {
        const passed = normalizeOutput(result.output) === normalizeOutput(testCase.expectedOutput);
        results.push({
          input: testCase.input,
          expected: testCase.expectedOutput,
          actual: result.output,
          passed,
        });
        if (!passed) allPassed = false;
      }
    }

    setTestResults(results);
    setSubmitted(true);
    setIsCorrect(allPassed);
    setIsRunning(false);
    onAnswer(allPassed, results.map((r) => r.actual).join("\n"));
  }, [question.testCases, runCode, handleRun, onAnswer]);

  const getLanguageLabel = (lang: string) => {
    const labels: Record<string, string> = {
      c: "C",
      cpp: "C++",
      java: "Java",
      python: "Python",
    };
    return labels[lang] || lang;
  };

  return (
    <div className="space-y-4">
      {/* Language badge */}
      <div className="flex items-center gap-2">
        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded">
          {getLanguageLabel(question.language || "python")}
        </span>
        {question.testCases && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {question.testCases.length} test case{question.testCases.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Code editor */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={disabled || submitted}
          spellCheck={false}
          className="w-full h-48 p-3 font-mono text-sm bg-gray-900 text-gray-100 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none disabled:opacity-60"
          placeholder="Write your code here..."
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning || disabled || submitted}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs font-medium rounded disabled:opacity-50 flex items-center gap-1"
          >
            {isRunning ? (
              <>
                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Running...
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Run
              </>
            )}
          </button>
        </div>
      </div>

      {/* Output */}
      {(output || error) && !submitted && (
        <div className="p-3 bg-gray-800 rounded-lg">
          <div className="text-xs font-medium text-gray-400 mb-2">Output:</div>
          <pre className={`font-mono text-sm whitespace-pre-wrap ${error ? "text-red-400" : "text-green-400"}`}>
            {error || output || "(no output)"}
          </pre>
        </div>
      )}

      {/* Test results */}
      {submitted && testResults.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Test Results: {testResults.filter((r) => r.passed).length}/{testResults.length} passed
          </div>
          {testResults.map((result, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg text-sm ${
                result.passed
                  ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {result.passed ? (
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                <span className={`font-medium ${result.passed ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}>
                  Test Case {index + 1}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 font-mono text-xs">
                <div>
                  <span className="text-gray-500">Input:</span>
                  <pre className="text-gray-700 dark:text-gray-300 mt-1">{result.input || "(empty)"}</pre>
                </div>
                <div>
                  <span className="text-gray-500">Expected:</span>
                  <pre className="text-gray-700 dark:text-gray-300 mt-1">{result.expected}</pre>
                </div>
                <div>
                  <span className="text-gray-500">Actual:</span>
                  <pre className={`mt-1 ${result.passed ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                    {result.actual || "(empty)"}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submit button */}
      {!submitted && !disabled && question.testCases && question.testCases.length > 0 && (
        <button
          onClick={handleSubmit}
          disabled={isRunning || !code.trim()}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center gap-2"
        >
          {isRunning ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Running Tests...
            </>
          ) : (
            "Submit Solution"
          )}
        </button>
      )}

      {/* Final result */}
      {submitted && (
        <div
          className={`p-3 rounded-lg text-sm ${
            isCorrect
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
              : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
          }`}
        >
          <p className="font-medium">
            {isCorrect ? "All tests passed!" : "Some tests failed"}
          </p>
          <p className="mt-1 opacity-80">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}

// Helper functions
function getFileName(lang: string): string {
  const extensions: Record<string, string> = {
    c: "main.c",
    cpp: "main.cpp",
    java: "Main.java",
    python: "main.py",
  };
  return extensions[lang] || "main.txt";
}

function normalizeOutput(output: string): string {
  return output.trim().replace(/\r\n/g, "\n").replace(/\s+$/gm, "");
}
