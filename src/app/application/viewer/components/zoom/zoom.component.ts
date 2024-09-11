import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ZoomService} from '../../services/zoom.service';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ZoomComponent implements OnInit {
  public zoomValue: number;

  constructor(private zoomService: ZoomService)
  {}

  ngOnInit(): void {
    this.zoomService.asObservable().subscribe(zoomValue => this.zoomValue = zoomValue);
  }

  zoomIn(): void {
    this.zoomService.zoomIn();
  }

  zoomOut(): void {
    this.zoomService.zoomOut();
  }
}
