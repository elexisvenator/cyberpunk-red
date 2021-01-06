import { getFullTemplatePath } from "../../templates";
import { ActorCpRed } from "../actor";
import ActorSheetCpRed from "./base";

export default class ActorSheetCpRedNpc extends ActorSheetCpRed<ActorDataCpRedNpc, ActorCpRed<ActorDataCpRedNpc>> {
  get template(): string {
    return getFullTemplatePath("npc-sheet.html");
  }
}
