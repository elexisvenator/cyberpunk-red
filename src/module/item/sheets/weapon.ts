import { getFullTemplatePath } from "../../templates";
import { ItemCpRed } from "../../item/item";
import ItemSheetCpRed from "./base";
import { localize } from "../../language";
import { ActionHandlers } from "../../entity";

type WeaponAction = "removeTag";

// This is the model that gets sent to the handlebars template. If you want
// to use some computed values, declare them here and populate them in getData().

interface ItemSheetDataCpRedWeapon extends ItemSheetData<ItemDataCpRedWeapon> {
  weapon_types: { [key: string]: string };
  weapon_skills: { [key: string]: string };
  weapon_tags: { [key: string]: string };
}

export default class ItemSheetCpRedWeapon extends ItemSheetCpRed<ItemDataCpRedWeapon, ItemCpRed<ItemDataCpRedWeapon>> {
  private static actionHandlers: ActionHandlers<ItemSheetCpRedWeapon, WeaponAction> = {
    removeTag: async (sheet, _action, data) =>
      sheet.item.update({ "data.tags": sheet.item.data.data.tags.filter((tag) => tag !== data) }, null),
  };

  private static weapon_skill_list: { [key: string]: string } = {
    brawling: "Brawling",
    martial_arts: "Martial Arts",
    melee_weapon: "Melee Weapon",
    archery: "Archery",
    autofire: "Autofire",
    handgun: "Handgun",
    heavy_weapons: "Heavy Weapons",
    shoulder_arms: "Shoulder Arms",
  };

  private static weapon_type_list: { [key: string]: string } = {
    pistol: "Pistol",
    smg: "SMG",
    shotgun: "Shotgun",
    assault_rifle: "Assault Rifle",
    sniper_rifle: "Sniper Rifle",
    bow_crossbow: "Bow / Crossbow",
    grenade_launcher: "Grenade Launcher",
    rocket_launcher: "Rocket Launcher",
    melee_weapon: "Melee Weapon",
  };

  private static weapon_tag_list: { [key: string]: string } = {
    "": "Select tag to add",
    single_shot: "Single Shot",
    aimed_shot: "Aimed Shot",
    autofire: "Autofire",
    suppressive_fire: "Suppressive Fire",
    shotgun_shell: "Shotgun Shell",
    explosive: "Explosive",
    throwable: "Throwable",
    bayonet: "Bayonet",
    drum_magazine: "Drum Magazine",
    extended_magazine: "Extended Magazine",
    underbarrel_grenade_launcher: "Underbarrel Grenade Launcher",
    infrared_nightvision_scope: "Infrared Nightvision Scope",
    underbarrel_shotgun: "Underbarrel Shotgun",
    smargun_link: "Smartgun Link",
    sniping_scope: "Sniping Scope",
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
      weapon_skills: ItemSheetCpRedWeapon.weapon_skill_list,
      weapon_types: ItemSheetCpRedWeapon.weapon_type_list,
      weapon_tags: ItemSheetCpRedWeapon.weapon_tag_list,
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
