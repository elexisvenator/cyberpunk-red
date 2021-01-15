import { getFullTemplatePath } from "../../templates";
import { ItemCpRed } from "../../item/item";
import ItemSheetCpRed from "./base";
import { LanguageItem, localize } from "../../language";
import { Path } from "../../types/dot-notation";
import { ActionHandlers } from "../../entity";

type ProgramAction = "none";

// This is the model that gets sent to the handlebars template. If you want
// to use some computed values, declare them here and populate them in getData().

interface ItemSheetDataCpRedProgram extends ItemSheetData<ItemDataCpRedProgram> {
  statBlock: {
    name: Path<LanguageItem>;
    path: Path<ItemDataCpRedProgram>;
    type: string;
  }[];
  programTypes: {[key: string]: string;};
}

export default class ItemSheetCpRedProgram extends ItemSheetCpRed<ItemDataCpRedProgram, ItemCpRed<ItemDataCpRedProgram>> {
  private static actionHandlers: ActionHandlers<ItemSheetCpRedProgram, ProgramAction> = {
    none: () => {}
  };
  
  constructor(object: ItemCpRed<ItemDataCpRedProgram>, options: FormApplicationOptions) {
    super(object, {
      ...options,
      actionHandlers: ItemSheetCpRedProgram.actionHandlers,
    });
  }

  get template(): string {
    return getFullTemplatePath("program-sheet.html");
  }

  get title(): string {
    return `${localize("cpred.sheet.program")}: ${this.item.name}`;
  }

  getData(): ItemSheetDataCpRedProgram {
    const parentData = super.getData();

    return {
      ...parentData,
      statBlock: [
        {
          name: "cpred.sheet.stats.atk",
          path: "stats.atk.value",
          type: "number"
        },
        {
          name: "cpred.sheet.stats.def",
          path: "stats.def.value",
          type: "number"
        }
      ],
      programTypes: {
        attacker: "cpred.sheet.program_types.attacker",
        booster: "cpred.sheet.program_types.booster",
        defender: "cpred.sheet.program_types.defender"
      }
    };
  }
}