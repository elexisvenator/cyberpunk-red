import { LanguageItem } from "../../language";
import { getFullTemplatePath } from "../../templates";
import { Path } from "../../types/dot-notation";
import { ActorCpRed } from "../actor";
import ActorSheetCpRed, { ActorSheetDataCpRed } from "./base";

// this is the model that gets sent to the handlebars template
// If you want to use some computed values, declare them here and populate them in getData()
interface ActorSheetDataCpRedIce extends ActorSheetDataCpRed<ActorDataCpRedIce> {
  statblock: {
    name: Path<LanguageItem>;
    actionName: Path<LanguageItem>;
    path: Path<ActorDataCpRedIce>;
  }[];
  iceClasses: string[];
}

export default class ActorSheetCpRedIce extends ActorSheetCpRed<ActorDataCpRedIce, ActorCpRed<ActorDataCpRedIce>> {
  static get defaultOptions() {
    const options = super.defaultOptions;
    mergeObject(options, {
      width: 950,
      height: 600,
      resizable: true,
    });
    return options;
  }

  get template() {
    return getFullTemplatePath("ice-sheet.html");
  }

  get title() {
    return this.token && !this.token.data.actorLink
      ? `[Token] ${game.i18n.localize("cpred.sheet.ice")}: ${this.actor.name}`
      : `${game.i18n.localize("cpred.sheet.ice")}: ${this.actor.name}`;
  }

  getData(): ActorSheetDataCpRedIce {
    const parentData = super.getData();

    return {
      ...parentData,
      statblock: [
        {
          name: "cpred.sheet.stats.perception",
          actionName: "cpred.sheet.iceactions.blockslide",
          path: "attributes.per.value",
        },
        {
          name: "cpred.sheet.stats.speed",
          actionName: "cpred.sheet.iceactions.ambush",
          path: "attributes.spd.value",
        },
        {
          name: "cpred.sheet.stats.attack",
          actionName: "cpred.sheet.iceactions.attack",
          path: "attributes.atk.value",
        },
        {
          name: "cpred.sheet.stats.defence",
          actionName: "cpred.sheet.iceactions.defend",
          path: "attributes.def.value",
        },
      ],
      iceClasses: ["antipersonnel", "antiprogram"],
    };
  }
}
