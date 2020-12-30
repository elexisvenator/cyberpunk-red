import ActorCpRed from "../entity";

export default class ActorSheetCpRed<
  DataType = ActorDataCpRed,
  ActorType extends Actor<DataType> = ActorCpRed<DataType>
> extends ActorSheet<DataType, ActorType> {
  constructor(...args: any) {
    super(...args);
  }

  static get defaultOptions() {
    const options = super.defaultOptions;
    mergeObject(options, {
      classes: options.classes.concat(["cpred"]),
    });
    return options;
  }
}
