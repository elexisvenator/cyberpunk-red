// Generated using https://transform.tools/json-to-typescript
// Source file is en.json
// This file should be generated every time you add to en.json

export interface Root {
  cpred: Cpred
}

export interface Cpred {
  sheet: Sheet
  tab: Tab
  skillGroups: SkillGroups
  skills: Skills
  subSkills: SubSkills
}

export interface Sheet {
  bullets: string
  magazine: string
  character: string
  cyberware: string
  npc: string
  ice: string
  program: string
  weapon: string
  name: string
  current: string
  max: string
  rez: string
  damage: string
  attack: string
  defend: string
  price: string
  cost: string
  description: string
  slots: string
  effect: string
  weapon_type: string
  combat_skill: string
  reload: string
  health: string
  luck: string
  labels: Labels
  common: Common
  stats: Stats
  roles: Roles
  role_abilities: RoleAbilities
  role_actions: RoleActions
  iceactions: Iceactions
  selecticeclass: string
  iceclasses: Iceclasses
  weapon_actions: WeaponActions
  select_weapon_type: string
  select_weapon_skill: string
  weapon_types: WeaponTypes
  weapon_stats: WeaponStats
  weaponTags: WeaponTags
  ammunitionTypes: AmmunitionTypes
  cyberware_stats: CyberwareStats
  program_types: ProgramTypes
  armor_types: ArmorTypes
  armor_locations: ArmorLocations
  ammunition_size_types: AmmunitionSizeTypes
  modifiers: Modifiers
}

export interface Labels {
  armor_body: string
  armor_head: string
  program_type: string
  armor_type: string
  role_actions: string
  weapons: string
  programs: string
  skills: string
  armor: string
  stopping_power: string
  cost: string
  description: string
  effect: string
  add_stat_modifier: string
  full_armor: string
  half_armor: string
  bypass_armor: string
  ammunition: string
  ammunition_size_type: string
  count: string
  modifiers: string
  money: string
  improvement_points: string
  death_save_penalty: string
}

export interface Common {
  attack: string
  defend: string
  damage: string
}

export interface Stats {
  perception: string
  speed: string
  attack: string
  defence: string
  atk: string
  def: string
  rez: string
  int: string
  ref: string
  dex: string
  tech: string
  cool: string
  will: string
  luck: string
  move: string
  body: string
  emp: string
}

export interface Roles {
  rockerboy: string
  solo: string
  netrunner: string
  tech: string
  medtech: string
  media: string
  exec: string
  lawman: string
  fixer: string
  nomad: string
}

export interface RoleAbilities {
  charismatic_impact: string
  combat_awareness: string
  interface: string
  maker: string
  field_expertise: string
  upgrade_expertise: string
  fabrication_expertise: string
  invention_expertise: string
  medicine: string
  surgery: string
  pharmaceuticals: string
  cryosystem_operation: string
  credibility: string
  teamwork: string
  backup: string
  operator: string
  moto: string
}

export interface RoleActions {
  jack_in_out: string
  activate_deactivate_program: string
  scanner: string
  backdoor: string
  cloak: string
  control: string
  eye_dee: string
  pathfinder: string
  slide: string
  virus: string
  zap_attack: string
  zap_damage: string
  impact_single_fan: string
  impact_small_group: string
  impact_huge_group: string
  call_backup: string
  backup_turns: string
  haggle: string
}

export interface Iceactions {
  blockslide: string
  ambush: string
  attack: string
  defend: string
}

export interface Iceclasses {
  antipersonnel: string
  antiprogram: string
}

export interface WeaponActions {
  aimed_shot: string
  single_shot: string
  autofire: string
  suppressive_fire: string
  shotgun_shell: string
  explosive: string
  damage: string
}

export interface WeaponTypes {
  pistol: string
  smg: string
  shotgun: string
  assault_rifle: string
  sniper_rifle: string
  bow_crossbow: string
  grenade_launcher: string
  rocket_launcher: string
  melee_weapon: string
}

export interface WeaponStats {
  damage: string
  rof: string
  type: string
  skill: string
  hands_required: string
  reload_turns: string
  autofire_max: string
  ammunition_type: string
  magazine: string
  is_ranged: string
  is_concealable: string
}

export interface WeaponTags {
  single_shot: string
  aimed_shot: string
  autofire: string
  suppressive_fire: string
  shotgun_shell: string
  explosive: string
  throwable: string
  bayonet: string
  drum_magazine: string
  extended_magazine: string
  underbarrel_grenade_launcher: string
  infrared_nightvision_scope: string
  underbarrel_shotgun: string
  smargun_link: string
  sniping_scope: string
}

export interface AmmunitionTypes {
  medium_pistol: string
  heavy_pistol: string
  very_heavy_pistol: string
  slug: string
  shotgun_shell: string
  rifle: string
  arrow: string
  grenade: string
  rocket: string
}

export interface CyberwareStats {
  foundation: string
  type: string
  install: string
  slots: string
  humanity_loss: string
  humanity_loss_roll: string
  humanity_loss_creation: string
}

export interface ProgramTypes {
  booster: string
  defender: string
  attacker: string
}

export interface ArmorTypes {
  leathers: string
  kevlar: string
  light_armorjack: string
  bodyweight_suit: string
  medium_armorjack: string
  heavy_armorjack: string
  flak: string
  metalgear: string
}

export interface ArmorLocations {
  body: string
  head: string
}

export interface AmmunitionSizeTypes {
  medium_pistol: string
  heavy_pistol: string
  very_heavy_pistol: string
  slug: string
  rifle: string
  shotgun_shell: string
  arrow: string
  grenade: string
  rocket: string
}

export interface Modifiers {
  serious_injury: string
  mortal_injury: string
  under_stress: string
  never_done_before: string
  low_light: string
  obscured_vision: string
  complex_task: string
  wrong_tools: string
  drunk_drugged: string
  attempting_secretly: string
  lost_facedown: string
  spend_extra_time: string
}

export interface Tab {
  description: string
  combat: string
}

export interface SkillGroups {
  awareness: string
  body: string
  control: string
  education: string
  fighting: string
  performance: string
  ranged: string
  social: string
  technique: string
}

export interface Skills {
  accounting: string
  acting: string
  air_vehicle_tech: string
  animal_handling: string
  archery: string
  athletics: string
  autofire: string
  basic_tech: string
  brawling: string
  bribery: string
  bureaucracy: string
  business: string
  composition: string
  conceal_object: string
  concentration: string
  contortionist: string
  conversation: string
  criminology: string
  cryptography: string
  cybertech: string
  dance: string
  deduction: string
  demolitions: string
  drive_air: string
  drive_land: string
  drive_sea: string
  education: string
  electronics_security_tech: string
  endurance: string
  evasion: string
  first_aid: string
  forgery: string
  gamble: string
  handgun: string
  heavy_weapons: string
  human_perception: string
  interrogation: string
  land_vehicle_tech: string
  language: string
  library_search: string
  lip_reading: string
  local_expert: string
  martial_arts: string
  melee_weapon: string
  paint_draw_sculpt: string
  paramedic: string
  perception: string
  personal_grooming: string
  persuasion: string
  photography_film: string
  pick_lock: string
  pick_pocket: string
  play_instrument: string
  resist_torture: string
  riding: string
  science: string
  sea_vehicle_tech: string
  shoulder_arms: string
  stealth: string
  streetwise: string
  tactics: string
  tracking: string
  trading: string
  wardrobe: string
  weaponstech: string
  wilderness: string
}

export interface SubSkills {
  streetslang: string
  yourHome: string
}
