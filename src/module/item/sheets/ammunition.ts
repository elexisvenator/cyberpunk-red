import { getFullTemplatePath } from "../../templates";
import { ItemCpRed } from "../../item/item";
import ItemSheetCpRed from "./base";
import { localize } from "../../language";
import { ActionHandlers } from "../../entity";

type AmmunitionAction = "";

// This is the model that gets sent to the handlebars template. If you want
// to use some computed values, declare them here and populate them in getData().

interface ItemSheetDataCpRedAmmunition extends ItemSheetData<ItemDataCpRedAmmunition> {
  sizeTypeList: { [key: string]: string };
}

export default class ItemSheetCpRedAmmunition extends ItemSheetCpRed<ItemDataCpRedAmmunition, ItemCpRed<ItemDataCpRedAmmunition>> {
  private static actionHandlers: ActionHandlers<ItemSheetCpRedAmmunition, AmmunitionAction> = {
    "": async () => {},
  };

  private static sizeTypeList: { [key: string]: string } = {
    "medium_pistol": "cpred.sheet.ammunition_size_types.medium_pistol",
    "heavy_pistol": "cpred.sheet.ammunition_size_types.heavy_pistol",
    "very_heavy_pistol": "cpred.sheet.ammunition_size_types.very_heavy_pistol",
    "slug": "cpred.sheet.ammunition_size_types.slug",
    "rifle": "cpred.sheet.ammunition_size_types.rifle",
    "shotgun_shell": "cpred.sheet.ammunition_size_types.shotgun_shell",
    "arrow": "cpred.sheet.ammunition_size_types.arrow",
    "grenade": "cpred.sheet.ammunition_size_types.grenade",
    "rocket": "cpred.sheet.ammunition_size_types.rocket"
  };

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
      sizeTypeList: ItemSheetCpRedAmmunition.sizeTypeList,
    };
  }
}
