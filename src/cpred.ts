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
import CpRedDie from "./module/die";
import { registerSettings } from "./module/settings";
import { preloadTemplates } from "./module/templates";
export * from "./module/bootstrap/index.esm";

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

Handlebars.registerHelper("concat", (arg1: string, arg2: string) => {
  return arg1 + arg2;
});

/**
 * Adds the Cyperpunk RED critical success and failure dice rule as a dice
 * modifier to the standard Die class.
 */
function addCyberpunkDiceRule()
{
  // Definition of a dice roll result as returned by DiceTerm.roll.
  interface DiceTermResult {
    result: number,
    active: boolean,
    count?: number
  };

  (Die.prototype as any).cyberpunk = function(modifier: string) {
    const rgx = /(cp)?/;
    const match = modifier.match(rgx);
    if ( !match ) return this;

    let critSuccess : boolean = false;
    let critFailure : boolean = false;
    this.results.forEach((r: DiceTermResult) => {
      critSuccess = (r.result === this.faces) || critSuccess;
      critFailure = (r.result === 1) || critFailure;
    });

    if(critSuccess) {
      this.roll();
    }
    if(critFailure) {
      this.roll();
      let lastElement : DiceTermResult =
        <DiceTermResult>(this.results[this.results.length - 1]);
      lastElement.count = -1 * lastElement.result;
    }
  };
  (Die as any).MODIFIERS.cp = "cyberpunk";
}