import {IPage} from './page.interface';
import {IAnnotation} from './annotation.interface';

export interface IDocument {
  id: number;
  name: string;
  pages: IPage[];
  annotations?: IAnnotation[];
}
