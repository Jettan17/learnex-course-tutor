"use client";

import { useState } from "react";

interface Item {
  value: number;
  id: number;
}

export default function StackQueueVisualizer() {
  const [stackItems, setStackItems] = useState<Item[]>([]);
  const [queueItems, setQueueItems] = useState<Item[]>([]);
  const [stackInput, setStackInput] = useState("");
  const [queueInput, setQueueInput] = useState("");
  const [stackMessage, setStackMessage] = useState("");
  const [queueMessage, setQueueMessage] = useState("");
  const [stackHighlight, setStackHighlight] = useState<"push" | "pop" | null>(null);
  const [queueHighlight, setQueueHighlight] = useState<"enqueue" | "dequeue" | null>(null);
  const [nextId, setNextId] = useState(1);

  // Stack operations
  const push = () => {
    const value = parseInt(stackInput);
    if (isNaN(value)) {
      setStackMessage("Please enter a valid number");
      return;
    }

    setStackItems([{ value, id: nextId }, ...stackItems]);
    setNextId(nextId + 1);
    setStackMessage(`Pushed ${value} onto stack (O(1))`);
    setStackInput("");
    setStackHighlight("push");
    setTimeout(() => setStackHighlight(null), 500);
  };

  const pop = () => {
    if (stackItems.length === 0) {
      setStackMessage("Stack underflow! Stack is empty.");
      return;
    }

    const popped = stackItems[0];
    setStackHighlight("pop");
    setTimeout(() => {
      setStackItems(stackItems.slice(1));
      setStackMessage(`Popped ${popped.value} from stack (O(1))`);
      setStackHighlight(null);
    }, 300);
  };

  const peek = () => {
    if (stackItems.length === 0) {
      setStackMessage("Stack is empty");
      return;
    }
    setStackMessage(`Top element: ${stackItems[0].value} (O(1))`);
  };

  // Queue operations
  const enqueue = () => {
    const value = parseInt(queueInput);
    if (isNaN(value)) {
      setQueueMessage("Please enter a valid number");
      return;
    }

    setQueueItems([...queueItems, { value, id: nextId }]);
    setNextId(nextId + 1);
    setQueueMessage(`Enqueued ${value} to rear (O(1))`);
    setQueueInput("");
    setQueueHighlight("enqueue");
    setTimeout(() => setQueueHighlight(null), 500);
  };

  const dequeue = () => {
    if (queueItems.length === 0) {
      setQueueMessage("Queue underflow! Queue is empty.");
      return;
    }

    const dequeued = queueItems[0];
    setQueueHighlight("dequeue");
    setTimeout(() => {
      setQueueItems(queueItems.slice(1));
      setQueueMessage(`Dequeued ${dequeued.value} from front (O(1))`);
      setQueueHighlight(null);
    }, 300);
  };

  const front = () => {
    if (queueItems.length === 0) {
      setQueueMessage("Queue is empty");
      return;
    }
    setQueueMessage(`Front element: ${queueItems[0].value} (O(1))`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Stack Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Stack</h3>
          <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded">
            LIFO
          </span>
        </div>

        {/* Stack Controls */}
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="number"
            value={stackInput}
            onChange={(e) => setStackInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && push()}
            placeholder="Value"
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-24"
          />
          <button
            onClick={push}
            className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium"
          >
            Push
          </button>
          <button
            onClick={pop}
            className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium"
          >
            Pop
          </button>
          <button
            onClick={peek}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            Peek
          </button>
          <button
            onClick={() => { setStackItems([]); setStackMessage("Stack cleared"); }}
            className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm font-medium"
          >
            Clear
          </button>
        </div>

        {/* Stack Message */}
        {stackMessage && (
          <div className="p-2 rounded text-sm bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {stackMessage}
          </div>
        )}

        {/* Stack Visualization */}
        <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
          <div className="flex flex-col items-center">
            {/* Top label */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">TOP</span>
              <div className="w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-6 border-t-indigo-500"></div>
            </div>

            {/* Stack items */}
            <div className="w-32 border-l-4 border-r-4 border-b-4 border-gray-400 dark:border-gray-500 rounded-b-lg overflow-hidden">
              {stackItems.length === 0 ? (
                <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
                  Empty
                </div>
              ) : (
                <div className="flex flex-col">
                  {stackItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`py-3 text-center font-bold border-b border-gray-300 dark:border-gray-600 transition-all ${
                        index === 0 && stackHighlight === "push"
                          ? "bg-emerald-200 dark:bg-emerald-800 animate-pulse"
                          : index === 0 && stackHighlight === "pop"
                          ? "bg-red-200 dark:bg-red-800 animate-pulse"
                          : index === 0
                          ? "bg-indigo-100 dark:bg-indigo-900/50"
                          : "bg-white dark:bg-gray-800"
                      }`}
                    >
                      <span className="text-gray-900 dark:text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom label */}
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">BOTTOM</span>
          </div>
        </div>

        {/* Stack Info */}
        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <p className="text-sm text-indigo-700 dark:text-indigo-300">
            <strong>LIFO:</strong> Last In, First Out. Push and pop only from the top.
            All operations are O(1).
          </p>
        </div>
      </div>

      {/* Queue Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Queue</h3>
          <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded">
            FIFO
          </span>
        </div>

        {/* Queue Controls */}
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="number"
            value={queueInput}
            onChange={(e) => setQueueInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enqueue()}
            placeholder="Value"
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-24"
          />
          <button
            onClick={enqueue}
            className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium"
          >
            Enqueue
          </button>
          <button
            onClick={dequeue}
            className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium"
          >
            Dequeue
          </button>
          <button
            onClick={front}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            Front
          </button>
          <button
            onClick={() => { setQueueItems([]); setQueueMessage("Queue cleared"); }}
            className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm font-medium"
          >
            Clear
          </button>
        </div>

        {/* Queue Message */}
        {queueMessage && (
          <div className="p-2 rounded text-sm bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {queueMessage}
          </div>
        )}

        {/* Queue Visualization */}
        <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
          <div className="flex items-center justify-center">
            {/* Front label */}
            <div className="flex flex-col items-center mr-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">FRONT</span>
              <div className="w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-6 border-r-emerald-500"></div>
            </div>

            {/* Queue items */}
            <div className="flex items-center border-t-4 border-b-4 border-gray-400 dark:border-gray-500 min-w-[200px] min-h-[60px]">
              {queueItems.length === 0 ? (
                <div className="flex-1 text-center text-gray-400 text-sm py-4">
                  Empty
                </div>
              ) : (
                queueItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`px-4 py-4 border-r border-gray-300 dark:border-gray-600 transition-all ${
                      index === 0 && queueHighlight === "dequeue"
                        ? "bg-red-200 dark:bg-red-800 animate-pulse"
                        : index === queueItems.length - 1 && queueHighlight === "enqueue"
                        ? "bg-emerald-200 dark:bg-emerald-800 animate-pulse"
                        : index === 0
                        ? "bg-emerald-100 dark:bg-emerald-900/50"
                        : "bg-white dark:bg-gray-800"
                    }`}
                  >
                    <span className="font-bold text-gray-900 dark:text-white">{item.value}</span>
                  </div>
                ))
              )}
            </div>

            {/* Rear label */}
            <div className="flex flex-col items-center ml-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">REAR</span>
              <div className="w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-l-6 border-l-indigo-500"></div>
            </div>
          </div>
        </div>

        {/* Queue Info */}
        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            <strong>FIFO:</strong> First In, First Out. Enqueue at rear, dequeue from front.
            All operations are O(1).
          </p>
        </div>
      </div>

      {/* Common Use Cases */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Stack Use Cases</h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Function call stack</li>
            <li>• Undo/Redo operations</li>
            <li>• Expression evaluation</li>
            <li>• Backtracking algorithms</li>
          </ul>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Queue Use Cases</h4>
          <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
            <li>• Task scheduling</li>
            <li>• BFS traversal</li>
            <li>• Print job spooling</li>
            <li>• Message buffers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
