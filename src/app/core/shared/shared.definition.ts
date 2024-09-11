import {OutsideClickDirective} from './directives/outside-click.directive';
import {DraggingDirective} from './directives/dragging.directive';
import {AssetsImagePipe} from './pipe/assets-image.pipe';

export class SharedDefinition {
  static declarations = [
    OutsideClickDirective,
    DraggingDirective,
    AssetsImagePipe,
  ];

  static exports = [
    OutsideClickDirective,
    DraggingDirective,
    AssetsImagePipe,
  ];
}
