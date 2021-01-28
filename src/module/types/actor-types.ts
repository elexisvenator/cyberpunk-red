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

interface CharacterTemplate {
  attributes: {
    humanity: NumberResource;
    money: NumberProp;
    deathSavePenalty: NumberProp;
    improvementPoints: NumberProp;
  };
};

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
  subSkills?: { [i: number]: SubSkill | null };
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

interface RolesTemplate {
  rockerboy: {
    charismatic_impact: NumberProp;
  };
  solo: {
    combat_awareness: NumberProp;
  };
  netrunner: {
    interface: NumberProp;
  };
  tech: {
    maker: NumberProp;
    field_expertise: NumberProp;
    upgrade_expertise: NumberProp;
    fabrication_expertise: NumberProp;
    invention_expertise: NumberProp;
  };
  medtech: {
    medicine: NumberProp;
    surgery: NumberProp;
    pharmaceuticals: NumberProp;
    cryosystem_operation: NumberProp;
  };
  media: {
    credibility: NumberProp;
  };
  exec: {
    teamwork: NumberProp;
  };
  lawman: {
    backup: NumberProp;
  };
  fixer: {
    operator: NumberProp;
  };
  nomad: {
    moto: NumberProp;
  };
}

declare type ActorDataCpRed = CommonTemplate;
declare type ActorDataCpRedCharacter = ActorDataCpRed & CharacterTemplate & StatsTemplate & SkillsTemplate & RolesTemplate;
declare type ActorDataCpRedNpc = ActorDataCpRed & StatsTemplate & SkillsTemplate & RolesTemplate;
declare type ActorDataCpRedIce = ActorDataCpRed & IceTemplate;
