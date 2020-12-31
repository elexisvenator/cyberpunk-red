import { getFullTemplatePath } from "../../templates";
import ActorCpRed from "../entity";
import ActorSheetCpRed from "./base";

export default class ActorSheetCpRedCharacter<
  DataType extends ActorDataCpRedCharacter = ActorDataCpRedCharacter,
  ActorType extends ActorCpRed<DataType> = ActorCpRed<DataType>
> extends ActorSheetCpRed<DataType, ActorType> {
  get template() {
    return getFullTemplatePath("character-sheet.html");
  }
}
