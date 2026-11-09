
import { RouterModule } from '@angular/router';
import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: '[bjDsNavEl]',
    templateUrl: './navbar-link.component.html',
    styleUrls: ['./navbar-link.component.scss'],
    imports: [RouterModule]
})
export class NavbarLinkComponent implements OnInit {

  @Input() url:string | undefined;
  @Input() label:string | undefined;
  @Input() subList:{url:string, label:string}[] | undefined;
  @Input() hasAccordion:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}