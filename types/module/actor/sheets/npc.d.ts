import ActorCpRed from "../entity";
import ActorSheetCpRed from "./base";
export default class ActorSheetCpRedNpc extends ActorSheetCpRed<ActorDataCpRedNpc, ActorCpRed<ActorDataCpRedNpc>> {
    get template(): string;
}
