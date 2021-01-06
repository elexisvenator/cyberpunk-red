import { getFullTemplatePath } from "../../templates";
import { ActorCpRed } from "../actor";
import ActorSheetCpRed from "./base";

export default class ActorSheetCpRedCharacter extends ActorSheetCpRed<ActorDataCpRedCharacter, ActorCpRed<ActorDataCpRedCharacter>> {
  get template(): string {
    return getFullTemplatePath("character-sheet.html");
  }
}
