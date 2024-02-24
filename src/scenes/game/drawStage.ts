import { stageInfo } from "../../data/stage";
import { LAYER } from "../../data/definition";
import {
  g_BinInfo,
  g_CanvasWidth,
  g_InitStageWidth,
  g_PageHeight,
  g_PageWidth,
  g_StageHeight,
  g_StagePosX,
  g_StagePosY,
  g_StageWidth,
  initBinInfo,
} from "../../data/global";
import k from "../../initKaboom";
import { times } from "../../common/util";

const { add, sprite, scale, pos, area, vec2, z } = k;

const drawConBelt_A = (stage: number) => {
  const CONBELT_WIDTH = 105;
  const CONBELT_HEIGHT = 220;
  const CONBELT_Y_POS = g_StagePosY + g_StageHeight - CONBELT_HEIGHT - 128;

  const INCINERATOR_WIDTH = 161;
  const CONBELT_COUNT = Math.trunc((g_StageWidth - INCINERATOR_WIDTH - 50) / CONBELT_WIDTH);

  times(CONBELT_COUNT)((index) =>
    add([sprite("conBeltR", { anim: "move" }), pos(g_StagePosX + index * CONBELT_WIDTH, CONBELT_Y_POS), z(LAYER.ITEM_1), "ConveyorBelt"])
  );

  const incinerator = add([
    sprite("incinerator"),
    pos(g_StagePosX + CONBELT_WIDTH * CONBELT_COUNT + 50, CONBELT_Y_POS + 100),
    area(),
    z(LAYER.BG),
    "Incinerator",
  ]);

  incinerator.add([sprite("fire", { anim: "fire", animSpeed: 1.0 }), pos(0, -40), z(LAYER.BG)]);
  incinerator.add([sprite("fire", { anim: "fire", animSpeed: 1.0 }), pos(0, -20), z(LAYER.BG)]);
  incinerator.add([sprite("fire", { anim: "fire", animSpeed: 1.0 }), pos(0, 10), z(LAYER.BG)]);

  stageInfo[stage].icineratorRect[0] = {
    x: incinerator.worldPos().x,
    y: incinerator.worldPos().y,
    width: incinerator.worldArea().bbox().width,
    height: incinerator.worldArea().bbox().height,
  };

  stageInfo[stage].conBeltInfo[0].pos = vec2(0, CONBELT_Y_POS);
  stageInfo[stage].conBeltInfo[0].wayPoints = [vec2(0, 80), vec2(CONBELT_WIDTH * CONBELT_COUNT, 80)];
};

const drawConBelt_B = (stage: number) => {
  const CONBELT_WIDTH = 105;
  const CONBELT_HEIGHT = 220;
  const CONBELT_Y_POS = g_StagePosY + g_StageHeight - CONBELT_HEIGHT - 128;

  const INCINERATOR_WIDTH = 161;
  const CONBELT_COUNT = Math.trunc((g_StageWidth - INCINERATOR_WIDTH - 50) / CONBELT_WIDTH);

  times(CONBELT_COUNT)((index) =>
    add([sprite("conBeltL", { anim: "move" }), pos(g_StagePosX + g_StageWidth - (index + 1) * CONBELT_WIDTH, CONBELT_Y_POS), z(LAYER.ITEM_1), "ConveyorBelt"])
  );

  const incinerator = add([
    sprite("incinerator"),
    pos(g_StagePosX + g_StageWidth - CONBELT_WIDTH * CONBELT_COUNT - INCINERATOR_WIDTH - 50, CONBELT_Y_POS + 100),
    area(),
    z(LAYER.BG),
    "Incinerator",
  ]);

  incinerator.add([sprite("fire", { anim: "fire", animSpeed: 1.0 }), pos(0, -40), z(LAYER.BG)]);
  incinerator.add([sprite("fire", { anim: "fire", animSpeed: 1.0 }), pos(0, -20), z(LAYER.BG)]);
  incinerator.add([sprite("fire", { anim: "fire", animSpeed: 1.0 }), pos(0, 10), z(LAYER.BG)]);

  stageInfo[stage].icineratorRect[0] = {
    x: incinerator.worldPos().x,
    y: incinerator.worldPos().y,
    width: incinerator.worldArea().bbox().width,
    height: incinerator.worldArea().bbox().height,
  };

  stageInfo[stage].conBeltInfo[0].pos = vec2(0, CONBELT_Y_POS);
  stageInfo[stage].conBeltInfo[0].wayPoints = [vec2(g_StagePosX + g_StageWidth, 80), vec2(g_StagePosX + g_StageWidth - CONBELT_WIDTH * CONBELT_COUNT, 80)];
};

const drawConBelt_C = (stage: number) => {
  const CONBELT_WIDTH = 105;
  const CONBELT_HEIGHT = 220;
  const CONBELT_Y_POS = g_StagePosY + g_StageHeight - CONBELT_HEIGHT - 128;

  const INCINERATOR_WIDTH = 161;
  const CONBELT_COUNT = Math.trunc(((g_StageWidth - INCINERATOR_WIDTH) * 0.5) / CONBELT_WIDTH);

  times(CONBELT_COUNT)((index) =>
    add([sprite("conBeltR", { anim: "move" }), pos(g_StagePosX + index * CONBELT_WIDTH, CONBELT_Y_POS), z(LAYER.ITEM_1), "ConveyorBelt"])
  );
  times(CONBELT_COUNT)((index) =>
    add([sprite("conBeltL", { anim: "move" }), pos(g_StagePosX + g_StageWidth - (index + 1) * CONBELT_WIDTH, CONBELT_Y_POS), z(LAYER.ITEM_1), "ConveyorBelt"])
  );

  const incinerator = add([
    sprite("incinerator"),
    pos(g_StagePosX + (g_StageWidth - INCINERATOR_WIDTH) * 0.5, CONBELT_Y_POS + 100),
    scale(1.0),
    area(),
    z(LAYER.BG),
    "Incinerator",
  ]);

  incinerator.add([sprite("fire", { anim: "fire", animSpeed: 1.0 }), pos(0, -40), z(LAYER.BG)]);
  incinerator.add([sprite("fire", { anim: "fire", animSpeed: 1.0 }), pos(0, -20), z(LAYER.BG)]);
  incinerator.add([sprite("fire", { anim: "fire", animSpeed: 1.0 }), pos(0, 10), z(LAYER.BG)]);

  stageInfo[stage].icineratorRect[0] = {
    x: incinerator.worldPos().x,
    y: incinerator.worldPos().y,
    width: incinerator.worldArea().bbox().width,
    height: incinerator.worldArea().bbox().height,
  };

  stageInfo[stage].conBeltInfo[0].pos = vec2(0, CONBELT_Y_POS);
  stageInfo[stage].conBeltInfo[0].wayPoints = [vec2(0, 80), vec2(CONBELT_WIDTH * CONBELT_COUNT, 80)];

  stageInfo[stage].conBeltInfo[1].pos = vec2(0, CONBELT_Y_POS);
  stageInfo[stage].conBeltInfo[1].wayPoints = [vec2(g_StagePosX + g_StageWidth, 80), vec2(g_StagePosX + g_StageWidth - CONBELT_WIDTH * CONBELT_COUNT, 80)];
};

export const drawStage = (stage: number) => {
  //stageInfo에 따라 background 이미지 표시
  const bkgScale = g_PageWidth > g_PageHeight ? g_CanvasWidth / g_InitStageWidth : 1.0;

  if (stageInfo[stage].bkgMainImage != "")
    add([sprite(stageInfo[stage].bkgMainImage), area(), pos(g_StagePosX, g_StagePosY), scale(bkgScale), z(LAYER.BG), "Background"]);

  switch (stage) {
    case 0:
      drawConBelt_A(stage);
      break;
    case 1:
      drawConBelt_A(stage);
      break;
    case 2:
      drawConBelt_B(stage);
      break;
    case 3:
      drawConBelt_B(stage);
      break;
    case 4:
      drawConBelt_C(stage);
      break;
  }

  const RB_WIDTH = 512;
  const RB_HEIGHT = 256;

  let binWidth = (g_StageWidth - 40) / stageInfo[stage].recycleBinInfo.length;
  if (binWidth > 256) binWidth = 256;
  const binScale = binWidth / RB_WIDTH;
  const binPos = vec2(g_StagePosX + (g_StageWidth - binWidth * stageInfo[stage].recycleBinInfo.length) / 2, g_StagePosY + g_StageHeight - RB_HEIGHT * binScale);

  initBinInfo({ width: binWidth, scale: binScale, pos: binPos });

  //stageInfo에 따라 RecycleBin 구성
  stageInfo[stage].recycleBinInfo.forEach((info, index) => {
    add([
      sprite(info.name),
      area(),
      scale(g_BinInfo.scale),
      pos(g_BinInfo.pos.x + index * g_BinInfo.width, g_BinInfo.pos.y),
      z(LAYER.BG),
      info.name,
      "RecycleBin",
      {
        info: info,
        index: index,
      },
    ]);
  });
};
