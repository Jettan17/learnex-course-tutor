"use client";

import { useState, useCallback } from "react";

interface AVLNode {
  value: number;
  left: AVLNode | null;
  right: AVLNode | null;
  height: number;
  x?: number;
  y?: number;
  highlighted?: boolean;
}

type RotationType = "LL" | "RR" | "LR" | "RL" | null;

interface Step {
  type: "insert" | "rotate-first" | "rotate-second" | "complete";
  tree: AVLNode | null;
  message: string;
  rotationType?: RotationType;
  explanation?: string;
}

// Deep clone a tree
const cloneTree = (node: AVLNode | null): AVLNode | null => {
  if (!node) return null;
  return {
    value: node.value,
    left: cloneTree(node.left),
    right: cloneTree(node.right),
    height: node.height,
    highlighted: node.highlighted,
  };
};

export default function AVLTreeVisualizer() {
  const [root, setRoot] = useState<AVLNode | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState<string>("");
  const [lastRotation, setLastRotation] = useState<RotationType>(null);
  const [history, setHistory] = useState<number[]>([]);

  // Step-through mode state
  const [stepMode, setStepMode] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [pendingValues, setPendingValues] = useState<number[]>([]);
  const [currentValueIndex, setCurrentValueIndex] = useState(0);

  const getHeight = (node: AVLNode | null): number => {
    return node ? node.height : 0;
  };

  const getBalance = (node: AVLNode | null): number => {
    return node ? getHeight(node.left) - getHeight(node.right) : 0;
  };

  const updateHeight = (node: AVLNode): void => {
    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
  };

  // Right rotation (LL case)
  const rightRotate = (y: AVLNode): AVLNode => {
    const x = y.left!;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    updateHeight(y);
    updateHeight(x);

    return x;
  };

  // Left rotation (RR case)
  const leftRotate = (x: AVLNode): AVLNode => {
    const y = x.right!;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    updateHeight(x);
    updateHeight(y);

    return y;
  };

  // Insert without rotation (for step-by-step)
  const insertWithoutRotation = (node: AVLNode | null, value: number): AVLNode => {
    if (!node) {
      return { value, left: null, right: null, height: 1, highlighted: true };
    }

    const newNode = { ...node, highlighted: false };
    if (value < node.value) {
      newNode.left = insertWithoutRotation(node.left, value);
    } else if (value > node.value) {
      newNode.right = insertWithoutRotation(node.right, value);
    } else {
      return newNode;
    }

    updateHeight(newNode);
    return newNode;
  };

  // Check what rotation is needed
  const getNeededRotation = (node: AVLNode | null, value: number): RotationType => {
    if (!node) return null;

    const balance = getBalance(node);

    if (balance > 1 && node.left && value < node.left.value) return "LL";
    if (balance < -1 && node.right && value > node.right.value) return "RR";
    if (balance > 1 && node.left && value > node.left.value) return "LR";
    if (balance < -1 && node.right && value < node.right.value) return "RL";

    // Check children recursively
    if (node.left) {
      const leftRotation = getNeededRotation(node.left, value);
      if (leftRotation) return leftRotation;
    }
    if (node.right) {
      const rightRotation = getNeededRotation(node.right, value);
      if (rightRotation) return rightRotation;
    }

    return null;
  };

  // Find unbalanced node and apply rotation
  const applyRotation = (node: AVLNode | null, rotationType: RotationType, phase: 1 | 2): AVLNode | null => {
    if (!node) return null;

    const balance = getBalance(node);

    if (Math.abs(balance) > 1) {
      if (rotationType === "LL") {
        return rightRotate(node);
      } else if (rotationType === "RR") {
        return leftRotate(node);
      } else if (rotationType === "LR") {
        if (phase === 1) {
          node.left = leftRotate(node.left!);
          return node;
        } else {
          return rightRotate(node);
        }
      } else if (rotationType === "RL") {
        if (phase === 1) {
          node.right = rightRotate(node.right!);
          return node;
        } else {
          return leftRotate(node);
        }
      }
    }

    const newNode = { ...node };
    newNode.left = applyRotation(node.left, rotationType, phase);
    newNode.right = applyRotation(node.right, rotationType, phase);
    return newNode;
  };

  // Generate steps for a value insertion
  const generateSteps = (startTree: AVLNode | null, value: number): Step[] => {
    const steps: Step[] = [];

    // Step 1: Insert without rotation
    const treeAfterInsert = insertWithoutRotation(cloneTree(startTree), value);
    const rotationNeeded = getNeededRotation(treeAfterInsert, value);

    steps.push({
      type: "insert",
      tree: cloneTree(treeAfterInsert),
      message: `Inserted ${value} at its BST position`,
      rotationType: rotationNeeded,
      explanation: rotationNeeded
        ? `Tree is unbalanced. ${rotationNeeded} rotation needed.`
        : "Tree remains balanced. No rotation needed.",
    });

    if (rotationNeeded) {
      if (rotationNeeded === "LR" || rotationNeeded === "RL") {
        // Two-phase rotation
        const firstRotationName = rotationNeeded === "LR" ? "Left" : "Right";
        const secondRotationName = rotationNeeded === "LR" ? "Right" : "Left";
        const childSide = rotationNeeded === "LR" ? "left child" : "right child";

        const treeAfterFirstRotation = applyRotation(cloneTree(treeAfterInsert), rotationNeeded, 1);
        steps.push({
          type: "rotate-first",
          tree: cloneTree(treeAfterFirstRotation),
          message: `${firstRotationName} rotation on ${childSide}`,
          rotationType: rotationNeeded,
          explanation: rotationNeeded === "LR"
            ? "First, perform a left rotation on the left child to convert LR case to LL case."
            : "First, perform a right rotation on the right child to convert RL case to RR case.",
        });

        const treeAfterSecondRotation = applyRotation(cloneTree(treeAfterFirstRotation), rotationNeeded, 2);
        steps.push({
          type: "rotate-second",
          tree: cloneTree(treeAfterSecondRotation),
          message: `${secondRotationName} rotation on root`,
          rotationType: rotationNeeded,
          explanation: rotationNeeded === "LR"
            ? "Now perform a right rotation on the unbalanced node to restore balance."
            : "Now perform a left rotation on the unbalanced node to restore balance.",
        });
      } else {
        // Single rotation (LL or RR)
        const rotationName = rotationNeeded === "LL" ? "Right" : "Left";
        const treeAfterRotation = applyRotation(cloneTree(treeAfterInsert), rotationNeeded, 1);
        steps.push({
          type: "rotate-first",
          tree: cloneTree(treeAfterRotation),
          message: `${rotationName} rotation performed`,
          rotationType: rotationNeeded,
          explanation: rotationNeeded === "LL"
            ? "A single right rotation on the unbalanced node restores balance."
            : "A single left rotation on the unbalanced node restores balance.",
        });
      }
    }

    return steps;
  };

  const insertNode = useCallback((node: AVLNode | null, value: number): { node: AVLNode; rotation: RotationType } => {
    if (!node) {
      return { node: { value, left: null, right: null, height: 1 }, rotation: null };
    }

    let rotation: RotationType = null;

    if (value < node.value) {
      const result = insertNode(node.left, value);
      node.left = result.node;
      rotation = result.rotation;
    } else if (value > node.value) {
      const result = insertNode(node.right, value);
      node.right = result.node;
      rotation = result.rotation;
    } else {
      return { node, rotation: null };
    }

    updateHeight(node);
    const balance = getBalance(node);

    if (balance > 1 && value < node.left!.value) {
      return { node: rightRotate(node), rotation: "LL" };
    }

    if (balance < -1 && value > node.right!.value) {
      return { node: leftRotate(node), rotation: "RR" };
    }

    if (balance > 1 && value > node.left!.value) {
      node.left = leftRotate(node.left!);
      return { node: rightRotate(node), rotation: "LR" };
    }

    if (balance < -1 && value < node.right!.value) {
      node.right = rightRotate(node.right!);
      return { node: leftRotate(node), rotation: "RL" };
    }

    return { node, rotation };
  }, []);

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setMessage("Please enter a valid number");
      return;
    }

    const result = insertNode(cloneTree(root), value);
    setRoot(result.node);
    setHistory([...history, value]);
    setLastRotation(result.rotation);

    if (result.rotation) {
      setMessage(`Inserted ${value}. Performed ${result.rotation} rotation to maintain balance.`);
    } else {
      setMessage(`Inserted ${value}. No rotation needed.`);
    }

    setInputValue("");
    setTimeout(() => setLastRotation(null), 2000);
  };

  const handleClear = () => {
    setRoot(null);
    setHistory([]);
    setMessage("Tree cleared");
    setLastRotation(null);
    setStepMode(false);
    setSteps([]);
    setCurrentStepIndex(0);
    setPendingValues([]);
    setCurrentValueIndex(0);
  };

  // Start step-through mode with a preset
  const handlePresetStepMode = (preset: string) => {
    handleClear();
    let values: number[] = [];

    switch (preset) {
      case "ll":
        values = [30, 20, 10];
        break;
      case "rr":
        values = [10, 20, 30];
        break;
      case "lr":
        values = [30, 10, 20];
        break;
      case "rl":
        values = [10, 30, 20];
        break;
    }

    setStepMode(true);
    setPendingValues(values);
    setCurrentValueIndex(0);

    // Generate steps for first value
    const firstSteps = generateSteps(null, values[0]);
    setSteps(firstSteps);
    setCurrentStepIndex(0);
    setRoot(null);
    setMessage(`Step-through mode: Insert ${values.join(" → ")}. Click "Next Step" to begin.`);
  };

  // Handle next step
  const handleNextStep = () => {
    if (currentStepIndex < steps.length) {
      // Show current step
      const step = steps[currentStepIndex];
      setRoot(cloneTree(step.tree));
      setMessage(step.message);
      setLastRotation(step.rotationType || null);

      if (step.type === "insert") {
        setHistory([...pendingValues.slice(0, currentValueIndex + 1)]);
      }

      setCurrentStepIndex(currentStepIndex + 1);
    } else if (currentValueIndex < pendingValues.length - 1) {
      // Move to next value
      const nextValueIndex = currentValueIndex + 1;
      setCurrentValueIndex(nextValueIndex);

      // Get current tree state (final step of previous value)
      const currentTree = steps.length > 0 ? steps[steps.length - 1].tree : root;
      const nextSteps = generateSteps(currentTree, pendingValues[nextValueIndex]);
      setSteps(nextSteps);
      setCurrentStepIndex(0);
      setMessage(`Ready to insert ${pendingValues[nextValueIndex]}. Click "Next Step" to continue.`);
      setLastRotation(null);
    } else {
      // Complete
      setMessage("Step-through complete! All values have been inserted.");
      setStepMode(false);
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    if (currentStepIndex > 1) {
      // Go back within current value's steps
      const prevIndex = currentStepIndex - 2;
      const step = steps[prevIndex];
      setRoot(cloneTree(step.tree));
      setMessage(step.message);
      setLastRotation(step.rotationType || null);
      setCurrentStepIndex(prevIndex + 1);
    } else if (currentStepIndex === 1) {
      // Show state before first step
      if (currentValueIndex === 0) {
        setRoot(null);
      } else {
        // Need to rebuild tree from previous values
        let tree: AVLNode | null = null;
        for (let i = 0; i < currentValueIndex; i++) {
          const result = insertNode(tree, pendingValues[i]);
          tree = result.node;
        }
        setRoot(tree);
      }
      setMessage(`Ready to insert ${pendingValues[currentValueIndex]}. Click "Next Step" to begin.`);
      setLastRotation(null);
      setCurrentStepIndex(0);
    } else if (currentValueIndex > 0) {
      // Go back to previous value
      const prevValueIndex = currentValueIndex - 1;
      setCurrentValueIndex(prevValueIndex);

      // Rebuild tree up to previous value
      let tree: AVLNode | null = null;
      for (let i = 0; i < prevValueIndex; i++) {
        const result = insertNode(tree, pendingValues[i]);
        tree = result.node;
      }

      const prevSteps = generateSteps(tree, pendingValues[prevValueIndex]);
      setSteps(prevSteps);
      setCurrentStepIndex(prevSteps.length);

      const lastStep = prevSteps[prevSteps.length - 1];
      setRoot(cloneTree(lastStep.tree));
      setMessage(lastStep.message);
      setLastRotation(lastStep.rotationType || null);
      setHistory(pendingValues.slice(0, prevValueIndex + 1));
    }
  };

  // Calculate positions for SVG rendering
  const calculatePositions = (node: AVLNode | null, x: number, y: number, spread: number): void => {
    if (!node) return;
    node.x = x;
    node.y = y;
    calculatePositions(node.left, x - spread, y + 60, spread * 0.6);
    calculatePositions(node.right, x + spread, y + 60, spread * 0.6);
  };

  if (root) {
    calculatePositions(root, 300, 40, 120);
  }

  const renderTree = (node: AVLNode | null): JSX.Element | null => {
    if (!node || node.x === undefined || node.y === undefined) return null;

    const balance = getBalance(node);
    const isUnbalanced = Math.abs(balance) > 1;
    const isHighlighted = node.highlighted;

    return (
      <g key={node.value}>
        {node.left && node.left.x !== undefined && node.left.y !== undefined && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.left.x}
            y2={node.left.y}
            stroke={isHighlighted ? "#22c55e" : "#94a3b8"}
            strokeWidth="2"
            className="transition-all duration-300"
          />
        )}
        {node.right && node.right.x !== undefined && node.right.y !== undefined && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.right.x}
            y2={node.right.y}
            stroke={isHighlighted ? "#22c55e" : "#94a3b8"}
            strokeWidth="2"
            className="transition-all duration-300"
          />
        )}
        <circle
          cx={node.x}
          cy={node.y}
          r="22"
          fill={isHighlighted ? "#bbf7d0" : isUnbalanced ? "#fecaca" : "#e0e7ff"}
          stroke={isHighlighted ? "#22c55e" : isUnbalanced ? "#ef4444" : "#6366f1"}
          strokeWidth="3"
          className="transition-all duration-300"
        />
        <text
          x={node.x}
          y={node.y + 5}
          textAnchor="middle"
          className="text-sm font-bold fill-gray-900"
        >
          {node.value}
        </text>
        <text
          x={node.x}
          y={node.y - 30}
          textAnchor="middle"
          className={`text-xs ${isUnbalanced ? "fill-red-600" : "fill-gray-500"}`}
        >
          bf={balance}
        </text>
        {renderTree(node.left)}
        {renderTree(node.right)}
      </g>
    );
  };

  // Calculate total steps for progress indicator
  const getTotalSteps = () => {
    if (!stepMode) return 0;
    let total = 0;
    let tempTree: AVLNode | null = null;
    for (const value of pendingValues) {
      const tempSteps = generateSteps(tempTree, value);
      total += tempSteps.length;
      if (tempSteps.length > 0) {
        tempTree = tempSteps[tempSteps.length - 1].tree;
      }
    }
    return total;
  };

  // Calculate completed steps
  const getCompletedSteps = () => {
    if (!stepMode) return 0;
    let completed = 0;
    for (let i = 0; i < currentValueIndex; i++) {
      let tempTree: AVLNode | null = null;
      for (let j = 0; j <= i; j++) {
        const result = insertNode(tempTree, pendingValues[j]);
        tempTree = result.node;
      }
      // This is approximate - just count steps done before current value
    }
    // For now, approximate with value index + current step
    let approx = 0;
    let tempTree: AVLNode | null = null;
    for (let i = 0; i < currentValueIndex; i++) {
      approx += generateSteps(tempTree, pendingValues[i]).length;
      const result = insertNode(tempTree, pendingValues[i]);
      tempTree = result.node;
    }
    return approx + currentStepIndex;
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleInsert()}
          placeholder="Enter value"
          disabled={stepMode}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-32 disabled:opacity-50"
        />
        <button
          onClick={handleInsert}
          disabled={stepMode}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 text-sm font-medium"
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

      {/* Preset Rotations with Step-Through */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-gray-600 dark:text-gray-400">Step-through demos:</span>
        <button
          onClick={() => handlePresetStepMode("ll")}
          disabled={stepMode}
          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 disabled:opacity-50"
        >
          LL (30→20→10)
        </button>
        <button
          onClick={() => handlePresetStepMode("rr")}
          disabled={stepMode}
          className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded text-xs font-medium hover:bg-green-200 dark:hover:bg-green-900/50 disabled:opacity-50"
        >
          RR (10→20→30)
        </button>
        <button
          onClick={() => handlePresetStepMode("lr")}
          disabled={stepMode}
          className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded text-xs font-medium hover:bg-yellow-200 dark:hover:bg-yellow-900/50 disabled:opacity-50"
        >
          LR (30→10→20)
        </button>
        <button
          onClick={() => handlePresetStepMode("rl")}
          disabled={stepMode}
          className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded text-xs font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 disabled:opacity-50"
        >
          RL (10→30→20)
        </button>
      </div>

      {/* Step-Through Controls */}
      {stepMode && (
        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-indigo-800 dark:text-indigo-200">
              Step-Through Mode
            </h4>
            <span className="text-sm text-indigo-600 dark:text-indigo-300">
              Value {currentValueIndex + 1} of {pendingValues.length}
              {steps.length > 0 && ` • Step ${currentStepIndex} of ${steps.length}`}
            </span>
          </div>

          <div className="flex gap-3 items-center">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0 && currentValueIndex === 0}
              className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            <button
              onClick={handleNextStep}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium flex items-center gap-2"
            >
              Next Step
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => {
                setStepMode(false);
                setSteps([]);
                setPendingValues([]);
              }}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm font-medium"
            >
              Exit Step Mode
            </button>
          </div>

          {/* Current step explanation */}
          {currentStepIndex > 0 && steps[currentStepIndex - 1]?.explanation && (
            <p className="mt-3 text-sm text-indigo-700 dark:text-indigo-300">
              {steps[currentStepIndex - 1].explanation}
            </p>
          )}
        </div>
      )}

      {/* Message */}
      {message && !stepMode && (
        <div className={`p-3 rounded-lg text-sm ${
          lastRotation
            ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800"
            : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
        }`}>
          {message}
          {lastRotation && (
            <span className="ml-2 font-bold">{lastRotation} Rotation</span>
          )}
        </div>
      )}

      {stepMode && message && (
        <div className="p-3 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
          {message}
        </div>
      )}

      {/* Rotation Explanation (for non-step mode) */}
      {lastRotation && !stepMode && (
        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
            {lastRotation} Rotation Explained
          </h4>
          <p className="text-sm text-indigo-700 dark:text-indigo-300">
            {lastRotation === "LL" && "Left-Left case: The tree is left-heavy with the imbalance on the left subtree's left side. A single right rotation restores balance."}
            {lastRotation === "RR" && "Right-Right case: The tree is right-heavy with the imbalance on the right subtree's right side. A single left rotation restores balance."}
            {lastRotation === "LR" && "Left-Right case: The tree is left-heavy but the imbalance is on the left subtree's right side. First a left rotation on the left child, then a right rotation on the root."}
            {lastRotation === "RL" && "Right-Left case: The tree is right-heavy but the imbalance is on the right subtree's left side. First a right rotation on the right child, then a left rotation on the root."}
          </p>
        </div>
      )}

      {/* Tree Visualization */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <svg width="100%" height="350" viewBox="0 0 600 350">
          {root ? (
            renderTree(root)
          ) : (
            <text x="300" y="175" textAnchor="middle" className="fill-gray-400 text-sm">
              {stepMode ? "Click 'Next Step' to begin" : "Insert values to build the AVL tree"}
            </text>
          )}
        </svg>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">Insertion order:</span>{" "}
          {history.join(" → ")}
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-indigo-100 border-2 border-indigo-500"></div>
          <span>Balanced node (|bf| ≤ 1)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-100 border-2 border-red-500"></div>
          <span>Unbalanced node (|bf| &gt; 1)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-100 border-2 border-green-500"></div>
          <span>Newly inserted node</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500">bf = balance factor (left height - right height)</span>
        </div>
      </div>
    </div>
  );
}
