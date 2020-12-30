import ActorCpRed from "../entity";
import ActorSheetCpRed from "./base";
export default class ActorSheetCpRedIce extends ActorSheetCpRed<ActorDataCpRedIce, ActorCpRed<ActorDataCpRedIce>> {
    get template(): string;
}
