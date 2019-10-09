import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'ds-gus-item',
  styleUrls: ['./gus-item.component.scss'],
  templateUrl: './gus-item.component.html',
})

export class GusItemComponent implements OnInit {

  @Input() itemLabel: string;

  @Output() change = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

}
