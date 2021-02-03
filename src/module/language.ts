import { Path } from "./types/dot-notation";
import enStrings from "../lang/en.json";

export type LanguageItem = typeof enStrings;

export function localize(path: Path<LanguageItem>): string {
  return game.i18n.localize(path);
}
