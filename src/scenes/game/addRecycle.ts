import k from "../../initKaboom";
import { GameObj, Vec2 } from "kaboom";
import { IRecycleInfo, recycleInfo } from "../../data/recycle";
import { movePath } from "../../components/movePath";
import { drag, progressBar, scaleUpDown } from "../../components/util";
import { IConBeltInfo, LAYER } from "../../data/definition";
import { stageInfo } from "../../data/stage";
import { playSound } from "../../common/util";
import { recycleResult } from "./recycleResult";

const { add, sprite, scale, pos, area, rotate, opacity, anchor, z, testRectRect, get, rgb, timer, drawText, Color, vec2 } = k;

export const addRecycle = (stage: number, info: IRecycleInfo, conBelt: IConBeltInfo, index: number, offset: number = 0) => {
  let recycle: GameObj = add([
    sprite(info.name),
    scale(0.4),
    pos(conBelt.wayPoints[0].x + offset, conBelt.wayPoints[0].y),
    area(),
    rotate(0),
    opacity(1),
    anchor("bot"),
    movePath(conBelt.wayPoints, conBelt.speed, false, false, false),
    drag(),
    z(LAYER.ITEM_1),
    "Recycle",
    {
      isCleaning: false,
      isCompressing: false,
      isSeparating: false,
      info: info,
      conBeltIndex: index,
      incineratorIndex: stageInfo[stage].conBeltInfo[index].incinerator,
    },
  ]);
  recycle.add([
    anchor("center"),
    z(LAYER.ACTION),
    {
      draw(this: GameObj): void {
        drawText({
          text: info.description.toString(),
          pos: vec2(0, -recycle.height-40),
          size: 40,
          anchor: "center",
          font: "LilitaOne-Regular",
          color: Color.WHITE,
        });
      },
    },
  ]);

  switch (recycle.info.status) {
    case "RS_DIRT":
      recycle.add([sprite("RSDirt"), scale(1.0), pos(0, -recycle.height-65), anchor("bot"), scaleUpDown(), z(LAYER.ITEM_3)]);
      break;
    case "RS_SEPARATION":
      recycle.add([sprite("RSSeparation"), scale(1.0), pos(0, -recycle.height-65), anchor("bot"), scaleUpDown(), z(LAYER.ITEM_3)]);
      break;
    case "RS_COMPRESSION":
      recycle.add([sprite("RSCompression"), scale(1.0), pos(0, -recycle.height-65), anchor("bot"), scaleUpDown(), z(LAYER.ITEM_3)]);
      break;
  };

  recycle.moveStart(conBelt.speed);

  recycle.onDrag(() => {
    recycle.movePause();
  });

  recycle.onDragUpdate(() => {
    const cleanTool = get("CleanTool")[0];
    const separationTool = get("SeparationTool")[0];
    const compressionTool = get("CompressionTool")[0];

    if (recycle.info.status == "RS_DIRT") {
      if (recycle.isCleaning) {
        //cleanTool을 벗어난 경우
        if (testRectRect(cleanTool.worldArea().bbox(), recycle.worldArea().bbox()) == false) {
          get("Cleaning").forEach((obj) => obj.destroy());

          //cleanTool.play("normal");
          playSound("cleaning");
          recycle.isCleaning = false;
        }
      } else {
        if (testRectRect(cleanTool.worldArea().bbox(), recycle.worldArea().bbox())) {
          const cleaningProgressBar = add([
            pos(cleanTool.pos.x, cleanTool.pos.y + cleanTool.worldArea().bbox().height + 10),
            progressBar(0.5, 100, 20, rgb(15, 35, 61), rgb(255, 220, 48)),
            timer(),
            z(LAYER.ACTION),
            "Cleaning",
          ]);

          cleaningProgressBar.onProgressEnd(() => {
            cleaningProgressBar.destroy();
            recycle.info = recycleInfo[recycle.info.process[0]];
            recycle.use(sprite(recycle.info.name));
            recycle.children[0].destroy();

            //cleanTool.play("normal");
            playSound("cleaning");
            recycle.isCleaning = false;
          });

          //cleanTool.play("cleaning");
          playSound("cleaning");
          recycle.isCleaning = true;
        }
      }
    }

    if (recycle.info.status == "RS_COMPRESSION") {
      if (recycle.isCompressing) {
        //compressionTool을 벗어난 경우
        if (testRectRect(compressionTool.worldArea().bbox(), recycle.worldArea().bbox()) == false) {
          get("Compressing").forEach((obj) => obj.destroy());

          //cleanTool.play("normal");
          playSound("cleaning");
          recycle.isCompressing = false;
        }
      } else {
        if (testRectRect(compressionTool.worldArea().bbox(), recycle.worldArea().bbox())) {
          const compressingProgressBar = add([
            pos(compressionTool.pos.x, compressionTool.pos.y + compressionTool.worldArea().bbox().height + 10),
            progressBar(0.5, 100, 20, rgb(15, 35, 61), rgb(255, 220, 48)),
            timer(),
            z(LAYER.ACTION),
            "Compressing",
          ]);

          compressingProgressBar.onProgressEnd(() => {
            compressingProgressBar.destroy();
            recycle.info = recycleInfo[recycle.info.process[0]];
            recycle.use(sprite(recycle.info.name));
            recycle.children[0].destroy();

            //cleanTool.play("normal");
            playSound("cleaning");
            recycle.isCompressing = false;
          });

          //cleanTool.play("cleaning");
          playSound("cleaning");
          recycle.isCompressing = true;
        }
      }
    }

    if (recycle.info.status == "RS_SEPARATION") {
      if (recycle.isSeparating) {
        //separatingTool을 벗어난 경우
        if (testRectRect(separationTool.worldArea().bbox(), recycle.worldArea().bbox()) == false) {
          get("Separating").forEach((obj) => obj.destroy());

          //cleanTool.play("normal");
          playSound("cleaning");
          recycle.isSeparating = false;
        }
      } else {
        if (testRectRect(separationTool.worldArea().bbox(), recycle.worldArea().bbox())) {
          const separatingProgressBar = add([
            pos(separationTool.pos.x, separationTool.pos.y + separationTool.worldArea().bbox().height + 10),
            progressBar(0.5, 100, 20, rgb(15, 35, 61), rgb(255, 220, 48)),
            timer(),
            z(LAYER.ACTION),
            "Separating",
          ]);

          separatingProgressBar.onProgressEnd(() => {
            separatingProgressBar.destroy();
            recycle.children[0].destroy();

            recycle.info.process.forEach((process: number, index: number) => {
              recycle.destroy();
              addRecycle(stage, recycleInfo[process], stageInfo[stage].conBeltInfo[recycle.conBeltIndex], recycle.conBeltIndex, index * 100);
              //recycle.info = recycleInfo[process];
            });

            // recycle.use(sprite(recycle.info.name));
            // recycle.children[0].destroy();

            //cleanTool.play("normal");
            playSound("cleaning");
            //recycle.isSeparating = false;
          });

          //cleanTool.play("cleaning");
          playSound("cleaning");
          recycle.isSeparating = true;
        }
      }
    }
  });

  recycle.onDragEnd(() => {
    if (recycle.isCleaning) {
      get("Cleaning").forEach((obj) => obj.destroy());
      recycle.isCleaning = false;
    }

    if (recycle.isCompressing) {
      get("Compressing").forEach((obj) => obj.destroy());
      recycle.isCompressing = false;
    }

    if (recycle.isSeparating) {
      get("Separating").forEach((obj) => obj.destroy());
      recycle.isSeparating = false;
    }

    recycle.destroy();

    const recycleBin: GameObj | undefined = get("RecycleBin").find((recycleBin: GameObj) =>
      testRectRect(recycleBin.worldArea().bbox(), recycle.worldArea().bbox())
    );

    if (recycleBin == undefined) {
      //쓰레기를 아무 곳에 떨어뜨린 경우
      recycleResult(
        stage,
        false,
        -1,
        recycle.incineratorIndex,
        recycle.info.status == "RS_DIRT" || recycle.info.status == "RS_SEPARATION" || recycle.info.status == "RS_COMPRESSION" ? 3 : 1
      );
    } else {
      //쓰레기를 재활용통에 떨어뜨린 경우

      //후 처리가 필요한 쓰레기인 경우
      if (recycle.info.status == "RS_DIRT" || recycle.info.status == "RS_SEPARATION" || recycle.info.status == "RS_COMPRESSION") {
        recycleResult(stage, false, recycleBin.index, recycle.incineratorIndex, recycleBin.info.type == recycle.info.type ? 1 : 2);
      } else {
        recycleResult(stage, true, recycleBin.index, recycle.incineratorIndex, recycleBin.info.type == recycle.info.type ? 2 : 0);
      }
    }
  });

  recycle.onMoveEnd((endAction: boolean) => {
    if (endAction)
      recycleResult(
        stage,
        false,
        -1,
        recycle.incineratorIndex,
        recycle.info.status == "RS_DIRT" || recycle.info.status == "RS_SEPARATION" || recycle.info.status == "RS_COMPRESSION" ? 2 : 1
      );
    else {
      const conBelt = stageInfo[stage].conBeltInfo[recycle.conBeltIndex];
      if (conBelt.connectedConBelt == -1) {
        recycle.use(movePath(conBelt.dropCurvePoints, conBelt.speed, true, true, true));
        recycle.moveStart(conBelt.speed);

        //const time = conBelt.dropCurveLength / recycle.speed;
        //recycle.fadeOut(time);
      } else {
        recycle.conBeltIndex = conBelt.connectedConBelt;
        recycle.use(pos(stageInfo[stage].conBeltInfo[conBelt.connectedConBelt].wayPoints[0]));
        recycle.use(movePath(stageInfo[stage].conBeltInfo[conBelt.connectedConBelt].wayPoints, conBelt.speed, false, false, false));
        recycle.moveStart(conBelt.speed);
      }
    }
  });
};
