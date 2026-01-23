"use client";

import { useState, useCallback, useMemo } from "react";
import { Question } from "@/types";

interface MatchingQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean, matches: Record<number, number>) => void;
  disabled?: boolean;
}

export default function MatchingQuestion({
  question,
  onAnswer,
  disabled = false,
}: MatchingQuestionProps) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Shuffle right column items
  const shuffledRightIndices = useMemo(() => {
    if (!question.matchingPairs) return [];
    const indices = question.matchingPairs.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, [question.matchingPairs]);

  const handleLeftClick = useCallback(
    (leftIndex: number) => {
      if (disabled || submitted) return;
      setSelectedLeft(selectedLeft === leftIndex ? null : leftIndex);
    },
    [disabled, submitted, selectedLeft]
  );

  const handleRightClick = useCallback(
    (rightIndex: number) => {
      if (disabled || submitted || selectedLeft === null) return;

      // Check if this right item is already matched
      const existingLeftForRight = Object.entries(matches).find(
        ([, r]) => r === rightIndex
      );
      if (existingLeftForRight) {
        // Remove existing match
        const newMatches = { ...matches };
        delete newMatches[parseInt(existingLeftForRight[0])];
        setMatches(newMatches);
      }

      // Create new match
      setMatches((prev) => ({
        ...prev,
        [selectedLeft]: rightIndex,
      }));
      setSelectedLeft(null);
    },
    [disabled, submitted, selectedLeft, matches]
  );

  const removeMatch = useCallback(
    (leftIndex: number) => {
      if (disabled || submitted) return;
      const newMatches = { ...matches };
      delete newMatches[leftIndex];
      setMatches(newMatches);
    },
    [disabled, submitted, matches]
  );

  const handleSubmit = useCallback(() => {
    if (!question.matchingPairs) return;

    // Check if all items are matched
    if (Object.keys(matches).length !== question.matchingPairs.length) {
      return;
    }

    // Check if all matches are correct (left index should match right index)
    const correct = Object.entries(matches).every(
      ([leftIdx, rightIdx]) => parseInt(leftIdx) === rightIdx
    );

    setSubmitted(true);
    setIsCorrect(correct);
    onAnswer(correct, matches);
  }, [matches, question.matchingPairs, onAnswer]);

  if (!question.matchingPairs) {
    return <div>Invalid matching question configuration</div>;
  }

  const allMatched = Object.keys(matches).length === question.matchingPairs.length;

  // Get colors for matched pairs
  const matchColors = [
    { bg: "bg-blue-100 dark:bg-blue-900/30", border: "border-blue-400", line: "#60a5fa" },
    { bg: "bg-green-100 dark:bg-green-900/30", border: "border-green-400", line: "#4ade80" },
    { bg: "bg-purple-100 dark:bg-purple-900/30", border: "border-purple-400", line: "#c084fc" },
    { bg: "bg-orange-100 dark:bg-orange-900/30", border: "border-orange-400", line: "#fb923c" },
    { bg: "bg-pink-100 dark:bg-pink-900/30", border: "border-pink-400", line: "#f472b6" },
    { bg: "bg-cyan-100 dark:bg-cyan-900/30", border: "border-cyan-400", line: "#22d3ee" },
  ];

  const getMatchColor = (leftIndex: number) => {
    const matchedIndices = Object.keys(matches).map(Number).sort((a, b) => a - b);
    const colorIndex = matchedIndices.indexOf(leftIndex);
    return colorIndex >= 0 ? matchColors[colorIndex % matchColors.length] : null;
  };

  const getRightMatchColor = (rightIndex: number) => {
    const leftIndex = Object.entries(matches).find(([, r]) => r === rightIndex)?.[0];
    if (leftIndex === undefined) return null;
    return getMatchColor(parseInt(leftIndex));
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
        Match each item on the left with its corresponding item on the right:
      </p>

      <div className="grid grid-cols-2 gap-4">
        {/* Left column */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
            Terms
          </div>
          {question.matchingPairs.map((pair, leftIndex) => {
            const matchColor = getMatchColor(leftIndex);
            const isMatched = matches[leftIndex] !== undefined;
            const isSelected = selectedLeft === leftIndex;
            const matchIsCorrect = submitted && matches[leftIndex] === leftIndex;
            const matchIsWrong = submitted && isMatched && matches[leftIndex] !== leftIndex;

            return (
              <button
                key={`left-${leftIndex}`}
                onClick={() => handleLeftClick(leftIndex)}
                disabled={disabled || submitted}
                className={`
                  w-full text-left p-3 rounded-lg border-2 transition-all text-sm
                  ${isSelected ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 ring-2 ring-indigo-300" : ""}
                  ${matchColor && !submitted ? `${matchColor.bg} ${matchColor.border}` : ""}
                  ${matchIsCorrect ? "border-green-500 bg-green-50 dark:bg-green-900/20" : ""}
                  ${matchIsWrong ? "border-red-500 bg-red-50 dark:bg-red-900/20" : ""}
                  ${!isSelected && !matchColor && !submitted ? "border-gray-200 dark:border-gray-600 hover:border-indigo-400" : ""}
                  ${disabled || submitted ? "cursor-default" : "cursor-pointer"}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-white">{pair.left}</span>
                  {isMatched && !submitted && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeMatch(leftIndex);
                      }}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  {submitted && (
                    matchIsCorrect ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : matchIsWrong ? (
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : null
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right column */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
            Definitions
          </div>
          {shuffledRightIndices.map((rightIndex) => {
            const pair = question.matchingPairs![rightIndex];
            const matchColor = getRightMatchColor(rightIndex);
            const isMatched = Object.values(matches).includes(rightIndex);

            return (
              <button
                key={`right-${rightIndex}`}
                onClick={() => handleRightClick(rightIndex)}
                disabled={disabled || submitted || selectedLeft === null}
                className={`
                  w-full text-left p-3 rounded-lg border-2 transition-all text-sm
                  ${matchColor ? `${matchColor.bg} ${matchColor.border}` : ""}
                  ${!matchColor && selectedLeft !== null ? "border-gray-200 dark:border-gray-600 hover:border-indigo-400" : ""}
                  ${!matchColor && selectedLeft === null ? "border-gray-200 dark:border-gray-600" : ""}
                  ${disabled || submitted || selectedLeft === null ? "cursor-default" : "cursor-pointer"}
                `}
              >
                <span className="text-gray-900 dark:text-white">{pair.right}</span>
              </button>
            );
          })}
        </div>
      </div>

      {!submitted && !disabled && (
        <button
          onClick={handleSubmit}
          disabled={!allMatched}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          {allMatched ? "Check Matches" : `Match all items (${Object.keys(matches).length}/${question.matchingPairs.length})`}
        </button>
      )}

      {submitted && (
        <div
          className={`p-3 rounded-lg text-sm ${
            isCorrect
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
              : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
          }`}
        >
          <p className="font-medium">{isCorrect ? "All correct!" : "Some matches are incorrect"}</p>
          <p className="mt-1 opacity-80">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
