import k from "../kaplayCtx";

export function makeAuthenticitySpark(pos) {
  return k.add([
    k.sprite("authenticity-spark", { anim: "spin" }),
    k.area(),
    k.scale(0.4),
    k.anchor("center"),
    k.pos(pos),
    k.offscreen(),
    "authenticity-spark",
  ]);
} 