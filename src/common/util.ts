import k from "../initKaboom";
import { GameObj, Vec2 } from "kaboom";
import { LAYER } from "../data/definition";
import { g_StagePosX, g_StagePosY, g_StageWidth, g_SoundOn, g_MusicOn, setBGM, g_BGM } from "../data/global";

const { add, sprite, area, vec2, rect, anchor, color, pos, z, height, onUpdate, play } = k;

export function PointInRect(x: number, y: number, x1: number, y1: number, x2: number, y2: number): boolean {
  if (x > x1 && x < x2 && y > y1 && y < y2) return true;
  else return false;
}

export function getPointsQBezierCurves(p0: Vec2, p1: Vec2, p2: Vec2, n: number): Vec2[] {
  const curvePoints: Vec2[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    curvePoints.push(getPointQBezierPoint(p0, p1, p2, t));
  }
  return curvePoints;
}

function getPointQBezierPoint(p0: Vec2, p1: Vec2, p2: Vec2, t: number): Vec2 {
  if (t === 0) return p0;
  if (t === 1) return p2;

  const s = 1 - t;

  // (s²)A + 2(st)B + (t²)C
  const x: number = Math.pow(s, 2) * p0.x + 2 * (s * t) * p1.x + Math.pow(t, 2) * p2.x;
  const y: number = Math.pow(s, 2) * p0.y + 2 * (s * t) * p1.y + Math.pow(t, 2) * p2.y;
  return vec2(x, y);
}

export function getBezierControlPoint(p0: Vec2, p2: Vec2, h: number): Vec2 {
  // Find the slope of the base line
  var slope = (p2.y - p0.y) / (p2.x - p0.x);

  // Find the midpoint of the base line
  var midpointX = (p0.x + p2.x) / 2;
  var midpointY = (p0.y + p2.y) / 2;

  // Find the perpendicular slope
  var perpendicularSlope = -1 / slope;

  // Find the distance from the midpoint to the third point
  var distance = Math.sqrt((h * h) / (1 + perpendicularSlope * perpendicularSlope));

  // Find the coordinates of the third point
  var offsetX = distance / Math.sqrt(1 + perpendicularSlope * perpendicularSlope);
  var offsetY = perpendicularSlope * offsetX;

  return vec2(p0.x < p2.x ? midpointX + offsetX : midpointX - offsetX, p0.x < p2.x ? midpointY + offsetY : midpointY - offsetY);
}

export function getBezierCurveLength(p0: Vec2, p1: Vec2, p2: Vec2): number {
  const curvePoints: Vec2[] = getPointsQBezierCurves(p0, p1, p2, 9);
  return curvePoints.reduce<number>((result: number, value: Vec2, index: number): number => {
    return result + (index < curvePoints.length - 1 ? value.dist(curvePoints[index + 1]) : 0);
  }, 0);
}

export function coverStageOutside(h: number = 0, col: number[] = [0, 0, 0]) {
  if (h == 0) h = height();

  add([rect(g_StagePosX, h), anchor("topleft"), pos(0, 0), color(0, 0, 0), z(LAYER.COVER_OUTSIDE)]);
  add([rect(g_StagePosX, h), anchor("topleft"), pos(g_StagePosX + g_StageWidth, 0), color(col[0], col[1], col[2]), z(LAYER.COVER_OUTSIDE)]);
}

export function bkgScroll(name: string, layer: number, speed: number) {
  add([sprite(name), anchor("topleft"), area(), pos(g_StagePosX, g_StagePosY), z(layer), name]);
  add([sprite(name), anchor("topleft"), area(), pos(g_StagePosX - g_StageWidth, g_StagePosY), z(layer), name]);
  onUpdate(name, (bkg: GameObj) => {
    bkg.move(speed, 0);
    if (bkg.pos.x >= g_StagePosX + g_StageWidth) {
      bkg.destroy();
      add([sprite(name), area(), pos(g_StagePosX - g_StageWidth, g_StagePosY), z(layer), name, "BkgScroll"]);
    }
  });
}

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const repeat =
  (n: number) =>
  (f: (x: any) => any) =>
  (x: any): any => {
    if (n > 0) return repeat(n - 1)(f)(f(x));
    else return x;
  };

export const times =
  (n: number, reverse: boolean = false) =>
  (f: (i: number) => void) =>
    repeat(n)((i) => (f(i), i + (reverse ? -1 : 1)))(reverse ? n : 0);

export const once = function (this: any, fn: (...args: any[]) => any) {
  let called = false;
  return function (this: any, ...args: any[]) {
    if (called) return;
    called = true;
    return fn.apply(this, args);
  };
};

export function playMusic(name: string, loop: boolean = false) {
  if (!g_MusicOn) return;

  if (g_BGM) g_BGM.stop();
  setBGM(play(name, { loop: loop }));
}

export function stopMusic() {
  if (g_BGM) g_BGM.stop();
}

export function playSound(name: string, loop: boolean = false) {
  if (!g_SoundOn) return;
  play(name, { loop: loop });
}
