export const preloadTemplates = async function (): Promise<void> {
  const templatePaths: string[] = [
    // Add paths to "systems/cpred/templates"
    "partials/skill/skill-row.html",
    "partials/skill/skill-with-subskill-row.html",
    "partials/actor-resource.html",
    "partials/attribute-input.html",
    "partials/character-combat-tab.html",
    "partials/character-description-tab.html",
    "partials/character-gear-tab.html",
    "partials/character-skills-tab.html",
    "partials/resource-display.html",
    "partials/weapon-listing.html",
    "partials/weapon-description-tab.html",
    "partials/weapon-combat-tab.html",
    "partials/weapon-attack.html",
  ];

  return loadTemplates(templatePaths.map(getFullTemplatePath));
};

export const getFullTemplatePath = function (relativePath: string): string {
  return `systems/cpred/templates/${relativePath}`;
};
