import k from "../../initKaboom";
import { EventController, GameObj, Vec2 } from "kaboom";
import { mouseMove, progressBar } from "../../components/util";
import { stageInfo, initWayPoint, initConBeltData, } from "../../data/stage";
import { recycleInfo, IRecycleInfo } from "../../data/recycle";
import { startRandomEffect } from "../../common/randomEffect";
import { drawGameUI } from "../../drawGameUI";
import { LAYER, IConBeltInfo } from "../../data/definition";
import { ITEM_TYPE, getGameItemCount, setGameItemCount } from "../../data/item";
import {
  g_SoundOn,
  g_MusicOn,
  setSoundOn,
  g_StageScale,
  setStageFull,
  g_PageWidth,
  g_PageHeight,
  setMusicOn,
  g_CurrentTutorialPage,
  g_GameState,
  setGameState,
} from "../../data/global";
import { coverStageOutside, playMusic, stopMusic } from "../../common/util";
import { addRecycle } from "./addRecycle";
import { recycleResult } from "./recycleResult";
import { showTutorialPage } from "./showTutorialPage";
import { doModalSetting } from "./doModalSetting";
import { resumeGame } from "./gameFunctions";
import { drawStage } from "./drawStage";

const {
  add,
  sprite,
  pos,
  area,
  rotate,
  vec2,
  scale,
  anchor,
  z,
  loop,
  choose,
  mousePos,
  onUpdate,
  onCollide,
  onMousePress,
  onMouseRelease,
  onClick,
  get,
  testRectPoint,
  go,
  timer,
  rgb,
  wait,
  setBackground,
  onKeyPress,
  setFullscreen,
  isFullscreen,
  onTouchStart,
  isTouchscreen,
  Rect,
  onSceneLeave,
} = k;

const GameScene = (stage: number) => {
  const ITEM_AUTO_CLEAN_TIME = 3;
  const ITEM_AUTO_RECYCLE_TIME = 3;
  const ITEM_SLOW_CONBELT_TIME = 3;
  const ITEM_PROGRESS_BAR_COLOR = rgb(252, 176, 78);

  let isAutoRecycle: boolean = false;
  let isAutoClean: boolean = false;
  let isSlowConBelt: boolean = false;

  const startGame = () => {
    setGameState("GS_PLAYING");
    //재활용 쓰레기 램덤 생성
    stageInfo[stage].conBeltInfo.forEach((conBelt: IConBeltInfo, index: number) => {
      let recyclingLoop = startRecycling(conBelt, index);

      loop(10, () => {
        if (g_GameState == "GS_PAUSE" || g_GameState == "GS_GAMEOVER") return;
        if (conBelt.loopInterval > 2.0) {
          recyclingLoop.cancel();
          wait(conBelt.loopInterval, () => {
            recyclingLoop = startRecycling(conBelt, index);
          });
        }
      });
    });
  };

  const startRecycling = (conBelt: IConBeltInfo, index: number): EventController => {
    return loop(conBelt.loopInterval, () => {
      if (g_GameState == "GS_PAUSE" || g_GameState == "GS_GAMEOVER") return;

      if (!conBelt.isGenerator) return;
      const info = { ...choose(stageRecycles) };
      addRecycle(stage, info, conBelt, index);
    });
  };

  const updateHandSprite = () => {
    if (hand != undefined) {
      if (isAutoRecycle && isAutoClean) hand.use(sprite("handARC"));
      else if (isAutoRecycle) hand.use(sprite("handAR"));
      else if (isAutoClean) hand.use(sprite("handAC"));
      else hand.use(sprite("hand"));
    }
  };

  const autoRecycle = (recycle: GameObj) => {
    recycle.destroy();

    const recycleBin: GameObj | undefined = get("RecycleBin").find((recycleBin: GameObj) => recycleBin.info.type == recycle.info.type);

    if (recycleBin != undefined) {
      if (recycle.info.status == "RS_DIRT" || recycle.info.status == "RS_SEPARATION" || recycle.info.status == "RS_COMPRESSION") {
        recycleResult(stage, true, recycleBin.index, recycle.incineratorIndex, isAutoClean ? 2 : 1);
      } else recycleResult(stage, true, recycleBin.index, recycle.incineratorIndex, 2);
    }
  };

  // const useItem = (item: ITEM_TYPE, obj: GameObj) => {
  //   if (g_GameState == "GS_PAUSE" || getGameItemCount(item) == 0) return;
  //   if (item == "IT_AUTO_RECYCLE") {
  //     if (isAutoRecycle) return;

  //     isAutoRecycle = true;
  //     obj.use(sprite("autoRecycleOn"));
  //     updateHandSprite();

  //     setGameItemCount("IT_AUTO_RECYCLE", getGameItemCount("IT_AUTO_RECYCLE") - 1);

  //     const itemPprogressBar = add([
  //       pos(obj.pos.x - 10, obj.pos.y + 70),
  //       progressBar(ITEM_AUTO_RECYCLE_TIME, 60, 20, rgb(15, 35, 61), ITEM_PROGRESS_BAR_COLOR),
  //       timer(),
  //       z(LAYER.UI),
  //       "conBeltProgressBar",
  //     ]);

  //     itemPprogressBar.onProgressEnd(() => {
  //       itemPprogressBar.destroy();

  //       isAutoRecycle = false;
  //       obj.use(sprite("autoRecycle"));
  //       updateHandSprite();
  //     });
  //   } else if (item == "IT_AUTO_CLEAN") {
  //     if (isAutoClean) return;

  //     isAutoClean = true;
  //     obj.use(sprite("autoCleanOn"));
  //     updateHandSprite();

  //     setGameItemCount("IT_AUTO_CLEAN", getGameItemCount("IT_AUTO_CLEAN") - 1);

  //     const itemPprogressBar = add([
  //       pos(obj.pos.x - 10, obj.pos.y + 70),
  //       progressBar(ITEM_AUTO_CLEAN_TIME, 60, 20, rgb(15, 35, 61), ITEM_PROGRESS_BAR_COLOR),
  //       timer(),
  //       z(LAYER.UI),
  //       "conBeltProgressBar",
  //     ]);

  //     itemPprogressBar.onProgressEnd(() => {
  //       itemPprogressBar.destroy();

  //       isAutoClean = false;
  //       obj.use(sprite("autoClean"));
  //       updateHandSprite();
  //     });
  //   } else if (item == "IT_SLOW_CONBELT") {
  //     if (isSlowConBelt) return;

  //     isSlowConBelt = true;
  //     obj.use(sprite("slowConBeltOn"));
  //     setGameItemCount("IT_SLOW_CONBELT", getGameItemCount("IT_SLOW_CONBELT") - 1);

  //     setConBeltSpeed(stage, 60);

  //     const itemPprogressBar = add([
  //       pos(obj.pos.x - 10, obj.pos.y + 70),
  //       progressBar(ITEM_SLOW_CONBELT_TIME, 60, 20, rgb(15, 35, 61), ITEM_PROGRESS_BAR_COLOR),
  //       timer(),
  //       z(LAYER.UI),
  //       "conBeltProgressBar",
  //     ]);

  //     itemPprogressBar.onProgressEnd(() => {
  //       itemPprogressBar.destroy();

  //       isSlowConBelt = false;
  //       obj.use(sprite("slowConBelt"));
  //       retoreConbeltLoopInterval(stage);
  //       restoreConBeltSpeed(stage);
  //     });
  //   }
  // };

  let stageRecycles: IRecycleInfo[] = recycleInfo.filter((info: IRecycleInfo): boolean => {
    return stageInfo[stage].recycleBinInfo.find((binInfo) => binInfo.type == info.type) != undefined;
  });

  if (g_PageWidth > g_PageHeight) setStageFull(true);

  startRandomEffect(stage, stageInfo[stage].randomEffect);
  setBackground(stageInfo[stage].bkgColor);
  drawGameUI();

  drawStage(stage);
  coverStageOutside();

  initConBeltData(stage);
  initWayPoint(stage);

  playMusic(stageInfo[stage].bgm, true);

  // 모바일, PC에 따라 커서 모양 설정
  const hand = isTouchscreen()
    ? undefined
    : add([sprite("hand"), pos(mousePos()), area(), scale(1.0), rotate(0), mouseMove(), anchor("topleft"), z(LAYER.CURSOR), "Hand"]);

  g_CurrentTutorialPage < 0 ? showTutorialPage(0) : startGame();

  onTouchStart((touchPos: Vec2) => {
    if (!isTouchscreen()) return;
    //if (isDragging) return;

    const tPos = vec2(touchPos.x / g_StageScale, touchPos.y / g_StageScale);

    if (hand != undefined) hand.use(rotate(hand.angle - 25));

    if (g_GameState == "GS_PAUSE") return;

    for (const obj of get("drag").reverse()) {
      let objPoints = obj.worldArea().bbox().points();
      const dx = obj.worldArea().bbox().width * 0.5;
      const dy = obj.worldArea().bbox().height * 0.5;
      objPoints[0].x -= dx;
      objPoints[0].y -= dy;
      objPoints[1].x += dx;
      objPoints[1].y -= dy;
      objPoints[2].x += dx;
      objPoints[2].y += dy;
      objPoints[3].x -= dx;
      objPoints[3].y += dy;
      const objRect = Rect.fromPoints(vec2(objPoints[0].x, objPoints[0].y), vec2(objPoints[2].x, objPoints[2].y));
      if (testRectPoint(objRect, tPos)) {
        if (isAutoClean && (obj.info.status == "RS_DIRT" || obj.info.status == "RS_SEPARATION" || obj.info.status == "RS_COMPRESSION")) {
          if (isAutoRecycle) autoRecycle(obj);
          else {
            obj.info = recycleInfo[obj.info.process[0]];
            obj.use(sprite(obj.info.name));
            obj.children[0].destroy();
          }
        } else obj.pick();
        break;
      }
    }
  });

  onMousePress(() => {
    if (isTouchscreen() || hand == undefined) return;
    // if (isDragging) return;

    hand.use(rotate(hand.angle - 25));

    if (g_GameState == "GS_PAUSE") return;

    for (const obj of get("drag").reverse()) {
      if (testRectPoint(obj.worldArea().bbox(), hand.pos)) {
        if (isAutoClean && (obj.info.status == "RS_DIRT" || obj.info.status == "RS_SEPARATION" || obj.info.status == "RS_COMPRESSION")) {
          if (isAutoRecycle) autoRecycle(obj);
          else {
            obj.info = recycleInfo[obj.info.process[0]];
            obj.use(sprite(obj.info.name));
            obj.children[0].destroy();
          }
        } else obj.pick();

        break;
      }
    }
  });

  onMouseRelease(() => {
    if (g_GameState == "GS_READY") {
      setGameState("GS_PLAYING");
      return;
    }

    if (hand != undefined) hand.use(rotate(hand.angle + 25));

    const dragSprite = get("Recycle").find((obj) => obj.isDragging);
    if (dragSprite) dragSprite.trigger("dragEnd");
  });

  onClick("PauseButton", () => {
    doModalSetting();
  });

  onClick("FullscreenBtn", () => {
    if (hand != undefined) hand.use(rotate(hand.angle + 25));
    setFullscreen(!isFullscreen());
  });

  onClick("RestartButton", () => {
    go("game", stage);
  });

  onClick("QuitButton", () => {
    go("start");
  });

  // onClick("SlowConBeltBtn", (obj: GameObj) => {
  //   useItem("IT_SLOW_CONBELT", obj);
  // });

  onKeyPress(".", () => {
    if (stage < 4) go("game", stage + 1);
  });

  onClick("CloseButton", () => {
    get("Modal").forEach((obj) => obj.destroy());
    resumeGame();
  });

  onClick("MusicButton", (music_button) => {
    if (g_MusicOn) {
      setMusicOn(false);
      stopMusic();
      music_button.use(sprite("music_off"));
    } else {
      setMusicOn(true);
      playMusic(stageInfo[stage].bgm, true);
      music_button.use(sprite("music_on"));
    }
  });

  onClick("SoundButton", (sound_button) => {
    if (g_SoundOn) {
      setSoundOn(false);
      sound_button.use(sprite("sound_off"));
    } else {
      setSoundOn(true);
      sound_button.use(sprite("sound_on"));
    }
  });

  onClick("CreditButton", () => {
    go("credit");
  });

  onClick("TutorialMain", () => {
    if (g_CurrentTutorialPage == 0) {
      get("TutorialPage0").forEach((obj) => obj.destroy());
      showTutorialPage(1);
    } else if (g_CurrentTutorialPage == 1) {
      get("TutorialPage1").forEach((obj) => obj.destroy());
      get("TutorialMain").forEach((obj) => obj.destroy());
      startGame();
    }
  });

  onUpdate(() => {
    //setCursor("none");
    //debug.log("Hand : " + hand.pos);
  });

  onCollide("Mice", "Incinerator", (obj: GameObj) => {
    if (!obj.isBack) {
      obj.isBack = true;
      obj.xVel *= -1;
      obj.flipX = !obj.flipX;
    }
  });

  onCollide("Portal", "Recycle", (portal: GameObj, recycle: GameObj) => {
    if (recycle.worldArea().pts[0].y > portal.worldArea().pts[0].y && recycle.worldArea().pts[3].y < portal.worldArea().pts[3].y)
      portal.play("teleport", { speed: 30 });
  });

  onKeyPress("f", () => {
    setFullscreen(!isFullscreen());
  });

  onSceneLeave(() => {
    if (hand != undefined) hand.destroy();
  });
};

export default GameScene;
