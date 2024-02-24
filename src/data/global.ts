import { GAME_STATE, IBinInfo, OS_TYPE } from "./definition";
import * as Cookies from "typescript-cookie";
import { getGameItemCount } from "./item";
import { AudioPlay } from "kaboom";

export let g_OSType: OS_TYPE = "OT_UNKNOWN";
export let g_Version: number = 100;

const STAGE_WIDTH = 960;
const STAGE_HEIGHT = 640;

export let g_PageWidth = 0;
export let g_PageHeight = 0;
export let g_CanvasWidth = 0;
export let g_CanvasHeight = 0;
export let g_InitStageWidth = STAGE_WIDTH;
export let g_InitStageHeight = STAGE_HEIGHT;
export let g_StageWidth = STAGE_WIDTH;
export let g_StageHeight = STAGE_HEIGHT;
export let g_StagePosX = 0;
export let g_StagePosY = 0;
export let g_StageScale = 1.0;

export let g_GameScene = "intro";
export let g_GameState: GAME_STATE = "GS_READY";
export let g_OldGameState: GAME_STATE = "GS_READY";

export let g_BinInfo: IBinInfo;
export let g_CurrentTutorialPage: number = -1;

export let g_Score =0;
export let g_GPoint = 0;
export let g_DPoint = 0;
export let g_GameCoin = Cookies.getCookie("GR_coin") != undefined ? Number(Cookies.getCookie("GR_coin")) : 100;
export let g_StageCoin = 100;

export let g_CurrentLevel = 0;

export let g_SoundOn = Cookies.getCookie("GR_Sound") == "true" ? true : false;
export let g_MusicOn = Cookies.getCookie("GR_Music") == "true" ? true : false;
export let g_BGM: AudioPlay | null = null;

export let g_StarCounts: string[] =
  Cookies.getCookie("GR_Stage") == undefined
    ? [
        "level0Star",
        "level0Star",
        "level0Star",
        "level0Star",
        "level0Star",
        "level0Star",
        "level0Star",
        "level0Star",
        "level0Star",
        "level0Star",
        "level0Star",
        "level0Star",
        "level0Star",
        "level0Star",
        "level0Star",
        "level0Star",
        "level0Star",
        "level0Star",
        "level0Star",
        "level0Star",
      ]
    : savedGameStar();
export function savedGameStar() {
  let star: string[] = [];
  let starString = Cookies.getCookie("GR_Stage");
  if (starString == undefined) return [];
  for (let i = 0; i < starString.length; i++) {
    if (starString[i] == " ") continue;
    if (starString[i] == "0") {
      star.push("level0Star");
    } else if (starString[i] == "1") {
      star.push("level1Star");
    } else if (starString[i] == "2") {
      star.push("level2Star");
    } else if (starString[i] == "3") {
      star.push("level3Star");
    }
  }
  return star;
}
export function setOSType(value: OS_TYPE) {
  g_OSType = value;
}

export function initStagePos(pageWidth: number, pageHeight: number, canvasWidth: number, canvasHeight: number, canvasScale: number) {
  g_PageWidth = pageWidth;
  g_PageHeight = pageHeight;
  g_CanvasWidth = canvasWidth;
  g_CanvasHeight = canvasHeight;
  g_StagePosX = (canvasWidth - g_StageWidth) / 2;
  g_StagePosY = (canvasHeight - g_StageHeight) / 2;
  g_StageScale = canvasScale;
}

export function initBinInfo(info: IBinInfo) {
  g_BinInfo = info;
}

export function setGameScene(value: string) {
  g_GameScene = value;
}

export function setGameState(value: GAME_STATE) {
  g_OldGameState = g_GameState;
  g_GameState = value;
}

export function restoreGameState() {
  g_GameState = g_OldGameState;
}

export function setCurrentLevel(value: number) {
  g_CurrentLevel = value;
}

export function setStageFull(full: boolean) {
  g_StageWidth = full ? g_CanvasWidth : STAGE_WIDTH;
  g_StageHeight = full ? g_CanvasHeight : STAGE_HEIGHT;
  g_StagePosX = full ? 0 : (g_CanvasWidth - g_StageWidth) / 2;
  g_StagePosY = full ? 0 : (g_CanvasHeight - g_StageHeight) / 2;
}

export function setSoundOn(value: boolean) {
  g_SoundOn = value;
  Cookies.setCookie("GR_Sound", g_SoundOn);
}
export function setMusicOn(value: boolean) {
  g_MusicOn = value;
  Cookies.setCookie("GR_Music", g_MusicOn);
}

export function setBGM(bgm: AudioPlay) {
  g_BGM = bgm;
}

export function setGameCoin(value: number) {
  g_GameCoin = value;
  Cookies.setCookie("GR_coin", g_GameCoin);
}

export function setStageCoin(value: number) {
  g_StageCoin = value;
}

export function setGPoint(value: number) {
  g_GPoint = value;
}

export function setDPoint(value: number) {
  g_DPoint = value;
}

export function setScore(value: number) {
  g_Score = value;
}

export function setCurrentTurorialPage(page: number) {
  g_CurrentTutorialPage = page;
}

export function incGameCoin(value: number) {
  g_GameCoin = g_GameCoin + value;
  Cookies.setCookie("GR_coin", g_GameCoin);
}

export function incStageCoin(value: number) {
  g_StageCoin = g_StageCoin + value;
}

export function incScore(value: number) {
  g_Score += value;
}

export function incGPoint(value: number) {
  g_GPoint = g_GPoint + value;
}

export function incDPoint(value: number) {
  g_DPoint = g_DPoint + value;
}

export function saveItem() {
  Cookies.setCookie("GR_item_SlowConbelt", getGameItemCount("IT_SLOW_CONBELT"));
  Cookies.setCookie("GR_item_AutoClean", getGameItemCount("IT_AUTO_CLEAN"));
  Cookies.setCookie("GR_item_AutoRecycle", getGameItemCount("IT_AUTO_RECYCLE"));
}
export function saveProgress() {
  let gameStar: string = "";
  g_StarCounts.forEach((value: string) => {
    gameStar += value + " ";
  });
  Cookies.setCookie("GR_Stage", gameStar);
}
