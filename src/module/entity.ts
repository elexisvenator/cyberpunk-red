export type ActionHandlers<EntitySheet, Key extends string | undefined> = Record<
  Key,
  ((sheet: EntitySheet, action: string, value: string) => Promise<void | unknown>) | null
>;

export interface CpRedSheetOptions<EntitySheet> extends FormApplicationOptions {
  actionHandlers?: ActionHandlers<EntitySheet, string>;
}
