import { getFullTemplatePath } from "../../templates";
import ActorCpRed from "../entity";
import ActorSheetCpRed from "./base";

export default class ActorSheetCpRedIce extends ActorSheetCpRed<ActorDataCpRedIce, ActorCpRed<ActorDataCpRedIce>> {
  get template() {
    console.log(this.actor);
    return getFullTemplatePath("ice-sheet.html");
  }
}
