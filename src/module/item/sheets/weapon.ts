import { getFullTemplatePath } from "../../templates";
import { ItemCpRed } from "../../item/item";
import ItemSheetCpRed from "./base";

// This is the model that gets sent to the handlebars template. If you want
// to use some computed values, declare them here and populate them in getData().
declare interface ItemSheetDataCpRedWeapon extends ItemSheetData<ItemDataCpRedWeapon> {
  attributesblock: {
    name: string;
    value: number | string;
    datapath: string;
  }[];
  propertiesblock: {
    name: string;
    value: boolean;
    datapath: string;
  }[];
  attackblock: {
    name: string;
    attackroll: string;
    damageroll: string;
  }[];
  weapon_types: string[];
  combat_skills: string[];
}

export default class ItemSheetCpRedWeapon extends ItemSheetCpRed<ItemDataCpRedWeapon, ItemCpRed<ItemDataCpRedWeapon>> {
  get template() {
    return getFullTemplatePath("weapon-sheet.html");
  }

  get title() {
    return `${game.i18n.localize("cpred.sheet.weapon")}: ${this.item.name}`;
  }

static get defaultOptions() {
  return mergeObject(super.defaultOptions, {
    width: 560,
    height: 400,
    classes: ["cpred", "sheet", "item"],
    resizable: true,
    scrollY: [".tab.combat"],
    tabs: [{navSelector: ".tabs", contentSelector: ".sheet-body", initial: "detail"}]
  });
}

getData(): ItemSheetDataCpRedWeapon {
    const parentData = super.getData();
    const data = parentData.data;

    // Figure out what kind of attacks this weapon can perform
    let attacks = [];
    if(!data.properties.single_shot.value)
    {
      attacks.push({
        name: "cpred.sheet.weapon_actions.single_shot",
        attackroll: "1d10cp",
        damageroll: data.attributes.damage.value
      })
    }
    if(data.properties.autofire.value)
    {
      attacks.push({
        name: "cpred.sheet.weapon_actions.autofire",
        attackroll: "1d10cp",
        damageroll: "2d6",
      })
    }
    if(data.properties.suppressive_fire.value)
    {
      attacks.push({
        name: "cpred.sheet.weapon_actions.suppressive_fire",
        attackroll: "1d10cp",
        damageroll: "",
      })
    }
    if(data.properties.shotgun_shell.value)
    {
      attacks.push({
        name: "cpred.sheet.weapon_actions.shotgun_shell",
        attackroll: "1d10cp",
        damageroll: "3d6",
      })
    }
    if(data.properties.explosive.value)
    {
      attacks.push({
        name: "cpred.sheet.weapon_actions.explosive",
        attackroll: "1d10cp",
        damageroll: "6d6",
      })
    }

    return {
      ...parentData,
      attributesblock: [
        {
          name: "cpred.sheet.weapon_stats.damage",
          value: data.attributes.damage.value,
          datapath: "data.attributes.damage.value",
        },
        {
          name: "cpred.sheet.weapon_stats.rof",
          value: data.attributes.rof.value,
          datapath: "data.attributes.rof.value",
        },
        {
          name: "cpred.sheet.weapon_stats.skill",
          value: data.attributes.skill.value,
          datapath: "data.attributes.skill.value",
        },
        {
          name: "cpred.sheet.weapon_stats.hands",
          value: data.attributes.hands.value,
          datapath: "data.attributes.hands.value",
        },
        {
          name: "cpred.sheet.cost",
          value: data.attributes.cost.value,
          datapath: "data.attributes.cost.value",
        }
      ],
      propertiesblock: [
        {
          name: "cpred.sheet.weapon_stats.concealable",
          value: data.properties.concealable.value,
          datapath: "data.properties.concealable.value",
        },
        {
          name: "cpred.sheet.weapon_stats.single_shot",
          value: data.properties.single_shot.value,
          datapath: "data.properties.single_shot.value",
        },
        {
          name: "cpred.sheet.weapon_stats.autofire",
          value: data.properties.autofire.value,
          datapath: "data.properties.autofire.value",
        },
        {
          name: "cpred.sheet.weapon_stats.suppressive_fire",
          value: data.properties.suppressive_fire.value,
          datapath: "data.properties.suppressive_fire.value",
        },
        {
          name: "cpred.sheet.weapon_stats.shotgun_shell",
          value: data.properties.shotgun_shell.value,
          datapath: "data.properties.shotgun_shell.value",
        },
        {
          name: "cpred.sheet.weapon_stats.explosive",
          value: data.properties.explosive.value,
          datapath: "data.properties.explosive.value",
        },
      ],
      attackblock: attacks,
      combat_skills: [
        "brawling",
        "martial_arts",
        "melee_weapon",
        "archery",
        "autofire",
        "handgun",
        "heavy_weapons",
        "shoulder_arms"
      ],
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
