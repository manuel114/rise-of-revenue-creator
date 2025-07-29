import k from "../kaplayCtx";

export function makeAIAgent(pos) {
  return k.add([
    k.sprite("ai-agent", { anim: "run" }),
    k.area({ shape: new k.Rect(k.vec2(-5, 0), 32, 32) }),
    k.scale(0.4),
    k.anchor("center"),
    k.pos(pos.x, pos.y - 23), // Move AI Agent up by 23 pixels
    k.offscreen(),
    "enemy",
  ]);
} 