interface ActorResource extends NumberProp {
  max: number;
}

interface CommonTemplate {
  attributes: {
    hp: ActorResource;
  };
}

interface StatsTemplate {
  attributes: {
    int: NumberProp;
    ref: NumberProp;
    dex: NumberProp;
    tech: NumberProp;
    will: NumberProp;
    luck: ActorResource;
    move: NumberProp;
    body: NumberProp;
    emp: ActorResource;
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
}

declare type ActorDataCpRed = CommonTemplate;
declare type ActorDataCpRedCharacter = ActorDataCpRed & StatsTemplate;
declare type ActorDataCpRedNpc = ActorDataCpRed & StatsTemplate;
declare type ActorDataCpRedIce = ActorDataCpRed & IceTemplate;
