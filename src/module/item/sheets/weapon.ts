import { getFullTemplatePath } from "../../templates";
import { ItemCpRed } from "../../item/item";
import ItemSheetCpRed from "./base";
import { localize } from "../../language";
import { ActionHandlers } from "../../entity";
import { weaponSkillList, weaponTypeList, weaponTagList, ammunitionTypes } from "../../static_data"

type WeaponAction = "removeTag";

// This is the model that gets sent to the handlebars template. If you want
// to use some computed values, declare them here and populate them in getData().

interface ItemSheetDataCpRedWeapon extends ItemSheetData<ItemDataCpRedWeapon> {
  weaponTypes: StringDictionary;
  weaponSkills: StringDictionary;
  weaponTags: StringDictionary;
  ammunitionTypes: StringDictionary;
}

export default class ItemSheetCpRedWeapon extends ItemSheetCpRed<ItemDataCpRedWeapon, ItemCpRed<ItemDataCpRedWeapon>> {
  private static actionHandlers: ActionHandlers<ItemSheetCpRedWeapon, WeaponAction> = {
    removeTag: async (sheet, _action, data) =>
      sheet.item.update({ "data.tags": sheet.item.data.data.tags.filter((tag) => tag !== data) }, null),
  };

  };

  constructor(object: ItemCpRed<ItemDataCpRedWeapon>, options: FormApplicationOptions) {
    super(object, {
      ...options,
      actionHandlers: ItemSheetCpRedWeapon.actionHandlers,
    });
  }

  static get defaultOptions(): FormApplicationOptions {
    const options = super.defaultOptions;
    mergeObject(options, {
      width: 500,
      height: 800,
      resizable: true,
      classes: ["cpred", "sheet", "item"],
      scrollY: [".tab.combat"],
      tabs: [{ navSelector: ".nav-tabs.primary-tabs", contentSelector: ".sheet-body", initial: "detail" }],
    });
    return options;
  }

  get template(): string {
    return getFullTemplatePath("weapon-sheet.html");
  }

  get title(): string {
    return `${localize("cpred.sheet.weapon")}: ${this.item.name}`;
  }

  getData(options?: unknown): ItemSheetDataCpRedWeapon {
    const parentData = super.getData(options);

    return {
      ...parentData,
      weaponSkills: weaponSkillList,
      weaponTypes: weaponTypeList,
      weaponTags: weaponTagList,
      ammunitionTypes: ammunitionTypes,
    };
  }

  protected activateListeners(html: JQuery): void {
    super.activateListeners(html);

    const data = this.getData().data;

    html.find("#tag-selector").on("change", (ev) => {
      ev.preventDefault();

      const tag = (ev.currentTarget as HTMLSelectElement).selectedOptions[0].value;
      const new_tags: string[] = data.tags;
      if (tag !== "" && !data.tags.includes(tag)) {
        new_tags.push(tag);
      }
      this.item.update({ "data.tags": new_tags }, null);
    });
  }
}
