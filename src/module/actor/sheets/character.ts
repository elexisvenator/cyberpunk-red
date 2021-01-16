import { getFullTemplatePath } from "../../templates";
import { ActorCpRed } from "../actor";
import ActorSheetCpRed, { ActorSheetDataCpRed } from "./base";
import ItemSheetCpRedWeapon from "../../item/sheets/weapon";
import { ItemCpRed } from "../../item/item";
import { ActionHandlers } from "../../entity";
import { LanguageItem, localize } from "../../language";
import { Path } from "../../types/dot-notation";

type CharacterAction = "remove-item" | "show-item" | "single_shot_attack" | "add-subskill" | "remove-subskill";

interface SkillGroup {
  name: string;
  formattedName: string;
  skills: {
    name: string;
    formattedName: string;
    skill: Skill;
    hasBlankSubSkill: boolean;
    stat: {
      formattedName: string;
      value: number;
    };
  }[];
}
interface ActorSheetDataCpRedCharacter extends ActorSheetDataCpRed<ActorDataCpRedCharacter> {
  gearblock: ItemCpRed[];
  skillGroups: SkillGroup[];
}

export default class ActorSheetCpRedCharacter extends ActorSheetCpRed<ActorDataCpRedCharacter, ActorCpRed<ActorDataCpRedCharacter>> {
  private static actionHandlers: ActionHandlers<ActorSheetCpRedCharacter, CharacterAction> = {
    // Gear interaction
    "remove-item": (sheet, _action, value) => sheet.actor.deleteOwnedItem(value),
    "show-item": async (sheet, _action, value) => sheet.actor.getOwnedItem(value).sheet.render(true),
    // Weapon attacks
    single_shot_attack: async (sheet, action, value) => {
      const item_sheet = sheet.actor.getOwnedItem(value).sheet as ItemSheetCpRedWeapon;
      item_sheet.actionHandlers[action](item_sheet, action, value);
    },
    "add-subskill": (sheet, _action, value) => sheet.addSubSkill(value),
    "remove-subskill": (sheet, _action, value) => sheet.removeSubSkill(value),
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

  getData(): ActorSheetDataCpRedCharacter {
    const parentData = super.getData();
    const data = parentData.data;
    const actor: ActorCpRed = this.actor;

    // Retrieve and sort all items the character owns
    const items: ItemCpRed[] = Array.from(actor.items.values());
    items.sort((a, b) => {
      return ("" + a.name).localeCompare(b.name);
    });

    const stats = Object.fromEntries(
      Object.entries(data.stats).map(([key, stat]) => [
        key,
        { formattedName: localize(`cpred.sheet.stats.${key}` as Path<LanguageItem>), value: stat.value },
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

    return {
      ...parentData,
      gearblock: items,
      skillGroups: skillGroups,
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
}
