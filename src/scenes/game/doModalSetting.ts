import { LAYER } from "../../data/definition";
import { g_GameState, g_MusicOn, g_SoundOn, g_StagePosX, g_StageWidth } from "../../data/global";
import k from "../../initKaboom";
import { pauseGame } from "./gameFunctions";

const { add, sprite, scale, pos, area, anchor, z } = k;

export const doModalSetting = () => {
  if (g_GameState == "GS_PAUSE") return;

  const DIALOG_WIDTH = 430;
  const DIALOG_X_POS = g_StagePosX + (g_StageWidth - DIALOG_WIDTH) * 0.5;
  const DIALOG_Y_POS = 0;
  const BUTTON_WIDTH = 320;

  pauseGame();

  const dialog = add([sprite("settingWindow"), anchor("topleft"), area(), pos(DIALOG_X_POS, DIALOG_Y_POS), z(LAYER.ACTION), "Modal"]);

  dialog.add([sprite("close"), anchor("topleft"), area(), pos(DIALOG_WIDTH - 65, 35), z(LAYER.ACTION), "CloseButton", "Modal"]);

  dialog.add([
    g_SoundOn ? sprite("sound_on") : sprite("sound_off"),
    anchor("topleft"),
    area(),
    pos(DIALOG_WIDTH - 120, 167),
    scale(1.2),
    z(LAYER.ACTION),
    "SoundButton",
    "Modal",
  ]);

  dialog.add([
    g_MusicOn ? sprite("music_on") : sprite("music_off"),
    anchor("topleft"),
    area(),
    pos(DIALOG_WIDTH - 120, 242),
    scale(1.2),
    z(LAYER.ACTION),
    "MusicButton",
    "Modal",
  ]);

  dialog.add([sprite("restart"), anchor("topleft"), area(), pos((DIALOG_WIDTH - BUTTON_WIDTH) * 0.5, 350), z(LAYER.ACTION), "RestartButton", "Modal"]);
  dialog.add([sprite("quit"), anchor("topleft"), area(), pos((DIALOG_WIDTH - BUTTON_WIDTH) * 0.5, 440), z(LAYER.ACTION), "QuitButton", "Modal"]);
};
