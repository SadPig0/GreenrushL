import k from "../initKaboom";

const { loadFont, loadSprite, loadSpriteAtlas, loadSound } = k;

export const loadGameAsset = () => {
  loadFont("LilitaOne-Regular", "font/LilitaOne-Regular.ttf", { outline: 4 });
  loadFont("pcsenior", "font/pcsenior.ttf", { outline: 1 });

  loadSprite("bkgM01", "image/bkgM01.png");
  loadSprite("bkgM02", "image/bkgM02.png");
  loadSprite("bkgM03", "image/bkgM03.png");
  loadSprite("rb01", "image/bin/rb01.png");
  loadSprite("rb02", "image/bin/rb02.png");
  loadSprite("rb03", "image/bin/rb03.png");
  loadSprite("rb04", "image/bin/rb04.png");
  loadSprite("rb05", "image/bin/rb05.png");
  loadSprite("rb06", "image/bin/rb06.png");
  loadSprite("rb07", "image/bin/rb07.png");
  loadSprite("rb08", "image/bin/rb08.png");
  loadSprite("rb09", "image/bin/rb09.png");
  loadSprite("rb10", "image/bin/rb10.png");
  loadSprite("rb11", "image/bin/rb11.png");

  loadSprite("pet_s", "image/recycle/pet_s.png");
  loadSprite("petBottle", "image/recycle/petBottle.png");
  loadSprite("petVinyl", "image/recycle/petVinyl.png");
  loadSprite("yakultBottle", "image/recycle/yakultBottle.png");
  loadSprite("milkCarton_d", "image/recycle/milkCarton_d.png");
  loadSprite("milkCarton", "image/recycle/milkCarton.png");
  loadSprite("notebook_s", "image/recycle/notebook_s.png");
  loadSprite("notePaper", "image/recycle/notePaper.png");
  loadSprite("noteSpring", "image/recycle/noteSpring.png");
  loadSprite("paperBox_s", "image/recycle/paperBox_s.png");
  loadSprite("paperBox", "image/recycle/paperBox.png");
  loadSprite("boxTape", "image/recycle/boxTape.png");
  loadSprite("paperCup", "image/recycle/paperCup.png");
  loadSprite("can_c", "image/recycle/can_c.png");
  loadSprite("canCompressed", "image/recycle/canCompressed.png");
  loadSprite("glassBottle_d", "image/recycle/glassBottle_d.png");
  loadSprite("glassBottle", "image/recycle/glassBottle.png");
  loadSprite("styrofoamPlate_d", "image/recycle/styrofoamPlate_d.png");
  loadSprite("styrofoamPlate", "image/recycle/styrofoamPlate.png");
  loadSprite("ballpointPen", "image/recycle/ballpointPen.png");
  loadSprite("eggShell", "image/recycle/eggShell.png");
  loadSprite("fishBone", "image/recycle/fishBone.png");
  loadSprite("cupRamen", "image/recycle/cupRamen.png");
  loadSprite("straw", "image/recycle/straw.png");
  loadSprite("toothBrush", "image/recycle/toothBrush.png");

  loadSprite("life", "image/life.png");
  loadSprite("life_d", "image/life_d.png");
  loadSprite("hand", "image/hand.png");
  loadSprite("handAR", "image/hand_AR.png");
  loadSprite("handAC", "image/hand_AC.png");
  loadSprite("handARC", "image/hand_ARC.png");

  loadSprite("GPoint", "image/GPoint.png");
  loadSprite("DPoint", "image/DPoint.png");
  loadSprite("setting", "image/button/setting.png");
  loadSprite("incinerator", "image/incinerator.png");
  loadSprite("RSDirt", "image/RSDirt.png");
  loadSprite("RSCompression", "image/RSCompression.png");
  loadSprite("RSSeparation", "image/RSSeparation.png");

  loadSprite("autoRecycle", "image/button/autoRecycle.png");
  loadSprite("autoRecycleOn", "image/button/autoRecycleOn.png");
  loadSprite("autoClean", "image/button/autoClean.png");
  loadSprite("autoCleanOn", "image/button/autoCleanOn.png");
  loadSprite("slowConBelt", "image/button/slowConBelt.png");
  loadSprite("slowConBeltOn", "image/button/slowConBeltOn.png");

  loadSprite("setting", "image/button/setting.png");
  loadSprite("menu", "image/button/menu.png");
  loadSprite("shop", "image/button/shop.png");
  loadSprite("close", "image/button/close.png");
  loadSprite("pause", "image/button/pause.png");
  loadSprite("play", "image/button/play.png");
  loadSprite("fullscreen", "image/button/fullscreen.png");

  loadSprite("startBkg01", "image/startBkg01.png");
  loadSprite("startBkg02", "image/startBkg02.png");
  loadSprite("startBkg03", "image/startBkg03.png");
  loadSprite("startBkg04", "image/startBkg04.png");
  loadSprite("startBkg05", "image/startBkg05.png");
  loadSprite("gameTitle", "image/gameTitle.png");
  loadSprite("gameOver", "image/gameOver.png");

  loadSprite("settingWindow", "image/settingWindow.png");
  loadSprite("shopWindow", "image/shopWindow.png");
  loadSprite("sound_on", "image/button/sound_on.png");
  loadSprite("sound_off", "image/button/sound_off.png");
  loadSprite("music_on", "image/button/music_on.png");
  loadSprite("music_off", "image/button/music_off.png");
  loadSprite("tutorial", "image/button/tutorial.png");
  loadSprite("credits", "image/button/credits.png");
  loadSprite("buy", "image/button/buy.png");
  loadSprite("playStart", "image/button/playStart.png");
  loadSprite("quit", "image/button/quit.png");
  loadSprite("restart", "image/button/restart.png");

  loadSprite("portal", "image/portal.png");

  loadSprite("cleanTool", "image/cleanTool.png");
  loadSprite("separationTool", "image/separationTool.png");
  loadSprite("compressionTool", "image/compressionTool.png");

  loadSpriteAtlas("image/transport.png", {
    transport: {
      x: 0,
      y: 0,
      width: 852,
      height: 480,
      sliceX: 4,
      sliceY: 4,
      anims: { move: { from: 0, to: 12, loop: false } },
    },
  });

  loadSpriteAtlas("image/conBeltR.png", {
    conBeltR: {
      x: 0,
      y: 0,
      width: 420,
      height: 220,
      sliceX: 4,
      anims: { move: { from: 0, to: 3, loop: true } },
    },
  });

  loadSpriteAtlas("image/conBeltL.png", {
    conBeltL: {
      x: 0,
      y: 0,
      width: 420,
      height: 220,
      sliceX: 4,
      anims: { move: { from: 0, to: 3, loop: true } },
    },
  });

  loadSpriteAtlas("image/recycleSign_100.png", {
    recycleSign100: {
      x: 0,
      y: 0,
      width: 1500,
      height: 450,
      sliceX: 10,
      sliceY: 3,
      anims: { recycle: { from: 0, to: 22, loop: false } },
    },
  });

  loadSpriteAtlas("image/recycleSign_50.png", {
    recycleSign50: {
      x: 0,
      y: 0,
      width: 1500,
      height: 450,
      sliceX: 10,
      sliceY: 3,
      anims: { recycle: { from: 0, to: 22, loop: false } },
    },
  });

  loadSpriteAtlas("image/hazardSign.png", {
    hazardSign: {
      x: 0,
      y: 0,
      width: 1500,
      height: 450,
      sliceX: 10,
      sliceY: 3,
      anims: { hazard: { from: 0, to: 22, loop: false } },
    },
  });

  loadSpriteAtlas("image/fire.png", {
    fire: {
      x: 0,
      y: 0,
      width: 1600,
      height: 200,
      sliceX: 10,
      sliceY: 2,
      anims: { fire: { from: 0, to: 19, loop: true } },
    },
  });

  loadSpriteAtlas("image/portal.png", {
    portal: {
      x: 0,
      y: 0,
      width: 588,
      height: 114,
      sliceX: 7,
      sliceY: 1,
      anims: { teleport: { from: 0, to: 6, loop: false } },
    },
  });

  loadSpriteAtlas("image/countDown.png", {
    countDown: {
      x: 0,
      y: 0,
      width: 2048,
      height: 1792,
      sliceX: 7,
      sliceY: 7,
      anims: { countDown: { from: 0, to: 46, loop: false } },
    },
  });

  loadSpriteAtlas("image/stageCleared.png", {
    stageCleared: {
      x: 0,
      y: 0,
      width: 2048,
      height: 1048,
      sliceX: 7,
      sliceY: 6,
      anims: { stageCleared: { from: 0, to: 39, loop: false } },
    },
  });

  loadSound("start", "sound/start.mp3");
  loadSound("gameOver", "sound/gameOver.mp3");
  //loadSound("stageClear", "sound/stageClear.mp3");
  loadSound("bgm01", "sound/bgm01.mp3");
  loadSound("bgm02", "sound/bgm02.mp3");
  loadSound("bgm03", "sound/bgm03.mp3");
  // loadSound("bgm04", "sound/bgm04.mp3");
  // loadSound("bgm05", "sound/bgm05.mp3");
  // loadSound("dpoint1", "sound/dpoint1.mp3");
  loadSound("dpoint3", "sound/dpoint3.mp3");
  loadSound("gpoint1", "sound/gpoint1.mp3");
  loadSound("gpoint2", "sound/gpoint2.mp3");
  loadSound("burn", "sound/burn.mp3");
  loadSound("cleaning", "sound/cleaning.mp3");
};
