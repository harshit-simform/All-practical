// All declare types
export type Flags = {
  trigoFunction: boolean;
  inverseFunction: boolean;
  hyperFunction: boolean;
  radian: boolean;
  absFlag: boolean;
  functionToggle: boolean;
};

export type TrigoValue =
  | "Math.cosec"
  | "Math.sec"
  | "Math.cot"
  | typeof Math.sin
  | typeof Math.cos
  | typeof Math.tan;

export type InverseTrigoValue =
  | "Math.acosec"
  | "Math.asec"
  | "Math.acot"
  | typeof Math.sin
  | typeof Math.cos
  | typeof Math.tan;

export type HyperTrigoValue =
  | "Math.cosech"
  | "Math.sech"
  | "Math.coth"
  | typeof Math.sin
  | typeof Math.cos
  | typeof Math.tan;

export type TrigoObject = {
  [key: string]: string[];
  sin: string[];
  cos: string[];
  tan: string[];
  sec: string[];
  cot: string[];
  cosec: string[];
  hyp: string[];
};
