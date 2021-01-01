import { ActorCpRed, ItemCpRed } from "./actor/entity";

export const registerSettings = function() {
	// Register any custom system settings here
	CONFIG.Actor.entityClass = ActorCpRed;
  CONFIG.Item.entityClass = ItemCpRed;
}
