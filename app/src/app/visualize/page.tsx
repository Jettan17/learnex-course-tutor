"use client";

import { useState } from "react";
import Link from "next/link";
import AVLTreeVisualizer from "@/components/visualizers/AVLTreeVisualizer";
import BSTVisualizer from "@/components/visualizers/BSTVisualizer";
import LinkedListVisualizer from "@/components/visualizers/LinkedListVisualizer";
import StackQueueVisualizer from "@/components/visualizers/StackQueueVisualizer";

type VisualizerType = "avl" | "bst" | "linkedlist" | "stackqueue";

const visualizers: { id: VisualizerType; name: string; description: string; icon: string }[] = [
  {
    id: "avl",
    name: "AVL Tree",
    description: "Self-balancing BST with rotations (LL, RR, LR, RL)",
    icon: "M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h6v2H7v-2z",
  },
  {
    id: "bst",
    name: "Binary Search Tree",
    description: "Insert, delete, and search operations",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  },
  {
    id: "linkedlist",
    name: "Linked List",
    description: "Singly and doubly linked list operations",
    icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
  },
  {
    id: "stackqueue",
    name: "Stack & Queue",
    description: "LIFO and FIFO data structures",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
];

export default function VisualizePage() {
  const [activeVisualizer, setActiveVisualizer] = useState<VisualizerType>("avl");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6">
        <nav className="mb-4">
          <Link href="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600">
            ← Back to Dashboard
          </Link>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"></span>
          Data Structure Visualizations
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Interactive visualizations to help understand data structure operations
        </p>
      </div>

      {/* Visualizer Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {visualizers.map((viz) => (
          <button
            key={viz.id}
            onClick={() => setActiveVisualizer(viz.id)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              activeVisualizer === viz.id
                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-indigo-300"
            }`}
          >
            <svg
              className={`w-6 h-6 mb-2 ${
                activeVisualizer === viz.id
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={viz.icon} />
            </svg>
            <h3 className={`font-semibold text-sm ${
              activeVisualizer === viz.id
                ? "text-indigo-700 dark:text-indigo-300"
                : "text-gray-900 dark:text-white"
            }`}>
              {viz.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{viz.description}</p>
          </button>
        ))}
      </div>

      {/* Visualizer Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 min-h-[500px]">
        {activeVisualizer === "avl" && <AVLTreeVisualizer />}
        {activeVisualizer === "bst" && <BSTVisualizer />}
        {activeVisualizer === "linkedlist" && <LinkedListVisualizer />}
        {activeVisualizer === "stackqueue" && <StackQueueVisualizer />}
      </div>
    </div>
  );
}
