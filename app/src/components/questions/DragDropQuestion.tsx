"use client";

import { useState, useCallback } from "react";
import { Question } from "@/types";

interface DragDropQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean, userOrder: number[]) => void;
  disabled?: boolean;
}

export default function DragDropQuestion({
  question,
  onAnswer,
  disabled = false,
}: DragDropQuestionProps) {
  const [items, setItems] = useState<{ text: string; originalIndex: number }[]>(
    () => {
      if (!question.dragItems) return [];
      // Shuffle the items initially
      const shuffled = question.dragItems.map((text, index) => ({
        text,
        originalIndex: index,
      }));
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
  );
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDragStart = useCallback(
    (e: React.DragEvent, index: number) => {
      if (disabled || submitted) return;
      setDraggedIndex(index);
      e.dataTransfer.effectAllowed = "move";
    },
    [disabled, submitted]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      if (disabled || submitted) return;
      setDragOverIndex(index);
    },
    [disabled, submitted]
  );

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault();
      if (disabled || submitted || draggedIndex === null) return;

      const newItems = [...items];
      const draggedItem = newItems[draggedIndex];
      newItems.splice(draggedIndex, 1);
      newItems.splice(dropIndex, 0, draggedItem);
      setItems(newItems);
      setDraggedIndex(null);
      setDragOverIndex(null);
    },
    [items, draggedIndex, disabled, submitted]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  }, []);

  // Touch support for mobile
  const moveItem = useCallback(
    (fromIndex: number, direction: "up" | "down") => {
      if (disabled || submitted) return;
      const toIndex = direction === "up" ? fromIndex - 1 : fromIndex + 1;
      if (toIndex < 0 || toIndex >= items.length) return;

      const newItems = [...items];
      [newItems[fromIndex], newItems[toIndex]] = [
        newItems[toIndex],
        newItems[fromIndex],
      ];
      setItems(newItems);
    },
    [items, disabled, submitted]
  );

  const handleSubmit = useCallback(() => {
    if (!question.correctOrder) return;

    const userOrder = items.map((item) => item.originalIndex);
    const correct =
      JSON.stringify(userOrder) === JSON.stringify(question.correctOrder);

    setSubmitted(true);
    setIsCorrect(correct);
    onAnswer(correct, userOrder);
  }, [items, question.correctOrder, onAnswer]);

  if (!question.dragItems || !question.correctOrder) {
    return <div>Invalid drag-drop question configuration</div>;
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
        Drag and drop the items into the correct order:
      </p>

      <div className="space-y-2">
        {items.map((item, index) => {
          const isCorrectPosition =
            submitted && item.originalIndex === question.correctOrder![index];
          const isWrongPosition =
            submitted && item.originalIndex !== question.correctOrder![index];

          return (
            <div
              key={`${item.originalIndex}-${index}`}
              draggable={!disabled && !submitted}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`
                flex items-center gap-3 p-3 rounded-lg border-2 transition-all
                ${!submitted && !disabled ? "cursor-grab active:cursor-grabbing" : ""}
                ${draggedIndex === index ? "opacity-50" : ""}
                ${dragOverIndex === index && draggedIndex !== index ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" : ""}
                ${isCorrectPosition ? "border-green-500 bg-green-50 dark:bg-green-900/20" : ""}
                ${isWrongPosition ? "border-red-500 bg-red-50 dark:bg-red-900/20" : ""}
                ${!submitted && !isCorrectPosition && !isWrongPosition ? "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800" : ""}
              `}
            >
              {/* Position number */}
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium flex items-center justify-center">
                {index + 1}
              </span>

              {/* Drag handle */}
              {!submitted && !disabled && (
                <svg
                  className="w-5 h-5 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}

              {/* Item text */}
              <span className="flex-1 text-gray-900 dark:text-white text-sm">
                {item.text}
              </span>

              {/* Mobile up/down buttons */}
              {!submitted && !disabled && (
                <div className="flex flex-col gap-1 sm:hidden">
                  <button
                    onClick={() => moveItem(index, "up")}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => moveItem(index, "down")}
                    disabled={index === items.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Result indicator */}
              {submitted && (
                <span className="flex-shrink-0">
                  {isCorrectPosition ? (
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && !disabled && (
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium"
        >
          Check Order
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
          <p className="font-medium">{isCorrect ? "Correct!" : "Incorrect"}</p>
          <p className="mt-1 opacity-80">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
