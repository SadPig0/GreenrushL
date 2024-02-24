import k from "./initKaboom";
import StartScene from "./scenes/start";
import GameScene from "./scenes/game/game";
import GameOverScene from "./scenes/gameover";
import CreditScene from "./scenes/credit";
import { loadGameAsset } from "./data/asset";

const { scene, go, onLoad } = k;

loadGameAsset();

scene("start", StartScene);
scene("gameOver", GameOverScene);
scene("game", GameScene);
scene("credit", CreditScene);

onLoad(() => {
  go("start");
});

export default k;
