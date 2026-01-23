"use client";

import { useState } from "react";

interface ListNode {
  value: number;
  id: number;
}

export default function LinkedListVisualizer() {
  const [nodes, setNodes] = useState<ListNode[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [message, setMessage] = useState<string>("");
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [isDoubly, setIsDoubly] = useState(false);
  const [nextId, setNextId] = useState(1);

  const insertAtHead = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setMessage("Please enter a valid number");
      return;
    }

    setNodes([{ value, id: nextId }, ...nodes]);
    setNextId(nextId + 1);
    setMessage(`Inserted ${value} at head (O(1))`);
    setInputValue("");
    setHighlightedIndex(0);
    setTimeout(() => setHighlightedIndex(null), 1000);
  };

  const insertAtTail = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setMessage("Please enter a valid number");
      return;
    }

    setNodes([...nodes, { value, id: nextId }]);
    setNextId(nextId + 1);
    setMessage(`Inserted ${value} at tail (O(n) for singly, O(1) for doubly with tail pointer)`);
    setInputValue("");
    setHighlightedIndex(nodes.length);
    setTimeout(() => setHighlightedIndex(null), 1000);
  };

  const insertAtIndex = () => {
    const value = parseInt(inputValue);
    const index = parseInt(indexValue);

    if (isNaN(value)) {
      setMessage("Please enter a valid number");
      return;
    }
    if (isNaN(index) || index < 0 || index > nodes.length) {
      setMessage(`Please enter a valid index (0-${nodes.length})`);
      return;
    }

    const newNodes = [...nodes];
    newNodes.splice(index, 0, { value, id: nextId });
    setNodes(newNodes);
    setNextId(nextId + 1);
    setMessage(`Inserted ${value} at index ${index} (O(n))`);
    setInputValue("");
    setIndexValue("");
    setHighlightedIndex(index);
    setTimeout(() => setHighlightedIndex(null), 1000);
  };

  const deleteAtHead = () => {
    if (nodes.length === 0) {
      setMessage("List is empty");
      return;
    }

    const deleted = nodes[0];
    setNodes(nodes.slice(1));
    setMessage(`Deleted ${deleted.value} from head (O(1))`);
  };

  const deleteAtTail = () => {
    if (nodes.length === 0) {
      setMessage("List is empty");
      return;
    }

    const deleted = nodes[nodes.length - 1];
    setNodes(nodes.slice(0, -1));
    setMessage(`Deleted ${deleted.value} from tail (O(n) for singly, O(1) for doubly with tail pointer)`);
  };

  const deleteAtIndex = () => {
    const index = parseInt(indexValue);

    if (isNaN(index) || index < 0 || index >= nodes.length) {
      setMessage(`Please enter a valid index (0-${nodes.length - 1})`);
      return;
    }

    const deleted = nodes[index];
    const newNodes = [...nodes];
    newNodes.splice(index, 1);
    setNodes(newNodes);
    setMessage(`Deleted ${deleted.value} at index ${index} (O(n))`);
    setIndexValue("");
  };

  const handleClear = () => {
    setNodes([]);
    setMessage("List cleared");
    setHighlightedIndex(null);
  };

  const searchValue = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setMessage("Please enter a valid number to search");
      return;
    }

    const index = nodes.findIndex((n) => n.value === value);
    if (index !== -1) {
      setMessage(`Found ${value} at index ${index} (O(n) search)`);
      setHighlightedIndex(index);
      setTimeout(() => setHighlightedIndex(null), 2000);
    } else {
      setMessage(`${value} not found in list`);
    }
  };

  return (
    <div className="space-y-4">
      {/* List Type Toggle */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">List type:</span>
        <button
          onClick={() => setIsDoubly(false)}
          className={`px-3 py-1 rounded text-sm font-medium ${
            !isDoubly
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          Singly Linked
        </button>
        <button
          onClick={() => setIsDoubly(true)}
          className={`px-3 py-1 rounded text-sm font-medium ${
            isDoubly
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          Doubly Linked
        </button>
      </div>

      {/* Input Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Value"
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-24"
        />
        <input
          type="number"
          value={indexValue}
          onChange={(e) => setIndexValue(e.target.value)}
          placeholder="Index"
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-20"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={insertAtHead}
          className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-medium hover:bg-emerald-700"
        >
          Insert Head
        </button>
        <button
          onClick={insertAtTail}
          className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-medium hover:bg-emerald-700"
        >
          Insert Tail
        </button>
        <button
          onClick={insertAtIndex}
          className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-medium hover:bg-emerald-700"
        >
          Insert at Index
        </button>
        <button
          onClick={deleteAtHead}
          className="px-3 py-1.5 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700"
        >
          Delete Head
        </button>
        <button
          onClick={deleteAtTail}
          className="px-3 py-1.5 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700"
        >
          Delete Tail
        </button>
        <button
          onClick={deleteAtIndex}
          className="px-3 py-1.5 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700"
        >
          Delete at Index
        </button>
        <button
          onClick={searchValue}
          className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700"
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className="px-3 py-1.5 bg-gray-500 text-white rounded text-xs font-medium hover:bg-gray-600"
        >
          Clear
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className="p-3 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
          {message}
        </div>
      )}

      {/* Linked List Visualization */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 p-6 overflow-x-auto">
        <div className="flex items-center gap-1 min-w-max">
          {/* Head pointer */}
          <div className="flex flex-col items-center mr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">HEAD</span>
            <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-indigo-500"></div>
          </div>

          {nodes.length === 0 ? (
            <div className="text-gray-400 dark:text-gray-500 py-8">
              List is empty. Insert some values to visualize.
            </div>
          ) : (
            nodes.map((node, index) => (
              <div key={node.id} className="flex items-center">
                {/* Previous pointer for doubly linked */}
                {isDoubly && index > 0 && (
                  <svg width="20" height="20" className="text-gray-400">
                    <line x1="18" y1="10" x2="2" y2="10" stroke="currentColor" strokeWidth="2" />
                    <polygon points="2,10 8,6 8,14" fill="currentColor" />
                  </svg>
                )}

                {/* Node */}
                <div
                  className={`flex items-center border-2 rounded-lg overflow-hidden transition-all ${
                    highlightedIndex === index
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 scale-110"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  }`}
                >
                  {/* Value */}
                  <div className="px-4 py-3 border-r border-gray-300 dark:border-gray-600">
                    <span className="font-bold text-gray-900 dark:text-white">{node.value}</span>
                  </div>
                  {/* Next pointer box */}
                  <div className="px-2 py-3 bg-gray-100 dark:bg-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {index === nodes.length - 1 ? "null" : "→"}
                    </span>
                  </div>
                </div>

                {/* Arrow to next node */}
                {index < nodes.length - 1 && (
                  <svg width="30" height="20" className="text-gray-400">
                    <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="2" />
                    <polygon points="28,10 22,6 22,14" fill="currentColor" />
                  </svg>
                )}
              </div>
            ))
          )}

          {/* Tail pointer */}
          {nodes.length > 0 && (
            <div className="flex flex-col items-center ml-2">
              <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-emerald-500"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">TAIL</span>
            </div>
          )}
        </div>

        {/* Index labels */}
        {nodes.length > 0 && (
          <div className="flex items-center gap-1 mt-2 min-w-max ml-10">
            {nodes.map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="w-20 text-center">
                  <span className="text-xs text-gray-400">[{index}]</span>
                </div>
                {index < nodes.length - 1 && <div className="w-[30px]"></div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Complexity Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Singly Linked List</h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Insert/Delete at head: O(1)</li>
            <li>• Insert/Delete at tail: O(n)</li>
            <li>• Access by index: O(n)</li>
            <li>• Search: O(n)</li>
          </ul>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Doubly Linked List</h4>
          <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
            <li>• Insert/Delete at head: O(1)</li>
            <li>• Insert/Delete at tail: O(1)*</li>
            <li>• Access by index: O(n)</li>
            <li>• Delete given node: O(1)</li>
          </ul>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">*with tail pointer</p>
        </div>
      </div>
    </div>
  );
}
