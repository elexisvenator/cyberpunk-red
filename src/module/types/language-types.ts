// Generated using https://transform.tools/json-to-typescript
// Source file is en.json
// This file should be generated every time you add to en.json

export interface Root {
  cpred: Cpred;
}

export interface Cpred {
  sheet: Sheet;
  tab: Tab;
  skills: Skills;
}

export interface Sheet {
  bullets: string;
  magazine: string;
  character: string;
  npc: string;
  ice: string;
  weapon: string;
  name: string;
  current: string;
  max: string;
  rez: string;
  damage: string;
  price: string;
  cost: string;
  description: string;
  effect: string;
  weapon_type: string;
  combat_skill: string;
  stats: Stats;
  iceactions: Iceactions;
  selecticeclass: string;
  iceclasses: Iceclasses;
  weapon_actions: WeaponActions;
  select_weapon_type: string;
  select_weapon_skill: string;
  weapon_types: WeaponTypes;
  weapon_stats: WeaponStats;
}

export interface Stats {
  perception: string;
  speed: string;
  attack: string;
  defence: string;
}

export interface Iceactions {
  blockslide: string;
  ambush: string;
  attack: string;
  defend: string;
}

export interface Iceclasses {
  antipersonnel: string;
  antiprogram: string;
}

export interface WeaponActions {
  single_shot: string;
  autofire: string;
  suppressive_fire: string;
  shotgun_shell: string;
  explosive: string;
  damage: string;
}

export interface WeaponTypes {
  pistol: string;
  smg: string;
  shotgun: string;
  assault_rifle: string;
  sniper_rifle: string;
  bow_crossbow: string;
  grenade_launcher: string;
  rocket_launcher: string;
  melee_weapon: string;
}

export interface WeaponStats {
  rof: string;
  damage: string;
  type: string;
  skill: string;
  hands: string;
  magazine: string;
  concealable: string;
  single_shot: string;
  autofire: string;
  suppressive_fire: string;
  shotgun_shell: string;
  explosive: string;
}

export interface Tab {
  description: string;
  combat: string;
}

export interface Skills {
  brawling: string;
  martial_arts: string;
  melee_weapon: string;
  archery: string;
  autofire: string;
  handgun: string;
  heavy_weapons: string;
  shoulder_arms: string;
}
