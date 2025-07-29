import k from "../kaplayCtx";
import { makeVisionary } from "../entities/visionary";
import { makeAIAgent } from "../entities/ai-agent";
import { makeAuthenticitySpark } from "../entities/authenticity-spark";

export default function game() {
  const citySfx = k.play("city", { volume: 0.2, loop: true });
  k.setGravity(3100);
  
  // Chapter system
  let currentChapter = 1;
  let chapterProgress = 0;
  const chapterThresholds = [100, 200, 300, 400]; // Score thresholds for chapter progression
  
  // Chapter configurations
  const chapters = {
    1: {
      name: "The Sea of Sameness",
      bg: "sea-of-sameness-bg",
      platforms: "grey-platforms",
      color: k.Color.fromArray([128, 128, 128]), // Grey
      quote: "The silent villain: sameness syndrome"
    },
    2: {
      name: "The Culture Cradle",
      bg: "chapter-2-bg", 
      platforms: "neon-platforms",
      color: k.Color.fromArray([0, 255, 255]), // Cyan
      quote: "Culture is our heartbeat - authenticity, innovation, relentless improvement"
    },
    3: {
      name: "The Community Core",
      bg: "chapter-3-bg",
      platforms: "network-platforms", 
      color: k.Color.fromArray([255, 0, 255]), // Magenta
      quote: "Collective wisdom, access, support, and shared success"
    },
    4: {
      name: "The Creation Forge",
      bg: "chapter-4-bg",
      platforms: "forge-platforms",
      color: k.Color.fromArray([255, 255, 0]), // Yellow
      quote: "Creation is who we are - building, long-term value, empowerment"
    }
  };

  // Background pieces for parallax effect
  const bgPieceWidth = 1529 * 2; // Actual image width (1529px) * scale factor (2)
  const bgPieces = [
    k.add([
      k.sprite(chapters[currentChapter].bg),
      k.pos(0, 0),
      k.scale(2),
      k.opacity(0.8),
    ]),
    k.add([
      k.sprite(chapters[currentChapter].bg),
      k.pos(bgPieceWidth, 0),
      k.scale(2),
      k.opacity(0.8),
    ]),
  ];

  const platforms = [
    k.add([k.sprite(chapters[currentChapter].platforms), k.pos(0, 450), k.scale(4)]),
    k.add([k.sprite(chapters[currentChapter].platforms), k.pos(384, 450), k.scale(4)]),
  ];

  const visionary = makeVisionary(k.vec2(200, 745));
  visionary.setControls();
  visionary.setEvents();

  const controlsText = k.add([
    k.text("Press Space/Click/Touch to Jump!", {
      font: "mania",
      size: 64,
    }),
    k.anchor("center"),
    k.pos(k.center()),
  ]);

  const dismissControlsAction = k.onButtonPress("jump", () => {
    k.destroy(controlsText);
    dismissControlsAction.cancel();
  });

  // Chapter display
  const chapterText = k.add([
    k.text(`Chapter ${currentChapter}: ${chapters[currentChapter].name}`, { 
      font: "mania", 
      size: 48 
    }),
    k.pos(20, 80),
    k.color(chapters[currentChapter].color),
  ]);

  const scoreText = k.add([
    k.text("INNOVATION SPARKS : 0", { font: "mania", size: 72 }),
    k.pos(20, 20),
  ]);
  
  let score = 0;
  let scoreMultiplier = 0;
  
  visionary.onCollide("authenticity-spark", (spark) => {
    k.play("ring", { volume: 0.5 });
    k.destroy(spark);
    score++;
    chapterProgress++;
    scoreText.text = `INNOVATION SPARKS : ${score}`;
    visionary.sparkCollectUI.text = "+1";
    k.wait(1, () => {
      visionary.sparkCollectUI.text = "";
    });
  });
  
  visionary.onCollide("enemy", (enemy) => {
    if (!visionary.isGrounded()) {
      k.play("destroy", { volume: 0.5 });
      k.play("hyper-ring", { volume: 0.5 });
      k.destroy(enemy);
      visionary.play("jump");
      visionary.jump();
      scoreMultiplier += 1;
      score += 10 * scoreMultiplier;
      chapterProgress += 10 * scoreMultiplier;
      scoreText.text = `INNOVATION SPARKS : ${score}`;
      if (scoreMultiplier === 1)
        visionary.sparkCollectUI.text = `+${10 * scoreMultiplier}`;
      if (scoreMultiplier > 1) visionary.sparkCollectUI.text = `x${scoreMultiplier}`;
      k.wait(1, () => {
        visionary.sparkCollectUI.text = "";
      });
      return;
    }

    k.play("hurt", { volume: 0.5 });
    k.setData("current-score", score);
    k.setData("current-chapter", currentChapter);
    k.go("gameover", citySfx);
  });

  let gameSpeed = 300;
  k.loop(1, () => {
    gameSpeed += 50;
  });

  // Chapter progression check
  k.loop(0.1, () => {
    if (currentChapter < 4 && chapterProgress >= chapterThresholds[currentChapter - 1]) {
      currentChapter++;
      chapterProgress = 0;
      
      // Update background and platforms
      bgPieces[0].useSprite(chapters[currentChapter].bg);
      bgPieces[1].useSprite(chapters[currentChapter].bg);
      platforms[0].useSprite(chapters[currentChapter].platforms);
      platforms[1].useSprite(chapters[currentChapter].platforms);
      
      // Update chapter display
      chapterText.text = `Chapter ${currentChapter}: ${chapters[currentChapter].name}`;
      chapterText.color = chapters[currentChapter].color;
      
      // Show chapter transition message
      const transitionText = k.add([
        k.text(chapters[currentChapter].quote, { 
          font: "mania", 
          size: 32 
        }),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y + 100),
        k.color(chapters[currentChapter].color),
      ]);
      
      k.wait(3, () => {
        k.destroy(transitionText);
      });
    }
  });

  const spawnAIAgent = () => {
    const enemy = makeAIAgent(k.vec2(1950, 773));
    enemy.onUpdate(() => {
      if (gameSpeed < 3000) {
        enemy.move(-(gameSpeed + 300), 0);
        return;
      }
      enemy.move(-gameSpeed, 0);
    });

    enemy.onExitScreen(() => {
      if (enemy.pos.x < 0) k.destroy(enemy);
    });

    const waitTime = k.rand(0.5, 2.5);
    k.wait(waitTime, spawnAIAgent);
  };

  spawnAIAgent();

  const spawnAuthenticitySpark = () => {
    const spark = makeAuthenticitySpark(k.vec2(1950, 745));
    spark.onUpdate(() => {
      spark.move(-gameSpeed, 0);
    });
    spark.onExitScreen(() => {
      if (spark.pos.x < 0) k.destroy(spark);
    });

    const waitTime = k.rand(0.5, 3);
    k.wait(waitTime, spawnAuthenticitySpark);
  };

  spawnAuthenticitySpark();

  k.add([
    k.rect(1920, 300),
    k.opacity(0),
    k.area(),
    k.pos(0, 832),
    k.body({ isStatic: true }),
    "platform",
  ]);

  k.onUpdate(() => {
    if (visionary.isGrounded()) scoreMultiplier = 0;

    // Ensure both background pieces use the same sprite for current chapter
    if (bgPieces[0].sprite !== chapters[currentChapter].bg) {
      bgPieces[0].useSprite(chapters[currentChapter].bg);
    }
    if (bgPieces[1].sprite !== chapters[currentChapter].bg) {
      bgPieces[1].useSprite(chapters[currentChapter].bg);
    }

    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth, 0);
      bgPieces.push(bgPieces.shift());
    }

    bgPieces[0].move(-100, 0);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth, 0);

    // for jump effect
    bgPieces[0].moveTo(bgPieces[0].pos.x, -visionary.pos.y / 10 - 50);
    bgPieces[1].moveTo(bgPieces[1].pos.x, -visionary.pos.y / 10 - 50);

    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 4, 450);
      platforms.push(platforms.shift());
    }

    platforms[0].move(-gameSpeed, 0);
    platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450);
  });
}
