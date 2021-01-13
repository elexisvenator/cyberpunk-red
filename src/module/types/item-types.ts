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
    hands: NumberProp;
    reload_turns: NumberProp;
    autofire_max: NumberProp;
    magazine: NumberResource;
  };
  properties: {
    concealable: BooleanProp;
    single_shot: BooleanProp;
    autofire: BooleanProp;
    suppressive_fire: BooleanProp;
    shotgun_shell: BooleanProp;
    explosive: BooleanProp;
    aimed_shot: BooleanProp;
    reload_turns: NumberProp;
  };
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