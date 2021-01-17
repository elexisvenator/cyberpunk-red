interface Modifier {
  path: string;
  offset: number;
  source: string;
}

interface CommonItemTemplate {
  attributes: {
    cost: NumberProp;
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
    hands_required: NumberProp;
    reload_turns: NumberProp;
    autofire_max: NumberProp;
    magazine: NumberResource;
    is_ranged: BooleanProp;
    is_concealable: BooleanProp;
  };
  tags: string[];
}

interface CyberwareTemplate {
  attributes: {
    type: StringProp;
    foundation: StringProp;
    install: StringProp;
    slots: NumberProp;
    humanity_loss: NumberProp;
    humanity_loss_roll: StringProp;
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
    sp: NumberResource;
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