import { ActorCpRed } from "../actor";

// this is the model that gets sent to the handlebars template
// If you want to use some computed values, declare them here and populate them in getData()
export interface ActorSheetDataCpRed<DataType extends ActorDataCpRed = ActorDataCpRed> extends ActorSheetData<DataType> {}

export default class ActorSheetCpRed<DataType extends ActorDataCpRed, ActorType extends ActorCpRed<DataType>> extends ActorSheet<
  DataType,
  ActorType
> {
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

  getData(): ActorSheetDataCpRed<DataType> {
    const parentData = super.getData() as ActorSheetData<DataType>;

    const sheetData: ActorSheetDataCpRed<DataType> = {
      ...parentData,
    };

    return sheetData;
  }

  protected activateListeners(html: any) {
    super.activateListeners(html);
  }
}
