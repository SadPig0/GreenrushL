import { LAYER } from "../../data/definition";
import { g_StageHeight, g_StagePosX, g_StagePosY, g_StageWidth, setCurrentTurorialPage } from "../../data/global";
import k from "../../initKaboom";
import { GameObj } from "kaboom";

const { add, pos, area, drawText, vec2, z, drawSprite, rect, rgb, color, outline } = k;

export const showTutorialPage = (page: number) => {
  const TUTORIAL_BKG_WIDTH = 600;
  const TUTORIAL_BKG_HEIGHT = 450;

  const STORY_BKG_X_POS = g_StagePosX + (g_StageWidth - TUTORIAL_BKG_WIDTH) * 0.5;
  const STORY_BKG_Y_POS = g_StagePosY + g_StageHeight * 0.1;

  setCurrentTurorialPage(page);

  if (page == 0) {
    add([
      rect(TUTORIAL_BKG_WIDTH, TUTORIAL_BKG_HEIGHT, { radius: 10 }),
      color(0, 0, 0),
      outline(4, rgb(255, 169, 35)),
      pos(STORY_BKG_X_POS, STORY_BKG_Y_POS),
      z(LAYER.UI),
      area(),
      "TutorialMain",
    ]);
    add([
      pos(STORY_BKG_X_POS, STORY_BKG_Y_POS),
      z(LAYER.UI),
      {
        draw(this: GameObj): void {
          drawText({
            text: "TUTORIAL (1/2)",
            size: 36,
            font: "LilitaOne-Regular",
            align: "center",
            width: TUTORIAL_BKG_WIDTH,
            pos: vec2(0, 10),
          });
          drawText({
            text: "Put the trash inside the trash can of its type. If you miss, the trash goes into the incinerator.",
            size: 20,

            align: "left",
            width: 250,
            pos: vec2(320, 80),
          });
          drawText({
            text: "If the trash is polluted (has a radioactive sign), use the clearer before recycling it.",
            size: 20,
            align: "left",
            width: 250,
            pos: vec2(320, 250),
          });
        },
      },
      "TutorialPage0",
    ]);
    // .add([sprite("tutorialDrag", { anim: "drag" }), anchor("topleft"), scale(0.8), area(), pos(25, 60), "TutorialPage0"])
    // .add([sprite("tutorialCleaner", { anim: "cleaner" }), anchor("topleft"), scale(1.0), area(), pos(0, 210), "TutorialPage0"]);
  } else if (page == 1) {
    add([
      pos(STORY_BKG_X_POS, STORY_BKG_Y_POS),
      z(LAYER.UI),
      {
        draw(this: GameObj): void {
          drawText({
            text: "TUTORIAL (2/2)",
            size: 36,
            font: "LilitaOne-Regular",
            align: "center",
            width: TUTORIAL_BKG_WIDTH,
            pos: vec2(0, 10),
          });
          drawSprite({
            sprite: "GPoint",
            pos: vec2(30, 80),
            anchor: "topleft",
          });
          drawText({
            text: "must be filled to clear the level. correct trash can: 2 points, wrong trash can: 1 point",
            size: 20,
            align: "left",
            width: 500,
            pos: vec2(70, 80),
          });
          drawSprite({
            sprite: "DPoint",
            pos: vec2(30, 160),
            anchor: "topleft",
          });
          drawText({
            text: "will lead to game over. miss polluted trash: 3 points, miss regular trash: 1 point",
            size: 20,
            align: "left",
            width: 500,
            pos: vec2(70, 160),
          });
          drawSprite({
            sprite: "autoRecycle",
            pos: vec2(30, 320),
            anchor: "topleft",
            scale: 0.6,
          });
          drawText({
            text: "automatically recycles the trash",
            size: 20,
            align: "left",
            width: 500,
            pos: vec2(70, 325),
          });
          drawSprite({
            sprite: "autoClean",
            pos: vec2(30, 360),
            anchor: "topleft",
            scale: 0.6,
          });
          drawText({
            text: "automatically cleans the polluted trash",
            size: 20,
            align: "left",
            width: 500,
            pos: vec2(70, 365),
          });
          drawSprite({
            sprite: "slowConBelt",
            pos: vec2(30, 400),
            anchor: "topleft",
            scale: 0.6,
          });
          drawText({
            text: "slows down the conveyor belt",
            size: 20,
            align: "left",
            width: 500,
            pos: vec2(70, 405),
          });
        },
      },
      "TutorialPage1",
    ]);
  }
};
