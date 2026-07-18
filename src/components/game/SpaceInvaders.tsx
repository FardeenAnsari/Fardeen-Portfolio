"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Crosshair, Trophy, RotateCcw } from "lucide-react";

// Game Constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const PLAYER_SPEED = 5;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 20;
const BULLET_SPEED = 7;
const ALIEN_SPEED = 1;
const ALIEN_WIDTH = 30;
const ALIEN_HEIGHT = 20;
const ALIEN_ROWS = 4;
const ALIEN_COLS = 8;
const ALIEN_PADDING = 15;
const FIRE_COOLDOWN = 15; // frames

type GameObject = { x: number; y: number; width: number; height: number; alive?: boolean };

export function SpaceInvaders() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const [gameState, setGameState] = useState<"start" | "playing" | "gameover" | "won">("start");
  const [score, setScore] = useState(0);

  // Input state refs
  const keys = useRef<{ left: boolean; right: boolean; fire: boolean }>({
    left: false,
    right: false,
    fire: false,
  });

  // Game state refs
  const player = useRef<GameObject>({ x: CANVAS_WIDTH / 2 - 20, y: CANVAS_HEIGHT - 40, width: PLAYER_WIDTH, height: PLAYER_HEIGHT });
  const bullets = useRef<{ x: number; y: number }[]>([]);
  const alienBullets = useRef<{ x: number; y: number }[]>([]);
  const aliens = useRef<(GameObject & { alive: boolean })[]>([]);
  const alienDirection = useRef<1 | -1>(1);
  const fireCooldown = useRef(0);
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; life: number; color: string }[]>([]);

  const initGame = useCallback(() => {
    player.current = { x: CANVAS_WIDTH / 2 - 20, y: CANVAS_HEIGHT - 40, width: PLAYER_WIDTH, height: PLAYER_HEIGHT };
    bullets.current = [];
    alienBullets.current = [];
    particles.current = [];
    setScore(0);
    
    const newAliens = [];
    const offsetX = (CANVAS_WIDTH - (ALIEN_COLS * (ALIEN_WIDTH + ALIEN_PADDING))) / 2;
    for (let row = 0; row < ALIEN_ROWS; row++) {
      for (let col = 0; col < ALIEN_COLS; col++) {
        newAliens.push({
          x: offsetX + col * (ALIEN_WIDTH + ALIEN_PADDING),
          y: 50 + row * (ALIEN_HEIGHT + ALIEN_PADDING),
          width: ALIEN_WIDTH,
          height: ALIEN_HEIGHT,
          alive: true,
        });
      }
    }
    aliens.current = newAliens;
    alienDirection.current = 1;
    setGameState("playing");
  }, []);

  const createExplosion = useCallback((x: number, y: number, color: string) => {
    for (let i = 0; i < 15; i++) {
      particles.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 1,
        color,
      });
    }
  }, []);

  const update = useCallback(() => {
    if (gameState !== "playing") return;

    // Player movement
    if (keys.current.left && player.current.x > 0) player.current.x -= PLAYER_SPEED;
    if (keys.current.right && player.current.x < CANVAS_WIDTH - PLAYER_WIDTH) player.current.x += PLAYER_SPEED;

    // Player firing
    if (fireCooldown.current > 0) fireCooldown.current--;
    if (keys.current.fire && fireCooldown.current === 0) {
      bullets.current.push({ x: player.current.x + PLAYER_WIDTH / 2 - 2, y: player.current.y });
      fireCooldown.current = FIRE_COOLDOWN;
      keys.current.fire = false;
    }

    // Update player bullets
    for (let i = bullets.current.length - 1; i >= 0; i--) {
      bullets.current[i].y -= BULLET_SPEED;
      if (bullets.current[i].y < 0) bullets.current.splice(i, 1);
    }

    // Update alien bullets
    for (let i = alienBullets.current.length - 1; i >= 0; i--) {
      alienBullets.current[i].y += BULLET_SPEED / 1.5;
      if (alienBullets.current[i].y > CANVAS_HEIGHT) {
        alienBullets.current.splice(i, 1);
        continue;
      }
      const ab = alienBullets.current[i];
      const p = player.current;
      if (ab.x > p.x && ab.x < p.x + p.width && ab.y > p.y && ab.y < p.y + p.height) {
        createExplosion(p.x + p.width / 2, p.y + p.height / 2, "#4B2E2B");
        setGameState("gameover");
      }
    }

    // Update particles
    for (let i = particles.current.length - 1; i >= 0; i--) {
      const p = particles.current[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.05;
      if (p.life <= 0) particles.current.splice(i, 1);
    }

    // Update aliens
    let hitEdge = false;
    let bottomMost = 0;
    let aliveCount = 0;
    
    aliens.current.forEach((alien) => {
      if (!alien.alive) return;
      aliveCount++;
      alien.x += ALIEN_SPEED * alienDirection.current;
      if (alien.x <= 0 || alien.x + alien.width >= CANVAS_WIDTH) {
        hitEdge = true;
      }
      if (alien.y + alien.height > bottomMost) bottomMost = alien.y + alien.height;

      if (Math.random() < 0.001) {
        alienBullets.current.push({ x: alien.x + alien.width / 2, y: alien.y + alien.height });
      }
    });

    if (aliveCount === 0) {
      setGameState("won");
      return;
    }

    if (hitEdge) {
      alienDirection.current *= -1;
      aliens.current.forEach((alien) => {
        if (alien.alive) alien.y += ALIEN_HEIGHT;
      });
    }

    if (bottomMost >= player.current.y) {
      setGameState("gameover");
    }

    // Collision bullets -> aliens
    for (let i = bullets.current.length - 1; i >= 0; i--) {
      const b = bullets.current[i];
      let bulletHit = false;
      for (let j = 0; j < aliens.current.length; j++) {
        const a = aliens.current[j];
        if (!a.alive) continue;
        if (b.x > a.x && b.x < a.x + a.width && b.y > a.y && b.y < a.y + a.height) {
          a.alive = false;
          bulletHit = true;
          setScore((s) => s + 10);
          createExplosion(a.x + a.width / 2, a.y + a.height / 2, "#C08552");
          break;
        }
      }
      if (bulletHit) bullets.current.splice(i, 1);
    }
  }, [gameState, createExplosion]);

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#FFF8F0"; 
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (gameState !== "playing") return;

    ctx.fillStyle = "#4B2E2B";
    ctx.beginPath();
    ctx.moveTo(player.current.x + PLAYER_WIDTH / 2, player.current.y);
    ctx.lineTo(player.current.x + PLAYER_WIDTH, player.current.y + PLAYER_HEIGHT);
    ctx.lineTo(player.current.x, player.current.y + PLAYER_HEIGHT);
    ctx.fill();

    aliens.current.forEach((a) => {
      if (!a.alive) return;
      ctx.fillStyle = "#C08552";
      ctx.fillRect(a.x, a.y, a.width, a.height);
      ctx.fillStyle = "#FFF8F0";
      ctx.fillRect(a.x + 6, a.y + 4, 4, 4);
      ctx.fillRect(a.x + a.width - 10, a.y + 4, 4, 4);
    });

    ctx.fillStyle = "#8C5A3C";
    bullets.current.forEach((b) => {
      ctx.fillRect(b.x, b.y, 4, 12);
    });

    ctx.fillStyle = "#ef4444";
    alienBullets.current.forEach((b) => {
      ctx.fillRect(b.x - 2, b.y, 4, 12);
    });

    particles.current.forEach((p) => {
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, 3, 3);
    });
    ctx.globalAlpha = 1.0;
  }, [gameState]);

  useEffect(() => {
    const loop = () => {
      if (gameState === "playing") update();
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) draw(ctx);
      }
      requestRef.current = requestAnimationFrame(loop);
    };
    requestRef.current = requestAnimationFrame(loop);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState, update, draw]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") keys.current.left = true;
      if (e.key === "ArrowRight" || e.key === "d") keys.current.right = true;
      if (e.key === " " || e.key === "Enter") {
        keys.current.fire = true;
        e.preventDefault();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") keys.current.left = false;
      if (e.key === "ArrowRight" || e.key === "d") keys.current.right = false;
      if (e.key === " " || e.key === "Enter") keys.current.fire = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleTouchStart = (dir: "left" | "right" | "fire") => { keys.current[dir] = true; };
  const handleTouchEnd = (dir: "left" | "right" | "fire") => { keys.current[dir] = false; };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="flex w-full max-w-[800px] justify-between items-center px-4 font-mono">
        <div className="text-secondary">SCORE: <span className="font-bold text-primary">{score}</span></div>
      </div>

      <div className="relative w-full max-w-[800px] aspect-[4/3] sm:aspect-video md:aspect-[4/3] bg-surface rounded-2xl overflow-hidden shadow-xl border border-border-subtle group">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-full h-full object-cover"
        />

        <AnimatePresence>
          {gameState !== "playing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-surface/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-10"
            >
              {gameState === "start" && (
                <>
                  <h3 className="text-3xl font-bold font-serif text-primary mb-2">Space Invaders</h3>
                  <p className="text-secondary text-sm mb-6 max-w-sm">
                    Use <kbd className="px-2 py-1 bg-surface-mid rounded mx-1 font-mono">A</kbd> <kbd className="px-2 py-1 bg-surface-mid rounded mx-1 font-mono">D</kbd> or Arrows to move. Spacebar to shoot.
                  </p>
                  <button onClick={initGame} className="btn-primary flex items-center gap-2 border-none">
                    Start Game
                  </button>
                </>
              )}
              {gameState === "gameover" && (
                <>
                  <h3 className="text-3xl font-bold font-serif text-red-500 mb-2">Game Over</h3>
                  <p className="text-secondary text-sm mb-6 max-w-sm">Final Score: {score}</p>
                  <button onClick={initGame} className="btn-primary flex items-center gap-2 border-none">
                    <RotateCcw size={16} /> Try Again
                  </button>
                </>
              )}
              {gameState === "won" && (
                <>
                  <h3 className="text-3xl font-bold font-serif text-emerald-600 mb-2">Victory!</h3>
                  <p className="text-secondary text-sm mb-6 max-w-sm">Earth is safe (for now). Score: {score}</p>
                  <button onClick={initGame} className="btn-primary flex items-center gap-2 border-none">
                    <Trophy size={16} /> Play Again
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Controls */}
      <div className="flex sm:hidden w-full max-w-[800px] justify-between gap-4 px-4">
        <div className="flex gap-2">
          <button
            onPointerDown={(e) => { e.preventDefault(); handleTouchStart("left"); }}
            onPointerUp={(e) => { e.preventDefault(); handleTouchEnd("left"); }}
            onPointerLeave={(e) => { e.preventDefault(); handleTouchEnd("left"); }}
            className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-primary active:scale-95 transition-transform select-none"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onPointerDown={(e) => { e.preventDefault(); handleTouchStart("right"); }}
            onPointerUp={(e) => { e.preventDefault(); handleTouchEnd("right"); }}
            onPointerLeave={(e) => { e.preventDefault(); handleTouchEnd("right"); }}
            className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-primary active:scale-95 transition-transform select-none"
          >
            <ChevronRight size={32} />
          </button>
        </div>
        <button
          onPointerDown={(e) => { e.preventDefault(); handleTouchStart("fire"); }}
          onPointerUp={(e) => { e.preventDefault(); handleTouchEnd("fire"); }}
          onPointerLeave={(e) => { e.preventDefault(); handleTouchEnd("fire"); }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C08552] to-[#8C5A3C] text-white flex items-center justify-center active:scale-95 transition-transform shadow-lg shadow-[#C08552]/20 select-none border-none"
        >
          <Crosshair size={28} />
        </button>
      </div>
    </div>
  );
}
