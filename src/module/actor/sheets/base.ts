import { ActionHandlers, CpRedSheetOptions } from "../../entity";
import { Tooltip } from "../../bootstrap/index.esm";
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
      classes: options.classes.concat(["cpred", ActorSheetCpRed._getAppSizeClass(options.width as number)]),
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
    html.find('[data-bs-toggle="tooltip"]').each((i, element) => new Tooltip(element, { container: html }));
  }

  protected async _onSheetAction(event: JQuery.TriggeredEvent<HTMLElement, unknown, HTMLElement, HTMLElement>): Promise<void> {
    event.preventDefault();

    const action = event.currentTarget.dataset.action;
    const value = event.currentTarget.dataset.value;
    if (action in this.actionHandlers) {
      const handler = this.actionHandlers[action];
      if (handler == null) {
        throw new Error(`Declared action '${action}' called but no implementation defined.`);
      }

      await handler(this, action, value);
    } else {
      throw new Error(`Unknown action '${action}' for event ${JSON.stringify(event)}`);
    }
  }

  private static _getAppSizeClass(width: number): string {
    const breakPoints = {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    };

    const breakPoint: keyof typeof breakPoints =
      width < breakPoints.sm
        ? "xs"
        : width < breakPoints.md
        ? "sm"
        : width < breakPoints.lg
        ? "md"
        : width < breakPoints.xl
        ? "lg"
        : width < breakPoints.xxl
        ? "xl"
        : "xxl";

    return `app-size-${breakPoint}`;
  }

  /** @override */
  protected _onResize(): void {
    const width = this.position.width as number;
    const sizeClass = ActorSheetCpRed._getAppSizeClass(width);

    (this.element as JQuery<HTMLElement>)
      .removeClass("app-size-xs app-size-sm app-size-md app-size-lg app-size-xl app-size-xxl")
      .addClass(sizeClass);
  }
}
