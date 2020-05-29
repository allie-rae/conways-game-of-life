import React, { useState, useCallback, useRef, useEffect } from 'react';
import produce from 'immer';
import './App.css';

const numRows = 35;
const numCols = 35;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
]

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows
}

const App = () => {
  const [generation, setGeneration] = useState(0)
  const [time, setTime] = useState(300)
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid()
  });
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    } 
    setGrid((g) => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;
            operations.forEach(([x ,y]) => {
              const newI = i + x;
              const newJ = j + y;
              // checking bounds (edges are dead)
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                // this gets # of neighbors
                neighbors += g[newI][newJ]
              }
            })

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      })
    })
    setTimeout(runSimulation, time)
  }, [time])

  useEffect(() => {
    setGeneration(generation + 1)
  }, [grid]) 

  return (<main>
    <div>
      <h1>Generation: {generation}</h1>
      <button className="call-to-action" onClick={() => {
        setRunning(!running);
        if (!running) {
          runningRef.current = true;
          runSimulation();
        }
      }}>{running ? 'Stop' : 'Start!'}</button>
      <button onClick={() => {
        setGrid(generateEmptyGrid())
        setGeneration(0)
      }}>
        Clear
      </button>
      <br />
      <button onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => Math.random() > 0.5 ? 1 : 0));
          }
          setGrid(rows);
          setGeneration(0)
      }}>
        Random
      </button>
      <button onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0));
          }
          // upper half
          rows[5][13] = 1
          rows[5][14] = 1
          rows[5][15] = 1
          rows[5][19] = 1
          rows[5][20] = 1
          rows[5][21] = 1
          rows[7][11] = 1
          rows[7][16] = 1
          rows[7][18] = 1
          rows[7][23] = 1
          rows[8][11] = 1
          rows[8][16] = 1
          rows[8][18] = 1
          rows[8][23] = 1
          rows[9][11] = 1
          rows[9][16] = 1
          rows[9][18] = 1
          rows[9][23] = 1
          rows[10][13] = 1
          rows[10][14] = 1
          rows[10][15] = 1
          rows[10][19] = 1
          rows[10][20] = 1
          rows[10][21] = 1
          // lower half
          rows[12][13] = 1
          rows[12][14] = 1
          rows[12][15] = 1
          rows[12][19] = 1
          rows[12][20] = 1
          rows[12][21] = 1
          rows[13][11] = 1
          rows[13][16] = 1
          rows[13][18] = 1
          rows[13][23] = 1
          rows[14][11] = 1
          rows[14][16] = 1
          rows[14][18] = 1
          rows[14][23] = 1
          rows[15][11] = 1
          rows[15][16] = 1
          rows[15][18] = 1
          rows[15][23] = 1
          rows[17][13] = 1
          rows[17][14] = 1
          rows[17][15] = 1
          rows[17][19] = 1
          rows[17][20] = 1
          rows[17][21] = 1
          setGrid(rows);
          setGeneration(0)
      }}>
        Pulsar
      </button>
      <button onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0));
          }
          rows[5][5] = 1
          rows[5][6] = 1
          rows[6][3] = 1
          rows[6][4] = 1
          rows[6][6] = 1
          rows[6][7] = 1
          rows[7][3] = 1
          rows[7][4] = 1
          rows[7][5] = 1
          rows[7][6] = 1
          rows[8][4] = 1
          rows[8][5] = 1
          setGrid(rows);
          setGeneration(0)
      }}>
        Lightweight Spaceship
      </button>
      <button onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0));
          }
          rows[6][17] = 1
          rows[7][17] = 1
          rows[8][16] = 1
          rows[8][18] = 1
          rows[9][17] = 1
          rows[10][17] = 1
          rows[11][17] = 1
          rows[12][17] = 1
          rows[13][16] = 1
          rows[13][18] = 1
          rows[14][17] = 1
          rows[15][17] = 1
          setGrid(rows);
          setGeneration(0)
      }}>
        Pentadecathlon
      </button>
      <br />
      <button onClick={() => {
        setTime(time - 100)
      }}>
        Increase speed
      </button>
      <button onClick={() => {
        setTime(time + 100)
      }}>
        Decrease speed
      </button>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numCols}, 15px)`
      }}>
        {grid.map((rows, i) => rows.map((col, j) => <div 
        key={`${i}-${j}`}
        onClick={() => {
          const newGrid = produce(grid, gridCopy => {
            gridCopy[i][j] = grid[i][j] ? 0 : 1;
            setGeneration(0)
          });
          setGrid(newGrid);
        }}
        style={{ width: 15, 
          height: 15, 
          backgroundColor: grid[i][j] ? '#ff5588' : undefined,
          border: 'solid 1px grey'}} />))}
      </div>
    </div>
    <div>
      <h1>Conway's Rules</h1>
      <ul>
        <li>Any live cell with two or three live neighbours survives.</li>
        <li>Any dead cell with three live neighbours becomes a live cell.</li>
        <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
      </ul>
    </div>
    </main>
  );
}

export default App;
