import { getFullTemplatePath } from "../../templates";
import { ItemCpRed } from "../../item/item";
import ItemSheetCpRed from "./base";
import { LanguageItem, localize } from "../../language";
import { Path } from "../../types/dot-notation";
import { FormulaRollable } from "../../rollable";
import { ActionHandlers } from "../../entity";

type WeaponAction = "remove_tag";
  // | "aimed_shot_attack"
  // | "aimed_shot_damage"
  // | "single_shot_attack"
  // | "single_shot_damage"
  // | "autofire_attack"
  // | "autofire_damage"
  // | "suppressive_fire_attack"
  // | "suppressive_fire_damage"
  // | "shotgun_shell_attack"
  // | "shotgun_shell_damage"
  // | "explosive_attack"
  // | "explosive_damage"
  // | "reload";



// This is the model that gets sent to the handlebars template. If you want
// to use some computed values, declare them here and populate them in getData().

interface ItemSheetDataCpRedWeapon extends ItemSheetData<ItemDataCpRedWeapon> {
  weapon_types: {[key: string]: string};
  weapon_skills: {[key: string]: string};
  weapon_tags: {[key: string]: string};
}

export default class ItemSheetCpRedWeapon extends ItemSheetCpRed<ItemDataCpRedWeapon, ItemCpRed<ItemDataCpRedWeapon>> {
  private static actionHandlers: ActionHandlers<ItemSheetCpRedWeapon, WeaponAction> = {
    // autofire_attack: (sheet) => {
    //   new FormulaRollable("1d10cp + @stats.ref.value + @skills.autofire.levels", sheet.item.actor).roll();
    //   sheet.deductBullets(10);
    // },
    // autofire_damage: (sheet) => new FormulaRollable("2d6", sheet.item.actor).roll(),
    // shotgun_shell_attack: (sheet) => {
    //   new FormulaRollable("1d10cp + @stats.ref.value + @skills." + sheet.item.data.data.attributes.skill.value + ".levels", sheet.item.actor).roll();
    //   sheet.deductBullets(1);
    // },
    // shotgun_shell_damage: (sheet) => new FormulaRollable("3d6", sheet.item.actor).roll(),
    // explosive_attack: () => {},
    // explosive_damage: (sheet) => new FormulaRollable("6d6", sheet.item.actor).roll(),
    // aimed_shot_attack: (sheet) => {
    //   new FormulaRollable("1d10cp + @stats.ref.value + @skills." + sheet.item.data.data.attributes.skill.value + ".levels - 8", sheet.item.actor).roll();
    //   sheet.deductBullets(1);
    // },
    // aimed_shot_damage: ( sheet) => new FormulaRollable(sheet.item.data.data.attributes.damage.value, sheet.item.actor).roll(),
    // single_shot_attack: (sheet) => {
    //   new FormulaRollable("1d10cp + @stats.ref.value + @skills." + sheet.item.data.data.attributes.skill.value + ".levels", sheet.item.actor).roll();
    //   sheet.deductBullets(1);
    // },
    // single_shot_damage: (sheet) => new FormulaRollable(sheet.item.data.data.attributes.damage.value, sheet.item.actor).roll(),
    // suppressive_fire_attack: (sheet) => {
    //   new FormulaRollable("1d10cp + @stats.ref.value + @skills.autofire.levels", sheet.item.actor).roll();
    //   sheet.deductBullets(10);
    // },
    // suppressive_fire_damage: () => {},
    // reload: (sheet) => sheet.item.update({"data.attributes.magazine.value": sheet.item.data.data.attributes.magazine.max}, null),
    remove_tag: (sheet, _action, data) => {
      const tags = sheet.item.data.data.tags.filter(tag => tag !== data);
      sheet.item.update({"data.tags": tags}, null);
    }
  };

  private static weapon_skill_list: {[key: string]: string} = {
    "brawling": "Brawling",
    "martial_arts": "Martial Arts",
    "melee_weapon": "Melee Weapon",
    "archery": "Archery",
    "autofire": "Autofire",
    "handgun": "Handgun",
    "heavy_weapons": "Heavy Weapons",
    "shoulder_arms": "Shoulder Arms"
  };

  private static weapon_type_list: {[key: string]: string} = {
    "pistol": "Pistol",
    "smg": "SMG",
    "shotgun": "Shotgun",
    "assault_rifle": "Assault Rifle",
    "sniper_rifle": "Sniper Rifle",
    "bow_crossbow": "Bow / Crossbow",
    "grenade_launcher": "Grenade Launcher",
    "rocket_launcher": "Rocket Launcher",
    "melee_weapon": "Melee Weapon",
  };

  private static weapon_tag_list: {[key: string]: string} = {
    "": "Select tag to add",
    "single_shot": "Single Shot",
    "aimed_shot": "Aimed Shot",
    "autofire": "Autofire",
    "suppressive_fire": "Suppressive Fire",
    "shotgun_shell": "Shotgun Shell",
    "explosive": "Explosive",
    "throwable": "Throwable",
    "bayonet": "Bayonet",
    "drum_magazine": "Drum Magazine",
    "extended_magazine": "Extended Magazine",
    "underbarrel_grenade_launcher": "Underbarrel Grenade Launcher",
    "infrared_nightvision_scope": "Infrared Nightvision Scope",
    "underbarrel_shotgun": "Underbarrel Shotgun",
    "smargun_link": "Smartgun Link",
    "sniping_scope": "Sniping Scope"
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

  getData(): ItemSheetDataCpRedWeapon {
    const parentData = super.getData();
    const data = parentData.data;

    return {
      ...parentData,
      weapon_skills: ItemSheetCpRedWeapon.weapon_skill_list,
      weapon_types: ItemSheetCpRedWeapon.weapon_type_list,
      weapon_tags: ItemSheetCpRedWeapon.weapon_tag_list
    };
  }

  protected activateListeners(html: JQuery): void {
    super.activateListeners(html);

    // Disable combat tab for unowned or owned by a different actor weapons
    // if (!this.actor || !this.actor.owner) {
    //   html.find("[data-tab]").addClass("disabled");
    // }

    const parentData = super.getData();
    const data = parentData.data;

    html.find("#tag-selector").on("change", (ev) => {
      ev.preventDefault();

      const tag = ev.currentTarget.selectedOptions[0].value;
      let new_tags:string[] = data.tags;
      if (tag !== "" && !data.tags.includes(tag)) {
        new_tags.push(tag);
      }
      //this.update();
      this.item.update({"data.tags": new_tags}, null);
    });

  }

  deductBullets(amount: number) {
    const parentData = super.getData();
    const data = parentData.data;

    this.item.update({"data.attributes.magazine.value": data.attributes.magazine.value - amount}, null);
  }
}
