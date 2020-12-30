import { getFullTemplatePath } from "../../templates";
import ActorCpRed from "../entity";
import ActorSheetCpRed from "./base";

export default class ActorSheetCpRedCharacter extends ActorSheetCpRed<ActorDataCpRedCharacter, ActorCpRed<ActorDataCpRedCharacter>> {
  get template() {
    return getFullTemplatePath("character-sheet.html");
  }
}
