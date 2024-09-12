import {ICoords} from './coords.type';

export interface IAnnotation {
  id?: number;
  type: 'text' | 'image';
  content?: string;
  page: number;
  coords: ICoords;
}
