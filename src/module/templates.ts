export const preloadTemplates = async function (): Promise<void> {
  const templatePaths: string[] = [
    // Add paths to "systems/cpred/templates"
    "partials/actor-resource.html",
    "partials/attribute-checkbox.html",
    "partials/attribute-input.html",
    "partials/attribute-select.html",
    "partials/character-combat-tab.html",
    "partials/character-description-tab.html",
    "partials/character-gear-tab.html",
    "partials/character-skills-tab.html",
    "partials/npc-combat-tab.html",
    "partials/npc-skills-tab.html",
    "partials/program-action.html",
    "partials/resource-display.html",
    "partials/role-netrunner.html",
    "partials/roll-action.html",
    "partials/weapon-action.html",
    "partials/weapon-description-tab.html",
    "partials/weapon-combat-tab.html",
    "partials/weapon-listing.html",
  ];

  return loadTemplates(templatePaths.map(getFullTemplatePath));
};

export const getFullTemplatePath = function (relativePath: string): string {
  return `systems/cpred/templates/${relativePath}`;
};
