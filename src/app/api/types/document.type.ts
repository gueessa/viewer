import {IPage} from './page.type';
import {IAnnotation} from './annotation.type';

export interface IDocument {
  id: number;
  name: string;
  pages: IPage[];
  annotations?: IAnnotation[];
}
