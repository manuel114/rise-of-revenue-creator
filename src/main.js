import k from "./kaplayCtx";
import disclaimer from "./scenes/disclaimer";
import game from "./scenes/game";
import gameover from "./scenes/gameover";
import mainMenu from "./scenes/mainMenu";

// Load background assets for different chapters
k.loadSprite("sea-of-sameness-bg", "graphics/sea-of-sameness-bg.png");
k.loadSprite("culture-bg", "graphics/culture-bg.png");
k.loadSprite("community-bg", "graphics/community-bg.png");
k.loadSprite("creation-bg", "graphics/creation-bg.png");

// Load platform assets
k.loadSprite("grey-platforms", "graphics/grey-platforms.png");
k.loadSprite("neon-platforms", "graphics/neon-platforms.png");
k.loadSprite("network-platforms", "graphics/network-platforms.png");
k.loadSprite("forge-platforms", "graphics/forge-platforms.png");

// Load player character - The Visionary
k.loadSprite("visionary", "graphics/visionary.png", {
  sliceX: 6,
  sliceY: 2,
  anims: {
    run: { from: 0, to: 5, loop: true, speed: 30 },
    jump: { from: 6, to: 11, loop: true, speed: 100 },
  },
});

// Load single villain - The AI Agent
k.loadSprite("ai-agent", "graphics/ai-agent.png", {
  sliceX: 5,
  sliceY: 1,
  anims: {
    run: { from: 0, to: 4, loop: true, speed: 8 },
  },
});

// Load collectible - Authenticity Spark
k.loadSprite("authenticity-spark", "graphics/authenticity-spark.png", {
  sliceX: 5,
  sliceY: 1,
  anims: {
    spin: { from: 0, to: 4, loop: true, speed: 30 },
  },
});

k.loadFont("mania", "fonts/mania.ttf");
k.loadSound("destroy", "sounds/Destroy.wav");
k.loadSound("hurt", "sounds/Hurt.wav");
k.loadSound("hyper-ring", "sounds/HyperRing.wav");
k.loadSound("jump", "sounds/Jump.wav");
k.loadSound("ring", "sounds/Ring.wav");
k.loadSound("city", "sounds/city.mp3");

k.scene("disclaimer", disclaimer);
k.scene("main-menu", mainMenu);
k.scene("game", game);
k.scene("gameover", gameover);

k.go("disclaimer");
