import {Component, Input, ViewEncapsulation} from '@angular/core';
import {IAnnotation} from '../../../../api/types/annotation.type';
import {DocumentService} from '../../services/document.service';
import {FormControl, Validators} from '@angular/forms';
import {ICoords} from '../../../../api/types/coords.type';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AnnotationComponent {
  @Input() pageId: string;
  @Input() annotation: IAnnotation;

  public textInput = new FormControl(
    '',
    [
      Validators.minLength(3),
      Validators.required
    ]
  );

  constructor(private documentService: DocumentService) {}

  public onDelete(): void {
    this.documentService.deleteAnnotation(this.annotation.id);
  }

  public onTextChanged(): void
  {
    if (!this.textInput.valid) {
      return;
    }

    this.annotation.content = this.textInput.value;
    this.documentService.updateAnnotation(this.annotation);
  }

  public onFileChanged(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    const file = files[0];

    if (file.type.match(/image.*/)) {
      const fileReader: FileReader = new FileReader();

      fileReader.addEventListener('loadend', (event: any): void => {
        this.annotation.content = event.target.result;
        this.documentService.updateAnnotation(this.annotation);
      });

      fileReader.readAsDataURL(file);
    }
  }

  public onCoordinatesChanged(coords: ICoords): void {
    this.annotation.coords = coords;
    this.documentService.updateAnnotation(this.annotation);
  }
}
