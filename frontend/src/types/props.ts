export type ModelProps<T> = {
  model: T;
};

export type ClassProps<T = object> = T & {
  className?: string;
};
