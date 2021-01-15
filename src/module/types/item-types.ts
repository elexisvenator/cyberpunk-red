interface CommonItemTemplate {
  attributes: {
    cost: NumberProp;
  };
  details: {
    description: StringProp;
  };
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

declare type ItemDataCpRed = CommonItemTemplate;
declare type ItemDataCpRedWeapon = ItemDataCpRed & WeaponTemplate;
declare type ItemDataCpRedCyberware = ItemDataCpRed & CyberwareTemplate;