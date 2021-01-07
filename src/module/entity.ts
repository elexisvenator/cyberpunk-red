export type ActionHandlers<EntitySheet, Key extends string> = Record<Key, ((sheet: EntitySheet, action: string) => void) | null>;

export interface CpRedSheetOptions<EntitySheet> extends FormApplicationOptions {
  actionHandlers?: ActionHandlers<EntitySheet, string>;
}
