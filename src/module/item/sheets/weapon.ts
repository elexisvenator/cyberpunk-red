import { getFullTemplatePath } from "../../templates";
import { ItemCpRed } from "../../item/item";
import ItemSheetCpRed from "./base";
import { localize } from "../../language";
import { ActionHandlers } from "../../entity";
import { weaponSkillList, weaponTypeList, weaponTagList, ammunitionTypes } from "../../static_data"

type WeaponAction = "addTag" | "removeTag" | "addAmmunitionType" | "removeAmmunitionType";

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
    addTag: async (sheet, _action, _value) => sheet.addTag(),
    removeTag: async (sheet, _action, data) =>
      sheet.item.update({ "data.tags": sheet.item.data.data.tags.filter((tag) => tag !== data) }, null),
    addAmmunitionType: async (sheet, _action, _value) => sheet.addAmmunitionType(),
    removeAmmunitionType: (sheet, _action, data) =>
      sheet.item.update({ "data.attributes.ammunitionTypes": sheet.item.data.data.attributes.ammunitionTypes.filter((entry) => entry !== data) }, null),
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

  async addTag(): Promise<void> {
    const data = this.getData().data;

    const tag = this.form["tag-selector"].value;
    const newTags: string[] = data.tags;
    if (!data.tags.includes(tag)) {
      newTags.push(tag);
    }
    await this.item.update({ "data.tags": newTags }, null);
  }

  async addAmmunitionType(): Promise<void> {
    const data = this.getData().data;

    const type = this.form["ammunition-selector"].value;
    const newTypes: string[] = data.attributes.ammunitionTypes;
    if (!data.attributes.ammunitionTypes.includes(type)) {
      newTypes.push(type);
    }
    await this.item.update({ "data.attributes.ammunitionTypes": newTypes }, null);
  }
}
