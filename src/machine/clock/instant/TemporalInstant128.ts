declare const temporalInstant128Brand: unique symbol;

export type TemporalInstant128 = bigint & {
  readonly [temporalInstant128Brand]: "TemporalInstant128";
};
