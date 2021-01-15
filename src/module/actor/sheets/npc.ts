import { getFullTemplatePath } from "../../templates";
import { ActorCpRed } from "../actor";
import ActorSheetCpRed, { ActorSheetDataCpRed } from "./base";
import { ItemCpRed } from "../../item/item";
import { ActionHandlers } from "../../entity";
import { LanguageItem, localize } from "../../language";
import { Path } from "../../types/dot-notation";
import { FormulaRollable } from "../../rollable";

type NpcAction = "removeItem" | "showItem" | "rollAction";

interface SkillGroup {
  name: string;
  formattedName: string;
  skills: {
    name: string;
    formattedName: string;
    skill: Skill;
    stat: {
      formattedName: string;
      value: number;
    };
  }[];
}
interface ActorSheetDataCpRedNpc extends ActorSheetDataCpRed<ActorDataCpRedNpc> {
  gearblock: ItemCpRed[];
  skillGroups: SkillGroup[];
}


export default class ActorSheetCpRedNpc extends ActorSheetCpRed<ActorDataCpRedNpc, ActorCpRed<ActorDataCpRedNpc>> {
  private static actionHandlers: ActionHandlers<ActorSheetCpRedNpc, NpcAction> = {
    // Gear interaction
    removeItem: (sheet, _action, value) => sheet.actor.deleteOwnedItem(value),
    showItem: (sheet, _action, value) => sheet.actor.getOwnedItem(value).sheet.render(true),
    rollAction: (sheet, _action, data) => new FormulaRollable(data, sheet.actor).roll(),
  }

  constructor(object: ActorCpRed<ActorDataCpRedCharacter>, options: FormApplicationOptions) {
    super(object, {
      ...options,
      actionHandlers: ActorSheetCpRedNpc.actionHandlers,
    });
  }

  static get defaultOptions(): FormApplicationOptions {
    const options = super.defaultOptions;
    mergeObject(options, {
      width: 500,
      height: 800,
      resizable: true,
      classes: ["cpred", "sheet", "npc"],
      scrollY: [".tab.description"],
      tabs: [{ navSelector: ".nav-tabs.primary-tabs", contentSelector: ".sheet-body", initial: "description" }],
    });
    return options;
  }

  get template(): string {
    return getFullTemplatePath("npc-sheet.html");
  }

  getData(): ActorSheetDataCpRedNpc {
    const parentData = super.getData();
    const data = parentData.data;
    const actor: ActorCpRed = this.actor;

    // Update derived attributes when retrieving data instead of when modifying underlyign data
    data.attributes.hp.max = 10 + 5 * Math.ceil((data.stats.body.value + data.stats.will.value) / 2.0);

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
}
