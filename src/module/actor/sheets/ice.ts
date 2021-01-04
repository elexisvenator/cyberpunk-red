import { getFullTemplatePath } from "../../templates";
import { ActorCpRed } from "../actor";
import ActorSheetCpRed from "./base";

// this is the model that gets sent to the handlebars template
// If you want to use some computed values, declare them here and populate them in getData()
declare interface ActorSheetDataCpRedIce extends ActorSheetData<ActorDataCpRedIce> {
  statblock: {
    name: string;
    value: number;
    datapath: string;
    actionName: string;
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
    const data = parentData.data;

    return {
      ...parentData,
      statblock: [
        {
          name: "cpred.sheet.stats.perception",
          value: data.attributes.per.value,
          datapath: "data.attributes.per.value",
          actionName: "cpred.sheet.iceactions.blockslide",
        },
        {
          name: "cpred.sheet.stats.speed",
          value: data.attributes.spd.value,
          datapath: "data.attributes.spd.value",
          actionName: "cpred.sheet.iceactions.ambush",
        },
        {
          name: "cpred.sheet.stats.attack",
          value: data.attributes.atk.value,
          datapath: "data.attributes.atk.value",
          actionName: "cpred.sheet.iceactions.attack",
        },
        {
          name: "cpred.sheet.stats.defence",
          value: data.attributes.def.value,
          datapath: "data.attributes.def.value",
          actionName: "cpred.sheet.iceactions.defend",
        },
      ],
      iceClasses: ["antipersonnel", "antiprogram"],
    };
  }
}
