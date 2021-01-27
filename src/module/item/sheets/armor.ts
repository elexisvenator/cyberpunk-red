import { getFullTemplatePath } from "../../templates";
import { ItemCpRed } from "../../item/item";
import ItemSheetCpRed from "./base";
import { localize } from "../../language";
import { ActionHandlers } from "../../entity";
import { armorTypeList, armorLocationList } from "../../static_data";

type ArmorAction = "none";

// This is the model that gets sent to the handlebars template. If you want
// to use some computed values, declare them here and populate them in getData().

interface ItemSheetDataCpRedArmor extends ItemSheetData<ItemDataCpRedArmor> {
  armorTypes: { [key: string]: string; };
  armorLocations: { [key: string]: string; };
}

export default class ItemSheetCpRedArmor extends ItemSheetCpRed<ItemDataCpRedArmor, ItemCpRed<ItemDataCpRedArmor>> {
  private static actionHandlers: ActionHandlers<ItemSheetCpRedArmor, ArmorAction> = {
    none: async () => {},
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

  getData(options?: unknown): ItemSheetDataCpRedArmor {
    const parentData = super.getData(options);

    return {
      ...parentData,
      armorTypes: armorTypeList,
      armorLocations: armorLocationList
    };
  }
}
