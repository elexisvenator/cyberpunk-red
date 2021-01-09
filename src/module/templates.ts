export const preloadTemplates = async function (): Promise<void> {
  const templatePaths: string[] = [
    // Add paths to "systems/cpred/templates"
    "partials/actor-resource.html",
    "partials/attribute-input.html",
    "partials/character-skills.html",
    "partials/weapon-listing.html",
  ];

  return loadTemplates(templatePaths.map(getFullTemplatePath));
};

export const getFullTemplatePath = function (relativePath: string): string {
  return `systems/cpred/templates/${relativePath}`;
};
