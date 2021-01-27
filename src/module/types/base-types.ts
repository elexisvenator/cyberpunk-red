interface NumberProp {
  value: number;
}

interface StringProp {
  value: string;
}

interface BooleanProp {
  value: boolean;
}

interface NumberResource extends NumberProp {
  max: number;
}

interface Dictionary<T> {
  [key: string]: T
};

declare type StringDictionary = Dictionary<string>;
