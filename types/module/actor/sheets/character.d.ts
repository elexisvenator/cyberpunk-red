import ActorCpRed from "../entity";
import ActorSheetCpRed from "./base";
export default class ActorSheetCpRedCharacter extends ActorSheetCpRed<ActorDataCpRedCharacter, ActorCpRed<ActorDataCpRedCharacter>> {
    get template(): string;
}
