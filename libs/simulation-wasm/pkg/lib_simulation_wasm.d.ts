/* tslint:disable */
/* eslint-disable */
/**
*/
export class Animal {
  free(): void;
/**
*/
  rotation: number;
/**
*/
  x: number;
/**
*/
  y: number;
}
/**
*/
export class Food {
  free(): void;
/**
*/
  x: number;
/**
*/
  y: number;
}
/**
*/
export class Simulation {
  free(): void;
/**
*/
  constructor();
/**
* @returns {World}
*/
  world(): World;
/**
* @returns {string}
*/
  step(): string;
/**
* @returns {string}
*/
  train(): string;
}
/**
*/
export class World {
  free(): void;
/**
*/
  animals: (Animal)[];
/**
*/
  foods: (Food)[];
}
