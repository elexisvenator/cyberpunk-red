import { ActorCpRed } from "../actor";

// this is the model that gets sent to the handlebars template
// If you want to use some computed values, declare them here and populate them in getData()
export type ActorSheetDataCpRed<DataType extends ActorDataCpRed = ActorDataCpRed> = ActorSheetData<DataType>;

export default class ActorSheetCpRed<DataType extends ActorDataCpRed, ActorType extends ActorCpRed<DataType>> extends ActorSheet<
  DataType,
  ActorType
> {
  constructor(object: ActorType, options?: FormApplicationOptions) {
    super(object, options);
  }

  static get defaultOptions(): FormApplicationOptions {
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

  activateListeners(html: JQuery): void {
    super.activateListeners(html);
    if (!this.options.editable) return;

    html.find("[data-action]").on("click", this._onSheetAction.bind(this));
  }

  protected _onSheetAction(event: JQuery.TriggeredEvent<HTMLElement, unknown, HTMLElement, HTMLElement>): void {
    throw new Error(`Unknown action for event ${JSON.stringify(event)}`);
  }
}
