import k from "../kaplayCtx";

export default function gameover(citySfx) {
  citySfx.paused = true;
  let bestScore = k.getData("best-score");
  const currentScore = k.getData("current-score");
  const currentChapter = k.getData("current-chapter") || 1;

  if (bestScore < currentScore) {
    k.setData("best-score", currentScore);
    bestScore = currentScore;
  }

  k.add([
    k.text("REVENUE CREATOR JOURNEY ENDED", { font: "mania", size: 96 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 350),
  ]);

  k.add([
    k.text(`BEST SCORE : ${bestScore}`, {
      font: "mania",
      size: 64,
    }),
    k.anchor("center"),
    k.pos(k.center().x - 400, k.center().y - 200),
  ]);
  k.add([
    k.text(`CURRENT SCORE : ${currentScore}`, {
      font: "mania",
      size: 64,
    }),
    k.anchor("center"),
    k.pos(k.center().x + 400, k.center().y - 200),
  ]);

  k.add([
    k.text(`CHAPTERS COMPLETED : ${Math.min(currentChapter, 4)}/4`, {
      font: "mania",
      size: 48,
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 100),
  ]);

  // Add motivational message based on performance
  let message = "";
  if (currentScore < 50) {
    message = "The Sea of Sameness awaits. Rise above mediocrity!";
  } else if (currentScore < 200) {
    message = "You're breaking free from the template!";
  } else if (currentScore < 400) {
    message = "Innovation flows through you!";
  } else {
    message = "You are a true Revenue Creator!";
  }

  k.add([
    k.text(message, {
      font: "mania",
      size: 32,
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + 100),
  ]);

  k.wait(1, () => {
    k.add([
      k.text("Press Space/Click/Touch to Continue Your Journey", {
        font: "mania",
        size: 64,
      }),
      k.anchor("center"),
      k.pos(k.center().x, k.center().y + 200),
    ]);
    k.onButtonPress("jump", () => k.go("game"));
  });
}
