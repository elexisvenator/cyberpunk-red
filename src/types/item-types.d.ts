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
    magazine: NumberResource;
    concealable: BooleanProp;
    autofire: BooleanProp;
    suppressive_fire: BooleanProp;
    shotgun_shell: BooleanProp;
    explosive: BooleanProp;
  };
}

declare type ItemDataCpRed = CommonItemTemplate;
declare type ItemDataCpRedWeapon = ItemDataCpRed & WeaponTemplate;