import { useState } from 'react';

export default function GrowthSimulator() {
  const [algo, setAlgo] = useState('fib');
  const [n, setN] = useState(5);

  function getFibCalls(n) {
    let a = 1, b = 1;
    for (let i = 2; i <= n + 1; i++) {
      let c = a + b;
      a = b;
      b = c;
    }
    return 2 * b - 1;
  }

  const ALGOS = {
    fib: { 
      name: 'Fibonacci Naive O(2^n)', 
      maxN: 35,
      getCalls: (n) => getFibCalls(n)
    },
    fib_memo: { 
      name: 'Fibonacci Memo O(n)', 
      maxN: 35,
      getCalls: (n) => n <= 1 ? 1 : 2 * n - 1 
    },
    mergesort: {
      name: 'Merge Sort O(n log n)',
      maxN: 1000,
      step: 10,
      getCalls: (n) => Math.floor(n * Math.log2(n || 1)) + n
    },
    binarysearch: {
      name: 'Binary Search O(log n)',
      maxN: 1000000,
      step: 10000,
      getCalls: (n) => Math.floor(Math.log2(n || 1)) + 1
    }
  };

  const current = ALGOS[algo];
  const calls = current.getCalls(n);

  return (
    <div className="growth-sim">
      <h4 className="tc-title">📈 Growth Simulator</h4>
      <select 
        className="growth-select" 
        value={algo} 
        onChange={e => {
          setAlgo(e.target.value);
          setN(ALGOS[e.target.value].maxN > 100 ? 100 : 5);
        }}
      >
        {Object.entries(ALGOS).map(([k, v]) => (
          <option key={k} value={k}>{v.name}</option>
        ))}
      </select>

      <div className="growth-slider-row">
        <span className="growth-n-label">n = {n}</span>
        <input 
          type="range" 
          min={1} 
          max={current.maxN} 
          step={current.step || 1}
          value={n} 
          onChange={e => setN(Number(e.target.value))} 
          className="growth-slider"
        />
      </div>

      <div className="growth-result">
        Function Calls: <span className="growth-calls">{calls.toLocaleString()}</span>
      </div>
    </div>
  );
}
