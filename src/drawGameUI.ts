import k from "./initKaboom";
import { GameObj } from "kaboom";
import { LAYER } from "./data/definition";
import { g_GPoint, g_StageWidth, g_StagePosX, g_StagePosY, g_DPoint, g_Score } from "./data/global";
import { getGameItemCount } from "./data/item";

const { add, sprite, anchor, area, pos, z, vec2, scale, drawText, drawSprite, Color } = k;

export const drawGameUI = () => {
  //const isMobile: boolean = g_OSType == "OT_ANDROID" || g_OSType == "OT_IOS";
  const GAME_STATUS_X_POS = g_StagePosX;
  const GAME_STATUS_Y_POS = g_StagePosY;
  const GPOINT_X_POS = g_StagePosX + g_StageWidth / 2 - 100;
  const GPOINT_Y_POS = 40;
  const GPOINT_WIDTH = 200;
  const BTN_WIDTH = 50;
  const FULLSCREEN_BTN_Y_POS = GAME_STATUS_Y_POS + 5;
  const PAUSE_BTN_X_POS = g_StagePosX + g_StageWidth - BTN_WIDTH - 5;
  const PAUSE_BTN_Y_POS = GAME_STATUS_Y_POS + 40;
  const SLOW_BTN_X_POS = PAUSE_BTN_X_POS - BTN_WIDTH - 15;
  const SLOW_BTN_Y_POS = FULLSCREEN_BTN_Y_POS;
  const AUTO_CLEAN_BTN_X_POS = SLOW_BTN_X_POS - BTN_WIDTH - 15;
  const AUTO_CLEAN_BTN_Y_POS = FULLSCREEN_BTN_Y_POS;
  const AUTO_RECYCLE_BTN_X_POS = AUTO_CLEAN_BTN_X_POS - BTN_WIDTH - 15;
  const AUTO_RECYCLE_BTN_Y_POS = FULLSCREEN_BTN_Y_POS;
  const LIFE_X_POS = PAUSE_BTN_X_POS - 320;
  const LIFE_Y_POS = GAME_STATUS_Y_POS + 40;
  const LIFE_WIDTH = 48;

  const TOOL_WIDTH = 128;
  const CLEAN_TOOL_X_POS = g_StagePosX + 30;
  const CLEAN_TOOL_Y_POS = g_StagePosY + 20;
  const SEPARATION_TOOL_X_POS = CLEAN_TOOL_X_POS + TOOL_WIDTH + 10;
  const SEPARATION_TOOL_Y_POS = CLEAN_TOOL_Y_POS;
  const COMPRESSION_TOOL_X_POS = SEPARATION_TOOL_X_POS + TOOL_WIDTH + 10;
  const COMPRESSION_TOOL_Y_POS = CLEAN_TOOL_Y_POS;

  add([
    pos(GAME_STATUS_X_POS, GAME_STATUS_Y_POS),
    z(LAYER.UI),
    {
      draw(this: GameObj): void {
        drawText({
          text: g_Score.toString(),
          pos: vec2(GPOINT_X_POS, GPOINT_Y_POS),
          size: 100,
          align: "center",
          width: GPOINT_WIDTH,
          font: "LilitaOne-Regular",
          color: Color.WHITE,
        });
        drawSprite({
          sprite: g_DPoint < 5 ? "life" : "life_d",
          anchor: "topleft",
          pos: vec2(LIFE_X_POS, LIFE_Y_POS),
        });
        drawSprite({
          sprite: g_DPoint < 4 ? "life" : "life_d",
          anchor: "topleft",
          pos: vec2(LIFE_X_POS + LIFE_WIDTH, LIFE_Y_POS),
        });
        drawSprite({
          sprite: g_DPoint < 3 ? "life" : "life_d",
          anchor: "topleft",
          pos: vec2(LIFE_X_POS + LIFE_WIDTH + LIFE_WIDTH, LIFE_Y_POS),
        });
        drawSprite({
          sprite: g_DPoint < 2 ? "life" : "life_d",
          anchor: "topleft",
          pos: vec2(LIFE_X_POS + LIFE_WIDTH + LIFE_WIDTH + LIFE_WIDTH, LIFE_Y_POS),
        });
        drawSprite({
          sprite: g_DPoint < 1 ? "life" : "life_d",
          anchor: "topleft",
          pos: vec2(LIFE_X_POS + LIFE_WIDTH + LIFE_WIDTH + LIFE_WIDTH + LIFE_WIDTH, LIFE_Y_POS),
        });
      },
    },
  ]);

  add([sprite("pause"), pos(PAUSE_BTN_X_POS, PAUSE_BTN_Y_POS), anchor("topleft"), area(), z(LAYER.UI), "PauseButton", "HoverCursor"]);

  add([sprite("cleanTool"), area(), scale(1.0), anchor("topleft"), pos(CLEAN_TOOL_X_POS, CLEAN_TOOL_Y_POS), z(LAYER.TOOL), "CleanTool"]);
  add([sprite("separationTool"), area(), scale(1.0), anchor("topleft"), pos(SEPARATION_TOOL_X_POS, SEPARATION_TOOL_Y_POS), z(LAYER.TOOL), "SeparationTool"]);
  add([
    sprite("compressionTool"),
    area(),
    scale(1.0),
    anchor("topleft"),
    pos(COMPRESSION_TOOL_X_POS, COMPRESSION_TOOL_Y_POS),
    z(LAYER.TOOL),
    "CompressionTool",
  ]);

  const autoRecycleBtn = add([
    sprite("autoRecycle"),
    pos(AUTO_RECYCLE_BTN_X_POS, AUTO_RECYCLE_BTN_Y_POS),
    anchor("topleft"),
    scale(1.0),
    area(),
    z(LAYER.UI),
    "AutoRecycleBtn",
    "HoverCursor",
    "HoverScaleUp",
  ]);
  autoRecycleBtn.hidden = true;

  const autoRecycleItemCount = add([
    anchor("topleft"),
    z(LAYER.ACTION),
    {
      draw(this: GameObj): void {
        drawText({
          text: getGameItemCount("IT_AUTO_RECYCLE").toString(),
          pos: vec2(autoRecycleBtn.pos.x, autoRecycleBtn.pos.y + autoRecycleBtn.height - 20),
          size: 30,
          align: "center",
          width: autoRecycleBtn.width,
          font: "LilitaOne-Regular",
          color: Color.WHITE,
        });
      },
    },
  ]);
  autoRecycleItemCount.hidden = true;

  const autoCleanBtn = add([
    sprite("autoClean"),
    pos(AUTO_CLEAN_BTN_X_POS, AUTO_CLEAN_BTN_Y_POS),
    anchor("topleft"),
    scale(1.0),
    area(),
    z(LAYER.UI),
    "AutoCleanBtn",
    "HoverCursor",
    "HoverScaleUp",
  ]);
  autoCleanBtn.hidden = true;

  const autoCleanItemCount = add([
    anchor("topleft"),
    z(LAYER.ACTION),
    {
      draw(this: GameObj): void {
        drawText({
          text: getGameItemCount("IT_AUTO_CLEAN").toString(),
          pos: vec2(autoCleanBtn.pos.x, autoCleanBtn.pos.y + autoCleanBtn.height - 20),
          size: 30,
          align: "center",
          width: autoCleanBtn.width,
          font: "LilitaOne-Regular",
          color: Color.WHITE,
        });
      },
    },
  ]);
  autoCleanItemCount.hidden = true;

  const slowConBeltBtn = add([
    sprite("slowConBelt"),
    pos(SLOW_BTN_X_POS, SLOW_BTN_Y_POS),
    anchor("topleft"),
    scale(1.0),
    area(),
    z(LAYER.UI),
    "SlowConBeltBtn",
    "HoverCursor",
    "HoverScaleUp",
  ]);
  slowConBeltBtn.hidden = true;

  const slowConBeltItemCount = add([
    anchor("topleft"),
    z(LAYER.ACTION),
    {
      draw(this: GameObj): void {
        drawText({
          text: getGameItemCount("IT_SLOW_CONBELT").toString(),
          pos: vec2(slowConBeltBtn.pos.x, slowConBeltBtn.pos.y + slowConBeltBtn.height - 20),
          size: 30,
          align: "center",
          width: slowConBeltBtn.width,
          font: "LilitaOne-Regular",
          color: Color.WHITE,
        });
      },
    },
  ]);
  slowConBeltItemCount.hidden = true;
};
