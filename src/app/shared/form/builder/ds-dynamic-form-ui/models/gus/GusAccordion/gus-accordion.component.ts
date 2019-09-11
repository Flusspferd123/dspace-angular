import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isEmpty } from '../../../../../../empty.util';
import { PanelData } from '../gus.panelData.models';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ds-gus-accordion',
  styleUrls: ['./gus-accordion.component.scss'],
  templateUrl: './gus-accordion.component.html',
})

export class GusAccordionComponent implements OnInit {

  @Output() blur = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();
  @Output() focus = new EventEmitter<any>();

  @Input() public panelData: PanelData;

  constructor(private fb: FormBuilder) {
  }

  // tslint:disable-next-line:no-empty
  ngOnInit() {

  }

  onBlur(event) {
    this.blur.emit(event);
  }

  onFocus(event) {
    this.focus.emit(event);
  }

  onChange($event: NgbPanelChangeEvent) {
    console.log('GusAccordion event: ', $event);
  }
}
