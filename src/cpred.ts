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
  
  // Register the CpRedDie in the system and force VTT to use it over the
  // Die class when the "denomination", i.e. number of faces, is 10.
  CONFIG.Dice.types.push(CpRedDie)
  CONFIG.Dice.terms["10"] = CpRedDie
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
