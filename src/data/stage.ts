import k from "../initKaboom";
import { GameObj, Vec2 } from "kaboom";
import { IConBeltInfo, IRect, IStageInfo } from "./definition";
import { getBezierControlPoint, getPointsQBezierCurves } from "../common/util";
import { g_StagePosX, g_StagePosY, g_StageWidth } from "./global";

const { vec2, rgb, get } = k;

const INIT_CONBELT_SPEED_1 = 100;
const INIT_CONBELT_SPEED_2 = 130;
const INIT_CONBELT_SPEED_3 = 150;

export let stageInfo: IStageInfo[] = [
  {
    index: 0,
    bkgMainImage: "bkgM01",
    bkgBackImage: "",
    bkgColor: rgb(0, 77, 129),
    bgm: "bgm01",
    gPoint: 8,
    icineratorRect: [],
    randomEffect: [],
    conBeltInfo: [
      {
        name: "conBeltR",
        pos: vec2(0),
        dir: 0,
        incinerator: 0,
        isGenerator: true,
        connectedConBelt: -1,
        speed: 80,
        loopInterval: 7,
        wayPoints: [],
        dropCurvePoints: [],
        dropCurveLength: 0,
        pointsInitialized: false,
        portal: undefined,
      },
    ],
    recycleBinInfo: [
      { name: "rb01", type: "RT_PLASTIC" },
      { name: "rb03", type: "RT_PAPER" },
      { name: "rb07", type: "RT_GLASS" },
    ],
  },
  {
    index: 1,
    bkgMainImage: "bkgM02",
    bkgBackImage: "",
    bkgColor: rgb(0, 77, 129),
    bgm: "bgm02",
    gPoint: 10,
    icineratorRect: [],
    randomEffect: [],
    conBeltInfo: [
      {
        name: "conBeltR",
        pos: vec2(0),
        dir: 0,
        incinerator: 0,
        isGenerator: true,
        connectedConBelt: -1,
        speed: 80,
        loopInterval: 6.5,
        wayPoints: [],
        dropCurvePoints: [],
        dropCurveLength: 0,
        pointsInitialized: false,
        portal: undefined,
      },
    ],
    recycleBinInfo: [
      { name: "rb01", type: "RT_PLASTIC" },
      { name: "rb03", type: "RT_PAPER" },
      { name: "rb05", type: "RT_CAN" },
      { name: "rb07", type: "RT_GLASS" },
    ],
  },
  {
    index: 2,
    bkgMainImage: "bkgM03",
    bkgBackImage: "",
    bkgColor: rgb(0, 77, 129),
    bgm: "bgm03",
    gPoint: 10,
    icineratorRect: [],
    randomEffect: [],
    conBeltInfo: [
      {
        name: "conBeltL",
        pos: vec2(0),
        dir: 0,
        incinerator: 0,
        isGenerator: true,
        connectedConBelt: -1,
        speed: 90,
        loopInterval: 6,
        wayPoints: [],
        dropCurvePoints: [],
        dropCurveLength: 0,
        pointsInitialized: false,
        portal: undefined,
      },
    ],
    recycleBinInfo: [
      { name: "rb01", type: "RT_PLASTIC" },
      { name: "rb03", type: "RT_PAPER" },
      { name: "rb05", type: "RT_CAN" },
      { name: "rb07", type: "RT_GLASS" },
      { name: "rb02", type: "RT_VINYL" },
    ],
  },
  {
    index: 3,
    bkgMainImage: "bkgM01",
    bkgBackImage: "",
    bkgColor: rgb(0, 0, 0),
    bgm: "bgm01",
    gPoint: 10,
    icineratorRect: [{ x: 780, y: 410, width: -1, height: -1 }],
    randomEffect: [],
    conBeltInfo: [
      {
        name: "conBeltL",
        pos: vec2(0),
        dir: 0,
        incinerator: 0,
        isGenerator: true,
        connectedConBelt: -1,
        speed: 90,
        loopInterval: 5.5,
        wayPoints: [],
        dropCurvePoints: [],
        dropCurveLength: 0,
        pointsInitialized: false,
        portal: undefined,
      },
    ],
    recycleBinInfo: [
      { name: "rb01", type: "RT_PLASTIC" },
      { name: "rb03", type: "RT_PAPER" },
      { name: "rb05", type: "RT_CAN" },
      { name: "rb07", type: "RT_GLASS" },
      { name: "rb09", type: "RT_STYROFOAM" },
      { name: "rb02", type: "RT_VINYL" },
    ],
  },
  {
    index: 4,
    bkgMainImage: "bkgM03",
    bkgBackImage: "",
    bkgColor: rgb(0, 0, 0),
    bgm: "bgm03",
    gPoint: 15,
    icineratorRect: [{ x: 400, y: 410, width: -1, height: -1 }],
    randomEffect: [],
    conBeltInfo: [
      {
        name: "conBeltR",
        pos: vec2(0),
        dir: 0,
        incinerator: 0,
        isGenerator: true,
        connectedConBelt: -1,
        speed: 85,
        loopInterval: 5.5,
        wayPoints: [],
        dropCurvePoints: [],
        dropCurveLength: 0,
        pointsInitialized: false,
        portal: undefined,
      },
      {
        name: "conBeltL",
        pos: vec2(0),
        dir: 0,
        incinerator: 0,
        isGenerator: true,
        connectedConBelt: -1,
        speed: 85,
        loopInterval: 5.5,
        wayPoints: [],
        dropCurvePoints: [],
        dropCurveLength: 0,
        pointsInitialized: false,
        portal: undefined,
      },
    ],
    recycleBinInfo: [
      { name: "rb01", type: "RT_PLASTIC" },
      { name: "rb03", type: "RT_PAPER" },
      { name: "rb05", type: "RT_CAN" },
      { name: "rb07", type: "RT_GLASS" },
      { name: "rb09", type: "RT_STYROFOAM" },
      { name: "rb02", type: "RT_VINYL" },
      { name: "rb10", type: "RT_FOOD" }, 
      { name: "rb08", type: "RT_GARAGE_BAG" },
    ],
  },
];

// export function setConBeltSpeed(stage: number, speed: number) {
//   stageInfo[stage].conBeltInfo.forEach((conBelt: IConBeltInfo) => {
//     conBelt.oldSpeed = conBelt.speed;
//     conBelt.speed = speed;
//   });
//   get("Recycle").forEach((obj: GameObj) => {
//     obj.oldSpeed = obj.speed;
//     obj.speed = speed;
//   });
// }

// export function restoreConBeltSpeed(stage: number) {
//   stageInfo[stage].conBeltInfo.forEach((conBelt: IConBeltInfo) => (conBelt.speed = conBelt.oldSpeed));
//   get("Recycle").forEach((obj: GameObj) => {
//     obj.speed = obj.oldSpeed;
//   });
// }



export function initConBeltData(stage: number) {
  stageInfo[stage].conBeltInfo.forEach((conBelt: IConBeltInfo) => {
    //conBelt.speed = conBelt.initSpeed;
    conBelt.pos =
      conBelt.dir == 0
        ? vec2(conBelt.pos.x + g_StagePosX, conBelt.pos.y + g_StagePosY)
        : vec2(conBelt.pos.x + g_StagePosX + g_StageWidth, conBelt.pos.y + g_StagePosY);
  });
}

export function initWayPoint(stage: number) {
  stageInfo[stage].conBeltInfo.forEach((cb) => {
    /*if (!cb.pointsInitialized)*/ {
      cb.wayPoints.forEach((point) => {
        point.x += g_StagePosX + cb.pos.x;
        point.y += g_StagePosY + cb.pos.y;
      });

      initCurvePoint(stage, cb);
      cb.pointsInitialized = true;
    }
  });
}

export function resetWayPoint(stage: number) {
  stageInfo[stage].conBeltInfo.forEach((cb) => {
    cb.wayPoints.forEach((point) => {
      point.x -= g_StagePosX + cb.pos.x;
      point.y -= g_StagePosY + cb.pos.y;
    });
  });
}

export function initCurvePoint(stage: number, conBelt: IConBeltInfo) {
  const p0: Vec2 = conBelt.wayPoints[conBelt.wayPoints.length - 1];
  const incineratorRect: IRect = stageInfo[stage].icineratorRect[conBelt.incinerator];
  const p2: Vec2 = vec2(g_StagePosX + incineratorRect.x + incineratorRect.width / 2, g_StagePosY + incineratorRect.y + incineratorRect.height / 2);
  const p1: Vec2 = getBezierControlPoint(p0, p2, 50);
  const curvePoints: Vec2[] = getPointsQBezierCurves(p0, p1, p2, 10);
  conBelt.dropCurvePoints = [...curvePoints];

  conBelt.dropCurveLength = curvePoints.reduce<number>((result: number, value: Vec2, index: number): number => {
    return result + (index < curvePoints.length - 1 ? value.dist(curvePoints[index + 1]) : 0);
  }, 0);
}
