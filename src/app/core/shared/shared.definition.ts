import {DraggingDirective} from './directives/dragging.directive';
import {AssetsImagePipe} from './pipe/assets-image.pipe';

export class SharedDefinition {
  static declarations = [
    DraggingDirective,
    AssetsImagePipe,
  ];

  static exports = [
    DraggingDirective,
    AssetsImagePipe,
  ];
}
