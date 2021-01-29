export const weaponSkillList: StringDictionary = {
  brawling: "Brawling",
  martialArts: "Martial Arts",
  meleeWeapon: "Melee Weapon",
  archery: "Archery",
  autofire: "Autofire",
  handgun: "Handgun",
  heavyWeapons: "Heavy Weapons",
  shoulderArms: "Shoulder Arms",
};

export const weaponTypeList: StringDictionary = {
  pistol: "Pistol",
  smg: "SMG",
  shotgun: "Shotgun",
  assaultRifle: "Assault Rifle",
  sniperRifle: "Sniper Rifle",
  bowCrossbow: "Bow / Crossbow",
  grenadeLauncher: "Grenade Launcher",
  rocketLauncher: "Rocket Launcher",
  meleeWeapon: "Melee Weapon",
};

export const weaponTagList: StringDictionary = {
  singleShot: "Single Shot",
  aimedShot: "Aimed Shot",
  autofire: "Autofire",
  suppressiveFire: "Suppressive Fire",
  shotgunShell: "Shotgun Shell",
  explosive: "Explosive",
  throwable: "Throwable",
  bayonet: "Bayonet",
  drumMagazine: "Drum Magazine",
  extendedMagazine: "Extended Magazine",
  underbarrelGrenadeLauncher: "Underbarrel Grenade Launcher",
  infraredNightvisionScope: "Infrared Nightvision Scope",
  underbarrelShotgun: "Underbarrel Shotgun",
  smargunLink: "Smartgun Link",
  snipingScope: "Sniping Scope",
};

export const ammunitionTypes: StringDictionary = {
  mediumPistol: "Medium Pistol",
  heavyPistol: "Heavy Pistol",
  veryHeavyPistol: "Very Heavy Pistol",
  slug: "Slug",
  shotgunShell: "Shotgun Shell",
  rifle: "Rifle",
  arrow: "Arrow",
  grenade: "Grenade",
  rocket: "Rocket",
};

export const effectStatList: StringDictionary = {
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
  airVehicleTech: "cpred.skills.airVehicleTech",
  animalHandling: "cpred.skills.animalHandling",
  archery: "cpred.skills.archery",
  athletics: "cpred.skills.athletics",
  autofire: "cpred.skills.autofire",
  basicTech: "cpred.skills.basicTech",
  brawling: "cpred.skills.brawling",
};

export const cyberwareTypeLists: StringDictionary = {
  fashionware: "Fashionware",
  neuralware: "Neuralware",
  cyberoptics: "Cyberoptics",
  cyberaudio: "Cyberaudio",
  internalBody: "Internal Body Cyberware",
  externalBody: "External Body Cyberware",
  cyberlimbs: "Cyberlimbs",
  borgware: "Borgware",
};

export const cyberwareFoundationList: StringDictionary = {
  na: "N/A",
  cyberarm: "Cyberarm",
  cyberaudioSuite: "Cyberaudio Suite",
  cybereye: "Cybereye",
  cyberleg: "Cyberleg",
  neuralLink: "Neural Link",
};

export const cyberwareInstallList: StringDictionary = {
  na: "N/A",
  mall: "Mall",
  clinic: "Clinic",
  hospital: "Hospital",
};

export const armorTypeList: StringDictionary = {
  leathers: "cpred.sheet.armorTypes.leathers",
  kevlar: "cpred.sheet.armorTypes.kevlar",
  lightArmorjack: "cpred.sheet.armorTypes.lightArmorjack",
  bodyweightSuit: "cpred.sheet.armorTypes.bodyweightSuit",
  mediumArmorjack: "cpred.sheet.armorTypes.mediumArmorjack",
  heavyArmorjack: "cpred.sheet.armorTypes.heavyArmorjack",
  flak: "cpred.sheet.armorTypes.flak",
  metalgear: "cpred.sheet.armorTypes.metalgear",
};

export const armorLocationList: StringDictionary = {
  body: "cpred.sheet.armorLocations.body",
  head: "cpred.sheet.armorLocations.head",
};

export const ammunitionTypeList: StringDictionary = {
  mediumPistol: "cpred.sheet.ammunitionSizeTypes.mediumPistol",
  heavyPistol: "cpred.sheet.ammunitionSizeTypes.heavyPistol",
  veryHeavyPistol: "cpred.sheet.ammunitionSizeTypes.veryHeavyPistol",
  slug: "cpred.sheet.ammunitionSizeTypes.slug",
  rifle: "cpred.sheet.ammunitionSizeTypes.rifle",
  shotgunShell: "cpred.sheet.ammunitionSizeTypes.shotgunShell",
  arrow: "cpred.sheet.ammunitionSizeTypes.arrow",
  grenade: "cpred.sheet.ammunitionSizeTypes.grenade",
  rocket: "cpred.sheet.ammunitionSizeTypes.rocket",
};

export const characterDamageSources: StringDictionary = {
  fullArmor: "cpred.sheet.labels.fullArmor",
  halfArmor: "cpred.sheet.labels.halfArmor",
  bypassArmor: "cpred.sheet.labels.bypassArmor",
};

export interface ModifierEntry {
  label: string;
  modifier: number;
  active: boolean;
}

export const characterModifierList: Dictionary<ModifierEntry> = {
  seriousInjury: { label: "seriousInjury", modifier: -2, active: false },
  mortalInjury: { label: "mortalInjury", modifier: -4, active: false },
  underStress: { label: "underStress", modifier: -2, active: false },
  neverDoneBefore: { label: "neverDoneBefore", modifier: -1, active: false },
  lowLight: { label: "lowLight", modifier: -1, active: false },
  obscuredVision: { label: "obscuredVision", modifier: -4, active: false },
  complexTask: { label: "complexTask", modifier: -2, active: false },
  wrongTools: { label: "wrongTools", modifier: -2, active: false },
  drunkDrugged: { label: "drunkDrugged", modifier: -4, active: false },
  attemptingSecretly: { label: "attemptingSecretly", modifier: -4, active: false },
  lostFacedown: { label: "lostFacedown", modifier: -2, active: false },
  spendExtraTime: { label: "spendExtraTime", modifier: 1, active: false },
};
