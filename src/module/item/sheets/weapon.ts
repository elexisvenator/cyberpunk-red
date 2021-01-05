import { getFullTemplatePath } from "../../templates";
import { ItemCpRed } from "../../item/item";
import ItemSheetCpRed from "./base";
import { LanguageItem, localize } from "../../language";
import { Path } from "../../types/dot-notation";

interface AttackBlock {
  name: Path<LanguageItem>;
  attackroll: string;
  damageroll: string;
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
  get template() {
    return getFullTemplatePath("weapon-sheet.html");
  }

  get title() {
    return `${localize("cpred.sheet.weapon")}: ${this.item.name}`;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 560,
      height: 400,
      classes: ["cpred", "sheet", "item"],
      resizable: true,
      scrollY: [".tab.combat"],
      tabs: [{ navSelector: ".tabs", contentSelector: ".sheet-body", initial: "detail" }],
    });
  }

  getData(): ItemSheetDataCpRedWeapon {
    const parentData = super.getData();
    const data = parentData.data;

    // Figure out what kind of attacks this weapon can perform
    let attacks: AttackBlock[] = [];
    if (!data.properties.single_shot.value) {
      attacks.push({
        name: "cpred.sheet.weapon_actions.single_shot",
        attackroll: "1d10cp",
        damageroll: data.attributes.damage.value,
      });
    }
    if (data.properties.autofire.value) {
      attacks.push({
        name: "cpred.sheet.weapon_actions.autofire",
        attackroll: "1d10cp",
        damageroll: "2d6",
      });
    }
    if (data.properties.suppressive_fire.value) {
      attacks.push({
        name: "cpred.sheet.weapon_actions.suppressive_fire",
        attackroll: "1d10cp",
        damageroll: "",
      });
    }
    if (data.properties.shotgun_shell.value) {
      attacks.push({
        name: "cpred.sheet.weapon_actions.shotgun_shell",
        attackroll: "1d10cp",
        damageroll: "3d6",
      });
    }
    if (data.properties.explosive.value) {
      attacks.push({
        name: "cpred.sheet.weapon_actions.explosive",
        attackroll: "1d10cp",
        damageroll: "6d6",
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
