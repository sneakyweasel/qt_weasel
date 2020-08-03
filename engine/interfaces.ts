/**
 * List of element names
 */
export enum Elem {
  // Basic
  Void = 'Void',
  Wall = 'Wall',
  Gate = 'Gate',
  // Source
  Laser = 'Laser',
  NonLinearCrystal = 'NonLinearCrystal',
  // Direction
  Mirror = 'Mirror',
  BeamSplitter = 'BeamSplitter',
  PolarizingBeamSplitter = 'PolarizingBeamSplitter',
  CoatedBeamSplitter = 'CoatedBeamSplitter',
  CornerCube = 'CornerCube',
  // Absorption
  Detector = 'Detector',
  Rock = 'Rock',
  Mine = 'Mine',
  Absorber = 'Absorber',
  DetectorFour = 'DetectorFour',
  // Polarization
  Polarizer = 'Polarizer',
  QuarterWavePlate = 'QuarterWavePlate',
  HalfWavePlate = 'HalfWavePlate',
  SugarSolution = 'SugarSolution',
  FaradayRotator = 'FaradayRotator',
  // Phase
  Glass = 'Glass',
  VacuumJar = 'VacuumJar',
}

export interface ICell {
  x: number
  y: number
  element: string
  rotation: number
  polarization: number
  strength: number
}
