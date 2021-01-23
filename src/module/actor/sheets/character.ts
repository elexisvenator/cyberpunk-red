import { getFullTemplatePath } from "../../templates";
import { ActorCpRed } from "../actor";
import ActorSheetCpRed, { ActorSheetDataCpRed } from "./base";
import { ItemCpRed } from "../../item/item";
import { ActionHandlers } from "../../entity";
import { LanguageItem, localize } from "../../language";
import { Path } from "../../types/dot-notation";
import { FormulaRollable } from "../../rollable";
import { Cpred } from "../../types/language-types";

type CharacterAction = "removeItem" | "showItem" | "rollAction" | "rollDamage" | "rollSkillcheck" |
  "addSubSkill" | "removeSubSkill" | "equipToggle" | "applyDamage" | "toggleModifier";

interface SkillBlock {
  name: string;
  formattedName: string;
  skill: Skill;
  hasBlankSubSkill: boolean;
  stat: {
    name: string;
    formattedName: string;
    value: number;
  };
}

interface SkillGroup {
  name: string;
  formattedName: string;
  skills: SkillBlock[];
}

interface ModifierBlock {
  path: string;
  offset: number;
}

interface ModifierEntry {
  label: string;
  modifier: number;
  active: boolean;
};

interface ActorSheetDataCpRedCharacter extends ActorSheetDataCpRed<ActorDataCpRedCharacter> {
  gearBlock: ItemCpRed[];
  skillGroups: SkillGroup[];
  trainedSkills: SkillBlock[];
  modifierBlock: ModifierBlock[];
  damageSources: { [key: string]: string; };
  modifierList: { [key: string]: ModifierEntry; };
}


export default class ActorSheetCpRedCharacter extends ActorSheetCpRed<ActorDataCpRedCharacter, ActorCpRed<ActorDataCpRedCharacter>> {
  private static actionHandlers: ActionHandlers<ActorSheetCpRedCharacter, CharacterAction> = {
    // Gear interaction
    removeItem: (sheet, _action, value) => sheet.actor.deleteOwnedItem(value),
    showItem: async (sheet, _action, value) => sheet.actor.getOwnedItem(value).sheet.render(true),
    rollAction: async (sheet, _action, value) => new FormulaRollable(value, sheet.actor).roll(),
    rollDamage: async (sheet, _action, value) => new FormulaRollable(value, sheet.actor, null, true).roll(),
    rollSkillcheck: async (sheet, _action, value) => new FormulaRollable(value, sheet.actor, null, false).roll(),
    addSubSkill: (sheet, _action, value) => sheet.addSubSkill(value),
    removeSubSkill: (sheet, _action, value) => sheet.removeSubSkill(value),
    equipToggle: (sheet, _action, value) => sheet.equipToggle(value),
    applyDamage: (sheet, _action, _value) => sheet.applyDamage(),
    toggleModifier: (sheet, _action, value) => sheet.toggleModifier(value),
  };

  private static damageSources: { [key: string]: string } = {
    fullArmor: "cpred.sheet.labels.full_armor",
    halfArmor: "cpred.sheet.labels.half_armor",
    bypassArmor: "cpred.sheet.labels.bypass_armor",
  };

  private static modifierList: { [key: string]: ModifierEntry } = {
    serious_injury: {label: "serious_injury", modifier: -2, active: false},
    mortal_injury: {label: "mortal_injury", modifier: -4, active: false},
    under_stress: {label: "under_stress", modifier: -2, active: false},
    never_done_before: {label: "never_done_before", modifier: -1, active: false},
    low_light: {label: "low_light", modifier: -1, active: false},
    obscured_vision: {label: "obscured_vision", modifier: -4, active: false},
    complex_task: {label: "complex_task", modifier: -2, active: false},
    wrong_tools: {label: "wrong_tools", modifier: -2, active: false},
    drunk_drugged: {label: "drunk_drugged", modifier: -4, active: false},
    attempting_secretly: {label: "attempting_secretly", modifier: -4, active: false},
    lost_facedown: {label: "lost_facedown", modifier: -2, active: false},
    spend_extra_time: {label: "spend_extra_time", modifier: 1, active: false}
  };

  constructor(object: ActorCpRed<ActorDataCpRedCharacter>, options: FormApplicationOptions) {
    super(object, {
      ...options,
      actionHandlers: ActorSheetCpRedCharacter.actionHandlers,
    });
  }

  static get defaultOptions(): FormApplicationOptions {
    const options = super.defaultOptions;
    mergeObject(options, {
      width: 500,
      height: 800,
      resizable: true,
      classes: ["cpred", "sheet", "character"],
      scrollY: [".tab.description"],
      tabs: [{ navSelector: ".nav-tabs.primary-tabs", contentSelector: ".sheet-body", initial: "description" }],
    });
    return options;
  }

  get template(): string {
    return getFullTemplatePath("character-sheet.html");
  }

  getData(options?: unknown): ActorSheetDataCpRedCharacter {
    const parentData = super.getData(options);
    const data = parentData.data;
    const actor: ActorCpRed = this.actor;

    // Update derived attributes when retrieving data instead of when modifying underlyign data
    data.attributes.hp.max = 10 + 5 * Math.ceil((data.stats.body.value + data.stats.will.value) / 2.0);

    const armorData = this._getArmor();
    data.attributes.armor_body = armorData.armor_body;
    data.attributes.armor_head = armorData.armor_head;

    // Retrieve and sort all items the character owns
    const items: ItemCpRed[] = Array.from(actor.items.values());
    items.sort((a, b) => {
      return ("" + a.name).localeCompare(b.name);
    });

    const stats = Object.fromEntries(
      Object.entries(data.stats).map(([key, stat]) => [
        key,
        {
          name: key,
          formattedName: localize(`cpred.sheet.stats.${key}` as Path<LanguageItem>),
          value: stat.value,
        },
      ])
    );

    // Skills
    const skillArray = Object.keys(data.skills).map((skillName) => {
      return {
        name: skillName,
        formattedName: localize(`cpred.skills.${skillName}` as Path<LanguageItem>),
        skill: data.skills[skillName],
        stat: stats[data.skills[skillName].stat],
        hasBlankSubSkill: Object.values(data.skills[skillName].subSkills ?? {}).some((e) => e != null && e.name.length == 0),
      };
    });

    const groupNames = skillArray.reduce((acc, cur) => acc.add(cur.skill.group), new Set<string>());
    const skillGroups = Array.from(groupNames)
      .map((groupName) => {
        const result: SkillGroup = {
          name: groupName,
          formattedName: localize(`cpred.skillGroups.${groupName}` as Path<LanguageItem>),
          skills: skillArray
            .filter((skill) => skill.skill.group == groupName)
            .sort((a, b) => a.formattedName.localeCompare(b.formattedName)),
        };
        return result;
      })
      .sort((a, b) => a.formattedName.localeCompare(b.formattedName));

    // Aggregate all modifiers
    const modifierList = parentData.items
      .map((item) => item.data.modifiers)
      .filter((item) => item !== undefined)
      .map((item) => Object.values(item))
      .flat();
    const accumulatedModifiers: { [key: string]: ModifierBlock } = {};
    for (const mod of modifierList as Array<ModifierBlock>) {
      if (!(mod.path in accumulatedModifiers)) {
        accumulatedModifiers[mod.path] = {
          path: mod.path,
          offset: 0,
        };
      }
      accumulatedModifiers[mod.path].offset += mod.offset;
    }
    const modifierBlock = Object.values(accumulatedModifiers) as ModifierBlock[];

    // Global modifier list for the combat tab
    const effectNames = parentData.items
      .filter((item) => item.type === "effect") 
      .map((item) => item.name);
    const modifierList2 = {};
    Object.values(ActorSheetCpRedCharacter.modifierList)
      .forEach((mod) => {
        modifierList2[mod.label] = mod;
        modifierList2[mod.label].active = effectNames.includes(`cpred.sheet.modifiers.${mod.label}`);
      });

    return {
      ...parentData,
      gearBlock: items,
      skillGroups: skillGroups,
      trainedSkills: skillArray.filter((skill) => skill.skill.level > 0).sort((a, b) => a.formattedName.localeCompare(b.formattedName)),
      modifierBlock: modifierBlock,
      damageSources: ActorSheetCpRedCharacter.damageSources,
      modifierList: modifierList2,
    };
  }

  public async addSubSkill(skill: string): Promise<void> {
    const formData = this.getData();
    if (!(skill in formData.actor.data.skills)) {
      throw new Error(`Cannot add subSkill to unknown skill ${skill}`);
    }

    const skillObj = formData.actor.data.skills[skill];
    if (skillObj.subSkills == null) {
      throw new Error(`Cannot add subSkill to skill ${skill} - subSkill not supported for this skill`);
    }

    if (Object.values(skillObj.subSkills).some((e) => e != null && e.name.length == 0)) {
      throw new Error(`Cannot add subSkill to skill ${skill} - there is already an empty subskill`);
    }

    const subSkillArray = Object.keys(skillObj.subSkills)
      .map((k) => +k)
      .sort()
      .map((k) => skillObj.subSkills[k]);

    // remove a null element if it exists
    if (subSkillArray.length > 0 && subSkillArray[subSkillArray.length - 1] == null) {
      subSkillArray.pop();
    }

    subSkillArray.push({
      hasLanguageItem: false,
      level: 0,
      mandatory: false,
      name: "",
    });

    const updatedData = {};
    updatedData[`data.skills.${skill}.subSkills`] = subSkillArray.reduce((agg, cur, index) => {
      agg[index + ""] = cur;
      return agg;
    }, {});

    await this.actor.update(updatedData);
  }

  public async removeSubSkill(subSkillRef: string): Promise<void> {
    const skillRef = subSkillRef.split(".", 1)[0];
    const subSkillIndex = +subSkillRef.slice(skillRef.length + 1);
    const formData = this.getData();

    if (!(skillRef in formData.actor.data.skills)) {
      throw new Error(`Cannot remove subSkill from unknown skill ${skillRef}`);
    }

    const skillObj = formData.actor.data.skills[skillRef];
    if (skillObj.subSkills == null) {
      throw new Error(`Cannot remove subSkill from skill ${skillRef} - subSkill not supported for this skill`);
    }

    const subSkillArray = Object.keys(skillObj.subSkills)
      .map((k) => +k)
      .sort()
      .map((k) => skillObj.subSkills[k]);

    subSkillArray.splice(subSkillIndex, 1);
    subSkillArray.push(null);

    const updatedData = {};
    updatedData[`data.skills.${skillRef}.subSkills`] = subSkillArray.reduce((agg, cur, index) => {
      agg[index + ""] = cur;
      return agg;
    }, {});

    await this.actor.update(updatedData);
  }

  public async equipToggle(itemId: string): Promise<void> {
    const item = this.actor.items.get(itemId);
    if (item === undefined) {
      // FIXME: is return in async ok?
      return;
    }

    await item.update(
      {"data.attributes.is_equipped.value": !item.data.data.attributes.is_equipped.value},
      null
    );
  }

  public async applyDamage(): Promise<void> {
    const parentData = this.getData();
    const data = parentData.data;
    const damage = Number((this.form.querySelector("#damageAmount") as HTMLFormElement).value);
    const armorTreatment = (this.form.querySelector("#armorTreatment") as HTMLFormElement).value;

    console.log(damage);

    let finalDamage = damage;
    let armorDamage = 0;
    if (armorTreatment == "fullArmor") {
      const armorValue = data.attributes.armor_body.value;
      if (armorValue < finalDamage) {
        finalDamage -= armorValue;
        armorDamage = 1;
      } else {
        finalDamage = 0;
      }
    }
    else if (armorTreatment == "halfArmor") {
      const armorValue = Math.floor(data.attributes.armor_body.value / 2);
      if (armorValue < finalDamage) {
        finalDamage -= armorValue;
        armorDamage = 1;
      } else {
        finalDamage = 0;
      }
    }

    // Update character hitpoints
    await this.actor.update({"data.attributes.hp.value": data.attributes.hp.value - finalDamage});

    // Ablate all equipped armor
    parentData.items
      .map((item) => item)
      .filter((item) => item.type === "armor")
      .filter((item) => item.data.attributes.is_equipped.value === true)
      .forEach(async (item) => {
        const ownedItem = this.actor.items.get(item._id, {strict: true});
        await ownedItem.update({"data.attributes.sp.value": item.data.attributes.sp.value - armorDamage}, {});
      });
  }

  public async toggleModifier(modifier: string): Promise<void> {
    const effectList = this._getEffects();
    const effectNames = effectList.map((item) => item.name);
    const modifierPath = `cpred.sheet.modifiers.${modifier}`;

    if (effectNames.includes(modifierPath)) {
      effectList.forEach(async (effect) => {
        if (effect.name == modifierPath) {
          await this.actor.deleteOwnedItem(effect._id);
        }
      })
    }
    else {
      await this.actor.createOwnedItem({
        name: modifierPath,
        type: "effect",
        data: { modifiers: {"0": {"path": "global.roll", "offset": ActorSheetCpRedCharacter.modifierList[modifier].modifier}}}
      });
    }
  }
}
