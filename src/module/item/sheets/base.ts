import { ActionHandlers, CpRedSheetOptions } from "../../entity";
import { ItemCpRed } from "../item";

// this is the model that gets sent to the handlebars template
// If you want to use some computed values, declare them here and populate them in getData()
type ItemSheetDataCpRed<DataType extends ItemDataCpRed> = ItemSheetData<DataType>;

export default class ItemSheetCpRed<
  DataType extends ItemDataCpRed = ItemDataCpRed,
  ItemType extends ItemCpRed<DataType> = ItemCpRed<DataType>
> extends ItemSheet<DataType, ItemType>
{
  protected actionHandlers: ActionHandlers<ItemSheetCpRed<DataType, ItemType>, string>;

  constructor(object: ItemType, options?: CpRedSheetOptions<ItemSheetCpRed<DataType, ItemType>>) {
    super(object, options);

    this.actionHandlers = {
      // any shared handlers can be added here.
      // add them above so they can be overridden.
      ...options?.actionHandlers,
    };
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
    event.preventDefault();

    const action = event.currentTarget.dataset.action;
    const value = event.currentTarget.dataset.value;
    if (action in this.actionHandlers) {
      const handler = this.actionHandlers[action];
      if (handler == null) {
        throw new Error(`Declared action '${action}' called but no implementation defined.`);
      }

      handler(this, action, value);
    } else {
      throw new Error(`Unknown action '${action}' for event ${JSON.stringify(event)}`);
    }
  }
}
