export interface ICoords {
  x: number;
  y: number;
}

export interface IAnnotation {
  id?: number;
  type: 'text' | 'image';
  content?: string;
  page: number;
  coords: ICoords;
}
