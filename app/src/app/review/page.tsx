"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { questions } from "@/data/questions";
import { Question } from "@/types";
import { getCards, updateCard } from "@/lib/storage";
import { getDueCards, createCard, scheduleCard } from "@/lib/fsrs";

export default function ReviewPage() {
  const [dueCards, setDueCards] = useState<typeof cards>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  // Get all cards, create new ones for questions without cards
  const cards = getCards();

  useEffect(() => {
    // Get due cards or create new ones for unreviewed questions
    let allCards = getCards();

    // Create cards for questions that don't have cards yet
    const existingQuestionIds = new Set(allCards.map((c) => c.questionId));
    const newCards = questions
      .filter((q) => !existingQuestionIds.has(q.id))
      .slice(0, 10) // Limit new cards per session
      .map((q) => createCard(q.id, q.topicId));

    if (newCards.length > 0) {
      newCards.forEach((card) => updateCard(card));
      allCards = [...allCards, ...newCards];
    }

    const due = getDueCards(allCards);
    setDueCards(due.slice(0, 20)); // Limit to 20 cards per session
  }, []);

  // Skip cards with missing questions
  useEffect(() => {
    if (dueCards.length === 0 || sessionComplete) return;

    const currentCard = dueCards[currentIndex];
    const currentQuestion = questions.find((q) => q.id === currentCard?.questionId);

    if (!currentQuestion) {
      if (currentIndex < dueCards.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setSessionComplete(true);
      }
    }
  }, [currentIndex, dueCards, sessionComplete]);

  if (dueCards.length === 0 || sessionComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {sessionComplete ? "Review Complete!" : "All Caught Up!"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {sessionComplete
              ? `You reviewed ${reviewedCount} cards. Great work!`
              : "No cards are due for review. Check back later or study new topics."}
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/courses"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Study More Topics
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = dueCards[currentIndex];
  const currentQuestion = questions.find((q) => q.id === currentCard.questionId);

  if (!currentQuestion) {
    return null; // useEffect handles skipping
  }

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleRate = (rating: 1 | 2 | 3 | 4) => {
    // Update card with FSRS
    const updatedCard = scheduleCard(currentCard, rating);
    updateCard(updatedCard.card);

    // Move to next card
    setReviewedCount(reviewedCount + 1);
    if (currentIndex < dueCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setSessionComplete(true);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 h-[calc(100vh-8rem)] flex flex-col">
      {/* Compact Header with Progress */}
      <div className="flex items-center gap-4 mb-3">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap">
          Review
        </h1>
        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / dueCards.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap">
          {currentIndex + 1}/{dueCards.length}
        </span>
      </div>

      {/* Card - Scrollable Content Area */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow flex-1 flex flex-col min-h-0">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Badges Row */}
          <div className="mb-3 flex gap-2 flex-wrap">
            <span
              className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${
                currentCard.state === "new"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  : currentCard.state === "learning"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              }`}
            >
              {currentCard.state === "new" ? "New" : currentCard.state === "learning" ? "Learning" : "Review"}
            </span>
            <span
              className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${
                currentQuestion.difficulty <= 2
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : currentQuestion.difficulty <= 3
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {currentQuestion.difficulty <= 2 ? "Easy" : currentQuestion.difficulty <= 3 ? "Medium" : "Hard"}
            </span>
          </div>

          {/* Question */}
          <h2 className="text-base font-medium text-gray-900 dark:text-white mb-3">
            {currentQuestion.content}
          </h2>

          {/* Code Snippet */}
          {currentQuestion.codeSnippet && (
            <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg mb-3 overflow-x-auto text-xs">
              <code className="font-mono">{currentQuestion.codeSnippet}</code>
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
                    optionClass = "border-green-500 bg-green-50 dark:bg-green-900/20";
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

          {/* Explanation */}
          {showResult && (
            <div
              className={`mt-3 p-3 rounded-lg ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
              }`}
            >
              <p
                className={`font-medium text-sm ${
                  selectedAnswer === currentQuestion.correctAnswer
                    ? "text-green-800 dark:text-green-200"
                    : "text-red-800 dark:text-red-200"
                }`}
              >
                {selectedAnswer === currentQuestion.correctAnswer ? "Correct!" : "Incorrect"}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Fixed Actions at Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-lg">
          {!showResult ? (
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                Check Answer
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => handleRate(1)}
                className="px-2 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 text-xs font-medium text-center"
              >
                Again
                <span className="block text-[10px] opacity-75">1d</span>
              </button>
              <button
                onClick={() => handleRate(2)}
                className="px-2 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 text-xs font-medium text-center"
              >
                Hard
                <span className="block text-[10px] opacity-75">2d</span>
              </button>
              <button
                onClick={() => handleRate(3)}
                className="px-2 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 text-xs font-medium text-center"
              >
                Good
                <span className="block text-[10px] opacity-75">4d</span>
              </button>
              <button
                onClick={() => handleRate(4)}
                className="px-2 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 text-xs font-medium text-center"
              >
                Easy
                <span className="block text-[10px] opacity-75">7d</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
