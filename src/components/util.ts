import k from "../initKaboom";
import { GameObj, Color, Vec2 } from "kaboom";

const { scale, wave, time, mousePos, tween, drawRect, rgb, vec2, easings, setCursor } = k;

export const scaleUpDown = () => {
  return {
    id: "scaleUpDown",
    require: ["scale"],
    update(this: GameObj) {
      this.use(scale(wave(1, 1.4, time() * 10)));
    },
  };
};

export const spin = (direction: number) => {
  return {
    id: "spin",
    require: ["rotate"],
    update(this: GameObj) {
      this.angle = direction == 0 ? time() * 120 : time() * -120;
    },
  };
};

export const blink = (speed: number) => {
  return {
    id: "blink",
    require: ["opacity"],
    update(this: GameObj) {
      this.opacity = wave(0.5, 1.0, time() * speed);
    },
  };
};

export const mouseMove = () => {
  return {
    id: "mouseMove",
    require: ["pos"],
    update(this: GameObj) {
      this.pos = mousePos();
      setCursor("none");
    },
  };
};

export const moving = (xVel: number, yVel: number) => {
  return {
    id: "moving",
    require: ["pos"],
    xVel: xVel,
    yVel: yVel,
    isBack: false,
    update(this: GameObj) {
      this.move(this.xVel, this.yVel);
    },
  };
};

export const progressBar = (time: number, width: number, height: number, bkgColor: Color, progressColor: Color) => {
  return {
    id: "progressBar",
    require: ["pos"],
    progressVal: 0,

    add(this: GameObj) {
      tween(0, width, time, (val) => (this.progressVal = val), easings.linear);
    },
    onProgressEnd(this: GameObj, action: () => void) {
      return this.on("progressEnd", action);
    },
    update(this: GameObj): void {
      if (this.progressVal == width) this.trigger("progressEnd");
    },
    draw(this: GameObj): void {
      drawRect({
        width: width,
        height: height,
        radius: 5,
        anchor: "topleft",
        pos: vec2(0, 0),
        color: bkgColor,
        outline: { color: rgb(0, 0, 0), width: 2 },
      });
      drawRect({
        width: this.progressVal,
        height: height,
        radius: 5,
        anchor: "topleft",
        pos: vec2(0, 0),
        color: progressColor,
        outline: { color: rgb(0, 0, 0), width: 2 },
      });
    },
  };
};

export const drag = () => {
  let offset: Vec2 = vec2(0);

  return {
    id: "drag",
    require: ["pos", "area"],
    pick(this: GameObj) {
      this.isDragging = true;
      offset = mousePos().sub(this.pos);
      this.trigger("drag");
    },

    update(this: GameObj) {
      if (this.isDragging) {
        this.pos = mousePos().sub(offset);
        this.trigger("dragUpdate");
      }
    },
    onDrag(this: GameObj, action: () => void) {
      return this.on("drag", action);
    },
    onDragUpdate(this: GameObj, action: () => void) {
      return this.on("dragUpdate", action);
    },
    onDragEnd(this: GameObj, action: (obj: GameObj) => void) {
      return this.on("dragEnd", action);
    },
  };
};
