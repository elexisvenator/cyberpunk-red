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