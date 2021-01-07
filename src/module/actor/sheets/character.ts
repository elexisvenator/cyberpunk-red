import { getFullTemplatePath } from "../../templates";
import { ActorCpRed } from "../actor";
import ActorSheetCpRed, { ActorSheetDataCpRed } from "./base";
import { ItemCpRed } from "../../item/item"
import { ActionHandlers } from "../../entity";


type CharacterAction = "remove-item";

interface ActorSheetDataCpRedCharacter extends ActorSheetDataCpRed<ActorDataCpRedCharacter> {
  gearblock: ItemCpRed[];
}

export default class ActorSheetCpRedCharacter extends ActorSheetCpRed<ActorDataCpRedCharacter, ActorCpRed<ActorDataCpRedCharacter>> {
  private static actionHandlers: ActionHandlers<ActorSheetCpRedCharacter, CharacterAction> = {
    "remove-item": () => {},
  }

  constructor(object: ActorCpRed<ActorDataCpRedCharacter>, options: FormApplicationOptions) {
    super(object, {
      ...options,
      actionHandlers: ActorSheetCpRedCharacter.actionHandlers,
    });
  }

  get template(): string {
    return getFullTemplatePath("character-sheet.html");
  }

  getData(): ActorSheetDataCpRedCharacter {
    const parentData = super.getData();

    let actor: ActorCpRed = this.actor;

    // Retrieve and sort all items the character owns
    let items: ItemCpRed[] = Array.from(actor.items.values());
    items.sort((a, b) => {return ("" + a.name).localeCompare(b.name)});

    return {
      ...parentData,
      gearblock: items
    };
  }
}
