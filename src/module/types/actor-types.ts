interface CommonTemplate {
  attributes: {
    hp: NumberResource;
    armor_body: NumberResource;
    armor_head: NumberResource;
  };
  details: {
    description: StringProp;
  };
}

interface StatsTemplate {
  stats: {
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

interface SubSkill {
  mandatory: boolean;
  name: string;
  hasLanguageItem: boolean;
  level: number;
}

interface Skill {
  group: string;
  stat: string;
  mandatory: boolean;
  costMultiplier: number;
  subSkills?: SubSkill[];
  level: number;
}

interface SkillsTemplate {
  skills: {
    [name: string]: Skill;
  };
}

interface IceTemplate {
  stats: {
    per: NumberProp;
    spd: NumberProp;
    atk: NumberProp;
    def: NumberProp;
  };
  attributes: {
    damage: StringProp;
    class: StringProp;
  };
  details: {
    effect: StringProp;
  };
}

declare type ActorDataCpRed = CommonTemplate;
declare type ActorDataCpRedCharacter = ActorDataCpRed & StatsTemplate & SkillsTemplate;
declare type ActorDataCpRedNpc = ActorDataCpRed & StatsTemplate & SkillsTemplate;
declare type ActorDataCpRedIce = ActorDataCpRed & IceTemplate;
