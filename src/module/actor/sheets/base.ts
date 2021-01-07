import { ActionHandlers, CpRedSheetOptions } from "../../entity";
import { ActorCpRed } from "../actor";

// this is the model that gets sent to the handlebars template
// If you want to use some computed values, declare them here and populate them in getData()
export type ActorSheetDataCpRed<DataType extends ActorDataCpRed = ActorDataCpRed> = ActorSheetData<DataType>;

export default class ActorSheetCpRed<DataType extends ActorDataCpRed, ActorType extends ActorCpRed<DataType>> extends ActorSheet<
  DataType,
  ActorType
> {
  protected actionHandlers: ActionHandlers<ActorSheetCpRed<DataType, ActorType>, string>;

  constructor(object: ActorType, options?: CpRedSheetOptions<ActorSheetCpRed<DataType, ActorType>>) {
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
    event.preventDefault();

    const action = event.currentTarget.dataset.action;
    if (action in this.actionHandlers) {
      const handler = this.actionHandlers[action];
      if (handler == null) {
        throw new Error(`Declared action '${action}' called but no implementation defined.`);
      }

      handler(this, action);
    } else {
      throw new Error(`Unknown action '${action}' for event ${JSON.stringify(event)}`);
    }
  }
}
