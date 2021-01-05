import { Path } from "./types/dot-notation";
import { Root } from "./types/language-types";

export type LanguageItem = Root;

export function localize(path: Path<LanguageItem>): string {
  return game.i18n.localize(path);
}
