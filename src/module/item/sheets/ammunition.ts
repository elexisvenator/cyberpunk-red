import { getFullTemplatePath } from "../../templates";
import { ItemCpRed } from "../../item/item";
import ItemSheetCpRed from "./base";
import { localize } from "../../language";
import { ActionHandlers } from "../../entity";
import { ammunitionTypeList } from "../../static_data";

// type AmmunitionAction = "";

// This is the model that gets sent to the handlebars template. If you want
// to use some computed values, declare them here and populate them in getData().

interface ItemSheetDataCpRedAmmunition extends ItemSheetData<ItemDataCpRedAmmunition> {
  sizeTypeList: { [key: string]: string };
}

export default class ItemSheetCpRedAmmunition extends ItemSheetCpRed<ItemDataCpRedAmmunition, ItemCpRed<ItemDataCpRedAmmunition>> {
  private static actionHandlers: ActionHandlers<ItemSheetCpRedAmmunition, undefined> = {};

  constructor(object: ItemCpRed<ItemDataCpRedAmmunition>, options: FormApplicationOptions) {
    super(object, {
      ...options,
      actionHandlers: ItemSheetCpRedAmmunition.actionHandlers,
    });
  }

  get template(): string {
    return getFullTemplatePath("ammunition-sheet.html");
  }

  get title(): string {
    return `${localize("cpred.sheet.labels.ammunition")}: ${this.item.name}`;
  }

  getData(options?: unknown): ItemSheetDataCpRedAmmunition {
    const parentData = super.getData(options);

    return {
      ...parentData,
      sizeTypeList: ammunitionTypeList,
    };
  }
}
