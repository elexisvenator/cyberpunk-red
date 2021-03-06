import { ActorCpRed } from "./actor/actor";
import { ItemCpRed } from "./item/item";

export const registerSettings = function (): void {
  // Register any custom system settings here
  CONFIG.Actor.entityClass = ActorCpRed;
  CONFIG.Item.entityClass = ItemCpRed;
};
