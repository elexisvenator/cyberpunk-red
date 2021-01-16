import { ActionHandlers } from "../../entity";
import { LanguageItem, localize } from "../../language";
import { FormulaRollable } from "../../rollable";
import { getFullTemplatePath } from "../../templates";
import { Path } from "../../types/dot-notation";
import { ActorCpRed } from "../actor";
import ActorSheetCpRed, { ActorSheetDataCpRed } from "./base";

type IceAction = "block-slide" | "ambush" | "attack" | "defend" | "damage";

// this is the model that gets sent to the handlebars template
// If you want to use some computed values, declare them here and populate them in getData()
interface ActorSheetDataCpRedIce extends ActorSheetDataCpRed<ActorDataCpRedIce> {
  statblock: {
    name: Path<LanguageItem>;
    actionName: Path<LanguageItem>;
    path: Path<ActorDataCpRedIce>;
    action: IceAction;
  }[];
  iceClasses: string[];
}

export default class ActorSheetCpRedIce extends ActorSheetCpRed<ActorDataCpRedIce, ActorCpRed<ActorDataCpRedIce>> {
  private static actionHandlers: ActionHandlers<ActorSheetCpRedIce, IceAction> = {
    ambush: async (sheet) => new FormulaRollable(`1d10cp + ${sheet.actor.data.data.stats.spd.value}`, sheet.actor).roll(),
    attack: async (sheet) => new FormulaRollable(`1d10cp + ${sheet.actor.data.data.stats.atk.value}`, sheet.actor).roll(),
    "block-slide": async (sheet) => new FormulaRollable(`1d10cp + ${sheet.actor.data.data.stats.per.value}`, sheet.actor).roll(),
    damage: async (sheet) => new FormulaRollable(sheet.actor.data.data.attributes.damage.value, sheet.actor).roll(),
    defend: async (sheet) => new FormulaRollable(`1d10cp + ${sheet.actor.data.data.stats.def.value}`, sheet.actor).roll(),
  };

  constructor(object: ActorCpRed<ActorDataCpRedIce>, options: FormApplicationOptions) {
    super(object, {
      ...options,
      actionHandlers: ActorSheetCpRedIce.actionHandlers,
    });
  }

  static get defaultOptions(): FormApplicationOptions {
    const options = super.defaultOptions;
    mergeObject(options, {
      width: 950,
      height: 610,
      resizable: true,
    });
    return options;
  }

  get template(): string {
    return getFullTemplatePath("ice-sheet.html");
  }

  get title(): string {
    return this.token && !this.token.data.actorLink
      ? `[Token] ${localize("cpred.sheet.ice")}: ${this.actor.name}`
      : `${localize("cpred.sheet.ice")}: ${this.actor.name}`;
  }

  getData(): ActorSheetDataCpRedIce {
    const parentData = super.getData();

    return {
      ...parentData,
      statblock: [
        {
          name: "cpred.sheet.stats.perception",
          actionName: "cpred.sheet.iceactions.blockslide",
          path: "stats.per.value",
          action: "block-slide",
        },
        {
          name: "cpred.sheet.stats.speed",
          actionName: "cpred.sheet.iceactions.ambush",
          path: "stats.spd.value",
          action: "ambush",
        },
        {
          name: "cpred.sheet.stats.attack",
          actionName: "cpred.sheet.iceactions.attack",
          path: "stats.atk.value",
          action: "attack",
        },
        {
          name: "cpred.sheet.stats.defence",
          actionName: "cpred.sheet.iceactions.defend",
          path: "stats.def.value",
          action: "defend",
        },
      ],
      iceClasses: ["antipersonnel", "antiprogram"],
    };
  }
}
