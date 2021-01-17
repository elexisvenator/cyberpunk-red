import { getFullTemplatePath } from "../../templates";
import { ItemCpRed } from "../../item/item";
import ItemSheetCpRed from "./base";
import { LanguageItem, localize } from "../../language";
import { Path } from "../../types/dot-notation";
import { ActionHandlers } from "../../entity";

type EffectAction = "addStat" | "addSkill";

// This is the model that gets sent to the handlebars template. If you want
// to use some computed values, declare them here and populate them in getData().

interface ItemSheetDataCpRedEffect extends ItemSheetData<ItemDataCpRedEffect> {
  statList: { [key: string]: string };
  skillList: { [key: string]: string };
}

export default class ItemSheetCpRedEffect extends ItemSheetCpRed<ItemDataCpRedEffect, ItemCpRed<ItemDataCpRedEffect>> {
  private static actionHandlers: ActionHandlers<ItemSheetCpRedEffect, EffectAction> = {
    addStat: async (sheet, action, value) => sheet.addModifier(value, "stats"),
    addSkill: async (sheet, action, value) => sheet.addModifier(value, "skills"),
  };
    
  private static statList: { [key: string]: string } = {
    "": "cpred.sheet.labels.add_stat_modifier",
    atk: "cpred.sheet.stats.atk",
    def: "cpred.sheet.stats.def",
    rez: "cpred.sheet.stats.rez",
    int: "cpred.sheet.stats.int",
    ref: "cpred.sheet.stats.ref",
    dex: "cpred.sheet.stats.dex",
    tech: "cpred.sheet.stats.tech",
    cool: "cpred.sheet.stats.cool",
    will: "cpred.sheet.stats.will",
    luck: "cpred.sheet.stats.luck",
    move: "cpred.sheet.stats.move",
    body: "cpred.sheet.stats.body",
    emp: "cpred.sheet.stats.emp",
  };

  private static skillList: { [key: string]: string } = {
    accounting: "cpred.skills.accounting",
    acting: "cpred.skills.acting",
    air_vehicle_tech: "cpred.skills.air_vehicle_tech",
    animal_handling: "cpred.skills.animal_handling",
    archery: "cpred.skills.archery",
    athletics: "cpred.skills.athletics",
    autofire: "cpred.skills.autofire",
    basic_tech: "cpred.skills.basic_tech",
    brawling: "cpred.skills.brawling",
  };

  constructor(object: ItemCpRed<ItemDataCpRedEffect>, options: FormApplicationOptions) {
    super(object, {
      ...options,
      actionHandlers: ItemSheetCpRedEffect.actionHandlers,
    });
  }

  get template(): string {
    return getFullTemplatePath("effect-sheet.html");
  }

  get title(): string {
    return `${localize("cpred.sheet.labels.effect")}: ${this.item.name}`;
  }

  getData(): ItemSheetDataCpRedEffect {
    const parentData = super.getData();

    return {
      ...parentData,
      statList: ItemSheetCpRedEffect.statList,
      skillList: ItemSheetCpRedEffect.skillList,
    };
  }

  protected activateListeners(html: JQuery): void {
    super.activateListeners(html);

    const data = super.getData().data;

    html.find("[data-change]").on("change", this._onSheetActionChange.bind(this));
  }

  protected _onSheetActionChange(event: JQuery.TriggeredEvent<HTMLElement, unknown, HTMLElement, HTMLElement>): void {
    event.preventDefault();

    const action = event.currentTarget.dataset.change;
    const value = (event.currentTarget as HTMLSelectElement).selectedOptions[0].value;
    if (action in this.actionHandlers) {
      const handler = this.actionHandlers[action];
      if (handler == null) {
        throw new Error(`Declared action '${action}' called but no implementation defined.`);
      }

      handler(this, action, value);
    } else {
      throw new Error(`Unknown action '${action}' for event ${JSON.stringify(event)}`);
    }
  }

  public async addModifier(value: string, type: string): Promise<void> {
    const formData = this.getData();
    const modifiersObj = formData.item.data.modifiers;
    const modifierArray = Object.keys(modifiersObj)
      .map((k) => +k)
      .sort()
      .map((k) => modifiersObj[k]);

    // Remove a null element if it exists
    if (modifierArray.length > 0 && modifierArray[modifierArray.length - 1] == null) {
      modifierArray.pop();
    }

    modifierArray.push({
      path: `${type}.${value}`,
      offset: 0,
      source: "",
    });

    const updatedData = {};
    updatedData["data.modifiers"] = modifierArray.reduce((agg, cur, index) => {
      agg[index + ""] = cur;
      return agg;
    }, {});

    await this.item.update(updatedData, null);
  }
}