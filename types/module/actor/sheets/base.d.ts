import ActorCpRed from "../entity";
export default class ActorSheetCpRed<DataType = ActorDataCpRed, ActorType extends Actor<DataType> = ActorCpRed<DataType>> extends ActorSheet<DataType, ActorType> {
    constructor(...args: any);
    static get defaultOptions(): FormApplicationOptions;
}
