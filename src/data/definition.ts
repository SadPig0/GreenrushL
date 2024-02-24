import { Color, GameObj, Vec2 } from "kaboom";
import { RECYCLE_TYPE } from "./recycle";

export const LAYER = {
  OUTDOOR: 1,
  BG: 2,
  TOOL: 3,
  ITEM_1: 4,
  ITEM_2: 5,
  ITEM_3: 6,
  UI: 7,
  ACTION: 8,
  CURSOR: 9,
  COVER_OUTSIDE: 30,
} as const;

type LAYER = (typeof LAYER)[keyof typeof LAYER];

export type OS_TYPE = "OT_ANDROID" | "OT_IOS" | "OT_MACOS" | "OT_WINDOWS" | "OT_UNKNOWN";

export type GAME_STATE = "GS_READY" | "GS_PLAYING" | "GS_PAUSE" | "GS_GAMEOVER";

export type RANDOM_EFFECT = "RE_RAIN" | "RE_THUNDER" | "RE_MICE" | "RE_CLOUD";

export interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface ICreditInfo {
  name: string;
  grade: string;
  school: string;
}

export interface IConBeltInfo {
  name: string;
  pos: Vec2;
  dir: number;
  speed: number;
  loopInterval: number;
  incinerator: number;
  isGenerator: boolean;
  connectedConBelt: number;
  wayPoints: Vec2[];
  dropCurvePoints: Vec2[];
  dropCurveLength: number;
  pointsInitialized: boolean;
  portal: GameObj | undefined;
}

export interface IRecycleBinInfo {
  name: string;
  type: RECYCLE_TYPE;
}

export interface IStageInfo {
  index: number;
  bkgMainImage: string;
  bkgBackImage: string;
  bkgColor: Color;
  bgm: string;
  gPoint: number;
  icineratorRect: IRect[];
  conBeltInfo: IConBeltInfo[];
  recycleBinInfo: IRecycleBinInfo[];
  randomEffect: RANDOM_EFFECT[];
}

export interface IBinInfo {
  width: number;
  scale: number;
  pos: Vec2;
}
