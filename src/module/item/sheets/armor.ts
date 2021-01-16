import { getFullTemplatePath } from "../../templates";
import { ItemCpRed } from "../../item/item";
import ItemSheetCpRed from "./base";
import { LanguageItem, localize } from "../../language";
import { Path } from "../../types/dot-notation";
import { ActionHandlers } from "../../entity";

type ArmorAction = "none";

// This is the model that gets sent to the handlebars template. If you want
// to use some computed values, declare them here and populate them in getData().

interface ItemSheetDataCpRedArmor extends ItemSheetData<ItemDataCpRedArmor> {
  armorTypes: {[key: string]: string;};
}

export default class ItemSheetCpRedArmor extends ItemSheetCpRed<ItemDataCpRedArmor, ItemCpRed<ItemDataCpRedArmor>> {
  private static actionHandlers: ActionHandlers<ItemSheetCpRedArmor, ArmorAction> = {
    none: () => {}
  };
  
  constructor(object: ItemCpRed<ItemDataCpRedArmor>, options: FormApplicationOptions) {
    super(object, {
      ...options,
      actionHandlers: ItemSheetCpRedArmor.actionHandlers,
    });
  }

  get template(): string {
    return getFullTemplatePath("armor-sheet.html");
  }

  get title(): string {
    return `${localize("cpred.sheet.labels.armor")}: ${this.item.name}`;
  }

  getData(): ItemSheetDataCpRedArmor {
    const parentData = super.getData();

    return {
      ...parentData,
      armorTypes: {
        leathers: "cpred.sheet.armor_types.leathers",
        kevlar: "cpred.sheet.armor_types.kevlar",
        light_armorjack: "cpred.sheet.armor_types.light_armorjack",
        bodyweight_suit: "cpred.sheet.armor_types.bodyweight_suit",
        medium_armorjack: "cpred.sheet.armor_types.medium_armorjack",
        heavy_armorjack: "cpred.sheet.armor_types.heavy_armorjack",
        flak: "cpred.sheet.armor_types.flak",
        metalgear: "cpred.sheet.armor_types.metalgear",
      }
    };
  }
}