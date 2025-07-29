import k from "../kaplayCtx";

export default function disclaimer() {
  k.add([
    k.text("THE RISE OF THE REVENUE CREATOR", { font: "mania", size: 96 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 300),
  ]);

  k.add([
    k.text("You are THE VISIONARY", { font: "mania", size: 48 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 200),
  ]);

  k.add([
    k.text("Breaking free from the Sea of Sameness,", { font: "mania", size: 32 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 150),
  ]);

  k.add([
    k.text("through the Culture Cradle, deep into Community Core,", { font: "mania", size: 32 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 100),
  ]);

  k.add([
    k.text("until you reach the Creation Forge.", { font: "mania", size: 32 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 50),
  ]);

  k.add([
    k.text("Jump on AI Agents to defeat them", { font: "mania", size: 32 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + 50),
  ]);

  k.add([
    k.text("Collect Innovation Sparks to grow stronger", { font: "mania", size: 32 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + 100),
  ]);

  k.add([
    k.text("Press Space/Click/Touch to Start Your Journey", { font: "mania", size: 32 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + 150),
  ]);

  k.onButtonPress("jump", () => k.go("main-menu"));
}
