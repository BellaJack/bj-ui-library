import { Component, Input } from '@angular/core';

import { TableModelRow } from '../../models/documentation';

@Component({
  selector: 'kiwi-doc-table-model',
  imports: [],
  templateUrl: './table-model.doc.component.html',
  styleUrl: './table-model.doc.component.scss'
})
export class TableModelDocComponent {
  @Input() tableRows:TableModelRow[] = [];
}
