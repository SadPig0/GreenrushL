export type RECYCLE_TYPE =
  | "RT_PLASTIC"
  | "RT_VINYL"
  | "RT_CAN"
  | "RT_SCRAP_METAL"
  | "RT_GLASS"
  | "RT_PAPER"
  | "RT_GENERAL_WASTE"
  | "RT_STYROFOAM"
  | "RT_FOOD"
  | "RT_CLOTHING"
  | "RT_GARAGE_BAG";

export interface IRecycleInfo {
  name: string;
  type: RECYCLE_TYPE;
  status: RECYCLE_STATUS;
  process: number[];
  description: string;
}

export const recycleInfo: IRecycleInfo[] = [
  { name: "pet_s", type: "RT_PLASTIC", status: "RS_SEPARATION", process: [1, 2], description: "Soda" },
  { name: "petBottle", type: "RT_PLASTIC", status: "RS_SEPARATED", process: [], description: "PET Bottle" },
  { name: "petVinyl", type: "RT_VINYL", status: "RS_SEPARATED", process: [], description: "Wrapper" },
  { name: "yakultBottle", type: "RT_PLASTIC", status: "RS_NORMAL", process: [], description: "요구르트" },
  { name: "milkCarton_d", type: "RT_PAPER", status: "RS_DIRT", process: [5], description: "Milk Carton" },
  { name: "milkCarton", type: "RT_PAPER", status: "RS_NORMAL", process: [], description: "Milk Carton" },
  { name: "notebook_s", type: "RT_PAPER", status: "RS_SEPARATION", process: [7, 8], description: "NoteBook" },
  { name: "notePaper", type: "RT_PAPER", status: "RS_SEPARATED", process: [], description: "Paper" },
  { name: "noteSpring", type: "RT_PLASTIC", status: "RS_SEPARATED", process: [], description: "Coil" },
  { name: "paperBox_s", type: "RT_PAPER", status: "RS_SEPARATION", process: [10, 11], description: "Cardboard" },
  { name: "paperBox", type: "RT_PAPER", status: "RS_SEPARATED", process: [], description: "Cardboard" },
  { name: "boxTape", type: "RT_GARAGE_BAG", status: "RS_SEPARATED", process: [], description: "Tape" },
  { name: "paperCup", type: "RT_PAPER", status: "RS_NORMAL", process: [], description: "Paper Cup" },
  { name: "can_c", type: "RT_CAN", status: "RS_COMPRESSION", process: [14], description: "Can" },
  { name: "canCompressed", type: "RT_CAN", status: "RS_COMPRESSED", process: [], description: "Can" },
  { name: "glassBottle_d", type: "RT_GLASS", status: "RS_DIRT", process: [16], description: "Glass Bottle" },
  { name: "glassBottle", type: "RT_GLASS", status: "RS_NORMAL", process: [], description: "Glass Bottle"  },
  { name: "styrofoamPlate_d", type: "RT_STYROFOAM", status: "RS_DIRT", process: [18], description: "Styrofoam plate" },
  { name: "styrofoamPlate", type: "RT_STYROFOAM", status: "RS_NORMAL", process: [], description: "Styrofoam plate" },
  { name: "ballpointPen", type: "RT_GARAGE_BAG", status: "RS_NORMAL", process: [], description: "Pen" },
  { name: "eggShell", type: "RT_GARAGE_BAG", status: "RS_NORMAL", process: [], description: "Egg Shell" },
  { name: "fishBone", type: "RT_GARAGE_BAG", status: "RS_NORMAL", process: [], description: "Fish Bone" },
  { name: "cupRamen", type: "RT_GARAGE_BAG", status: "RS_NORMAL", process: [], description: "Ramen Cup" },
  { name: "straw", type: "RT_GARAGE_BAG", status: "RS_NORMAL", process: [], description: "Plastic Straw" },
  { name: "toothBrush", type: "RT_GARAGE_BAG", status: "RS_NORMAL", process: [], description: "Toothbrush" },
];

export type RECYCLE_STATUS = "RS_NORMAL" | "RS_COIN" | "RS_DIRT" | "RS_SEPARATION" | "RS_COMPRESSION" | "RS_SEPARATED" | "RS_COMPRESSED" | "RS_CLEANED";
