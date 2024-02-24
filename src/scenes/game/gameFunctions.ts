import { restoreGameState, setDPoint, setGPoint, setGameState, setStageCoin } from "../../data/global";
import k from "../../initKaboom";
import { GameObj } from "kaboom";

const { get } = k;

export const pauseGame = () => {
  const objList: GameObj[] = get("*");

  objList.forEach((obj) => {
    obj.is("Background") || obj.is("Hand") || obj.is("Modal") ? (obj.paused = false) : (obj.paused = true);
  });

  setGameState("GS_PAUSE");
};

export const resumeGame = () => {
  get("*").forEach((obj) => {
    obj.paused = false;
  });

  restoreGameState();
};

export const resetGame = () => {
  setGPoint(0);
  setDPoint(0);
  setStageCoin(0);
};
