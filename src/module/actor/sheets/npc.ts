import { getFullTemplatePath } from "../../templates";
import { ActorCpRed } from "../actor";
import ActorSheetCpRed from "./base";

export default class ActorSheetCpRedNpc extends ActorSheetCpRed<ActorDataCpRedNpc, ActorCpRed<ActorDataCpRedNpc>> {
  get template() {
    console.log(this.actor);
    return getFullTemplatePath("npc-sheet.html");
  }
}
