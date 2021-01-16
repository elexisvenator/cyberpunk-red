import { getFullTemplatePath } from "../../templates";
import { ItemCpRed } from "../../item/item";
import ItemSheetCpRed from "./base";
import { LanguageItem, localize } from "../../language";
import { Path } from "../../types/dot-notation";
import { FormulaRollable } from "../../rollable";
import { ActionHandlers } from "../../entity";

type CyberwareAction = "none";

// This is the model that gets sent to the handlebars template. If you want
// to use some computed values, declare them here and populate them in getData().

interface ItemSheetDataCpRedCyberware extends ItemSheetData<ItemDataCpRedCyberware> {
  type_types: {[key: string]: string;};
  foundation_types: {[key: string]: string;};
  install_types: {[key: string]: string;};
}

export default class ItemSheetCpRedCyberware extends ItemSheetCpRed<ItemDataCpRedCyberware, ItemCpRed<ItemDataCpRedCyberware>> {
  private static actionHandlers: ActionHandlers<ItemSheetCpRedCyberware, CyberwareAction> = {
    none: () => {}
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

  getData(): ItemSheetDataCpRedCyberware {
    const parentData = super.getData();

    return {
      ...parentData,
      type_types: {
        fashionware: "Fashionware",
        neuralware: "Neuralware",
        cyberoptics: "Cyberoptics",
        cyberaudio: "Cyberaudio",
        internal_body: "Internal Body Cyberware",
        external_body: "External Body Cyberware",
        cyberlimbs: "Cyberlimbs",
        borgware: "Borgware",
      },
      foundation_types: {
        na: "N/A",
        cyberarm: "Cyberarm",
        cyberaudio_suite: "Cyberaudio Suite",
        cybereye: "Cybereye",
        cyberleg: "Cyberleg",
        neural_link: "Neural Link"
      },
      install_types: {
        na: "N/A",
        mall: "Mall",
        clinic: "Clinic",
        hospital: "Hospital",
      }
    };
  }
}