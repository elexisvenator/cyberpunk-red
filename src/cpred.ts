/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your system, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 * 					you may want to put a (link to a) license or copyright
 * 					notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 * 					 determines how others may use and modify your system
 */

// Import TypeScript modules
import ActorSheetCpRedCharacter from "./module/actor/sheets/character";
import ActorSheetCpRedIce from "./module/actor/sheets/ice";
import ActorSheetCpRedNpc from "./module/actor/sheets/npc";
import ItemSheetCpRedAmmunition from "./module/item/sheets/ammunition";
import ItemSheetCpRedArmor from "./module/item/sheets/armor";
import ItemSheetCpRedCyberware from "./module/item/sheets/cyberware";
import ItemSheetCpRedEffect from "./module/item/sheets/effect";
import ItemSheetCpRedProgram from "./module/item/sheets/program";
import ItemSheetCpRedWeapon from "./module/item/sheets/weapon";
import { LanguageItem, localize } from "./module/language";
import { registerSettings } from "./module/settings";
import { preloadTemplates } from "./module/templates";
import { getValueByPath, Path } from "./module/types/dot-notation";

interface ActionGroup {
  name: string;
  formattedName: string;
  actions: {
    name: string;
    roll: string;
  }[];
}

interface ProgramGroup {
  actions: {
    name: string;
    roll: string;
  }[];
}

/* ------------------------------------ */
/* Initialize system					*/
/* ------------------------------------ */
Hooks.once("init", async function () {
  console.log("cpred | Initializing cpred");

  // Assign custom classes and constants here

  // Register custom system settings
  registerSettings();

  // Preload Handlebars templates
  await preloadTemplates();

  // Register custom sheets (if any)
  // Register Actor sheets
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("cpred", ActorSheetCpRedCharacter, {
    types: ["character"],
    makeDefault: true,
  });
  Actors.registerSheet("cpred", ActorSheetCpRedNpc, {
    types: ["npc"],
    makeDefault: true,
  });
  Actors.registerSheet("cpred", ActorSheetCpRedIce, {
    types: ["ice"],
    makeDefault: true,
  });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("cpred", ItemSheetCpRedWeapon, {
    types: ["weapon"],
    makeDefault: true,
  });
  Items.registerSheet("cpred", ItemSheetCpRedCyberware, {
    types: ["cyberwear"],
    makeDefault: true,
  });
  Items.registerSheet("cpred", ItemSheetCpRedProgram, {
    types: ["program"],
    makeDefault: true,
  });
  Items.registerSheet("cpred", ItemSheetCpRedArmor, {
    types: ["armor"],
    makeDefault: true,
  });
  Items.registerSheet("cpred", ItemSheetCpRedEffect, {
    types: ["effect"],
    makeDefault: true,
  });
  Items.registerSheet("cpred", ItemSheetCpRedAmmunition, {
    types: ["ammunition"],
    makeDefault: true,
  });
});

/* ------------------------------------ */
/* Setup system							*/
/* ------------------------------------ */
Hooks.once("setup", function () {
  // Do anything after initialization but before
  // ready

  addCyberpunkDiceRule();
});

/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
Hooks.once("ready", function () {
  // Do anything once the system is ready
});

// Add any additional hooks if necessary

Handlebars.registerHelper("join", (separator: string, ...strs) => {
  return strs.filter((str) => !(typeof str === "object" || str === null || str === undefined)).join(separator);
});

Handlebars.registerHelper("getByPath", function <T extends Record<string, unknown>>(context: T, path: Path<T>) {
  return getValueByPath(context, path);
});

Handlebars.registerHelper("isNthItem", function (options) {
  const index = options.data.index + 1;
  const nth = options.hash.nth;

  if (index % nth === 0) return options.fn(this);
  else return options.inverse(this);
});

Handlebars.registerHelper({
  eq: (v1, v2) => v1 === v2,
  ne: (v1, v2) => v1 !== v2,
  lt: (v1, v2) => v1 < v2,
  gt: (v1, v2) => v1 > v2,
  lte: (v1, v2) => v1 <= v2,
  gte: (v1, v2) => v1 >= v2,
  isnull: (v) => v == null,
  not: (v) => !v,
  renderIf: (condition, value) => (condition ? value : ""),
  add: (v1, v2) => v1 + v2,
  sub: (v1, v2) => v1 - v2,
});

/**
 * Generate a set of actions corresponding to the capabilities of the provided weapon item.
 */
Handlebars.registerHelper("weaponActions", function (item) {
  const weapon_data = new ItemSheetCpRedWeapon(item, null).item.data.data;

  const lookup = {
    single_shot: [
      {
        name: "cpred.sheet.common.attack",
        roll: `1d10cp + @stats.ref.value + @skills.${weapon_data.attributes.skill.value}.level`,
        type: "skillcheck",
      },
      {
        name: "cpred.sheet.common.damage",
        roll: weapon_data.attributes.damage.value,
        type: "damage",
      },
    ],
    aimed_shot: [
      {
        name: "cpred.sheet.common.attack",
        roll: `1d10cp + @stats.ref.value + @skills.${weapon_data.attributes.skill.value}.level - 8`,
        type: "skillcheck",
      },
      {
        name: "cpred.sheet.common.damage",
        roll: weapon_data.attributes.damage.value,
        type: "damage",
      },
    ],
    autofire: [
      {
        name: "cpred.sheet.common.attack",
        roll: `1d10cp + @stats.ref.value + @skills.autofire.level`,
        type: "skillcheck",
      },
      {
        name: "cpred.sheet.common.damage",
        roll: "2d6",
        type: "damage",
      },
    ],
    suppressive_fire: [
      {
        name: "cpred.sheet.common.attack",
        roll: `1d10cp + @stats.ref.value + @skills.autofire.level`,
        type: "skillcheck",
      },
    ],
    shotgun_shell: [
      {
        name: "cpred.sheet.common.attack",
        roll: `1d10cp + @stats.ref.value + @skills.${weapon_data.attributes.skill.value}.level`,
        type: "skillcheck",
      },
      {
        name: "cpred.sheet.common.damage",
        roll: "3d6",
        type: "damage",
      },
    ],
    throwable: [
      {
        name: "cpred.sheet.common.attack",
        roll: `1d10cp + @stats.dex.value + @skills.athletics.level`,
        type: "skillcheck",
      },
      {
        name: "cpred.sheet.common.damage",
        roll: weapon_data.attributes.damage.value,
        type: "damage",
      },
    ],
    bayonet: [
      {
        name: "cpred.sheet.common.attack",
        roll: `1d10cp + @stats.dex.value + @skills.melee_weapon.level`,
        type: "skillcheck",
      },
      {
        name: "cpred.sheet.common.damage",
        roll: "1d6",
        type: "damage",
      },
    ],
    underbarrel_grenade_launcher: [
      {
        name: "cpred.sheet.common.attack",
        roll: `1d10cp + @stats.ref.value + @skills.heavy_weapons.level`,
        type: "skillcheck",
      },
      {
        name: "cpred.sheet.common.damage",
        roll: "6d6",
        type: "damage",
      },
    ],
    underbarrel_shotgun: [
      {
        name: "cpred.sheet.common.attack",
        roll: `1d10cp + @stats.ref.value + @skills.shoulder_weapon.level`,
        type: "skillcheck",
      },
      {
        name: "cpred.sheet.common.damage",
        roll: "5d6",
        type: "damage",
      },
    ],
  };

  // Use the tag system to decide which actions exist
  const action_groups = weapon_data.tags
    .map((tag) => {
      const entry: ActionGroup = {
        name: tag,
        formattedName: localize(`cpred.sheet.weapon_tags.${tag}` as Path<LanguageItem>),
        actions: lookup[tag],
      };
      return tag in lookup ? entry : null;
    })
    .filter((entry) => entry !== null);

  return action_groups;
});

Handlebars.registerHelper("rollType", function (action) {
  if (action.type === "damage") {
    return "rollDamage";
  }
  else if(action.type === "skillcheck") {
    return "rollSkillcheck";
  }
  else {
    return "rollAction";
  }
})

Handlebars.registerHelper("programActions", function (item) {
  const programData = new ItemSheetCpRedProgram(item, null).item.data.data;

  const data: ProgramGroup = {
    actions: [],
  };

  if (programData.attributes.class.value === "attacker") {
    data.actions.push({
      name: "cpred.sheet.common.attack",
      roll: `1d10cp + @roles.netrunner.interface.value + ${programData.stats.atk.value}`,
    });
  }
  data.actions.push({
    name: "cpred.sheet.common.defend",
    roll: `1d10cp + ${programData.stats.def.value}`,
  });

  return data;
});

// useful debug util
Handlebars.registerHelper("json", function (context) {
  return JSON.stringify(context);
});

/**
 * Adds the Cyperpunk RED critical success and failure dice rule as a dice
 * modifier to the standard Die class.
 */
function addCyberpunkDiceRule() {
  Die.MODIFIERS.cp = function (modifier: string): void {
    const rgx = /(cp)?/;
    const match = modifier.match(rgx);
    if (!match) return this;

    const die = this as Die;

    let critSuccess = false;
    let critFailure = false;
    die.results.forEach((r: DiceTermResult) => {
      critSuccess = r.result === die.faces || critSuccess;
      critFailure = r.result === 1 || critFailure;
    });

    if (critSuccess) {
      die.roll();
    }
    if (critFailure) {
      die.roll();
      const lastElement = die.results[die.results.length - 1];
      lastElement.count = -1 * lastElement.result;
    }
  };
}
