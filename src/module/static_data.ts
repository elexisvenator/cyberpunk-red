export const weaponSkillList: StringDictionary = {
  brawling: "Brawling",
  martial_arts: "Martial Arts",
  melee_weapon: "Melee Weapon",
  archery: "Archery",
  autofire: "Autofire",
  handgun: "Handgun",
  heavy_weapons: "Heavy Weapons",
  shoulder_arms: "Shoulder Arms",
};

export const weaponTypeList: StringDictionary = {
  pistol: "Pistol",
  smg: "SMG",
  shotgun: "Shotgun",
  assault_rifle: "Assault Rifle",
  sniper_rifle: "Sniper Rifle",
  bow_crossbow: "Bow / Crossbow",
  grenade_launcher: "Grenade Launcher",
  rocket_launcher: "Rocket Launcher",
  melee_weapon: "Melee Weapon",
};

export const weaponTagList: StringDictionary = {
  single_shot: "Single Shot",
  aimed_shot: "Aimed Shot",
  autofire: "Autofire",
  suppressive_fire: "Suppressive Fire",
  shotgun_shell: "Shotgun Shell",
  explosive: "Explosive",
  throwable: "Throwable",
  bayonet: "Bayonet",
  drum_magazine: "Drum Magazine",
  extended_magazine: "Extended Magazine",
  underbarrel_grenade_launcher: "Underbarrel Grenade Launcher",
  infrared_nightvision_scope: "Infrared Nightvision Scope",
  underbarrel_shotgun: "Underbarrel Shotgun",
  smargun_link: "Smartgun Link",
  sniping_scope: "Sniping Scope",
};

export const ammunitionTypes: StringDictionary = {
  medium_pistol: "Medium Pistol",
  heavy_pistol: "Heavy Pistol",
  very_heavy_pistol: "Very Heavy Pistol",
  slug: "Slug",
  shotgun_shell: "Shotgun Shell",
  rifle: "Rifle",
  arrow: "Arrow",
  grenade: "Grenade",
  rocket: "Rocket",
};

export const effectStatList: StringDictionary = {
  "": "cpred.sheet.labels.add_stat_modifier",
  atk: "cpred.sheet.stats.atk",
  def: "cpred.sheet.stats.def",
  rez: "cpred.sheet.stats.rez",
  int: "cpred.sheet.stats.int",
  ref: "cpred.sheet.stats.ref",
  dex: "cpred.sheet.stats.dex",
  tech: "cpred.sheet.stats.tech",
  cool: "cpred.sheet.stats.cool",
  will: "cpred.sheet.stats.will",
  luck: "cpred.sheet.stats.luck",
  move: "cpred.sheet.stats.move",
  body: "cpred.sheet.stats.body",
  emp: "cpred.sheet.stats.emp",
};

export const effectSkillList: StringDictionary = {
  accounting: "cpred.skills.accounting",
  acting: "cpred.skills.acting",
  air_vehicle_tech: "cpred.skills.air_vehicle_tech",
  animal_handling: "cpred.skills.animal_handling",
  archery: "cpred.skills.archery",
  athletics: "cpred.skills.athletics",
  autofire: "cpred.skills.autofire",
  basic_tech: "cpred.skills.basic_tech",
  brawling: "cpred.skills.brawling",
};

export const cyberwareTypeLists: StringDictionary = {
  fashionware: "Fashionware",
  neuralware: "Neuralware",
  cyberoptics: "Cyberoptics",
  cyberaudio: "Cyberaudio",
  internal_body: "Internal Body Cyberware",
  external_body: "External Body Cyberware",
  cyberlimbs: "Cyberlimbs",
  borgware: "Borgware",
};

export const cyberwareFoundationList: StringDictionary = {
  na: "N/A",
  cyberarm: "Cyberarm",
  cyberaudio_suite: "Cyberaudio Suite",
  cybereye: "Cybereye",
  cyberleg: "Cyberleg",
  neural_link: "Neural Link",
};

export const cyberwareInstallList: StringDictionary = {
  na: "N/A",
  mall: "Mall",
  clinic: "Clinic",
  hospital: "Hospital",
};

export const armorTypeList: StringDictionary = {
  leathers: "cpred.sheet.armor_types.leathers",
  kevlar: "cpred.sheet.armor_types.kevlar",
  light_armorjack: "cpred.sheet.armor_types.light_armorjack",
  bodyweight_suit: "cpred.sheet.armor_types.bodyweight_suit",
  medium_armorjack: "cpred.sheet.armor_types.medium_armorjack",
  heavy_armorjack: "cpred.sheet.armor_types.heavy_armorjack",
  flak: "cpred.sheet.armor_types.flak",
  metalgear: "cpred.sheet.armor_types.metalgear",
};

export const armorLocationList: StringDictionary = {
  body: "cpred.sheet.armor_locations.body",
  head: "cpred.sheet.armor_locations.head",
};

export const ammunitionTypeList: StringDictionary = {
  "medium_pistol": "cpred.sheet.ammunition_size_types.medium_pistol",
  "heavy_pistol": "cpred.sheet.ammunition_size_types.heavy_pistol",
  "very_heavy_pistol": "cpred.sheet.ammunition_size_types.very_heavy_pistol",
  "slug": "cpred.sheet.ammunition_size_types.slug",
  "rifle": "cpred.sheet.ammunition_size_types.rifle",
  "shotgun_shell": "cpred.sheet.ammunition_size_types.shotgun_shell",
  "arrow": "cpred.sheet.ammunition_size_types.arrow",
  "grenade": "cpred.sheet.ammunition_size_types.grenade",
  "rocket": "cpred.sheet.ammunition_size_types.rocket"
};

export const characterDamageSources: StringDictionary = {
  fullArmor: "cpred.sheet.labels.full_armor",
  halfArmor: "cpred.sheet.labels.half_armor",
  bypassArmor: "cpred.sheet.labels.bypass_armor",
};

export interface ModifierEntry {
  label: string;
  modifier: number;
  active: boolean;
};

export const characterModifierList: Dictionary<ModifierEntry> = {
  serious_injury: {label: "serious_injury", modifier: -2, active: false},
  mortal_injury: {label: "mortal_injury", modifier: -4, active: false},
  under_stress: {label: "under_stress", modifier: -2, active: false},
  never_done_before: {label: "never_done_before", modifier: -1, active: false},
  low_light: {label: "low_light", modifier: -1, active: false},
  obscured_vision: {label: "obscured_vision", modifier: -4, active: false},
  complex_task: {label: "complex_task", modifier: -2, active: false},
  wrong_tools: {label: "wrong_tools", modifier: -2, active: false},
  drunk_drugged: {label: "drunk_drugged", modifier: -4, active: false},
  attempting_secretly: {label: "attempting_secretly", modifier: -4, active: false},
  lost_facedown: {label: "lost_facedown", modifier: -2, active: false},
  spend_extra_time: {label: "spend_extra_time", modifier: 1, active: false}
};
