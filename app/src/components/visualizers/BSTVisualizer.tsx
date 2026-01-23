"use client";

import { useState, useCallback } from "react";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
  x?: number;
  y?: number;
  highlighted?: boolean;
}

export default function BSTVisualizer() {
  const [root, setRoot] = useState<BSTNode | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState<string>("");
  const [highlightedPath, setHighlightedPath] = useState<number[]>([]);
  const [history, setHistory] = useState<number[]>([]);

  const insertNode = useCallback((node: BSTNode | null, value: number): BSTNode => {
    if (!node) {
      return { value, left: null, right: null };
    }

    if (value < node.value) {
      node.left = insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = insertNode(node.right, value);
    }

    return node;
  }, []);

  const searchNode = useCallback((node: BSTNode | null, value: number, path: number[]): boolean => {
    if (!node) return false;

    path.push(node.value);

    if (value === node.value) {
      return true;
    } else if (value < node.value) {
      return searchNode(node.left, value, path);
    } else {
      return searchNode(node.right, value, path);
    }
  }, []);

  const findMin = (node: BSTNode): BSTNode => {
    while (node.left) {
      node = node.left;
    }
    return node;
  };

  const deleteNode = useCallback((node: BSTNode | null, value: number): BSTNode | null => {
    if (!node) return null;

    if (value < node.value) {
      node.left = deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = deleteNode(node.right, value);
    } else {
      // Node found
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // Node with two children
      const minNode = findMin(node.right);
      node.value = minNode.value;
      node.right = deleteNode(node.right, minNode.value);
    }

    return node;
  }, []);

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setMessage("Please enter a valid number");
      return;
    }

    const newRoot = insertNode(root ? { ...root } : null, value);
    setRoot(newRoot);
    setHistory([...history, value]);
    setMessage(`Inserted ${value}`);
    setInputValue("");
    setHighlightedPath([]);
  };

  const handleSearch = () => {
    const value = parseInt(searchValue);
    if (isNaN(value)) {
      setMessage("Please enter a valid number to search");
      return;
    }

    const path: number[] = [];
    const found = searchNode(root, value, path);
    setHighlightedPath(path);

    if (found) {
      setMessage(`Found ${value}! Path: ${path.join(" → ")}`);
    } else {
      setMessage(`${value} not found. Searched path: ${path.join(" → ")}`);
    }

    setTimeout(() => setHighlightedPath([]), 3000);
  };

  const handleDelete = () => {
    const value = parseInt(searchValue);
    if (isNaN(value)) {
      setMessage("Please enter a valid number to delete");
      return;
    }

    const newRoot = deleteNode(root ? { ...root } : null, value);
    setRoot(newRoot);
    setHistory(history.filter((v) => v !== value));
    setMessage(`Deleted ${value}`);
    setSearchValue("");
    setHighlightedPath([]);
  };

  const handleClear = () => {
    setRoot(null);
    setHistory([]);
    setMessage("Tree cleared");
    setHighlightedPath([]);
  };

  // Calculate positions for SVG rendering
  const calculatePositions = (node: BSTNode | null, x: number, y: number, spread: number): void => {
    if (!node) return;
    node.x = x;
    node.y = y;
    calculatePositions(node.left, x - spread, y + 60, spread * 0.6);
    calculatePositions(node.right, x + spread, y + 60, spread * 0.6);
  };

  if (root) {
    calculatePositions(root, 300, 40, 120);
  }

  const renderTree = (node: BSTNode | null): JSX.Element | null => {
    if (!node || node.x === undefined || node.y === undefined) return null;

    const isHighlighted = highlightedPath.includes(node.value);

    return (
      <g key={node.value}>
        {/* Lines to children */}
        {node.left && node.left.x !== undefined && node.left.y !== undefined && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.left.x}
            y2={node.left.y}
            stroke={isHighlighted && highlightedPath.includes(node.left.value) ? "#6366f1" : "#94a3b8"}
            strokeWidth={isHighlighted && highlightedPath.includes(node.left.value) ? "3" : "2"}
            className="transition-all duration-300"
          />
        )}
        {node.right && node.right.x !== undefined && node.right.y !== undefined && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.right.x}
            y2={node.right.y}
            stroke={isHighlighted && highlightedPath.includes(node.right.value) ? "#6366f1" : "#94a3b8"}
            strokeWidth={isHighlighted && highlightedPath.includes(node.right.value) ? "3" : "2"}
            className="transition-all duration-300"
          />
        )}
        {/* Node circle */}
        <circle
          cx={node.x}
          cy={node.y}
          r="22"
          fill={isHighlighted ? "#c7d2fe" : "#e0e7ff"}
          stroke={isHighlighted ? "#4f46e5" : "#6366f1"}
          strokeWidth={isHighlighted ? "4" : "3"}
          className="transition-all duration-300"
        />
        {/* Value */}
        <text
          x={node.x}
          y={node.y + 5}
          textAnchor="middle"
          className="text-sm font-bold fill-gray-900"
        >
          {node.value}
        </text>
        {/* Recursively render children */}
        {renderTree(node.left)}
        {renderTree(node.right)}
      </g>
    );
  };

  return (
    <div className="space-y-4">
      {/* Insert Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleInsert()}
          placeholder="Value to insert"
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-32"
        />
        <button
          onClick={handleInsert}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium"
        >
          Insert
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm font-medium"
        >
          Clear
        </button>
      </div>

      {/* Search/Delete Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="number"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search/Delete value"
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-36"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium"
        >
          Search
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium"
        >
          Delete
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className="p-3 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
          {message}
        </div>
      )}

      {/* Tree Visualization */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <svg width="100%" height="350" viewBox="0 0 600 350">
          {root ? (
            renderTree(root)
          ) : (
            <text x="300" y="175" textAnchor="middle" className="fill-gray-400 text-sm">
              Insert values to build the BST
            </text>
          )}
        </svg>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">Values in tree:</span>{" "}
          {history.sort((a, b) => a - b).join(", ")}
        </div>
      )}

      {/* BST Properties */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">BST Property</h4>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          For every node: all values in the left subtree are smaller, and all values in the right subtree are larger.
          Search, insert, and delete operations have O(h) complexity, where h is the tree height.
        </p>
      </div>
    </div>
  );
}
