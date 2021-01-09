import { getFullTemplatePath } from "../../templates";
import { ItemCpRed } from "../../item/item";
import ItemSheetCpRed from "./base";
import { LanguageItem, localize } from "../../language";
import { Path } from "../../types/dot-notation";
import { FormulaRollable } from "../../rollable";
import { ActionHandlers } from "../../entity";

type WeaponAction =
  | "single_shot_attack"
  | "single_shot_damage"
  | "autofire_attack"
  | "autofire_damage"
  | "suppressive_fire_attack"
  | "suppressive_fire_damage"
  | "shotgun_shell_attack"
  | "shotgun_shell_damage"
  | "explosive_attack"
  | "explosive_damage"
  | "reload";

interface AttackBlock {
  name: Path<LanguageItem>;
  attackroll: string;
  damageroll: string;
  action: string;
}

// This is the model that gets sent to the handlebars template. If you want
// to use some computed values, declare them here and populate them in getData().

interface ItemSheetDataCpRedWeapon extends ItemSheetData<ItemDataCpRedWeapon> {
  attributesblock: {
    name: Path<LanguageItem>;
    path: Path<ItemDataCpRedWeapon>;
  }[];
  propertiesblock: {
    name: Path<LanguageItem>;
    path: Path<ItemDataCpRedWeapon>;
  }[];
  attackblock: AttackBlock[];
  weapon_types: string[];
  combat_skills: string[];
}

export default class ItemSheetCpRedWeapon extends ItemSheetCpRed<ItemDataCpRedWeapon, ItemCpRed<ItemDataCpRedWeapon>> {

  private static actionHandlers: ActionHandlers<ItemSheetCpRedWeapon, WeaponAction> = {
    autofire_attack: (sheet) => new FormulaRollable(
      "1d10cp + @attributes.ref.value + @skills.autofire.levels",
      sheet.item.actor
    ).roll(),
    autofire_damage: (sheet) => new FormulaRollable("2d6", sheet.item.actor).roll(),
    shotgun_shell_attack: (sheet) => new FormulaRollable("1d10cp", sheet.item.actor).roll(),
    shotgun_shell_damage: (sheet) => new FormulaRollable("3d6", sheet.item.actor).roll(),
    explosive_attack: () => {},
    explosive_damage: (sheet) => new FormulaRollable("6d6", sheet.item.actor).roll(),
    single_shot_attack: (sheet) => new FormulaRollable(
      "1d10cp + @attributes.ref.value + @skills." + sheet.item.data.data.attributes.skill.value + ".levels",
      sheet.item.actor
    ).roll(),
    single_shot_damage: ( sheet) => new FormulaRollable(
      sheet.item.data.data.attributes.damage.value,
      sheet.item.actor
    ).roll(),
    suppressive_fire_attack: () => {},
    suppressive_fire_damage: () => {},
    reload: () => {},
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
      tabs: [{ navSelector: ".tabs", contentSelector: ".sheet-body", initial: "detail" }],
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

    // Figure out what kind of attacks this weapon can perform
    const attacks: AttackBlock[] = [];
    if (data.properties.single_shot.value) {
      attacks.push({
        name: "cpred.sheet.weapon_actions.single_shot",
        attackroll: "1d10cp",
        damageroll: data.attributes.damage.value,
        action: "single_shot",
      });
    }
    if (data.properties.autofire.value) {
      attacks.push({
        name: "cpred.sheet.weapon_actions.autofire",
        attackroll: "1d10cp",
        damageroll: "2d6",
        action: "autofire",
      });
    }
    if (data.properties.suppressive_fire.value) {
      attacks.push({
        name: "cpred.sheet.weapon_actions.suppressive_fire",
        attackroll: "1d10cp",
        damageroll: "",
        action: "suppressive_fire",
      });
    }
    if (data.properties.shotgun_shell.value) {
      attacks.push({
        name: "cpred.sheet.weapon_actions.shotgun_shell",
        attackroll: "1d10cp",
        damageroll: "3d6",
        action: "shotgun_shell",
      });
    }
    if (data.properties.explosive.value) {
      attacks.push({
        name: "cpred.sheet.weapon_actions.explosive",
        attackroll: "1d10cp",
        damageroll: "6d6",
        action: "explosive",
      });
    }

    return {
      ...parentData,
      attributesblock: [
        {
          name: "cpred.sheet.weapon_stats.damage",
          path: "attributes.damage.value",
        },
        {
          name: "cpred.sheet.weapon_stats.rof",
          path: "attributes.rof.value",
        },
        {
          name: "cpred.sheet.weapon_stats.skill",
          path: "attributes.skill.value",
        },
        {
          name: "cpred.sheet.weapon_stats.hands",
          path: "attributes.hands.value",
        },
        {
          name: "cpred.sheet.cost",
          path: "attributes.cost.value",
        },
      ],
      propertiesblock: [
        {
          name: "cpred.sheet.weapon_stats.concealable",
          path: "properties.concealable.value",
        },
        {
          name: "cpred.sheet.weapon_stats.single_shot",
          path: "properties.single_shot.value",
        },
        {
          name: "cpred.sheet.weapon_stats.autofire",
          path: "properties.autofire.value",
        },
        {
          name: "cpred.sheet.weapon_stats.suppressive_fire",
          path: "properties.suppressive_fire.value",
        },
        {
          name: "cpred.sheet.weapon_stats.shotgun_shell",
          path: "properties.shotgun_shell.value",
        },
        {
          name: "cpred.sheet.weapon_stats.explosive",
          path: "properties.explosive.value",
        },
      ],
      attackblock: attacks,
      combat_skills: ["brawling", "martial_arts", "melee_weapon", "archery", "autofire", "handgun", "heavy_weapons", "shoulder_arms"],
      weapon_types: [
        "pistol",
        "smg",
        "shotgun",
        "assault_rifle",
        "sniper_rifle",
        "bow_crossbow",
        "grenade_launcher",
        "rocket_launcher",
        "melee_weapon",
      ],
    };
  }
}
