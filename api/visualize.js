const P = {
  fibonacci: {
    problem:"Fibonacci(5) — overlapping subproblems",
    problemType:"general",boardSize:0,
    timeComplexity:{best:"O(2^n)",average:"O(2^n)",worst:"O(2^n)",space:"O(n)",note:"With memoization: O(n) time, O(n) space"},
    generatedCode:`int fib(int n) {\n  if (n <= 1) return n;        // line 2\n  return fib(n-1) + fib(n-2);  // line 3\n}`,
    steps:[{step:1,nodeId:"n1",parentId:null,label:"fib(5)",type:"call",depth:0,functionName:"fib",arguments:{n:5},returnValue:null,callStack:["fib(5)"],localVars:{n:5},highlightLine:3,currentAction:"fib(5) called — n>1 so we recurse",description:"Starting fib(5). Since n=5>1, we split into fib(4)+fib(3). This branching causes exponential O(2^n) time without memoization."},{step:2,nodeId:"n2",parentId:"n1",label:"fib(4)",type:"call",depth:1,functionName:"fib",arguments:{n:4},returnValue:null,callStack:["fib(5)","fib(4)"],localVars:{n:4},highlightLine:3,currentAction:"Left branch: calling fib(4)",description:"fib(5) calls fib(4) first — the LEFT branch. fib(5) is PAUSED waiting."},{step:3,nodeId:"n3",parentId:"n2",label:"fib(3)",type:"call",depth:2,functionName:"fib",arguments:{n:3},returnValue:null,callStack:["fib(5)","fib(4)","fib(3)"],localVars:{n:3},highlightLine:3,currentAction:"Going deeper: calling fib(3)",description:"fib(4) calls fib(3). Stack depth 3."},{step:4,nodeId:"n4",parentId:"n3",label:"fib(2)",type:"call",depth:3,functionName:"fib",arguments:{n:2},returnValue:null,callStack:["fib(5)","fib(4)","fib(3)","fib(2)"],localVars:{n:2},highlightLine:3,currentAction:"Calling fib(2)",description:"Going 4 levels deep before base case."},{step:5,nodeId:"n5",parentId:"n4",label:"fib(1)",type:"base_case",depth:4,functionName:"fib",arguments:{n:1},returnValue:1,callStack:["fib(5)","fib(4)","fib(3)","fib(2)","fib(1)"],localVars:{n:1},highlightLine:2,currentAction:"BASE CASE ✓ n=1, return 1",description:"BASE CASE! n<=1 so return 1. Without this, recursion runs forever — stack overflow!"},{step:6,nodeId:"n6",parentId:"n4",label:"fib(0)",type:"base_case",depth:4,functionName:"fib",arguments:{n:0},returnValue:0,callStack:["fib(5)","fib(4)","fib(3)","fib(2)","fib(0)"],localVars:{n:0},highlightLine:2,currentAction:"BASE CASE ✓ n=0, return 0",description:"fib(0)=0. Now fib(2) returns 1+0=1."},{step:7,nodeId:"n4r",parentId:"n3",label:"fib(2)↑",type:"return",depth:3,functionName:"fib",arguments:{n:2},returnValue:1,callStack:["fib(5)","fib(4)","fib(3)"],localVars:{n:2},highlightLine:3,currentAction:"fib(2) returns 1",description:"fib(2)=1+0=1. Returning up."},{step:8,nodeId:"n7",parentId:"n3",label:"fib(1)",type:"base_case",depth:3,functionName:"fib",arguments:{n:1},returnValue:1,callStack:["fib(5)","fib(4)","fib(3)","fib(1)"],localVars:{n:1},highlightLine:2,currentAction:"BASE CASE ✓ fib(1)=1",description:"Right branch base case."},{step:9,nodeId:"n3r",parentId:"n2",label:"fib(3)↑",type:"return",depth:2,functionName:"fib",arguments:{n:3},returnValue:2,callStack:["fib(5)","fib(4)"],localVars:{n:3},highlightLine:3,currentAction:"fib(3) returns 2",description:"fib(3)=1+1=2."},{step:10,nodeId:"n8",parentId:"n2",label:"fib(2)",type:"call",depth:2,functionName:"fib",arguments:{n:2},returnValue:null,callStack:["fib(5)","fib(4)","fib(2)"],localVars:{n:2},highlightLine:3,currentAction:"⚠ fib(2) computed AGAIN — redundant!",description:"REPEATED WORK! fib(2) already computed above. This is WHY naive fibonacci is O(2^n)."},{step:11,nodeId:"n9",parentId:"n8",label:"fib(1)",type:"base_case",depth:3,functionName:"fib",arguments:{n:1},returnValue:1,callStack:["fib(5)","fib(4)","fib(2)","fib(1)"],localVars:{n:1},highlightLine:2,currentAction:"BASE CASE ✓",description:"Base case."},{step:12,nodeId:"n10",parentId:"n8",label:"fib(0)",type:"base_case",depth:3,functionName:"fib",arguments:{n:0},returnValue:0,callStack:["fib(5)","fib(4)","fib(2)","fib(0)"],localVars:{n:0},highlightLine:2,currentAction:"BASE CASE ✓",description:"Base case."},{step:13,nodeId:"n2r",parentId:"n1",label:"fib(4)↑",type:"return",depth:1,functionName:"fib",arguments:{n:4},returnValue:3,callStack:["fib(5)"],localVars:{n:4},highlightLine:3,currentAction:"fib(4) returns 3",description:"fib(4)=2+1=3."},{step:14,nodeId:"n11",parentId:"n1",label:"fib(3)",type:"call",depth:1,functionName:"fib",arguments:{n:3},returnValue:null,callStack:["fib(5)","fib(3)"],localVars:{n:3},highlightLine:3,currentAction:"⚠ fib(3) computed AGAIN!",description:"Another redundant computation!"},{step:15,nodeId:"n1r",parentId:null,label:"fib(5)↑",type:"return",depth:0,functionName:"fib",arguments:{n:5},returnValue:5,callStack:[],localVars:{n:5},highlightLine:3,currentAction:"✅ FINAL: fib(5) = 5",description:"fib(5)=3+2=5. Total calls: 15. With memoization: 9 calls!"}]
  },

  factorial: {
    problem:"Factorial(5) — linear recursion",
    problemType:"general",boardSize:0,
    timeComplexity:{best:"O(n)",average:"O(n)",worst:"O(n)",space:"O(n)",note:"Tail recursion optimizable to O(1) space"},
    generatedCode:`int fact(int n) {\n  if (n == 0) return 1;    // line 2\n  return n * fact(n-1);    // line 3\n}`,
    steps:[{step:1,nodeId:"n1",parentId:null,label:"fact(5)",type:"call",depth:0,functionName:"fact",arguments:{n:5},returnValue:null,callStack:["fact(5)"],localVars:{n:5},highlightLine:3,currentAction:"fact(5) called",description:"Linear recursion — only ONE call per level unlike fibonacci."},{step:2,nodeId:"n2",parentId:"n1",label:"fact(4)",type:"call",depth:1,functionName:"fact",arguments:{n:4},returnValue:null,callStack:["fact(5)","fact(4)"],localVars:{n:4},highlightLine:3,currentAction:"Calling fact(4)",description:"Stack grows."},{step:3,nodeId:"n3",parentId:"n2",label:"fact(3)",type:"call",depth:2,functionName:"fact",arguments:{n:3},returnValue:null,callStack:["fact(5)","fact(4)","fact(3)"],localVars:{n:3},highlightLine:3,currentAction:"Calling fact(3)",description:"Stack has 3 frames."},{step:4,nodeId:"n4",parentId:"n3",label:"fact(2)",type:"call",depth:3,functionName:"fact",arguments:{n:2},returnValue:null,callStack:["fact(5)","fact(4)","fact(3)","fact(2)"],localVars:{n:2},highlightLine:3,currentAction:"Calling fact(2)",description:"Going deeper."},{step:5,nodeId:"n5",parentId:"n4",label:"fact(1)",type:"call",depth:4,functionName:"fact",arguments:{n:1},returnValue:null,callStack:["fact(5)","fact(4)","fact(3)","fact(2)","fact(1)"],localVars:{n:1},highlightLine:3,currentAction:"Calling fact(1)",description:"Almost at base case!"},{step:6,nodeId:"n6",parentId:"n5",label:"fact(0)",type:"base_case",depth:5,functionName:"fact",arguments:{n:0},returnValue:1,callStack:["fact(5)","fact(4)","fact(3)","fact(2)","fact(1)","fact(0)"],localVars:{n:0},highlightLine:2,currentAction:"BASE CASE ✓ n=0, return 1",description:"BASE CASE! Unwinding phase begins!"},{step:7,nodeId:"n5r",parentId:"n4",label:"fact(1)↑",type:"return",depth:4,functionName:"fact",arguments:{n:1},returnValue:1,callStack:["fact(5)","fact(4)","fact(3)","fact(2)"],localVars:{n:1},highlightLine:3,currentAction:"fact(1) = 1×1 = 1",description:"Returning 1."},{step:8,nodeId:"n4r",parentId:"n3",label:"fact(2)↑",type:"return",depth:3,functionName:"fact",arguments:{n:2},returnValue:2,callStack:["fact(5)","fact(4)","fact(3)"],localVars:{n:2},highlightLine:3,currentAction:"fact(2) = 2×1 = 2",description:"Returning 2."},{step:9,nodeId:"n3r",parentId:"n2",label:"fact(3)↑",type:"return",depth:2,functionName:"fact",arguments:{n:3},returnValue:6,callStack:["fact(5)","fact(4)"],localVars:{n:3},highlightLine:3,currentAction:"fact(3) = 3×2 = 6",description:"Returning 6."},{step:10,nodeId:"n2r",parentId:"n1",label:"fact(4)↑",type:"return",depth:1,functionName:"fact",arguments:{n:4},returnValue:24,callStack:["fact(5)"],localVars:{n:4},highlightLine:3,currentAction:"fact(4) = 4×6 = 24",description:"Returning 24."},{step:11,nodeId:"n1r",parentId:null,label:"fact(5)↑",type:"return",depth:0,functionName:"fact",arguments:{n:5},returnValue:120,callStack:[],localVars:{n:5},highlightLine:3,currentAction:"✅ FINAL: fact(5) = 120",description:"fact(5)=120. Recursion DIVES DOWN then BUBBLES UP multiplying."}]
  },

  nqueens: {
    problem:"N-Queens (n=4) — backtracking on chessboard",
    problemType:"nqueens",boardSize:4,
    timeComplexity:{best:"O(n!)",average:"O(n!)",worst:"O(n^n)",space:"O(n)",note:"With pruning much faster in practice. For n=8: 92 solutions"},
    generatedCode:`void solve(vector<int>& board, int col, int n) {\n  if (col == n) { /* solution! */ return; }  // line 2\n  for (int row = 0; row < n; row++) {        // line 3\n    if (isSafe(board, row, col, n)) {        // line 4\n      board[col] = row;   // place queen     // line 5\n      solve(board, col+1, n);  // recurse    // line 6\n      board[col] = -1;  // backtrack         // line 7\n    }\n  }\n}`,
    steps:[
      {
        step:1,nodeId:"n1",parentId:null,label:"solve(col=0)",
        type:"call",depth:0,functionName:"solve",
        arguments:{col:0,n:4},returnValue:null,
        callStack:["solve(0)"],localVars:{col:0,n:4},
        highlightLine:3,
        boardState:[
          [".",".",".","."],
          [".",".",".","."],
          [".",".",".","."],
          [".",".",".","."]
        ],
        currentAction:"Start: empty 4×4 board, try column 0",
        description:"Board is empty. We try placing a queen in each row of column 0 one by one. For each safe position, we recurse to the next column."
      },
      {
        step:2,nodeId:"n2",parentId:"n1",label:"try row=0 col=0",
        type:"explore",depth:1,functionName:"solve",
        arguments:{col:0,row:0},returnValue:null,
        callStack:["solve(0)"],localVars:{col:0,row:0},
        highlightLine:5,
        boardState:[
          ["Q",".",".","."],
          [".",".",".","."],
          [".",".",".","."],
          [".",".",".","."]
        ],
        currentAction:"Place queen at (row=0, col=0) ✓",
        description:"Board is empty so (0,0) is safe. We place queen at row 0 col 0. Now recurse to column 1."
      },
      {
        step:3,nodeId:"n3",parentId:"n2",label:"solve(col=1)",
        type:"call",depth:2,functionName:"solve",
        arguments:{col:1,n:4},returnValue:null,
        callStack:["solve(0)","solve(1)"],localVars:{col:1},
        highlightLine:3,
        boardState:[
          ["Q",".",".","."],
          [".",".",".","."],
          [".",".",".","."],
          [".",".",".","."]
        ],
        currentAction:"Column 1: queen at (0,0) blocks row 0 and diagonals",
        description:"Queen at (0,0) threatens row 0 AND diagonal cells (1,1). Try row 2."
      },
      {
        step:4,nodeId:"n4",parentId:"n3",label:"row=1 blocked",
        type:"prune",depth:3,functionName:"solve",
        arguments:{col:1,row:1},returnValue:null,
        callStack:["solve(0)","solve(1)"],localVars:{col:1,row:1},
        highlightLine:4,
        boardState:[
          ["Q",".",".","."],
          [".",".",".","."],
          [".",".",".","."],
          [".",".",".","."]
        ],
        currentAction:"❌ row=1 col=1 is on diagonal from (0,0)",
        description:"(0,0) and (1,1): |row diff|=1, |col diff|=1 → DIAGONAL. Blocked!"
      },
      {
        step:5,nodeId:"n5",parentId:"n3",label:"try row=2 col=1",
        type:"explore",depth:3,functionName:"solve",
        arguments:{col:1,row:2},returnValue:null,
        callStack:["solve(0)","solve(1)"],localVars:{col:1,row:2},
        highlightLine:5,
        boardState:[
          ["Q",".",".","."],
          [".",".",".","."],
          [".","Q",".","."],
          [".",".",".","."]
        ],
        currentAction:"Place queen at (row=2, col=1) ✓",
        description:"(0,0) vs (2,1): |row diff|=2, |col diff|=1 — NOT diagonal! Safe. Place queen."
      },
      {
        step:6,nodeId:"n6",parentId:"n5",label:"solve(col=2)",
        type:"call",depth:4,functionName:"solve",
        arguments:{col:2,n:4},returnValue:null,
        callStack:["solve(0)","solve(1)","solve(2)"],localVars:{col:2},
        highlightLine:3,
        boardState:[
          ["Q",".",".","."],
          [".",".",".","."],
          [".","Q",".","."],
          [".",".",".","."]
        ],
        currentAction:"Column 2: all rows blocked by queens at (0,0) and (2,1)",
        description:"Queens at (0,0) and (2,1) together block ALL rows in col 2. This is a dead end!"
      },
      {
        step:7,nodeId:"n7",parentId:"n5",label:"❌ dead end",
        type:"prune",depth:5,functionName:"solve",
        arguments:{col:2,blocked:"all"},returnValue:null,
        callStack:["solve(0)","solve(1)","solve(2)"],localVars:{col:2},
        highlightLine:4,
        boardState:[
          ["Q",".",".","."],
          [".",".",".","."],
          [".","Q",".","."],
          [".",".",".","."]
        ],
        currentAction:"❌ Every row in col 2 is threatened!",
        description:"No valid placement exists in col 2. Must backtrack — remove queen from (2,1) and try next row."
      },
      {
        step:8,nodeId:"n8",parentId:"n3",label:"↩ backtrack (2,1)",
        type:"backtrack",depth:3,functionName:"solve",
        arguments:{col:1,removing:"row=2"},returnValue:null,
        callStack:["solve(0)","solve(1)"],localVars:{col:1,row:2},
        highlightLine:7,
        boardState:[
          ["Q",".",".","."],
          [".",".",".","."],
          [".",".",".","."],
          [".",".",".","."]
        ],
        currentAction:"↩ Remove queen from (2,1) — try row=3",
        description:"BACKTRACKING! board[col]=-1 removes the queen. This is the core of backtracking — undo your last choice and try the next option."
      },
      {
        step:9,nodeId:"n9",parentId:"n3",label:"try row=3 col=1",
        type:"explore",depth:3,functionName:"solve",
        arguments:{col:1,row:3},returnValue:null,
        callStack:["solve(0)","solve(1)"],localVars:{col:1,row:3},
        highlightLine:5,
        boardState:[
          ["Q",".",".","."],
          [".",".",".","."],
          [".",".",".","."],
          [".","Q",".","."]
        ],
        currentAction:"Place queen at (row=3, col=1) ✓",
        description:"(0,0) vs (3,1): |row diff|=3, |col diff|=1 — NOT diagonal. Safe! Place queen."
      },
      {
        step:10,nodeId:"n10",parentId:"n9",label:"solve(col=2)",
        type:"call",depth:4,functionName:"solve",
        arguments:{col:2,n:4},returnValue:null,
        callStack:["solve(0)","solve(1)","solve(2)"],localVars:{col:2},
        highlightLine:3,
        boardState:[
          ["Q",".",".","."],
          [".",".",".","."],
          [".",".",".","."],
          [".","Q",".","."]
        ],
        currentAction:"Column 2: try each row with queens at (0,0) and (3,1)",
        description:"Now try col 2 with new configuration. Row 0: blocked by queen at (0,0). Row 1: check diagonals..."
      },
      {
        step:11,nodeId:"n11",parentId:"n10",label:"try row=1 col=2",
        type:"explore",depth:5,functionName:"solve",
        arguments:{col:2,row:1},returnValue:null,
        callStack:["solve(0)","solve(1)","solve(2)"],localVars:{col:2,row:1},
        highlightLine:5,
        boardState:[
          ["Q",".",".","."],
          [".",".","Q","."],
          [".",".",".","."],
          [".","Q",".","."]
        ],
        currentAction:"Place queen at (row=1, col=2) ✓",
        description:"(0,0) vs (1,2): |diff|=1 vs 2 — safe. (3,1) vs (1,2): |diff|=2 vs 1 — safe. Place queen!"
      },
      {
        step:12,nodeId:"n12",parentId:"n11",label:"solve(col=3)",
        type:"call",depth:6,functionName:"solve",
        arguments:{col:3,n:4},returnValue:null,
        callStack:["solve(0)","solve(1)","solve(2)","solve(3)"],localVars:{col:3},
        highlightLine:3,
        boardState:[
          ["Q",".",".","."],
          [".",".","Q","."],
          [".",".",".","."],
          [".","Q",".","."]
        ],
        currentAction:"Column 3: last column! Try each row",
        description:"3 queens placed. Need 1 more in col 3. Try row 2..."
      },
      {
        step:13,nodeId:"n13",parentId:"n12",label:"try row=2 col=3",
        type:"explore",depth:7,functionName:"solve",
        arguments:{col:3,row:2},returnValue:null,
        callStack:["solve(0)","solve(1)","solve(2)","solve(3)"],localVars:{col:3,row:2},
        highlightLine:5,
        boardState:[
          ["Q",".",".","."],
          [".",".","Q","."],
          [".",".",".","Q"],
          [".","Q",".","."]
        ],
        currentAction:"Place queen at (row=2, col=3) ✓",
        description:"Check all 3 queens: (0,0)vs(2,3)→diffs 2,3 ✓. (1,2)vs(2,3)→diffs 1,1 ✗ WAIT — this is diagonal! Let me check row 3..."
      },
      {
        step:14,nodeId:"n14",parentId:"n12",label:"↩ (2,3) diagonal!",
        type:"backtrack",depth:7,functionName:"solve",
        arguments:{col:3,row:2},returnValue:null,
        callStack:["solve(0)","solve(1)","solve(2)","solve(3)"],localVars:{col:3,row:2},
        highlightLine:7,
        boardState:[
          ["Q",".",".","."],
          [".",".","Q","."],
          [".",".",".","."],
          [".","Q",".","."]
        ],
        currentAction:"❌ (2,3) is diagonal from (1,2) — backtrack!",
        description:"(1,2) and (2,3): |row diff|=1, |col diff|=1 → DIAGONAL! Remove and try row 3."
      },
      {
        step:15,nodeId:"n15",parentId:"n12",label:"row 3 also blocked",
        type:"prune",depth:7,functionName:"solve",
        arguments:{col:3,row:3},returnValue:null,
        callStack:["solve(0)","solve(1)","solve(2)","solve(3)"],localVars:{col:3,row:3},
        highlightLine:4,
        boardState:[
          ["Q",".",".","."],
          [".",".","Q","."],
          [".",".",".","."],
          [".","Q",".","."]
        ],
        currentAction:"❌ row=3 col=3 — same row as queen (3,1)!",
        description:"Row 3 already has a queen. Col 3 has no valid row — backtrack further."
      },
      {
        step:16,nodeId:"n16",parentId:"n3",label:"↩ backtrack col=1",
        type:"backtrack",depth:3,functionName:"solve",
        arguments:{col:1},returnValue:null,
        callStack:["solve(0)","solve(1)"],localVars:{col:1},
        highlightLine:7,
        boardState:[
          ["Q",".",".","."],
          [".",".",".","."],
          [".",".",".","."],
          [".",".",".","."]
        ],
        currentAction:"↩ All rows in col 1 exhausted — backtrack to col 0",
        description:"With queen at (0,0), no valid arrangement exists. Backtrack to col 0 and try row 1."
      },
      {
        step:17,nodeId:"n17",parentId:"n1",label:"try row=1 col=0",
        type:"explore",depth:1,functionName:"solve",
        arguments:{col:0,row:1},returnValue:null,
        callStack:["solve(0)"],localVars:{col:0,row:1},
        highlightLine:5,
        boardState:[
          [".",".",".","."],
          ["Q",".",".","."],
          [".",".",".","."],
          [".",".",".","."]
        ],
        currentAction:"Place queen at (row=1, col=0) — try fresh start",
        description:"New starting position! Queen at row 1 col 0. Now recurse to col 1 with different configuration."
      },
      {
        step:18,nodeId:"n18",parentId:"n17",label:"place (3,1)",
        type:"explore",depth:3,functionName:"solve",
        arguments:{col:1,row:3},returnValue:null,
        callStack:["solve(0)","solve(1)"],localVars:{col:1,row:3},
        highlightLine:5,
        boardState:[
          [".",".",".","."],
          ["Q",".",".","."],
          [".",".",".","."],
          [".","Q",".","."]
        ],
        currentAction:"Place queen at (row=3, col=1) ✓",
        description:"(1,0) vs (3,1): |diff|=2,1 — safe. Progress!"
      },
      {
        step:19,nodeId:"n19",parentId:"n18",label:"place (0,2)",
        type:"explore",depth:5,functionName:"solve",
        arguments:{col:2,row:0},returnValue:null,
        callStack:["solve(0)","solve(1)","solve(2)"],localVars:{col:2,row:0},
        highlightLine:5,
        boardState:[
          [".",".","Q","."],
          ["Q",".",".","."],
          [".",".",".","."],
          [".","Q",".","."]
        ],
        currentAction:"Place queen at (row=0, col=2) ✓",
        description:"(1,0)vs(0,2): diffs 1,2 — safe. (3,1)vs(0,2): diffs 3,1 — safe. Excellent!"
      },
      {
        step:20,nodeId:"n20",parentId:"n19",label:"place (2,3)",
        type:"explore",depth:7,functionName:"solve",
        arguments:{col:3,row:2},returnValue:null,
        callStack:["solve(0)","solve(1)","solve(2)","solve(3)"],localVars:{col:3,row:2},
        highlightLine:5,
        boardState:[
          [".",".","Q","."],
          ["Q",".",".","."],
          [".",".",".","Q"],
          [".","Q",".","."]
        ],
        currentAction:"Place queen at (row=2, col=3) ✓",
        description:"Check all pairs: (0,2)vs(2,3)→diffs 2,1 ✓. (1,0)vs(2,3)→diffs 1,3 ✓. (3,1)vs(2,3)→diffs 1,2 ✓. ALL SAFE!"
      },
      {
        step:21,nodeId:"n21",parentId:"n20",label:"✅ SOLUTION!",
        type:"base_case",depth:8,functionName:"solve",
        arguments:{col:4,n:4},returnValue:"found",
        callStack:["solve(4)"],localVars:{col:4,n:4},
        highlightLine:2,
        boardState:[
          [".",".","Q","."],
          ["Q",".",".","."],
          [".",".",".","Q"],
          [".","Q",".","."]
        ],
        currentAction:"✅ col==n=4! All 4 queens placed safely!",
        description:"VALID SOLUTION: Queens at (0,2),(1,0),(2,3),(3,1). Verify: no two queens share row, column, or diagonal. col==n means ALL queens placed — base case reached!"
      }
    ]
  },

  ratmaze: {
    problem:"Rat in Maze (4×4) — pathfinding with backtracking",
    problemType:"maze",boardSize:4,
    timeComplexity:{best:"O(1)",average:"O(2^(n²))",worst:"O(2^(n²))",space:"O(n²)",note:"Best case: immediate path found. Worst: explore all dead ends"},
    generatedCode:`bool solve(int maze[][], int x, int y, int n) {\n  if (x==n-1 && y==n-1) return true; // line 2\n  if (!isSafe(maze,x,y,n)) return false; // line 3\n  maze[x][y] = 2; // mark visited    // line 4\n  if (solve(maze,x+1,y,n)) return true; // line 5 DOWN\n  if (solve(maze,x,y+1,n)) return true; // line 6 RIGHT\n  maze[x][y] = 0; // backtrack       // line 7\n  return false;\n}`,
    steps:[
  {
    step:1,nodeId:"n1",parentId:null,label:"solve(0,0)",
    type:"call",depth:0,functionName:"solve",
    arguments:{x:0,y:0},returnValue:null,
    callStack:["solve(0,0)"],localVars:{x:0,y:0},
    highlightLine:4,
    boardState:[
      [2,0,0,0],
      [1,1,0,1],
      [0,1,0,0],
      [0,1,1,1]
    ],
    currentAction:"🐀 Rat at (0,0) — mark as current position",
    description:"Maze values: 0=wall(black), 1=open path, 2=rat here(yellow), 3=correct path(green). Rat starts at top-left (0,0). Try DOWN first."
  },
  {
    step:2,nodeId:"n2",parentId:"n1",label:"try DOWN (1,0)",
    type:"call",depth:1,functionName:"solve",
    arguments:{x:1,y:0},returnValue:null,
    callStack:["solve(0,0)","solve(1,0)"],localVars:{x:1,y:0},
    highlightLine:5,
    boardState:[
      [3,0,0,0],
      [2,1,0,1],
      [0,1,0,0],
      [0,1,1,1]
    ],
    currentAction:"Move DOWN: (0,0)→(1,0). Mark (0,0) as path ✓",
    description:"maze[1][0]=1 is open. Mark (0,0) as correct path (3). Rat moves to (1,0). Try DOWN again from (1,0)."
  },
  {
    step:3,nodeId:"n3",parentId:"n2",label:"(2,0) is WALL",
    type:"prune",depth:2,functionName:"solve",
    arguments:{x:2,y:0},returnValue:false,
    callStack:["solve(0,0)","solve(1,0)","solve(2,0)"],localVars:{x:2,y:0},
    highlightLine:3,
    boardState:[
      [3,0,0,0],
      [2,1,0,1],
      [0,1,0,0],
      [0,1,1,1]
    ],
    currentAction:"❌ (2,0) = 0 = WALL! Cannot move down",
    description:"maze[2][0]=0 is a wall. isSafe returns false immediately. Return false. Try RIGHT from (1,0) instead."
  },
  {
    step:4,nodeId:"n4",parentId:"n2",label:"try RIGHT (1,1)",
    type:"call",depth:2,functionName:"solve",
    arguments:{x:1,y:1},returnValue:null,
    callStack:["solve(0,0)","solve(1,0)","solve(1,1)"],localVars:{x:1,y:1},
    highlightLine:6,
    boardState:[
      [3,0,0,0],
      [3,2,0,1],
      [0,1,0,0],
      [0,1,1,1]
    ],
    currentAction:"Move RIGHT: (1,0)→(1,1). Mark (1,0) as path ✓",
    description:"maze[1][1]=1 is open! Mark (1,0) as path. Rat at (1,1). Try DOWN."
  },
  {
    step:5,nodeId:"n5",parentId:"n4",label:"try DOWN (2,1)",
    type:"call",depth:3,functionName:"solve",
    arguments:{x:2,y:1},returnValue:null,
    callStack:["solve(0,0)","solve(1,0)","solve(1,1)","solve(2,1)"],localVars:{x:2,y:1},
    highlightLine:5,
    boardState:[
      [3,0,0,0],
      [3,3,0,1],
      [0,2,0,0],
      [0,1,1,1]
    ],
    currentAction:"Move DOWN: (1,1)→(2,1) ✓",
    description:"maze[2][1]=1 is open. Keep going down!"
  },
  {
    step:6,nodeId:"n6",parentId:"n5",label:"try DOWN (3,1)",
    type:"call",depth:4,functionName:"solve",
    arguments:{x:3,y:1},returnValue:null,
    callStack:["solve(0,0)","solve(1,0)","solve(1,1)","solve(2,1)","solve(3,1)"],localVars:{x:3,y:1},
    highlightLine:5,
    boardState:[
      [3,0,0,0],
      [3,3,0,1],
      [0,3,0,0],
      [0,2,1,1]
    ],
    currentAction:"Move DOWN: (2,1)→(3,1) ✓ — last row!",
    description:"maze[3][1]=1. Now in last row! Destination (3,3) is to the right."
  },
  {
    step:7,nodeId:"n7",parentId:"n6",label:"(4,1) out of bounds",
    type:"prune",depth:5,functionName:"solve",
    arguments:{x:4,y:1},returnValue:false,
    callStack:["solve(3,1)","solve(4,1)"],localVars:{x:4,y:1},
    highlightLine:2,
    boardState:[
      [3,0,0,0],
      [3,3,0,1],
      [0,3,0,0],
      [0,2,1,1]
    ],
    currentAction:"❌ (4,1) out of bounds! Try RIGHT",
    description:"x=4 >= n=4 means out of bounds. Return false. Try RIGHT from (3,1)."
  },
  {
    step:8,nodeId:"n8",parentId:"n6",label:"try RIGHT (3,2)",
    type:"call",depth:5,functionName:"solve",
    arguments:{x:3,y:2},returnValue:null,
    callStack:["solve(0,0)","solve(1,0)","solve(1,1)","solve(2,1)","solve(3,1)","solve(3,2)"],localVars:{x:3,y:2},
    highlightLine:6,
    boardState:[
      [3,0,0,0],
      [3,3,0,1],
      [0,3,0,0],
      [0,3,2,1]
    ],
    currentAction:"Move RIGHT: (3,1)→(3,2) ✓",
    description:"maze[3][2]=1. Moving right along the bottom row. Destination is (3,3) — one more step!"
  },
  {
    step:9,nodeId:"n9",parentId:"n8",label:"try RIGHT (3,3)",
    type:"call",depth:6,functionName:"solve",
    arguments:{x:3,y:3},returnValue:null,
    callStack:["solve(0,0)","solve(1,0)","solve(1,1)","solve(2,1)","solve(3,1)","solve(3,2)","solve(3,3)"],localVars:{x:3,y:3},
    highlightLine:6,
    boardState:[
      [3,0,0,0],
      [3,3,0,1],
      [0,3,0,0],
      [0,3,3,2]
    ],
    currentAction:"🐀 Rat reaches (3,3) — checking destination...",
    description:"maze[3][3]=1 is open. Check base case: x==3 && y==3 is TRUE!"
  },
  {
    step:10,nodeId:"n10",parentId:"n9",label:"✅ DESTINATION!",
    type:"base_case",depth:6,functionName:"solve",
    arguments:{x:3,y:3},returnValue:true,
    callStack:["solve(3,3)"],localVars:{x:3,y:3},
    highlightLine:2,
    boardState:[
      [3,0,0,0],
      [3,3,0,1],
      [0,3,0,0],
      [0,3,3,3]
    ],
    currentAction:"✅ x==3 && y==3 — DESTINATION REACHED!",
    description:"BASE CASE: x==n-1 && y==n-1 is true! Return true. This true propagates back through ALL recursive calls. The green path shows the complete solution: (0,0)→(1,0)→(1,1)→(2,1)→(3,1)→(3,2)→(3,3)"
  }
]
  },

  hanoi: {
    problem:"Tower of Hanoi (3 disks)",
    problemType:"general",boardSize:0,
    timeComplexity:{best:"O(2^n)",average:"O(2^n)",worst:"O(2^n)",space:"O(n)",note:"Always exactly 2^n - 1 moves. Mathematically proven minimum"},
    generatedCode:`void hanoi(int n, char from, char to, char aux) {\n  if (n == 0) return;                        // line 2\n  hanoi(n-1, from, aux, to);  // move top   // line 3\n  // move disk n: from->to                   // line 4\n  hanoi(n-1, aux, to, from);  // restore    // line 5\n}`,
    steps:[{step:1,nodeId:"n1",parentId:null,label:"hanoi(3,A→C)",type:"call",depth:0,functionName:"hanoi",arguments:{n:3,from:"A",to:"C",aux:"B"},returnValue:null,callStack:["hanoi(3,A→C)"],localVars:{n:3},highlightLine:3,currentAction:"Move 3 disks A→C using B",description:"Min moves = 2^3-1 = 7. Strategy: move top 2 to B, move disk 3 to C, move top 2 to C."},{step:2,nodeId:"n2",parentId:"n1",label:"hanoi(2,A→B)",type:"call",depth:1,functionName:"hanoi",arguments:{n:2,from:"A",to:"B",aux:"C"},returnValue:null,callStack:["hanoi(3,A→C)","hanoi(2,A→B)"],localVars:{n:2},highlightLine:3,currentAction:"Move top 2 from A to B",description:"Free the largest disk first."},{step:3,nodeId:"n3",parentId:"n2",label:"hanoi(1,A→C)",type:"call",depth:2,functionName:"hanoi",arguments:{n:1,from:"A",to:"C",aux:"B"},returnValue:null,callStack:["hanoi(3,A→C)","hanoi(2,A→B)","hanoi(1,A→C)"],localVars:{n:1},highlightLine:3,currentAction:"Disk 1: A→C",description:"Smallest disk moves."},{step:4,nodeId:"n4",parentId:"n3",label:"n=0",type:"base_case",depth:3,functionName:"hanoi",arguments:{n:0},returnValue:null,callStack:["hanoi(0)"],localVars:{n:0},highlightLine:2,currentAction:"BASE CASE: n=0, nothing to move",description:"n=0: return immediately."},{step:5,nodeId:"n5",parentId:"n2",label:"MOVE disk2 A→B",type:"explore",depth:2,functionName:"hanoi",arguments:{move:"disk2: A→B"},returnValue:null,callStack:["hanoi(3,A→C)","hanoi(2,A→B)"],localVars:{disk:2},highlightLine:4,currentAction:"📦 Move disk 2: A→B",description:"Actual move happens between two recursive calls."},{step:6,nodeId:"n6",parentId:"n2",label:"hanoi(1,C→B)",type:"call",depth:2,functionName:"hanoi",arguments:{n:1,from:"C",to:"B"},returnValue:null,callStack:["hanoi(3,A→C)","hanoi(2,A→B)","hanoi(1,C→B)"],localVars:{n:1},highlightLine:5,currentAction:"Disk 1: C→B",description:"Small disk C→B."},{step:7,nodeId:"n7",parentId:"n1",label:"MOVE disk3 A→C",type:"explore",depth:1,functionName:"hanoi",arguments:{move:"disk3: A→C"},returnValue:null,callStack:["hanoi(3,A→C)"],localVars:{disk:3},highlightLine:4,currentAction:"📦 Move LARGEST disk 3: A→C",description:"Largest disk finally moves!"},{step:8,nodeId:"n8",parentId:"n1",label:"hanoi(2,B→C)",type:"call",depth:1,functionName:"hanoi",arguments:{n:2,from:"B",to:"C",aux:"A"},returnValue:null,callStack:["hanoi(3,A→C)","hanoi(2,B→C)"],localVars:{n:2},highlightLine:5,currentAction:"Move top 2 from B to C",description:"Final subproblem."},{step:9,nodeId:"n9",parentId:"n8",label:"✅ 7 moves done!",type:"return",depth:0,functionName:"hanoi",arguments:{n:3},returnValue:"done",callStack:[],localVars:{},highlightLine:2,currentAction:"✅ All 3 disks on C! Done in 7 moves",description:"7 = 2^3-1. Always minimum. Elegant 3-line solution!"}]
  },

  binarysearch: {
    problem:"Binary Search — find 7 in {1,3,5,7,9,11}",
    problemType:"general",boardSize:0,
    timeComplexity:{best:"O(1)",average:"O(log n)",worst:"O(log n)",space:"O(log n)",note:"Iterative version has O(1) space. Array must be sorted!"},
    generatedCode:`int bs(vector<int>& arr, int lo, int hi, int t) {\n  if (lo > hi) return -1;          // line 2\n  int mid = lo + (hi-lo)/2;        // line 3\n  if (arr[mid] == t) return mid;   // line 4\n  if (arr[mid] < t)                // line 5\n    return bs(arr, mid+1, hi, t);  // line 6\n  return bs(arr, lo, mid-1, t);    // line 7\n}`,
    steps:[{step:1,nodeId:"n1",parentId:null,label:"bs(0,5)",type:"call",depth:0,functionName:"bs",arguments:{lo:0,hi:5,target:7},returnValue:null,callStack:["bs(0,5)"],localVars:{lo:0,hi:5,mid:2,arr_mid:5},highlightLine:3,currentAction:"Search [1,3,5,7,9,11]: mid=arr[2]=5",description:"mid=2, arr[2]=5. Target 7>5, go RIGHT. Eliminates half! O(log n)."},{step:2,nodeId:"n2",parentId:"n1",label:"bs(3,5)",type:"call",depth:1,functionName:"bs",arguments:{lo:3,hi:5,target:7},returnValue:null,callStack:["bs(0,5)","bs(3,5)"],localVars:{lo:3,hi:5,mid:4,arr_mid:9},highlightLine:3,currentAction:"Search right half: mid=arr[4]=9",description:"mid=4, arr[4]=9. Target 7<9, go LEFT."},{step:3,nodeId:"n3",parentId:"n2",label:"bs(3,3)",type:"call",depth:2,functionName:"bs",arguments:{lo:3,hi:3,target:7},returnValue:null,callStack:["bs(0,5)","bs(3,5)","bs(3,3)"],localVars:{lo:3,hi:3,mid:3,arr_mid:7},highlightLine:4,currentAction:"Search [7]: mid=arr[3]=7 — FOUND!",description:"Single element. arr[3]=7=target! Found in 3 comparisons. O(log n) vs O(n)!"},{step:4,nodeId:"n4",parentId:"n2",label:"✅ return 3",type:"base_case",depth:2,functionName:"bs",arguments:{lo:3,hi:3},returnValue:3,callStack:["bs(0,5)","bs(3,5)"],localVars:{index:3},highlightLine:4,currentAction:"✅ FOUND at index 3!",description:"Return index 3. 7 is at arr[3]."}]
  },

  mergesort: {
    problem:"Merge Sort — sort {5,3,8,1}",
    problemType:"general",boardSize:0,
    timeComplexity:{best:"O(n log n)",average:"O(n log n)",worst:"O(n log n)",space:"O(n)",note:"Always O(n log n) — best comparison sort guarantee. Not in-place."},
    generatedCode:`void mergeSort(vector<int>& arr, int l, int r) {\n  if (l >= r) return;              // line 2\n  int m = l + (r-l)/2;            // line 3\n  mergeSort(arr, l, m);           // line 4\n  mergeSort(arr, m+1, r);         // line 5\n  merge(arr, l, m, r);            // line 6\n}`,
    steps:[{step:1,nodeId:"n1",parentId:null,label:"sort[0,3]",type:"call",depth:0,functionName:"mergeSort",arguments:{l:0,r:3,arr:"[5,3,8,1]"},returnValue:null,callStack:["sort(0,3)"],localVars:{l:0,r:3,m:1},highlightLine:4,currentAction:"Sort [5,3,8,1] — split at mid=1",description:"DIVIDE: split into [5,3] and [8,1]. Keep splitting until single elements, then MERGE."},{step:2,nodeId:"n2",parentId:"n1",label:"sort[0,1]",type:"call",depth:1,functionName:"mergeSort",arguments:{l:0,r:1,arr:"[5,3]"},returnValue:null,callStack:["sort(0,3)","sort(0,1)"],localVars:{l:0,r:1},highlightLine:4,currentAction:"Sort left half [5,3]",description:"Split [5,3] into [5] and [3]."},{step:3,nodeId:"n3",parentId:"n2",label:"BASE [5]",type:"base_case",depth:2,functionName:"mergeSort",arguments:{l:0,r:0},returnValue:null,callStack:["sort(0,1)","sort(0,0)"],localVars:{l:0,r:0},highlightLine:2,currentAction:"BASE CASE ✓ single element [5]",description:"Single element is sorted."},{step:4,nodeId:"n4",parentId:"n2",label:"BASE [3]",type:"base_case",depth:2,functionName:"mergeSort",arguments:{l:1,r:1},returnValue:null,callStack:["sort(0,1)","sort(1,1)"],localVars:{l:1,r:1},highlightLine:2,currentAction:"BASE CASE ✓ single element [3]",description:"Single element."},{step:5,nodeId:"n5",parentId:"n2",label:"MERGE→[3,5]",type:"return",depth:1,functionName:"merge",arguments:{arr:"[5,3]"},returnValue:"[3,5]",callStack:["sort(0,3)"],localVars:{merged:"[3,5]"},highlightLine:6,currentAction:"MERGE [5]+[3] → [3,5]",description:"Compare: 3<5, put 3 first. Sorted [3,5]!"},{step:6,nodeId:"n6",parentId:"n1",label:"sort[2,3]",type:"call",depth:1,functionName:"mergeSort",arguments:{l:2,r:3,arr:"[8,1]"},returnValue:null,callStack:["sort(0,3)","sort(2,3)"],localVars:{l:2,r:3},highlightLine:5,currentAction:"Sort right half [8,1]",description:"Now sort [8,1]."},{step:7,nodeId:"n7",parentId:"n6",label:"MERGE→[1,8]",type:"return",depth:1,functionName:"merge",arguments:{arr:"[8,1]"},returnValue:"[1,8]",callStack:["sort(0,3)"],localVars:{merged:"[1,8]"},highlightLine:6,currentAction:"MERGE [8]+[1] → [1,8]",description:"1<8, sorted!"},{step:8,nodeId:"n8",parentId:"n1",label:"✅ [1,3,5,8]",type:"base_case",depth:0,functionName:"merge",arguments:{arr:"[3,5]+[1,8]"},returnValue:"[1,3,5,8]",callStack:[],localVars:{result:"[1,3,5,8]"},highlightLine:6,currentAction:"✅ FINAL: [3,5]+[1,8] → [1,3,5,8]",description:"Compare and merge: 1<3→1, 3<8→3, 5<8→5, 8→8. SORTED!"}]
  },

  subsetsum: {
    problem:"Subset Sum — subsets of {1,2,3,4} summing to 5",
    problemType:"general",boardSize:0,
    timeComplexity:{best:"O(1)",average:"O(2^n)",worst:"O(2^n)",space:"O(n)",note:"Each element: include or exclude. 2^n subsets total. Pruning cuts branches early."},
    generatedCode:`void solve(vector<int>& a, int i, int t, vector<int>& cur) {\n  if (t == 0) { /* found! */ return; }  // line 2\n  if (i>=a.size() || t<0) return;       // line 3\n  cur.push_back(a[i]);                  // line 4 include\n  solve(a, i+1, t-a[i], cur);          // line 5\n  cur.pop_back();                       // line 6 exclude\n  solve(a, i+1, t, cur);               // line 7\n}`,
    steps:[{step:1,nodeId:"n1",parentId:null,label:"solve(0,t=5)",type:"call",depth:0,functionName:"solve",arguments:{i:0,target:5,current:"[]"},returnValue:null,callStack:["solve(0,5)"],localVars:{i:0,target:5,current:"[]"},highlightLine:4,currentAction:"Include a[0]=1? target becomes 4",description:"Classic include/exclude pattern. Include 1 → target=4. Exclude 1 → target stays 5."},{step:2,nodeId:"n2",parentId:"n1",label:"solve(1,t=4)",type:"call",depth:1,functionName:"solve",arguments:{i:1,target:4,current:"[1]"},returnValue:null,callStack:["solve(0,5)","solve(1,4)"],localVars:{i:1,target:4,current:"[1]"},highlightLine:4,currentAction:"Included 1, include a[1]=2?",description:"target=4. Include 2 → target=2."},{step:3,nodeId:"n3",parentId:"n2",label:"solve(2,t=2)",type:"call",depth:2,functionName:"solve",arguments:{i:2,target:2,current:"[1,2]"},returnValue:null,callStack:["solve(0,5)","solve(1,4)","solve(2,2)"],localVars:{i:2,target:2,current:"[1,2]"},highlightLine:4,currentAction:"Include a[2]=3? target=-1!",description:"Include 3? But 3>2 so target becomes negative!"},{step:4,nodeId:"n4",parentId:"n3",label:"PRUNE t<0",type:"prune",depth:3,functionName:"solve",arguments:{i:3,target:-1},returnValue:null,callStack:["solve(2,2)","solve(3,-1)"],localVars:{target:-1},highlightLine:3,currentAction:"❌ target=-1 < 0, prune!",description:"Including 3 went negative. PRUNE — impossible to reach 0."},{step:5,nodeId:"n5",parentId:"n2",label:"solve(2,t=4)",type:"call",depth:2,functionName:"solve",arguments:{i:2,target:4,current:"[1]"},returnValue:null,callStack:["solve(0,5)","solve(1,4)","solve(2,4)"],localVars:{i:2,target:4,current:"[1]"},highlightLine:4,currentAction:"Exclude 2, include a[2]=3",description:"Backtracked from 2. Try including 3. [1], target=4."},{step:6,nodeId:"n6",parentId:"n5",label:"solve(3,t=1)",type:"call",depth:3,functionName:"solve",arguments:{i:3,target:1,current:"[1,3]"},returnValue:null,callStack:["solve(0,5)","solve(1,4)","solve(2,4)","solve(3,1)"],localVars:{i:3,target:1,current:"[1,3]"},highlightLine:4,currentAction:"Include a[3]=4? target=-3!",description:"4>1, would go negative. Prune."},{step:7,nodeId:"n7",parentId:"n1",label:"solve(1,t=5)",type:"call",depth:1,functionName:"solve",arguments:{i:1,target:5,current:"[]"},returnValue:null,callStack:["solve(0,5)","solve(1,5)"],localVars:{i:1,target:5,current:"[]"},highlightLine:4,currentAction:"Exclude 1, try from index 1",description:"Backtrack: exclude 1. Try subsets from index 1 with target=5."},{step:8,nodeId:"n8",parentId:"n7",label:"solve(2,t=3)",type:"call",depth:2,functionName:"solve",arguments:{i:2,target:3,current:"[2]"},returnValue:null,callStack:["solve(0,5)","solve(1,5)","solve(2,3)"],localVars:{i:2,target:3,current:"[2]"},highlightLine:4,currentAction:"Include 2, include a[2]=3?",description:"target=3. Include 3 → target=0!"},{step:9,nodeId:"n9",parentId:"n8",label:"✅ FOUND {2,3}!",type:"base_case",depth:3,functionName:"solve",arguments:{i:3,target:0,current:"[2,3]"},returnValue:"found",callStack:["solve(3,0)"],localVars:{target:0,current:"[2,3]"},highlightLine:2,currentAction:"✅ target=0! Found {2,3}=5",description:"TARGET=0! {2,3} sums to 5. Also {1,4} exists — algorithm continues to find all solutions."}]
  },

  permutations: {
    problem:"Permutations of {1,2,3}",
    problemType:"general",boardSize:0,
    timeComplexity:{best:"O(n×n!)",average:"O(n×n!)",worst:"O(n×n!)",space:"O(n)",note:"3!=6 permutations, 4!=24, 5!=120. Grows very fast!"},
    generatedCode:`void permute(vector<int>& arr, int start) {\n  if (start == arr.size()) { print; return; } // line 2\n  for (int i = start; i < arr.size(); i++) {  // line 3\n    swap(arr[start], arr[i]);    // choose      // line 4\n    permute(arr, start+1);       // explore     // line 5\n    swap(arr[start], arr[i]);    // backtrack   // line 6\n  }\n}`,
    steps:[{step:1,nodeId:"n1",parentId:null,label:"perm(start=0)",type:"call",depth:0,functionName:"permute",arguments:{start:0,arr:"[1,2,3]"},returnValue:null,callStack:["permute(0)"],localVars:{start:0,arr:"[1,2,3]"},highlightLine:3,currentAction:"Fix position 0: try each element",description:"Pattern: choose(swap) → explore(recurse) → backtrack(swap back). 3!=6 total."},{step:2,nodeId:"n2",parentId:"n1",label:"swap(0,0)→1",type:"explore",depth:1,functionName:"permute",arguments:{start:0,i:0},returnValue:null,callStack:["permute(0)","permute(1)"],localVars:{start:0,arr:"[1,2,3]"},highlightLine:4,currentAction:"Choose 1 at position 0",description:"Put 1 at position 0 (swap with itself). Fix position 1."},{step:3,nodeId:"n3",parentId:"n2",label:"✅ [1,2,3]",type:"base_case",depth:3,functionName:"permute",arguments:{start:3,arr:"[1,2,3]"},returnValue:"[1,2,3]",callStack:["permute(3)"],localVars:{arr:"[1,2,3]"},highlightLine:2,currentAction:"✅ Permutation 1: [1,2,3]",description:"start==size — permutation found!"},{step:4,nodeId:"n4",parentId:"n2",label:"✅ [1,3,2]",type:"base_case",depth:3,functionName:"permute",arguments:{start:3,arr:"[1,3,2]"},returnValue:"[1,3,2]",callStack:["permute(3)"],localVars:{arr:"[1,3,2]"},highlightLine:2,currentAction:"✅ Permutation 2: [1,3,2]",description:"After swapping 2↔3."},{step:5,nodeId:"n5",parentId:"n1",label:"swap(0,1)→2",type:"backtrack",depth:1,functionName:"permute",arguments:{start:0,i:1},returnValue:null,callStack:["permute(0)","permute(1)"],localVars:{start:0,arr:"[2,1,3]"},highlightLine:4,currentAction:"↩ Backtrack then choose 2 at position 0",description:"Undo, then swap 1↔2. arr=[2,1,3]."},{step:6,nodeId:"n6",parentId:"n5",label:"✅ [2,1,3]",type:"base_case",depth:3,functionName:"permute",arguments:{start:3,arr:"[2,1,3]"},returnValue:"[2,1,3]",callStack:["permute(3)"],localVars:{arr:"[2,1,3]"},highlightLine:2,currentAction:"✅ Permutation 3: [2,1,3]",description:"3 of 6."},{step:7,nodeId:"n7",parentId:"n5",label:"✅ [2,3,1]",type:"base_case",depth:3,functionName:"permute",arguments:{start:3,arr:"[2,3,1]"},returnValue:"[2,3,1]",callStack:["permute(3)"],localVars:{arr:"[2,3,1]"},highlightLine:2,currentAction:"✅ Permutation 4: [2,3,1]",description:"4 of 6."},{step:8,nodeId:"n8",parentId:"n1",label:"swap(0,2)→3",type:"backtrack",depth:1,functionName:"permute",arguments:{start:0,i:2},returnValue:null,callStack:["permute(0)","permute(1)"],localVars:{start:0,arr:"[3,2,1]"},highlightLine:4,currentAction:"↩ Choose 3 at position 0",description:"Final branch: 3 at position 0."},{step:9,nodeId:"n9",parentId:"n8",label:"✅ [3,1,2]",type:"base_case",depth:3,functionName:"permute",arguments:{start:3,arr:"[3,1,2]"},returnValue:"[3,1,2]",callStack:["permute(3)"],localVars:{arr:"[3,1,2]"},highlightLine:2,currentAction:"✅ Permutation 5: [3,1,2]",description:"5 of 6."},{step:10,nodeId:"n10",parentId:"n8",label:"✅ [3,2,1]",type:"base_case",depth:3,functionName:"permute",arguments:{start:3,arr:"[3,2,1]"},returnValue:"[3,2,1]",callStack:[],localVars:{arr:"[3,2,1]"},highlightLine:2,currentAction:"✅ All 6 permutations done!",description:"All 3!=6 permutations generated!"}]
  },

  climbstairs: {
    problem:"Climb Stairs (n=5) — 1 or 2 steps at a time",
    problemType:"general",boardSize:0,
    timeComplexity:{best:"O(2^n)",average:"O(2^n)",worst:"O(2^n)",space:"O(n)",note:"Same structure as Fibonacci. Memoization gives O(n). DP gives O(1) space."},
    generatedCode:`int climb(int n) {\n  if (n <= 1) return 1;          // line 2\n  return climb(n-1) + climb(n-2); // line 3\n}`,
    steps:[{step:1,nodeId:"n1",parentId:null,label:"climb(5)",type:"call",depth:0,functionName:"climb",arguments:{n:5},returnValue:null,callStack:["climb(5)"],localVars:{n:5},highlightLine:3,currentAction:"Ways to climb 5 stairs?",description:"climb(n) = climb(n-1)+climb(n-2). Identical to Fibonacci! Sequence: 1,1,2,3,5,8..."},{step:2,nodeId:"n2",parentId:"n1",label:"climb(4)",type:"call",depth:1,functionName:"climb",arguments:{n:4},returnValue:null,callStack:["climb(5)","climb(4)"],localVars:{n:4},highlightLine:3,currentAction:"Ways to climb 4 stairs",description:"Take 1 step → climb(4). Take 2 steps → climb(3)."},{step:3,nodeId:"n3",parentId:"n2",label:"climb(3)",type:"call",depth:2,functionName:"climb",arguments:{n:3},returnValue:null,callStack:["climb(5)","climb(4)","climb(3)"],localVars:{n:3},highlightLine:3,currentAction:"Ways to climb 3 stairs",description:"Recursing deeper."},{step:4,nodeId:"n4",parentId:"n3",label:"climb(1)",type:"base_case",depth:3,functionName:"climb",arguments:{n:1},returnValue:1,callStack:["climb(5)","climb(4)","climb(3)","climb(1)"],localVars:{n:1},highlightLine:2,currentAction:"BASE CASE ✓ climb(1) = 1 way",description:"1 stair: only 1 way."},{step:5,nodeId:"n5",parentId:"n3",label:"climb(2)→2",type:"call",depth:3,functionName:"climb",arguments:{n:2},returnValue:2,callStack:["climb(5)","climb(4)","climb(3)","climb(2)"],localVars:{n:2},highlightLine:3,currentAction:"climb(2) = climb(1)+climb(0) = 2",description:"2 stairs: (1+1) or (2). Returns 2."},{step:6,nodeId:"n6",parentId:null,label:"✅ climb(5)=8",type:"return",depth:0,functionName:"climb",arguments:{n:5},returnValue:8,callStack:[],localVars:{n:5,answer:8},highlightLine:3,currentAction:"✅ FINAL: 8 ways to climb 5 stairs",description:"8 ways! This is the 7th Fibonacci number. DP would compute this in O(n) with O(1) space."}]
  },

  gcd: {
    problem:"GCD(48, 18) — Euclidean algorithm",
    problemType:"general",boardSize:0,
    timeComplexity:{best:"O(1)",average:"O(log min(a,b))",worst:"O(log min(a,b))",space:"O(log min(a,b))",note:"One of the oldest algorithms (~300 BC). Iterative version uses O(1) space."},
    generatedCode:`int gcd(int a, int b) {\n  if (b == 0) return a;        // line 2\n  return gcd(b, a % b);        // line 3\n}`,
    steps:[{step:1,nodeId:"n1",parentId:null,label:"gcd(48,18)",type:"call",depth:0,functionName:"gcd",arguments:{a:48,b:18},returnValue:null,callStack:["gcd(48,18)"],localVars:{a:48,b:18,remainder:12},highlightLine:3,currentAction:"48 mod 18 = 12 → gcd(18,12)",description:"GCD(a,b) = GCD(b, a mod b). Brilliant reduction!"},{step:2,nodeId:"n2",parentId:"n1",label:"gcd(18,12)",type:"call",depth:1,functionName:"gcd",arguments:{a:18,b:12},returnValue:null,callStack:["gcd(48,18)","gcd(18,12)"],localVars:{a:18,b:12,remainder:6},highlightLine:3,currentAction:"18 mod 12 = 6 → gcd(12,6)",description:"Reducing further."},{step:3,nodeId:"n3",parentId:"n2",label:"gcd(12,6)",type:"call",depth:2,functionName:"gcd",arguments:{a:12,b:6},returnValue:null,callStack:["gcd(48,18)","gcd(18,12)","gcd(12,6)"],localVars:{a:12,b:6,remainder:0},highlightLine:3,currentAction:"12 mod 6 = 0 → gcd(6,0)",description:"12 mod 6 = 0. Next call hits base case!"},{step:4,nodeId:"n4",parentId:"n3",label:"gcd(6,0)",type:"base_case",depth:3,functionName:"gcd",arguments:{a:6,b:0},returnValue:6,callStack:["gcd(48,18)","gcd(18,12)","gcd(12,6)","gcd(6,0)"],localVars:{a:6,b:0},highlightLine:2,currentAction:"BASE CASE ✓ b=0, return a=6",description:"b=0! Return a=6. GCD(48,18)=6. Ancient and still one of the most efficient algorithms!"},{step:5,nodeId:"n5",parentId:null,label:"✅ GCD=6",type:"return",depth:0,functionName:"gcd",arguments:{a:48,b:18},returnValue:6,callStack:[],localVars:{gcd:6},highlightLine:3,currentAction:"✅ GCD(48,18) = 6",description:"48=6×8, 18=6×3. Elegant!"}]
  },

  palindrome: {
    problem:"Palindrome check — 'racecar'",
    problemType:"general",boardSize:0,
    timeComplexity:{best:"O(1)",average:"O(n)",worst:"O(n)",space:"O(n)",note:"Best: first/last chars differ → O(1). Iterative version: O(1) space."},
    generatedCode:`bool isPalin(string s, int l, int r) {\n  if (l >= r) return true;        // line 2\n  if (s[l] != s[r]) return false; // line 3\n  return isPalin(s, l+1, r-1);   // line 4\n}`,
    steps:[{step:1,nodeId:"n1",parentId:null,label:"check(0,6)",type:"call",depth:0,functionName:"isPalin",arguments:{l:0,r:6},returnValue:null,callStack:["isPalin(0,6)"],localVars:{l:0,r:6,s_l:"r",s_r:"r"},highlightLine:3,currentAction:"Compare s[0]='r' and s[6]='r' ✓",description:"Outer characters match! Move inward."},{step:2,nodeId:"n2",parentId:"n1",label:"check(1,5)",type:"call",depth:1,functionName:"isPalin",arguments:{l:1,r:5},returnValue:null,callStack:["isPalin(0,6)","isPalin(1,5)"],localVars:{l:1,r:5,s_l:"a",s_r:"a"},highlightLine:3,currentAction:"Compare s[1]='a' and s[5]='a' ✓",description:"Match! Keep going."},{step:3,nodeId:"n3",parentId:"n2",label:"check(2,4)",type:"call",depth:2,functionName:"isPalin",arguments:{l:2,r:4},returnValue:null,callStack:["isPalin(0,6)","isPalin(1,5)","isPalin(2,4)"],localVars:{l:2,r:4,s_l:"c",s_r:"c"},highlightLine:3,currentAction:"Compare s[2]='c' and s[4]='c' ✓",description:"Match!"},{step:4,nodeId:"n4",parentId:"n3",label:"l>=r center",type:"base_case",depth:3,functionName:"isPalin",arguments:{l:3,r:3},returnValue:true,callStack:["isPalin(0,6)","isPalin(1,5)","isPalin(2,4)","isPalin(3,3)"],localVars:{l:3,r:3,center:"e"},highlightLine:2,currentAction:"BASE CASE ✓ l>=r, center 'e' reached",description:"l==r means center char. Always palindrome. Return true!"},{step:5,nodeId:"n5",parentId:null,label:"✅ Palindrome!",type:"return",depth:0,functionName:"isPalin",arguments:{},returnValue:true,callStack:[],localVars:{result:true},highlightLine:4,currentAction:"✅ 'racecar' IS a palindrome!",description:"True propagated all the way up. Try 'hello' — h≠o fails immediately!"}]
  },

  sumdigits: {
    problem:"Sum of digits of 12345",
    problemType:"general",boardSize:0,
    timeComplexity:{best:"O(d)",average:"O(d)",worst:"O(d)",space:"O(d)",note:"d = number of digits = log10(n). For 12345: d=5 calls."},
    generatedCode:`int sumDigits(int n) {\n  if (n == 0) return 0;           // line 2\n  return n%10 + sumDigits(n/10);  // line 3\n}`,
    steps:[{step:1,nodeId:"n1",parentId:null,label:"sum(12345)",type:"call",depth:0,functionName:"sumDigits",arguments:{n:12345},returnValue:null,callStack:["sum(12345)"],localVars:{n:12345,last:5},highlightLine:3,currentAction:"Extract last digit: 12345%10=5",description:"n%10 gives last digit (5), n/10 removes it (1234)."},{step:2,nodeId:"n2",parentId:"n1",label:"sum(1234)",type:"call",depth:1,functionName:"sumDigits",arguments:{n:1234},returnValue:null,callStack:["sum(12345)","sum(1234)"],localVars:{n:1234,last:4},highlightLine:3,currentAction:"Extract: 1234%10=4",description:"Extract 4."},{step:3,nodeId:"n3",parentId:"n2",label:"sum(123)",type:"call",depth:2,functionName:"sumDigits",arguments:{n:123},returnValue:null,callStack:["sum(12345)","sum(1234)","sum(123)"],localVars:{n:123,last:3},highlightLine:3,currentAction:"Extract: 123%10=3",description:"Extract 3."},{step:4,nodeId:"n4",parentId:"n3",label:"sum(12)",type:"call",depth:3,functionName:"sumDigits",arguments:{n:12},returnValue:null,callStack:["sum(12345)","sum(1234)","sum(123)","sum(12)"],localVars:{n:12,last:2},highlightLine:3,currentAction:"Extract: 12%10=2",description:"Extract 2."},{step:5,nodeId:"n5",parentId:"n4",label:"sum(1)",type:"call",depth:4,functionName:"sumDigits",arguments:{n:1},returnValue:null,callStack:["sum(12345)","sum(1234)","sum(123)","sum(12)","sum(1)"],localVars:{n:1,last:1},highlightLine:3,currentAction:"Extract: 1%10=1",description:"Extract 1."},{step:6,nodeId:"n6",parentId:"n5",label:"sum(0)",type:"base_case",depth:5,functionName:"sumDigits",arguments:{n:0},returnValue:0,callStack:["sum(0)"],localVars:{n:0},highlightLine:2,currentAction:"BASE CASE ✓ n=0, return 0",description:"Base case!"},{step:7,nodeId:"n7",parentId:null,label:"✅ sum=15",type:"return",depth:0,functionName:"sumDigits",arguments:{n:12345},returnValue:15,callStack:[],localVars:{result:15},highlightLine:3,currentAction:"✅ 1+2+3+4+5 = 15",description:"Sum = 15."}]
  },

  generateparens: {
    problem:"Generate Parentheses (n=3)",
    problemType:"general",boardSize:0,
    timeComplexity:{best:"O(4^n/√n)",average:"O(4^n/√n)",worst:"O(4^n/√n)",space:"O(n)",note:"Count follows Catalan numbers. n=3: 5, n=4: 14, n=5: 42"},
    generatedCode:`void gen(string cur, int open, int close, int n) {\n  if (cur.size() == 2*n) { print; return; } // line 2\n  if (open < n)                             // line 3\n    gen(cur+"(", open+1, close, n);         // line 4\n  if (close < open)                         // line 5\n    gen(cur+")", open, close+1, n);         // line 6\n}`,
    steps:[{step:1,nodeId:"n1",parentId:null,label:'gen("",0,0)',type:"call",depth:0,functionName:"gen",arguments:{cur:"",open:0,close:0,n:3},returnValue:null,callStack:['gen("",0,0)'],localVars:{cur:"",open:0,close:0},highlightLine:4,currentAction:"Start: must add '(' first",description:"Rules: add '(' if open<n. Add ')' if close<open. Always start with '('."},{step:2,nodeId:"n2",parentId:"n1",label:'gen("(",1,0)',type:"call",depth:1,functionName:"gen",arguments:{cur:"(",open:1,close:0},returnValue:null,callStack:['gen("(",1,0)'],localVars:{cur:"(",open:1},highlightLine:4,currentAction:"Add '(' → '(' open=1",description:"Added '('. Can add more '(' or add ')'."},{step:3,nodeId:"n3",parentId:"n2",label:'gen("(((",3,0)',type:"call",depth:3,functionName:"gen",arguments:{cur:"(((",open:3,close:0},returnValue:null,callStack:['gen("(((",3,0)'],localVars:{cur:"(((",open:3},highlightLine:6,currentAction:"open=n=3, can only add ')' now",description:"Max open reached. Must close all 3."},{step:4,nodeId:"n4",parentId:"n3",label:'✅ "((()))"',type:"base_case",depth:6,functionName:"gen",arguments:{cur:"((()))"},returnValue:"((()))",callStack:[],localVars:{result:"((()))"},highlightLine:2,currentAction:'✅ Found: "((()))"',description:'First valid string! 4 more: "(()())", "(())()", "()(())", "()()()"'},{step:5,nodeId:"n5",parentId:null,label:"✅ All 5 found",type:"return",depth:0,functionName:"gen",arguments:{n:3},returnValue:"5 strings",callStack:[],localVars:{count:5},highlightLine:2,currentAction:"✅ All 5 valid parentheses found!",description:'All 5: "((()))", "(()())", "(())()", "()(())", "()()()". Count = Catalan(3) = 5.'}]
  },

  quicksort: {
    problem:"Quick Sort — sort {3,6,8,10,1,2,1}",
    problemType:"general",boardSize:0,
    timeComplexity:{best:"O(n log n)",average:"O(n log n)",worst:"O(n²)",space:"O(log n)",note:"Worst case with sorted input. Randomized pivot avoids O(n²). In-place!"},
    generatedCode:`void quickSort(vector<int>& arr, int low, int high) {\n  if (low >= high) return;               // line 2\n  int pivot = arr[high];                 // line 3 pick pivot\n  int i = low - 1;                       // line 4\n  for (int j = low; j < high; j++) {    // line 5\n    if (arr[j] <= pivot) {               // line 6\n      swap(arr[++i], arr[j]);            // line 7\n    }\n  }\n  swap(arr[i+1], arr[high]);            // line 10 place pivot\n  int pi = i + 1;                        // line 11\n  quickSort(arr, low, pi-1);            // line 12 left\n  quickSort(arr, pi+1, high);           // line 13 right\n}`,
    steps:[{step:1,nodeId:"n1",parentId:null,label:"sort[0,6]",type:"call",depth:0,functionName:"quickSort",arguments:{low:0,high:6,arr:"[3,6,8,10,1,2,1]"},returnValue:null,callStack:["sort(0,6)"],localVars:{low:0,high:6,pivot:1},highlightLine:3,currentAction:"Pivot = arr[6] = 1",description:"Pick last element as pivot=1. Partition: elements ≤1 go left, >1 go right."},{step:2,nodeId:"n2",parentId:"n1",label:"partition pivot=1",type:"explore",depth:1,functionName:"quickSort",arguments:{low:0,high:6,pivot:1},returnValue:null,callStack:["sort(0,6)","partition"],localVars:{pivot:1,arr_after:"[1,1,8,10,3,2,6]"},highlightLine:10,currentAction:"Partition done: pivot 1 at index 1",description:"After partition: all ≤1 left of index 1, all >1 right. Pivot is in FINAL position!"},{step:3,nodeId:"n3",parentId:"n2",label:"sort[0,0]",type:"base_case",depth:2,functionName:"quickSort",arguments:{low:0,high:0},returnValue:null,callStack:["sort(0,6)","sort(0,0)"],localVars:{low:0,high:0},highlightLine:2,currentAction:"BASE CASE ✓ single element",description:"Single element — already sorted."},{step:4,nodeId:"n4",parentId:"n2",label:"sort[2,6]",type:"call",depth:2,functionName:"quickSort",arguments:{low:2,high:6,arr:"[8,10,3,2,6]"},returnValue:null,callStack:["sort(0,6)","sort(2,6)"],localVars:{low:2,high:6,pivot:6},highlightLine:3,currentAction:"Sort right half, pivot=6",description:"Now sort the right portion."},{step:5,nodeId:"n5",parentId:"n4",label:"sort[2,4]",type:"call",depth:3,functionName:"quickSort",arguments:{low:2,high:4},returnValue:null,callStack:["sort(0,6)","sort(2,6)","sort(2,4)"],localVars:{low:2,high:4,pivot:3},highlightLine:3,currentAction:"Pivot=3, sorting left of 6",description:"Sort elements less than 6."},{step:6,nodeId:"n6",parentId:null,label:"✅ Sorted!",type:"return",depth:0,functionName:"quickSort",arguments:{},returnValue:"[1,1,2,3,6,8,10]",callStack:[],localVars:{result:"[1,1,2,3,6,8,10]"},highlightLine:2,currentAction:"✅ FINAL: [1,1,2,3,6,8,10]",description:"Sorted! QuickSort is in-place with O(log n) stack space. Average O(n log n) but worst O(n²) with bad pivot choice."}]
  },

  coinchange: {
    problem:"Coin Change — min coins for amount 11 with {1,5,6}",
    problemType:"general",boardSize:0,
    timeComplexity:{best:"O(amount)",average:"O(n×amount)",worst:"O(n×amount)",space:"O(amount)",note:"n = number of coin types. Greedy fails! E.g., coins={1,5,6}, amount=10: greedy picks 6,1,1,1,1 (5 coins), DP picks 5,5 (2 coins)"},
    generatedCode:`int coinChange(vector<int>& coins, int amount) {\n  if (amount == 0) return 0;       // line 2\n  if (amount < 0) return -1;       // line 3\n  int minCoins = INT_MAX;           // line 4\n  for (int coin : coins) {          // line 5\n    int res = coinChange(coins, amount - coin); // line 6\n    if (res != -1)                  // line 7\n      minCoins = min(minCoins, res + 1); // line 8\n  }\n  return minCoins == INT_MAX ? -1 : minCoins; // line 10\n}`,
    steps:[{step:1,nodeId:"n1",parentId:null,label:"coin(11)",type:"call",depth:0,functionName:"coinChange",arguments:{amount:11},returnValue:null,callStack:["coinChange(11)"],localVars:{amount:11,coins:"[1,5,6]"},highlightLine:5,currentAction:"Find min coins for amount=11",description:"Try each coin: subtract and recurse. Min of all options. Overlapping subproblems — DP would memoize!"},{step:2,nodeId:"n2",parentId:"n1",label:"coin(10)",type:"call",depth:1,functionName:"coinChange",arguments:{amount:10},returnValue:null,callStack:["coinChange(11)","coinChange(10)"],localVars:{amount:10,using_coin:1},highlightLine:6,currentAction:"Use coin=1: try amount=10",description:"Subtract coin 1, recurse on 10."},{step:3,nodeId:"n3",parentId:"n2",label:"coin(5)",type:"call",depth:2,functionName:"coinChange",arguments:{amount:5},returnValue:null,callStack:["coinChange(11)","coinChange(10)","coinChange(5)"],localVars:{amount:5,using_coin:5},highlightLine:6,currentAction:"Use coin=5: try amount=5",description:"Subtract coin 5, recurse on 5."},{step:4,nodeId:"n4",parentId:"n3",label:"coin(0)",type:"base_case",depth:3,functionName:"coinChange",arguments:{amount:0},returnValue:0,callStack:["coinChange(5)","coinChange(0)"],localVars:{amount:0},highlightLine:2,currentAction:"BASE CASE ✓ amount=0, return 0",description:"Amount=0! Return 0 coins needed."},{step:5,nodeId:"n5",parentId:"n1",label:"coin(6)",type:"call",depth:1,functionName:"coinChange",arguments:{amount:6},returnValue:null,callStack:["coinChange(11)","coinChange(6)"],localVars:{amount:6,using_coin:5},highlightLine:6,currentAction:"Use coin=5: try amount=6",description:"Try coin 5 from amount 11."},{step:6,nodeId:"n6",parentId:"n5",label:"coin(0)=0",type:"base_case",depth:2,functionName:"coinChange",arguments:{amount:0},returnValue:0,callStack:["coinChange(6)","coinChange(0)"],localVars:{amount:0},highlightLine:2,currentAction:"BASE CASE ✓ amount=0",description:"Path: 5+6=11. 2 coins total!"},{step:7,nodeId:"n7",parentId:null,label:"✅ Min = 2",type:"return",depth:0,functionName:"coinChange",arguments:{amount:11},returnValue:2,callStack:[],localVars:{result:2,path:"5+6"},highlightLine:10,currentAction:"✅ Min coins = 2 (use 5 and 6)",description:"Min = 2 coins (5+6=11). Greedy would pick 6,1,1,1,1 = 5 coins. DP beats greedy here!"}]
  },

  floodfill: {
    problem:"Flood Fill — fill connected region from (1,1)",
    problemType:"maze",boardSize:4,
    timeComplexity:{best:"O(1)",average:"O(n×m)",worst:"O(n×m)",space:"O(n×m)",note:"n×m = grid size. Visits each cell at most once. Used in MS Paint fill tool!"},
    generatedCode:`void fill(int grid[][], int x, int y, int old, int newC) {\n  if (x<0||y<0||x>=n||y>=m) return;  // line 2\n  if (grid[x][y] != old) return;      // line 3\n  grid[x][y] = newC;                  // line 4 fill\n  fill(grid, x+1, y, old, newC);     // line 5 down\n  fill(grid, x-1, y, old, newC);     // line 6 up\n  fill(grid, x, y+1, old, newC);     // line 7 right\n  fill(grid, x, y-1, old, newC);     // line 8 left\n}`,
    steps:[{step:1,nodeId:"n1",parentId:null,label:"fill(0,0)",type:"call",depth:0,functionName:"fill",arguments:{x:0,y:0},returnValue:null,callStack:["fill(0,0)"],localVars:{x:0,y:0,old:1,new:3},highlightLine:4,boardState:[[3,1,1,0],[1,1,0,0],[1,0,0,1],[0,0,1,1]],currentAction:"Fill (0,0): color 1→3 (blue→red)",description:"Start flood fill at (0,0). Replace all connected 1s with 3. Like MS Paint fill tool!"},{step:2,nodeId:"n2",parentId:"n1",label:"fill(1,0)",type:"call",depth:1,functionName:"fill",arguments:{x:1,y:0},returnValue:null,callStack:["fill(0,0)","fill(1,0)"],localVars:{x:1,y:0},highlightLine:5,boardState:[[3,1,1,0],[3,1,0,0],[1,0,0,1],[0,0,1,1]],currentAction:"Fill DOWN: (1,0) has color 1 ✓",description:"(1,0) matches old color. Fill it and recurse in 4 directions."},{step:3,nodeId:"n3",parentId:"n2",label:"fill(2,0)",type:"call",depth:2,functionName:"fill",arguments:{x:2,y:0},returnValue:null,callStack:["fill(0,0)","fill(1,0)","fill(2,0)"],localVars:{x:2,y:0},highlightLine:5,boardState:[[3,1,1,0],[3,1,0,0],[3,0,0,1],[0,0,1,1]],currentAction:"Fill DOWN: (2,0) ✓",description:"Continue filling downward."},{step:4,nodeId:"n4",parentId:"n3",label:"(3,0)=0 stop",type:"prune",depth:3,functionName:"fill",arguments:{x:3,y:0},returnValue:null,callStack:["fill(2,0)","fill(3,0)"],localVars:{x:3,y:0},highlightLine:3,boardState:[[3,1,1,0],[3,1,0,0],[3,0,0,1],[0,0,1,1]],currentAction:"❌ (3,0) has color 0, stop",description:"Different color — stop recursion in this direction."},{step:5,nodeId:"n5",parentId:"n1",label:"fill(0,1)",type:"call",depth:1,functionName:"fill",arguments:{x:0,y:1},returnValue:null,callStack:["fill(0,0)","fill(0,1)"],localVars:{x:0,y:1},highlightLine:7,boardState:[[3,3,1,0],[3,1,0,0],[3,0,0,1],[0,0,1,1]],currentAction:"Fill RIGHT: (0,1) ✓",description:"Going right from (0,0)."},{step:6,nodeId:"n6",parentId:"n5",label:"fill(0,2)",type:"call",depth:2,functionName:"fill",arguments:{x:0,y:2},returnValue:null,callStack:["fill(0,0)","fill(0,1)","fill(0,2)"],localVars:{x:0,y:2},highlightLine:7,boardState:[[3,3,3,0],[3,1,0,0],[3,0,0,1],[0,0,1,1]],currentAction:"Fill RIGHT: (0,2) ✓",description:"Continue right."},{step:7,nodeId:"n7",parentId:"n6",label:"(0,3)=0 stop",type:"prune",depth:3,functionName:"fill",arguments:{x:0,y:3},returnValue:null,callStack:["fill(0,2)","fill(0,3)"],localVars:{x:0,y:3},highlightLine:3,boardState:[[3,3,3,0],[3,1,0,0],[3,0,0,1],[0,0,1,1]],currentAction:"❌ (0,3) has color 0, stop",description:"Wall — stop."},{step:8,nodeId:"n8",parentId:null,label:"✅ Fill done!",type:"return",depth:0,functionName:"fill",arguments:{},returnValue:"done",callStack:[],localVars:{},highlightLine:4,boardState:[[3,3,3,0],[3,3,0,0],[3,0,0,1],[0,0,1,1]],currentAction:"✅ All connected 1s filled with 3!",description:"Flood fill complete! All connected cells with color 1 are now color 3. Used in image editing, game maps, and more!"}]
  },

  powerfunction: {
    problem:"Fast Power — 2^10 in O(log n)",
    problemType:"general",boardSize:0,
    timeComplexity:{best:"O(log n)",average:"O(log n)",worst:"O(log n)",space:"O(log n)",note:"Crucial for cryptography (RSA uses modular exponentiation). vs naive O(n)."},
    generatedCode:`int power(int base, int exp) {\n  if (exp == 0) return 1;         // line 2\n  if (exp % 2 == 0)               // line 3\n    return power(base*base,exp/2); // line 4 even\n  return base*power(base,exp-1);  // line 5 odd\n}`,
    steps:[{step:1,nodeId:"n1",parentId:null,label:"pow(2,10)",type:"call",depth:0,functionName:"power",arguments:{base:2,exp:10},returnValue:null,callStack:["power(2,10)"],localVars:{base:2,exp:10},highlightLine:3,currentAction:"2^10: exp=10 is even",description:"Even exp: 2^10 = (2^2)^5 = 4^5. Halves the problem! O(log n) total calls."},{step:2,nodeId:"n2",parentId:"n1",label:"pow(4,5)",type:"call",depth:1,functionName:"power",arguments:{base:4,exp:5},returnValue:null,callStack:["power(2,10)","power(4,5)"],localVars:{base:4,exp:5},highlightLine:5,currentAction:"4^5: exp=5 is odd",description:"Odd: 4^5 = 4 × 4^4."},{step:3,nodeId:"n3",parentId:"n2",label:"pow(16,2)",type:"call",depth:2,functionName:"power",arguments:{base:16,exp:2},returnValue:null,callStack:["power(2,10)","power(4,5)","power(16,2)"],localVars:{base:16,exp:2},highlightLine:4,currentAction:"16^2: even again",description:"4^4 becomes 16^2."},{step:4,nodeId:"n4",parentId:"n3",label:"pow(256,1)",type:"call",depth:3,functionName:"power",arguments:{base:256,exp:1},returnValue:null,callStack:["power(2,10)","power(4,5)","power(16,2)","power(256,1)"],localVars:{base:256,exp:1},highlightLine:5,currentAction:"256^1: odd",description:"256 × 256^0."},{step:5,nodeId:"n5",parentId:"n4",label:"pow(x,0)",type:"base_case",depth:4,functionName:"power",arguments:{base:256,exp:0},returnValue:1,callStack:["power(256,0)"],localVars:{base:256,exp:0},highlightLine:2,currentAction:"BASE CASE ✓ exp=0, return 1",description:"x^0 = 1. Base case!"},{step:6,nodeId:"n6",parentId:null,label:"✅ 2^10=1024",type:"return",depth:0,functionName:"power",arguments:{base:2,exp:10},returnValue:1024,callStack:[],localVars:{result:1024},highlightLine:4,currentAction:"✅ 2^10 = 1024 in 5 calls",description:"1024 in 5 calls! Naive: 10 multiplications. For 2^1000000: ~20 calls vs 1,000,000!"}]
  },
  
  graphdfs: {
    problem:"Graph DFS — depth first traversal from node 0",
    problemType:"general",boardSize:0,
    timeComplexity:{best:"O(V+E)",average:"O(V+E)",worst:"O(V+E)",space:"O(V)",note:"V=vertices, E=edges. Visits every node and edge exactly once."},
    generatedCode:`void dfs(vector<vector<int>>& graph, int node, vector<bool>& visited) {\n  visited[node] = true;              // line 2 mark visited\n  cout << node << " ";               // line 3 process node\n  for (int neighbor : graph[node]) { // line 4\n    if (!visited[neighbor])          // line 5\n      dfs(graph, neighbor, visited); // line 6 recurse\n  }\n}`,
    steps:[
      {step:1,nodeId:"n1",parentId:null,label:"dfs(node=0)",type:"call",depth:0,functionName:"dfs",arguments:{node:0,visited:"[F,F,F,F,F]"},returnValue:null,callStack:["dfs(0)"],localVars:{node:0,visited:"[T,F,F,F,F]"},highlightLine:2,currentAction:"Visit node 0 — mark as visited",description:"Start DFS from node 0. Mark it visited immediately to avoid revisiting. Graph: 0-1, 0-2, 1-3, 1-4, 2-4."},
      {step:2,nodeId:"n2",parentId:"n1",label:"dfs(node=1)",type:"call",depth:1,functionName:"dfs",arguments:{node:1,visited:"[T,F,F,F,F]"},returnValue:null,callStack:["dfs(0)","dfs(1)"],localVars:{node:1,visited:"[T,T,F,F,F]"},highlightLine:2,currentAction:"Neighbor 1 not visited — recurse into dfs(1)",description:"Node 0's first neighbor is 1. Not visited yet → recurse. DFS goes DEEP before going wide — this is the key difference from BFS."},
      {step:3,nodeId:"n3",parentId:"n2",label:"dfs(node=3)",type:"call",depth:2,functionName:"dfs",arguments:{node:3},returnValue:null,callStack:["dfs(0)","dfs(1)","dfs(3)"],localVars:{node:3,visited:"[T,T,F,T,F]"},highlightLine:2,currentAction:"Neighbor 3 not visited — recurse into dfs(3)",description:"Node 1's first neighbor is 3. Not visited → recurse deeper. Stack is now 3 levels deep."},
      {step:4,nodeId:"n4",parentId:"n3",label:"dfs(3) done",type:"return",depth:2,functionName:"dfs",arguments:{node:3},returnValue:null,callStack:["dfs(0)","dfs(1)"],localVars:{node:3},highlightLine:4,currentAction:"Node 3 has no unvisited neighbors — return",description:"Node 3 has no more unvisited neighbors. Return to dfs(1). This is the backtracking step of DFS."},
      {step:5,nodeId:"n5",parentId:"n2",label:"dfs(node=4)",type:"call",depth:2,functionName:"dfs",arguments:{node:4},returnValue:null,callStack:["dfs(0)","dfs(1)","dfs(4)"],localVars:{node:4,visited:"[T,T,F,T,T]"},highlightLine:2,currentAction:"Neighbor 4 not visited — recurse into dfs(4)",description:"Node 1's next neighbor is 4. Not visited → recurse."},
      {step:6,nodeId:"n6",parentId:"n5",label:"dfs(4) done",type:"return",depth:2,functionName:"dfs",arguments:{node:4},returnValue:null,callStack:["dfs(0)","dfs(1)"],localVars:{node:4},highlightLine:4,currentAction:"Node 4 has no unvisited neighbors — return",description:"Node 4 done. Return to dfs(1)."},
      {step:7,nodeId:"n7",parentId:"n1",label:"dfs(node=2)",type:"call",depth:1,functionName:"dfs",arguments:{node:2},returnValue:null,callStack:["dfs(0)","dfs(2)"],localVars:{node:2,visited:"[T,T,T,T,T]"},highlightLine:2,currentAction:"Neighbor 2 not visited — recurse into dfs(2)",description:"Back to dfs(0). Next neighbor is 2. Not visited → recurse."},
      {step:8,nodeId:"n8",parentId:"n7",label:"neighbor 4 visited",type:"prune",depth:2,functionName:"dfs",arguments:{node:2,checking:4},returnValue:null,callStack:["dfs(0)","dfs(2)"],localVars:{node:2,neighbor:4},highlightLine:5,currentAction:"Node 4 already visited — skip",description:"Node 2's neighbor 4 is already visited. Skip it! This prevents infinite loops in graphs."},
      {step:9,nodeId:"n9",parentId:"n7",label:"dfs(2) done",type:"return",depth:1,functionName:"dfs",arguments:{node:2},returnValue:null,callStack:["dfs(0)"],localVars:{node:2},highlightLine:4,currentAction:"Node 2 done — return to root",description:"All of node 2's neighbors processed. Return to dfs(0)."},
      {step:10,nodeId:"n10",parentId:null,label:"✅ DFS complete!",type:"return",depth:0,functionName:"dfs",arguments:{node:0},returnValue:null,callStack:[],localVars:{visited:"[T,T,T,T,T]",order:"0→1→3→4→2"},highlightLine:4,currentAction:"✅ All 5 nodes visited! Order: 0→1→3→4→2",description:"DFS complete! Traversal order: 0,1,3,4,2. DFS uses a STACK (call stack) unlike BFS which uses a QUEUE. Time: O(V+E) — visits every vertex and edge exactly once."}
    ]
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { code, problem, boardN, mode } = req.body;
  const p = (problem || '').toLowerCase();
  const c = (code || '').toLowerCase();
  const n = boardN || 4;

  // ============================================
  // DEBUG MODE — AI analyzes buggy code
  // ============================================
  if (mode === 'debug') {
    const DEBUG_PROMPT = `You are an expert C++ recursion debugger for CS students.
Analyze the given recursive/backtracking C++ code and find bugs, issues, and improvements.

Return ONLY a valid JSON object with this exact structure:
{
  "hasErrors": true,
  "overallAssessment": "One sentence summary of the code quality",
  "bugs": [
    {
      "severity": "critical|warning|suggestion",
      "line": 5,
      "code": "exact buggy code snippet",
      "issue": "Clear explanation of what is wrong",
      "fix": "Exact corrected code",
      "explanation": "WHY this is a bug and HOW the fix works"
    }
  ],
  "timeComplexity": "O(?) with explanation",
  "spaceComplexity": "O(?) with explanation",
  "suggestions": ["improvement 1", "improvement 2"],
  "correctedCode": "Full corrected version of the code"
}

Be specific about line numbers. Focus on:
- Missing or wrong base cases (most common student error)
- Wrong recursion parameters
- Missing backtracking (forgetting to undo)
- Off-by-one errors
- Infinite recursion risks
- Wrong termination conditions
- Return statement issues`;

    try {
      const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: DEBUG_PROMPT },
            { role: 'user', content: `Analyze this C++ recursive code for bugs:\n\n${code}` }
          ],
          max_tokens: 3000,
          temperature: 0.1,
          response_format: { type: 'json_object' }
        })
      });
      const data = await r.json();
      if (!r.ok) return res.status(500).json({ error: data.error?.message || 'Debug API error' });
      const raw = data.choices?.[0]?.message?.content || '';
      const s = raw.indexOf('{'), e = raw.lastIndexOf('}');
      if (s === -1) return res.status(400).json({ error: 'Could not analyze code. Try again.' });
      const parsed = JSON.parse(raw.slice(s, e + 1));
      return res.status(200).json({ debugResult: parsed });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // ============================================
  // VISUALIZATION MODE — hardcoded + AI
  // ============================================

  // Smart routing to hardcoded examples
  if (p.includes('fibonacci') || p.includes('fib')) return res.status(200).json(P.fibonacci);
  if (p.includes('factorial') || p.includes('fact')) return res.status(200).json(P.factorial);
  if ((p.includes('queen') || c.includes('queen')) && n === 4) return res.status(200).json(P.nqueens);
  if ((p.includes('maze') || p.includes('rat in') || p.includes('rat maze') || c.includes('maze')) && n === 4) return res.status(200).json(P.ratmaze);
  if (p.includes('hanoi') || p.includes('tower')) return res.status(200).json(P.hanoi);
  if (p.includes('binary search') || p.includes('binarysearch') || c.includes('binarysearch')) return res.status(200).json(P.binarysearch);
  if (p.includes('merge sort') || p.includes('mergesort') || c.includes('mergesort')) return res.status(200).json(P.mergesort);
  if (p.includes('subset sum') || p.includes('subsetsum')) return res.status(200).json(P.subsetsum);
  if (p.includes('permut')) return res.status(200).json(P.permutations);
  if (p.includes('stair') || p.includes('climb')) return res.status(200).json(P.climbstairs);
  if (p.includes('gcd') || p.includes('greatest common')) return res.status(200).json(P.gcd);
  if (p.includes('palindrome')) return res.status(200).json(P.palindrome);
  if (p.includes('sum of digit') || p.includes('sumdigit')) return res.status(200).json(P.sumdigits);
  if (p.includes('parenthes') || p.includes('bracket')) return res.status(200).json(P.generateparens);
  if (p.includes('quick sort') || p.includes('quicksort') || c.includes('quicksort')) return res.status(200).json(P.quicksort);
  if (p.includes('coin') || p.includes('coinchange')) return res.status(200).json(P.coinchange);
  if (p.includes('flood') || p.includes('flood fill') || c.includes('floodfill')) return res.status(200).json(P.floodfill);
  if (p.includes('power') || p.includes('exponent')) return res.status(200).json(P.powerfunction);
  if (p.includes('graph') || p.includes('dfs') || p.includes('depth first')) return res.status(200).json(P.graphdfs);
  // AI for custom problems
  const isMaze = c.includes('maze') || c.includes('solvemaze') || p.includes('maze') || p.includes('rat in');
  const isNQ = c.includes('queen') || c.includes('nqueen') || p.includes('queen');
  const isGrid = isMaze || isNQ;

  const PROMPT = `You are an expert C++ recursion and 2-pointer visualizer for students. Return ONLY raw JSON.

CRITICAL: If the provided code or problem is too complex, not a simple recursive or 2-pointer algorithm, return EXACTLY this JSON:
{
  "error": "Code is too complex. Please provide a simple recursive or two-pointer code."
}

${isGrid ? `CRITICAL: Every step MUST have "boardState" array.
For N-Queens: "." empty, "Q" queen placed.
For Maze: 0=wall, 1=open, 2=rat_current, 3=correct_path.` : ''}

Otherwise, return the following JSON structure:
{
  "problem": "clear description",
  "problemType": "${isNQ ? 'nqueens' : isMaze ? 'maze' : 'general'}",
  "generatedCode": "C++ code if generated, else empty string",
  "boardSize": ${isGrid ? n : 0},
  "timeComplexity": {
    "best": "O(?)",
    "average": "O(?)",
    "worst": "O(?)",
    "space": "O(?)",
    "note": "explanation"
  },
  "steps": [
    {
      "step": 1,
      "nodeId": "n1",
      "parentId": null,
      "label": "func(x)",
      "type": "call",
      "depth": 0,
      "functionName": "func",
      "arguments": {},
      "returnValue": null,
      "callStack": ["func(x)"],
      "localVars": {},
      "highlightLine": 1,
      "currentAction": "Short action description",
      "boardState": ${isGrid ? `[[".",".",".","."],[".",".",".","."],[".",".",".","."],[".",".",".","."]]` : 'null'},
      "description": "Educational explanation"
    }
  ]
}

Rules: unique nodeIds, depth 0 for root, 20-40 steps, ONLY return JSON`;

  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: PROMPT },
          { role: 'user', content: `Visualize. Return ONLY JSON.\n\nProblem: ${problem || 'trace'}\n\n${code ? `Code:\n${code}` : ''}` }
        ],
        max_tokens: 6000,
        temperature: 0.1,
        response_format: { type: 'json_object' }
      })
    });
    const data = await r.json();
    if (!r.ok) return res.status(500).json({ error: data.error?.message || 'API error' });
    const raw = data.choices?.[0]?.message?.content || '';
    const s = raw.indexOf('{'), e = raw.lastIndexOf('}');
    if (s === -1) return res.status(400).json({ error: 'Try again.' });
    const parsed = JSON.parse(raw.slice(s, e + 1));
    if (parsed.error) return res.status(400).json({ error: parsed.error });
    if (!parsed.steps?.length) return res.status(400).json({ error: 'No steps. Try again.' });
    res.status(200).json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

