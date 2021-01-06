import { LanguageItem, localize } from "../../language";
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
  static get defaultOptions(): FormApplicationOptions {
    const options = super.defaultOptions;
    mergeObject(options, {
      width: 950,
      height: 600,
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
          path: "attributes.per.value",
          action: "block-slide",
        },
        {
          name: "cpred.sheet.stats.speed",
          actionName: "cpred.sheet.iceactions.ambush",
          path: "attributes.spd.value",
          action: "ambush",
        },
        {
          name: "cpred.sheet.stats.attack",
          actionName: "cpred.sheet.iceactions.attack",
          path: "attributes.atk.value",
          action: "attack",
        },
        {
          name: "cpred.sheet.stats.defence",
          actionName: "cpred.sheet.iceactions.defend",
          path: "attributes.def.value",
          action: "defend",
        },
      ],
      iceClasses: ["antipersonnel", "antiprogram"],
    };
  }

  protected _onSheetAction(event: JQuery.TriggeredEvent<HTMLElement, unknown, HTMLElement, HTMLElement>): void {
    event.preventDefault();
    const button = event.currentTarget;
    switch (button.dataset.action as IceAction) {
      case "ambush":
        this._rollAmbush();
        break;
      case "attack":
        break;
      case "block-slide":
        break;
      case "damage":
        break;
      case "defend":
        break;
      default:
        super._onSheetAction(event);
    }
  }

  private _rollAmbush(): void {
    const actor = this.actor;
    const data = actor.data.data;
    // TODO: Make 1d10cp a constant somewhere
    const formula = `1d10cp + ${data.attributes.spd.value}`;

    // TODO: Abstract this somewhere
    // TODO: Handle detail and description
    // TODO: Custom html
    const roll = new Roll(formula);
    roll
      .roll()
      .render()
      .then((content) => {
        ChatMessage.create({
          user: game.user._id,
          speaker: ChatMessage.getSpeaker({
            actor,
          }),
          content,
          sound: CONFIG.sounds.dice,
        });
      });
  }
}
