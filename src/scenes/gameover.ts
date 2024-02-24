import k from "../initKaboom";
import { LAYER } from "../data/definition";
import { blink } from "../components/util";
import { bkgScroll, coverStageOutside, playMusic } from "../common/util";
import { g_StageHeight, g_StagePosX, g_StagePosY, setGameScene, setGameState, setStageFull } from "../data/global";
import { resetGame } from "./game/gameFunctions";

const { add, sprite, pos, opacity, area, scale, text, fadeIn, anchor, onClick, z, go, wave, time, center, setCursor } = k;

const GameOverScene = () => {
  setGameScene("gameOver");
  setGameState("GS_GAMEOVER");

  setStageFull(false);
  coverStageOutside();

  setCursor("default");
  playMusic("gameOver", true);

  add([sprite("startBkg05"), anchor("topleft"), "startBkg05", area(), pos(g_StagePosX, g_StagePosY), z(0)]);

  bkgScroll("startBkg01", 0, 0);
  bkgScroll("startBkg02", 0.8, 50);
  bkgScroll("startBkg03", 0.7, 40);
  bkgScroll("startBkg04", 0.6, 30);

  add([
    sprite("gameOver"),
    anchor("center"),
    opacity(),
    scale(wave(3, 3.3, time() * 6)),
    fadeIn(1),
    pos(center().x, g_StagePosY + g_StageHeight * 0.5),
    z(LAYER.UI),
    "gameoverTitle",
    area(),
  ]);

  add([
    text("TAP TO START", { size: 64, font: "LilitaOne-Regular" }),
    anchor("center"),
    pos(center().x, g_StagePosY + g_StageHeight * 0.7),
    opacity(1.0),
    blink(10),
    z(LAYER.UI),
  ]);

  onClick(() => {
    resetGame();
    go("game", 0);
  });
};

export default GameOverScene;
