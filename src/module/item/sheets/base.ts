import { ItemCpRed } from "../item";

// this is the model that gets sent to the handlebars template
// If you want to use some computed values, declare them here and populate them in getData()
type ItemSheetDataCpRed<DataType extends ItemDataCpRed> = ItemSheetData<DataType>;

export default class ItemSheetCpRed<
  DataType extends ItemDataCpRed = ItemDataCpRed,
  ItemType extends ItemCpRed<DataType> = ItemCpRed<DataType>
> extends ItemSheet<DataType, ItemType> {
  constructor(...args: unknown[]) {
    super(...args);
  }

  static get defaultOptions(): FormApplicationOptions {
    const options = super.defaultOptions;
    mergeObject(options, {
      classes: options.classes.concat(["cpred"]),
    });
    return options;
  }

  getData(): ItemSheetDataCpRed<DataType> {
    const parentData = super.getData() as ItemSheetData<DataType>;

    const sheetData: ItemSheetDataCpRed<DataType> = {
      ...parentData,
    };

    return sheetData;
  }

  protected activateListeners(html: JQuery): void {
    super.activateListeners(html);
    if (!this.options.editable) return;

    html.find("[data-action]").on("click", this._onSheetAction.bind(this));
  }

  protected _onSheetAction(event: JQuery.TriggeredEvent<HTMLElement, unknown, HTMLElement, HTMLElement>): void {
    throw new Error(`Unknown action for event ${JSON.stringify(event)}`);
  }
}
