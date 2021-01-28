interface Modifier {
  path: string;
  offset: number;
  source: string;
}

interface CommonItemTemplate {
  attributes: {
    cost: NumberProp;
    isEquipped: BooleanProp;
  };
  details: {
    description: StringProp;
  };
  modifiers: { [i: number]: Modifier };
}

interface WeaponTemplate {
  attributes: {
    damage: StringProp;
    rof: NumberProp;
    type: StringProp;
    skill: StringProp;
    handsRequired: NumberProp;
    turnsToReload: NumberProp;
    autofireMaxEffect: NumberProp;
    magazine: NumberResource;
    ammunitionTypes: string[];
    loadedAmmunition: StringProp;
    isRanged: BooleanProp;
    isConcealable: BooleanProp;
  };
  tags: string[];
}

interface AmmunitionTemplate {
  attributes: {
    count: NumberProp;
    type: StringProp;
  };
  details: {
    effect: StringProp;
  };
}

interface CyberwareTemplate {
  attributes: {
    type: StringProp;
    foundation: StringProp;
    install: StringProp;
    slots: NumberProp;
    humanityLoss: NumberProp;
    humanityLossRoll: StringProp;
    humanityLossCreation: NumberProp;
  }
}

interface ProgramTemplate {
  stats: {
    atk: NumberProp;
    def: NumberProp;
    rez: NumberResource;
  },
  attributes: {
    damage: StringProp;
    class: StringProp;
    slots: NumberProp;
  }
  details: {
    effect: StringProp;
  }
}

interface ArmorTemplate {
  attributes: {
    stoppingPower: NumberResource;
    type: StringProp;
    location: StringProp;
  }
}


declare type ItemDataCpRed = CommonItemTemplate;
declare type ItemDataCpRedWeapon = ItemDataCpRed & WeaponTemplate;
declare type ItemDataCpRedCyberware = ItemDataCpRed & CyberwareTemplate;
declare type ItemDataCpRedProgram = ItemDataCpRed & ProgramTemplate;
declare type ItemDataCpRedArmor = ItemDataCpRed & ArmorTemplate;
declare type ItemDataCpRedEffect = ItemDataCpRed;
declare type ItemDataCpRedAmmunition = ItemDataCpRed & AmmunitionTemplate;