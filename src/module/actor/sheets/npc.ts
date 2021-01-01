import { getFullTemplatePath } from "../../templates";
import { ActorCpRed } from "../entity";
import ActorSheetCpRed from "./base";

export default class ActorSheetCpRedNpc<
  DataType extends ActorDataCpRedNpc = ActorDataCpRedNpc,
  ActorType extends ActorCpRed<DataType> = ActorCpRed<DataType>
> extends ActorSheetCpRed<DataType, ActorType> {
  get template() {
    console.log(this.actor);
    return getFullTemplatePath("npc-sheet.html");
  }
}
