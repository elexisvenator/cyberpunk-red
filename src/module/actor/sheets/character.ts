import { getFullTemplatePath } from "../../templates";
import { ActorCpRed } from "../actor";
import ActorSheetCpRed, { ActorSheetDataCpRed } from "./base";
import { ItemCpRed } from "../../item/item";
import { ActionHandlers } from "../../entity";
import { LanguageItem, localize } from "../../language";
import { Path } from "../../types/dot-notation";

type CharacterAction = "remove-item";

interface SkillGroup {
  name: string;
  formattedName: string;
  skills: {
    name: string;
    formattedName: string;
    skill: Skill;
  }[];
}
interface ActorSheetDataCpRedCharacter extends ActorSheetDataCpRed<ActorDataCpRedCharacter> {
  gearblock: ItemCpRed[];
  skillGroups: SkillGroup[];
}

export default class ActorSheetCpRedCharacter extends ActorSheetCpRed<ActorDataCpRedCharacter, ActorCpRed<ActorDataCpRedCharacter>> {
  private static actionHandlers: ActionHandlers<ActorSheetCpRedCharacter, CharacterAction> = {
    "remove-item": (sheet, _action, value) => { sheet.actor.deleteOwnedItem(value); },
  };

  constructor(object: ActorCpRed<ActorDataCpRedCharacter>, options: FormApplicationOptions) {
    super(object, {
      ...options,
      actionHandlers: ActorSheetCpRedCharacter.actionHandlers,
    });
  }

  get template(): string {
    return getFullTemplatePath("character-sheet.html");
  }

  getData(): ActorSheetDataCpRedCharacter {
    const parentData = super.getData();

    const actor: ActorCpRed = this.actor;

    // Retrieve and sort all items the character owns
    const items: ItemCpRed[] = Array.from(actor.items.values());
    items.sort((a, b) => {
      return ("" + a.name).localeCompare(b.name);
    });

    // skills
    const skillArray = Object.keys(parentData.data.skills).map((skillName) => {
      return {
        name: skillName,
        formattedName: localize(`cpred.skills.${skillName}` as Path<LanguageItem>),
        skill: parentData.data.skills[skillName],
      };
    });
    //        .sort((a, b) => a.formattedName.localeCompare(b.formattedName));

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
}
