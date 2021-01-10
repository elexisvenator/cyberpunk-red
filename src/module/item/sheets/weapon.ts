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
    autofire_attack: (sheet) => {
      new FormulaRollable("1d10cp + @stats.ref.value + @skills.autofire.levels", sheet.item.actor).roll();
      sheet.deductBullets(10);
    },
    autofire_damage: (sheet) => new FormulaRollable("2d6", sheet.item.actor).roll(),
    shotgun_shell_attack: (sheet) => new FormulaRollable("1d10cp", sheet.item.actor).roll(),
    shotgun_shell_damage: (sheet) => new FormulaRollable("3d6", sheet.item.actor).roll(),
    explosive_attack: () => {},
    explosive_damage: (sheet) => new FormulaRollable("6d6", sheet.item.actor).roll(),
    single_shot_attack: (sheet) => {
      new FormulaRollable(
        "1d10cp + @stats.ref.value + @skills." + sheet.item.data.data.attributes.skill.value + ".levels",
        sheet.item.actor
      ).roll();
      sheet.deductBullets(1);
    },
    single_shot_damage: (sheet) => new FormulaRollable(sheet.item.data.data.attributes.damage.value, sheet.item.actor).roll(),
    suppressive_fire_attack: () => {},
    suppressive_fire_damage: () => {},
    reload: (sheet) => {
      sheet.item.update({ data: { attributes: { magazine: { value: sheet.item.data.data.attributes.magazine.max } } } }, null);
    },
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

  generateAttack(name: string): AttackBlock {
    return {
      name: `cpred.sheet.weapon_actions.${name}` as Path<LanguageItem>,
      action: name
    }
  }

  generateBlockEntry(category: string, name: string): BlockEntry {
    return {
      name: `cpred.sheet.weapon_stats.${name}` as Path<LanguageItem>,
      path: `${category}.${name}.value` as Path<ItemDataCpRedWeapon>
    }
  }

  getData(): ItemSheetDataCpRedWeapon {
    const parentData = super.getData();
    const data = parentData.data;

    // Figure out what kind of attacks this weapon can perform
    const attacks: AttackBlock[] = [];
    if(data.properties.aimed_shot.value) {
      attacks.push(this.generateAttack("aimed_shot"));
    }
    if (data.properties.single_shot.value) {
      attacks.push(this.generateAttack("single_shot"));
    }
    if (data.properties.autofire.value) {
      attacks.push(this.generateAttack("autofire"));
    }
    if (data.properties.suppressive_fire.value) {
      attacks.push(this.generateAttack("suppressive_fire"));
    }
    if (data.properties.shotgun_shell.value) {
      attacks.push(this.generateAttack("shotgun_shell"));
    }
    if (data.properties.explosive.value) {
      attacks.push(this.generateAttack("explosive"));
    }

    return {
      ...parentData,
      attributesblock: [
        this.generateBlockEntry("attributes", "damage"),
        this.generateBlockEntry("attributes", "rof"),
        this.generateBlockEntry("attributes", "skill"),
        this.generateBlockEntry("attributes", "hands"),
        this.generateBlockEntry("attributes", "reload_turns"),
        this.generateBlockEntry("attributes", "autofire_max"),
        this.generateBlockEntry("attributes", "cost"),
      ],
      propertiesblock: [
        this.generateBlockEntry("properties", "concealable"),
        this.generateBlockEntry("properties", "aimed_shot"),
        this.generateBlockEntry("properties", "single_shot"),
        this.generateBlockEntry("properties", "autofire"),
        this.generateBlockEntry("properties", "suppressive_fire"),
        this.generateBlockEntry("properties", "shotgun_shell"),
        this.generateBlockEntry("properties", "explosive"),
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

  deductBullets(amount: number) {
    const parentData = super.getData();
    const data = parentData.data;

    this.item.update({ data: { attributes: { magazine: { value: data.attributes.magazine.value - amount } } } }, null);
  }
}
