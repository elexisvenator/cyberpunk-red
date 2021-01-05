interface CommonTemplate {
  attributes: {
    hp: NumberResource;
  };
  details: {
    description: StringProp;
  };
}

interface StatsTemplate {
  attributes: {
    int: NumberProp;
    ref: NumberProp;
    dex: NumberProp;
    tech: NumberProp;
    will: NumberProp;
    luck: NumberResource;
    move: NumberProp;
    body: NumberProp;
    emp: NumberResource;
  };
}

interface IceTemplate {
  attributes: {
    per: NumberProp;
    spd: NumberProp;
    atk: NumberProp;
    def: NumberProp;
    damage: StringProp;
    class: StringProp;
  };
  details: {
    effect: StringProp;
  };
}

declare type ActorDataCpRed = CommonTemplate;
declare type ActorDataCpRedCharacter = ActorDataCpRed & StatsTemplate;
declare type ActorDataCpRedNpc = ActorDataCpRed & StatsTemplate;
declare type ActorDataCpRedIce = ActorDataCpRed & IceTemplate;
