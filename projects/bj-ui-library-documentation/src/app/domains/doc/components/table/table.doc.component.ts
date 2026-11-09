import { Component, Input } from '@angular/core';

import { TableHeaders, TableRow } from '../../models/documentation';
import { SafeHtmlPipe } from "../../pipes/safeHtml.pipe";

@Component({
  selector: 'bj-doc-table',
  imports: [SafeHtmlPipe],
  templateUrl: './table.doc.component.html',
  styleUrl: './table.doc.component.scss'
})

export class TableDocComponent {

  @Input() tableHeaders:TableHeaders[] = [
    {
      id: 'property',
      text: 'Property'
    },
    {
      id: 'type',
      text: 'Type'
    },
    {
      id: 'default',
      text: 'Default'
    },
    {
      id: 'required',
      text: 'Required'
    },
    {
      id: 'description',
      text: 'Description'
    },
  ];

  @Input() tableRows:TableRow[] = [];

}
