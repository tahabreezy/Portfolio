"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

interface SnakeGameProps {
  onExit: (score: number) => void;
}

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;

const SnakeGame: React.FC<SnakeGameProps> = ({ onExit }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [dir, setDir] = useState({ x: 0, y: -1 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const gameRef = useRef<HTMLDivElement>(null);

  const generateFood = useCallback((currentSnake: {x: number, y: number}[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!currentSnake.some(s => s.x === newFood!.x && s.y === newFood!.y)) break;
    }
    return newFood;
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake(prev => {
      const head = prev[0];
      const newHead = { x: head.x + dir.x, y: head.y + dir.y };

      // Wall collision
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setGameOver(true);
        return prev;
      }

      // Self collision
      if (prev.some(s => s.x === newHead.x && s.y === newHead.y)) {
        setGameOver(true);
        return prev;
      }

      const newSnake = [newHead, ...prev];

      // Food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [dir, food, gameOver, generateFood]);

  useEffect(() => {
    const interval = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(interval);
  }, [moveSnake]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
          if (dir.y === 0) setDir({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
          if (dir.y === 0) setDir({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "a":
          if (dir.x === 0) setDir({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
          if (dir.x === 0) setDir({ x: 1, y: 0 });
          break;
        case "Escape":
          onExit(score);
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [dir, onExit, score]);

  useEffect(() => {
    const saved = localStorage.getItem("snake-highscore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("snake-highscore", score.toString());
    }
  }, [score, highScore]);

  return (
    <div ref={gameRef} className="flex flex-col items-center justify-center font-mono p-4 bg-black/80 border border-terminal-border rounded-lg shadow-2xl z-50">
      <div className="flex justify-between w-full mb-4 text-terminal-green text-sm">
        <span>SCORE: {score}</span>
        <span className="text-terminal-yellow">HI-SCORE: {highScore}</span>
      </div>

      <div 
        className="grid bg-[#050505] border border-terminal-dim"
        style={{ 
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: "300px",
          height: "300px"
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isSnake = snake.some(s => s.x === x && s.y === y);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isFood = food.x === x && food.y === y;

          return (
            <div 
              key={i} 
              className={`w-full h-full border-[0.5px] border-white/5 ${
                isHead ? "bg-terminal-green shadow-[0_0_8px_rgba(0,255,136,0.6)]" : 
                isSnake ? "bg-terminal-green/60" : 
                isFood ? "bg-terminal-red animate-pulse shadow-[0_0_8px_rgba(255,85,85,0.6)]" : ""
              }`}
            />
          );
        })}
      </div>

      {gameOver && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="text-terminal-red font-bold text-lg animate-bounce">GAME OVER!</div>
          <button 
            onClick={() => {
              setSnake([{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }]);
              setDir({ x: 0, y: -1 });
              setScore(0);
              setGameOver(false);
            }}
            className="px-4 py-1 border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-black transition-all"
          >
            RESTART
          </button>
          <button 
            onClick={() => onExit(score)}
            className="mt-2 text-terminal-dim text-xs hover:text-terminal-white underline"
          >
            EXIT TO TERMINAL (ESC)
          </button>
        </div>
      )}

      {!gameOver && (
        <div className="mt-4 text-terminal-dim text-[10px] text-center">
          USE WASD OR ARROWS TO MOVE<br/>
          PRESS ESC TO EXIT
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
