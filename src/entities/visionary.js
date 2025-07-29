import k from "../kaplayCtx";

export function makeVisionary(pos) {
  const visionary = k.add([
    k.sprite("visionary", { anim: "run" }),
    k.scale(0.5), // Increased scale from 0.4 to 0.5
    k.area(),
    k.anchor("center"),
    k.pos(pos), // No Y offset - let physics handle positioning
    k.body({ jumpForce: 1700 }),
    {
      sparkCollectUI: null,
      setControls() {
        k.onButtonPress("jump", () => {
          if (this.isGrounded()) {
            this.play("jump");
            this.jump();
            k.play("jump", { volume: 0.5 });
          }
        });
      },
      setEvents() {
        this.onGround(() => {
          this.play("run");
        });
      },
    },
  ]);

  visionary.sparkCollectUI = visionary.add([
    k.text("", { font: "mania", size: 48 }), // Increased font size
    k.color(255, 255, 0),
    k.anchor("center"),
    k.pos(30, -10),
  ]);

  return visionary;
} 