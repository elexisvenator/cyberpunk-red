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
  weaponType: string
  combatSkill: string
  reload: string
  health: string
  luck: string
  labels: Labels
  common: Common
  stats: Stats
  roles: Roles
  roleAbilities: RoleAbilities
  roleActions: RoleActions
  iceactions: Iceactions
  selecticeclass: string
  iceclasses: Iceclasses
  weaponActions: WeaponActions
  selectWeaponType: string
  selectWeaponSkill: string
  weaponTypes: WeaponTypes
  weaponStats: WeaponStats
  weaponTags: WeaponTags
  ammunitionTypes: AmmunitionTypes
  cyberwareStats: CyberwareStats
  programTypes: ProgramTypes
  armorTypes: ArmorTypes
  armorLocations: ArmorLocations
  ammunitionSizeTypes: AmmunitionSizeTypes
  modifiers: Modifiers
}

export interface Labels {
  armorBody: string
  armorHead: string
  programType: string
  armorType: string
  roleActions: string
  weapons: string
  programs: string
  skills: string
  armor: string
  stoppingPower: string
  cost: string
  description: string
  effect: string
  addStatModifier: string
  fullArmor: string
  halfArmor: string
  bypassArmor: string
  ammunition: string
  ammunitionSizeType: string
  count: string
  modifiers: string
  money: string
  improvementPoints: string
  deathSavePenalty: string
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
  charismaticImpact: string
  combatAwareness: string
  interface: string
  maker: string
  fieldExpertise: string
  upgradeExpertise: string
  fabricationExpertise: string
  inventionExpertise: string
  medicine: string
  surgery: string
  pharmaceuticals: string
  cryosystemOperation: string
  credibility: string
  teamwork: string
  backup: string
  operator: string
  moto: string
}

export interface RoleActions {
  jackInOut: string
  activateDeactivateProgram: string
  scanner: string
  backdoor: string
  cloak: string
  control: string
  eyeDee: string
  pathfinder: string
  slide: string
  virus: string
  zapAttack: string
  zapDamage: string
  impactSingleFan: string
  impactSmallGroup: string
  impactHugeGroup: string
  callBackup: string
  backupTurns: string
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
  aimedShot: string
  singleShot: string
  autofire: string
  suppressiveFire: string
  shotgunShell: string
  explosive: string
  damage: string
}

export interface WeaponTypes {
  pistol: string
  smg: string
  shotgun: string
  assaultRifle: string
  sniperRifle: string
  bowCrossbow: string
  grenadeLauncher: string
  rocketLauncher: string
  meleeWeapon: string
}

export interface WeaponStats {
  damage: string
  rof: string
  type: string
  skill: string
  handsRequired: string
  turnsToReload: string
  autofireMaxEffect: string
  ammunitionType: string
  magazine: string
  isRanged: string
  isConcealable: string
}

export interface WeaponTags {
  singleShot: string
  aimedShot: string
  autofire: string
  suppressiveFire: string
  shotgunShell: string
  explosive: string
  throwable: string
  bayonet: string
  drumMagazine: string
  extendedMagazine: string
  underbarrelGrenadeLauncher: string
  infraredNightvisionScope: string
  underbarrelShotgun: string
  smargunLink: string
  snipingScope: string
}

export interface AmmunitionTypes {
  mediumPistol: string
  heavyPistol: string
  veryHeavyPistol: string
  slug: string
  shotgunShell: string
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
  humanityLoss: string
  humanityLossRoll: string
  humanityLossCreation: string
}

export interface ProgramTypes {
  booster: string
  defender: string
  attacker: string
}

export interface ArmorTypes {
  leathers: string
  kevlar: string
  lightArmorjack: string
  bodyweightSuit: string
  mediumArmorjack: string
  heavyArmorjack: string
  flak: string
  metalgear: string
}

export interface ArmorLocations {
  body: string
  head: string
}

export interface AmmunitionSizeTypes {
  mediumPistol: string
  heavyPistol: string
  veryHeavyPistol: string
  slug: string
  rifle: string
  shotgunShell: string
  arrow: string
  grenade: string
  rocket: string
}

export interface Modifiers {
  seriousInjury: string
  mortalInjury: string
  underStress: string
  neverDoneBefore: string
  lowLight: string
  obscuredVision: string
  complexTask: string
  wrongTools: string
  drunkDrugged: string
  attemptingSecretly: string
  lostFacedown: string
  spendExtraTime: string
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
  airVehicleTech: string
  animalHandling: string
  archery: string
  athletics: string
  autofire: string
  basicTech: string
  brawling: string
  bribery: string
  bureaucracy: string
  business: string
  composition: string
  concealObject: string
  concentration: string
  contortionist: string
  conversation: string
  criminology: string
  cryptography: string
  cybertech: string
  dance: string
  deduction: string
  demolitions: string
  driveAir: string
  driveLand: string
  driveSea: string
  education: string
  electronicsSecurityTech: string
  endurance: string
  evasion: string
  firstAid: string
  forgery: string
  gamble: string
  handgun: string
  heavyWeapons: string
  humanPerception: string
  interrogation: string
  landVehicleTech: string
  language: string
  librarySearch: string
  lipReading: string
  localExpert: string
  martialArts: string
  meleeWeapon: string
  paintDrawSculpt: string
  paramedic: string
  perception: string
  personalGrooming: string
  persuasion: string
  photographyFilm: string
  pickLock: string
  pickPocket: string
  playInstrument: string
  resistTorture: string
  riding: string
  science: string
  seaVehicleTech: string
  shoulderArms: string
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
