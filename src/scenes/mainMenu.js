import k from "../kaplayCtx";
import { makeVisionary } from "../entities/visionary";

export default function mainMenu() {
  if (!k.getData("best-score")) k.setData("best-score", 0);
  k.onButtonPress("jump", () => k.go("game"));

  // Simplified chapters for main menu preview - always start with Sea of Sameness
  const menuChapters = [
    { bg: "sea-of-sameness-bg", platforms: "grey-platforms" },
    { bg: "chapter-2-bg", platforms: "neon-platforms" },
    { bg: "chapter-3-bg", platforms: "network-platforms" },
    { bg: "chapter-4-bg", platforms: "forge-platforms" },
  ];
  let currentMenuChapterIndex = 0; // Always start with Sea of Sameness (index 0)

  // Explicitly get the first chapter assets
  const initialChapter = menuChapters[currentMenuChapterIndex];
  console.log("Main menu starting with:", initialChapter.bg);

  // Background pieces for parallax effect - same as game scene
  const bgPieceWidth = 1529 * 2; // Actual image width (1529px) * scale factor (2)
  const bgPieces = [
    k.add([
      k.sprite("sea-of-sameness-bg"), // Hardcoded to ensure it starts correctly
      k.pos(0, 0),
      k.scale(2),
      k.opacity(0.8),
    ]),
    k.add([
      k.sprite("sea-of-sameness-bg"), // Hardcoded to ensure it starts correctly
      k.pos(bgPieceWidth, 0),
      k.scale(2),
      k.opacity(0.8),
    ]),
  ];

  const platforms = [
    k.add([k.sprite("grey-platforms"), k.pos(0, 450), k.scale(4)]), // Hardcoded to ensure it starts correctly
    k.add([k.sprite("grey-platforms"), k.pos(384, 450), k.scale(4)]), // Hardcoded to ensure it starts correctly
  ];

  k.add([
    k.text("THE RISE OF THE REVENUE CREATOR", { font: "mania", size: 96 }),
    k.anchor("center"),
    k.pos(k.center().x, 200),
  ]);

  k.add([
    k.text("Press Space/Click/Touch to Begin Your Journey", { font: "mania", size: 32 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 200),
  ]);

  makeVisionary(k.vec2(200, 745));
  const gameSpeed = 4000;
  
  // Add chapter cycling logic for main menu
  k.loop(5, () => { // Change chapter every 5 seconds
    currentMenuChapterIndex = (currentMenuChapterIndex + 1) % menuChapters.length;
    const nextChapter = menuChapters[currentMenuChapterIndex];
    console.log("Switching to chapter:", currentMenuChapterIndex, "with bg:", nextChapter.bg);

    // Update background sprites
    bgPieces[0].sprite = nextChapter.bg;
    bgPieces[1].sprite = nextChapter.bg;

    // Update platform sprites
    platforms[0].sprite = nextChapter.platforms;
    platforms[1].sprite = nextChapter.platforms;
  });

  k.onUpdate(() => {
    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth, 0);
      bgPieces.push(bgPieces.shift());
    }

    bgPieces[0].move(-100, 0);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth, 0);

    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 4, 450);
      platforms.push(platforms.shift());
    }

    platforms[0].move(-gameSpeed, 0);
    platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450);
  });
}
