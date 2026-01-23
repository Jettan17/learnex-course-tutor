import { Question } from '@/types';

export const questions: Question[] = [
  // Memory Management Questions
  {
    id: 'mm-001',
    topicId: 'memory-management',
    type: 'mcq',
    difficulty: 1,
    content: 'What is the primary memory management technique used by Python?',
    options: [
      'Manual memory allocation',
      'Reference counting',
      'Mark and sweep only',
      'Stack-based allocation only'
    ],
    correctAnswer: 1,
    explanation: 'Python primarily uses reference counting for memory management. Each object has a count of references pointing to it, and when the count reaches zero, the memory is deallocated.'
  },
  {
    id: 'mm-002',
    topicId: 'memory-management',
    type: 'mcq',
    difficulty: 2,
    content: 'Which of the following is stored in the heap memory in Python?',
    options: [
      'Function call information',
      'Local variable references',
      'Objects and their data',
      'Return addresses'
    ],
    correctAnswer: 2,
    explanation: 'Objects and their actual data are stored in the heap. The stack stores function call information, local variable references, and return addresses.'
  },
  {
    id: 'mm-003',
    topicId: 'memory-management',
    type: 'true_false',
    difficulty: 2,
    content: 'Python\'s garbage collector can handle circular references that reference counting cannot.',
    correctAnswer: 'true',
    explanation: 'Reference counting alone cannot handle circular references (A references B, B references A). Python\'s garbage collector uses generational collection to detect and clean up these cycles.'
  },
  {
    id: 'mm-004',
    topicId: 'memory-management',
    type: 'code_trace',
    difficulty: 3,
    content: 'What will be the output of this code?',
    codeSnippet: `a = [1, 2, 3]
b = a
a.append(4)
print(b)`,
    options: [
      '[1, 2, 3]',
      '[1, 2, 3, 4]',
      'Error',
      '[4]'
    ],
    correctAnswer: 1,
    explanation: 'Since b = a creates a reference to the same list object, not a copy, modifying a also affects b. Both variables point to the same list in memory.'
  },

  // Linked List Questions
  {
    id: 'll-001',
    topicId: 'linked-lists',
    type: 'mcq',
    difficulty: 1,
    content: 'What is the time complexity of inserting a node at the front of a singly linked list?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswer: 0,
    explanation: 'Inserting at the front is O(1) because we only need to update the new node\'s next pointer and the head pointer, regardless of list size.'
  },
  {
    id: 'll-002',
    topicId: 'linked-lists',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the main advantage of a doubly linked list over a singly linked list?',
    options: [
      'Uses less memory',
      'Faster search operations',
      'Can traverse in both directions',
      'Simpler implementation'
    ],
    correctAnswer: 2,
    explanation: 'A doubly linked list has both next and prev pointers, allowing bidirectional traversal. This is useful for operations like deletion when you have a reference to the node to delete.'
  },
  {
    id: 'll-003',
    topicId: 'linked-lists',
    type: 'mcq',
    difficulty: 2,
    content: 'In a singly linked list with only a head pointer, what is the time complexity to delete the last node?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 2,
    explanation: 'To delete the last node, we must traverse the entire list to find the second-to-last node and update its next pointer to null. This takes O(n) time.'
  },
  {
    id: 'll-004',
    topicId: 'linked-lists',
    type: 'code_trace',
    difficulty: 3,
    content: 'After executing this code, what does the linked list contain?',
    codeSnippet: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

head = Node(1)
head.next = Node(2)
head.next.next = Node(3)
head.next = head.next.next`,
    options: [
      '1 -> 2 -> 3',
      '1 -> 3',
      '1 -> 2',
      '3'
    ],
    correctAnswer: 1,
    explanation: 'The line head.next = head.next.next skips over node 2, making node 1 point directly to node 3. Node 2 is effectively removed.'
  },
  {
    id: 'll-005',
    topicId: 'linked-lists',
    type: 'mcq',
    difficulty: 3,
    content: 'Which linked list type is best suited for implementing a browser\'s forward and back navigation?',
    options: [
      'Singly linked list',
      'Doubly linked list',
      'Circular singly linked list',
      'Circular doubly linked list'
    ],
    correctAnswer: 1,
    explanation: 'A doubly linked list allows navigation in both directions (forward and back), which perfectly matches browser navigation. Each page can link to both the previous and next pages visited.'
  },

  // Stack Questions
  {
    id: 'st-001',
    topicId: 'stacks',
    type: 'mcq',
    difficulty: 1,
    content: 'What does LIFO stand for in the context of stacks?',
    options: [
      'Last Input First Output',
      'Last In First Out',
      'Linear In Fixed Out',
      'List In Finite Order'
    ],
    correctAnswer: 1,
    explanation: 'LIFO stands for Last In First Out. The most recently added element is the first one to be removed.'
  },
  {
    id: 'st-002',
    topicId: 'stacks',
    type: 'mcq',
    difficulty: 2,
    content: 'Which operation would you use to see the top element of a stack without removing it?',
    options: ['pop()', 'push()', 'peek() or top()', 'remove()'],
    correctAnswer: 2,
    explanation: 'peek() or top() returns the top element without removing it. pop() removes and returns the top element.'
  },
  {
    id: 'st-003',
    topicId: 'stacks',
    type: 'code_trace',
    difficulty: 2,
    content: 'What is the output of this code?',
    codeSnippet: `stack = []
stack.append(1)
stack.append(2)
stack.append(3)
stack.pop()
stack.append(4)
print(stack.pop())`,
    options: ['1', '2', '3', '4'],
    correctAnswer: 3,
    explanation: 'After pushing 1, 2, 3, we pop 3. Then push 4. The final pop() returns 4, which is now at the top.'
  },
  {
    id: 'st-004',
    topicId: 'stacks',
    type: 'mcq',
    difficulty: 3,
    content: 'Which application is NOT typically solved using a stack?',
    options: [
      'Balanced parentheses checking',
      'Infix to postfix conversion',
      'BFS traversal',
      'Function call management'
    ],
    correctAnswer: 2,
    explanation: 'BFS (Breadth-First Search) uses a queue, not a stack. Stacks are used for DFS, parentheses matching, expression conversion, and managing function calls.'
  },
  {
    id: 'st-005',
    topicId: 'stacks',
    type: 'code_trace',
    difficulty: 4,
    content: 'What does this function check?',
    codeSnippet: `def mystery(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in '({[':
            stack.append(char)
        elif char in ')}]':
            if not stack or stack.pop() != pairs[char]:
                return False
    return len(stack) == 0`,
    options: [
      'If string has only brackets',
      'If brackets are balanced',
      'Count of brackets',
      'If string is a palindrome'
    ],
    correctAnswer: 1,
    explanation: 'This function checks if brackets (parentheses, curly braces, square brackets) are properly balanced. Each opening bracket must have a matching closing bracket in the correct order.'
  },

  // Queue Questions
  {
    id: 'qu-001',
    topicId: 'queues',
    type: 'mcq',
    difficulty: 1,
    content: 'What does FIFO stand for in the context of queues?',
    options: [
      'First Input Fixed Output',
      'First In First Out',
      'Fixed In Finite Out',
      'Fast In Fast Out'
    ],
    correctAnswer: 1,
    explanation: 'FIFO stands for First In First Out. The first element added to the queue is the first one to be removed.'
  },
  {
    id: 'qu-002',
    topicId: 'queues',
    type: 'mcq',
    difficulty: 2,
    content: 'In a simple queue, where are elements added and removed?',
    options: [
      'Added at front, removed from front',
      'Added at rear, removed from rear',
      'Added at rear, removed from front',
      'Added at front, removed from rear'
    ],
    correctAnswer: 2,
    explanation: 'In a queue, elements are added (enqueued) at the rear and removed (dequeued) from the front, following FIFO order.'
  },
  {
    id: 'qu-003',
    topicId: 'queues',
    type: 'code_trace',
    difficulty: 2,
    content: 'What is the output of this code?',
    codeSnippet: `from collections import deque
q = deque()
q.append(1)
q.append(2)
q.append(3)
q.popleft()
q.append(4)
print(q.popleft())`,
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: 'After adding 1, 2, 3 and removing 1, then adding 4, the queue is [2, 3, 4]. popleft() returns 2, which is at the front.'
  },
  {
    id: 'qu-004',
    topicId: 'queues',
    type: 'mcq',
    difficulty: 3,
    content: 'Which traversal algorithm typically uses a queue?',
    options: [
      'Depth-First Search (DFS)',
      'Breadth-First Search (BFS)',
      'Preorder traversal',
      'Postorder traversal'
    ],
    correctAnswer: 1,
    explanation: 'BFS uses a queue to explore nodes level by level. Nodes at the current level are processed first before moving to the next level.'
  },
  {
    id: 'qu-005',
    topicId: 'queues',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the advantage of a circular queue over a simple queue using an array?',
    options: [
      'Faster enqueue operation',
      'Reuses empty spaces at the beginning',
      'Allows priority-based removal',
      'Supports bidirectional traversal'
    ],
    correctAnswer: 1,
    explanation: 'In a simple array queue, after multiple dequeue operations, the front spaces become unusable. A circular queue wraps around to reuse these empty spaces.'
  },

  // Binary Tree Questions
  {
    id: 'bt-001',
    topicId: 'binary-trees',
    type: 'mcq',
    difficulty: 1,
    content: 'What is the maximum number of children a node can have in a binary tree?',
    options: ['1', '2', '3', 'Unlimited'],
    correctAnswer: 1,
    explanation: 'In a binary tree, each node can have at most 2 children: a left child and a right child.'
  },
  {
    id: 'bt-002',
    topicId: 'binary-trees',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the order of node visits in an inorder traversal?',
    options: [
      'Root, Left, Right',
      'Left, Root, Right',
      'Left, Right, Root',
      'Right, Root, Left'
    ],
    correctAnswer: 1,
    explanation: 'Inorder traversal visits: Left subtree, Root, Right subtree (LRR). For a BST, this gives nodes in sorted order.'
  },
  {
    id: 'bt-003',
    topicId: 'binary-trees',
    type: 'code_trace',
    difficulty: 3,
    content: 'Given the tree with root 1, left child 2, right child 3, and 2 has left child 4 and right child 5. What is the preorder traversal?',
    options: [
      '4, 2, 5, 1, 3',
      '1, 2, 4, 5, 3',
      '4, 5, 2, 3, 1',
      '1, 2, 3, 4, 5'
    ],
    correctAnswer: 1,
    explanation: 'Preorder is Root-Left-Right: Visit 1, go left to 2, go left to 4, back to 2, go right to 5, back to 1, go right to 3. Result: 1, 2, 4, 5, 3.'
  },
  {
    id: 'bt-004',
    topicId: 'binary-trees',
    type: 'mcq',
    difficulty: 2,
    content: 'What data structure is used for level-order traversal of a binary tree?',
    options: ['Stack', 'Queue', 'Priority Queue', 'Hash Table'],
    correctAnswer: 1,
    explanation: 'Level-order traversal uses a queue to process nodes level by level (BFS). Nodes at each level are enqueued, then dequeued and their children are enqueued.'
  },
  {
    id: 'bt-005',
    topicId: 'binary-trees',
    type: 'mcq',
    difficulty: 3,
    content: 'In a complete binary tree with n nodes, what is the height?',
    options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
    correctAnswer: 1,
    explanation: 'A complete binary tree is as balanced as possible, with height approximately log₂(n). This ensures efficient operations.'
  },

  // BST Questions
  {
    id: 'bst-001',
    topicId: 'binary-search-trees',
    type: 'mcq',
    difficulty: 1,
    content: 'In a Binary Search Tree, where are values smaller than the root stored?',
    options: [
      'Right subtree',
      'Left subtree',
      'Either subtree',
      'At the root level only'
    ],
    correctAnswer: 1,
    explanation: 'In a BST, all values smaller than a node are in its left subtree, and all values larger are in its right subtree.'
  },
  {
    id: 'bst-002',
    topicId: 'binary-search-trees',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the average time complexity for search in a balanced BST?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 1,
    explanation: 'In a balanced BST, the height is O(log n), so search takes O(log n) time on average as we eliminate half the tree at each step.'
  },
  {
    id: 'bst-003',
    topicId: 'binary-search-trees',
    type: 'mcq',
    difficulty: 3,
    content: 'When deleting a node with two children from a BST, what replaces it?',
    options: [
      'The left child',
      'The right child',
      'The inorder successor or predecessor',
      'A new node'
    ],
    correctAnswer: 2,
    explanation: 'When deleting a node with two children, we replace it with its inorder successor (smallest in right subtree) or inorder predecessor (largest in left subtree) to maintain BST property.'
  },
  {
    id: 'bst-004',
    topicId: 'binary-search-trees',
    type: 'code_trace',
    difficulty: 3,
    content: 'What traversal of a BST produces elements in sorted ascending order?',
    options: [
      'Preorder',
      'Inorder',
      'Postorder',
      'Level order'
    ],
    correctAnswer: 1,
    explanation: 'Inorder traversal (Left-Root-Right) of a BST visits nodes in sorted ascending order because we visit all smaller elements before each node and all larger elements after.'
  },
  {
    id: 'bst-005',
    topicId: 'binary-search-trees',
    type: 'mcq',
    difficulty: 4,
    content: 'In the worst case (skewed tree), what is the time complexity of BST operations?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 2,
    explanation: 'A skewed BST (all nodes on one side) degenerates to a linked list, making search, insert, and delete O(n). This is why balanced BSTs like AVL are important.'
  },

  // AVL Tree Questions
  {
    id: 'avl-001',
    topicId: 'avl-trees',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the allowed range for the balance factor of any node in an AVL tree?',
    options: [
      '0 only',
      '-1, 0, or 1',
      '-2 to 2',
      'Any integer'
    ],
    correctAnswer: 1,
    explanation: 'An AVL tree maintains balance by ensuring every node has a balance factor (height of left subtree - height of right subtree) of -1, 0, or 1.'
  },
  {
    id: 'avl-002',
    topicId: 'avl-trees',
    type: 'mcq',
    difficulty: 3,
    content: 'Which rotation is needed when a node becomes unbalanced due to insertion in the left subtree of its left child?',
    options: [
      'Left rotation',
      'Right rotation',
      'Left-Right rotation',
      'Right-Left rotation'
    ],
    correctAnswer: 1,
    explanation: 'This is an LL (Left-Left) case, requiring a single right rotation to rebalance. The left child becomes the new root of the subtree.'
  },
  {
    id: 'avl-003',
    topicId: 'avl-trees',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the time complexity of insertion in an AVL tree?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 1,
    explanation: 'AVL trees guarantee O(log n) height, so insertion (including potential rotations) takes O(log n) time. Rotations are O(1) operations.'
  },
  {
    id: 'avl-004',
    topicId: 'avl-trees',
    type: 'mcq',
    difficulty: 4,
    content: 'In an LR (Left-Right) case, what rotations are performed?',
    options: [
      'Single left rotation',
      'Single right rotation',
      'Left rotation on left child, then right rotation on node',
      'Right rotation on right child, then left rotation on node'
    ],
    correctAnswer: 2,
    explanation: 'LR case means the node is left-heavy but its left child is right-heavy. We first do a left rotation on the left child to convert to LL case, then a right rotation on the node.'
  },
  {
    id: 'avl-005',
    topicId: 'avl-trees',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the maximum height of an AVL tree with n nodes?',
    options: [
      'Exactly log₂(n)',
      'Approximately 1.44 log₂(n)',
      'n-1',
      'n/2'
    ],
    correctAnswer: 1,
    explanation: 'An AVL tree has maximum height approximately 1.44 log₂(n), which is still O(log n). This is slightly worse than a perfectly balanced tree but guarantees logarithmic operations.'
  },

  // Additional Memory Management Questions
  {
    id: 'mm-005',
    topicId: 'memory-management',
    type: 'mcq',
    difficulty: 3,
    content: 'What is "interning" in Python memory management?',
    options: [
      'Automatic garbage collection',
      'Reusing immutable objects with the same value',
      'Allocating memory on the stack',
      'Compressing memory usage'
    ],
    correctAnswer: 1,
    explanation: 'Python interns small integers and some strings, meaning objects with the same value share the same memory location. This saves memory for frequently used values.'
  },

  // Additional Linked List Questions
  {
    id: 'll-006',
    topicId: 'linked-lists',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the main characteristic of a circular linked list?',
    options: [
      'It has no head pointer',
      'The last node points back to the first node',
      'All nodes point to each other',
      'It can only store circular data'
    ],
    correctAnswer: 1,
    explanation: 'In a circular linked list, the last node points back to the first node, creating a loop. This is useful for applications like round-robin scheduling.'
  },
  {
    id: 'll-007',
    topicId: 'linked-lists',
    type: 'code_trace',
    difficulty: 4,
    content: 'What happens if you traverse a circular linked list without a termination condition?',
    options: [
      'It throws an error',
      'It traverses once and stops',
      'It enters an infinite loop',
      'It returns None'
    ],
    correctAnswer: 2,
    explanation: 'Since the last node points to the first node, traversing without checking if you have returned to the starting point will result in an infinite loop.'
  },

  // Additional Stack Questions
  {
    id: 'st-006',
    topicId: 'stacks',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the postfix (Reverse Polish Notation) of the infix expression: 3 + 4 * 5?',
    options: [
      '3 4 + 5 *',
      '3 4 5 * +',
      '+ 3 * 4 5',
      '* + 3 4 5'
    ],
    correctAnswer: 1,
    explanation: 'Following operator precedence, multiplication happens first. In postfix, the expression becomes 3 4 5 * + which means: multiply 4 and 5, then add 3.'
  },
  {
    id: 'st-007',
    topicId: 'stacks',
    type: 'code_trace',
    difficulty: 4,
    content: 'Evaluate the postfix expression: 2 3 + 4 *',
    options: ['14', '20', '24', '9'],
    correctAnswer: 1,
    explanation: '2 3 + evaluates to 5. Then 5 4 * evaluates to 20. Postfix evaluation uses a stack to push operands and pop when an operator is encountered.'
  },

  // Additional Queue Questions
  {
    id: 'qu-006',
    topicId: 'queues',
    type: 'mcq',
    difficulty: 3,
    content: 'In a priority queue implemented with a min-heap, which element is dequeued first?',
    options: [
      'The largest element',
      'The smallest element',
      'The first inserted element',
      'The last inserted element'
    ],
    correctAnswer: 1,
    explanation: 'A min-heap priority queue always dequeues the element with the smallest priority value first, regardless of insertion order.'
  },
  {
    id: 'qu-007',
    topicId: 'queues',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the time complexity of insertion in a heap-based priority queue?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 1,
    explanation: 'Inserting into a heap requires placing the element at the end and then "bubbling up" to maintain the heap property, which takes O(log n) time.'
  },

  // Additional Binary Tree Questions
  {
    id: 'bt-006',
    topicId: 'binary-trees',
    type: 'code_trace',
    difficulty: 3,
    content: 'Given inorder: [4,2,5,1,3] and preorder: [1,2,4,5,3], which node is the root?',
    options: ['4', '2', '1', '3'],
    correctAnswer: 2,
    explanation: 'In preorder traversal, the first element is always the root. So the root is 1.'
  },
  {
    id: 'bt-007',
    topicId: 'binary-trees',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the maximum number of nodes at level k of a binary tree (root is level 0)?',
    options: ['k', 'k+1', '2^k', '2^(k+1)'],
    correctAnswer: 2,
    explanation: 'At level k, a binary tree can have at most 2^k nodes. Level 0 has 1 node, level 1 has 2, level 2 has 4, and so on.'
  },

  // Additional BST Questions
  {
    id: 'bst-006',
    topicId: 'binary-search-trees',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the inorder predecessor of a node in a BST?',
    options: [
      'The smallest node in the right subtree',
      'The largest node in the left subtree',
      'The parent node',
      'The root node'
    ],
    correctAnswer: 1,
    explanation: 'The inorder predecessor is the node that comes just before the given node in an inorder traversal, which is the rightmost (largest) node in its left subtree.'
  },
  {
    id: 'bst-007',
    topicId: 'binary-search-trees',
    type: 'code_trace',
    difficulty: 4,
    content: 'If we insert 5, 3, 7, 2, 4, 6, 8 into an empty BST in this order, what is the height of the tree?',
    options: ['2', '3', '4', '6'],
    correctAnswer: 0,
    explanation: 'The tree is perfectly balanced: 5 at root, 3 and 7 as children, 2,4 under 3 and 6,8 under 7. The height is 2 (counting edges from root to deepest leaf).'
  },

  // Additional AVL Questions
  {
    id: 'avl-006',
    topicId: 'avl-trees',
    type: 'mcq',
    difficulty: 4,
    content: 'After inserting 10, 20, 30 into an empty AVL tree, what rotation is performed?',
    options: [
      'No rotation needed',
      'Single right rotation',
      'Single left rotation',
      'Double rotation'
    ],
    correctAnswer: 2,
    explanation: 'Inserting 10, 20, 30 creates a right-skewed tree with balance factor -2 at root. This is an RR case requiring a single left rotation, making 20 the new root.'
  },
  {
    id: 'avl-007',
    topicId: 'avl-trees',
    type: 'mcq',
    difficulty: 5,
    content: 'What is the minimum number of nodes in an AVL tree of height h?',
    options: [
      '2^h',
      '2^h - 1',
      'N(h-1) + N(h-2) + 1 (Fibonacci-like)',
      'h + 1'
    ],
    correctAnswer: 2,
    explanation: 'The minimum nodes follow a Fibonacci-like sequence: N(h) = N(h-1) + N(h-2) + 1, where N(0)=1 and N(1)=2. This is because an AVL tree with minimum nodes has subtrees with heights h-1 and h-2.'
  },

  // SC1006 - ARM Programmer's Model Questions
  {
    id: 'arm-001',
    topicId: 'arm-programmers-model',
    type: 'mcq',
    difficulty: 1,
    content: 'How many general-purpose registers does the ARM processor have?',
    options: ['8', '12', '16', '32'],
    correctAnswer: 2,
    explanation: 'ARM has 16 registers (R0-R15). R0-R12 are general-purpose, while R13 (SP), R14 (LR), and R15 (PC) have special purposes.'
  },
  {
    id: 'arm-002',
    topicId: 'arm-programmers-model',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the purpose of the Link Register (LR/R14) in ARM?',
    options: [
      'Stores the current instruction address',
      'Stores the return address for function calls',
      'Points to the top of the stack',
      'Holds the program status flags'
    ],
    correctAnswer: 1,
    explanation: 'The Link Register (R14) stores the return address when a BL (Branch with Link) instruction is executed, allowing the program to return after a function call.'
  },
  {
    id: 'arm-003',
    topicId: 'arm-programmers-model',
    type: 'mcq',
    difficulty: 2,
    content: 'Which CPSR flag is set when an arithmetic operation produces a result of zero?',
    options: ['N (Negative)', 'Z (Zero)', 'C (Carry)', 'V (Overflow)'],
    correctAnswer: 1,
    explanation: 'The Z (Zero) flag is set when the result of an operation is zero. It is used by conditional instructions like BEQ (Branch if Equal).'
  },
  {
    id: 'arm-004',
    topicId: 'arm-programmers-model',
    type: 'mcq',
    difficulty: 3,
    content: 'What are the three stages of the instruction cycle in order?',
    options: [
      'Execute, Decode, Fetch',
      'Fetch, Execute, Decode',
      'Fetch, Decode, Execute',
      'Decode, Fetch, Execute'
    ],
    correctAnswer: 2,
    explanation: 'The instruction cycle is: Fetch (read instruction from memory), Decode (interpret the instruction), Execute (perform the operation).'
  },
  {
    id: 'arm-005',
    topicId: 'arm-programmers-model',
    type: 'code_trace',
    difficulty: 3,
    content: 'After executing "SUBS R0, R1, R1", what is the state of the Z flag?',
    options: [
      'Z = 0 (clear)',
      'Z = 1 (set)',
      'Undefined',
      'Depends on R1 value'
    ],
    correctAnswer: 1,
    explanation: 'SUBS subtracts R1 from R1, which always results in 0. Since the result is zero, the Z flag is set to 1. The S suffix means flags are updated.'
  },
  {
    id: 'arm-006',
    topicId: 'arm-programmers-model',
    type: 'mcq',
    difficulty: 2,
    content: 'What does the Stack Pointer (SP/R13) hold?',
    options: [
      'The address of the current instruction',
      'The return address for function calls',
      'The address of the top of the stack',
      'The result of the last operation'
    ],
    correctAnswer: 2,
    explanation: 'The Stack Pointer (R13) holds the address of the current top of the stack, used for pushing/popping data during function calls and local variable storage.'
  },
  {
    id: 'arm-007',
    topicId: 'arm-programmers-model',
    type: 'mcq',
    difficulty: 3,
    content: 'When is the V (Overflow) flag set?',
    options: [
      'When the result is negative',
      'When the result is zero',
      'When a signed arithmetic operation overflows',
      'When an unsigned operation produces a carry'
    ],
    correctAnswer: 2,
    explanation: 'The V flag is set when a signed arithmetic operation produces a result that cannot be represented correctly (e.g., adding two positive numbers gives a negative result).'
  },

  // SC1006 - Addressing Modes Questions
  {
    id: 'addr-001',
    topicId: 'addressing-modes',
    type: 'mcq',
    difficulty: 1,
    content: 'In the instruction "MOV R0, #100", what type of addressing mode is used for the second operand?',
    options: [
      'Register Direct',
      'Immediate',
      'Register Indirect',
      'PC-Relative'
    ],
    correctAnswer: 1,
    explanation: 'The # symbol indicates an immediate value. The value 100 is directly encoded in the instruction itself.'
  },
  {
    id: 'addr-002',
    topicId: 'addressing-modes',
    type: 'mcq',
    difficulty: 2,
    content: 'What does the instruction "LDR R0, [R1, #4]" do?',
    options: [
      'Load R0 with the value 4',
      'Load R0 from memory address R1',
      'Load R0 from memory address R1+4',
      'Load R0 and add 4 to R1'
    ],
    correctAnswer: 2,
    explanation: 'This is register indirect with offset. It loads R0 from the memory address calculated as R1 + 4. The offset is added but R1 is not modified.'
  },
  {
    id: 'addr-003',
    topicId: 'addressing-modes',
    type: 'code_trace',
    difficulty: 3,
    content: 'If R1 = 0x1000, what is R1 after executing "LDR R0, [R1, #8]!"?',
    options: ['0x1000', '0x1008', '0x0FF8', 'Unchanged'],
    correctAnswer: 1,
    explanation: 'The ! indicates pre-indexing with writeback. R1 is updated to R1 + 8 = 0x1008 before the load, and R1 retains this new value.'
  },
  {
    id: 'addr-004',
    topicId: 'addressing-modes',
    type: 'code_trace',
    difficulty: 3,
    content: 'If R1 = 0x1000, what is R1 after executing "LDR R0, [R1], #8"?',
    options: ['0x1000', '0x1008', '0x0FF8', 'Unchanged'],
    correctAnswer: 1,
    explanation: 'This is post-indexing. The load happens from address 0x1000 first, then R1 is updated to R1 + 8 = 0x1008.'
  },
  {
    id: 'addr-005',
    topicId: 'addressing-modes',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the difference between "LDR R0, [R1, #4]" and "LDR R0, [R1, #4]!"?',
    options: [
      'No difference',
      'The second modifies R0 differently',
      'The second updates R1 to R1+4',
      'The second loads from a different address'
    ],
    correctAnswer: 2,
    explanation: 'The ! suffix causes R1 to be updated with the calculated address (R1+4). Without !, R1 remains unchanged after the load.'
  },
  {
    id: 'addr-006',
    topicId: 'addressing-modes',
    type: 'mcq',
    difficulty: 3,
    content: 'In "LDR R0, [R1, R2, LSL #2]", how is the effective address calculated?',
    options: [
      'R1 + R2',
      'R1 + (R2 × 4)',
      'R1 × 4 + R2',
      '(R1 + R2) × 4'
    ],
    correctAnswer: 1,
    explanation: 'R2 is shifted left by 2 bits (multiplied by 4) before adding to R1. Effective address = R1 + (R2 << 2) = R1 + R2×4.'
  },
  {
    id: 'addr-007',
    topicId: 'addressing-modes',
    type: 'mcq',
    difficulty: 4,
    content: 'Which addressing mode is most useful for traversing an array element by element?',
    options: [
      'Immediate addressing',
      'Register direct addressing',
      'Post-indexed addressing',
      'PC-relative addressing'
    ],
    correctAnswer: 2,
    explanation: 'Post-indexed addressing (e.g., LDR R0, [R1], #4) loads the current element and automatically advances the pointer, perfect for array traversal in loops.'
  },

  // SC1006 - ARM Instruction Set Questions
  {
    id: 'inst-001',
    topicId: 'arm-instruction-set',
    type: 'mcq',
    difficulty: 1,
    content: 'Which instruction is used to copy a value from one register to another?',
    options: ['ADD', 'LDR', 'MOV', 'STR'],
    correctAnswer: 2,
    explanation: 'MOV (Move) copies a value into a register. It can copy from another register or load an immediate value.'
  },
  {
    id: 'inst-002',
    topicId: 'arm-instruction-set',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the difference between LDR and STR instructions?',
    options: [
      'LDR stores, STR loads',
      'LDR loads from memory, STR stores to memory',
      'LDR works with immediate, STR with registers',
      'No difference'
    ],
    correctAnswer: 1,
    explanation: 'LDR (Load Register) reads data from memory into a register. STR (Store Register) writes data from a register to memory.'
  },
  {
    id: 'inst-003',
    topicId: 'arm-instruction-set',
    type: 'code_trace',
    difficulty: 2,
    content: 'What is R2 after: MOV R0, #5; MOV R1, #3; ADD R2, R0, R1?',
    options: ['3', '5', '8', '15'],
    correctAnswer: 2,
    explanation: 'R0 = 5, R1 = 3. ADD R2, R0, R1 calculates R2 = R0 + R1 = 5 + 3 = 8.'
  },
  {
    id: 'inst-004',
    topicId: 'arm-instruction-set',
    type: 'mcq',
    difficulty: 2,
    content: 'What does the CMP instruction do?',
    options: [
      'Compares and stores the result',
      'Compares and sets CPSR flags only',
      'Copies if values are equal',
      'Combines two values'
    ],
    correctAnswer: 1,
    explanation: 'CMP (Compare) subtracts the second operand from the first and sets the CPSR flags based on the result, but does not store the result anywhere.'
  },
  {
    id: 'inst-005',
    topicId: 'arm-instruction-set',
    type: 'mcq',
    difficulty: 3,
    content: 'Which branch condition checks if the Z flag is set (result was zero)?',
    options: ['BNE', 'BEQ', 'BGT', 'BLT'],
    correctAnswer: 1,
    explanation: 'BEQ (Branch if Equal) branches when Z=1, indicating the previous comparison found equal values (difference was zero).'
  },
  {
    id: 'inst-006',
    topicId: 'arm-instruction-set',
    type: 'code_trace',
    difficulty: 3,
    content: 'What does "ADD R0, R1, R2, LSL #2" compute?',
    options: [
      'R0 = R1 + R2',
      'R0 = (R1 + R2) × 4',
      'R0 = R1 + (R2 × 4)',
      'R0 = (R1 × 4) + R2'
    ],
    correctAnswer: 2,
    explanation: 'The barrel shifter applies LSL #2 (multiply by 4) to R2 before the addition. So R0 = R1 + (R2 << 2) = R1 + R2×4.'
  },
  {
    id: 'inst-007',
    topicId: 'arm-instruction-set',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the purpose of the BL instruction compared to B?',
    options: [
      'BL is faster than B',
      'BL saves return address in LR before branching',
      'BL branches only if less than',
      'BL branches backward only'
    ],
    correctAnswer: 1,
    explanation: 'BL (Branch with Link) saves the return address (PC+4) in the Link Register (R14) before branching, enabling return with MOV PC, LR.'
  },
  {
    id: 'inst-008',
    topicId: 'arm-instruction-set',
    type: 'code_trace',
    difficulty: 4,
    content: 'After "MOV R0, #0xFF; AND R0, R0, #0x0F", what is R0?',
    options: ['0xFF', '0x0F', '0xF0', '0x00'],
    correctAnswer: 1,
    explanation: 'AND performs bitwise AND. 0xFF AND 0x0F = 0x0F. Only the lower 4 bits remain set.'
  },
  {
    id: 'inst-009',
    topicId: 'arm-instruction-set',
    type: 'mcq',
    difficulty: 4,
    content: 'For unsigned comparison after CMP, which condition checks if first operand is greater?',
    options: ['BGT (signed greater)', 'BHI (unsigned higher)', 'BPL (positive)', 'BGE (signed greater or equal)'],
    correctAnswer: 1,
    explanation: 'BHI (Branch if Higher) is used for unsigned greater-than comparison. BGT is for signed comparisons.'
  },

  // SC1006 - Cache Memory Questions
  {
    id: 'cache-001',
    topicId: 'cache-memory',
    type: 'mcq',
    difficulty: 1,
    content: 'What is the main purpose of cache memory?',
    options: [
      'To increase total memory capacity',
      'To speed up access to frequently used data',
      'To store programs permanently',
      'To replace main memory'
    ],
    correctAnswer: 1,
    explanation: 'Cache is a small, fast memory that stores copies of frequently accessed data, reducing the time the CPU waits for memory access.'
  },
  {
    id: 'cache-002',
    topicId: 'cache-memory',
    type: 'mcq',
    difficulty: 2,
    content: 'Which principle states that recently accessed data is likely to be accessed again soon?',
    options: [
      'Spatial locality',
      'Temporal locality',
      'Sequential locality',
      'Random locality'
    ],
    correctAnswer: 1,
    explanation: 'Temporal locality means recently accessed data will likely be accessed again soon. Spatial locality means nearby data will likely be accessed.'
  },
  {
    id: 'cache-003',
    topicId: 'cache-memory',
    type: 'mcq',
    difficulty: 2,
    content: 'In a direct-mapped cache, how many cache lines can a memory block map to?',
    options: ['Any line', 'Exactly one line', 'Two lines', 'Half the cache'],
    correctAnswer: 1,
    explanation: 'In direct-mapped cache, each memory block maps to exactly one cache line based on its address. This is simple but can cause conflicts.'
  },
  {
    id: 'cache-004',
    topicId: 'cache-memory',
    type: 'mcq',
    difficulty: 3,
    content: 'What happens during a cache miss?',
    options: [
      'Data is discarded',
      'Data is fetched from main memory into cache',
      'The program terminates',
      'Data is written to disk'
    ],
    correctAnswer: 1,
    explanation: 'On a cache miss, the required data is not in cache, so it must be fetched from the slower main memory and loaded into the cache.'
  },
  {
    id: 'cache-005',
    topicId: 'cache-memory',
    type: 'mcq',
    difficulty: 3,
    content: 'In a 4-way set associative cache, a memory block can be placed in:',
    options: [
      'Any cache line',
      'Exactly one cache line',
      'Any of 4 specific cache lines',
      'The first 4 cache lines only'
    ],
    correctAnswer: 2,
    explanation: 'In N-way set associative cache, each memory block maps to a set, and can be placed in any of the N lines within that set.'
  },
  {
    id: 'cache-006',
    topicId: 'cache-memory',
    type: 'mcq',
    difficulty: 4,
    content: 'Which cache mapping scheme has the highest flexibility but is most expensive to implement?',
    options: [
      'Direct mapped',
      'Set associative',
      'Fully associative',
      'Write-through'
    ],
    correctAnswer: 2,
    explanation: 'Fully associative cache allows any block to be placed in any line, offering maximum flexibility. However, it requires comparing tags with all cache lines, making it expensive.'
  },
  {
    id: 'cache-007',
    topicId: 'cache-memory',
    type: 'code_trace',
    difficulty: 4,
    content: 'A cache has 256 lines and 64-byte blocks. How many bits are needed for the offset field?',
    options: ['6 bits', '8 bits', '14 bits', '32 bits'],
    correctAnswer: 0,
    explanation: '64 bytes = 2^6, so 6 bits are needed to address any byte within a 64-byte block (the offset field).'
  },

  // SC1006 - Virtual Memory Questions
  {
    id: 'vm-001',
    topicId: 'virtual-memory',
    type: 'mcq',
    difficulty: 1,
    content: 'What does virtual memory allow a program to do?',
    options: [
      'Run faster than physical memory allows',
      'Use more memory than physically available',
      'Access memory without an operating system',
      'Bypass the CPU cache'
    ],
    correctAnswer: 1,
    explanation: 'Virtual memory allows programs to use address spaces larger than physical RAM by using disk storage as an extension of memory.'
  },
  {
    id: 'vm-002',
    topicId: 'virtual-memory',
    type: 'mcq',
    difficulty: 2,
    content: 'What component translates virtual addresses to physical addresses?',
    options: [
      'CPU cache',
      'Page table',
      'Main memory',
      'Hard disk'
    ],
    correctAnswer: 1,
    explanation: 'The page table maps virtual page numbers to physical frame numbers, enabling the translation from virtual to physical addresses.'
  },
  {
    id: 'vm-003',
    topicId: 'virtual-memory',
    type: 'mcq',
    difficulty: 2,
    content: 'What is a page fault?',
    options: [
      'An error in the page table',
      'The requested page is not in physical memory',
      'The page is corrupted',
      'Two pages have the same address'
    ],
    correctAnswer: 1,
    explanation: 'A page fault occurs when the requested page is not currently in physical memory and must be loaded from disk into RAM.'
  },
  {
    id: 'vm-004',
    topicId: 'virtual-memory',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the TLB (Translation Lookaside Buffer)?',
    options: [
      'A type of main memory',
      'A cache for page table entries',
      'A backup page table',
      'A disk buffer'
    ],
    correctAnswer: 1,
    explanation: 'The TLB is a hardware cache that stores recent virtual-to-physical address translations to speed up memory access.'
  },
  {
    id: 'vm-005',
    topicId: 'virtual-memory',
    type: 'code_trace',
    difficulty: 3,
    content: 'With 4KB pages and 32-bit virtual address, how many bits are used for the page offset?',
    options: ['10 bits', '12 bits', '20 bits', '32 bits'],
    correctAnswer: 1,
    explanation: '4KB = 4096 = 2^12 bytes, so 12 bits are needed to address any byte within a 4KB page (the page offset).'
  },
  {
    id: 'vm-006',
    topicId: 'virtual-memory',
    type: 'mcq',
    difficulty: 4,
    content: 'In virtual address translation, which part remains unchanged?',
    options: [
      'Virtual page number',
      'Physical frame number',
      'Page offset',
      'The entire address'
    ],
    correctAnswer: 2,
    explanation: 'The page offset remains unchanged during translation. Only the VPN is translated to PFN; the offset is combined with the PFN to form the physical address.'
  },
  {
    id: 'vm-007',
    topicId: 'virtual-memory',
    type: 'mcq',
    difficulty: 4,
    content: 'Why is a page fault much more expensive than a cache miss?',
    options: [
      'Page tables are larger than cache tags',
      'Disk access is much slower than memory access',
      'Virtual addresses are longer',
      'Page faults require CPU intervention'
    ],
    correctAnswer: 1,
    explanation: 'A page fault requires loading data from disk, which is orders of magnitude slower than memory access (milliseconds vs nanoseconds).'
  },
  {
    id: 'vm-008',
    topicId: 'virtual-memory',
    type: 'mcq',
    difficulty: 3,
    content: 'What benefit does virtual memory provide for process isolation?',
    options: [
      'Processes run faster',
      'Each process has its own address space',
      'Processes share all memory',
      'No memory protection'
    ],
    correctAnswer: 1,
    explanation: 'Each process has its own virtual address space. One process cannot access another process\'s physical memory, providing security and isolation.'
  },

  // SC1008 - C Programming Basics Questions
  {
    id: 'cb-001',
    topicId: 'c-basics',
    type: 'mcq',
    difficulty: 1,
    content: 'Which function is the entry point of a C program?',
    options: ['start()', 'begin()', 'main()', 'init()'],
    correctAnswer: 2,
    explanation: 'The main() function is the entry point where program execution begins in C.'
  },
  {
    id: 'cb-002',
    topicId: 'c-basics',
    type: 'mcq',
    difficulty: 1,
    content: 'What is the format specifier for printing an integer in printf()?',
    options: ['%f', '%c', '%d', '%s'],
    correctAnswer: 2,
    explanation: '%d is the format specifier for integers. %f is for float, %c for char, and %s for strings.'
  },
  {
    id: 'cb-003',
    topicId: 'c-basics',
    type: 'mcq',
    difficulty: 2,
    content: 'Why do we use & in scanf("%d", &num)?',
    options: [
      'To print the address',
      'To pass the address of the variable',
      'To multiply the value',
      'It is optional'
    ],
    correctAnswer: 1,
    explanation: 'scanf() needs the memory address of the variable to store the input value. The & operator provides this address.'
  },
  {
    id: 'cb-004',
    topicId: 'c-basics',
    type: 'code_trace',
    difficulty: 2,
    content: 'What is the output of this code?',
    codeSnippet: `int a = 10, b = 3;
printf("%d", a % b);`,
    options: ['3', '1', '3.33', '0'],
    correctAnswer: 1,
    explanation: 'The % operator returns the remainder of division. 10 % 3 = 1 (10 = 3*3 + 1).'
  },
  {
    id: 'cb-005',
    topicId: 'c-basics',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the size of int on most modern 32/64-bit systems?',
    options: ['1 byte', '2 bytes', '4 bytes', '8 bytes'],
    correctAnswer: 2,
    explanation: 'On most modern systems, int is 4 bytes (32 bits), capable of storing values from about -2 billion to +2 billion.'
  },
  {
    id: 'cb-006',
    topicId: 'c-basics',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is the output?',
    codeSnippet: `int x = 5;
printf("%d", x++);
printf("%d", x);`,
    options: ['5 5', '6 6', '5 6', '6 5'],
    correctAnswer: 2,
    explanation: 'x++ is post-increment: it uses the current value (5) then increments. So first printf shows 5, then x becomes 6 for the second printf.'
  },
  {
    id: 'cb-007',
    topicId: 'c-basics',
    type: 'mcq',
    difficulty: 3,
    content: 'What does the #include directive do?',
    options: [
      'Defines a variable',
      'Inserts the contents of a header file',
      'Creates a function',
      'Starts the program'
    ],
    correctAnswer: 1,
    explanation: '#include is a preprocessor directive that copies the contents of the specified header file into the source code before compilation.'
  },

  // SC1008 - Control Flow Questions
  {
    id: 'cf-001',
    topicId: 'control-flow',
    type: 'mcq',
    difficulty: 1,
    content: 'Which loop executes at least once regardless of the condition?',
    options: ['for loop', 'while loop', 'do-while loop', 'None of the above'],
    correctAnswer: 2,
    explanation: 'The do-while loop checks the condition after executing the body, so it always executes at least once.'
  },
  {
    id: 'cf-002',
    topicId: 'control-flow',
    type: 'code_trace',
    difficulty: 2,
    content: 'How many times does this loop execute?',
    codeSnippet: `for (int i = 0; i < 5; i++) {
    printf("%d ", i);
}`,
    options: ['4 times', '5 times', '6 times', 'Infinite'],
    correctAnswer: 1,
    explanation: 'The loop runs for i = 0, 1, 2, 3, 4 (total 5 times). When i becomes 5, the condition i < 5 is false and the loop exits.'
  },
  {
    id: 'cf-003',
    topicId: 'control-flow',
    type: 'mcq',
    difficulty: 2,
    content: 'What happens if you forget the break statement in a switch case?',
    options: [
      'Compilation error',
      'Only that case executes',
      'Fall-through to next case',
      'Program terminates'
    ],
    correctAnswer: 2,
    explanation: 'Without break, execution "falls through" to the next case, executing all subsequent cases until a break is encountered or the switch ends.'
  },
  {
    id: 'cf-004',
    topicId: 'control-flow',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is the output?',
    codeSnippet: `int i = 0;
while (i < 5) {
    if (i == 3) break;
    printf("%d ", i);
    i++;
}`,
    options: ['0 1 2 3 4', '0 1 2', '0 1 2 3', '1 2 3'],
    correctAnswer: 1,
    explanation: 'The loop prints 0, 1, 2. When i becomes 3, the break statement exits the loop immediately before printing 3.'
  },
  {
    id: 'cf-005',
    topicId: 'control-flow',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is the output?',
    codeSnippet: `for (int i = 0; i < 5; i++) {
    if (i == 2) continue;
    printf("%d ", i);
}`,
    options: ['0 1 2 3 4', '0 1 3 4', '0 1', '2'],
    correctAnswer: 1,
    explanation: 'continue skips the rest of the loop body for that iteration. When i is 2, it skips the printf and continues to i = 3.'
  },
  {
    id: 'cf-006',
    topicId: 'control-flow',
    type: 'mcq',
    difficulty: 2,
    content: 'In a for loop "for(init; condition; update)", when is the update executed?',
    options: [
      'Before checking condition',
      'After each iteration of the loop body',
      'Only once at the start',
      'Only when condition is false'
    ],
    correctAnswer: 1,
    explanation: 'In a for loop, the sequence is: init (once), then repeatedly: check condition, execute body, then update.'
  },
  {
    id: 'cf-007',
    topicId: 'control-flow',
    type: 'code_trace',
    difficulty: 4,
    content: 'What is the value of sum after this code?',
    codeSnippet: `int sum = 0;
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 2; j++) {
        sum++;
    }
}`,
    options: ['3', '5', '6', '9'],
    correctAnswer: 2,
    explanation: 'The outer loop runs 3 times (i=1,2,3). For each outer iteration, the inner loop runs 2 times. Total: 3 × 2 = 6 increments.'
  },

  // SC1008 - Functions Questions
  {
    id: 'fn-001',
    topicId: 'functions',
    type: 'mcq',
    difficulty: 1,
    content: 'What is a function prototype in C?',
    options: [
      'The function body',
      'A declaration that tells the compiler about the function',
      'A variable declaration',
      'A loop statement'
    ],
    correctAnswer: 1,
    explanation: 'A function prototype declares the function\'s return type, name, and parameters before main(), allowing the compiler to validate function calls.'
  },
  {
    id: 'fn-002',
    topicId: 'functions',
    type: 'mcq',
    difficulty: 2,
    content: 'When a variable is passed by value to a function, what happens?',
    options: [
      'The original variable is modified',
      'A copy of the variable is created',
      'The variable is deleted',
      'Nothing happens'
    ],
    correctAnswer: 1,
    explanation: 'Pass by value creates a copy of the argument. Changes to the parameter inside the function do not affect the original variable.'
  },
  {
    id: 'fn-003',
    topicId: 'functions',
    type: 'code_trace',
    difficulty: 2,
    content: 'What is the output?',
    codeSnippet: `void modify(int x) {
    x = 100;
}
int main() {
    int a = 5;
    modify(a);
    printf("%d", a);
    return 0;
}`,
    options: ['5', '100', '0', 'Error'],
    correctAnswer: 0,
    explanation: 'Since modify() receives a copy of a (pass by value), changing x inside the function doesn\'t affect the original variable a.'
  },
  {
    id: 'fn-004',
    topicId: 'functions',
    type: 'mcq',
    difficulty: 2,
    content: 'What does a void return type indicate?',
    options: [
      'The function returns 0',
      'The function returns nothing',
      'The function returns any type',
      'Compilation error'
    ],
    correctAnswer: 1,
    explanation: 'A void return type means the function does not return any value. Such functions are used for their side effects.'
  },
  {
    id: 'fn-005',
    topicId: 'functions',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is the output?',
    codeSnippet: `int counter() {
    static int count = 0;
    count++;
    return count;
}
int main() {
    printf("%d ", counter());
    printf("%d ", counter());
    printf("%d", counter());
    return 0;
}`,
    options: ['1 1 1', '1 2 3', '0 1 2', '3 3 3'],
    correctAnswer: 1,
    explanation: 'Static local variables retain their value between function calls. count persists and increments each call: 1, 2, 3.'
  },
  {
    id: 'fn-006',
    topicId: 'functions',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the scope of a local variable?',
    options: [
      'The entire program',
      'Only the function where it\'s declared',
      'All functions in the file',
      'The main function only'
    ],
    correctAnswer: 1,
    explanation: 'Local variables are only accessible within the function (or block) where they are declared. They are created when the function is called and destroyed when it returns.'
  },
  {
    id: 'fn-007',
    topicId: 'functions',
    type: 'code_trace',
    difficulty: 4,
    content: 'What is the output?',
    codeSnippet: `int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

int main() {
    printf("%d", multiply(add(2, 3), add(1, 1)));
    return 0;
}`,
    options: ['5', '7', '10', '12'],
    correctAnswer: 2,
    explanation: 'add(2,3) = 5, add(1,1) = 2. Then multiply(5, 2) = 10. Functions can be nested in arguments.'
  },

  // SC1008 - Pointers Questions
  {
    id: 'ptr-001',
    topicId: 'pointers',
    type: 'mcq',
    difficulty: 1,
    content: 'What does the & operator do when used with a variable?',
    options: [
      'Multiplies the variable by 2',
      'Returns the memory address of the variable',
      'Declares a reference',
      'Performs logical AND'
    ],
    correctAnswer: 1,
    explanation: 'The & (address-of) operator returns the memory address where the variable is stored.'
  },
  {
    id: 'ptr-002',
    topicId: 'pointers',
    type: 'mcq',
    difficulty: 2,
    content: 'What does the * operator do when used with a pointer?',
    options: [
      'Multiplies the pointer',
      'Declares a pointer',
      'Dereferences (accesses value at the address)',
      'Calculates the size'
    ],
    correctAnswer: 2,
    explanation: 'The * (dereference) operator accesses the value stored at the address held by the pointer.'
  },
  {
    id: 'ptr-003',
    topicId: 'pointers',
    type: 'code_trace',
    difficulty: 2,
    content: 'What is the output?',
    codeSnippet: `int x = 10;
int *p = &x;
*p = 20;
printf("%d", x);`,
    options: ['10', '20', 'Address of x', 'Error'],
    correctAnswer: 1,
    explanation: 'p points to x. *p = 20 modifies the value at the address p points to, which is x. So x becomes 20.'
  },
  {
    id: 'ptr-004',
    topicId: 'pointers',
    type: 'mcq',
    difficulty: 3,
    content: 'If int *p points to an integer and we do p++, by how many bytes does p increase?',
    options: ['1 byte', '2 bytes', '4 bytes (sizeof int)', 'Depends on the value'],
    correctAnswer: 2,
    explanation: 'Pointer arithmetic moves by the size of the pointed type. For int* on most systems, p++ moves by 4 bytes (sizeof(int)).'
  },
  {
    id: 'ptr-005',
    topicId: 'pointers',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is the output?',
    codeSnippet: `int arr[] = {10, 20, 30, 40};
int *p = arr;
printf("%d ", *p);
p++;
printf("%d", *p);`,
    options: ['10 10', '10 20', '20 30', 'Error'],
    correctAnswer: 1,
    explanation: 'p initially points to arr[0] (10). After p++, p points to arr[1] (20). Output: 10 20.'
  },
  {
    id: 'ptr-006',
    topicId: 'pointers',
    type: 'mcq',
    difficulty: 3,
    content: 'What is a NULL pointer?',
    options: [
      'A pointer that points to zero value',
      'A pointer that points to nothing (address 0)',
      'An uninitialized pointer',
      'A pointer to a void type'
    ],
    correctAnswer: 1,
    explanation: 'NULL pointer holds the value 0 (or nullptr in C++), indicating it points to no valid memory location. It\'s used to indicate "no object".'
  },
  {
    id: 'ptr-007',
    topicId: 'pointers',
    type: 'code_trace',
    difficulty: 4,
    content: 'What is the output?',
    codeSnippet: `void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}
int main() {
    int x = 5, y = 10;
    swap(&x, &y);
    printf("%d %d", x, y);
    return 0;
}`,
    options: ['5 10', '10 5', '5 5', '10 10'],
    correctAnswer: 1,
    explanation: 'The swap function receives pointers to x and y. By dereferencing, it swaps the actual values. Result: x=10, y=5.'
  },

  // SC1008 - Arrays Questions
  {
    id: 'arr-001',
    topicId: 'arrays',
    type: 'mcq',
    difficulty: 1,
    content: 'What is the index of the first element in a C array?',
    options: ['1', '0', '-1', 'Depends on declaration'],
    correctAnswer: 1,
    explanation: 'In C, array indices start at 0. The first element is arr[0].'
  },
  {
    id: 'arr-002',
    topicId: 'arrays',
    type: 'code_trace',
    difficulty: 2,
    content: 'What is arr[2] in this array?',
    codeSnippet: `int arr[] = {10, 20, 30, 40, 50};`,
    options: ['10', '20', '30', '40'],
    correctAnswer: 2,
    explanation: 'arr[0]=10, arr[1]=20, arr[2]=30. Array indexing starts at 0.'
  },
  {
    id: 'arr-003',
    topicId: 'arrays',
    type: 'mcq',
    difficulty: 2,
    content: 'How do you calculate the number of elements in an array?',
    options: [
      'sizeof(arr)',
      'sizeof(arr) / sizeof(arr[0])',
      'length(arr)',
      'arr.size()'
    ],
    correctAnswer: 1,
    explanation: 'sizeof(arr) gives total bytes, sizeof(arr[0]) gives bytes per element. Dividing gives the element count.'
  },
  {
    id: 'arr-004',
    topicId: 'arrays',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the null terminator in C strings?',
    options: ['\\n', '\\0', '\\t', 'NULL'],
    correctAnswer: 1,
    explanation: '\\0 (null character, ASCII 0) marks the end of a C string. String functions use it to know where the string ends.'
  },
  {
    id: 'arr-005',
    topicId: 'arrays',
    type: 'code_trace',
    difficulty: 3,
    content: 'What does strlen() return for this string?',
    codeSnippet: `char str[] = "Hello";
printf("%lu", strlen(str));`,
    options: ['5', '6', '4', 'Error'],
    correctAnswer: 0,
    explanation: 'strlen() returns 5, counting characters up to (but not including) the null terminator. "Hello" has 5 characters.'
  },
  {
    id: 'arr-006',
    topicId: 'arrays',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is the relationship between arr and &arr[0]?',
    codeSnippet: `int arr[5];`,
    options: [
      'They are unrelated',
      'arr equals &arr[0] (both point to first element)',
      'arr is larger than &arr[0]',
      '&arr[0] is the size of arr'
    ],
    correctAnswer: 1,
    explanation: 'The array name "decays" to a pointer to its first element. arr and &arr[0] both represent the same address.'
  },
  {
    id: 'arr-007',
    topicId: 'arrays',
    type: 'code_trace',
    difficulty: 4,
    content: 'What is the output?',
    codeSnippet: `int matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};
printf("%d", matrix[1][2]);`,
    options: ['2', '3', '5', '6'],
    correctAnswer: 3,
    explanation: 'matrix[1] is the second row {4, 5, 6}. matrix[1][2] is the third element of that row, which is 6.'
  },

  // SC1008 - Structures Questions
  {
    id: 'str-001',
    topicId: 'structures',
    type: 'mcq',
    difficulty: 1,
    content: 'What keyword is used to define a structure in C?',
    options: ['class', 'struct', 'type', 'record'],
    correctAnswer: 1,
    explanation: 'The struct keyword is used to define a structure, which groups related variables of different types.'
  },
  {
    id: 'str-002',
    topicId: 'structures',
    type: 'mcq',
    difficulty: 2,
    content: 'Which operator is used to access a structure member using a structure variable?',
    options: ['->', '::', '.', '[]'],
    correctAnswer: 2,
    explanation: 'The dot (.) operator accesses members when you have a structure variable. Arrow (->) is used with structure pointers.'
  },
  {
    id: 'str-003',
    topicId: 'structures',
    type: 'mcq',
    difficulty: 2,
    content: 'Which operator is used to access a structure member using a pointer to the structure?',
    options: ['.', '->', '&', '*'],
    correctAnswer: 1,
    explanation: 'The arrow (->) operator is used with pointers to structures. ptr->member is equivalent to (*ptr).member.'
  },
  {
    id: 'str-004',
    topicId: 'structures',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is the output?',
    codeSnippet: `struct Point { int x, y; };
struct Point p = {10, 20};
struct Point *ptr = &p;
printf("%d", ptr->y);`,
    options: ['10', '20', 'Address of y', 'Error'],
    correctAnswer: 1,
    explanation: 'ptr points to p. ptr->y accesses the y member of the structure p points to, which is 20.'
  },
  {
    id: 'str-005',
    topicId: 'structures',
    type: 'mcq',
    difficulty: 3,
    content: 'What does typedef do in C?',
    options: [
      'Creates a new data type',
      'Creates an alias for an existing type',
      'Defines a type variable',
      'Checks the type of a variable'
    ],
    correctAnswer: 1,
    explanation: 'typedef creates an alias (alternative name) for an existing type, making code more readable (e.g., typedef struct {...} Point;).'
  },
  {
    id: 'str-006',
    topicId: 'structures',
    type: 'mcq',
    difficulty: 3,
    content: 'When passing a large structure to a function, which method is more efficient?',
    options: [
      'Pass by value',
      'Pass by pointer (reference)',
      'Both are equally efficient',
      'Structures cannot be passed to functions'
    ],
    correctAnswer: 1,
    explanation: 'Passing by pointer is more efficient because only the address (typically 4 or 8 bytes) is copied, not the entire structure.'
  },
  {
    id: 'str-007',
    topicId: 'structures',
    type: 'code_trace',
    difficulty: 4,
    content: 'What is the output?',
    codeSnippet: `typedef struct {
    char name[10];
    int age;
} Person;

void birthday(Person *p) {
    p->age++;
}

int main() {
    Person alice = {"Alice", 25};
    birthday(&alice);
    printf("%d", alice.age);
    return 0;
}`,
    options: ['25', '26', 'Error', '0'],
    correctAnswer: 1,
    explanation: 'birthday() receives a pointer to alice and increments age. Since we pass a pointer, the original structure is modified. Age becomes 26.'
  },

  // SC1008 - Recursion Questions
  {
    id: 'rec-001',
    topicId: 'recursion',
    type: 'mcq',
    difficulty: 1,
    content: 'What is a recursive function?',
    options: [
      'A function that runs forever',
      'A function that calls itself',
      'A function with no parameters',
      'A function that returns void'
    ],
    correctAnswer: 1,
    explanation: 'A recursive function is one that calls itself, typically with a smaller input, to solve a problem by breaking it into subproblems.'
  },
  {
    id: 'rec-002',
    topicId: 'recursion',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the base case in recursion?',
    options: [
      'The recursive call',
      'The condition that stops the recursion',
      'The first function call',
      'The return statement'
    ],
    correctAnswer: 1,
    explanation: 'The base case is a condition that stops the recursion. Without it, the function would call itself infinitely (stack overflow).'
  },
  {
    id: 'rec-003',
    topicId: 'recursion',
    type: 'code_trace',
    difficulty: 2,
    content: 'What is the output?',
    codeSnippet: `int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
printf("%d", factorial(4));`,
    options: ['4', '10', '24', '120'],
    correctAnswer: 2,
    explanation: '4! = 4 × 3 × 2 × 1 = 24. The recursion: factorial(4) = 4 * factorial(3) = 4 * 3 * factorial(2) = 4 * 3 * 2 * factorial(1) = 4 * 3 * 2 * 1 = 24.'
  },
  {
    id: 'rec-004',
    topicId: 'recursion',
    type: 'mcq',
    difficulty: 3,
    content: 'What happens if a recursive function has no base case?',
    options: [
      'It returns 0',
      'It runs forever until stack overflow',
      'Compilation error',
      'It returns immediately'
    ],
    correctAnswer: 1,
    explanation: 'Without a base case, the function keeps calling itself indefinitely, consuming stack memory until a stack overflow error occurs.'
  },
  {
    id: 'rec-005',
    topicId: 'recursion',
    type: 'code_trace',
    difficulty: 3,
    content: 'What does this function compute?',
    codeSnippet: `int mystery(int n) {
    if (n <= 1) return n;
    return mystery(n-1) + mystery(n-2);
}`,
    options: [
      'Factorial of n',
      'Sum from 1 to n',
      'Fibonacci number at position n',
      'Power of 2'
    ],
    correctAnswer: 2,
    explanation: 'This is the Fibonacci sequence: F(n) = F(n-1) + F(n-2), with F(0)=0, F(1)=1. It computes the nth Fibonacci number.'
  },
  {
    id: 'rec-006',
    topicId: 'recursion',
    type: 'code_trace',
    difficulty: 4,
    content: 'What is the output?',
    codeSnippet: `void countdown(int n) {
    if (n <= 0) {
        printf("Go!");
        return;
    }
    printf("%d ", n);
    countdown(n - 1);
}
countdown(3);`,
    options: ['Go! 1 2 3', '3 2 1 Go!', '3 2 1', '1 2 3 Go!'],
    correctAnswer: 1,
    explanation: 'The function prints n, then recurses with n-1. So it prints 3, then 2, then 1, then when n=0, it prints "Go!".'
  },
  {
    id: 'rec-007',
    topicId: 'recursion',
    type: 'code_trace',
    difficulty: 4,
    content: 'What is the output?',
    codeSnippet: `int sum(int n) {
    if (n == 0) return 0;
    return n + sum(n - 1);
}
printf("%d", sum(5));`,
    options: ['5', '10', '15', '20'],
    correctAnswer: 2,
    explanation: 'This computes 5 + 4 + 3 + 2 + 1 + 0 = 15. The function sums all integers from n down to 0.'
  },

  // SC1007 - Algorithm Analysis Questions
  {
    id: 'aa-001',
    topicId: 'algorithm-analysis',
    type: 'mcq',
    difficulty: 1,
    content: 'What does Big O notation describe?',
    options: [
      'The exact running time of an algorithm',
      'The upper bound of an algorithm\'s growth rate',
      'The minimum memory required',
      'The average case performance only'
    ],
    correctAnswer: 1,
    explanation: 'Big O notation describes the upper bound (worst case) of how an algorithm\'s time or space requirements grow as input size increases.'
  },
  {
    id: 'aa-002',
    topicId: 'algorithm-analysis',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the time complexity of binary search?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 1,
    explanation: 'Binary search halves the search space each iteration, resulting in O(log n) time complexity.'
  },
  {
    id: 'aa-003',
    topicId: 'algorithm-analysis',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the time complexity of a single loop iterating through n elements?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 2,
    explanation: 'A single loop that iterates through all n elements once is O(n) - linear time.'
  },
  {
    id: 'aa-004',
    topicId: 'algorithm-analysis',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the time complexity of two nested loops, each iterating n times?',
    options: ['O(n)', 'O(2n)', 'O(n log n)', 'O(n²)'],
    correctAnswer: 3,
    explanation: 'Two nested loops each running n times results in n × n = n² iterations, giving O(n²).'
  },
  {
    id: 'aa-005',
    topicId: 'algorithm-analysis',
    type: 'mcq',
    difficulty: 3,
    content: 'Which operation order is correct from fastest to slowest?',
    options: [
      'O(n) < O(log n) < O(1)',
      'O(1) < O(log n) < O(n)',
      'O(log n) < O(1) < O(n)',
      'O(n) < O(1) < O(log n)'
    ],
    correctAnswer: 1,
    explanation: 'O(1) constant is fastest, O(log n) logarithmic is next, then O(n) linear.'
  },
  {
    id: 'aa-006',
    topicId: 'algorithm-analysis',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is the time complexity of this code?',
    codeSnippet: `for i in range(n):
    for j in range(n):
        for k in range(n):
            print(i, j, k)`,
    options: ['O(n)', 'O(n²)', 'O(n³)', 'O(3n)'],
    correctAnswer: 2,
    explanation: 'Three nested loops each running n times: n × n × n = n³, giving O(n³).'
  },
  {
    id: 'aa-007',
    topicId: 'algorithm-analysis',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the time complexity of recursive Fibonacci without memoization?',
    options: ['O(n)', 'O(n²)', 'O(2^n)', 'O(n!)'],
    correctAnswer: 2,
    explanation: 'Each call branches into two calls, creating an exponential tree. The complexity is approximately O(2^n).'
  },

  // SC1007 - Heaps Questions
  {
    id: 'heap-001',
    topicId: 'heaps',
    type: 'mcq',
    difficulty: 1,
    content: 'In a max-heap, where is the largest element located?',
    options: ['At a leaf node', 'At the root', 'At the last position', 'Anywhere in the heap'],
    correctAnswer: 1,
    explanation: 'In a max-heap, the largest element is always at the root because every parent is larger than its children.'
  },
  {
    id: 'heap-002',
    topicId: 'heaps',
    type: 'mcq',
    difficulty: 2,
    content: 'In an array representation of a heap, if a node is at index i, where is its left child?',
    options: ['i - 1', 'i + 1', '2i + 1', '2i'],
    correctAnswer: 2,
    explanation: 'For a 0-indexed array: left child is at 2i + 1, right child at 2i + 2, parent at (i-1)//2.'
  },
  {
    id: 'heap-003',
    topicId: 'heaps',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the time complexity of inserting an element into a heap?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 1,
    explanation: 'Insert adds element at end and bubbles up. The bubble up process takes at most O(log n) swaps (height of tree).'
  },
  {
    id: 'heap-004',
    topicId: 'heaps',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the time complexity of building a heap from an unsorted array using heapify?',
    options: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'],
    correctAnswer: 1,
    explanation: 'Bottom-up heapify is O(n). Though it seems like O(n log n), most nodes are near the bottom and require few swaps.'
  },
  {
    id: 'heap-005',
    topicId: 'heaps',
    type: 'mcq',
    difficulty: 3,
    content: 'Which data structure is most commonly used to implement a priority queue?',
    options: ['Linked list', 'Array', 'Heap', 'Stack'],
    correctAnswer: 2,
    explanation: 'Heaps provide O(log n) insert and O(log n) extract-min/max, making them ideal for priority queues.'
  },
  {
    id: 'heap-006',
    topicId: 'heaps',
    type: 'code_trace',
    difficulty: 3,
    content: 'After inserting 5, 3, 8, 1 into an empty min-heap (in that order), what is at the root?',
    options: ['5', '3', '8', '1'],
    correctAnswer: 3,
    explanation: 'Min-heap keeps smallest at root. After all inserts, 1 bubbles up to become the root.'
  },
  {
    id: 'heap-007',
    topicId: 'heaps',
    type: 'mcq',
    difficulty: 4,
    content: 'What algorithm uses a heap to sort elements efficiently?',
    options: ['Quick sort', 'Merge sort', 'Heap sort', 'Bubble sort'],
    correctAnswer: 2,
    explanation: 'Heap sort builds a heap then repeatedly extracts the max/min. It has O(n log n) time complexity.'
  },

  // SC1007 - Hash Tables Questions
  {
    id: 'ht-001',
    topicId: 'hash-tables',
    type: 'mcq',
    difficulty: 1,
    content: 'What is the average time complexity for searching in a hash table?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 0,
    explanation: 'Hash tables provide average O(1) time for search, insert, and delete by using a hash function to directly compute the index.'
  },
  {
    id: 'ht-002',
    topicId: 'hash-tables',
    type: 'mcq',
    difficulty: 2,
    content: 'What is a collision in a hash table?',
    options: [
      'When the table is full',
      'When two different keys hash to the same index',
      'When a key is not found',
      'When the hash function fails'
    ],
    correctAnswer: 1,
    explanation: 'A collision occurs when two different keys produce the same hash value, mapping to the same bucket/index.'
  },
  {
    id: 'ht-003',
    topicId: 'hash-tables',
    type: 'mcq',
    difficulty: 2,
    content: 'Which collision resolution technique uses linked lists at each bucket?',
    options: ['Linear probing', 'Quadratic probing', 'Chaining', 'Double hashing'],
    correctAnswer: 2,
    explanation: 'Chaining (separate chaining) stores colliding elements in a linked list at each bucket.'
  },
  {
    id: 'ht-004',
    topicId: 'hash-tables',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the load factor of a hash table?',
    options: [
      'The number of empty slots',
      'The ratio of elements to table size (n/m)',
      'The maximum number of collisions',
      'The hash function complexity'
    ],
    correctAnswer: 1,
    explanation: 'Load factor α = n/m where n is the number of elements and m is the table size. Higher load factor means more collisions.'
  },
  {
    id: 'ht-005',
    topicId: 'hash-tables',
    type: 'mcq',
    difficulty: 3,
    content: 'In linear probing, if slot i is occupied, where do we look next?',
    options: ['i - 1', 'i + 1', 'i * 2', 'i²'],
    correctAnswer: 1,
    explanation: 'Linear probing checks consecutive slots: i, i+1, i+2, etc. (wrapping around if necessary).'
  },
  {
    id: 'ht-006',
    topicId: 'hash-tables',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the worst-case time complexity for hash table operations?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 2,
    explanation: 'In the worst case (all keys hash to same index), operations become O(n) as we must search through all elements.'
  },
  {
    id: 'ht-007',
    topicId: 'hash-tables',
    type: 'mcq',
    difficulty: 3,
    content: 'When should a hash table be resized?',
    options: [
      'When load factor exceeds a threshold (e.g., 0.7)',
      'After every 10 insertions',
      'When a collision occurs',
      'Never, hash tables have fixed size'
    ],
    correctAnswer: 0,
    explanation: 'Hash tables are typically resized when load factor exceeds ~0.7 to maintain efficient O(1) average performance.'
  },

  // SC1007 - Tries Questions
  {
    id: 'trie-001',
    topicId: 'tries',
    type: 'mcq',
    difficulty: 1,
    content: 'What is a Trie primarily used for?',
    options: [
      'Sorting numbers',
      'Storing and searching strings',
      'Balancing binary trees',
      'Graph traversal'
    ],
    correctAnswer: 1,
    explanation: 'A Trie (prefix tree) is designed for efficient string storage and retrieval, especially for prefix-based operations.'
  },
  {
    id: 'trie-002',
    topicId: 'tries',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the time complexity of searching for a word of length m in a Trie?',
    options: ['O(1)', 'O(log n)', 'O(m)', 'O(n)'],
    correctAnswer: 2,
    explanation: 'Trie search takes O(m) time where m is the word length, as we traverse one node per character.'
  },
  {
    id: 'trie-003',
    topicId: 'tries',
    type: 'mcq',
    difficulty: 2,
    content: 'What does each node in a Trie represent?',
    options: [
      'A complete word',
      'A character',
      'A number',
      'A hash value'
    ],
    correctAnswer: 1,
    explanation: 'Each node in a Trie represents a character. The path from root to a node represents a prefix.'
  },
  {
    id: 'trie-004',
    topicId: 'tries',
    type: 'mcq',
    difficulty: 3,
    content: 'Which application is Tries most commonly used for?',
    options: [
      'Database indexing',
      'Autocomplete / typeahead',
      'Image compression',
      'Network routing only'
    ],
    correctAnswer: 1,
    explanation: 'Tries excel at autocomplete because finding all words with a given prefix is very efficient.'
  },
  {
    id: 'trie-005',
    topicId: 'tries',
    type: 'mcq',
    difficulty: 3,
    content: 'Why does each Trie node need an "isEndOfWord" flag?',
    options: [
      'To count word occurrences',
      'To mark where valid words end',
      'To store the word length',
      'To enable deletion'
    ],
    correctAnswer: 1,
    explanation: 'The flag distinguishes between prefixes and complete words. "app" might be in the Trie as part of "apple", but we need to know if "app" itself is a valid word.'
  },
  {
    id: 'trie-006',
    topicId: 'tries',
    type: 'mcq',
    difficulty: 4,
    content: 'Compared to hash tables, what is a disadvantage of Tries?',
    options: [
      'Slower prefix searches',
      'Higher memory usage',
      'Cannot store strings',
      'O(n) search time'
    ],
    correctAnswer: 1,
    explanation: 'Tries can use significant memory because each node may have many child pointers (26 for lowercase letters), especially for sparse data.'
  },
  {
    id: 'trie-007',
    topicId: 'tries',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the space complexity of a Trie storing n words with maximum length L?',
    options: ['O(n)', 'O(L)', 'O(n × L × alphabet_size)', 'O(log n)'],
    correctAnswer: 2,
    explanation: 'In the worst case, each character position needs a node with pointers for each alphabet character, giving O(n × L × alphabet_size).'
  },

  // SC1006 - Data Transfer Questions
  {
    id: 'dt-001',
    topicId: 'data-transfer',
    type: 'mcq',
    difficulty: 1,
    content: 'What does ADC stand for?',
    options: [
      'Automatic Data Controller',
      'Analog-to-Digital Converter',
      'Advanced Data Channel',
      'Asynchronous Data Communication'
    ],
    correctAnswer: 1,
    explanation: 'ADC (Analog-to-Digital Converter) converts continuous analog signals into discrete digital values.'
  },
  {
    id: 'dt-002',
    topicId: 'data-transfer',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the main disadvantage of polling for I/O?',
    options: [
      'It is too fast',
      'It wastes CPU cycles waiting',
      'It cannot detect device status',
      'It requires special hardware'
    ],
    correctAnswer: 1,
    explanation: 'Polling continuously checks device status, wasting CPU cycles that could be used for other tasks.'
  },
  {
    id: 'dt-003',
    topicId: 'data-transfer',
    type: 'mcq',
    difficulty: 2,
    content: 'Which I/O method allows the CPU to do other work while waiting for data?',
    options: ['Polling', 'Interrupts', 'Busy waiting', 'Synchronous I/O'],
    correctAnswer: 1,
    explanation: 'With interrupts, the device signals the CPU when ready, allowing the CPU to perform other tasks in the meantime.'
  },
  {
    id: 'dt-004',
    topicId: 'data-transfer',
    type: 'mcq',
    difficulty: 3,
    content: 'What is DMA (Direct Memory Access)?',
    options: [
      'CPU reads data directly from disk',
      'Hardware transfers data to memory without CPU involvement',
      'Memory accesses the CPU directly',
      'A type of cache memory'
    ],
    correctAnswer: 1,
    explanation: 'DMA allows dedicated hardware to transfer data directly between memory and devices, freeing the CPU for other tasks.'
  },
  {
    id: 'dt-005',
    topicId: 'data-transfer',
    type: 'mcq',
    difficulty: 3,
    content: 'Which is more suitable for long-distance data transmission?',
    options: ['Parallel transfer', 'Serial transfer', 'DMA', 'Polling'],
    correctAnswer: 1,
    explanation: 'Serial transfer is better for long distances because it has less signal interference and uses fewer wires than parallel transfer.'
  },
  {
    id: 'dt-006',
    topicId: 'data-transfer',
    type: 'mcq',
    difficulty: 3,
    content: 'In asynchronous serial communication, what marks the beginning of data?',
    options: ['Clock signal', 'Start bit', 'Parity bit', 'Stop bit'],
    correctAnswer: 1,
    explanation: 'Asynchronous communication uses a start bit to signal the beginning of data transmission, eliminating the need for a shared clock.'
  },
  {
    id: 'dt-007',
    topicId: 'data-transfer',
    type: 'mcq',
    difficulty: 4,
    content: 'Which I/O method is most efficient for large data transfers?',
    options: ['Polling', 'Programmed I/O', 'Interrupt-driven I/O', 'DMA'],
    correctAnswer: 3,
    explanation: 'DMA is most efficient for large transfers because the DMA controller handles the entire transfer, minimizing CPU involvement.'
  },

  // SC1006 - Memory Types Questions
  {
    id: 'mt-001',
    topicId: 'memory-types',
    type: 'mcq',
    difficulty: 1,
    content: 'Which type of memory loses its contents when power is turned off?',
    options: ['ROM', 'Flash', 'DRAM', 'SSD'],
    correctAnswer: 2,
    explanation: 'DRAM (Dynamic RAM) is volatile memory - it loses data when power is removed. It needs constant refreshing.'
  },
  {
    id: 'mt-002',
    topicId: 'memory-types',
    type: 'mcq',
    difficulty: 2,
    content: 'Which memory type is commonly used for CPU caches?',
    options: ['DRAM', 'SRAM', 'Flash', 'HDD'],
    correctAnswer: 1,
    explanation: 'SRAM (Static RAM) is faster than DRAM and doesn\'t need refresh, making it ideal for CPU caches despite higher cost.'
  },
  {
    id: 'mt-003',
    topicId: 'memory-types',
    type: 'mcq',
    difficulty: 2,
    content: 'Why does DRAM need periodic refreshing?',
    options: [
      'To prevent overheating',
      'To clear old data',
      'Because capacitors leak charge',
      'To synchronize with the CPU'
    ],
    correctAnswer: 2,
    explanation: 'DRAM stores bits as charge in capacitors, which naturally leak over time. Refreshing restores the charge before data is lost.'
  },
  {
    id: 'mt-004',
    topicId: 'memory-types',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the main advantage of SSD over HDD?',
    options: [
      'Lower cost per GB',
      'Much faster random access (no seek time)',
      'Longer lifespan',
      'Higher capacity'
    ],
    correctAnswer: 1,
    explanation: 'SSDs have no moving parts, eliminating seek time and rotational latency, making random access much faster than HDDs.'
  },
  {
    id: 'mt-005',
    topicId: 'memory-types',
    type: 'mcq',
    difficulty: 3,
    content: 'Which memory technology is used in USB drives and SD cards?',
    options: ['SRAM', 'DRAM', 'NAND Flash', 'ROM'],
    correctAnswer: 2,
    explanation: 'NAND Flash is used in USB drives, SD cards, and SSDs because it\'s non-volatile, dense, and relatively inexpensive.'
  },
  {
    id: 'mt-006',
    topicId: 'memory-types',
    type: 'mcq',
    difficulty: 4,
    content: 'Approximately how much faster is accessing L1 cache compared to main memory (DRAM)?',
    options: ['2x faster', '10x faster', '100x faster', 'Same speed'],
    correctAnswer: 2,
    explanation: 'L1 cache is about 100x faster than DRAM (~1ns vs ~100ns). This is why the memory hierarchy exists.'
  },
  {
    id: 'mt-007',
    topicId: 'memory-types',
    type: 'mcq',
    difficulty: 4,
    content: 'What is a limitation of Flash memory compared to DRAM?',
    options: [
      'Flash is volatile',
      'Flash has limited write cycles',
      'Flash is slower for reads',
      'Flash uses more power'
    ],
    correctAnswer: 1,
    explanation: 'Flash memory cells wear out after a limited number of write cycles (typically 10,000-100,000). Wear leveling helps extend lifespan.'
  },

  // SC1006 - Number Systems Questions
  {
    id: 'ns-001',
    topicId: 'number-systems',
    type: 'mcq',
    difficulty: 1,
    content: 'In two\'s complement, what does the MSB (most significant bit) represent?',
    options: ['The value 2^(n-1)', 'The sign (0=positive, 1=negative)', 'Overflow flag', 'Parity'],
    correctAnswer: 1,
    explanation: 'In two\'s complement representation, the MSB is the sign bit: 0 for positive numbers, 1 for negative.'
  },
  {
    id: 'ns-002',
    topicId: 'number-systems',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the range of values for an 8-bit signed integer (two\'s complement)?',
    options: ['0 to 255', '-128 to 127', '-127 to 128', '0 to 127'],
    correctAnswer: 1,
    explanation: 'For n bits: range is -2^(n-1) to 2^(n-1)-1. For 8 bits: -128 to 127.'
  },
  {
    id: 'ns-003',
    topicId: 'number-systems',
    type: 'code_trace',
    difficulty: 2,
    content: 'How do you find the two\'s complement of a number?',
    options: [
      'Add 1 to the number',
      'Subtract from maximum value',
      'Invert all bits and add 1',
      'Shift right by 1'
    ],
    correctAnswer: 2,
    explanation: 'To negate in two\'s complement: invert all bits (one\'s complement) then add 1.'
  },
  {
    id: 'ns-004',
    topicId: 'number-systems',
    type: 'mcq',
    difficulty: 3,
    content: 'In IEEE 754 single precision, how many bits are used for the exponent?',
    options: ['1 bit', '8 bits', '23 bits', '32 bits'],
    correctAnswer: 1,
    explanation: 'IEEE 754 single precision (32-bit): 1 sign bit + 8 exponent bits + 23 mantissa bits.'
  },
  {
    id: 'ns-005',
    topicId: 'number-systems',
    type: 'mcq',
    difficulty: 3,
    content: 'Why is the exponent in IEEE 754 biased?',
    options: [
      'To make it larger',
      'To allow negative exponents without a separate sign bit',
      'To improve precision',
      'To simplify addition'
    ],
    correctAnswer: 1,
    explanation: 'The bias (127 for single precision) allows representing negative exponents using only unsigned values: stored = actual + bias.'
  },
  {
    id: 'ns-006',
    topicId: 'number-systems',
    type: 'mcq',
    difficulty: 4,
    content: 'When does signed overflow occur?',
    options: [
      'When result is too large for unsigned',
      'When two positive numbers give negative result (or vice versa)',
      'When carry flag is set',
      'When result is zero'
    ],
    correctAnswer: 1,
    explanation: 'Signed overflow occurs when the sign of the result is wrong: adding two positives gives negative, or adding two negatives gives positive.'
  },
  {
    id: 'ns-007',
    topicId: 'number-systems',
    type: 'mcq',
    difficulty: 4,
    content: 'What does NaN represent in IEEE 754?',
    options: [
      'Negative and Negative',
      'Not a Number (undefined result)',
      'New Array Number',
      'Null and Null'
    ],
    correctAnswer: 1,
    explanation: 'NaN (Not a Number) represents undefined results like 0/0 or sqrt(-1). It\'s encoded with all 1s in exponent and non-zero mantissa.'
  },

  // SC1006 - Pipelining Questions
  {
    id: 'pipe-001',
    topicId: 'pipelining',
    type: 'mcq',
    difficulty: 1,
    content: 'What is the main benefit of pipelining?',
    options: [
      'Reduces instruction execution time',
      'Increases instruction throughput',
      'Uses less power',
      'Requires less memory'
    ],
    correctAnswer: 1,
    explanation: 'Pipelining increases throughput (instructions completed per unit time) by overlapping execution of multiple instructions.'
  },
  {
    id: 'pipe-002',
    topicId: 'pipelining',
    type: 'mcq',
    difficulty: 2,
    content: 'What are the five classic pipeline stages?',
    options: [
      'Read, Write, Execute, Store, Return',
      'Fetch, Decode, Execute, Memory, Writeback',
      'Load, Store, Add, Multiply, Branch',
      'Input, Process, Output, Store, Exit'
    ],
    correctAnswer: 1,
    explanation: 'The classic RISC pipeline: Fetch (IF), Decode (ID), Execute (EX), Memory (MEM), Writeback (WB).'
  },
  {
    id: 'pipe-003',
    topicId: 'pipelining',
    type: 'mcq',
    difficulty: 2,
    content: 'What is a pipeline hazard?',
    options: [
      'A dangerous instruction',
      'A situation that prevents the next instruction from executing',
      'A type of cache miss',
      'An illegal memory access'
    ],
    correctAnswer: 1,
    explanation: 'Pipeline hazards are situations that prevent the next instruction from executing in its designated clock cycle, causing stalls.'
  },
  {
    id: 'pipe-004',
    topicId: 'pipelining',
    type: 'mcq',
    difficulty: 3,
    content: 'What type of hazard occurs when an instruction needs data from a previous instruction that hasn\'t finished?',
    options: ['Structural hazard', 'Data hazard', 'Control hazard', 'Memory hazard'],
    correctAnswer: 1,
    explanation: 'Data hazards occur when an instruction depends on the result of a previous instruction still in the pipeline.'
  },
  {
    id: 'pipe-005',
    topicId: 'pipelining',
    type: 'mcq',
    difficulty: 3,
    content: 'What technique passes data directly from one pipeline stage to another to avoid stalls?',
    options: ['Speculation', 'Forwarding/Bypassing', 'Branch prediction', 'Stalling'],
    correctAnswer: 1,
    explanation: 'Forwarding (bypassing) sends computed results directly to where they\'re needed, avoiding the wait for writeback.'
  },
  {
    id: 'pipe-006',
    topicId: 'pipelining',
    type: 'mcq',
    difficulty: 4,
    content: 'What causes control hazards?',
    options: [
      'Division by zero',
      'Branch instructions changing program flow',
      'Memory access conflicts',
      'Integer overflow'
    ],
    correctAnswer: 1,
    explanation: 'Control hazards occur with branches because the target address isn\'t known until the branch is executed, but we\'ve already fetched subsequent instructions.'
  },
  {
    id: 'pipe-007',
    topicId: 'pipelining',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the ideal CPI (Cycles Per Instruction) for a fully utilized pipeline?',
    options: ['0', '1', '5 (number of stages)', 'Depends on instruction'],
    correctAnswer: 1,
    explanation: 'Ideally, a pipeline completes one instruction per cycle (CPI = 1) after the initial fill delay, achieving maximum throughput.'
  },

  // SC2002 - OOP Introduction Questions
  {
    id: 'oop-001',
    topicId: 'oop-introduction',
    type: 'mcq',
    difficulty: 1,
    content: 'What does OOP stand for?',
    options: [
      'Object-Oriented Processing',
      'Object-Oriented Programming',
      'Original Object Protocol',
      'Optimal Operation Procedure'
    ],
    correctAnswer: 1,
    explanation: 'OOP stands for Object-Oriented Programming, a paradigm based on objects that contain data and behavior.'
  },
  {
    id: 'oop-002',
    topicId: 'oop-introduction',
    type: 'mcq',
    difficulty: 1,
    content: 'Which of the following is NOT one of the four pillars of OOP?',
    options: ['Encapsulation', 'Compilation', 'Inheritance', 'Polymorphism'],
    correctAnswer: 1,
    explanation: 'The four pillars are Encapsulation, Abstraction, Inheritance, and Polymorphism. Compilation is not an OOP concept.'
  },
  {
    id: 'oop-003',
    topicId: 'oop-introduction',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the main difference between procedural and object-oriented programming?',
    options: [
      'OOP is faster',
      'OOP organizes code around objects that combine data and behavior',
      'Procedural programming is newer',
      'OOP doesn\'t use functions'
    ],
    correctAnswer: 1,
    explanation: 'In procedural programming, data and functions are separate. In OOP, they are combined into objects.'
  },
  {
    id: 'oop-004',
    topicId: 'oop-introduction',
    type: 'mcq',
    difficulty: 2,
    content: 'What does "encapsulation" mean in OOP?',
    options: [
      'Making code run faster',
      'Bundling data and methods together and hiding internal details',
      'Using loops efficiently',
      'Creating multiple objects'
    ],
    correctAnswer: 1,
    explanation: 'Encapsulation bundles data (attributes) with methods that operate on it, and hides internal implementation from the outside.'
  },
  {
    id: 'oop-005',
    topicId: 'oop-introduction',
    type: 'mcq',
    difficulty: 3,
    content: 'Which OOP concept allows the same interface to be used for different underlying forms?',
    options: ['Encapsulation', 'Abstraction', 'Inheritance', 'Polymorphism'],
    correctAnswer: 3,
    explanation: 'Polymorphism means "many forms" - the same method or interface can have different implementations.'
  },
  {
    id: 'oop-006',
    topicId: 'oop-introduction',
    type: 'mcq',
    difficulty: 3,
    content: 'What is abstraction in OOP?',
    options: [
      'Making all variables public',
      'Showing only essential features and hiding complexity',
      'Creating abstract art',
      'Removing all methods'
    ],
    correctAnswer: 1,
    explanation: 'Abstraction shows only essential features to the user while hiding implementation details, reducing complexity.'
  },
  {
    id: 'oop-007',
    topicId: 'oop-introduction',
    type: 'mcq',
    difficulty: 2,
    content: 'What type of relationship does inheritance represent?',
    options: ['"has-a" relationship', '"is-a" relationship', '"uses-a" relationship', '"creates-a" relationship'],
    correctAnswer: 1,
    explanation: 'Inheritance represents "is-a" relationships: a Dog is-a Animal, a Circle is-a Shape.'
  },

  // SC2002 - Classes and Objects Questions
  {
    id: 'co-001',
    topicId: 'classes-objects',
    type: 'mcq',
    difficulty: 1,
    content: 'What is the relationship between a class and an object?',
    options: [
      'They are the same thing',
      'A class is a blueprint, an object is an instance of a class',
      'An object is a blueprint, a class is an instance',
      'Classes contain objects'
    ],
    correctAnswer: 1,
    explanation: 'A class is a template/blueprint that defines attributes and methods. An object is a concrete instance created from that class.'
  },
  {
    id: 'co-002',
    topicId: 'classes-objects',
    type: 'mcq',
    difficulty: 2,
    content: 'What keyword is used to create a new object in Java?',
    options: ['create', 'make', 'new', 'object'],
    correctAnswer: 2,
    explanation: 'The "new" keyword allocates memory for a new object and calls its constructor.'
  },
  {
    id: 'co-003',
    topicId: 'classes-objects',
    type: 'mcq',
    difficulty: 2,
    content: 'What is a constructor?',
    options: [
      'A method that destroys objects',
      'A special method that initializes new objects',
      'A variable that stores the class name',
      'A loop structure'
    ],
    correctAnswer: 1,
    explanation: 'A constructor is a special method with the same name as the class, called when an object is created to initialize it.'
  },
  {
    id: 'co-004',
    topicId: 'classes-objects',
    type: 'mcq',
    difficulty: 2,
    content: 'What does the "this" keyword refer to in Java?',
    options: [
      'The parent class',
      'The current object instance',
      'The main method',
      'A static variable'
    ],
    correctAnswer: 1,
    explanation: '"this" refers to the current object instance. It\'s used to distinguish instance variables from parameters with the same name.'
  },
  {
    id: 'co-005',
    topicId: 'classes-objects',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is the output of this code?',
    codeSnippet: `class Counter {
    int count = 0;
    void increment() { count++; }
}
Counter c1 = new Counter();
Counter c2 = new Counter();
c1.increment();
c1.increment();
c2.increment();
System.out.println(c1.count + " " + c2.count);`,
    options: ['0 0', '2 1', '3 3', '2 2'],
    correctAnswer: 1,
    explanation: 'Each object has its own copy of instance variables. c1.count is incremented twice (2), c2.count once (1).'
  },
  {
    id: 'co-006',
    topicId: 'classes-objects',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the purpose of getter and setter methods?',
    options: [
      'To make code faster',
      'To provide controlled access to private attributes',
      'To delete objects',
      'To create new classes'
    ],
    correctAnswer: 1,
    explanation: 'Getters and setters provide controlled access to private fields, allowing validation and maintaining encapsulation.'
  },
  {
    id: 'co-007',
    topicId: 'classes-objects',
    type: 'mcq',
    difficulty: 3,
    content: 'If a constructor has no parameters, what is it called?',
    options: [
      'Parameterized constructor',
      'Default constructor',
      'Copy constructor',
      'Static constructor'
    ],
    correctAnswer: 1,
    explanation: 'A constructor with no parameters is called a default constructor. Java provides one automatically if you don\'t define any constructor.'
  },

  // SC2002 - Encapsulation Questions
  {
    id: 'enc-001',
    topicId: 'encapsulation',
    type: 'mcq',
    difficulty: 1,
    content: 'Which access modifier makes a member accessible only within the same class?',
    options: ['public', 'protected', 'private', 'default'],
    correctAnswer: 2,
    explanation: 'Private members are only accessible within the class they are declared in.'
  },
  {
    id: 'enc-002',
    topicId: 'encapsulation',
    type: 'mcq',
    difficulty: 2,
    content: 'Which access modifier allows access from any class anywhere?',
    options: ['private', 'protected', 'public', 'default'],
    correctAnswer: 2,
    explanation: 'Public members are accessible from any class in any package.'
  },
  {
    id: 'enc-003',
    topicId: 'encapsulation',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the best practice for class attributes in encapsulation?',
    options: [
      'Make all attributes public',
      'Make attributes private, provide public getters/setters',
      'Make attributes protected',
      'Don\'t use any attributes'
    ],
    correctAnswer: 1,
    explanation: 'Best practice: make attributes private to protect them, provide public methods (getters/setters) for controlled access.'
  },
  {
    id: 'enc-004',
    topicId: 'encapsulation',
    type: 'mcq',
    difficulty: 3,
    content: 'What can "protected" members be accessed by?',
    options: [
      'Only the same class',
      'Same class, same package, and subclasses',
      'Any class anywhere',
      'Only subclasses'
    ],
    correctAnswer: 1,
    explanation: 'Protected members are accessible within the same class, same package, and by subclasses in other packages.'
  },
  {
    id: 'enc-005',
    topicId: 'encapsulation',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is the advantage of using a setter with validation?',
    codeSnippet: `public void setAge(int age) {
    if (age >= 0 && age <= 150) {
        this.age = age;
    }
}`,
    options: [
      'Makes code run faster',
      'Prevents invalid data from being set',
      'Reduces memory usage',
      'Makes age public'
    ],
    correctAnswer: 1,
    explanation: 'The setter validates input before modifying the attribute, ensuring only valid ages (0-150) are accepted.'
  },
  {
    id: 'enc-006',
    topicId: 'encapsulation',
    type: 'mcq',
    difficulty: 3,
    content: 'What is an immutable object?',
    options: [
      'An object that can be changed',
      'An object that cannot be modified after creation',
      'An object without methods',
      'An abstract object'
    ],
    correctAnswer: 1,
    explanation: 'An immutable object cannot be modified after creation. All fields are final and there are no setters. String is an example.'
  },
  {
    id: 'enc-007',
    topicId: 'encapsulation',
    type: 'mcq',
    difficulty: 4,
    content: 'What is "default" (package-private) access in Java?',
    options: [
      'Same as public',
      'Same as private',
      'Accessible within the same package only',
      'Accessible to subclasses only'
    ],
    correctAnswer: 2,
    explanation: 'When no access modifier is specified (default), the member is accessible only within the same package.'
  },

  // SC2002 - Inheritance Questions
  {
    id: 'inh-001',
    topicId: 'inheritance',
    type: 'mcq',
    difficulty: 1,
    content: 'Which keyword is used to inherit from a class in Java?',
    options: ['inherits', 'extends', 'implements', 'super'],
    correctAnswer: 1,
    explanation: 'The "extends" keyword is used to inherit from a class: class Child extends Parent.'
  },
  {
    id: 'inh-002',
    topicId: 'inheritance',
    type: 'mcq',
    difficulty: 2,
    content: 'What does the "super" keyword do?',
    options: [
      'Creates a new class',
      'References the parent class',
      'Makes a method faster',
      'Declares a superclass'
    ],
    correctAnswer: 1,
    explanation: 'The "super" keyword references the parent class. It can call the parent constructor (super()) or parent methods (super.method()).'
  },
  {
    id: 'inh-003',
    topicId: 'inheritance',
    type: 'mcq',
    difficulty: 2,
    content: 'When must super() be called in a child constructor?',
    options: [
      'At the end',
      'At the first line',
      'Anywhere in the constructor',
      'It\'s never required'
    ],
    correctAnswer: 1,
    explanation: 'If super() is called explicitly, it must be the first statement in the child constructor.'
  },
  {
    id: 'inh-004',
    topicId: 'inheritance',
    type: 'mcq',
    difficulty: 3,
    content: 'Can a Java class extend multiple classes?',
    options: [
      'Yes, unlimited',
      'Yes, up to 2',
      'No, only one class',
      'Only if they are interfaces'
    ],
    correctAnswer: 2,
    explanation: 'Java does not support multiple inheritance with classes. A class can extend only one class, but can implement multiple interfaces.'
  },
  {
    id: 'inh-005',
    topicId: 'inheritance',
    type: 'mcq',
    difficulty: 3,
    content: 'What is method overriding?',
    options: [
      'Creating a method with the same name but different parameters',
      'Providing a new implementation of an inherited method',
      'Calling a parent method',
      'Deleting a method'
    ],
    correctAnswer: 1,
    explanation: 'Method overriding is when a child class provides its own implementation of a method inherited from the parent class.'
  },
  {
    id: 'inh-006',
    topicId: 'inheritance',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is the output?',
    codeSnippet: `class Animal {
    void sound() { System.out.println("Some sound"); }
}
class Dog extends Animal {
    void sound() { System.out.println("Bark"); }
}
Animal a = new Dog();
a.sound();`,
    options: ['Some sound', 'Bark', 'Compilation error', 'Runtime error'],
    correctAnswer: 1,
    explanation: 'This is polymorphism. Although the reference type is Animal, the actual object is Dog, so Dog\'s sound() method is called.'
  },
  {
    id: 'inh-007',
    topicId: 'inheritance',
    type: 'mcq',
    difficulty: 4,
    content: 'What does the @Override annotation do?',
    options: [
      'Makes the method faster',
      'Ensures the method actually overrides a parent method',
      'Prevents the method from being overridden',
      'Creates a new method'
    ],
    correctAnswer: 1,
    explanation: '@Override is a compile-time check. If the method doesn\'t actually override a parent method (e.g., typo in name), the compiler gives an error.'
  },

  // SC2002 - Polymorphism Questions
  {
    id: 'poly-001',
    topicId: 'polymorphism',
    type: 'mcq',
    difficulty: 1,
    content: 'What does "polymorphism" mean?',
    options: ['One form', 'Many forms', 'No form', 'Two forms'],
    correctAnswer: 1,
    explanation: 'Polymorphism comes from Greek meaning "many forms" - one interface can have multiple implementations.'
  },
  {
    id: 'poly-002',
    topicId: 'polymorphism',
    type: 'mcq',
    difficulty: 2,
    content: 'What is method overloading?',
    options: [
      'Having methods with same name but different parameters',
      'Having methods with different names',
      'Replacing parent method implementation',
      'Having too many methods'
    ],
    correctAnswer: 0,
    explanation: 'Method overloading is having multiple methods with the same name but different parameter lists (compile-time polymorphism).'
  },
  {
    id: 'poly-003',
    topicId: 'polymorphism',
    type: 'mcq',
    difficulty: 2,
    content: 'Which type of polymorphism is method overriding?',
    options: ['Compile-time', 'Runtime', 'Static', 'None'],
    correctAnswer: 1,
    explanation: 'Method overriding is runtime (dynamic) polymorphism because the actual method called is determined at runtime based on the object type.'
  },
  {
    id: 'poly-004',
    topicId: 'polymorphism',
    type: 'mcq',
    difficulty: 3,
    content: 'What is upcasting?',
    options: [
      'Converting int to double',
      'Treating a child object as a parent type',
      'Treating a parent object as a child type',
      'Casting to uppercase'
    ],
    correctAnswer: 1,
    explanation: 'Upcasting is treating a child object as a parent type: Animal a = new Dog(); This is automatic and safe.'
  },
  {
    id: 'poly-005',
    topicId: 'polymorphism',
    type: 'mcq',
    difficulty: 3,
    content: 'What operator should you use before downcasting to check object type?',
    options: ['typeof', 'instanceof', 'getType', 'cast'],
    correctAnswer: 1,
    explanation: 'Use instanceof to check if an object is an instance of a class before downcasting to avoid ClassCastException.'
  },
  {
    id: 'poly-006',
    topicId: 'polymorphism',
    type: 'code_trace',
    difficulty: 4,
    content: 'What is the output?',
    codeSnippet: `class A { void m() { System.out.print("A"); } }
class B extends A { void m() { System.out.print("B"); } }
class C extends B { void m() { System.out.print("C"); } }
A obj = new C();
obj.m();`,
    options: ['A', 'B', 'C', 'ABC'],
    correctAnswer: 2,
    explanation: 'Runtime polymorphism calls the most specific method implementation. obj is actually a C object, so C\'s m() is called.'
  },
  {
    id: 'poly-007',
    topicId: 'polymorphism',
    type: 'mcq',
    difficulty: 4,
    content: 'Why is polymorphism useful?',
    options: [
      'It makes code run faster',
      'It allows writing flexible code that works with different types',
      'It uses less memory',
      'It prevents bugs automatically'
    ],
    correctAnswer: 1,
    explanation: 'Polymorphism allows writing code that can work with objects of different types through a common interface, making code more flexible and extensible.'
  },

  // SC2002 - Abstract Classes & Interfaces Questions
  {
    id: 'abs-001',
    topicId: 'abstract-classes',
    type: 'mcq',
    difficulty: 1,
    content: 'Can you create an instance of an abstract class directly?',
    options: ['Yes', 'No', 'Only if it has a constructor', 'Only in subclasses'],
    correctAnswer: 1,
    explanation: 'Abstract classes cannot be instantiated directly. You must create a concrete subclass that implements all abstract methods.'
  },
  {
    id: 'abs-002',
    topicId: 'abstract-classes',
    type: 'mcq',
    difficulty: 2,
    content: 'Can an abstract class have concrete (non-abstract) methods?',
    options: ['No, all methods must be abstract', 'Yes', 'Only static methods', 'Only private methods'],
    correctAnswer: 1,
    explanation: 'Abstract classes can have both abstract methods (no body) and concrete methods (with implementation).'
  },
  {
    id: 'abs-003',
    topicId: 'abstract-classes',
    type: 'mcq',
    difficulty: 2,
    content: 'What keyword is used to define an interface in Java?',
    options: ['class', 'abstract', 'interface', 'implements'],
    correctAnswer: 2,
    explanation: 'The "interface" keyword defines an interface. Classes use "implements" to implement an interface.'
  },
  {
    id: 'abs-004',
    topicId: 'abstract-classes',
    type: 'mcq',
    difficulty: 3,
    content: 'Can a class implement multiple interfaces?',
    options: ['No', 'Yes', 'Only two', 'Only if they have no methods'],
    correctAnswer: 1,
    explanation: 'A class can implement multiple interfaces, which is how Java achieves a form of multiple inheritance.'
  },
  {
    id: 'abs-005',
    topicId: 'abstract-classes',
    type: 'mcq',
    difficulty: 3,
    content: 'In Java 7 and earlier, what are interface methods by default?',
    options: ['Private', 'Protected', 'Public and abstract', 'Static'],
    correctAnswer: 2,
    explanation: 'In traditional Java interfaces, all methods are implicitly public and abstract (no implementation).'
  },
  {
    id: 'abs-006',
    topicId: 'abstract-classes',
    type: 'mcq',
    difficulty: 4,
    content: 'When should you use an abstract class over an interface?',
    options: [
      'When you want multiple inheritance',
      'When you want to share code among related classes',
      'When you want only method signatures',
      'When you want all methods to be static'
    ],
    correctAnswer: 1,
    explanation: 'Use abstract class when you want to share code (concrete methods) among related classes. Use interface for defining a contract without implementation.'
  },
  {
    id: 'abs-007',
    topicId: 'abstract-classes',
    type: 'mcq',
    difficulty: 4,
    content: 'What can interface fields be?',
    options: [
      'Any type',
      'Only public static final (constants)',
      'Only private',
      'Interfaces cannot have fields'
    ],
    correctAnswer: 1,
    explanation: 'Interface fields are implicitly public, static, and final (constants). You cannot have instance variables in interfaces.'
  },

  // SC2002 - Exception Handling Questions
  {
    id: 'exc-001',
    topicId: 'exception-handling',
    type: 'mcq',
    difficulty: 1,
    content: 'What keyword is used to handle exceptions in Java?',
    options: ['handle', 'catch', 'error', 'except'],
    correctAnswer: 1,
    explanation: 'The "catch" block handles exceptions that are thrown in the try block.'
  },
  {
    id: 'exc-002',
    topicId: 'exception-handling',
    type: 'mcq',
    difficulty: 2,
    content: 'What does the "finally" block do?',
    options: [
      'Runs only if exception occurs',
      'Runs only if no exception occurs',
      'Always runs regardless of exception',
      'Stops the exception'
    ],
    correctAnswer: 2,
    explanation: 'The finally block always executes, whether an exception occurred or not. It\'s used for cleanup code.'
  },
  {
    id: 'exc-003',
    topicId: 'exception-handling',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the difference between "throw" and "throws"?',
    options: [
      'They are the same',
      '"throw" creates an exception, "throws" declares exceptions a method might throw',
      '"throws" creates an exception, "throw" declares it',
      'One is for checked, one for unchecked'
    ],
    correctAnswer: 1,
    explanation: '"throw" actually throws an exception. "throws" in the method signature declares what exceptions the method might throw.'
  },
  {
    id: 'exc-004',
    topicId: 'exception-handling',
    type: 'mcq',
    difficulty: 3,
    content: 'What is a checked exception?',
    options: [
      'An exception that doesn\'t need to be handled',
      'An exception that must be caught or declared',
      'An exception that is checked at runtime',
      'A spelling mistake in code'
    ],
    correctAnswer: 1,
    explanation: 'Checked exceptions must be either caught (try-catch) or declared (throws) - the compiler checks for this.'
  },
  {
    id: 'exc-005',
    topicId: 'exception-handling',
    type: 'mcq',
    difficulty: 3,
    content: 'Which of these is an unchecked exception?',
    options: ['IOException', 'SQLException', 'NullPointerException', 'FileNotFoundException'],
    correctAnswer: 2,
    explanation: 'NullPointerException is a RuntimeException (unchecked). It doesn\'t require mandatory handling.'
  },
  {
    id: 'exc-006',
    topicId: 'exception-handling',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is printed?',
    codeSnippet: `try {
    System.out.print("A");
    int x = 1/0;
    System.out.print("B");
} catch (Exception e) {
    System.out.print("C");
} finally {
    System.out.print("D");
}`,
    options: ['AB', 'ACD', 'ABCD', 'AD'],
    correctAnswer: 1,
    explanation: 'A prints, then 1/0 throws ArithmeticException (B skipped), C prints in catch, D prints in finally. Output: ACD'
  },
  {
    id: 'exc-007',
    topicId: 'exception-handling',
    type: 'mcq',
    difficulty: 4,
    content: 'How do you create a custom exception?',
    options: [
      'Use the "exception" keyword',
      'Extend the Exception or RuntimeException class',
      'Implement the Throwable interface',
      'Use a try block with a new name'
    ],
    correctAnswer: 1,
    explanation: 'Create a custom exception by extending Exception (checked) or RuntimeException (unchecked) and providing constructors.'
  },

  // ===== ADDITIONAL QUESTIONS TO REACH 15+ PER TOPIC =====

  // Additional Memory Management Questions (need 10 more to reach 15)
  {
    id: 'mm-006',
    topicId: 'memory-management',
    type: 'mcq',
    difficulty: 2,
    content: 'In Python, which generation in garbage collection contains the oldest objects?',
    options: ['Generation 0', 'Generation 1', 'Generation 2', 'Generation 3'],
    correctAnswer: 2,
    explanation: 'Generation 2 contains the oldest, long-lived objects. Objects that survive garbage collection are promoted to older generations.'
  },
  {
    id: 'mm-007',
    topicId: 'memory-management',
    type: 'code_trace',
    difficulty: 3,
    content: 'What will this code print?',
    codeSnippet: `import sys
x = 256
y = 256
print(x is y)`,
    options: ['True', 'False', 'Error', '256'],
    correctAnswer: 0,
    explanation: 'Python interns small integers (-5 to 256). Both x and y point to the same object in memory, so "is" returns True.'
  },
  {
    id: 'mm-008',
    topicId: 'memory-management',
    type: 'code_trace',
    difficulty: 3,
    content: 'What will this code print?',
    codeSnippet: `x = 257
y = 257
print(x is y)`,
    options: ['True', 'False', 'Error', '257'],
    correctAnswer: 1,
    explanation: 'Numbers outside the interned range (-5 to 256) create separate objects. x and y are different objects, so "is" returns False.'
  },
  {
    id: 'mm-009',
    topicId: 'memory-management',
    type: 'mcq',
    difficulty: 4,
    content: 'What is a weak reference in Python?',
    options: [
      'A reference that uses less memory',
      'A reference that doesn\'t prevent garbage collection',
      'A reference to a small object',
      'A broken reference'
    ],
    correctAnswer: 1,
    explanation: 'Weak references (weakref module) allow referencing an object without increasing its reference count, so it can be garbage collected.'
  },
  {
    id: 'mm-010',
    topicId: 'memory-management',
    type: 'mcq',
    difficulty: 2,
    content: 'What happens when an object\'s reference count reaches zero?',
    options: [
      'Nothing happens',
      'The memory is immediately deallocated',
      'The object is moved to Generation 2',
      'An error is raised'
    ],
    correctAnswer: 1,
    explanation: 'When the reference count hits zero, Python immediately deallocates the memory (for non-circular references).'
  },
  {
    id: 'mm-011',
    topicId: 'memory-management',
    type: 'true_false',
    difficulty: 2,
    content: 'In Python, strings are mutable objects.',
    correctAnswer: 'false',
    explanation: 'Strings in Python are immutable. Any operation that seems to modify a string actually creates a new string object.'
  },
  {
    id: 'mm-012',
    topicId: 'memory-management',
    type: 'mcq',
    difficulty: 3,
    content: 'Which function can be used to manually trigger garbage collection in Python?',
    options: ['gc.run()', 'gc.collect()', 'gc.clean()', 'gc.free()'],
    correctAnswer: 1,
    explanation: 'gc.collect() forces an immediate garbage collection cycle across all generations.'
  },
  {
    id: 'mm-013',
    topicId: 'memory-management',
    type: 'code_trace',
    difficulty: 4,
    content: 'What is the issue with this code?',
    codeSnippet: `class Node:
    def __init__(self):
        self.next = None

a = Node()
b = Node()
a.next = b
b.next = a
del a, b`,
    options: [
      'Syntax error',
      'Memory leak due to circular reference',
      'No issue',
      'Type error'
    ],
    correctAnswer: 1,
    explanation: 'This creates a circular reference. While del removes the variable names, the objects still reference each other. The garbage collector will eventually clean this up.'
  },
  {
    id: 'mm-014',
    topicId: 'memory-management',
    type: 'mcq',
    difficulty: 3,
    content: 'What does id() return in Python?',
    options: [
      'The type of an object',
      'The memory address (identity) of an object',
      'The size of an object',
      'The reference count of an object'
    ],
    correctAnswer: 1,
    explanation: 'id() returns the memory address (unique identifier) of an object, which is constant for the object\'s lifetime.'
  },
  {
    id: 'mm-015',
    topicId: 'memory-management',
    type: 'mcq',
    difficulty: 4,
    content: 'Why might you use __slots__ in a Python class?',
    options: [
      'To make methods faster',
      'To reduce memory usage per instance',
      'To enable garbage collection',
      'To allow more attributes'
    ],
    correctAnswer: 1,
    explanation: '__slots__ prevents the creation of __dict__ for each instance, significantly reducing memory usage when creating many objects.'
  },

  // Additional Linked Lists Questions
  {
    id: 'll-008',
    topicId: 'linked-lists',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the space complexity of storing n elements in a singly linked list?',
    options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
    correctAnswer: 1,
    explanation: 'Each node stores data and a pointer, so n nodes require O(n) space.'
  },
  {
    id: 'll-009',
    topicId: 'linked-lists',
    type: 'code_trace',
    difficulty: 3,
    content: 'What does this function do?',
    codeSnippet: `def mystery(head):
    prev = None
    curr = head
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    return prev`,
    options: ['Deletes all nodes', 'Reverses the linked list', 'Finds the middle', 'Sorts the list'],
    correctAnswer: 1,
    explanation: 'This is the iterative algorithm to reverse a singly linked list by changing each node\'s next pointer.'
  },
  {
    id: 'll-010',
    topicId: 'linked-lists',
    type: 'mcq',
    difficulty: 3,
    content: 'How can you detect a cycle in a linked list efficiently?',
    options: [
      'Use a hash set to store visited nodes',
      'Use Floyd\'s cycle detection (two pointers)',
      'Both A and B work',
      'It\'s impossible to detect'
    ],
    correctAnswer: 2,
    explanation: 'Both methods work. Hash set uses O(n) space. Floyd\'s algorithm uses two pointers (fast and slow) with O(1) space.'
  },
  {
    id: 'll-011',
    topicId: 'linked-lists',
    type: 'mcq',
    difficulty: 4,
    content: 'In Floyd\'s cycle detection, if slow and fast pointers meet, what does this indicate?',
    options: ['The list is empty', 'The list is sorted', 'There is a cycle', 'The list has no cycle'],
    correctAnswer: 2,
    explanation: 'If the slow pointer (moving 1 step) meets the fast pointer (moving 2 steps), a cycle exists in the list.'
  },
  {
    id: 'll-012',
    topicId: 'linked-lists',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the time complexity of accessing the nth element in a singly linked list?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 2,
    explanation: 'Unlike arrays, linked lists require traversing from head to reach the nth element, taking O(n) time.'
  },
  {
    id: 'll-013',
    topicId: 'linked-lists',
    type: 'true_false',
    difficulty: 2,
    content: 'A doubly linked list uses more memory than a singly linked list for the same data.',
    correctAnswer: 'true',
    explanation: 'Doubly linked lists store an extra pointer (prev) in each node, requiring more memory than singly linked lists.'
  },
  {
    id: 'll-014',
    topicId: 'linked-lists',
    type: 'mcq',
    difficulty: 3,
    content: 'How do you find the middle element of a linked list in one pass?',
    options: [
      'Count all nodes first, then traverse to middle',
      'Use slow and fast pointers (fast moves 2x speed)',
      'Store all elements in an array',
      'It\'s impossible in one pass'
    ],
    correctAnswer: 1,
    explanation: 'Use two pointers: slow moves one step, fast moves two steps. When fast reaches the end, slow is at the middle.'
  },
  {
    id: 'll-015',
    topicId: 'linked-lists',
    type: 'code_trace',
    difficulty: 4,
    content: 'After merging two sorted lists (1->3->5 and 2->4->6), what is the result?',
    options: [
      '1->2->3->4->5->6',
      '2->4->6->1->3->5',
      '1->3->5->2->4->6',
      '6->5->4->3->2->1'
    ],
    correctAnswer: 0,
    explanation: 'Merging two sorted lists produces a single sorted list by comparing elements: 1->2->3->4->5->6.'
  },

  // Additional Stacks Questions
  {
    id: 'st-008',
    topicId: 'stacks',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is the output when evaluating postfix: "5 3 + 2 *"?',
    options: ['11', '16', '25', '13'],
    correctAnswer: 1,
    explanation: '5 3 + gives 8. Then 8 2 * gives 16. Stack operations: push 5, push 3, pop both and push 8, push 2, pop both and push 16.'
  },
  {
    id: 'st-009',
    topicId: 'stacks',
    type: 'mcq',
    difficulty: 2,
    content: 'What happens when you try to pop from an empty stack?',
    options: ['Returns null', 'Returns 0', 'Stack underflow error', 'Nothing happens'],
    correctAnswer: 2,
    explanation: 'Attempting to pop from an empty stack causes a stack underflow error (or exception in most implementations).'
  },
  {
    id: 'st-010',
    topicId: 'stacks',
    type: 'mcq',
    difficulty: 3,
    content: 'Which data structure does the operating system use for function calls?',
    options: ['Queue', 'Call stack', 'Heap', 'Hash table'],
    correctAnswer: 1,
    explanation: 'The call stack stores return addresses, local variables, and function parameters for each function call.'
  },
  {
    id: 'st-011',
    topicId: 'stacks',
    type: 'true_false',
    difficulty: 2,
    content: 'A stack can be efficiently implemented using both arrays and linked lists.',
    correctAnswer: 'true',
    explanation: 'Both implementations provide O(1) push and pop. Arrays have better cache locality; linked lists have dynamic sizing.'
  },
  {
    id: 'st-012',
    topicId: 'stacks',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is the prefix (Polish notation) of "3 + 4 * 5"?',
    options: ['+ 3 * 4 5', '* + 3 4 5', '+ * 3 4 5', '3 4 5 * +'],
    correctAnswer: 0,
    explanation: 'Respecting precedence: (3 + (4 * 5)) becomes + 3 * 4 5 in prefix notation.'
  },
  {
    id: 'st-013',
    topicId: 'stacks',
    type: 'mcq',
    difficulty: 4,
    content: 'How many stacks are needed to implement a queue?',
    options: ['0', '1', '2', '3'],
    correctAnswer: 2,
    explanation: 'Two stacks can implement a queue: one for enqueue operations, one for dequeue operations.'
  },
  {
    id: 'st-014',
    topicId: 'stacks',
    type: 'mcq',
    difficulty: 3,
    content: 'Which problem is NOT typically solved using a stack?',
    options: ['Undo/Redo operations', 'Finding shortest path', 'Expression evaluation', 'Backtracking algorithms'],
    correctAnswer: 1,
    explanation: 'Shortest path problems typically use queues (BFS) or priority queues (Dijkstra). Stacks are used for DFS, not BFS.'
  },
  {
    id: 'st-015',
    topicId: 'stacks',
    type: 'code_trace',
    difficulty: 4,
    content: 'What does this function return for input "()[]{}"?',
    codeSnippet: `def isValid(s):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    return len(stack) == 0`,
    options: ['True', 'False', 'Error', 'None'],
    correctAnswer: 0,
    explanation: 'Each opening bracket is pushed, each closing bracket pops and checks match. "()[]{}" is balanced, returns True.'
  },

  // Additional Queues Questions
  {
    id: 'qu-008',
    topicId: 'queues',
    type: 'mcq',
    difficulty: 2,
    content: 'What is a deque (double-ended queue)?',
    options: [
      'A queue with two fronts',
      'A queue that allows insertion and deletion at both ends',
      'Two separate queues',
      'A queue with double capacity'
    ],
    correctAnswer: 1,
    explanation: 'A deque (pronounced "deck") allows efficient insertion and deletion at both front and rear.'
  },
  {
    id: 'qu-009',
    topicId: 'queues',
    type: 'mcq',
    difficulty: 3,
    content: 'In a circular queue with array size n, how do you calculate the next position after index i?',
    options: ['i + 1', '(i + 1) % n', 'i % n', '(i - 1) % n'],
    correctAnswer: 1,
    explanation: 'Using modulo wraps around: if i is at the last position (n-1), (i+1) % n gives 0, wrapping to the start.'
  },
  {
    id: 'qu-010',
    topicId: 'queues',
    type: 'true_false',
    difficulty: 2,
    content: 'BFS (Breadth-First Search) uses a queue to track nodes to visit.',
    correctAnswer: 'true',
    explanation: 'BFS uses a queue to visit nodes level by level. Nodes are enqueued when discovered and dequeued when processed.'
  },
  {
    id: 'qu-011',
    topicId: 'queues',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the time complexity of enqueue in a properly implemented circular queue?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 0,
    explanation: 'Enqueue adds an element at the rear position and updates the index, both O(1) operations.'
  },
  {
    id: 'qu-012',
    topicId: 'queues',
    type: 'mcq',
    difficulty: 3,
    content: 'Which scheduling algorithm uses a queue data structure?',
    options: ['Stack-based scheduling', 'Round-robin scheduling', 'Priority scheduling only', 'Random scheduling'],
    correctAnswer: 1,
    explanation: 'Round-robin scheduling uses a queue where processes are served in order and return to the back after their time slice.'
  },
  {
    id: 'qu-013',
    topicId: 'queues',
    type: 'code_trace',
    difficulty: 3,
    content: 'Starting with empty queue, after: enqueue(1), enqueue(2), dequeue(), enqueue(3), what is at the front?',
    options: ['1', '2', '3', 'Empty'],
    correctAnswer: 1,
    explanation: 'enqueue(1), enqueue(2) gives [1,2]. dequeue() removes 1, leaving [2]. enqueue(3) gives [2,3]. Front is 2.'
  },
  {
    id: 'qu-014',
    topicId: 'queues',
    type: 'mcq',
    difficulty: 4,
    content: 'How can you implement a stack using two queues?',
    options: [
      'It\'s impossible',
      'Make push O(1) and pop O(n), or vice versa',
      'Both push and pop can be O(1)',
      'Only using three queues'
    ],
    correctAnswer: 1,
    explanation: 'Using two queues, either push or pop must be O(n). For O(1) push, pop moves all but last element to other queue.'
  },
  {
    id: 'qu-015',
    topicId: 'queues',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the time complexity of finding the minimum element in a regular queue?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 2,
    explanation: 'Regular queues don\'t track minimum. Finding it requires examining all n elements. A min-queue or monotonic deque can achieve O(1).'
  },

  // Additional Binary Trees Questions
  {
    id: 'bt-008',
    topicId: 'binary-trees',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the height of a tree with only a root node?',
    options: ['-1', '0', '1', '2'],
    correctAnswer: 1,
    explanation: 'Height is the number of edges from root to deepest leaf. A single node has height 0 (no edges).'
  },
  {
    id: 'bt-009',
    topicId: 'binary-trees',
    type: 'code_trace',
    difficulty: 3,
    content: 'For a tree with root 10, left child 5, right child 15, what is the postorder traversal?',
    options: ['10, 5, 15', '5, 15, 10', '5, 10, 15', '15, 5, 10'],
    correctAnswer: 1,
    explanation: 'Postorder visits left, right, then root. So: 5 (left), 15 (right), 10 (root).'
  },
  {
    id: 'bt-010',
    topicId: 'binary-trees',
    type: 'mcq',
    difficulty: 3,
    content: 'What is a full binary tree?',
    options: [
      'Every level is completely filled',
      'Every node has 0 or 2 children',
      'All leaves are at the same level',
      'The tree has maximum possible nodes'
    ],
    correctAnswer: 1,
    explanation: 'In a full binary tree, every node has either 0 children (leaf) or exactly 2 children. No node has just 1 child.'
  },
  {
    id: 'bt-011',
    topicId: 'binary-trees',
    type: 'mcq',
    difficulty: 3,
    content: 'What is a perfect binary tree?',
    options: [
      'All nodes have 2 children',
      'All internal nodes have 2 children AND all leaves at same level',
      'Height equals number of nodes',
      'Only has left children'
    ],
    correctAnswer: 1,
    explanation: 'A perfect binary tree is both full (all nodes have 0 or 2 children) and complete (all leaves at same depth).'
  },
  {
    id: 'bt-012',
    topicId: 'binary-trees',
    type: 'true_false',
    difficulty: 2,
    content: 'Every binary tree can be represented as an array.',
    correctAnswer: 'true',
    explanation: 'Any binary tree can be stored in an array using level-order indexing: root at 0, left child at 2i+1, right at 2i+2.'
  },
  {
    id: 'bt-013',
    topicId: 'binary-trees',
    type: 'mcq',
    difficulty: 4,
    content: 'Given only the preorder and inorder traversals, can you uniquely reconstruct the binary tree?',
    options: ['No, impossible', 'Yes, always', 'Only for BSTs', 'Only for complete trees'],
    correctAnswer: 1,
    explanation: 'Preorder gives root (first element), inorder splits left/right subtrees. Recursively apply to reconstruct the tree.'
  },
  {
    id: 'bt-014',
    topicId: 'binary-trees',
    type: 'mcq',
    difficulty: 3,
    content: 'How many leaf nodes does a full binary tree with n internal nodes have?',
    options: ['n', 'n + 1', 'n - 1', '2n'],
    correctAnswer: 1,
    explanation: 'In a full binary tree, the number of leaves is always one more than the number of internal nodes (n + 1).'
  },
  {
    id: 'bt-015',
    topicId: 'binary-trees',
    type: 'code_trace',
    difficulty: 4,
    content: 'What does this recursive function calculate?',
    codeSnippet: `def f(node):
    if not node:
        return 0
    return 1 + max(f(node.left), f(node.right))`,
    options: ['Number of nodes', 'Height of tree', 'Sum of values', 'Minimum value'],
    correctAnswer: 1,
    explanation: 'This calculates the height: returns 0 for empty, otherwise 1 + max height of subtrees.'
  },

  // Additional BST Questions
  {
    id: 'bst-008',
    topicId: 'binary-search-trees',
    type: 'code_trace',
    difficulty: 3,
    content: 'Where would 25 be inserted in BST with root 20, left child 10, right child 30?',
    options: [
      'Left child of 30',
      'Right child of 20',
      'Left child of 10',
      'Right child of 10'
    ],
    correctAnswer: 0,
    explanation: '25 > 20, go right. 25 < 30, go left. Insert as left child of 30.'
  },
  {
    id: 'bst-009',
    topicId: 'binary-search-trees',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the inorder successor of a node with a right subtree?',
    options: [
      'The rightmost node in left subtree',
      'The leftmost node in right subtree',
      'The parent node',
      'The root node'
    ],
    correctAnswer: 1,
    explanation: 'If a node has a right subtree, its inorder successor is the smallest element in that subtree (leftmost node).'
  },
  {
    id: 'bst-010',
    topicId: 'binary-search-trees',
    type: 'true_false',
    difficulty: 2,
    content: 'In a BST, the left subtree of a node contains only values less than the node\'s value.',
    correctAnswer: 'true',
    explanation: 'This is the BST property: all values in left subtree < node value < all values in right subtree.'
  },
  {
    id: 'bst-011',
    topicId: 'binary-search-trees',
    type: 'mcq',
    difficulty: 4,
    content: 'If we insert sorted elements 1,2,3,4,5 into an empty BST, what shape does it form?',
    options: ['Balanced tree', 'Right-skewed tree (like linked list)', 'Left-skewed tree', 'Complete binary tree'],
    correctAnswer: 1,
    explanation: 'Inserting sorted elements creates a degenerate tree where each node only has a right child, forming a linked list shape.'
  },
  {
    id: 'bst-012',
    topicId: 'binary-search-trees',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the minimum possible height of a BST with 7 nodes?',
    options: ['2', '3', '6', '7'],
    correctAnswer: 0,
    explanation: 'A perfectly balanced BST with 7 nodes has height 2: root + 2 levels = 1 + 2 + 4 = 7 nodes.'
  },
  {
    id: 'bst-013',
    topicId: 'binary-search-trees',
    type: 'code_trace',
    difficulty: 3,
    content: 'What does this function check?',
    codeSnippet: `def check(root, min_val=float('-inf'), max_val=float('inf')):
    if not root:
        return True
    if root.val <= min_val or root.val >= max_val:
        return False
    return check(root.left, min_val, root.val) and check(root.right, root.val, max_val)`,
    options: ['If tree is balanced', 'If tree is a valid BST', 'If tree is complete', 'Tree height'],
    correctAnswer: 1,
    explanation: 'This validates BST property by checking each node is within valid range based on ancestors.'
  },
  {
    id: 'bst-014',
    topicId: 'binary-search-trees',
    type: 'mcq',
    difficulty: 4,
    content: 'To find the kth smallest element in a BST, which traversal should be used?',
    options: ['Preorder', 'Inorder', 'Postorder', 'Level order'],
    correctAnswer: 1,
    explanation: 'Inorder traversal of BST visits nodes in ascending order. Stop at the kth visited node.'
  },
  {
    id: 'bst-015',
    topicId: 'binary-search-trees',
    type: 'mcq',
    difficulty: 4,
    content: 'When deleting a node with two children, why use the inorder successor?',
    options: [
      'It\'s faster to find',
      'It maintains the BST property',
      'It\'s always a leaf',
      'It reduces tree height'
    ],
    correctAnswer: 1,
    explanation: 'The inorder successor (smallest in right subtree) is larger than all left subtree values and smaller than remaining right subtree values, maintaining BST property.'
  },

  // Additional AVL Trees Questions
  {
    id: 'avl-008',
    topicId: 'avl-trees',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is the balance factor of a node with left subtree height 3 and right subtree height 1?',
    options: ['-2', '2', '4', '1'],
    correctAnswer: 1,
    explanation: 'Balance factor = height(left) - height(right) = 3 - 1 = 2. This node is unbalanced (|BF| > 1).'
  },
  {
    id: 'avl-009',
    topicId: 'avl-trees',
    type: 'mcq',
    difficulty: 3,
    content: 'When is a Right-Left (RL) rotation needed?',
    options: [
      'Node is left-heavy, left child is left-heavy',
      'Node is right-heavy, right child is left-heavy',
      'Node is left-heavy, left child is right-heavy',
      'Node is right-heavy, right child is right-heavy'
    ],
    correctAnswer: 1,
    explanation: 'RL case: node\'s balance factor < -1 (right-heavy) and right child\'s balance factor > 0 (left-heavy).'
  },
  {
    id: 'avl-010',
    topicId: 'avl-trees',
    type: 'true_false',
    difficulty: 2,
    content: 'AVL trees guarantee O(log n) search time.',
    correctAnswer: 'true',
    explanation: 'AVL trees maintain balance (height = O(log n)), ensuring all operations including search are O(log n).'
  },
  {
    id: 'avl-011',
    topicId: 'avl-trees',
    type: 'mcq',
    difficulty: 4,
    content: 'How many rotations are needed at most after a single insertion in an AVL tree?',
    options: ['0', '1', '2', 'O(log n)'],
    correctAnswer: 2,
    explanation: 'At most 2 rotations (for LR or RL cases) are needed after insertion. Deletion may require O(log n) rotations.'
  },
  {
    id: 'avl-012',
    topicId: 'avl-trees',
    type: 'mcq',
    difficulty: 3,
    content: 'After inserting 30, 20, 10 into an empty AVL tree (in that order), what is the root?',
    options: ['30', '20', '10', 'None'],
    correctAnswer: 1,
    explanation: 'Inserting 30, 20 creates left-heavy tree. Inserting 10 causes LL case. Right rotation makes 20 the root.'
  },
  {
    id: 'avl-013',
    topicId: 'avl-trees',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the time complexity of deletion in an AVL tree?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 1,
    explanation: 'Deletion is O(log n): find node O(log n), delete and rebalance up the tree O(log n).'
  },
  {
    id: 'avl-014',
    topicId: 'avl-trees',
    type: 'mcq',
    difficulty: 3,
    content: 'Compared to a regular BST, what is the main trade-off of using an AVL tree?',
    options: [
      'AVL uses more memory',
      'AVL has slower search',
      'AVL has slower insertion/deletion due to rebalancing',
      'AVL cannot store duplicates'
    ],
    correctAnswer: 2,
    explanation: 'AVL trees require additional rebalancing operations after insertions and deletions, adding overhead to maintain balance.'
  },
  {
    id: 'avl-015',
    topicId: 'avl-trees',
    type: 'true_false',
    difficulty: 4,
    content: 'A Red-Black tree has stricter balance requirements than an AVL tree.',
    correctAnswer: 'false',
    explanation: 'AVL trees are more strictly balanced (height difference ≤ 1). Red-Black trees allow more imbalance but have simpler rebalancing.'
  },

  // Additional Algorithm Analysis Questions
  {
    id: 'aa-008',
    topicId: 'algorithm-analysis',
    type: 'mcq',
    difficulty: 2,
    content: 'What is O(2n + 3) simplified to?',
    options: ['O(2n)', 'O(3)', 'O(n)', 'O(2n + 3)'],
    correctAnswer: 2,
    explanation: 'In Big O, we drop constants and lower-order terms. O(2n + 3) simplifies to O(n).'
  },
  {
    id: 'aa-009',
    topicId: 'algorithm-analysis',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the time complexity of merge sort?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctAnswer: 1,
    explanation: 'Merge sort divides array in half (log n levels) and merges at each level (n work). Total: O(n log n).'
  },
  {
    id: 'aa-010',
    topicId: 'algorithm-analysis',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is the time complexity?',
    codeSnippet: `for i in range(n):
    j = 1
    while j < n:
        j = j * 2`,
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctAnswer: 1,
    explanation: 'Outer loop runs n times. Inner while loop doubles j, running log n times. Total: O(n log n).'
  },
  {
    id: 'aa-011',
    topicId: 'algorithm-analysis',
    type: 'mcq',
    difficulty: 4,
    content: 'What does O(1) amortized time mean?',
    options: [
      'Every operation takes exactly 1 step',
      'Average time over many operations is O(1)',
      'Best case is O(1)',
      'Space complexity is O(1)'
    ],
    correctAnswer: 1,
    explanation: 'Amortized O(1) means that while individual operations may vary, the average over a sequence of operations is constant.'
  },
  {
    id: 'aa-012',
    topicId: 'algorithm-analysis',
    type: 'true_false',
    difficulty: 2,
    content: 'O(n²) is always worse than O(n log n) for all values of n.',
    correctAnswer: 'false',
    explanation: 'For small n, O(n²) might be faster due to lower constant factors. Big O describes asymptotic behavior for large n.'
  },
  {
    id: 'aa-013',
    topicId: 'algorithm-analysis',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the space complexity of recursive factorial(n)?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 2,
    explanation: 'Recursive calls create stack frames. factorial(n) makes n recursive calls, using O(n) stack space.'
  },
  {
    id: 'aa-014',
    topicId: 'algorithm-analysis',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the time complexity of checking if a number is prime (naive method)?',
    options: ['O(1)', 'O(log n)', 'O(√n)', 'O(n)'],
    correctAnswer: 2,
    explanation: 'Check divisibility from 2 to √n. If no divisor found, it\'s prime. This takes O(√n) time.'
  },
  {
    id: 'aa-015',
    topicId: 'algorithm-analysis',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the best case time complexity of quicksort?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctAnswer: 1,
    explanation: 'Best case (and average case) of quicksort is O(n log n) when pivots divide arrays roughly in half.'
  },

  // Additional Heaps Questions
  {
    id: 'heap-008',
    topicId: 'heaps',
    type: 'mcq',
    difficulty: 2,
    content: 'In a min-heap array [1, 3, 2, 7, 6, 4, 5], what is the parent of the element at index 5?',
    options: ['Element at index 0', 'Element at index 1', 'Element at index 2', 'Element at index 4'],
    correctAnswer: 2,
    explanation: 'Parent index = (child index - 1) // 2 = (5-1)//2 = 2. Element at index 2 is 2.'
  },
  {
    id: 'heap-009',
    topicId: 'heaps',
    type: 'true_false',
    difficulty: 2,
    content: 'A heap is always a complete binary tree.',
    correctAnswer: 'true',
    explanation: 'Heaps are complete binary trees: all levels except possibly the last are full, and the last level has nodes from left to right.'
  },
  {
    id: 'heap-010',
    topicId: 'heaps',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the time complexity of finding the minimum element in a max-heap?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 2,
    explanation: 'In a max-heap, the minimum can be any leaf. There are ~n/2 leaves, so finding minimum takes O(n).'
  },
  {
    id: 'heap-011',
    topicId: 'heaps',
    type: 'code_trace',
    difficulty: 3,
    content: 'After extract_min from [1, 3, 2, 7, 6, 4, 5], what is the new root?',
    options: ['3', '2', '5', '7'],
    correctAnswer: 1,
    explanation: '1 is removed, 5 (last element) moves to root, then bubbles down. 5 swaps with smaller child (2). New root is 2.'
  },
  {
    id: 'heap-012',
    topicId: 'heaps',
    type: 'mcq',
    difficulty: 4,
    content: 'How can you find the k largest elements in an array efficiently?',
    options: [
      'Sort and take last k - O(n log n)',
      'Use min-heap of size k - O(n log k)',
      'Use max-heap of all elements - O(n log n)',
      'Both B and C work, but B is more efficient'
    ],
    correctAnswer: 3,
    explanation: 'Min-heap of size k: iterate through array, add element, if size > k remove min. Final heap has k largest. O(n log k).'
  },
  {
    id: 'heap-013',
    topicId: 'heaps',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the relationship between a heap and a priority queue?',
    options: [
      'They are the same thing',
      'A heap is one way to implement a priority queue',
      'A priority queue is a type of heap',
      'They are unrelated'
    ],
    correctAnswer: 1,
    explanation: 'A priority queue is an abstract data type. A heap is one efficient implementation of a priority queue.'
  },
  {
    id: 'heap-014',
    topicId: 'heaps',
    type: 'mcq',
    difficulty: 4,
    content: 'In Python heapq, how do you create a max-heap?',
    options: [
      'Use heapq.maxheap()',
      'Negate all values when pushing and popping',
      'Set heap.type = "max"',
      'Max-heaps are not possible in Python'
    ],
    correctAnswer: 1,
    explanation: 'Python heapq only provides min-heap. For max-heap, negate values on insert and negate again on extract.'
  },
  {
    id: 'heap-015',
    topicId: 'heaps',
    type: 'true_false',
    difficulty: 3,
    content: 'The heap property must hold between any two nodes in the heap.',
    correctAnswer: 'false',
    explanation: 'The heap property only holds between parent and children. Siblings or cousins may be in any order relative to each other.'
  },

  // Additional Hash Tables Questions
  {
    id: 'ht-008',
    topicId: 'hash-tables',
    type: 'mcq',
    difficulty: 2,
    content: 'What makes a good hash function?',
    options: [
      'Always returns the same value',
      'Distributes keys uniformly across buckets',
      'Is very slow to compute',
      'Uses only the first character'
    ],
    correctAnswer: 1,
    explanation: 'A good hash function distributes keys uniformly to minimize collisions, is fast to compute, and is deterministic.'
  },
  {
    id: 'ht-009',
    topicId: 'hash-tables',
    type: 'true_false',
    difficulty: 2,
    content: 'In Python, dictionaries are implemented using hash tables.',
    correctAnswer: 'true',
    explanation: 'Python dictionaries use hash tables internally, providing average O(1) for get, set, and delete operations.'
  },
  {
    id: 'ht-010',
    topicId: 'hash-tables',
    type: 'mcq',
    difficulty: 3,
    content: 'What is double hashing?',
    options: [
      'Hashing the key twice',
      'Using two hash functions for probing',
      'Having two hash tables',
      'Computing hash of hash'
    ],
    correctAnswer: 1,
    explanation: 'Double hashing uses a second hash function to determine the probe sequence, reducing clustering compared to linear probing.'
  },
  {
    id: 'ht-011',
    topicId: 'hash-tables',
    type: 'mcq',
    difficulty: 3,
    content: 'What is primary clustering in linear probing?',
    options: [
      'Having too many buckets',
      'Consecutive occupied slots forming clusters',
      'All keys hashing to prime indices',
      'Using too small a table'
    ],
    correctAnswer: 1,
    explanation: 'Primary clustering occurs when consecutive slots fill up, making subsequent collisions more likely to hit the same cluster.'
  },
  {
    id: 'ht-012',
    topicId: 'hash-tables',
    type: 'code_trace',
    difficulty: 3,
    content: 'With table size 7, what is hash(15) using h(k) = k mod 7?',
    options: ['0', '1', '2', '15'],
    correctAnswer: 1,
    explanation: '15 mod 7 = 1. The key 15 would be placed at index 1.'
  },
  {
    id: 'ht-013',
    topicId: 'hash-tables',
    type: 'mcq',
    difficulty: 4,
    content: 'Why are hash table sizes often chosen to be prime numbers?',
    options: [
      'Prime numbers are faster to compute',
      'Helps distribute keys more uniformly',
      'Reduces memory usage',
      'Required by the hash function'
    ],
    correctAnswer: 1,
    explanation: 'Prime table sizes help distribute keys more uniformly because they have no common factors with most keys, reducing collision patterns.'
  },
  {
    id: 'ht-014',
    topicId: 'hash-tables',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the expected length of chains in chaining with load factor α?',
    options: ['1', 'α', 'α²', 'log α'],
    correctAnswer: 1,
    explanation: 'With uniform hashing and load factor α = n/m, the expected chain length is α (number of elements per bucket on average).'
  },
  {
    id: 'ht-015',
    topicId: 'hash-tables',
    type: 'true_false',
    difficulty: 3,
    content: 'Hash tables maintain elements in sorted order.',
    correctAnswer: 'false',
    explanation: 'Hash tables do not maintain order. For ordered operations, use a tree-based structure like TreeMap/TreeSet.'
  },

  // Additional Tries Questions
  {
    id: 'trie-008',
    topicId: 'tries',
    type: 'mcq',
    difficulty: 2,
    content: 'How many children can a Trie node have for lowercase English letters?',
    options: ['2', '26', '52', 'Unlimited'],
    correctAnswer: 1,
    explanation: 'For lowercase English letters (a-z), each node can have up to 26 children, one for each letter.'
  },
  {
    id: 'trie-009',
    topicId: 'tries',
    type: 'true_false',
    difficulty: 2,
    content: 'Tries are also called prefix trees.',
    correctAnswer: 'true',
    explanation: 'Tries are called prefix trees because each path from root represents a prefix of stored strings.'
  },
  {
    id: 'trie-010',
    topicId: 'tries',
    type: 'code_trace',
    difficulty: 3,
    content: 'In a Trie containing "cat" and "car", how many nodes are shared?',
    options: ['0', '2 (root, c)', '3 (root, c, a)', '4'],
    correctAnswer: 2,
    explanation: 'Both words share the path for "ca": root -> c -> a. The words diverge at the third character (t vs r).'
  },
  {
    id: 'trie-011',
    topicId: 'tries',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the time complexity of finding all words with a given prefix in a Trie?',
    options: ['O(1)', 'O(p)', 'O(p + k)', 'O(n)'],
    correctAnswer: 2,
    explanation: 'O(p) to reach the prefix node, then O(k) to collect all k words below that node. Total: O(p + k).'
  },
  {
    id: 'trie-012',
    topicId: 'tries',
    type: 'mcq',
    difficulty: 4,
    content: 'How can you count words with a given prefix without traversing all of them?',
    options: [
      'Impossible without traversal',
      'Store a count at each node',
      'Use a hash table instead',
      'Only works for sorted Tries'
    ],
    correctAnswer: 1,
    explanation: 'Store a word count at each node (incremented during insertion). The count at the prefix endpoint gives the answer in O(p).'
  },
  {
    id: 'trie-013',
    topicId: 'tries',
    type: 'mcq',
    difficulty: 3,
    content: 'What is a compressed Trie (Radix Tree)?',
    options: [
      'A Trie with fewer levels',
      'A Trie that merges nodes with single children',
      'A Trie stored in less memory',
      'A Trie for numbers only'
    ],
    correctAnswer: 1,
    explanation: 'A compressed Trie merges chains of single-child nodes into one node storing multiple characters, reducing node count.'
  },
  {
    id: 'trie-014',
    topicId: 'tries',
    type: 'true_false',
    difficulty: 3,
    content: 'Deleting a word from a Trie may require removing multiple nodes.',
    correctAnswer: 'true',
    explanation: 'If a word\'s path isn\'t shared with other words, its nodes can be removed. Deletion works backward from the end.'
  },
  {
    id: 'trie-015',
    topicId: 'tries',
    type: 'mcq',
    difficulty: 4,
    content: 'For spell-checking with edit distance 1, how can a Trie help?',
    options: [
      'Tries cannot help with edit distance',
      'Generate candidates by exploring neighboring paths',
      'Store all possible misspellings',
      'Use hash codes instead'
    ],
    correctAnswer: 1,
    explanation: 'Trie allows exploring paths that differ by one character (insertion, deletion, substitution) to find words within edit distance 1.'
  },

  // ===== SC1006 Additional Questions =====

  // ARM Programmer's Model - Additional Questions (8-15)
  {
    id: 'arm-008',
    topicId: 'arm-programmers-model',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the size of the ARM register file in a typical ARM7 processor?',
    options: ['8 registers', '16 registers', '32 registers', '64 registers'],
    correctAnswer: 1,
    explanation: 'ARM7 has 16 general-purpose registers (R0-R15), though some have special functions like PC (R15), LR (R14), and SP (R13).'
  },
  {
    id: 'arm-009',
    topicId: 'arm-programmers-model',
    type: 'true_false',
    difficulty: 2,
    content: 'The ARM Program Counter (PC) is always register R14.',
    correctAnswer: 'false',
    explanation: 'The Program Counter (PC) is R15, not R14. R14 is the Link Register (LR) which stores the return address for subroutines.'
  },
  {
    id: 'arm-010',
    topicId: 'arm-programmers-model',
    type: 'mcq',
    difficulty: 3,
    content: 'In ARM, what does the N flag in CPSR indicate?',
    options: [
      'Negative result (bit 31 is 1)',
      'No operation occurred',
      'Next instruction ready',
      'Null pointer detected'
    ],
    correctAnswer: 0,
    explanation: 'The N (Negative) flag is set when the result of an operation has bit 31 set to 1, indicating a negative value in two\'s complement.'
  },
  {
    id: 'arm-011',
    topicId: 'arm-programmers-model',
    type: 'mcq',
    difficulty: 3,
    content: 'Which ARM register is typically used as the Stack Pointer?',
    options: ['R12', 'R13', 'R14', 'R15'],
    correctAnswer: 1,
    explanation: 'R13 is conventionally used as the Stack Pointer (SP) in ARM architecture, though it\'s not enforced by hardware.'
  },
  {
    id: 'arm-012',
    topicId: 'arm-programmers-model',
    type: 'code_trace',
    difficulty: 3,
    content: 'If CPSR has N=0, Z=0, C=1, V=0 after a subtraction, what can you conclude?',
    options: [
      'Result was zero',
      'Result was positive with no borrow',
      'Result was negative',
      'Overflow occurred'
    ],
    correctAnswer: 1,
    explanation: 'N=0 means positive, Z=0 means non-zero, C=1 means no borrow occurred (in subtraction C=1 means >= comparison succeeded), V=0 means no overflow.'
  },
  {
    id: 'arm-013',
    topicId: 'arm-programmers-model',
    type: 'true_false',
    difficulty: 3,
    content: 'ARM processors can operate in both Big-endian and Little-endian modes.',
    correctAnswer: 'true',
    explanation: 'ARM processors are bi-endian, meaning they can be configured to operate in either Big-endian or Little-endian mode, typically set at boot time.'
  },
  {
    id: 'arm-014',
    topicId: 'arm-programmers-model',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the purpose of the SPSR (Saved Program Status Register)?',
    options: [
      'Store processor speed settings',
      'Save CPSR when exception occurs',
      'Control stack operations',
      'Store peripheral addresses'
    ],
    correctAnswer: 1,
    explanation: 'SPSR saves a copy of CPSR when an exception occurs, allowing the processor state to be restored when returning from the exception handler.'
  },
  {
    id: 'arm-015',
    topicId: 'arm-programmers-model',
    type: 'mcq',
    difficulty: 4,
    content: 'In ARM7TDMI, what does the "T" represent?',
    options: [
      'Test mode support',
      'Thumb instruction set support',
      'Timer functionality',
      'Trace debugging'
    ],
    correctAnswer: 1,
    explanation: 'The T in ARM7TDMI indicates Thumb instruction set support, which provides 16-bit compressed instructions for improved code density.'
  },

  // Addressing Modes - Additional Questions (8-15)
  {
    id: 'addr-008',
    topicId: 'addressing-modes',
    type: 'code_trace',
    difficulty: 3,
    content: 'Given LDR R1, [R2, #8]!, what happens to R2?',
    options: [
      'R2 remains unchanged',
      'R2 = R2 + 8 after the load',
      'R2 = R2 - 8 after the load',
      'R2 is set to 8'
    ],
    correctAnswer: 1,
    explanation: 'The ! indicates pre-indexed addressing with writeback. R2 is updated to R2+8 and this new address is used to load R1.'
  },
  {
    id: 'addr-009',
    topicId: 'addressing-modes',
    type: 'mcq',
    difficulty: 2,
    content: 'Which addressing mode uses the instruction itself to provide the operand value?',
    options: ['Register', 'Immediate', 'Indirect', 'Indexed'],
    correctAnswer: 1,
    explanation: 'Immediate addressing includes the operand value directly in the instruction, e.g., MOV R0, #100 where 100 is immediate.'
  },
  {
    id: 'addr-010',
    topicId: 'addressing-modes',
    type: 'true_false',
    difficulty: 3,
    content: 'In ARM, post-indexed addressing always updates the base register.',
    correctAnswer: 'true',
    explanation: 'Post-indexed addressing (e.g., LDR R1, [R2], #4) always updates the base register after using the original address for the memory access.'
  },
  {
    id: 'addr-011',
    topicId: 'addressing-modes',
    type: 'code_trace',
    difficulty: 3,
    content: 'What address is accessed by LDR R0, [R1, R2, LSL #2]?',
    options: [
      'R1 + R2',
      'R1 + (R2 * 4)',
      'R1 * R2',
      '(R1 + R2) * 4'
    ],
    correctAnswer: 1,
    explanation: 'The offset R2 is logically shifted left by 2 (multiplied by 4), then added to R1. This is useful for array indexing with 4-byte elements.'
  },
  {
    id: 'addr-012',
    topicId: 'addressing-modes',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the maximum immediate offset for LDR/STR instructions in ARM?',
    options: ['255 bytes', '4095 bytes', '65535 bytes', 'Unlimited'],
    correctAnswer: 1,
    explanation: 'ARM LDR/STR instructions use a 12-bit immediate offset, allowing values from -4095 to +4095 bytes.'
  },
  {
    id: 'addr-013',
    topicId: 'addressing-modes',
    type: 'true_false',
    difficulty: 2,
    content: 'Register indirect addressing uses the value in a register as the memory address.',
    correctAnswer: 'true',
    explanation: 'Register indirect addressing (e.g., LDR R0, [R1]) uses the content of R1 as the memory address to access.'
  },
  {
    id: 'addr-014',
    topicId: 'addressing-modes',
    type: 'mcq',
    difficulty: 4,
    content: 'Which addressing mode is most efficient for implementing a stack pop operation?',
    options: [
      'Pre-indexed without writeback',
      'Post-indexed with writeback',
      'Register direct',
      'PC-relative'
    ],
    correctAnswer: 1,
    explanation: 'Post-indexed addressing (LDR R0, [SP], #4) loads from the current SP then increments it, perfect for stack pop operations.'
  },
  {
    id: 'addr-015',
    topicId: 'addressing-modes',
    type: 'code_trace',
    difficulty: 4,
    content: 'What is the difference between LDR R0, [R1, #4] and LDR R0, [R1], #4?',
    options: [
      'No difference, both load from R1+4',
      'First loads from R1+4, second loads from R1 then updates R1',
      'First updates R1, second does not',
      'First uses signed offset, second uses unsigned'
    ],
    correctAnswer: 1,
    explanation: 'Pre-indexed [R1, #4] loads from R1+4 without updating R1. Post-indexed [R1], #4 loads from R1 then updates R1 to R1+4.'
  },

  // ARM Instruction Set - Additional Questions (10-15)
  {
    id: 'ais-010',
    topicId: 'arm-instruction-set',
    type: 'mcq',
    difficulty: 3,
    content: 'What does the S suffix do in an ARM instruction like ADDS?',
    options: [
      'Makes instruction signed',
      'Updates the condition flags in CPSR',
      'Stores result to stack',
      'Makes instruction sequential'
    ],
    correctAnswer: 1,
    explanation: 'The S suffix causes the instruction to update the CPSR condition flags (N, Z, C, V) based on the result.'
  },
  {
    id: 'ais-011',
    topicId: 'arm-instruction-set',
    type: 'code_trace',
    difficulty: 3,
    content: 'What does RSB R0, R1, #0 compute?',
    options: [
      'R0 = R1 + 0',
      'R0 = 0 - R1 (negates R1)',
      'R0 = R1 - 0',
      'R0 = 0'
    ],
    correctAnswer: 1,
    explanation: 'RSB (Reverse Subtract) computes R0 = operand2 - Rn, so RSB R0, R1, #0 gives R0 = 0 - R1, effectively negating R1.'
  },
  {
    id: 'ais-012',
    topicId: 'arm-instruction-set',
    type: 'mcq',
    difficulty: 3,
    content: 'Which instruction is used for ARM subroutine calls?',
    options: ['JSR', 'CALL', 'BL', 'JMP'],
    correctAnswer: 2,
    explanation: 'BL (Branch with Link) saves the return address in LR (R14) and branches to the subroutine address.'
  },
  {
    id: 'ais-013',
    topicId: 'arm-instruction-set',
    type: 'true_false',
    difficulty: 3,
    content: 'The CMP instruction modifies the destination register.',
    correctAnswer: 'false',
    explanation: 'CMP only updates the condition flags (CPSR) by performing a subtraction. It does not store the result in any register.'
  },
  {
    id: 'ais-014',
    topicId: 'arm-instruction-set',
    type: 'code_trace',
    difficulty: 4,
    content: 'What does LDM R0!, {R1-R4} do?',
    options: [
      'Loads R0 from memory addresses R1-R4',
      'Loads R1-R4 from consecutive memory starting at R0, updates R0',
      'Loads R0 four times',
      'Stores R1-R4 to memory'
    ],
    correctAnswer: 1,
    explanation: 'LDM (Load Multiple) loads R1, R2, R3, R4 from consecutive addresses starting at R0. The ! causes R0 to be updated to point past the loaded data.'
  },
  {
    id: 'ais-015',
    topicId: 'arm-instruction-set',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the purpose of the barrel shifter in ARM?',
    options: [
      'Increase clock speed',
      'Shift/rotate operand as part of instruction execution',
      'Handle floating point operations',
      'Manage memory access'
    ],
    correctAnswer: 1,
    explanation: 'The barrel shifter allows one operand to be shifted or rotated as part of data processing, combining two operations in one cycle.'
  },

  // Cache Memory - Additional Questions (8-15)
  {
    id: 'cache-008',
    topicId: 'cache-memory',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the main purpose of cache memory?',
    options: [
      'Increase storage capacity',
      'Bridge the speed gap between CPU and main memory',
      'Provide permanent storage',
      'Handle I/O operations'
    ],
    correctAnswer: 1,
    explanation: 'Cache provides fast, small memory that reduces the effective memory access time by exploiting temporal and spatial locality.'
  },
  {
    id: 'cache-009',
    topicId: 'cache-memory',
    type: 'true_false',
    difficulty: 2,
    content: 'In a write-through cache, data is written to both cache and main memory simultaneously.',
    correctAnswer: 'true',
    explanation: 'Write-through ensures consistency by writing to both cache and main memory on every write operation, though it\'s slower than write-back.'
  },
  {
    id: 'cache-010',
    topicId: 'cache-memory',
    type: 'mcq',
    difficulty: 3,
    content: 'Which replacement policy is most commonly used in hardware caches?',
    options: ['FIFO', 'LRU', 'Random', 'Optimal'],
    correctAnswer: 1,
    explanation: 'LRU (Least Recently Used) is most common as it approximates optimal replacement well and can be implemented efficiently in hardware.'
  },
  {
    id: 'cache-011',
    topicId: 'cache-memory',
    type: 'code_trace',
    difficulty: 3,
    content: 'A cache has 64 sets with 4-way associativity and 32-byte blocks. What is the total cache size?',
    options: ['2 KB', '4 KB', '8 KB', '16 KB'],
    correctAnswer: 2,
    explanation: 'Total size = sets × associativity × block size = 64 × 4 × 32 = 8192 bytes = 8 KB.'
  },
  {
    id: 'cache-012',
    topicId: 'cache-memory',
    type: 'mcq',
    difficulty: 3,
    content: 'What type of cache miss occurs when the cache is initially empty?',
    options: ['Conflict miss', 'Capacity miss', 'Compulsory miss', 'Coherence miss'],
    correctAnswer: 2,
    explanation: 'Compulsory (cold) misses occur when data is accessed for the first time and cannot be avoided regardless of cache size or organization.'
  },
  {
    id: 'cache-013',
    topicId: 'cache-memory',
    type: 'true_false',
    difficulty: 3,
    content: 'Direct-mapped cache has only one possible location for each memory block.',
    correctAnswer: 'true',
    explanation: 'In direct-mapped cache, each memory block maps to exactly one cache line, determined by the index bits of the address.'
  },
  {
    id: 'cache-014',
    topicId: 'cache-memory',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the dirty bit used for in cache?',
    options: [
      'Indicate invalid data',
      'Mark blocks modified but not yet written to memory',
      'Signal cache errors',
      'Track access frequency'
    ],
    correctAnswer: 1,
    explanation: 'The dirty bit indicates a cache block has been modified and must be written back to main memory before being replaced (write-back policy).'
  },
  {
    id: 'cache-015',
    topicId: 'cache-memory',
    type: 'code_trace',
    difficulty: 4,
    content: 'With a hit rate of 95% and cache access time of 1ns, main memory access time of 100ns, what is the average memory access time?',
    options: ['5.95 ns', '6 ns', '50.5 ns', '95 ns'],
    correctAnswer: 0,
    explanation: 'AMAT = hit_time + miss_rate × miss_penalty = 1 + 0.05 × 100 = 1 + 5 = 6 ns. (Or 0.95×1 + 0.05×101 = 5.95ns including hit time in miss)'
  },

  // Virtual Memory - Additional Questions (9-15)
  {
    id: 'vm-009',
    topicId: 'virtual-memory',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the primary benefit of virtual memory?',
    options: [
      'Faster memory access',
      'Run programs larger than physical memory',
      'Lower cost per byte',
      'Simpler hardware design'
    ],
    correctAnswer: 1,
    explanation: 'Virtual memory allows running programs that exceed physical memory by using disk as an extension, and provides memory protection between processes.'
  },
  {
    id: 'vm-010',
    topicId: 'virtual-memory',
    type: 'true_false',
    difficulty: 2,
    content: 'The TLB is a cache for page table entries.',
    correctAnswer: 'true',
    explanation: 'Translation Lookaside Buffer (TLB) caches recent virtual-to-physical address translations to speed up address translation.'
  },
  {
    id: 'vm-011',
    topicId: 'virtual-memory',
    type: 'mcq',
    difficulty: 3,
    content: 'What happens during a page fault?',
    options: [
      'CPU crashes',
      'Page is loaded from disk to memory',
      'TLB is flushed',
      'Cache is invalidated'
    ],
    correctAnswer: 1,
    explanation: 'A page fault triggers the OS to load the required page from disk (swap space) into physical memory, then update the page table.'
  },
  {
    id: 'vm-012',
    topicId: 'virtual-memory',
    type: 'code_trace',
    difficulty: 3,
    content: 'With 32-bit virtual addresses, 4KB pages, and 4-byte page table entries, how large is a single-level page table?',
    options: ['4 MB', '8 MB', '16 MB', '32 MB'],
    correctAnswer: 0,
    explanation: 'Number of pages = 2^32 / 4KB = 2^20 pages. Table size = 2^20 × 4 bytes = 4 MB.'
  },
  {
    id: 'vm-013',
    topicId: 'virtual-memory',
    type: 'mcq',
    difficulty: 3,
    content: 'Why are multi-level page tables used?',
    options: [
      'Faster translation',
      'Reduce page table memory overhead',
      'Larger page sizes',
      'Better cache performance'
    ],
    correctAnswer: 1,
    explanation: 'Multi-level page tables save memory by only allocating page table portions for address ranges actually in use, rather than the entire address space.'
  },
  {
    id: 'vm-014',
    topicId: 'virtual-memory',
    type: 'true_false',
    difficulty: 4,
    content: 'Inverted page tables have one entry per physical frame, not per virtual page.',
    correctAnswer: 'true',
    explanation: 'Inverted page tables index by physical frame number and store the corresponding virtual page number, reducing table size to physical memory size.'
  },
  {
    id: 'vm-015',
    topicId: 'virtual-memory',
    type: 'mcq',
    difficulty: 4,
    content: 'What is thrashing in virtual memory systems?',
    options: [
      'Fast page replacement',
      'Excessive page faults causing poor performance',
      'Corrupted page tables',
      'TLB overflow'
    ],
    correctAnswer: 1,
    explanation: 'Thrashing occurs when the system spends more time handling page faults than executing programs, typically due to insufficient physical memory.'
  },

  // Data Transfer - Additional Questions (8-15)
  {
    id: 'dt-008',
    topicId: 'data-transfer',
    type: 'mcq',
    difficulty: 2,
    content: 'Which data transfer method requires the CPU for each byte transferred?',
    options: ['DMA', 'Programmed I/O', 'Memory-mapped I/O', 'Interrupt-driven I/O'],
    correctAnswer: 1,
    explanation: 'Programmed I/O requires the CPU to execute instructions for each data transfer, making it the most CPU-intensive method.'
  },
  {
    id: 'dt-009',
    topicId: 'data-transfer',
    type: 'true_false',
    difficulty: 2,
    content: 'DMA allows devices to transfer data directly to memory without CPU involvement.',
    correctAnswer: 'true',
    explanation: 'Direct Memory Access (DMA) enables peripherals to access main memory directly, freeing the CPU to perform other tasks during transfer.'
  },
  {
    id: 'dt-010',
    topicId: 'data-transfer',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the advantage of interrupt-driven I/O over programmed I/O?',
    options: [
      'Faster transfer speed',
      'CPU can do other work while waiting',
      'Simpler implementation',
      'Uses less memory'
    ],
    correctAnswer: 1,
    explanation: 'Interrupt-driven I/O allows the CPU to execute other instructions while waiting for I/O, only handling transfers when interrupted.'
  },
  {
    id: 'dt-011',
    topicId: 'data-transfer',
    type: 'mcq',
    difficulty: 3,
    content: 'In memory-mapped I/O, how are device registers accessed?',
    options: [
      'Special I/O instructions',
      'Normal load/store instructions',
      'System calls only',
      'DMA controller'
    ],
    correctAnswer: 1,
    explanation: 'Memory-mapped I/O maps device registers to memory addresses, allowing normal load/store instructions to access peripherals.'
  },
  {
    id: 'dt-012',
    topicId: 'data-transfer',
    type: 'true_false',
    difficulty: 3,
    content: 'Cycle stealing DMA borrows bus cycles from the CPU.',
    correctAnswer: 'true',
    explanation: 'Cycle stealing mode allows DMA to take individual bus cycles from the CPU as needed, causing minimal disruption to CPU operations.'
  },
  {
    id: 'dt-013',
    topicId: 'data-transfer',
    type: 'mcq',
    difficulty: 4,
    content: 'What is burst mode DMA?',
    options: [
      'DMA with error correction',
      'DMA that transfers entire block before releasing bus',
      'Multiple DMA channels working together',
      'DMA with priority scheduling'
    ],
    correctAnswer: 1,
    explanation: 'Burst mode DMA transfers an entire data block at once, holding the bus until completion for maximum throughput but blocking CPU memory access.'
  },
  {
    id: 'dt-014',
    topicId: 'data-transfer',
    type: 'mcq',
    difficulty: 4,
    content: 'What problem does double buffering solve in I/O?',
    options: [
      'Memory corruption',
      'Allows processing while transferring next block',
      'Reduces power consumption',
      'Increases transfer speed'
    ],
    correctAnswer: 1,
    explanation: 'Double buffering uses two buffers so the CPU can process data in one buffer while the device fills the other, enabling overlap of I/O and computation.'
  },
  {
    id: 'dt-015',
    topicId: 'data-transfer',
    type: 'true_false',
    difficulty: 3,
    content: 'Handshaking protocols ensure sender and receiver are synchronized during data transfer.',
    correctAnswer: 'true',
    explanation: 'Handshaking uses control signals to coordinate data transfer between devices, ensuring the receiver is ready before data is sent.'
  },

  // Memory Types - Additional Questions (8-15)
  {
    id: 'mt-008',
    topicId: 'memory-types',
    type: 'mcq',
    difficulty: 2,
    content: 'Which memory type loses its contents when power is removed?',
    options: ['ROM', 'Flash', 'DRAM', 'EEPROM'],
    correctAnswer: 2,
    explanation: 'DRAM (Dynamic RAM) is volatile and requires constant refresh; it loses data when power is removed. ROM and Flash are non-volatile.'
  },
  {
    id: 'mt-009',
    topicId: 'memory-types',
    type: 'true_false',
    difficulty: 2,
    content: 'SRAM is faster than DRAM but more expensive per bit.',
    correctAnswer: 'true',
    explanation: 'SRAM uses flip-flops (6 transistors per bit) making it faster but larger and more expensive than DRAM (1 transistor + 1 capacitor per bit).'
  },
  {
    id: 'mt-010',
    topicId: 'memory-types',
    type: 'mcq',
    difficulty: 3,
    content: 'Why does DRAM require periodic refresh?',
    options: [
      'To update memory addresses',
      'Capacitor charge leaks over time',
      'To synchronize with CPU',
      'To clear error bits'
    ],
    correctAnswer: 1,
    explanation: 'DRAM stores bits as charge in capacitors, which leaks over time. Refresh reads and rewrites each row to restore the charge (typically every 64ms).'
  },
  {
    id: 'mt-011',
    topicId: 'memory-types',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the typical use case for SRAM?',
    options: [
      'Main memory',
      'Hard drive storage',
      'CPU cache',
      'USB flash drives'
    ],
    correctAnswer: 2,
    explanation: 'SRAM\'s high speed and lack of refresh requirement make it ideal for cache memory, despite higher cost limiting its use to small, fast storage.'
  },
  {
    id: 'mt-012',
    topicId: 'memory-types',
    type: 'true_false',
    difficulty: 3,
    content: 'Flash memory can be erased and rewritten a limited number of times.',
    correctAnswer: 'true',
    explanation: 'Flash memory has write endurance limits (typically 10,000-100,000 cycles per cell) due to oxide layer degradation during erase operations.'
  },
  {
    id: 'mt-013',
    topicId: 'memory-types',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the advantage of DDR (Double Data Rate) memory over SDR?',
    options: [
      'Larger capacity',
      'Transfers data on both clock edges',
      'Lower power consumption',
      'Simpler controller design'
    ],
    correctAnswer: 1,
    explanation: 'DDR transfers data on both rising and falling clock edges, effectively doubling the data rate without increasing the clock frequency.'
  },
  {
    id: 'mt-014',
    topicId: 'memory-types',
    type: 'mcq',
    difficulty: 4,
    content: 'What distinguishes NOR flash from NAND flash?',
    options: [
      'NOR is faster for sequential reads',
      'NOR allows random byte access, NAND is page-based',
      'NAND has better write endurance',
      'NOR is larger capacity'
    ],
    correctAnswer: 1,
    explanation: 'NOR flash allows random byte access (suitable for code execution), while NAND requires page-based access but offers higher density and lower cost.'
  },
  {
    id: 'mt-015',
    topicId: 'memory-types',
    type: 'true_false',
    difficulty: 3,
    content: 'ROM (Read-Only Memory) cannot be modified after manufacturing.',
    correctAnswer: 'true',
    explanation: 'True ROM is mask-programmed during manufacturing and cannot be changed. PROM, EPROM, and EEPROM are later variants allowing programming.'
  },

  // Number Systems - Additional Questions (8-15)
  {
    id: 'ns-008',
    topicId: 'number-systems',
    type: 'code_trace',
    difficulty: 2,
    content: 'What is the decimal value of binary 10110?',
    options: ['18', '20', '22', '24'],
    correctAnswer: 2,
    explanation: '10110 = 1×16 + 0×8 + 1×4 + 1×2 + 0×1 = 16 + 4 + 2 = 22.'
  },
  {
    id: 'ns-009',
    topicId: 'number-systems',
    type: 'true_false',
    difficulty: 2,
    content: 'In two\'s complement, -1 is represented as all 1s.',
    correctAnswer: 'true',
    explanation: 'In two\'s complement, -1 is represented as all 1s (e.g., 11111111 for 8-bit), because inverting and adding 1 to 00000001 gives 11111111.'
  },
  {
    id: 'ns-010',
    topicId: 'number-systems',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the IEEE 754 single-precision format structure?',
    options: [
      '1 sign, 7 exponent, 24 mantissa',
      '1 sign, 8 exponent, 23 mantissa',
      '1 sign, 10 exponent, 21 mantissa',
      '1 sign, 11 exponent, 20 mantissa'
    ],
    correctAnswer: 1,
    explanation: 'IEEE 754 single precision uses 32 bits: 1 sign bit, 8 exponent bits (biased by 127), and 23 mantissa bits (implicit leading 1).'
  },
  {
    id: 'ns-011',
    topicId: 'number-systems',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is the 8-bit two\'s complement representation of -5?',
    options: ['11111010', '11111011', '10000101', '00000101'],
    correctAnswer: 1,
    explanation: '+5 = 00000101, invert = 11111010, add 1 = 11111011. So -5 in two\'s complement is 11111011.'
  },
  {
    id: 'ns-012',
    topicId: 'number-systems',
    type: 'mcq',
    difficulty: 3,
    content: 'What special value does IEEE 754 represent with exponent all 1s and mantissa all 0s?',
    options: ['Zero', 'Infinity', 'NaN', 'Denormalized'],
    correctAnswer: 1,
    explanation: 'Exponent = all 1s with mantissa = 0 represents infinity (positive or negative depending on sign bit). Non-zero mantissa represents NaN.'
  },
  {
    id: 'ns-013',
    topicId: 'number-systems',
    type: 'true_false',
    difficulty: 4,
    content: 'The bias in IEEE 754 single-precision exponent is 127.',
    correctAnswer: 'true',
    explanation: 'IEEE 754 single precision uses bias-127 for the 8-bit exponent. Actual exponent = stored value - 127, allowing range from -126 to +127.'
  },
  {
    id: 'ns-014',
    topicId: 'number-systems',
    type: 'code_trace',
    difficulty: 4,
    content: 'What range can be represented by a signed 8-bit two\'s complement number?',
    options: ['-127 to 128', '-128 to 127', '-255 to 255', '0 to 255'],
    correctAnswer: 1,
    explanation: '8-bit two\'s complement ranges from -2^7 = -128 to 2^7 - 1 = 127, giving -128 to 127.'
  },
  {
    id: 'ns-015',
    topicId: 'number-systems',
    type: 'mcq',
    difficulty: 4,
    content: 'What is a denormalized number in IEEE 754?',
    options: [
      'Numbers larger than maximum',
      'Numbers smaller than minimum normal, with exponent = 0',
      'Invalid numbers',
      'Numbers without fractional part'
    ],
    correctAnswer: 1,
    explanation: 'Denormalized numbers have exponent = 0 and represent very small values near zero, allowing gradual underflow instead of sudden jump to zero.'
  },

  // Pipelining - Additional Questions (8-15)
  {
    id: 'pipe-008',
    topicId: 'pipelining',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the main benefit of CPU pipelining?',
    options: [
      'Reduces power consumption',
      'Increases instruction throughput',
      'Simplifies instruction set',
      'Reduces memory usage'
    ],
    correctAnswer: 1,
    explanation: 'Pipelining increases throughput by overlapping execution of multiple instructions, ideally completing one instruction per clock cycle.'
  },
  {
    id: 'pipe-009',
    topicId: 'pipelining',
    type: 'true_false',
    difficulty: 2,
    content: 'In a 5-stage pipeline, up to 5 instructions can be in different stages simultaneously.',
    correctAnswer: 'true',
    explanation: 'Each pipeline stage processes a different instruction, so a 5-stage pipeline can have 5 instructions in flight concurrently.'
  },
  {
    id: 'pipe-010',
    topicId: 'pipelining',
    type: 'mcq',
    difficulty: 3,
    content: 'What type of hazard occurs when an instruction needs data from a previous instruction not yet written back?',
    options: ['Structural hazard', 'Data hazard', 'Control hazard', 'Memory hazard'],
    correctAnswer: 1,
    explanation: 'Data hazards (RAW - Read After Write) occur when an instruction depends on the result of a previous instruction still in the pipeline.'
  },
  {
    id: 'pipe-011',
    topicId: 'pipelining',
    type: 'mcq',
    difficulty: 3,
    content: 'What technique forwards data directly from ALU output to the next instruction\'s input?',
    options: ['Stalling', 'Forwarding/Bypassing', 'Branch prediction', 'Speculation'],
    correctAnswer: 1,
    explanation: 'Forwarding (bypassing) sends the ALU result directly to a dependent instruction without waiting for writeback, reducing data hazard stalls.'
  },
  {
    id: 'pipe-012',
    topicId: 'pipelining',
    type: 'true_false',
    difficulty: 3,
    content: 'Branch prediction is used to reduce control hazards.',
    correctAnswer: 'true',
    explanation: 'Branch prediction guesses the outcome of conditional branches to keep the pipeline full, reducing the stalls caused by control hazards.'
  },
  {
    id: 'pipe-013',
    topicId: 'pipelining',
    type: 'code_trace',
    difficulty: 4,
    content: 'If a branch is mispredicted in a 5-stage pipeline, how many cycles are typically wasted?',
    options: ['1 cycle', '2-3 cycles', '5 cycles', '10 cycles'],
    correctAnswer: 1,
    explanation: 'Pipeline flush on misprediction wastes cycles for instructions already fetched. Typically 2-3 cycles for a 5-stage pipeline depending on when branch resolves.'
  },
  {
    id: 'pipe-014',
    topicId: 'pipelining',
    type: 'mcq',
    difficulty: 4,
    content: 'What is a structural hazard?',
    options: [
      'Data dependency between instructions',
      'Two instructions need the same hardware resource',
      'Branch instruction changes flow',
      'Memory access conflict'
    ],
    correctAnswer: 1,
    explanation: 'Structural hazards occur when multiple instructions compete for the same hardware resource (e.g., single memory port for both fetch and data access).'
  },
  {
    id: 'pipe-015',
    topicId: 'pipelining',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the pipeline speedup formula (ideal case)?',
    options: [
      'Speedup = number of stages',
      'Speedup = clock frequency × stages',
      'Speedup = 1 / number of stages',
      'Speedup = stages / 2'
    ],
    correctAnswer: 0,
    explanation: 'Ideal speedup equals the number of pipeline stages (e.g., 5-stage pipeline = 5x speedup), assuming no hazards and full pipeline utilization.'
  },

  // ===== SC1008 Additional Questions =====

  // C Basics - Additional Questions (8-15)
  {
    id: 'cb-008',
    topicId: 'c-basics',
    type: 'code_trace',
    difficulty: 2,
    content: 'What is the output of: printf("%d", sizeof(char));',
    options: ['0', '1', '2', '4'],
    correctAnswer: 1,
    explanation: 'sizeof(char) is always 1 byte by definition in C, regardless of the platform.'
  },
  {
    id: 'cb-009',
    topicId: 'c-basics',
    type: 'true_false',
    difficulty: 2,
    content: 'In C, variable names can start with a number.',
    correctAnswer: 'false',
    explanation: 'C identifiers must start with a letter or underscore. Numbers can appear after the first character but not at the beginning.'
  },
  {
    id: 'cb-010',
    topicId: 'c-basics',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the difference between = and == in C?',
    options: [
      'No difference',
      '= is assignment, == is comparison',
      '= is comparison, == is assignment',
      '== is for strings only'
    ],
    correctAnswer: 1,
    explanation: '= is the assignment operator (x = 5 assigns 5 to x). == is the equality comparison operator (x == 5 checks if x equals 5).'
  },
  {
    id: 'cb-011',
    topicId: 'c-basics',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is the value of 7 % 3 in C?',
    options: ['0', '1', '2', '3'],
    correctAnswer: 1,
    explanation: 'The modulo operator % returns the remainder of integer division. 7 / 3 = 2 remainder 1, so 7 % 3 = 1.'
  },
  {
    id: 'cb-012',
    topicId: 'c-basics',
    type: 'mcq',
    difficulty: 3,
    content: 'Which format specifier is used for printing a float in C?',
    options: ['%d', '%c', '%f', '%s'],
    correctAnswer: 2,
    explanation: '%f is used for float/double values. %d is for integers, %c for characters, and %s for strings.'
  },
  {
    id: 'cb-013',
    topicId: 'c-basics',
    type: 'true_false',
    difficulty: 3,
    content: 'The const keyword in C makes a variable\'s value unchangeable.',
    correctAnswer: 'true',
    explanation: 'const declares a read-only variable. Attempting to modify it causes a compilation error.'
  },
  {
    id: 'cb-014',
    topicId: 'c-basics',
    type: 'code_trace',
    difficulty: 4,
    content: 'What does int x = 5, y = 2; float z = x/y; give for z?',
    options: ['2.0', '2.5', '2', '3'],
    correctAnswer: 1,
    explanation: 'Integer division 5/2 = 2 (truncated), then converted to float 2.0. For 2.5, use (float)x/y or 5.0/2.'
  },
  {
    id: 'cb-015',
    topicId: 'c-basics',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the scope of a variable declared inside a for loop in C99?',
    options: [
      'Entire function',
      'Only the for loop block',
      'Global scope',
      'Until end of file'
    ],
    correctAnswer: 1,
    explanation: 'In C99 and later, a variable declared in for(int i=0;...) is scoped only to the loop body and not accessible outside.'
  },

  // Control Flow - Additional Questions (8-15)
  {
    id: 'cf-008',
    topicId: 'control-flow',
    type: 'code_trace',
    difficulty: 2,
    content: 'What is the output?\nint i = 0;\nwhile(i < 3) {\n  printf("%d ", i);\n  i++;\n}',
    options: ['0 1 2', '0 1 2 3', '1 2 3', '0 1'],
    correctAnswer: 0,
    explanation: 'Loop runs while i < 3: prints 0, 1, 2. When i becomes 3, condition fails and loop exits.'
  },
  {
    id: 'cf-009',
    topicId: 'control-flow',
    type: 'true_false',
    difficulty: 2,
    content: 'A do-while loop executes at least once.',
    correctAnswer: 'true',
    explanation: 'do-while checks the condition after the loop body, so the body executes at least once regardless of the condition.'
  },
  {
    id: 'cf-010',
    topicId: 'control-flow',
    type: 'mcq',
    difficulty: 3,
    content: 'What does the break statement do inside a loop?',
    options: [
      'Skips to next iteration',
      'Exits the innermost loop',
      'Exits all nested loops',
      'Pauses execution'
    ],
    correctAnswer: 1,
    explanation: 'break immediately exits the innermost enclosing loop or switch. To exit multiple loops, use goto or a flag variable.'
  },
  {
    id: 'cf-011',
    topicId: 'control-flow',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is the output?\nfor(int i=0; i<5; i++) {\n  if(i == 2) continue;\n  printf("%d ", i);\n}',
    options: ['0 1 2 3 4', '0 1 3 4', '0 1', '2'],
    correctAnswer: 1,
    explanation: 'continue skips the rest of the current iteration. When i==2, printf is skipped. Output: 0 1 3 4.'
  },
  {
    id: 'cf-012',
    topicId: 'control-flow',
    type: 'mcq',
    difficulty: 3,
    content: 'What happens if no break is used in a switch case?',
    options: [
      'Compilation error',
      'Fall-through to next case',
      'Only first case executes',
      'Program crashes'
    ],
    correctAnswer: 1,
    explanation: 'Without break, execution falls through to the next case(s) until a break is encountered or switch ends.'
  },
  {
    id: 'cf-013',
    topicId: 'control-flow',
    type: 'true_false',
    difficulty: 3,
    content: 'The condition (x = 5) in an if statement is always true if x is successfully assigned.',
    correctAnswer: 'true',
    explanation: 'x = 5 assigns 5 to x and returns 5. Since 5 is non-zero, it evaluates to true. This is a common bug when == was intended.'
  },
  {
    id: 'cf-014',
    topicId: 'control-flow',
    type: 'code_trace',
    difficulty: 4,
    content: 'What is the output?\nint x = 5;\nswitch(x) {\n  case 5: printf("A");\n  case 6: printf("B");\n  default: printf("C");\n}',
    options: ['A', 'AB', 'ABC', 'AC'],
    correctAnswer: 2,
    explanation: 'No break statements cause fall-through. Matches case 5, prints A, then falls through to case 6 (B) and default (C). Output: ABC.'
  },
  {
    id: 'cf-015',
    topicId: 'control-flow',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the ternary operator in C?',
    options: [
      '&&',
      '||',
      '?:',
      '!='
    ],
    correctAnswer: 2,
    explanation: 'The ternary operator ?: is shorthand for if-else: condition ? value_if_true : value_if_false. Example: max = (a > b) ? a : b;'
  },

  // Functions - Additional Questions (8-15)
  {
    id: 'fn-008',
    topicId: 'functions',
    type: 'mcq',
    difficulty: 2,
    content: 'What does void as a return type mean?',
    options: [
      'Function returns 0',
      'Function returns nothing',
      'Function returns null',
      'Function is undefined'
    ],
    correctAnswer: 1,
    explanation: 'void indicates the function does not return a value. Attempting to use a return value from a void function is an error.'
  },
  {
    id: 'fn-009',
    topicId: 'functions',
    type: 'true_false',
    difficulty: 2,
    content: 'Function prototypes allow functions to be called before their definitions.',
    correctAnswer: 'true',
    explanation: 'Prototypes (forward declarations) inform the compiler about a function\'s signature, enabling calls before the full definition appears.'
  },
  {
    id: 'fn-010',
    topicId: 'functions',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is x after: void change(int a) { a = 10; } int x = 5; change(x);',
    options: ['5', '10', '0', 'undefined'],
    correctAnswer: 0,
    explanation: 'C uses pass-by-value. The function receives a copy of x, so modifying a doesn\'t affect x. x remains 5.'
  },
  {
    id: 'fn-011',
    topicId: 'functions',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the purpose of static for a function in C?',
    options: [
      'Makes function faster',
      'Limits function visibility to the file',
      'Makes function immutable',
      'Enables recursion'
    ],
    correctAnswer: 1,
    explanation: 'static on a function limits its scope to the translation unit (file) where it\'s defined, preventing external linkage.'
  },
  {
    id: 'fn-012',
    topicId: 'functions',
    type: 'true_false',
    difficulty: 3,
    content: 'A function can return multiple values directly in C.',
    correctAnswer: 'false',
    explanation: 'C functions can only return one value. Multiple values require pointers (output parameters), structs, or global variables.'
  },
  {
    id: 'fn-013',
    topicId: 'functions',
    type: 'code_trace',
    difficulty: 4,
    content: 'What does static int count = 0; inside a function do?',
    options: [
      'Resets count to 0 each call',
      'Preserves count value between calls',
      'Makes count global',
      'Causes compilation error'
    ],
    correctAnswer: 1,
    explanation: 'Static local variables are initialized once and retain their value between function calls, unlike regular local variables.'
  },
  {
    id: 'fn-014',
    topicId: 'functions',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the main() function\'s return value used for?',
    options: [
      'Memory allocation',
      'Exit status to operating system',
      'Loop counting',
      'Nothing'
    ],
    correctAnswer: 1,
    explanation: 'main() returns an exit code to the OS. 0 typically indicates success, non-zero indicates error. Used in scripts and automation.'
  },
  {
    id: 'fn-015',
    topicId: 'functions',
    type: 'mcq',
    difficulty: 4,
    content: 'What is a variadic function in C?',
    options: [
      'Function with no parameters',
      'Function accepting variable number of arguments',
      'Recursive function',
      'Inline function'
    ],
    correctAnswer: 1,
    explanation: 'Variadic functions like printf() accept varying numbers of arguments using ... syntax and <stdarg.h> macros (va_list, va_start, etc.).'
  },

  // Pointers - Additional Questions (8-15)
  {
    id: 'ptr-008',
    topicId: 'pointers',
    type: 'code_trace',
    difficulty: 2,
    content: 'What does int *p; declare?',
    options: [
      'An integer variable',
      'A pointer to an integer',
      'An array of integers',
      'A reference to an integer'
    ],
    correctAnswer: 1,
    explanation: 'int *p declares p as a pointer to int. The * indicates pointer type, and p can store the address of an int variable.'
  },
  {
    id: 'ptr-009',
    topicId: 'pointers',
    type: 'true_false',
    difficulty: 2,
    content: 'The & operator returns the address of a variable.',
    correctAnswer: 'true',
    explanation: '& (address-of operator) returns the memory address of its operand. Example: int x; int *p = &x; makes p point to x.'
  },
  {
    id: 'ptr-010',
    topicId: 'pointers',
    type: 'code_trace',
    difficulty: 3,
    content: 'If int x = 5, *p = &x; what is the value of *p?',
    options: ['Address of x', '5', 'Undefined', '0'],
    correctAnswer: 1,
    explanation: '*p dereferences the pointer, giving the value at the address p points to. Since p points to x, *p equals x\'s value: 5.'
  },
  {
    id: 'ptr-011',
    topicId: 'pointers',
    type: 'mcq',
    difficulty: 3,
    content: 'What is a NULL pointer?',
    options: [
      'Pointer to address 0',
      'Pointer that doesn\'t point to valid memory',
      'Uninitialized pointer',
      'Both A and B'
    ],
    correctAnswer: 3,
    explanation: 'NULL is typically defined as 0 or (void*)0, representing an invalid pointer. It\'s used to indicate a pointer doesn\'t reference valid data.'
  },
  {
    id: 'ptr-012',
    topicId: 'pointers',
    type: 'true_false',
    difficulty: 3,
    content: 'Pointer arithmetic: p + 1 adds sizeof(*p) bytes to p, not 1 byte.',
    correctAnswer: 'true',
    explanation: 'Pointer arithmetic scales by the pointed-to type\'s size. For int *p, p+1 advances by sizeof(int) bytes (typically 4), not 1.'
  },
  {
    id: 'ptr-013',
    topicId: 'pointers',
    type: 'code_trace',
    difficulty: 4,
    content: 'What does int **pp; declare?',
    options: [
      'Invalid syntax',
      'Pointer to pointer to int',
      'Array of pointers',
      'Reference to pointer'
    ],
    correctAnswer: 1,
    explanation: 'int **pp is a pointer to a pointer to int (double pointer). Used for 2D arrays, modifying pointers in functions, etc.'
  },
  {
    id: 'ptr-014',
    topicId: 'pointers',
    type: 'mcq',
    difficulty: 4,
    content: 'Why use pointers to pass large structs to functions?',
    options: [
      'Pointers are required for structs',
      'Avoid copying the entire struct (efficiency)',
      'Structs cannot be passed by value',
      'Compiler requirement'
    ],
    correctAnswer: 1,
    explanation: 'Passing by pointer avoids copying the entire struct, improving efficiency. Pass-by-value copies all struct data, which is slow for large structs.'
  },
  {
    id: 'ptr-015',
    topicId: 'pointers',
    type: 'code_trace',
    difficulty: 4,
    content: 'What is the difference between const int *p and int * const p?',
    options: [
      'No difference',
      'First: value is const, Second: pointer is const',
      'First: pointer is const, Second: value is const',
      'Both make everything const'
    ],
    correctAnswer: 1,
    explanation: 'const int *p: cannot modify *p (value). int * const p: cannot modify p (pointer itself). Read right-to-left: "p is [const] pointer to [const] int".'
  },

  // Arrays - Additional Questions (8-15)
  {
    id: 'arr-008',
    topicId: 'arrays',
    type: 'code_trace',
    difficulty: 2,
    content: 'What is the index of the first element in a C array?',
    options: ['0', '1', '-1', 'Undefined'],
    correctAnswer: 0,
    explanation: 'C arrays are 0-indexed. The first element is at index 0, second at index 1, and so on. arr[0] accesses the first element.'
  },
  {
    id: 'arr-009',
    topicId: 'arrays',
    type: 'true_false',
    difficulty: 2,
    content: 'Array names in C are essentially constant pointers to the first element.',
    correctAnswer: 'true',
    explanation: 'An array name decays to a pointer to its first element in most contexts. int arr[5]; makes arr equivalent to &arr[0].'
  },
  {
    id: 'arr-010',
    topicId: 'arrays',
    type: 'mcq',
    difficulty: 3,
    content: 'How is a 2D array arr[3][4] stored in memory?',
    options: [
      'Column by column',
      'Row by row (row-major)',
      'Randomly',
      'Depends on compiler'
    ],
    correctAnswer: 1,
    explanation: 'C uses row-major order: arr[0][0], arr[0][1], arr[0][2], arr[0][3], arr[1][0], ... Elements of each row are contiguous.'
  },
  {
    id: 'arr-011',
    topicId: 'arrays',
    type: 'code_trace',
    difficulty: 3,
    content: 'What is sizeof(arr) for int arr[5]; assuming sizeof(int)=4?',
    options: ['4', '5', '20', 'Undefined'],
    correctAnswer: 2,
    explanation: 'sizeof(arr) returns total bytes: 5 elements × 4 bytes/element = 20 bytes. Note: this only works for actual arrays, not pointers.'
  },
  {
    id: 'arr-012',
    topicId: 'arrays',
    type: 'true_false',
    difficulty: 3,
    content: 'C performs bounds checking on array accesses.',
    correctAnswer: 'false',
    explanation: 'C does not check array bounds. Accessing arr[10] when arr has 5 elements causes undefined behavior (buffer overflow) but no runtime error.'
  },
  {
    id: 'arr-013',
    topicId: 'arrays',
    type: 'mcq',
    difficulty: 4,
    content: 'What is equivalent to arr[i] for a pointer p = arr?',
    options: ['*p[i]', '*(p+i)', '&p[i]', 'p(i)'],
    correctAnswer: 1,
    explanation: 'arr[i] is equivalent to *(arr+i). With p = arr, p[i] or *(p+i) both access the i-th element using pointer arithmetic.'
  },
  {
    id: 'arr-014',
    topicId: 'arrays',
    type: 'code_trace',
    difficulty: 4,
    content: 'How to pass an array to a function that modifies its contents?',
    options: [
      'Pass by value (copy)',
      'Pass the array name (decays to pointer)',
      'Arrays cannot be modified',
      'Use return value'
    ],
    correctAnswer: 1,
    explanation: 'Passing arr to a function passes a pointer to the first element. The function receives the address and can modify the original array.'
  },
  {
    id: 'arr-015',
    topicId: 'arrays',
    type: 'mcq',
    difficulty: 4,
    content: 'What does char str[] = "hello"; allocate?',
    options: [
      '5 bytes',
      '6 bytes (including null terminator)',
      'Unknown at compile time',
      '4 bytes (pointer only)'
    ],
    correctAnswer: 1,
    explanation: 'String literals include a null terminator \\0. "hello" is 6 characters: h, e, l, l, o, \\0. The array size is 6 bytes.'
  },

  // Structures - Additional Questions (8-15)
  {
    id: 'str-008',
    topicId: 'structures',
    type: 'mcq',
    difficulty: 2,
    content: 'How do you access member x of struct s?',
    options: ['s->x', 's.x', 's[x]', '*s.x'],
    correctAnswer: 1,
    explanation: 'The dot operator (.) accesses struct members directly: s.x. Arrow operator (->) is used with struct pointers: ptr->x.'
  },
  {
    id: 'str-009',
    topicId: 'structures',
    type: 'true_false',
    difficulty: 2,
    content: 'Structures can contain other structures as members.',
    correctAnswer: 'true',
    explanation: 'Structs can nest other structs: struct Outer { struct Inner inner; int x; }; This is called composition or aggregation.'
  },
  {
    id: 'str-010',
    topicId: 'structures',
    type: 'code_trace',
    difficulty: 3,
    content: 'Given struct Point *p;, how do you access member x?',
    options: ['p.x', '(*p).x or p->x', '*p.x', 'p[x]'],
    correctAnswer: 1,
    explanation: 'For struct pointers, use -> or dereference first with (*p).x. Arrow operator p->x is shorthand for (*p).x.'
  },
  {
    id: 'str-011',
    topicId: 'structures',
    type: 'mcq',
    difficulty: 3,
    content: 'What is structure padding?',
    options: [
      'Adding extra members',
      'Compiler adding bytes for memory alignment',
      'Encrypting struct data',
      'Compressing struct size'
    ],
    correctAnswer: 1,
    explanation: 'Compilers add padding bytes between members to align them on natural boundaries for the architecture, improving access speed.'
  },
  {
    id: 'str-012',
    topicId: 'structures',
    type: 'true_false',
    difficulty: 3,
    content: 'Structures can be assigned to each other (s1 = s2) in C.',
    correctAnswer: 'true',
    explanation: 'C allows struct assignment, which performs a shallow copy of all members. Arrays inside are copied element by element.'
  },
  {
    id: 'str-013',
    topicId: 'structures',
    type: 'code_trace',
    difficulty: 4,
    content: 'What does typedef struct { int x; } Point; create?',
    options: [
      'A struct variable',
      'An alias "Point" for the anonymous struct type',
      'A pointer type',
      'Syntax error'
    ],
    correctAnswer: 1,
    explanation: 'typedef creates a type alias. Now "Point" can be used instead of "struct { int x; }" to declare variables: Point p;'
  },
  {
    id: 'str-014',
    topicId: 'structures',
    type: 'mcq',
    difficulty: 4,
    content: 'What is a self-referential structure?',
    options: [
      'Struct that copies itself',
      'Struct containing pointer to same struct type',
      'Recursive function using struct',
      'Struct with circular dependencies'
    ],
    correctAnswer: 1,
    explanation: 'Self-referential structs contain pointers to the same type: struct Node { int data; struct Node *next; }; Used for linked lists, trees.'
  },
  {
    id: 'str-015',
    topicId: 'structures',
    type: 'mcq',
    difficulty: 4,
    content: 'What is a union in C compared to a struct?',
    options: [
      'Same as struct',
      'All members share same memory location',
      'Union cannot have members',
      'Union is faster'
    ],
    correctAnswer: 1,
    explanation: 'Union members share memory; only one can hold a value at a time. Size equals largest member. Struct allocates space for all members.'
  },

  // Recursion - Additional Questions (8-15)
  {
    id: 'rec-008',
    topicId: 'recursion',
    type: 'mcq',
    difficulty: 2,
    content: 'What is the base case in recursion?',
    options: [
      'The first recursive call',
      'Condition that stops recursion',
      'The recursive step',
      'The function name'
    ],
    correctAnswer: 1,
    explanation: 'The base case is the condition that terminates recursion without making further recursive calls, preventing infinite recursion.'
  },
  {
    id: 'rec-009',
    topicId: 'recursion',
    type: 'true_false',
    difficulty: 2,
    content: 'Every recursive function can be written iteratively.',
    correctAnswer: 'true',
    explanation: 'Any recursive algorithm can be converted to iteration, often using an explicit stack. Recursion is syntactic convenience, not fundamental capability.'
  },
  {
    id: 'rec-010',
    topicId: 'recursion',
    type: 'code_trace',
    difficulty: 3,
    content: 'What happens if a recursive function has no base case?',
    options: [
      'Returns 0',
      'Stack overflow',
      'Compilation error',
      'Returns immediately'
    ],
    correctAnswer: 1,
    explanation: 'Without a base case, recursion never terminates. Each call adds a stack frame until stack memory is exhausted (stack overflow).'
  },
  {
    id: 'rec-011',
    topicId: 'recursion',
    type: 'code_trace',
    difficulty: 3,
    content: 'For factorial(3), how many function calls are made (including initial)?',
    options: ['2', '3', '4', '6'],
    correctAnswer: 2,
    explanation: 'factorial(3) calls factorial(2), factorial(1), factorial(0) [base case]. Total: 4 calls including the initial factorial(3).'
  },
  {
    id: 'rec-012',
    topicId: 'recursion',
    type: 'mcq',
    difficulty: 3,
    content: 'What is tail recursion?',
    options: [
      'Recursion at the start of function',
      'Recursive call is the last operation',
      'Recursion with multiple calls',
      'Indirect recursion'
    ],
    correctAnswer: 1,
    explanation: 'Tail recursion occurs when the recursive call is the final operation. Compilers can optimize it to iteration (tail call optimization).'
  },
  {
    id: 'rec-013',
    topicId: 'recursion',
    type: 'true_false',
    difficulty: 4,
    content: 'Memoization can improve recursive Fibonacci from O(2^n) to O(n).',
    correctAnswer: 'true',
    explanation: 'Memoization caches results of subproblems. Naive Fibonacci recalculates the same values exponentially; memoization stores each once.'
  },
  {
    id: 'rec-014',
    topicId: 'recursion',
    type: 'code_trace',
    difficulty: 4,
    content: 'What does this print?\nvoid f(int n) {\n  if(n > 0) { f(n-1); printf("%d ", n); }\n}\nf(3);',
    options: ['3 2 1', '1 2 3', '3 2 1 0', '1 2 3 0'],
    correctAnswer: 1,
    explanation: 'Recursive call happens before printf. So f(3) calls f(2), f(2) calls f(1), f(1) calls f(0). Then unwinding: prints 1, 2, 3.'
  },
  {
    id: 'rec-015',
    topicId: 'recursion',
    type: 'mcq',
    difficulty: 4,
    content: 'What is indirect recursion?',
    options: [
      'Function calls itself with different parameters',
      'Function A calls B, B calls A',
      'Nested recursive calls',
      'Recursion using pointers'
    ],
    correctAnswer: 1,
    explanation: 'Indirect recursion involves multiple functions forming a cycle: A calls B, B calls A. Each function doesn\'t directly call itself.'
  },

  // ===== SC2002 Additional Questions =====

  // OOP Introduction - Additional Questions (8-15)
  {
    id: 'oop-008',
    topicId: 'oop-introduction',
    type: 'mcq',
    difficulty: 2,
    content: 'What does OOP stand for?',
    options: [
      'Object-Oriented Programming',
      'Object-Order Processing',
      'Optimal Operation Protocol',
      'Output-Oriented Programming'
    ],
    correctAnswer: 0,
    explanation: 'OOP stands for Object-Oriented Programming, a paradigm based on objects containing data (attributes) and code (methods).'
  },
  {
    id: 'oop-009',
    topicId: 'oop-introduction',
    type: 'true_false',
    difficulty: 2,
    content: 'In OOP, an object is an instance of a class.',
    correctAnswer: 'true',
    explanation: 'A class is a blueprint/template, and an object is a concrete instance created from that class with its own state.'
  },
  {
    id: 'oop-010',
    topicId: 'oop-introduction',
    type: 'mcq',
    difficulty: 3,
    content: 'Which is NOT one of the four main OOP principles?',
    options: ['Encapsulation', 'Compilation', 'Inheritance', 'Polymorphism'],
    correctAnswer: 1,
    explanation: 'The four main OOP principles are Encapsulation, Abstraction, Inheritance, and Polymorphism. Compilation is not an OOP concept.'
  },
  {
    id: 'oop-011',
    topicId: 'oop-introduction',
    type: 'mcq',
    difficulty: 3,
    content: 'What is abstraction in OOP?',
    options: [
      'Hiding implementation details and showing only functionality',
      'Creating multiple copies of objects',
      'Sharing code between classes',
      'Converting objects to strings'
    ],
    correctAnswer: 0,
    explanation: 'Abstraction hides complex implementation details and exposes only relevant features, simplifying interaction with objects.'
  },
  {
    id: 'oop-012',
    topicId: 'oop-introduction',
    type: 'true_false',
    difficulty: 3,
    content: 'Java is a purely object-oriented language with no primitive types.',
    correctAnswer: 'false',
    explanation: 'Java has primitive types (int, boolean, etc.) that are not objects. Wrapper classes (Integer, Boolean) provide object versions.'
  },
  {
    id: 'oop-013',
    topicId: 'oop-introduction',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the relationship between a class and an object?',
    options: [
      'Object defines the class',
      'Class is a blueprint, object is an instance',
      'They are the same thing',
      'Class inherits from object'
    ],
    correctAnswer: 1,
    explanation: 'A class defines structure and behavior (like a blueprint). Objects are instances created from classes with their own attribute values.'
  },
  {
    id: 'oop-014',
    topicId: 'oop-introduction',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the advantage of OOP over procedural programming?',
    options: [
      'Always faster execution',
      'Better code organization, reusability, and maintainability',
      'Uses less memory',
      'Simpler syntax'
    ],
    correctAnswer: 1,
    explanation: 'OOP promotes modularity, code reuse through inheritance, and easier maintenance. It\'s not necessarily faster or simpler than procedural code.'
  },
  {
    id: 'oop-015',
    topicId: 'oop-introduction',
    type: 'true_false',
    difficulty: 4,
    content: 'In Java, all code must be written inside a class.',
    correctAnswer: 'true',
    explanation: 'Java enforces object-oriented structure; all code must be within classes. Even the main() method must be inside a class.'
  },

  // Classes and Objects - Additional Questions (8-15)
  {
    id: 'co-008',
    topicId: 'classes-objects',
    type: 'code_trace',
    difficulty: 2,
    content: 'What keyword creates a new object in Java?',
    options: ['create', 'new', 'make', 'instantiate'],
    correctAnswer: 1,
    explanation: 'The new keyword allocates memory and invokes the constructor: MyClass obj = new MyClass();'
  },
  {
    id: 'co-009',
    topicId: 'classes-objects',
    type: 'true_false',
    difficulty: 2,
    content: 'A class can have multiple constructors with different parameters.',
    correctAnswer: 'true',
    explanation: 'Constructor overloading allows multiple constructors with different parameter lists, providing flexibility in object creation.'
  },
  {
    id: 'co-010',
    topicId: 'classes-objects',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the default constructor?',
    options: [
      'Constructor with parameters',
      'No-argument constructor provided by Java if none defined',
      'Constructor that returns default values',
      'Private constructor'
    ],
    correctAnswer: 1,
    explanation: 'If no constructor is defined, Java provides a default no-argument constructor. It\'s not created if any constructor is explicitly defined.'
  },
  {
    id: 'co-011',
    topicId: 'classes-objects',
    type: 'code_trace',
    difficulty: 3,
    content: 'What does "this" refer to inside a method?',
    options: [
      'The class itself',
      'The current object instance',
      'The parent class',
      'A static reference'
    ],
    correctAnswer: 1,
    explanation: '"this" is a reference to the current object instance, used to access instance members or distinguish from parameters with same names.'
  },
  {
    id: 'co-012',
    topicId: 'classes-objects',
    type: 'true_false',
    difficulty: 3,
    content: 'Static methods can access instance variables directly.',
    correctAnswer: 'false',
    explanation: 'Static methods belong to the class, not instances. They cannot access instance variables directly without an object reference.'
  },
  {
    id: 'co-013',
    topicId: 'classes-objects',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the purpose of a static block in a class?',
    options: [
      'Initialize instance variables',
      'Initialize static variables when class loads',
      'Create static methods',
      'Override constructors'
    ],
    correctAnswer: 1,
    explanation: 'Static initialization blocks run once when the class is loaded, used to initialize static variables with complex logic.'
  },
  {
    id: 'co-014',
    topicId: 'classes-objects',
    type: 'code_trace',
    difficulty: 4,
    content: 'What is object composition?',
    options: [
      'Inheriting from multiple classes',
      'An object containing other objects as members',
      'Objects in an array',
      'Creating objects in constructors'
    ],
    correctAnswer: 1,
    explanation: 'Composition is a "has-a" relationship where a class contains instances of other classes as members (e.g., Car has an Engine).'
  },
  {
    id: 'co-015',
    topicId: 'classes-objects',
    type: 'mcq',
    difficulty: 4,
    content: 'What happens when you assign one object reference to another in Java?',
    options: [
      'Object is copied',
      'Both references point to same object',
      'Compilation error',
      'New object is created'
    ],
    correctAnswer: 1,
    explanation: 'Reference assignment copies the reference, not the object. Both variables now refer to the same object in memory.'
  },

  // Encapsulation - Additional Questions (8-15)
  {
    id: 'enc-008',
    topicId: 'encapsulation',
    type: 'mcq',
    difficulty: 2,
    content: 'Which access modifier makes a member visible only within its class?',
    options: ['public', 'protected', 'private', 'default'],
    correctAnswer: 2,
    explanation: 'private members are accessible only within the declaring class, providing the strictest access control.'
  },
  {
    id: 'enc-009',
    topicId: 'encapsulation',
    type: 'true_false',
    difficulty: 2,
    content: 'Getters and setters are used to implement encapsulation.',
    correctAnswer: 'true',
    explanation: 'Getters and setters (accessor/mutator methods) provide controlled access to private fields, allowing validation and maintaining invariants.'
  },
  {
    id: 'enc-010',
    topicId: 'encapsulation',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the default access modifier in Java (no keyword specified)?',
    options: [
      'public',
      'private',
      'protected',
      'Package-private (accessible within same package)'
    ],
    correctAnswer: 3,
    explanation: 'Without an access modifier, Java uses package-private (default) access: visible to all classes in the same package.'
  },
  {
    id: 'enc-011',
    topicId: 'encapsulation',
    type: 'code_trace',
    difficulty: 3,
    content: 'Why make instance variables private?',
    options: [
      'Faster access',
      'Control how they are accessed/modified',
      'Save memory',
      'Required by Java'
    ],
    correctAnswer: 1,
    explanation: 'Private variables enforce encapsulation: external code must use methods, allowing validation, computed properties, and implementation changes.'
  },
  {
    id: 'enc-012',
    topicId: 'encapsulation',
    type: 'true_false',
    difficulty: 3,
    content: 'Protected members are accessible in subclasses even in different packages.',
    correctAnswer: 'true',
    explanation: 'Protected access allows subclass access regardless of package, plus package-private access within the same package.'
  },
  {
    id: 'enc-013',
    topicId: 'encapsulation',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the principle of least privilege in encapsulation?',
    options: [
      'Always use public access',
      'Grant minimal necessary access',
      'Make all methods static',
      'Avoid using interfaces'
    ],
    correctAnswer: 1,
    explanation: 'Least privilege means giving the minimum access level needed. Start with private and increase only when necessary for proper function.'
  },
  {
    id: 'enc-014',
    topicId: 'encapsulation',
    type: 'mcq',
    difficulty: 4,
    content: 'What is an immutable class?',
    options: [
      'Class with no methods',
      'Class whose instances cannot be modified after creation',
      'Class that cannot be inherited',
      'Class with all static members'
    ],
    correctAnswer: 1,
    explanation: 'Immutable classes (like String) have private final fields, no setters, and return copies of mutable objects. State never changes after construction.'
  },
  {
    id: 'enc-015',
    topicId: 'encapsulation',
    type: 'true_false',
    difficulty: 4,
    content: 'A class can have private constructors.',
    correctAnswer: 'true',
    explanation: 'Private constructors prevent external instantiation, used in singleton pattern, factory methods, or utility classes with only static methods.'
  },

  // Inheritance - Additional Questions (8-15)
  {
    id: 'inh-008',
    topicId: 'inheritance',
    type: 'mcq',
    difficulty: 2,
    content: 'Which keyword is used for inheritance in Java?',
    options: ['inherits', 'implements', 'extends', 'derives'],
    correctAnswer: 2,
    explanation: 'Java uses "extends" for class inheritance: class Child extends Parent { }. "implements" is for interfaces.'
  },
  {
    id: 'inh-009',
    topicId: 'inheritance',
    type: 'true_false',
    difficulty: 2,
    content: 'Java supports multiple inheritance of classes.',
    correctAnswer: 'false',
    explanation: 'Java allows single inheritance only (one parent class) to avoid diamond problem. Multiple inheritance is achieved through interfaces.'
  },
  {
    id: 'inh-010',
    topicId: 'inheritance',
    type: 'mcq',
    difficulty: 3,
    content: 'What does super() call in a constructor?',
    options: [
      'Current class constructor',
      'Parent class constructor',
      'Any superclass method',
      'Object class constructor only'
    ],
    correctAnswer: 1,
    explanation: 'super() invokes the parent class constructor. It must be the first statement in a constructor if used explicitly.'
  },
  {
    id: 'inh-011',
    topicId: 'inheritance',
    type: 'code_trace',
    difficulty: 3,
    content: 'Can a subclass access private members of its superclass?',
    options: [
      'Yes, always',
      'No, never directly',
      'Only with super keyword',
      'Only in same package'
    ],
    correctAnswer: 1,
    explanation: 'Private members are not inherited (not visible to subclasses). Subclasses access them through public/protected methods of the parent.'
  },
  {
    id: 'inh-012',
    topicId: 'inheritance',
    type: 'true_false',
    difficulty: 3,
    content: 'A subclass inherits all non-private members from its superclass.',
    correctAnswer: 'true',
    explanation: 'Subclasses inherit public and protected members. Default (package) members are inherited only if subclass is in the same package.'
  },
  {
    id: 'inh-013',
    topicId: 'inheritance',
    type: 'mcq',
    difficulty: 4,
    content: 'What is method hiding in Java?',
    options: [
      'Making methods private',
      'Static method in subclass with same signature as parent',
      'Removing inherited methods',
      'Using final on methods'
    ],
    correctAnswer: 1,
    explanation: 'When a subclass defines a static method with the same signature as a static method in its parent, the parent\'s method is hidden, not overridden.'
  },
  {
    id: 'inh-014',
    topicId: 'inheritance',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the diamond problem in inheritance?',
    options: [
      'Memory leak in inheritance',
      'Ambiguity when class inherits from two classes with same method',
      'Infinite inheritance chain',
      'Missing constructors'
    ],
    correctAnswer: 1,
    explanation: 'Diamond problem occurs when a class inherits from two classes that have a common ancestor, causing ambiguity. Java avoids this by allowing single inheritance.'
  },
  {
    id: 'inh-015',
    topicId: 'inheritance',
    type: 'true_false',
    difficulty: 4,
    content: 'Constructor chaining refers to calling one constructor from another.',
    correctAnswer: 'true',
    explanation: 'Constructor chaining uses this() to call another constructor in same class or super() to call parent constructor, avoiding code duplication.'
  },

  // Polymorphism - Additional Questions (8-15)
  {
    id: 'poly-008',
    topicId: 'polymorphism',
    type: 'mcq',
    difficulty: 2,
    content: 'What type of polymorphism is method overloading?',
    options: [
      'Runtime polymorphism',
      'Compile-time (static) polymorphism',
      'Both types',
      'Neither type'
    ],
    correctAnswer: 1,
    explanation: 'Method overloading is compile-time polymorphism; the compiler determines which method to call based on argument types at compile time.'
  },
  {
    id: 'poly-009',
    topicId: 'polymorphism',
    type: 'true_false',
    difficulty: 2,
    content: 'Method overriding requires the same method signature in parent and child classes.',
    correctAnswer: 'true',
    explanation: 'Overriding requires identical method name, return type (or covariant), and parameters. Otherwise, it\'s overloading or a new method.'
  },
  {
    id: 'poly-010',
    topicId: 'polymorphism',
    type: 'code_trace',
    difficulty: 3,
    content: 'Animal a = new Dog(); a.makeSound(); - Which makeSound() is called?',
    options: [
      'Animal\'s makeSound()',
      'Dog\'s makeSound()',
      'Compilation error',
      'Runtime error'
    ],
    correctAnswer: 1,
    explanation: 'Dynamic dispatch calls the actual object\'s method (Dog\'s), not the reference type\'s. This is runtime polymorphism.'
  },
  {
    id: 'poly-011',
    topicId: 'polymorphism',
    type: 'mcq',
    difficulty: 3,
    content: 'What annotation should precede an overriding method?',
    options: ['@Override', '@Overload', '@Replace', '@Inherit'],
    correctAnswer: 0,
    explanation: '@Override annotation helps catch errors - compiler verifies the method actually overrides a parent method, not accidentally overloads.'
  },
  {
    id: 'poly-012',
    topicId: 'polymorphism',
    type: 'true_false',
    difficulty: 3,
    content: 'Static methods cannot be overridden in Java.',
    correctAnswer: 'true',
    explanation: 'Static methods are bound at compile time and belong to the class, not instances. They can be hidden by subclass static methods but not overridden.'
  },
  {
    id: 'poly-013',
    topicId: 'polymorphism',
    type: 'mcq',
    difficulty: 4,
    content: 'What is covariant return type?',
    options: [
      'Returning void',
      'Overriding method returns a subtype of parent\'s return type',
      'Returning primitive types only',
      'Using generics in return type'
    ],
    correctAnswer: 1,
    explanation: 'Covariant return allows an overriding method to return a more specific type (subclass) than the parent method\'s return type.'
  },
  {
    id: 'poly-014',
    topicId: 'polymorphism',
    type: 'code_trace',
    difficulty: 4,
    content: 'Can an overriding method have weaker access than the parent method?',
    options: [
      'Yes, always',
      'No, must be same or broader',
      'Only for protected methods',
      'Only for abstract methods'
    ],
    correctAnswer: 1,
    explanation: 'Overriding methods must have equal or broader access. public can\'t become protected/private. This preserves the parent\'s interface contract.'
  },
  {
    id: 'poly-015',
    topicId: 'polymorphism',
    type: 'mcq',
    difficulty: 4,
    content: 'What is the instanceof operator used for?',
    options: [
      'Create new instances',
      'Check if object is of a specific type',
      'Compare two objects',
      'Get object\'s class name'
    ],
    correctAnswer: 1,
    explanation: 'instanceof checks if an object is an instance of a class or implements an interface. Returns boolean. Used before casting to avoid ClassCastException.'
  },

  // Abstract Classes - Additional Questions (8-15)
  {
    id: 'abs-008',
    topicId: 'abstract-classes',
    type: 'mcq',
    difficulty: 2,
    content: 'Can you create an instance of an abstract class?',
    options: [
      'Yes, always',
      'No, never',
      'Only if it has a constructor',
      'Only in subclasses'
    ],
    correctAnswer: 1,
    explanation: 'Abstract classes cannot be instantiated directly. They must be extended by a concrete class that implements all abstract methods.'
  },
  {
    id: 'abs-009',
    topicId: 'abstract-classes',
    type: 'true_false',
    difficulty: 2,
    content: 'An abstract class can have both abstract and concrete methods.',
    correctAnswer: 'true',
    explanation: 'Abstract classes can mix abstract methods (no implementation) with concrete methods (with implementation), unlike interfaces (pre-Java 8).'
  },
  {
    id: 'abs-010',
    topicId: 'abstract-classes',
    type: 'mcq',
    difficulty: 3,
    content: 'What happens if a subclass doesn\'t implement all abstract methods?',
    options: [
      'Compilation error unless subclass is also abstract',
      'Runtime error',
      'Methods return null',
      'Nothing, optional implementation'
    ],
    correctAnswer: 0,
    explanation: 'A concrete subclass must implement all abstract methods. If it doesn\'t implement all, the subclass must also be declared abstract.'
  },
  {
    id: 'abs-011',
    topicId: 'abstract-classes',
    type: 'code_trace',
    difficulty: 3,
    content: 'Can an abstract class have a constructor?',
    options: [
      'No, constructors need instances',
      'Yes, called by subclass constructors',
      'Only static constructors',
      'Only no-arg constructors'
    ],
    correctAnswer: 1,
    explanation: 'Abstract classes can have constructors that initialize common state. They\'re called via super() from subclass constructors.'
  },
  {
    id: 'abs-012',
    topicId: 'abstract-classes',
    type: 'true_false',
    difficulty: 3,
    content: 'An interface can extend multiple interfaces in Java.',
    correctAnswer: 'true',
    explanation: 'While classes support single inheritance, interfaces can extend multiple interfaces, allowing for complex type hierarchies.'
  },
  {
    id: 'abs-013',
    topicId: 'abstract-classes',
    type: 'mcq',
    difficulty: 4,
    content: 'When should you use an abstract class over an interface?',
    options: [
      'When you need multiple inheritance',
      'When you want to share code among related classes',
      'When you only need method signatures',
      'Always prefer interfaces'
    ],
    correctAnswer: 1,
    explanation: 'Use abstract class when classes share common code/state. Interfaces are for unrelated classes sharing behavior (contract). Abstract classes allow protected members and constructors.'
  },
  {
    id: 'abs-014',
    topicId: 'abstract-classes',
    type: 'mcq',
    difficulty: 4,
    content: 'What are default methods in interfaces (Java 8+)?',
    options: [
      'Methods with default access',
      'Methods with implementation in interface',
      'Methods that return default values',
      'Private interface methods'
    ],
    correctAnswer: 1,
    explanation: 'Default methods (using default keyword) provide implementation in interfaces, allowing interface evolution without breaking implementing classes.'
  },
  {
    id: 'abs-015',
    topicId: 'abstract-classes',
    type: 'true_false',
    difficulty: 4,
    content: 'An abstract class can implement an interface without implementing all its methods.',
    correctAnswer: 'true',
    explanation: 'Abstract classes can partially implement interfaces, leaving unimplemented methods abstract for concrete subclasses to implement.'
  },

  // Exception Handling - Additional Questions (8-15)
  {
    id: 'exc-008',
    topicId: 'exception-handling',
    type: 'mcq',
    difficulty: 2,
    content: 'Which block always executes regardless of whether an exception occurs?',
    options: ['try', 'catch', 'finally', 'throw'],
    correctAnswer: 2,
    explanation: 'finally block executes whether or not an exception occurs, typically used for cleanup like closing resources.'
  },
  {
    id: 'exc-009',
    topicId: 'exception-handling',
    type: 'true_false',
    difficulty: 2,
    content: 'NullPointerException is a checked exception.',
    correctAnswer: 'false',
    explanation: 'NullPointerException extends RuntimeException, making it unchecked. Unchecked exceptions don\'t require explicit handling or declaration.'
  },
  {
    id: 'exc-010',
    topicId: 'exception-handling',
    type: 'mcq',
    difficulty: 3,
    content: 'What is the difference between throw and throws?',
    options: [
      'Same usage, different spelling',
      'throw raises exception, throws declares method may throw',
      'throws raises exception, throw declares',
      'throw is for checked, throws for unchecked'
    ],
    correctAnswer: 1,
    explanation: 'throw is used to actually throw an exception object. throws is used in method signature to declare which checked exceptions the method might throw.'
  },
  {
    id: 'exc-011',
    topicId: 'exception-handling',
    type: 'code_trace',
    difficulty: 3,
    content: 'What happens if a catch block also throws an exception?',
    options: [
      'It\'s caught by the same try-catch',
      'It propagates up the call stack',
      'Program terminates immediately',
      'Compilation error'
    ],
    correctAnswer: 1,
    explanation: 'An exception thrown in a catch block propagates up to the caller, unless there\'s another enclosing try-catch that handles it.'
  },
  {
    id: 'exc-012',
    topicId: 'exception-handling',
    type: 'true_false',
    difficulty: 3,
    content: 'You can catch multiple exceptions in a single catch block using | operator.',
    correctAnswer: 'true',
    explanation: 'Java 7+ allows multi-catch: catch(IOException | SQLException e) { }. Exceptions must be unrelated (not subclass of each other).'
  },
  {
    id: 'exc-013',
    topicId: 'exception-handling',
    type: 'mcq',
    difficulty: 4,
    content: 'What is try-with-resources?',
    options: [
      'Try block with limited resources',
      'Automatic resource management closing resources after try',
      'Exception for resource errors',
      'Try block inside another try'
    ],
    correctAnswer: 1,
    explanation: 'Try-with-resources (Java 7+) automatically closes resources implementing AutoCloseable when the try block exits, even if exception occurs.'
  },
  {
    id: 'exc-014',
    topicId: 'exception-handling',
    type: 'mcq',
    difficulty: 4,
    content: 'When creating custom exceptions, which class should you extend?',
    options: [
      'Error for all exceptions',
      'Exception for checked, RuntimeException for unchecked',
      'Throwable for all exceptions',
      'Object with error message'
    ],
    correctAnswer: 1,
    explanation: 'Extend Exception for checked exceptions (must be handled). Extend RuntimeException for unchecked exceptions (handling optional).'
  },
  {
    id: 'exc-015',
    topicId: 'exception-handling',
    type: 'true_false',
    difficulty: 4,
    content: 'The finally block executes even if a return statement is in the try block.',
    correctAnswer: 'true',
    explanation: 'finally executes before the method returns, even with a return in try. Only System.exit() or JVM crash prevents finally from running.'
  },

  // ===== NEW QUESTION TYPES =====

  // Drag & Drop Questions - Ordering/Sequencing
  {
    id: 'dd-001',
    topicId: 'linked-lists',
    type: 'drag_drop',
    difficulty: 2,
    content: 'Arrange the steps to insert a node at the beginning of a singly linked list in the correct order:',
    dragItems: [
      'Create a new node with the data',
      'Set new node\'s next pointer to current head',
      'Update head to point to new node',
      'Return or update the list'
    ],
    correctOrder: [0, 1, 2, 3],
    correctAnswer: 0,
    explanation: 'To insert at the beginning: first create the node, then link it to the current head, then update head to the new node. The order matters to avoid losing the reference to the rest of the list.'
  },
  {
    id: 'dd-002',
    topicId: 'stacks',
    type: 'drag_drop',
    difficulty: 2,
    content: 'Order these operations to evaluate the postfix expression "3 4 + 2 *" using a stack:',
    dragItems: [
      'Push 3 onto stack',
      'Push 4 onto stack',
      'Pop 4 and 3, push 7 (3+4)',
      'Push 2 onto stack',
      'Pop 2 and 7, push 14 (7*2)'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    correctAnswer: 0,
    explanation: 'Postfix evaluation: push operands, when operator is encountered pop two operands, apply operator, push result. Final answer is 14.'
  },
  {
    id: 'dd-003',
    topicId: 'avl-trees',
    type: 'drag_drop',
    difficulty: 3,
    content: 'Order the steps to perform a Left-Right (LR) rotation in an AVL tree:',
    dragItems: [
      'Identify the unbalanced node (balance factor > 1)',
      'Perform left rotation on the left child',
      'Perform right rotation on the unbalanced node',
      'Update heights of affected nodes'
    ],
    correctOrder: [0, 1, 2, 3],
    correctAnswer: 0,
    explanation: 'LR rotation is a double rotation: first left rotate the left subtree to convert it to LL case, then right rotate the unbalanced node to restore balance.'
  },
  {
    id: 'dd-004',
    topicId: 'c-basics',
    type: 'drag_drop',
    difficulty: 2,
    content: 'Arrange the C compilation stages in the correct order:',
    dragItems: [
      'Preprocessing (#include, #define)',
      'Compilation (C to assembly)',
      'Assembly (assembly to object code)',
      'Linking (combine object files)'
    ],
    correctOrder: [0, 1, 2, 3],
    correctAnswer: 0,
    explanation: 'C compilation: preprocessor handles directives, compiler generates assembly, assembler creates object files, linker combines everything into executable.'
  },
  {
    id: 'dd-005',
    topicId: 'polymorphism',
    type: 'drag_drop',
    difficulty: 2,
    content: 'Order the method resolution steps when calling an overridden method on a subclass object:',
    dragItems: [
      'Check the runtime type of the object',
      'Look for the method in the runtime class',
      'If not found, search parent classes',
      'Execute the most specific implementation'
    ],
    correctOrder: [0, 1, 2, 3],
    correctAnswer: 0,
    explanation: 'Dynamic dispatch: JVM checks actual object type at runtime, finds most specific method implementation in class hierarchy, then executes it.'
  },

  // Matching Questions
  {
    id: 'match-001',
    topicId: 'linked-lists',
    type: 'matching',
    difficulty: 2,
    content: 'Match each linked list operation with its time complexity:',
    matchingPairs: [
      { left: 'Insert at head', right: 'O(1)' },
      { left: 'Insert at tail (no tail pointer)', right: 'O(n)' },
      { left: 'Search for element', right: 'O(n)' },
      { left: 'Delete at head', right: 'O(1)' }
    ],
    correctAnswer: 0,
    explanation: 'Head operations are O(1) as we have direct access. Without a tail pointer, reaching the end requires traversal. Search always requires traversal in worst case.'
  },
  {
    id: 'match-002',
    topicId: 'binary-search-trees',
    type: 'matching',
    difficulty: 2,
    content: 'Match each BST traversal with its visit order:',
    matchingPairs: [
      { left: 'Inorder', right: 'Left, Root, Right' },
      { left: 'Preorder', right: 'Root, Left, Right' },
      { left: 'Postorder', right: 'Left, Right, Root' },
      { left: 'Level order', right: 'Breadth-first (queue)' }
    ],
    correctAnswer: 0,
    explanation: 'Inorder gives sorted output for BST. Preorder is useful for copying trees. Postorder is useful for deletion. Level order uses a queue for BFS.'
  },
  {
    id: 'match-003',
    topicId: 'pointers',
    type: 'matching',
    difficulty: 3,
    content: 'Match each pointer operation with its meaning:',
    matchingPairs: [
      { left: 'int *p', right: 'Declare pointer to int' },
      { left: '*p', right: 'Dereference (get value)' },
      { left: '&x', right: 'Address-of operator' },
      { left: 'p++', right: 'Move to next memory location' }
    ],
    correctAnswer: 0,
    explanation: 'Pointers store addresses. * in declaration means pointer type, * elsewhere means dereference. & gets address. Pointer arithmetic moves by element size.'
  },
  {
    id: 'match-004',
    topicId: 'oop-introduction',
    type: 'matching',
    difficulty: 2,
    content: 'Match each OOP concept with its description:',
    matchingPairs: [
      { left: 'Encapsulation', right: 'Bundling data with methods' },
      { left: 'Inheritance', right: 'Deriving from parent class' },
      { left: 'Polymorphism', right: 'Same interface, different behavior' },
      { left: 'Abstraction', right: 'Hiding implementation details' }
    ],
    correctAnswer: 0,
    explanation: 'Four pillars of OOP: encapsulation protects data, inheritance enables reuse, polymorphism allows flexibility, abstraction manages complexity.'
  },
  {
    id: 'match-005',
    topicId: 'hash-tables',
    type: 'matching',
    difficulty: 3,
    content: 'Match each collision resolution technique with its characteristic:',
    matchingPairs: [
      { left: 'Chaining', right: 'Uses linked lists at each slot' },
      { left: 'Linear probing', right: 'Check next consecutive slot' },
      { left: 'Quadratic probing', right: 'Check slots at i² distance' },
      { left: 'Double hashing', right: 'Uses second hash function' }
    ],
    correctAnswer: 0,
    explanation: 'Chaining stores collisions in lists. Open addressing (probing) finds alternative slots. Linear can cause clustering, quadratic and double hashing reduce it.'
  },

  // Code Execution Questions
  {
    id: 'code-001',
    topicId: 'c-basics',
    type: 'code_execution',
    difficulty: 2,
    content: 'Write a C function that returns the sum of two integers. The function should be named "add" and take two int parameters.',
    language: 'c',
    starterCode: `#include <stdio.h>

// Write your add function here


int main() {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d", add(a, b));
    return 0;
}`,
    testCases: [
      { input: '3 5', expectedOutput: '8' },
      { input: '-2 7', expectedOutput: '5' },
      { input: '0 0', expectedOutput: '0' }
    ],
    correctAnswer: 0,
    explanation: 'A simple function that takes two integers and returns their sum. Remember to declare the return type and parameters correctly in C.'
  },
  {
    id: 'code-002',
    topicId: 'c-basics',
    type: 'code_execution',
    difficulty: 3,
    content: 'Write a C function "factorial" that calculates the factorial of a non-negative integer using recursion.',
    language: 'c',
    starterCode: `#include <stdio.h>

// Write your factorial function here


int main() {
    int n;
    scanf("%d", &n);
    printf("%d", factorial(n));
    return 0;
}`,
    testCases: [
      { input: '5', expectedOutput: '120' },
      { input: '0', expectedOutput: '1' },
      { input: '3', expectedOutput: '6' }
    ],
    correctAnswer: 0,
    explanation: 'Recursive factorial: base case is 0! = 1, recursive case is n! = n * (n-1)!. Remember to handle the base case to prevent infinite recursion.'
  },
  {
    id: 'code-003',
    topicId: 'classes-objects',
    type: 'code_execution',
    difficulty: 3,
    content: 'Complete the C++ class "Rectangle" with a constructor that takes width and height, and a method "area" that returns the area.',
    language: 'cpp',
    starterCode: `#include <iostream>
using namespace std;

class Rectangle {
private:
    int width, height;
public:
    // Write constructor and area method here

};

int main() {
    int w, h;
    cin >> w >> h;
    Rectangle r(w, h);
    cout << r.area();
    return 0;
}`,
    testCases: [
      { input: '5 3', expectedOutput: '15' },
      { input: '10 10', expectedOutput: '100' },
      { input: '7 2', expectedOutput: '14' }
    ],
    correctAnswer: 0,
    explanation: 'A class needs a constructor to initialize member variables and methods to operate on them. The area of a rectangle is width * height.'
  },
  {
    id: 'code-004',
    topicId: 'classes-objects',
    type: 'code_execution',
    difficulty: 2,
    content: 'Write a Java method "isEven" that returns true if the input number is even, false otherwise.',
    language: 'java',
    starterCode: `import java.util.Scanner;

public class Main {
    // Write your isEven method here


    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isEven(n));
    }
}`,
    testCases: [
      { input: '4', expectedOutput: 'true' },
      { input: '7', expectedOutput: 'false' },
      { input: '0', expectedOutput: 'true' }
    ],
    correctAnswer: 0,
    explanation: 'Use the modulo operator (%) to check if a number is divisible by 2. If n % 2 == 0, the number is even.'
  },
  {
    id: 'code-005',
    topicId: 'pointers',
    type: 'code_execution',
    difficulty: 3,
    content: 'Write a C function "swap" that swaps two integers using pointers. The function should take two int pointers.',
    language: 'c',
    starterCode: `#include <stdio.h>

// Write your swap function using pointers


int main() {
    int a, b;
    scanf("%d %d", &a, &b);
    swap(&a, &b);
    printf("%d %d", a, b);
    return 0;
}`,
    testCases: [
      { input: '5 10', expectedOutput: '10 5' },
      { input: '1 2', expectedOutput: '2 1' },
      { input: '-3 7', expectedOutput: '7 -3' }
    ],
    correctAnswer: 0,
    explanation: 'To modify variables in the caller, pass pointers. Dereference to access values: int temp = *a; *a = *b; *b = temp;'
  },
  {
    id: 'code-006',
    topicId: 'memory-management',
    type: 'code_execution',
    difficulty: 2,
    content: 'Write a Python function "reverse_string" that returns the reversed version of the input string.',
    language: 'python',
    starterCode: `def reverse_string(s):
    # Write your code here
    pass

s = input()
print(reverse_string(s))`,
    testCases: [
      { input: 'hello', expectedOutput: 'olleh' },
      { input: 'Python', expectedOutput: 'nohtyP' },
      { input: 'a', expectedOutput: 'a' }
    ],
    correctAnswer: 0,
    explanation: 'Python strings can be reversed using slicing: s[::-1], or by using reversed() with join, or iterating backwards.'
  },

  // ============================================
  // SC1007 - Data Structures (Python)
  // ============================================

  // Memory Management - code_execution questions
  {
    id: 'code-memory-management-1',
    topicId: 'memory-management',
    type: 'code_execution',
    difficulty: 2,
    content: 'Write a Python function "count_references" that takes a list and returns the reference count of the list object using sys.getrefcount(). Note: getrefcount returns count + 1 due to the function call itself.',
    language: 'python',
    starterCode: `import sys

def count_references(lst):
    # Write your code here
    pass

# Test
my_list = [1, 2, 3]
print(count_references(my_list))`,
    testCases: [
      { input: '', expectedOutput: '3' },
    ],
    correctAnswer: 0,
    explanation: 'sys.getrefcount() returns the reference count of an object. The count includes the reference from the function argument itself, so it appears one higher than expected.'
  },
  {
    id: 'code-memory-management-2',
    topicId: 'memory-management',
    type: 'code_execution',
    difficulty: 3,
    content: 'Write a Python function "create_circular_reference" that creates two objects with circular references and returns True if garbage collection finds and collects them. Use gc module.',
    language: 'python',
    starterCode: `import gc

def create_circular_reference():
    # Create two lists that reference each other
    # Run garbage collection and return True if it collected objects
    pass

gc.disable()  # Disable automatic gc for testing
result = create_circular_reference()
print(result)`,
    testCases: [
      { input: '', expectedOutput: 'True' },
    ],
    correctAnswer: 0,
    explanation: 'Circular references occur when objects reference each other. Python\'s gc.collect() can detect and free these cycles. Create lists like a = []; b = [a]; a.append(b), then delete and collect.'
  },
  {
    id: 'code-memory-management-3',
    topicId: 'memory-management',
    type: 'code_execution',
    difficulty: 3,
    content: 'Write a Python function "deep_copy_list" that creates a deep copy of a nested list without using the copy module. Modifying the copy should not affect the original.',
    language: 'python',
    starterCode: `def deep_copy_list(lst):
    # Write your code here - create a true deep copy
    pass

original = [[1, 2], [3, 4]]
copied = deep_copy_list(original)
copied[0][0] = 999
print(original[0][0])`,
    testCases: [
      { input: '', expectedOutput: '1' },
    ],
    correctAnswer: 0,
    explanation: 'A deep copy recursively copies all nested objects. Use recursion: if element is a list, recursively deep copy it; otherwise, copy the value directly.'
  },

  // Linked Lists - code_execution questions
  {
    id: 'code-linked-lists-1',
    topicId: 'linked-lists',
    type: 'code_execution',
    difficulty: 2,
    content: 'Implement a singly linked list and write a function to insert a value at the front. Print all values separated by spaces.',
    language: 'python',
    starterCode: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def insert_front(self, data):
        # Write your code here
        pass

    def print_list(self):
        current = self.head
        result = []
        while current:
            result.append(str(current.data))
            current = current.next
        print(' '.join(result))

ll = LinkedList()
values = list(map(int, input().split()))
for v in values:
    ll.insert_front(v)
ll.print_list()`,
    testCases: [
      { input: '1 2 3', expectedOutput: '3 2 1' },
      { input: '5 10 15 20', expectedOutput: '20 15 10 5' },
      { input: '42', expectedOutput: '42' }
    ],
    correctAnswer: 0,
    explanation: 'To insert at front: create new node, set new node\'s next to current head, update head to new node. This is O(1) operation.'
  },
  {
    id: 'code-linked-lists-2',
    topicId: 'linked-lists',
    type: 'code_execution',
    difficulty: 3,
    content: 'Write a function to reverse a singly linked list iteratively. Print the reversed list.',
    language: 'python',
    starterCode: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        if not self.head:
            self.head = Node(data)
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = Node(data)

    def reverse(self):
        # Write your code here
        pass

    def print_list(self):
        current = self.head
        result = []
        while current:
            result.append(str(current.data))
            current = current.next
        print(' '.join(result))

ll = LinkedList()
values = list(map(int, input().split()))
for v in values:
    ll.append(v)
ll.reverse()
ll.print_list()`,
    testCases: [
      { input: '1 2 3 4 5', expectedOutput: '5 4 3 2 1' },
      { input: '10 20', expectedOutput: '20 10' },
      { input: '7', expectedOutput: '7' }
    ],
    correctAnswer: 0,
    explanation: 'Reverse iteratively using three pointers: prev, current, next. In each step: save next, point current.next to prev, move prev and current forward.'
  },
  {
    id: 'code-linked-lists-3',
    topicId: 'linked-lists',
    type: 'code_execution',
    difficulty: 3,
    content: 'Write a function to detect if a linked list has a cycle using Floyd\'s cycle detection algorithm. Return True if cycle exists, False otherwise.',
    language: 'python',
    starterCode: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def has_cycle(head):
    # Implement Floyd's tortoise and hare algorithm
    pass

# Test without cycle
node1 = Node(1)
node2 = Node(2)
node3 = Node(3)
node1.next = node2
node2.next = node3
print(has_cycle(node1))

# Test with cycle
node3.next = node1
print(has_cycle(node1))`,
    testCases: [
      { input: '', expectedOutput: 'False\nTrue' },
    ],
    correctAnswer: 0,
    explanation: 'Floyd\'s algorithm uses two pointers: slow moves 1 step, fast moves 2 steps. If they meet, there\'s a cycle. If fast reaches None, no cycle exists.'
  },

  // Stacks - code_execution questions
  {
    id: 'code-stacks-1',
    topicId: 'stacks',
    type: 'code_execution',
    difficulty: 2,
    content: 'Implement a Stack class with push, pop, and is_empty methods using a Python list. Process a series of operations.',
    language: 'python',
    starterCode: `class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        # Write your code here
        pass

    def pop(self):
        # Write your code here - return None if empty
        pass

    def is_empty(self):
        # Write your code here
        pass

stack = Stack()
operations = input().split(',')
for op in operations:
    if op.startswith('push'):
        val = int(op.split()[1])
        stack.push(val)
    elif op == 'pop':
        result = stack.pop()
        if result is not None:
            print(result)`,
    testCases: [
      { input: 'push 1,push 2,push 3,pop,pop', expectedOutput: '3\n2' },
      { input: 'push 10,push 20,pop,push 30,pop,pop', expectedOutput: '20\n30\n10' },
      { input: 'push 5,pop,pop', expectedOutput: '5' }
    ],
    correctAnswer: 0,
    explanation: 'Stack follows LIFO (Last In First Out). Push adds to end, pop removes from end. Use list append() for push and pop() for removal.'
  },
  {
    id: 'code-stacks-2',
    topicId: 'stacks',
    type: 'code_execution',
    difficulty: 3,
    content: 'Write a function to check if parentheses in a string are balanced using a stack. Handle (), [], and {}.',
    language: 'python',
    starterCode: `def is_balanced(s):
    # Use a stack to check if brackets are balanced
    pass

expr = input()
print(is_balanced(expr))`,
    testCases: [
      { input: '([{}])', expectedOutput: 'True' },
      { input: '([)]', expectedOutput: 'False' },
      { input: '{[()]}', expectedOutput: 'True' },
      { input: '((()))', expectedOutput: 'True' }
    ],
    correctAnswer: 0,
    explanation: 'Push opening brackets onto stack. For closing brackets, check if stack top has matching opening bracket. String is balanced if stack is empty at end.'
  },
  {
    id: 'code-stacks-3',
    topicId: 'stacks',
    type: 'code_execution',
    difficulty: 4,
    content: 'Implement a function to evaluate a postfix expression using a stack. Operators are +, -, *, /. Numbers are single digits.',
    language: 'python',
    starterCode: `def evaluate_postfix(expression):
    # Evaluate postfix expression using stack
    pass

expr = input()
print(evaluate_postfix(expr))`,
    testCases: [
      { input: '2 3 +', expectedOutput: '5' },
      { input: '5 1 2 + 4 * + 3 -', expectedOutput: '14' },
      { input: '2 3 * 5 4 * +', expectedOutput: '26' }
    ],
    correctAnswer: 0,
    explanation: 'For postfix evaluation: push numbers onto stack. When operator is found, pop two operands, apply operator, push result back. Final result is on top.'
  },

  // Queues - code_execution questions
  {
    id: 'code-queues-1',
    topicId: 'queues',
    type: 'code_execution',
    difficulty: 2,
    content: 'Implement a Queue class with enqueue, dequeue, and is_empty methods. Process a series of operations.',
    language: 'python',
    starterCode: `class Queue:
    def __init__(self):
        self.items = []

    def enqueue(self, item):
        # Write your code here
        pass

    def dequeue(self):
        # Write your code here - return None if empty
        pass

    def is_empty(self):
        # Write your code here
        pass

queue = Queue()
operations = input().split(',')
for op in operations:
    if op.startswith('enqueue'):
        val = int(op.split()[1])
        queue.enqueue(val)
    elif op == 'dequeue':
        result = queue.dequeue()
        if result is not None:
            print(result)`,
    testCases: [
      { input: 'enqueue 1,enqueue 2,enqueue 3,dequeue,dequeue', expectedOutput: '1\n2' },
      { input: 'enqueue 10,dequeue,enqueue 20,enqueue 30,dequeue', expectedOutput: '10\n20' },
      { input: 'enqueue 5,enqueue 6,dequeue,dequeue,dequeue', expectedOutput: '5\n6' }
    ],
    correctAnswer: 0,
    explanation: 'Queue follows FIFO (First In First Out). Enqueue adds to rear, dequeue removes from front. Use append() to add, pop(0) to remove from front.'
  },
  {
    id: 'code-queues-2',
    topicId: 'queues',
    type: 'code_execution',
    difficulty: 3,
    content: 'Implement a circular queue with fixed size. It should wrap around when reaching the end of the array.',
    language: 'python',
    starterCode: `class CircularQueue:
    def __init__(self, size):
        self.size = size
        self.queue = [None] * size
        self.front = -1
        self.rear = -1

    def enqueue(self, item):
        # Write your code here - return False if full
        pass

    def dequeue(self):
        # Write your code here - return None if empty
        pass

    def is_full(self):
        return (self.rear + 1) % self.size == self.front

    def is_empty(self):
        return self.front == -1

cq = CircularQueue(3)
operations = input().split(',')
for op in operations:
    if op.startswith('enqueue'):
        val = int(op.split()[1])
        if cq.enqueue(val):
            print(f'Added {val}')
        else:
            print('Full')
    elif op == 'dequeue':
        result = cq.dequeue()
        if result is not None:
            print(f'Removed {result}')
        else:
            print('Empty')`,
    testCases: [
      { input: 'enqueue 1,enqueue 2,enqueue 3,enqueue 4,dequeue,enqueue 4', expectedOutput: 'Added 1\nAdded 2\nAdded 3\nFull\nRemoved 1\nAdded 4' },
      { input: 'dequeue,enqueue 5,dequeue,dequeue', expectedOutput: 'Empty\nAdded 5\nRemoved 5\nEmpty' }
    ],
    correctAnswer: 0,
    explanation: 'Circular queue uses modular arithmetic to wrap indices. Enqueue: rear = (rear + 1) % size. Dequeue: front = (front + 1) % size. Handle empty/full conditions.'
  },
  {
    id: 'code-queues-3',
    topicId: 'queues',
    type: 'code_execution',
    difficulty: 3,
    content: 'Implement a queue using two stacks. The queue should support enqueue and dequeue operations.',
    language: 'python',
    starterCode: `class QueueUsingStacks:
    def __init__(self):
        self.stack1 = []  # For enqueue
        self.stack2 = []  # For dequeue

    def enqueue(self, item):
        # Write your code here
        pass

    def dequeue(self):
        # Write your code here - return None if empty
        pass

q = QueueUsingStacks()
operations = input().split(',')
for op in operations:
    if op.startswith('enqueue'):
        val = int(op.split()[1])
        q.enqueue(val)
    elif op == 'dequeue':
        result = q.dequeue()
        if result is not None:
            print(result)`,
    testCases: [
      { input: 'enqueue 1,enqueue 2,enqueue 3,dequeue,dequeue', expectedOutput: '1\n2' },
      { input: 'enqueue 5,dequeue,enqueue 10,enqueue 15,dequeue,dequeue', expectedOutput: '5\n10\n15' }
    ],
    correctAnswer: 0,
    explanation: 'Push to stack1 for enqueue. For dequeue, if stack2 empty, transfer all from stack1 to stack2 (reverses order), then pop from stack2.'
  },

  // Binary Trees - code_execution questions
  {
    id: 'code-binary-trees-1',
    topicId: 'binary-trees',
    type: 'code_execution',
    difficulty: 2,
    content: 'Implement a binary tree and write a function for inorder traversal. Print nodes space-separated.',
    language: 'python',
    starterCode: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def inorder_traversal(root):
    # Write your code here - return list of values
    pass

# Build tree:     1
#                / \\
#               2   3
#              / \\
#             4   5
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)

result = inorder_traversal(root)
print(' '.join(map(str, result)))`,
    testCases: [
      { input: '', expectedOutput: '4 2 5 1 3' },
    ],
    correctAnswer: 0,
    explanation: 'Inorder traversal visits left subtree, then root, then right subtree. Recursive approach: inorder(left), visit root, inorder(right).'
  },
  {
    id: 'code-binary-trees-2',
    topicId: 'binary-trees',
    type: 'code_execution',
    difficulty: 3,
    content: 'Write a function to calculate the height of a binary tree. Height is the number of edges on the longest path from root to leaf.',
    language: 'python',
    starterCode: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def tree_height(root):
    # Write your code here
    pass

# Build tree:     1
#                / \\
#               2   3
#              /
#             4
#            /
#           5
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.left.left = TreeNode(5)

print(tree_height(root))`,
    testCases: [
      { input: '', expectedOutput: '4' },
    ],
    correctAnswer: 0,
    explanation: 'Height is max depth from root to leaf. Recursively: height = 1 + max(height(left), height(right)). Base case: empty tree has height -1 or 0 depending on definition.'
  },
  {
    id: 'code-binary-trees-3',
    topicId: 'binary-trees',
    type: 'code_execution',
    difficulty: 3,
    content: 'Write a function for level-order (BFS) traversal of a binary tree. Print each level on a new line.',
    language: 'python',
    starterCode: `from collections import deque

class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def level_order(root):
    # Write your code here - print each level on new line
    pass

# Build tree:     1
#                / \\
#               2   3
#              / \\ / \\
#             4  5 6  7
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)
root.right.left = TreeNode(6)
root.right.right = TreeNode(7)

level_order(root)`,
    testCases: [
      { input: '', expectedOutput: '1\n2 3\n4 5 6 7' },
    ],
    correctAnswer: 0,
    explanation: 'Use a queue for BFS. Process nodes level by level. Track level size to know when to start new line. Enqueue children of each processed node.'
  },

  // Binary Search Trees - code_execution questions
  {
    id: 'code-binary-search-trees-1',
    topicId: 'binary-search-trees',
    type: 'code_execution',
    difficulty: 2,
    content: 'Implement BST insert operation. After inserting all values, print the inorder traversal (should be sorted).',
    language: 'python',
    starterCode: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, val):
        # Write your code here
        pass

    def inorder(self, node, result):
        if node:
            self.inorder(node.left, result)
            result.append(node.val)
            self.inorder(node.right, result)

bst = BST()
values = list(map(int, input().split()))
for v in values:
    bst.insert(v)
result = []
bst.inorder(bst.root, result)
print(' '.join(map(str, result)))`,
    testCases: [
      { input: '5 3 7 1 4 6 8', expectedOutput: '1 3 4 5 6 7 8' },
      { input: '10 5 15 3 7', expectedOutput: '3 5 7 10 15' },
      { input: '1 2 3', expectedOutput: '1 2 3' }
    ],
    correctAnswer: 0,
    explanation: 'BST property: left child < parent < right child. To insert, traverse: go left if value < node, right if value > node, until finding empty spot.'
  },
  {
    id: 'code-binary-search-trees-2',
    topicId: 'binary-search-trees',
    type: 'code_execution',
    difficulty: 3,
    content: 'Implement BST search operation. Return True if value exists, False otherwise.',
    language: 'python',
    starterCode: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, val):
        if not self.root:
            self.root = TreeNode(val)
            return
        current = self.root
        while True:
            if val < current.val:
                if current.left is None:
                    current.left = TreeNode(val)
                    return
                current = current.left
            else:
                if current.right is None:
                    current.right = TreeNode(val)
                    return
                current = current.right

    def search(self, val):
        # Write your code here
        pass

bst = BST()
line1 = input().split()
values = list(map(int, line1))
for v in values:
    bst.insert(v)
search_val = int(input())
print(bst.search(search_val))`,
    testCases: [
      { input: '5 3 7 1 4 6 8\n4', expectedOutput: 'True' },
      { input: '5 3 7 1 4 6 8\n9', expectedOutput: 'False' },
      { input: '10 5 15\n5', expectedOutput: 'True' }
    ],
    correctAnswer: 0,
    explanation: 'BST search: compare target with current node. If equal, found. If target < node, go left. If target > node, go right. If null, not found.'
  },
  {
    id: 'code-binary-search-trees-3',
    topicId: 'binary-search-trees',
    type: 'code_execution',
    difficulty: 4,
    content: 'Find the lowest common ancestor (LCA) of two nodes in a BST. LCA is the deepest node that has both nodes as descendants.',
    language: 'python',
    starterCode: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def build_bst(values):
    if not values:
        return None
    root = TreeNode(values[0])
    for val in values[1:]:
        insert(root, val)
    return root

def insert(root, val):
    if val < root.val:
        if root.left:
            insert(root.left, val)
        else:
            root.left = TreeNode(val)
    else:
        if root.right:
            insert(root.right, val)
        else:
            root.right = TreeNode(val)

def lca(root, p, q):
    # Write your code here - find lowest common ancestor
    pass

values = list(map(int, input().split()))
root = build_bst(values)
p, q = map(int, input().split())
result = lca(root, p, q)
print(result.val if result else None)`,
    testCases: [
      { input: '6 2 8 0 4 7 9 3 5\n2 8', expectedOutput: '6' },
      { input: '6 2 8 0 4 7 9 3 5\n2 4', expectedOutput: '2' },
      { input: '6 2 8 0 4 7 9 3 5\n3 5', expectedOutput: '4' }
    ],
    correctAnswer: 0,
    explanation: 'In BST, if both p and q are smaller than node, LCA is in left subtree. If both larger, LCA is in right subtree. Otherwise, current node is LCA.'
  },

  // AVL Trees - code_execution questions
  {
    id: 'code-avl-trees-1',
    topicId: 'avl-trees',
    type: 'code_execution',
    difficulty: 3,
    content: 'Calculate the balance factor of each node in a binary tree. Balance factor = height(left) - height(right). Print node values with their balance factors.',
    language: 'python',
    starterCode: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def height(node):
    if not node:
        return -1
    return 1 + max(height(node.left), height(node.right))

def get_balance_factors(node, result):
    # Write your code here - append (val, balance_factor) to result
    pass

# Build unbalanced tree:  10
#                        /
#                       5
#                      /
#                     3
root = TreeNode(10)
root.left = TreeNode(5)
root.left.left = TreeNode(3)

result = []
get_balance_factors(root, result)
for val, bf in result:
    print(f'{val}:{bf}')`,
    testCases: [
      { input: '', expectedOutput: '3:0\n5:1\n10:2' },
    ],
    correctAnswer: 0,
    explanation: 'Balance factor = height(left subtree) - height(right subtree). In AVL tree, |BF| <= 1 for all nodes. This tree is unbalanced at node 10 (BF=2).'
  },
  {
    id: 'code-avl-trees-2',
    topicId: 'avl-trees',
    type: 'code_execution',
    difficulty: 4,
    content: 'Implement right rotation for AVL tree. Given an unbalanced node, perform right rotation and print inorder traversal.',
    language: 'python',
    starterCode: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def right_rotate(y):
    # Write your code here
    # y is the unbalanced node
    # Return new root after rotation
    pass

def inorder(node, result):
    if node:
        inorder(node.left, result)
        result.append(node.val)
        inorder(node.right, result)

# Unbalanced tree (left-left case):
#        30
#       /
#      20
#     /
#    10
root = TreeNode(30)
root.left = TreeNode(20)
root.left.left = TreeNode(10)

new_root = right_rotate(root)
result = []
inorder(new_root, result)
print(' '.join(map(str, result)))
print(f'New root: {new_root.val}')`,
    testCases: [
      { input: '', expectedOutput: '10 20 30\nNew root: 20' },
    ],
    correctAnswer: 0,
    explanation: 'Right rotation: x becomes new root, y becomes x\'s right child, x\'s right subtree becomes y\'s left subtree. Used for left-left imbalance case.'
  },
  {
    id: 'code-avl-trees-3',
    topicId: 'avl-trees',
    type: 'code_execution',
    difficulty: 4,
    content: 'Determine what type of rotation is needed to balance a tree. Output: "LL", "RR", "LR", or "RL" based on the imbalance pattern.',
    language: 'python',
    starterCode: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def height(node):
    if not node:
        return -1
    return 1 + max(height(node.left), height(node.right))

def get_balance(node):
    if not node:
        return 0
    return height(node.left) - height(node.right)

def determine_rotation(root):
    # Write your code here
    # Return "LL", "RR", "LR", "RL", or "Balanced"
    pass

# Test case: Left-Right case
#      30
#     /
#    10
#      \\
#       20
root = TreeNode(30)
root.left = TreeNode(10)
root.left.right = TreeNode(20)

print(determine_rotation(root))`,
    testCases: [
      { input: '', expectedOutput: 'LR' },
    ],
    correctAnswer: 0,
    explanation: 'Check balance factor of root and its children. BF > 1 and left child BF >= 0: LL. BF > 1 and left child BF < 0: LR. BF < -1 and right child BF <= 0: RR. BF < -1 and right child BF > 0: RL.'
  },

  // Algorithm Analysis - code_execution questions
  {
    id: 'code-algorithm-analysis-1',
    topicId: 'algorithm-analysis',
    type: 'code_execution',
    difficulty: 2,
    content: 'Implement linear search and count the number of comparisons made. Return the index and comparison count.',
    language: 'python',
    starterCode: `def linear_search(arr, target):
    # Write your code here
    # Return (index, comparison_count) or (-1, comparison_count) if not found
    pass

arr = list(map(int, input().split()))
target = int(input())
index, comparisons = linear_search(arr, target)
print(f'Index: {index}')
print(f'Comparisons: {comparisons}')`,
    testCases: [
      { input: '5 2 8 1 9\n8', expectedOutput: 'Index: 2\nComparisons: 3' },
      { input: '1 2 3 4 5\n5', expectedOutput: 'Index: 4\nComparisons: 5' },
      { input: '10 20 30\n15', expectedOutput: 'Index: -1\nComparisons: 3' }
    ],
    correctAnswer: 0,
    explanation: 'Linear search checks each element sequentially. Best case O(1) if target is first. Worst case O(n) if target is last or not present.'
  },
  {
    id: 'code-algorithm-analysis-2',
    topicId: 'algorithm-analysis',
    type: 'code_execution',
    difficulty: 3,
    content: 'Implement binary search and count the number of comparisons. Array is sorted.',
    language: 'python',
    starterCode: `def binary_search(arr, target):
    # Write your code here
    # Return (index, comparison_count) or (-1, comparison_count) if not found
    pass

arr = list(map(int, input().split()))
target = int(input())
index, comparisons = binary_search(arr, target)
print(f'Index: {index}')
print(f'Comparisons: {comparisons}')`,
    testCases: [
      { input: '1 2 3 4 5 6 7 8 9 10\n7', expectedOutput: 'Index: 6\nComparisons: 2' },
      { input: '1 2 3 4 5 6 7 8 9 10\n1', expectedOutput: 'Index: 0\nComparisons: 4' },
      { input: '1 2 3 4 5\n6', expectedOutput: 'Index: -1\nComparisons: 3' }
    ],
    correctAnswer: 0,
    explanation: 'Binary search halves the search space each iteration. Time complexity is O(log n). Requires sorted array. Much fewer comparisons than linear search for large arrays.'
  },
  {
    id: 'code-algorithm-analysis-3',
    topicId: 'algorithm-analysis',
    type: 'code_execution',
    difficulty: 3,
    content: 'Compare the number of operations for different algorithms. Implement functions that count basic operations for given input size n.',
    language: 'python',
    starterCode: `def constant_ops(n):
    return 1

def linear_ops(n):
    # Return number of operations for O(n)
    pass

def quadratic_ops(n):
    # Return number of operations for O(n^2)
    pass

def logarithmic_ops(n):
    # Return number of operations for O(log n)
    pass

n = int(input())
print(f'O(1): {constant_ops(n)}')
print(f'O(n): {linear_ops(n)}')
print(f'O(n^2): {quadratic_ops(n)}')
print(f'O(log n): {logarithmic_ops(n)}')`,
    testCases: [
      { input: '8', expectedOutput: 'O(1): 1\nO(n): 8\nO(n^2): 64\nO(log n): 3' },
      { input: '16', expectedOutput: 'O(1): 1\nO(n): 16\nO(n^2): 256\nO(log n): 4' }
    ],
    correctAnswer: 0,
    explanation: 'Big-O represents growth rate: O(1) is constant, O(n) grows linearly, O(n^2) grows quadratically, O(log n) grows logarithmically. Use log base 2 for logarithmic.'
  },

  // Heaps - code_execution questions
  {
    id: 'code-heaps-1',
    topicId: 'heaps',
    type: 'code_execution',
    difficulty: 3,
    content: 'Implement a min-heap with insert operation. After inserting all values, print the heap array.',
    language: 'python',
    starterCode: `class MinHeap:
    def __init__(self):
        self.heap = []

    def parent(self, i):
        return (i - 1) // 2

    def insert(self, val):
        # Write your code here
        # Add value and bubble up to maintain heap property
        pass

    def bubble_up(self, i):
        # Write your code here
        pass

heap = MinHeap()
values = list(map(int, input().split()))
for v in values:
    heap.insert(v)
print(' '.join(map(str, heap.heap)))`,
    testCases: [
      { input: '5 3 8 1 2', expectedOutput: '1 2 8 5 3' },
      { input: '10 20 5 30 15', expectedOutput: '5 15 10 30 20' }
    ],
    correctAnswer: 0,
    explanation: 'Min-heap property: parent <= children. Insert at end, then bubble up by swapping with parent while parent is larger. Root is always minimum.'
  },
  {
    id: 'code-heaps-2',
    topicId: 'heaps',
    type: 'code_execution',
    difficulty: 3,
    content: 'Implement extract_min operation for a min-heap. Print extracted values in order.',
    language: 'python',
    starterCode: `class MinHeap:
    def __init__(self):
        self.heap = []

    def parent(self, i):
        return (i - 1) // 2

    def left_child(self, i):
        return 2 * i + 1

    def right_child(self, i):
        return 2 * i + 2

    def insert(self, val):
        self.heap.append(val)
        self.bubble_up(len(self.heap) - 1)

    def bubble_up(self, i):
        while i > 0 and self.heap[self.parent(i)] > self.heap[i]:
            self.heap[i], self.heap[self.parent(i)] = self.heap[self.parent(i)], self.heap[i]
            i = self.parent(i)

    def extract_min(self):
        # Write your code here
        # Remove and return minimum, then heapify down
        pass

    def heapify_down(self, i):
        # Write your code here
        pass

heap = MinHeap()
values = list(map(int, input().split()))
for v in values:
    heap.insert(v)

while heap.heap:
    print(heap.extract_min(), end=' ')`,
    testCases: [
      { input: '5 3 8 1 2', expectedOutput: '1 2 3 5 8 ' },
      { input: '20 10 30 5 15', expectedOutput: '5 10 15 20 30 ' }
    ],
    correctAnswer: 0,
    explanation: 'Extract min: save root, move last element to root, heapify down. Heapify down: swap with smaller child until heap property is restored.'
  },
  {
    id: 'code-heaps-3',
    topicId: 'heaps',
    type: 'code_execution',
    difficulty: 4,
    content: 'Implement heapify to build a heap from an array in O(n) time. Start from last non-leaf node and heapify down.',
    language: 'python',
    starterCode: `def heapify(arr, n, i):
    # Write your code here
    # Heapify subtree rooted at index i (max-heap)
    pass

def build_max_heap(arr):
    n = len(arr)
    # Start from last non-leaf node
    # Write your code here
    pass

arr = list(map(int, input().split()))
build_max_heap(arr)
print(' '.join(map(str, arr)))`,
    testCases: [
      { input: '4 1 3 2 5', expectedOutput: '5 4 3 2 1' },
      { input: '1 2 3 4 5 6', expectedOutput: '6 5 3 4 2 1' }
    ],
    correctAnswer: 0,
    explanation: 'Build heap bottom-up: start from last non-leaf (n//2 - 1), heapify each node down to root. For max-heap, parent >= children. This is O(n) vs O(n log n) for repeated inserts.'
  },

  // Hash Tables - code_execution questions
  {
    id: 'code-hash-tables-1',
    topicId: 'hash-tables',
    type: 'code_execution',
    difficulty: 2,
    content: 'Implement a simple hash table with chaining for collision resolution. Support insert and search operations.',
    language: 'python',
    starterCode: `class HashTable:
    def __init__(self, size):
        self.size = size
        self.table = [[] for _ in range(size)]

    def hash_function(self, key):
        return key % self.size

    def insert(self, key):
        # Write your code here
        pass

    def search(self, key):
        # Write your code here - return True if found, False otherwise
        pass

ht = HashTable(5)
line1 = input().split()
insert_keys = list(map(int, line1))
for key in insert_keys:
    ht.insert(key)
search_key = int(input())
print(ht.search(search_key))`,
    testCases: [
      { input: '5 10 15 20 25\n15', expectedOutput: 'True' },
      { input: '1 6 11 16\n21', expectedOutput: 'False' },
      { input: '3 8 13\n8', expectedOutput: 'True' }
    ],
    correctAnswer: 0,
    explanation: 'Hash table uses hash function to map keys to indices. Chaining handles collisions by storing multiple keys at same index in a list.'
  },
  {
    id: 'code-hash-tables-2',
    topicId: 'hash-tables',
    type: 'code_execution',
    difficulty: 3,
    content: 'Implement a hash table with linear probing for collision resolution. Print the final table state.',
    language: 'python',
    starterCode: `class HashTable:
    def __init__(self, size):
        self.size = size
        self.table = [None] * size

    def hash_function(self, key):
        return key % self.size

    def insert(self, key):
        # Write your code here - use linear probing
        pass

ht = HashTable(7)
keys = list(map(int, input().split()))
for key in keys:
    ht.insert(key)
print(' '.join(str(x) if x is not None else '-' for x in ht.table))`,
    testCases: [
      { input: '10 22 31 4 15', expectedOutput: '22 15 31 10 4 - -' },
      { input: '50 700 76 85 92 73', expectedOutput: '50 700 85 73 92 76 -' }
    ],
    correctAnswer: 0,
    explanation: 'Linear probing: if slot is occupied, check next slot (index + 1) % size until empty slot found. Simpler than chaining but can cause clustering.'
  },
  {
    id: 'code-hash-tables-3',
    topicId: 'hash-tables',
    type: 'code_execution',
    difficulty: 3,
    content: 'Implement a hash map with key-value pairs. Support put and get operations.',
    language: 'python',
    starterCode: `class HashMap:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]

    def _hash(self, key):
        return hash(key) % self.size

    def put(self, key, value):
        # Write your code here - update if key exists
        pass

    def get(self, key):
        # Write your code here - return None if not found
        pass

hm = HashMap()
operations = input().split(',')
for op in operations:
    parts = op.split()
    if parts[0] == 'put':
        hm.put(parts[1], parts[2])
    elif parts[0] == 'get':
        result = hm.get(parts[1])
        print(result if result else 'None')`,
    testCases: [
      { input: 'put name Alice,put age 25,get name,get age', expectedOutput: 'Alice\n25' },
      { input: 'put a 1,put b 2,put a 3,get a,get c', expectedOutput: '3\nNone' }
    ],
    correctAnswer: 0,
    explanation: 'HashMap stores key-value pairs. For put: if key exists, update value; otherwise add new pair. For get: find key and return value. Handle collisions with chaining.'
  },

  // Tries - code_execution questions
  {
    id: 'code-tries-1',
    topicId: 'tries',
    type: 'code_execution',
    difficulty: 3,
    content: 'Implement a Trie with insert and search operations. Search returns True only for complete words inserted.',
    language: 'python',
    starterCode: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        # Write your code here
        pass

    def search(self, word):
        # Write your code here - return True only if exact word exists
        pass

trie = Trie()
words = input().split(',')
for word in words:
    trie.insert(word.strip())
search_words = input().split(',')
for word in search_words:
    print(trie.search(word.strip()))`,
    testCases: [
      { input: 'apple,app,application\napp,apple,ap,appl', expectedOutput: 'True\nTrue\nFalse\nFalse' },
      { input: 'hello,help,world\nhello,hel,world', expectedOutput: 'True\nFalse\nTrue' }
    ],
    correctAnswer: 0,
    explanation: 'Trie stores words character by character. Insert: traverse/create nodes for each char, mark end. Search: traverse nodes, return True only if reached end and is_end is True.'
  },
  {
    id: 'code-tries-2',
    topicId: 'tries',
    type: 'code_execution',
    difficulty: 3,
    content: 'Implement starts_with method for Trie that returns True if any word starts with the given prefix.',
    language: 'python',
    starterCode: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def starts_with(self, prefix):
        # Write your code here
        pass

trie = Trie()
words = input().split(',')
for word in words:
    trie.insert(word.strip())
prefixes = input().split(',')
for prefix in prefixes:
    print(trie.starts_with(prefix.strip()))`,
    testCases: [
      { input: 'apple,app,application\napp,apl,appl,b', expectedOutput: 'True\nFalse\nTrue\nFalse' },
      { input: 'cat,car,card\nca,car,care', expectedOutput: 'True\nTrue\nFalse' }
    ],
    correctAnswer: 0,
    explanation: 'starts_with traverses the trie following prefix characters. Returns True if all prefix chars exist in path, regardless of is_end flag. Useful for autocomplete features.'
  },
  {
    id: 'code-tries-3',
    topicId: 'tries',
    type: 'code_execution',
    difficulty: 4,
    content: 'Implement a function to find all words in a Trie that start with a given prefix.',
    language: 'python',
    starterCode: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def find_words_with_prefix(self, prefix):
        # Write your code here
        # Return list of all words starting with prefix
        pass

trie = Trie()
words = input().split(',')
for word in words:
    trie.insert(word.strip())
prefix = input().strip()
result = trie.find_words_with_prefix(prefix)
print(' '.join(sorted(result)) if result else 'None')`,
    testCases: [
      { input: 'apple,app,application,apply,apt\napp', expectedOutput: 'app apple application apply' },
      { input: 'car,card,care,careful,cat\ncar', expectedOutput: 'car card care careful' },
      { input: 'hello,help,world\nwor', expectedOutput: 'world' }
    ],
    correctAnswer: 0,
    explanation: 'First navigate to the prefix node. Then use DFS to collect all words by traversing all paths from that node. Add word when is_end is True.'
  },

  // ============================================
  // SC1008 - C Programming
  // ============================================

  // C Basics - additional code_execution questions
  {
    id: 'code-c-basics-1',
    topicId: 'c-basics',
    type: 'code_execution',
    difficulty: 2,
    content: 'Write a C program that reads two integers and prints their sum, difference, product, and quotient.',
    language: 'c',
    starterCode: `#include <stdio.h>

int main() {
    int a, b;
    scanf("%d %d", &a, &b);

    // Write your code here to print sum, difference, product, quotient

    return 0;
}`,
    testCases: [
      { input: '10 3', expectedOutput: 'Sum: 13\nDifference: 7\nProduct: 30\nQuotient: 3' },
      { input: '20 4', expectedOutput: 'Sum: 24\nDifference: 16\nProduct: 80\nQuotient: 5' }
    ],
    correctAnswer: 0,
    explanation: 'Use printf with format specifiers. Integer division in C truncates towards zero. Use %d for integers.'
  },
  {
    id: 'code-c-basics-2',
    topicId: 'c-basics',
    type: 'code_execution',
    difficulty: 2,
    content: 'Write a C program to convert temperature from Celsius to Fahrenheit. Formula: F = (C * 9/5) + 32',
    language: 'c',
    starterCode: `#include <stdio.h>

int main() {
    float celsius;
    scanf("%f", &celsius);

    // Write your code here

    return 0;
}`,
    testCases: [
      { input: '0', expectedOutput: '32.00' },
      { input: '100', expectedOutput: '212.00' },
      { input: '37', expectedOutput: '98.60' }
    ],
    correctAnswer: 0,
    explanation: 'Use float for decimal values. Use 9.0/5.0 to avoid integer division. Format output with %.2f for 2 decimal places.'
  },
  {
    id: 'code-c-basics-3',
    topicId: 'c-basics',
    type: 'code_execution',
    difficulty: 3,
    content: 'Write a C program to check if a number is a palindrome (reads same forwards and backwards).',
    language: 'c',
    starterCode: `#include <stdio.h>

int main() {
    int num;
    scanf("%d", &num);

    // Write your code here
    // Print "Yes" if palindrome, "No" otherwise

    return 0;
}`,
    testCases: [
      { input: '121', expectedOutput: 'Yes' },
      { input: '123', expectedOutput: 'No' },
      { input: '12321', expectedOutput: 'Yes' }
    ],
    correctAnswer: 0,
    explanation: 'Reverse the number by extracting digits with % 10 and building reversed number. Compare original with reversed.'
  },

  // Control Flow - code_execution questions
  {
    id: 'code-control-flow-1',
    topicId: 'control-flow',
    type: 'code_execution',
    difficulty: 2,
    content: 'Write a C program to find the largest of three numbers using if-else statements.',
    language: 'c',
    starterCode: `#include <stdio.h>

int main() {
    int a, b, c;
    scanf("%d %d %d", &a, &b, &c);

    // Write your code here to find and print the largest

    return 0;
}`,
    testCases: [
      { input: '5 10 3', expectedOutput: '10' },
      { input: '7 7 7', expectedOutput: '7' },
      { input: '-1 -5 -3', expectedOutput: '-1' }
    ],
    correctAnswer: 0,
    explanation: 'Compare numbers pairwise using if-else. Check if a >= b && a >= c, else if b >= c, else c is largest.'
  },
  {
    id: 'code-control-flow-2',
    topicId: 'control-flow',
    type: 'code_execution',
    difficulty: 2,
    content: 'Write a C program to print the multiplication table of a given number (1 to 10) using a for loop.',
    language: 'c',
    starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);

    // Write your code here

    return 0;
}`,
    testCases: [
      { input: '5', expectedOutput: '5 10 15 20 25 30 35 40 45 50' },
      { input: '3', expectedOutput: '3 6 9 12 15 18 21 24 27 30' }
    ],
    correctAnswer: 0,
    explanation: 'Use a for loop from 1 to 10, multiply n by loop counter each iteration. Print results separated by spaces.'
  },
  {
    id: 'code-control-flow-3',
    topicId: 'control-flow',
    type: 'code_execution',
    difficulty: 3,
    content: 'Write a C program to print a pattern of stars. Input n prints n rows where row i has i stars.',
    language: 'c',
    starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);

    // Write your code here
    // Print pattern:
    // *
    // **
    // ***
    // etc.

    return 0;
}`,
    testCases: [
      { input: '3', expectedOutput: '*\n**\n***' },
      { input: '5', expectedOutput: '*\n**\n***\n****\n*****' }
    ],
    correctAnswer: 0,
    explanation: 'Use nested loops: outer loop for rows (1 to n), inner loop for stars in each row (1 to current row number).'
  },

  // Functions - code_execution questions
  {
    id: 'code-functions-1',
    topicId: 'functions',
    type: 'code_execution',
    difficulty: 2,
    content: 'Write a C function "power" that calculates x raised to the power n (where n >= 0) using a loop.',
    language: 'c',
    starterCode: `#include <stdio.h>

// Write your power function here

int main() {
    int x, n;
    scanf("%d %d", &x, &n);
    printf("%d", power(x, n));
    return 0;
}`,
    testCases: [
      { input: '2 10', expectedOutput: '1024' },
      { input: '3 4', expectedOutput: '81' },
      { input: '5 0', expectedOutput: '1' }
    ],
    correctAnswer: 0,
    explanation: 'Initialize result to 1, multiply by x in a loop n times. Remember x^0 = 1. Function should take two ints and return int.'
  },
  {
    id: 'code-functions-2',
    topicId: 'functions',
    type: 'code_execution',
    difficulty: 3,
    content: 'Write a C function "gcd" that returns the greatest common divisor of two numbers using Euclidean algorithm.',
    language: 'c',
    starterCode: `#include <stdio.h>

// Write your gcd function here

int main() {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d", gcd(a, b));
    return 0;
}`,
    testCases: [
      { input: '48 18', expectedOutput: '6' },
      { input: '100 25', expectedOutput: '25' },
      { input: '17 13', expectedOutput: '1' }
    ],
    correctAnswer: 0,
    explanation: 'Euclidean algorithm: gcd(a,b) = gcd(b, a%b) until b is 0, then return a. Can be iterative or recursive.'
  },
  {
    id: 'code-functions-3',
    topicId: 'functions',
    type: 'code_execution',
    difficulty: 3,
    content: 'Write a C function "isPrime" that returns 1 if a number is prime, 0 otherwise.',
    language: 'c',
    starterCode: `#include <stdio.h>

// Write your isPrime function here

int main() {
    int n;
    scanf("%d", &n);
    if (isPrime(n))
        printf("Prime");
    else
        printf("Not Prime");
    return 0;
}`,
    testCases: [
      { input: '17', expectedOutput: 'Prime' },
      { input: '4', expectedOutput: 'Not Prime' },
      { input: '2', expectedOutput: 'Prime' },
      { input: '1', expectedOutput: 'Not Prime' }
    ],
    correctAnswer: 0,
    explanation: 'A prime has exactly 2 divisors: 1 and itself. Check divisibility from 2 to sqrt(n). Handle edge cases: 1 is not prime, 2 is prime.'
  },

  // Pointers - additional code_execution questions
  {
    id: 'code-pointers-1',
    topicId: 'pointers',
    type: 'code_execution',
    difficulty: 3,
    content: 'Write a C function that finds both the minimum and maximum of an array using pointers to return multiple values.',
    language: 'c',
    starterCode: `#include <stdio.h>

void findMinMax(int arr[], int n, int *min, int *max) {
    // Write your code here
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[100];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    int min, max;
    findMinMax(arr, n, &min, &max);
    printf("Min: %d Max: %d", min, max);
    return 0;
}`,
    testCases: [
      { input: '5\n3 1 4 1 5', expectedOutput: 'Min: 1 Max: 5' },
      { input: '3\n10 20 15', expectedOutput: 'Min: 10 Max: 20' }
    ],
    correctAnswer: 0,
    explanation: 'Use pointers to modify variables in the calling function. Dereference with * to set values. Initialize min/max with first element, then compare with rest.'
  },
  {
    id: 'code-pointers-2',
    topicId: 'pointers',
    type: 'code_execution',
    difficulty: 3,
    content: 'Write a C function to reverse an array in place using pointers.',
    language: 'c',
    starterCode: `#include <stdio.h>

void reverseArray(int *arr, int n) {
    // Write your code here using pointer arithmetic
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[100];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    reverseArray(arr, n);
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    return 0;
}`,
    testCases: [
      { input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1 ' },
      { input: '4\n10 20 30 40', expectedOutput: '40 30 20 10 ' }
    ],
    correctAnswer: 0,
    explanation: 'Use two pointers: one at start, one at end. Swap elements and move pointers towards center. Use pointer arithmetic: *(arr+i) or arr[i].'
  },
  {
    id: 'code-pointers-3',
    topicId: 'pointers',
    type: 'code_execution',
    difficulty: 4,
    content: 'Write a C function to find the length of a string using pointers without using strlen().',
    language: 'c',
    starterCode: `#include <stdio.h>

int stringLength(char *str) {
    // Write your code here using pointer arithmetic
}

int main() {
    char str[100];
    scanf("%s", str);
    printf("%d", stringLength(str));
    return 0;
}`,
    testCases: [
      { input: 'hello', expectedOutput: '5' },
      { input: 'programming', expectedOutput: '11' },
      { input: 'a', expectedOutput: '1' }
    ],
    correctAnswer: 0,
    explanation: 'Strings in C are null-terminated. Traverse using pointer until reaching null character. Count characters or use pointer subtraction: end - start.'
  },

  // Arrays - code_execution questions
  {
    id: 'code-arrays-1',
    topicId: 'arrays',
    type: 'code_execution',
    difficulty: 2,
    content: 'Write a C program to find the sum and average of array elements.',
    language: 'c',
    starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    int arr[100];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    // Write your code here to calculate and print sum and average

    return 0;
}`,
    testCases: [
      { input: '5\n10 20 30 40 50', expectedOutput: 'Sum: 150 Average: 30.00' },
      { input: '4\n5 15 25 35', expectedOutput: 'Sum: 80 Average: 20.00' }
    ],
    correctAnswer: 0,
    explanation: 'Loop through array to calculate sum. Average = sum / n. Use float for average and %.2f format specifier.'
  },
  {
    id: 'code-arrays-2',
    topicId: 'arrays',
    type: 'code_execution',
    difficulty: 3,
    content: 'Write a C program to sort an array in ascending order using bubble sort.',
    language: 'c',
    starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    int arr[100];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    // Write bubble sort here

    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    return 0;
}`,
    testCases: [
      { input: '5\n64 34 25 12 22', expectedOutput: '12 22 25 34 64 ' },
      { input: '4\n5 1 4 2', expectedOutput: '1 2 4 5 ' }
    ],
    correctAnswer: 0,
    explanation: 'Bubble sort: repeatedly swap adjacent elements if in wrong order. Outer loop runs n-1 times, inner loop compares and swaps adjacent pairs.'
  },
  {
    id: 'code-arrays-3',
    topicId: 'arrays',
    type: 'code_execution',
    difficulty: 3,
    content: 'Write a C program to merge two sorted arrays into one sorted array.',
    language: 'c',
    starterCode: `#include <stdio.h>

int main() {
    int n1, n2;
    scanf("%d", &n1);
    int arr1[50];
    for (int i = 0; i < n1; i++) scanf("%d", &arr1[i]);

    scanf("%d", &n2);
    int arr2[50];
    for (int i = 0; i < n2; i++) scanf("%d", &arr2[i]);

    int merged[100];
    // Write your merge code here

    for (int i = 0; i < n1 + n2; i++) {
        printf("%d ", merged[i]);
    }
    return 0;
}`,
    testCases: [
      { input: '3\n1 3 5\n3\n2 4 6', expectedOutput: '1 2 3 4 5 6 ' },
      { input: '4\n1 4 7 10\n3\n2 5 8', expectedOutput: '1 2 4 5 7 8 10 ' }
    ],
    correctAnswer: 0,
    explanation: 'Use two pointers, one for each array. Compare elements, add smaller to merged array, advance that pointer. Handle remaining elements.'
  },

  // Structures - code_execution questions
  {
    id: 'code-structures-1',
    topicId: 'structures',
    type: 'code_execution',
    difficulty: 2,
    content: 'Define a structure "Student" with name, age, and gpa. Create a student, initialize it, and print the details.',
    language: 'c',
    starterCode: `#include <stdio.h>
#include <string.h>

// Define your Student structure here

int main() {
    char name[50];
    int age;
    float gpa;
    scanf("%s %d %f", name, &age, &gpa);

    // Create and initialize a Student, then print

    return 0;
}`,
    testCases: [
      { input: 'Alice 20 3.85', expectedOutput: 'Name: Alice Age: 20 GPA: 3.85' },
      { input: 'Bob 22 3.50', expectedOutput: 'Name: Bob Age: 22 GPA: 3.50' }
    ],
    correctAnswer: 0,
    explanation: 'Define struct with members. Initialize using dot notation or during declaration. Use strcpy for string members. Access members with dot operator.'
  },
  {
    id: 'code-structures-2',
    topicId: 'structures',
    type: 'code_execution',
    difficulty: 3,
    content: 'Write a C program using structures to represent a Point with x and y coordinates. Write a function to calculate distance between two points.',
    language: 'c',
    starterCode: `#include <stdio.h>
#include <math.h>

// Define Point structure here

// Write distance function here

int main() {
    int x1, y1, x2, y2;
    scanf("%d %d %d %d", &x1, &y1, &x2, &y2);

    // Create two points and calculate distance

    return 0;
}`,
    testCases: [
      { input: '0 0 3 4', expectedOutput: '5.00' },
      { input: '1 1 4 5', expectedOutput: '5.00' }
    ],
    correctAnswer: 0,
    explanation: 'Distance formula: sqrt((x2-x1)^2 + (y2-y1)^2). Pass structures by value or use pointers for efficiency. Use sqrt from math.h.'
  },
  {
    id: 'code-structures-3',
    topicId: 'structures',
    type: 'code_execution',
    difficulty: 3,
    content: 'Create an array of structures to store 3 students. Find and print the student with the highest GPA.',
    language: 'c',
    starterCode: `#include <stdio.h>
#include <string.h>

struct Student {
    char name[50];
    float gpa;
};

int main() {
    struct Student students[3];

    for (int i = 0; i < 3; i++) {
        scanf("%s %f", students[i].name, &students[i].gpa);
    }

    // Find and print student with highest GPA

    return 0;
}`,
    testCases: [
      { input: 'Alice 3.5\nBob 3.8\nCarol 3.2', expectedOutput: 'Bob 3.80' },
      { input: 'Dan 4.0\nEve 3.9\nFrank 3.95', expectedOutput: 'Dan 4.00' }
    ],
    correctAnswer: 0,
    explanation: 'Arrays of structures work like regular arrays. Access elements with index, then members with dot. Track index of highest GPA while iterating.'
  },

  // Recursion - code_execution questions
  {
    id: 'code-recursion-1',
    topicId: 'recursion',
    type: 'code_execution',
    difficulty: 2,
    content: 'Write a recursive C function to calculate the sum of digits of a positive integer.',
    language: 'c',
    starterCode: `#include <stdio.h>

int sumOfDigits(int n) {
    // Write your recursive function here
}

int main() {
    int n;
    scanf("%d", &n);
    printf("%d", sumOfDigits(n));
    return 0;
}`,
    testCases: [
      { input: '123', expectedOutput: '6' },
      { input: '9999', expectedOutput: '36' },
      { input: '5', expectedOutput: '5' }
    ],
    correctAnswer: 0,
    explanation: 'Base case: if n < 10, return n. Recursive case: return (n % 10) + sumOfDigits(n / 10). Extract last digit and recurse on remaining.'
  },
  {
    id: 'code-recursion-2',
    topicId: 'recursion',
    type: 'code_execution',
    difficulty: 3,
    content: 'Write a recursive C function to calculate the nth Fibonacci number.',
    language: 'c',
    starterCode: `#include <stdio.h>

int fibonacci(int n) {
    // Write your recursive function here
}

int main() {
    int n;
    scanf("%d", &n);
    printf("%d", fibonacci(n));
    return 0;
}`,
    testCases: [
      { input: '10', expectedOutput: '55' },
      { input: '7', expectedOutput: '13' },
      { input: '1', expectedOutput: '1' }
    ],
    correctAnswer: 0,
    explanation: 'Fibonacci: F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2). Base cases: n<=1 return n. Recursive case: return fib(n-1) + fib(n-2).'
  },
  {
    id: 'code-recursion-3',
    topicId: 'recursion',
    type: 'code_execution',
    difficulty: 3,
    content: 'Write a recursive C function to reverse a string in place.',
    language: 'c',
    starterCode: `#include <stdio.h>
#include <string.h>

void reverseString(char str[], int start, int end) {
    // Write your recursive function here
}

int main() {
    char str[100];
    scanf("%s", str);
    reverseString(str, 0, strlen(str) - 1);
    printf("%s", str);
    return 0;
}`,
    testCases: [
      { input: 'hello', expectedOutput: 'olleh' },
      { input: 'recursion', expectedOutput: 'noisrucer' },
      { input: 'a', expectedOutput: 'a' }
    ],
    correctAnswer: 0,
    explanation: 'Base case: if start >= end, return. Recursive case: swap str[start] and str[end], then recurse with start+1 and end-1.'
  },

  // ============================================
  // SC2002 - Object-Oriented Programming (Java)
  // ============================================

  // OOP Introduction - code_execution questions
  {
    id: 'code-oop-introduction-1',
    topicId: 'oop-introduction',
    type: 'code_execution',
    difficulty: 2,
    content: 'Create a simple Java class "Car" with brand and year attributes. Write a method to display car information.',
    language: 'java',
    starterCode: `import java.util.Scanner;

// Write your Car class here

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String brand = sc.next();
        int year = sc.nextInt();

        Car car = new Car(brand, year);
        car.displayInfo();
    }
}`,
    testCases: [
      { input: 'Toyota 2020', expectedOutput: 'Brand: Toyota, Year: 2020' },
      { input: 'Honda 2018', expectedOutput: 'Brand: Honda, Year: 2018' }
    ],
    correctAnswer: 0,
    explanation: 'A class bundles data (attributes) and behavior (methods). Constructor initializes attributes. Methods operate on the object\'s data.'
  },
  {
    id: 'code-oop-introduction-2',
    topicId: 'oop-introduction',
    type: 'code_execution',
    difficulty: 2,
    content: 'Create a class "Counter" with methods to increment, decrement, and get the current count.',
    language: 'java',
    starterCode: `import java.util.Scanner;

// Write your Counter class here

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Counter counter = new Counter();

        String ops = sc.nextLine();
        for (String op : ops.split(",")) {
            op = op.trim();
            if (op.equals("inc")) counter.increment();
            else if (op.equals("dec")) counter.decrement();
            else if (op.equals("get")) System.out.println(counter.getCount());
        }
    }
}`,
    testCases: [
      { input: 'inc,inc,inc,get,dec,get', expectedOutput: '3\n2' },
      { input: 'inc,get,dec,dec,get', expectedOutput: '1\n-1' }
    ],
    correctAnswer: 0,
    explanation: 'Objects maintain state through instance variables. Methods modify or access this state. This demonstrates encapsulation of data and behavior.'
  },
  {
    id: 'code-oop-introduction-3',
    topicId: 'oop-introduction',
    type: 'code_execution',
    difficulty: 3,
    content: 'Create a class "BankAccount" with methods deposit, withdraw, and getBalance. Withdraw should not allow negative balance.',
    language: 'java',
    starterCode: `import java.util.Scanner;

// Write your BankAccount class here

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        BankAccount account = new BankAccount();

        String ops = sc.nextLine();
        for (String op : ops.split(",")) {
            String[] parts = op.trim().split(" ");
            if (parts[0].equals("deposit")) {
                account.deposit(Double.parseDouble(parts[1]));
            } else if (parts[0].equals("withdraw")) {
                boolean success = account.withdraw(Double.parseDouble(parts[1]));
                if (!success) System.out.println("Insufficient funds");
            } else if (parts[0].equals("balance")) {
                System.out.printf("%.2f%n", account.getBalance());
            }
        }
    }
}`,
    testCases: [
      { input: 'deposit 100,withdraw 30,balance,withdraw 80,balance', expectedOutput: '70.00\nInsufficient funds\n70.00' },
      { input: 'deposit 50,deposit 25,balance,withdraw 75,balance', expectedOutput: '75.00\n0.00' }
    ],
    correctAnswer: 0,
    explanation: 'This demonstrates data validation in methods. withdraw() should check if amount <= balance before deducting. Return boolean to indicate success/failure.'
  },

  // Classes and Objects - additional code_execution questions
  {
    id: 'code-classes-objects-1',
    topicId: 'classes-objects',
    type: 'code_execution',
    difficulty: 2,
    content: 'Create a class "Circle" with radius attribute. Include methods to calculate area and circumference.',
    language: 'java',
    starterCode: `import java.util.Scanner;

// Write your Circle class here

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double radius = sc.nextDouble();

        Circle circle = new Circle(radius);
        System.out.printf("Area: %.2f%n", circle.getArea());
        System.out.printf("Circumference: %.2f%n", circle.getCircumference());
    }
}`,
    testCases: [
      { input: '5', expectedOutput: 'Area: 78.54\nCircumference: 31.42' },
      { input: '10', expectedOutput: 'Area: 314.16\nCircumference: 62.83' }
    ],
    correctAnswer: 0,
    explanation: 'Area = PI * r^2, Circumference = 2 * PI * r. Use Math.PI for the constant. Constructor initializes the radius.'
  },
  {
    id: 'code-classes-objects-2',
    topicId: 'classes-objects',
    type: 'code_execution',
    difficulty: 3,
    content: 'Create a class "Book" with title, author, and price. Implement toString() method for formatted output.',
    language: 'java',
    starterCode: `import java.util.Scanner;

// Write your Book class here with toString()

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String title = sc.nextLine();
        String author = sc.nextLine();
        double price = sc.nextDouble();

        Book book = new Book(title, author, price);
        System.out.println(book);
    }
}`,
    testCases: [
      { input: 'Java Programming\nJohn Smith\n49.99', expectedOutput: 'Book[title=Java Programming, author=John Smith, price=$49.99]' },
      { input: 'Data Structures\nJane Doe\n59.95', expectedOutput: 'Book[title=Data Structures, author=Jane Doe, price=$59.95]' }
    ],
    correctAnswer: 0,
    explanation: 'Override toString() to provide custom string representation of objects. Format: Book[title=..., author=..., price=$...]. Use String.format() for price.'
  },
  {
    id: 'code-classes-objects-3',
    topicId: 'classes-objects',
    type: 'code_execution',
    difficulty: 3,
    content: 'Create a class "Student" with a static variable to count total students created. Each student has an id and name.',
    language: 'java',
    starterCode: `import java.util.Scanner;

// Write your Student class with static counter

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.nextLine();

        for (int i = 0; i < n; i++) {
            String name = sc.nextLine();
            Student s = new Student(name);
            System.out.println("Created: " + s.getName() + " (ID: " + s.getId() + ")");
        }
        System.out.println("Total students: " + Student.getCount());
    }
}`,
    testCases: [
      { input: '3\nAlice\nBob\nCharlie', expectedOutput: 'Created: Alice (ID: 1)\nCreated: Bob (ID: 2)\nCreated: Charlie (ID: 3)\nTotal students: 3' },
      { input: '2\nDan\nEve', expectedOutput: 'Created: Dan (ID: 1)\nCreated: Eve (ID: 2)\nTotal students: 2' }
    ],
    correctAnswer: 0,
    explanation: 'Static variables are shared across all instances. Use static counter to auto-assign unique IDs. Increment counter in constructor, assign to instance id.'
  },

  // Encapsulation - code_execution questions
  {
    id: 'code-encapsulation-1',
    topicId: 'encapsulation',
    type: 'code_execution',
    difficulty: 2,
    content: 'Create a class "Person" with private name and age. Implement getters and setters with validation (age must be 0-150).',
    language: 'java',
    starterCode: `import java.util.Scanner;

// Write your Person class with encapsulation

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.nextLine();
        int age = sc.nextInt();

        Person person = new Person();
        person.setName(name);
        if (person.setAge(age)) {
            System.out.println("Name: " + person.getName());
            System.out.println("Age: " + person.getAge());
        } else {
            System.out.println("Invalid age");
        }
    }
}`,
    testCases: [
      { input: 'Alice\n25', expectedOutput: 'Name: Alice\nAge: 25' },
      { input: 'Bob\n200', expectedOutput: 'Invalid age' },
      { input: 'Carol\n-5', expectedOutput: 'Invalid age' }
    ],
    correctAnswer: 0,
    explanation: 'Encapsulation hides data using private access. Getters provide read access. Setters validate data before assignment, protecting object integrity.'
  },
  {
    id: 'code-encapsulation-2',
    topicId: 'encapsulation',
    type: 'code_execution',
    difficulty: 3,
    content: 'Create a class "Temperature" that stores temperature in Celsius internally but provides methods to get/set in both Celsius and Fahrenheit.',
    language: 'java',
    starterCode: `import java.util.Scanner;

// Write your Temperature class

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double value = sc.nextDouble();
        String unit = sc.next();

        Temperature temp = new Temperature();
        if (unit.equals("C")) {
            temp.setCelsius(value);
        } else {
            temp.setFahrenheit(value);
        }

        System.out.printf("Celsius: %.2f%n", temp.getCelsius());
        System.out.printf("Fahrenheit: %.2f%n", temp.getFahrenheit());
    }
}`,
    testCases: [
      { input: '100 C', expectedOutput: 'Celsius: 100.00\nFahrenheit: 212.00' },
      { input: '32 F', expectedOutput: 'Celsius: 0.00\nFahrenheit: 32.00' }
    ],
    correctAnswer: 0,
    explanation: 'Encapsulation allows internal representation to differ from external interface. Store Celsius, convert in getters/setters: F = C*9/5+32, C = (F-32)*5/9.'
  },
  {
    id: 'code-encapsulation-3',
    topicId: 'encapsulation',
    type: 'code_execution',
    difficulty: 3,
    content: 'Create a class "Password" that stores a hashed password (simple: reverse the string). Provide method to verify password without exposing the hash.',
    language: 'java',
    starterCode: `import java.util.Scanner;

// Write your Password class

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String password = sc.nextLine();
        String attempt = sc.nextLine();

        Password pw = new Password(password);
        System.out.println(pw.verify(attempt) ? "Access granted" : "Access denied");
    }
}`,
    testCases: [
      { input: 'secret123\nsecret123', expectedOutput: 'Access granted' },
      { input: 'mypassword\nwrongpass', expectedOutput: 'Access denied' },
      { input: 'hello\nhello', expectedOutput: 'Access granted' }
    ],
    correctAnswer: 0,
    explanation: 'Encapsulation protects sensitive data. Store only the hash (reversed string), never the original. Verify by hashing attempt and comparing with stored hash.'
  },

  // Inheritance - code_execution questions
  {
    id: 'code-inheritance-1',
    topicId: 'inheritance',
    type: 'code_execution',
    difficulty: 2,
    content: 'Create a base class "Animal" with name and a speak() method. Create subclass "Dog" that overrides speak() to return "Woof!".',
    language: 'java',
    starterCode: `import java.util.Scanner;

// Write Animal class and Dog subclass

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.nextLine();

        Animal animal = new Animal(name);
        Dog dog = new Dog(name);

        System.out.println(animal.getName() + " says: " + animal.speak());
        System.out.println(dog.getName() + " says: " + dog.speak());
    }
}`,
    testCases: [
      { input: 'Buddy', expectedOutput: 'Buddy says: Some sound\nBuddy says: Woof!' },
      { input: 'Max', expectedOutput: 'Max says: Some sound\nMax says: Woof!' }
    ],
    correctAnswer: 0,
    explanation: 'Inheritance allows subclass to reuse parent code. Use extends keyword. Override methods by defining same signature in subclass. Call super() for parent constructor.'
  },
  {
    id: 'code-inheritance-2',
    topicId: 'inheritance',
    type: 'code_execution',
    difficulty: 3,
    content: 'Create a class hierarchy: Shape (base) with area() method, Rectangle and Circle as subclasses. Use appropriate formulas.',
    language: 'java',
    starterCode: `import java.util.Scanner;

// Write Shape, Rectangle, and Circle classes

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String type = sc.next();

        Shape shape;
        if (type.equals("rectangle")) {
            double w = sc.nextDouble();
            double h = sc.nextDouble();
            shape = new Rectangle(w, h);
        } else {
            double r = sc.nextDouble();
            shape = new Circle(r);
        }

        System.out.printf("Area: %.2f%n", shape.area());
    }
}`,
    testCases: [
      { input: 'rectangle 5 3', expectedOutput: 'Area: 15.00' },
      { input: 'circle 5', expectedOutput: 'Area: 78.54' }
    ],
    correctAnswer: 0,
    explanation: 'Shape defines contract with area() method. Rectangle overrides with w*h, Circle with PI*r*r. Polymorphism allows treating different shapes uniformly.'
  },
  {
    id: 'code-inheritance-3',
    topicId: 'inheritance',
    type: 'code_execution',
    difficulty: 3,
    content: 'Create Employee base class with name and salary. Create Manager subclass that adds bonus. Override getSalary() to include bonus.',
    language: 'java',
    starterCode: `import java.util.Scanner;

// Write Employee and Manager classes

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.nextLine();
        double salary = sc.nextDouble();
        double bonus = sc.nextDouble();

        Employee emp = new Employee(name, salary);
        Manager mgr = new Manager(name, salary, bonus);

        System.out.printf("Employee %s: $%.2f%n", emp.getName(), emp.getSalary());
        System.out.printf("Manager %s: $%.2f%n", mgr.getName(), mgr.getSalary());
    }
}`,
    testCases: [
      { input: 'John\n50000\n10000', expectedOutput: 'Employee John: $50000.00\nManager John: $60000.00' },
      { input: 'Jane\n75000\n15000', expectedOutput: 'Employee Jane: $75000.00\nManager Jane: $90000.00' }
    ],
    correctAnswer: 0,
    explanation: 'Manager extends Employee, adding bonus field. Override getSalary() to return salary + bonus. Use super.getSalary() to reuse parent implementation.'
  },

  // Polymorphism - code_execution questions
  {
    id: 'code-polymorphism-1',
    topicId: 'polymorphism',
    type: 'code_execution',
    difficulty: 3,
    content: 'Demonstrate polymorphism with an array of Shape objects (Rectangles and Circles). Calculate total area.',
    language: 'java',
    starterCode: `import java.util.Scanner;

class Shape {
    public double area() { return 0; }
}

class Rectangle extends Shape {
    private double width, height;
    public Rectangle(double w, double h) { width = w; height = h; }
    public double area() { return width * height; }
}

class Circle extends Shape {
    private double radius;
    public Circle(double r) { radius = r; }
    public double area() { return Math.PI * radius * radius; }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        Shape[] shapes = new Shape[n];
        for (int i = 0; i < n; i++) {
            String type = sc.next();
            if (type.equals("R")) {
                shapes[i] = new Rectangle(sc.nextDouble(), sc.nextDouble());
            } else {
                shapes[i] = new Circle(sc.nextDouble());
            }
        }

        // Calculate and print total area
        double total = 0;
        // Write your code here

        System.out.printf("Total area: %.2f%n", total);
    }
}`,
    testCases: [
      { input: '3\nR 4 5\nC 3\nR 2 3', expectedOutput: 'Total area: 54.27' },
      { input: '2\nC 5\nC 5', expectedOutput: 'Total area: 157.08' }
    ],
    correctAnswer: 0,
    explanation: 'Polymorphism allows treating different types uniformly. Loop through Shape array, call area() on each - correct version called based on actual type at runtime.'
  },
  {
    id: 'code-polymorphism-2',
    topicId: 'polymorphism',
    type: 'code_execution',
    difficulty: 3,
    content: 'Implement method overloading: create a Calculator class with add() methods that work with 2 ints, 3 ints, or 2 doubles.',
    language: 'java',
    starterCode: `import java.util.Scanner;

// Write Calculator class with overloaded add methods

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Calculator calc = new Calculator();

        String ops = sc.nextLine();
        for (String op : ops.split(";")) {
            String[] parts = op.trim().split(" ");
            if (parts.length == 2) {
                if (parts[0].contains(".")) {
                    System.out.printf("%.2f%n", calc.add(Double.parseDouble(parts[0]), Double.parseDouble(parts[1])));
                } else {
                    System.out.println(calc.add(Integer.parseInt(parts[0]), Integer.parseInt(parts[1])));
                }
            } else {
                System.out.println(calc.add(Integer.parseInt(parts[0]), Integer.parseInt(parts[1]), Integer.parseInt(parts[2])));
            }
        }
    }
}`,
    testCases: [
      { input: '2 3;1 2 3;1.5 2.5', expectedOutput: '5\n6\n4.00' },
      { input: '10 20;5 5 5;3.14 2.86', expectedOutput: '30\n15\n6.00' }
    ],
    correctAnswer: 0,
    explanation: 'Method overloading: same method name, different parameters. Compiler selects correct method based on argument types. This is compile-time polymorphism.'
  },
  {
    id: 'code-polymorphism-3',
    topicId: 'polymorphism',
    type: 'code_execution',
    difficulty: 4,
    content: 'Create a Payment interface with processPayment(). Implement CreditCard and PayPal classes. Demonstrate polymorphic behavior.',
    language: 'java',
    starterCode: `import java.util.Scanner;

// Write Payment interface and CreditCard, PayPal classes

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String type = sc.next();
        double amount = sc.nextDouble();

        Payment payment;
        if (type.equals("credit")) {
            payment = new CreditCard();
        } else {
            payment = new PayPal();
        }

        payment.processPayment(amount);
    }
}`,
    testCases: [
      { input: 'credit 100.50', expectedOutput: 'Processing credit card payment of $100.50' },
      { input: 'paypal 75.00', expectedOutput: 'Processing PayPal payment of $75.00' }
    ],
    correctAnswer: 0,
    explanation: 'Interface defines contract, classes implement it differently. Reference of interface type can hold any implementing class. Runtime polymorphism selects correct implementation.'
  },

  // Abstract Classes - code_execution questions
  {
    id: 'code-abstract-classes-1',
    topicId: 'abstract-classes',
    type: 'code_execution',
    difficulty: 3,
    content: 'Create an abstract class Vehicle with abstract method start() and concrete method stop(). Implement Car and Motorcycle subclasses.',
    language: 'java',
    starterCode: `import java.util.Scanner;

// Write abstract Vehicle class and Car, Motorcycle subclasses

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String type = sc.next();

        Vehicle vehicle;
        if (type.equals("car")) {
            vehicle = new Car();
        } else {
            vehicle = new Motorcycle();
        }

        vehicle.start();
        vehicle.stop();
    }
}`,
    testCases: [
      { input: 'car', expectedOutput: 'Car engine starting...\nVehicle stopped.' },
      { input: 'motorcycle', expectedOutput: 'Motorcycle engine revving...\nVehicle stopped.' }
    ],
    correctAnswer: 0,
    explanation: 'Abstract classes can have both abstract and concrete methods. Subclasses must implement abstract methods. Cannot instantiate abstract class directly.'
  },
  {
    id: 'code-abstract-classes-2',
    topicId: 'abstract-classes',
    type: 'code_execution',
    difficulty: 3,
    content: 'Create abstract class BankAccount with abstract method calculateInterest(). Implement SavingsAccount (2% interest) and CheckingAccount (no interest).',
    language: 'java',
    starterCode: `import java.util.Scanner;

// Write abstract BankAccount and subclasses

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String type = sc.next();
        double balance = sc.nextDouble();

        BankAccount account;
        if (type.equals("savings")) {
            account = new SavingsAccount(balance);
        } else {
            account = new CheckingAccount(balance);
        }

        System.out.printf("Balance: $%.2f%n", account.getBalance());
        System.out.printf("Interest: $%.2f%n", account.calculateInterest());
    }
}`,
    testCases: [
      { input: 'savings 1000', expectedOutput: 'Balance: $1000.00\nInterest: $20.00' },
      { input: 'checking 5000', expectedOutput: 'Balance: $5000.00\nInterest: $0.00' }
    ],
    correctAnswer: 0,
    explanation: 'Abstract class provides partial implementation. SavingsAccount returns balance * 0.02, CheckingAccount returns 0. Each subclass implements its own interest logic.'
  },
  {
    id: 'code-abstract-classes-3',
    topicId: 'abstract-classes',
    type: 'code_execution',
    difficulty: 4,
    content: 'Create abstract class Game with template method play() that calls abstract methods initialize(), startPlay(), endPlay().',
    language: 'java',
    starterCode: `import java.util.Scanner;

// Write abstract Game class with template method and concrete subclasses

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String type = sc.next();

        Game game;
        if (type.equals("chess")) {
            game = new Chess();
        } else {
            game = new Soccer();
        }

        game.play();
    }
}`,
    testCases: [
      { input: 'chess', expectedOutput: 'Chess initialized\nChess started: Move pieces!\nChess ended: Checkmate!' },
      { input: 'soccer', expectedOutput: 'Soccer initialized\nSoccer started: Kick off!\nSoccer ended: Final whistle!' }
    ],
    correctAnswer: 0,
    explanation: 'Template Method pattern: abstract class defines algorithm skeleton, subclasses fill in steps. play() calls initialize(), startPlay(), endPlay() in order.'
  },

  // Exception Handling - code_execution questions
  {
    id: 'code-exception-handling-1',
    topicId: 'exception-handling',
    type: 'code_execution',
    difficulty: 2,
    content: 'Write a program that reads two integers and performs division. Handle ArithmeticException for division by zero.',
    language: 'java',
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();

        // Write try-catch for division
    }
}`,
    testCases: [
      { input: '10 2', expectedOutput: 'Result: 5' },
      { input: '10 0', expectedOutput: 'Error: Cannot divide by zero' },
      { input: '15 3', expectedOutput: 'Result: 5' }
    ],
    correctAnswer: 0,
    explanation: 'Use try-catch to handle exceptions gracefully. Wrap risky code in try block. Catch specific exception and provide meaningful error message.'
  },
  {
    id: 'code-exception-handling-2',
    topicId: 'exception-handling',
    type: 'code_execution',
    difficulty: 3,
    content: 'Create a method that validates age (must be 0-150). Throw IllegalArgumentException for invalid age. Handle it in main.',
    language: 'java',
    starterCode: `import java.util.Scanner;

public class Main {
    public static void validateAge(int age) {
        // Write your validation - throw IllegalArgumentException if invalid
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int age = sc.nextInt();

        // Write try-catch to handle the exception
    }
}`,
    testCases: [
      { input: '25', expectedOutput: 'Valid age: 25' },
      { input: '-5', expectedOutput: 'Invalid age: Age must be between 0 and 150' },
      { input: '200', expectedOutput: 'Invalid age: Age must be between 0 and 150' }
    ],
    correctAnswer: 0,
    explanation: 'Throw exceptions to signal invalid conditions. IllegalArgumentException is appropriate for invalid parameters. Catch and handle in calling code.'
  },
  {
    id: 'code-exception-handling-3',
    topicId: 'exception-handling',
    type: 'code_execution',
    difficulty: 4,
    content: 'Create a custom InsufficientFundsException. Use it in a withdraw method that checks balance. Handle multiple exception types.',
    language: 'java',
    starterCode: `import java.util.Scanner;

// Write custom InsufficientFundsException class

class BankAccount {
    private double balance;

    public BankAccount(double balance) {
        this.balance = balance;
    }

    public void withdraw(double amount) throws InsufficientFundsException {
        // Write your withdraw logic - throw exception if insufficient funds
    }

    public double getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double balance = sc.nextDouble();
        double amount = sc.nextDouble();

        BankAccount account = new BankAccount(balance);

        // Write try-catch to handle withdrawal
    }
}`,
    testCases: [
      { input: '100 50', expectedOutput: 'Withdrawn: $50.00\nRemaining: $50.00' },
      { input: '100 150', expectedOutput: 'Error: Insufficient funds. Available: $100.00' },
      { input: '500 500', expectedOutput: 'Withdrawn: $500.00\nRemaining: $0.00' }
    ],
    correctAnswer: 0,
    explanation: 'Custom exceptions extend Exception class. Include relevant info (available balance). Throw when condition violated, catch and handle appropriately.'
  }
];

export function getQuestionsForTopic(topicId: string): Question[] {
  return questions.filter(q => q.topicId === topicId);
}

export function getQuestionsByDifficulty(topicId: string, difficulty: number): Question[] {
  return questions.filter(q => q.topicId === topicId && q.difficulty <= difficulty);
}
