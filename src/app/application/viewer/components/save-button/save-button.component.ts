import { Component, ViewEncapsulation } from '@angular/core';
import {DocumentService} from '../../services/document.service';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SaveButtonComponent {
  constructor(private documentService: DocumentService) {
  }

  public onSave(): void {
    this.documentService.saveCurrentDocument();
  }
}
