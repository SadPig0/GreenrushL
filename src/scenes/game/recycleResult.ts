import k from "../../initKaboom";
import { playSound } from "../../common/util";
import { stageInfo } from "../../data/stage";
import { LAYER } from "../../data/definition";
import { g_BinInfo, g_DPoint, g_GPoint, g_StageHeight, g_StagePosX, g_StagePosY, g_StageWidth, incDPoint, incGPoint, setGPoint, incScore, setScore } from "../../data/global";
import { pauseGame } from "./gameFunctions";

const { add, sprite, scale, pos, vec2, lifespan, anchor, z, get, go } = k;

export const recycleResult = (stage: number, success: boolean, rbIndex: number, icIndex: number, point: number) => {
  const GPOINT_ICON_WIDTH = 30;
  const DPOINT_ICON_WIDTH = 30;

  if (success) {
    const signPos = vec2(g_BinInfo.pos.x + rbIndex * g_BinInfo.width + g_BinInfo.width / 2, g_BinInfo.pos.y);
    add([
      sprite(point == 0 ? "recycleSign50" : "recycleSign100", {
        anim: "recycle",
        animSpeed: 1,
      }),
      anchor("center"),
      pos(signPos),
      lifespan(0.5, { fade: 0.5 }),
      z(LAYER.ACTION),
    ]);


    if (point == 0) {
      playSound("gpoint1");
      add([sprite("DPoint"), anchor("center"), pos(signPos.x, signPos.y - 50), lifespan(0.5, { fade: 0.5 }), z(LAYER.ACTION)]);
      incDPoint(1);
      if (g_DPoint >= 5) {
        get("Recycle").forEach((obj) => (obj.paused = true));
        setScore(0);
        setGPoint(0);
        go("gameOver");
      }
    } else if (point == 2) {
      playSound("gpoint2");
      add([sprite("GPoint"), anchor("center"), pos(signPos.x + GPOINT_ICON_WIDTH / 2, signPos.y - 50), lifespan(0.5, { fade: 0.5 }), z(LAYER.ACTION)]);
      add([sprite("GPoint"), anchor("center"), pos(signPos.x - GPOINT_ICON_WIDTH / 2, signPos.y - 50), lifespan(0.5, { fade: 0.5 }), z(LAYER.ACTION)]);
      incGPoint(1);
    }

    incScore(point);
    if (g_GPoint >= stageInfo[stage].gPoint) {
      setGPoint(0);
      if (stage == 4) {
        go("credit");
      } else {
        pauseGame();

        const stageCleared = add([sprite("stageCleared"), anchor("center"), scale(2.0), pos(g_StageWidth / 2, g_StageHeight / 2), z(LAYER.ACTION)]);
        stageCleared.play("stageCleared", {
          speed: 60,
          onEnd: () => {
            stageCleared.destroy();
            const countDown = add([sprite("countDown"), anchor("center"), pos(g_StageWidth / 2, g_StageHeight / 2), z(LAYER.ACTION)]);
            countDown.play("countDown", {
              speed: 20,
              onEnd: () => {
                countDown.destroy();
                go("game", stage + 1);
              },
            });
          },
        });
      }
    }
  } else {
    const signPos =
      rbIndex == -1
        ? vec2(
            g_StagePosX + stageInfo[stage].icineratorRect[icIndex].x + stageInfo[stage].icineratorRect[icIndex].width / 2,
            g_StagePosY + stageInfo[stage].icineratorRect[icIndex].y
          )
        : vec2(g_BinInfo.pos.x + rbIndex * g_BinInfo.width + g_BinInfo.width / 2, g_BinInfo.pos.y);
    add([
      sprite("hazardSign", { anim: "hazard", animSpeed: 1 }),
      anchor("center"),
      pos(signPos),
      scale(point == 3 ? 1.5 : 1.0),
      lifespan(0.5, { fade: 0.5 }),
      z(LAYER.ACTION),
    ]);

    add([
      sprite("DPoint"),
      anchor("center"),
      pos(signPos.x - (point == 2 ? DPOINT_ICON_WIDTH / 2 : 0), signPos.y - (point == 3 ? 70 : 50)),
      lifespan(0.5, { fade: 0.5 }),
      z(LAYER.ACTION),
    ]);

    incDPoint(point);
    if (g_DPoint >= 5) {
      get("Recycle").forEach((obj) => (obj.paused = true));
      setScore(0);
      setGPoint(0);
      go("gameOver");
    }
  }
};
