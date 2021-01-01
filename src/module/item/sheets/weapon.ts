import { getFullTemplatePath } from "../../templates";
import { ItemCpRed } from "../../item/item";
import ItemSheetCpRed from "./base";

// This is the model that gets sent to the handlebars template. If you want
// to use some computed values, declare them here and populate them in getData().
declare interface ItemSheetDataCpRedWeapon<DataType extends ItemDataCpRedWeapon = ItemDataCpRedWeapon> extends ItemSheetData<DataType> {
  statblock: {
    name: string;
    value: boolean | number | string;
    datapath: string;
  }[];
  attackblock: {
    name: string;
    attackroll: string;
    damageroll: string;
  }[];
  weapon_types: string[];
}

export default class ItemSheetCpRedWeapon<
  DataType extends ItemDataCpRedWeapon = ItemDataCpRedWeapon,
  ItemType extends ItemCpRed<DataType> = ItemCpRed<DataType>
> extends ItemSheetCpRed<DataType, ItemType> {
  get template() {
    console.log(this.item);
    return getFullTemplatePath("weapon-sheet.html");
  }

  get title() {
    return `${game.i18n.localize("cpred.sheet.weapon")}: ${this.item.name}`;
  }

  getData(): ItemSheetDataCpRedWeapon<DataType> {
    const parentData = super.getData();
    const data = parentData.data;

    // Figure out what kind of attacks this weapon can perform
    let attacks = [
      {
        name: "cpred.sheet.weapon_actions.singleshot",
        attackroll: "1d10cp",
        damageroll: "5d6",
      },
      {
        name: "cpred.sheet.weapon_actions.autofire",
        attackroll: "1d10cp",
        damageroll: "2d6",
      },
    ];

    return {
      ...parentData,
      statblock: [
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
          name: "cpred.sheet.weapon_stats.concealable",
          value: data.attributes.concealable.value,
          datapath: "data.attributes.concealable.value",
        },
        {
          name: "cpred.sheet.weapon_stats.autofire",
          value: data.attributes.autofire.value,
          datapath: "data.attributes.autofire.value",
        },
        {
          name: "cpred.sheet.weapon_stats.suppressive_fire",
          value: data.attributes.suppressive_fire.value,
          datapath: "data.attributes.suppressive_fire.value",
        },
        {
          name: "cpred.sheet.weapon_stats.shotgun_shell",
          value: data.attributes.shotgun_shell.value,
          datapath: "data.attributes.shotgun_shell.value",
        },
        {
          name: "cpred.sheet.weapon_stats.explosive",
          value: data.attributes.explosive.value,
          datapath: "data.attributes.explosive.value",
        },
      ],
      attackblock: attacks,
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
