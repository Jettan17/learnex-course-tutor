"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getTopic, getCourse } from "@/data/courses";
import { getQuestionsForTopic } from "@/data/questions";
import { Question } from "@/types";
import { updateTopicProgress, getTopicProgress, updateCard, getCard } from "@/lib/storage";
import { createCard, scheduleCard } from "@/lib/fsrs";
import { DragDropQuestion, MatchingQuestion, CodeExecutionQuestion } from "@/components/questions";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const topicId = params.topicId as string;

  const course = getCourse(courseId);
  const topic = getTopic(courseId, topicId);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<{ correct: boolean; questionId: string }[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    // Shuffle and select up to 5 questions
    const topicQuestions = getQuestionsForTopic(topicId);
    const shuffled = [...topicQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, Math.min(5, shuffled.length)));
  }, [topicId]);

  if (!course || !topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="glass-card rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Quiz not found
          </h1>
          <Link href="/courses" className="btn-primary inline-block">
            ← Back to courses
          </Link>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="glass-card rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No questions available
          </h1>
          <Link href={`/courses/${courseId}/${topicId}`} className="btn-primary inline-block">
            ← Back to topic
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    // Handle different question types
    let isCorrect = false;
    if (currentQuestion.type === 'true_false') {
      // For true/false: selectedAnswer is index (0=True, 1=False)
      // correctAnswer is string ('true' or 'false')
      const selectedValue = selectedAnswer === 0 ? 'true' : 'false';
      isCorrect = selectedValue === currentQuestion.correctAnswer;
    } else {
      // For MCQ and code_trace: both are numeric indices
      isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    }

    setShowResult(true);
    setAnswers([...answers, { correct: isCorrect, questionId: currentQuestion.id }]);

    // Update FSRS card
    let card = getCard(currentQuestion.id);
    if (!card) {
      card = createCard(currentQuestion.id, topicId);
    }
    const rating = isCorrect ? 3 : 1; // Good or Again
    const updatedCard = scheduleCard(card, rating as 1 | 2 | 3 | 4);
    updateCard(updatedCard.card);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz complete - calculate if last answer was correct
      let lastAnswerCorrect = false;
      if (currentQuestion.type === 'true_false') {
        const selectedValue = selectedAnswer === 0 ? 'true' : 'false';
        lastAnswerCorrect = selectedValue === currentQuestion.correctAnswer;
      } else {
        lastAnswerCorrect = selectedAnswer === currentQuestion.correctAnswer;
      }
      const correctCount = answers.filter((a) => a.correct).length + (lastAnswerCorrect ? 1 : 0);
      const totalQuestions = questions.length;
      const accuracy = Math.round((correctCount / totalQuestions) * 100);

      // Update progress
      const existingProgress = getTopicProgress(topicId);
      updateTopicProgress(topicId, {
        questionsAttempted: (existingProgress?.questionsAttempted || 0) + totalQuestions,
        questionsCorrect: (existingProgress?.questionsCorrect || 0) + correctCount,
        masteryLevel: Math.min(100, Math.max(existingProgress?.masteryLevel || 0, accuracy)),
        lastReviewedAt: new Date().toISOString(),
      });

      setQuizComplete(true);
    }
  };

  if (quizComplete) {
    const correctCount = answers.filter((a) => a.correct).length;
    const accuracy = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="glass-card rounded-2xl p-8 text-center">
          <div className="mb-6">
            <div
              className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl ${
                accuracy >= 80
                  ? "bg-gradient-to-br from-emerald-400 to-emerald-600"
                  : accuracy >= 60
                  ? "bg-gradient-to-br from-amber-400 to-orange-500"
                  : "bg-gradient-to-br from-red-400 to-red-600"
              }`}
            >
              <span className="text-4xl font-bold text-white">{accuracy}%</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Quiz Complete!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You got <span className="font-semibold">{correctCount}</span> out of <span className="font-semibold">{questions.length}</span> questions correct.
          </p>

          {accuracy >= 80 && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
              <p className="text-emerald-700 dark:text-emerald-300 font-medium">
                Excellent! You&apos;ve demonstrated mastery of this topic.
              </p>
            </div>
          )}
          {accuracy >= 60 && accuracy < 80 && (
            <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <p className="text-amber-700 dark:text-amber-300 font-medium">
                Good job! Review the material and try again to improve.
              </p>
            </div>
          )}
          {accuracy < 60 && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-red-700 dark:text-red-300 font-medium">
                Keep practicing! Review the summary and try again.
              </p>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={`/courses/${courseId}/${topicId}`}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Review Topic
            </Link>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setSelectedAnswer(null);
                setShowResult(false);
                setAnswers([]);
                setQuizComplete(false);
                const topicQuestions = getQuestionsForTopic(topicId);
                const shuffled = [...topicQuestions].sort(() => Math.random() - 0.5);
                setQuestions(shuffled.slice(0, Math.min(5, shuffled.length)));
              }}
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
            <Link
              href={`/courses/${courseId}`}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Back to Course
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 h-[calc(100vh-8rem)] flex flex-col">
      {/* Compact Header with Progress */}
      <div className="flex items-center gap-4 mb-3">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap">
          Q{currentIndex + 1}/{questions.length}
        </h1>
        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className="progress-bar h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap truncate max-w-[120px]">
          {topic.name}
        </span>
      </div>

      {/* Question Card - Flex container */}
      <div className="glass-card rounded-2xl flex-1 flex flex-col min-h-0">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Difficulty Badge */}
          <div className="mb-3">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded ${
                currentQuestion.difficulty <= 2
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                  : currentQuestion.difficulty <= 3
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
              }`}
            >
              {currentQuestion.difficulty <= 2
                ? "Easy"
                : currentQuestion.difficulty <= 3
                ? "Medium"
                : "Hard"}
            </span>
          </div>

          {/* Question */}
          <h2 className="text-base font-medium text-gray-900 dark:text-white mb-3 leading-relaxed" style={{ fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif' }}>
            {currentQuestion.content}
          </h2>

          {/* Code Snippet */}
          {currentQuestion.codeSnippet && (
            <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg mb-3 overflow-x-auto">
              <code className="text-xs font-mono">{currentQuestion.codeSnippet}</code>
            </pre>
          )}

          {/* Options */}
          {currentQuestion.options && (
            <div className="space-y-2">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;

              let optionClass = "border-gray-200 dark:border-gray-600 hover:border-indigo-500";
              if (showResult) {
                if (isCorrect) {
                  optionClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20";
                } else if (isSelected && !isCorrect) {
                  optionClass = "border-red-500 bg-red-50 dark:bg-red-900/20";
                }
              } else if (isSelected) {
                optionClass = "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full text-left px-3 py-2 rounded-lg border-2 transition-colors text-sm ${optionClass}`}
                >
                  <span className="text-gray-900 dark:text-white">{option}</span>
                </button>
              );
            })}
          </div>
        )}

          {/* True/False */}
          {currentQuestion.type === "true_false" && (
            <div className="flex gap-2">
              {["True", "False"].map((option, index) => {
                const value = option.toLowerCase();
                const isSelected = selectedAnswer === index;
                const isCorrect = currentQuestion.correctAnswer === value;

                let optionClass = "border-gray-200 dark:border-gray-600 hover:border-indigo-500";
                if (showResult) {
                  if (isCorrect) {
                    optionClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20";
                  } else if (isSelected) {
                    optionClass = "border-red-500 bg-red-50 dark:bg-red-900/20";
                  }
                } else if (isSelected) {
                  optionClass = "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20";
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={`flex-1 px-3 py-2 rounded-lg border-2 transition-colors text-sm ${optionClass}`}
                  >
                    <span className="text-gray-900 dark:text-white font-medium">{option}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Drag & Drop Questions */}
          {currentQuestion.type === "drag_drop" && (
            <DragDropQuestion
              question={currentQuestion}
              onAnswer={(isCorrect) => {
                setShowResult(true);
                setSelectedAnswer(isCorrect ? 1 : 0);
                setAnswers([...answers, { correct: isCorrect, questionId: currentQuestion.id }]);

                let card = getCard(currentQuestion.id);
                if (!card) {
                  card = createCard(currentQuestion.id, topicId);
                }
                const rating = isCorrect ? 3 : 1;
                const updatedCard = scheduleCard(card, rating as 1 | 2 | 3 | 4);
                updateCard(updatedCard.card);
              }}
              disabled={showResult}
            />
          )}

          {/* Matching Questions */}
          {currentQuestion.type === "matching" && (
            <MatchingQuestion
              question={currentQuestion}
              onAnswer={(isCorrect) => {
                setShowResult(true);
                setSelectedAnswer(isCorrect ? 1 : 0);
                setAnswers([...answers, { correct: isCorrect, questionId: currentQuestion.id }]);

                let card = getCard(currentQuestion.id);
                if (!card) {
                  card = createCard(currentQuestion.id, topicId);
                }
                const rating = isCorrect ? 3 : 1;
                const updatedCard = scheduleCard(card, rating as 1 | 2 | 3 | 4);
                updateCard(updatedCard.card);
              }}
              disabled={showResult}
            />
          )}

          {/* Code Execution Questions */}
          {currentQuestion.type === "code_execution" && (
            <CodeExecutionQuestion
              question={currentQuestion}
              onAnswer={(isCorrect) => {
                setShowResult(true);
                setSelectedAnswer(isCorrect ? 1 : 0);
                setAnswers([...answers, { correct: isCorrect, questionId: currentQuestion.id }]);

                let card = getCard(currentQuestion.id);
                if (!card) {
                  card = createCard(currentQuestion.id, topicId);
                }
                const rating = isCorrect ? 3 : 1;
                const updatedCard = scheduleCard(card, rating as 1 | 2 | 3 | 4);
                updateCard(updatedCard.card);
              }}
              disabled={showResult}
            />
          )}

          {/* Explanation - only for traditional question types */}
          {showResult && !['drag_drop', 'matching', 'code_execution'].includes(currentQuestion.type) && (() => {
            // Calculate if answer is correct for display
            let isAnswerCorrect = false;
            if (currentQuestion.type === 'true_false') {
              const selectedValue = selectedAnswer === 0 ? 'true' : 'false';
              isAnswerCorrect = selectedValue === currentQuestion.correctAnswer;
            } else {
              isAnswerCorrect = selectedAnswer === currentQuestion.correctAnswer;
            }

            return (
              <div
                className={`mt-3 p-3 rounded-lg ${
                  isAnswerCorrect
                    ? "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
                    : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                }`}
              >
                <p
                  className={`font-medium text-sm ${
                    isAnswerCorrect
                      ? "text-emerald-800 dark:text-emerald-200"
                      : "text-red-800 dark:text-red-200"
                  }`}
                >
                  {isAnswerCorrect ? "Correct!" : "Incorrect"}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">
                  {currentQuestion.explanation}
                </p>
              </div>
            );
          })()}
        </div>

        {/* Fixed Actions at Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">
          <div className="flex justify-end">
            {!showResult && !['drag_drop', 'matching', 'code_execution'].includes(currentQuestion.type) ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                Submit Answer
              </button>
            ) : showResult ? (
              <button
                onClick={handleNext}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium inline-flex items-center gap-2"
              >
                {currentIndex < questions.length - 1 ? "Next Question" : "See Results"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
