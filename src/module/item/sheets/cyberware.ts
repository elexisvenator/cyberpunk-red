import { getFullTemplatePath } from "../../templates";
import { ItemCpRed } from "../../item/item";
import ItemSheetCpRed from "./base";
import { localize } from "../../language";
import { ActionHandlers } from "../../entity";
import { cyberwareTypeLists, cyberwareFoundationList, cyberwareInstallList } from "../../static_data";

type CyberwareAction = "none";

// This is the model that gets sent to the handlebars template. If you want
// to use some computed values, declare them here and populate them in getData().

interface ItemSheetDataCpRedCyberware extends ItemSheetData<ItemDataCpRedCyberware> {
  cyberwareTypes: StringDictionary;
  foundationTypes: StringDictionary;
  installTypes: StringDictionary;
}

export default class ItemSheetCpRedCyberware extends ItemSheetCpRed<ItemDataCpRedCyberware, ItemCpRed<ItemDataCpRedCyberware>> {
  private static actionHandlers: ActionHandlers<ItemSheetCpRedCyberware, CyberwareAction> = {
    none: async () => {},
  };

  constructor(object: ItemCpRed<ItemDataCpRedCyberware>, options: FormApplicationOptions) {
    super(object, {
      ...options,
      actionHandlers: ItemSheetCpRedCyberware.actionHandlers,
    });
  }

  get template(): string {
    return getFullTemplatePath("cyberware-sheet.html");
  }

  get title(): string {
    return `${localize("cpred.sheet.cyberware")}: ${this.item.name}`;
  }

  getData(options?: unknown): ItemSheetDataCpRedCyberware {
    const parentData = super.getData(options);

    return {
      ...parentData,
      cyberwareTypes: cyberwareTypeLists,
      foundationTypes: cyberwareFoundationList,
      installTypes: cyberwareInstallList,
    };
  }
}
