"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Crosshair, Trophy, RotateCcw } from "lucide-react";

// Game Constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const PLAYER_SPEED = 5;
const PLAYER_WIDTH = 44;
const PLAYER_HEIGHT = 24;
const BULLET_SPEED = 7.5;
const ALIEN_SPEED = 1.1;
const ALIEN_WIDTH = 32;
const ALIEN_HEIGHT = 22;
const ALIEN_ROWS = 4;
const ALIEN_COLS = 8;
const ALIEN_PADDING = 18;
const FIRE_COOLDOWN = 14; // frames

// Authentic Retro Pixel Sprite Bitmaps
const SQUID_MAP = [
  "  ████  ",
  " ██████ ",
  "████████",
  "██ ██ ██",
  "████████",
  "  █  █  ",
  " █ ██ █ ",
  "█ █  █ █",
];

const CRAB_MAP = [
  "  █     █  ",
  "   █   █   ",
  "  ███████  ",
  " ██ ███ ██ ",
  "███████████",
  "█ ███████ █",
  "█ █     █ █",
  "   ██ ██   ",
];

const OCTOPUS_MAP = [
  "    ████    ",
  "  ████████  ",
  " ██████████ ",
  "███ ██  ████",
  "████████████",
  "  ██  ████  ",
  " ██ █  █ ██ ",
  "██ █    █ ██",
];

const TANK_MAP = [
  "     █     ",
  "    ███    ",
  "    ███    ",
  " █████████ ",
  "███████████",
  "███████████",
  "███████████",
  "███████████",
];

// Row Colors: Authentic Black Shades Arcade Palette
const ROW_COLORS = ["#f43f5e", "#38bdf8", "#22c55e", "#eab308"];

type GameObject = { x: number; y: number; width: number; height: number; alive?: boolean };
type Alien = GameObject & { alive: boolean; row: number; col: number };
type Star = { x: number; y: number; size: number; alpha: number; speed: number };

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
  const player = useRef<GameObject>({
    x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2,
    y: CANVAS_HEIGHT - 48,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
  });
  const bullets = useRef<{ x: number; y: number }[]>([]);
  const alienBullets = useRef<{ x: number; y: number }[]>([]);
  const aliens = useRef<Alien[]>([]);
  const alienDirection = useRef<1 | -1>(1);
  const fireCooldown = useRef(0);
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; life: number; color: string }[]>([]);
  const stars = useRef<Star[]>([]);

  // Initialize deep space starfield
  useEffect(() => {
    const starList: Star[] = [];
    for (let i = 0; i < 60; i++) {
      starList.push({
        x: Math.random() * CANVAS_WIDTH,
        y: Math.random() * CANVAS_HEIGHT,
        size: Math.random() > 0.8 ? 2 : 1,
        alpha: 0.2 + Math.random() * 0.7,
        speed: 0.2 + Math.random() * 0.5,
      });
    }
    stars.current = starList;
  }, []);

  const initGame = useCallback(() => {
    player.current = {
      x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2,
      y: CANVAS_HEIGHT - 48,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
    };
    bullets.current = [];
    alienBullets.current = [];
    particles.current = [];
    setScore(0);

    const newAliens: Alien[] = [];
    const offsetX = (CANVAS_WIDTH - ALIEN_COLS * (ALIEN_WIDTH + ALIEN_PADDING)) / 2;
    for (let row = 0; row < ALIEN_ROWS; row++) {
      for (let col = 0; col < ALIEN_COLS; col++) {
        newAliens.push({
          x: offsetX + col * (ALIEN_WIDTH + ALIEN_PADDING),
          y: 55 + row * (ALIEN_HEIGHT + ALIEN_PADDING),
          width: ALIEN_WIDTH,
          height: ALIEN_HEIGHT,
          alive: true,
          row,
          col,
        });
      }
    }
    aliens.current = newAliens;
    alienDirection.current = 1;
    setGameState("playing");
  }, []);

  const createExplosion = useCallback((x: number, y: number, color: string) => {
    for (let i = 0; i < 20; i++) {
      particles.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 7,
        vy: (Math.random() - 0.5) * 7,
        life: 1,
        color,
      });
    }
  }, []);

  const update = useCallback(() => {
    if (gameState !== "playing") return;

    // Starfield drift
    stars.current.forEach((s) => {
      s.y += s.speed;
      if (s.y > CANVAS_HEIGHT) {
        s.y = 0;
        s.x = Math.random() * CANVAS_WIDTH;
      }
    });

    // Player movement
    if (keys.current.left && player.current.x > 0) player.current.x -= PLAYER_SPEED;
    if (keys.current.right && player.current.x < CANVAS_WIDTH - PLAYER_WIDTH) player.current.x += PLAYER_SPEED;

    // Player firing
    if (fireCooldown.current > 0) fireCooldown.current--;
    if (keys.current.fire && fireCooldown.current === 0) {
      bullets.current.push({ x: player.current.x + PLAYER_WIDTH / 2 - 1.5, y: player.current.y });
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
      alienBullets.current[i].y += BULLET_SPEED / 1.6;
      if (alienBullets.current[i].y > CANVAS_HEIGHT) {
        alienBullets.current.splice(i, 1);
        continue;
      }
      const ab = alienBullets.current[i];
      const p = player.current;
      if (ab.x > p.x && ab.x < p.x + p.width && ab.y > p.y && ab.y < p.y + p.height) {
        createExplosion(p.x + p.width / 2, p.y + p.height / 2, "#22c55e");
        createExplosion(p.x + p.width / 2, p.y + p.height / 2, "#ffffff");
        setGameState("gameover");
      }
    }

    // Update particles
    for (let i = particles.current.length - 1; i >= 0; i--) {
      const p = particles.current[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.045;
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
      if (alien.x <= 8 || alien.x + alien.width >= CANVAS_WIDTH - 8) {
        hitEdge = true;
      }
      if (alien.y + alien.height > bottomMost) bottomMost = alien.y + alien.height;

      // Alien fire chance
      if (Math.random() < 0.0018) {
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
        if (alien.alive) alien.y += ALIEN_HEIGHT * 0.8;
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
          const pts = a.row === 0 ? 30 : a.row <= 2 ? 20 : 10;
          setScore((s) => s + pts);
          createExplosion(a.x + a.width / 2, a.y + a.height / 2, ROW_COLORS[a.row % ROW_COLORS.length]);
          break;
        }
      }
      if (bulletHit) bullets.current.splice(i, 1);
    }
  }, [gameState, createExplosion]);

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    // 1. Deep Space Black Canvas Background
    ctx.fillStyle = "#030303";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 2. Starfield
    stars.current.forEach((star) => {
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    });

    // 3. Defense Ground Line
    ctx.strokeStyle = "#15803d";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, CANVAS_HEIGHT - 16);
    ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT - 16);
    ctx.stroke();

    if (gameState !== "playing") return;

    // 4. Draw Player Defender Cannon (Retro Bitmap)
    const pW = player.current.width / TANK_MAP[0].length;
    const pH = player.current.height / TANK_MAP.length;
    ctx.fillStyle = "#22c55e"; // Classic Arcade Neon Green
    for (let r = 0; r < TANK_MAP.length; r++) {
      for (let c = 0; c < TANK_MAP[r].length; c++) {
        if (TANK_MAP[r][c] === "█") {
          ctx.fillRect(player.current.x + c * pW, player.current.y + r * pH, pW, pH);
        }
      }
    }

    // 5. Draw Alien Invaders with authentic sprites and row colors
    aliens.current.forEach((a) => {
      if (!a.alive) return;
      const sprite = a.row === 0 ? SQUID_MAP : a.row <= 2 ? CRAB_MAP : OCTOPUS_MAP;
      const pixelW = a.width / sprite[0].length;
      const pixelH = a.height / sprite.length;
      ctx.fillStyle = ROW_COLORS[a.row % ROW_COLORS.length];

      for (let r = 0; r < sprite.length; r++) {
        for (let c = 0; c < sprite[r].length; c++) {
          if (sprite[r][c] === "█") {
            ctx.fillRect(a.x + c * pixelW, a.y + r * pixelH, pixelW, pixelH);
          }
        }
      }
    });

    // 6. Draw Player Lasers (Bright Electric Cyan)
    ctx.fillStyle = "#38bdf8";
    ctx.shadowColor = "#38bdf8";
    ctx.shadowBlur = 6;
    bullets.current.forEach((b) => {
      ctx.fillRect(b.x, b.y, 3, 14);
    });
    ctx.shadowBlur = 0;

    // 7. Draw Alien Bombs (Hot Crimson Laser)
    ctx.fillStyle = "#f43f5e";
    ctx.shadowColor = "#f43f5e";
    ctx.shadowBlur = 6;
    alienBullets.current.forEach((b) => {
      ctx.fillRect(b.x - 1.5, b.y, 3, 12);
    });
    ctx.shadowBlur = 0;

    // 8. Draw Explosions
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
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.current.left = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.current.right = true;
      if (e.key === " " || e.key === "Enter") {
        keys.current.fire = true;
        e.preventDefault();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.current.left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.current.right = false;
      if (e.key === " " || e.key === "Enter") keys.current.fire = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleTouchStart = (dir: "left" | "right" | "fire") => {
    keys.current[dir] = true;
  };
  const handleTouchEnd = (dir: "left" | "right" | "fire") => {
    keys.current[dir] = false;
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Retro Arcade Monospace HUD */}
      <div className="flex w-full max-w-[800px] justify-between items-center px-4 font-mono text-xs sm:text-sm">
        <div className="text-zinc-400 flex items-center gap-2">
          <span>DEFENDER</span>
          <span className="font-bold text-emerald-400">1P</span>
        </div>
        <div className="text-zinc-400 flex items-center gap-2">
          <span>SCORE</span>
          <span className="font-bold text-emerald-400 tracking-wider">
            {String(score).padStart(4, "0")}
          </span>
        </div>
        <div className="text-zinc-400 flex items-center gap-2">
          <span>HI-SCORE</span>
          <span className="font-bold text-zinc-200">0990</span>
        </div>
      </div>

      {/* Screen Enclosure — Black Shades Arcade Bezel */}
      <div className="relative w-full max-w-[800px] aspect-[4/3] sm:aspect-video md:aspect-[4/3] bg-black rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 group">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-full h-full object-cover"
        />

        {/* CRT Scanline Texture Layer */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 2px)",
          }}
          aria-hidden="true"
        />

        {/* Modal Overlay State (Start / Game Over / Victory) */}
        <AnimatePresence>
          {gameState !== "playing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-10"
            >
              {gameState === "start" && (
                <>
                  <div className="inline-block px-3 py-1 mb-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest">
                    Arcade Retro 1978
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold font-display text-white mb-2 tracking-tight">
                    Space Invaders
                  </h3>
                  <p className="text-zinc-400 text-sm mb-6 max-w-sm font-mono">
                    Use{" "}
                    <kbd className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded mx-1 text-zinc-200">
                      A
                    </kbd>{" "}
                    <kbd className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded mx-1 text-zinc-200">
                      D
                    </kbd>{" "}
                    or Arrows to move. Spacebar to shoot.
                  </p>
                  <button
                    onClick={initGame}
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold font-mono text-sm shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2"
                  >
                    <Crosshair size={16} />
                    Start Defense
                  </button>
                </>
              )}

              {gameState === "gameover" && (
                <>
                  <div className="inline-block px-3 py-1 mb-3 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs uppercase tracking-widest">
                    Invasion Succeeded
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold font-display text-rose-400 mb-2 tracking-tight">
                    Game Over
                  </h3>
                  <p className="text-zinc-400 text-sm mb-6 max-w-sm font-mono">
                    Final Tactical Score: <span className="text-white font-bold">{score}</span>
                  </p>
                  <button
                    onClick={initGame}
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold font-mono text-sm shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2"
                  >
                    <RotateCcw size={16} />
                    Try Again
                  </button>
                </>
              )}

              {gameState === "won" && (
                <>
                  <div className="inline-block px-3 py-1 mb-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest">
                    Mission Accomplished
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold font-display text-emerald-400 mb-2 tracking-tight">
                    Victory!
                  </h3>
                  <p className="text-zinc-400 text-sm mb-6 max-w-sm font-mono">
                    Earth is safe (for now). Score:{" "}
                    <span className="text-white font-bold">{score}</span>
                  </p>
                  <button
                    onClick={initGame}
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold font-mono text-sm shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2"
                  >
                    <Trophy size={16} />
                    Play Again
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Controls — Matte Black Shades */}
      <div className="flex sm:hidden w-full max-w-[800px] justify-between gap-4 px-4 pt-2">
        <div className="flex gap-3">
          <button
            onPointerDown={(e) => {
              e.preventDefault();
              handleTouchStart("left");
            }}
            onPointerUp={(e) => {
              e.preventDefault();
              handleTouchEnd("left");
            }}
            onPointerLeave={(e) => {
              e.preventDefault();
              handleTouchEnd("left");
            }}
            className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-100 active:scale-95 transition-transform select-none touch-manipulation hover:border-zinc-700"
            aria-label="Move left"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onPointerDown={(e) => {
              e.preventDefault();
              handleTouchStart("right");
            }}
            onPointerUp={(e) => {
              e.preventDefault();
              handleTouchEnd("right");
            }}
            onPointerLeave={(e) => {
              e.preventDefault();
              handleTouchEnd("right");
            }}
            className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-100 active:scale-95 transition-transform select-none touch-manipulation hover:border-zinc-700"
            aria-label="Move right"
          >
            <ChevronRight size={28} />
          </button>
        </div>
        <button
          onPointerDown={(e) => {
            e.preventDefault();
            handleTouchStart("fire");
          }}
          onPointerUp={(e) => {
            e.preventDefault();
            handleTouchEnd("fire");
          }}
          onPointerLeave={(e) => {
            e.preventDefault();
            handleTouchEnd("fire");
          }}
          className="w-14 h-14 rounded-2xl bg-emerald-500 text-black flex items-center justify-center active:scale-95 transition-transform select-none border border-emerald-400 shadow-lg shadow-emerald-950/50 touch-manipulation font-bold hover:bg-emerald-400"
          aria-label="Fire weapon"
        >
          <Crosshair size={26} />
        </button>
      </div>
    </div>
  );
}
