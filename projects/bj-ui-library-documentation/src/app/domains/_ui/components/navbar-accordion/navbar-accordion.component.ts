import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { Component, Input, OnInit } from "@angular/core";
import { BjAccordionComponent } from "@twentyninelab/bj-ui-library/ui/bj-accordion";
import { NavbarLinkComponent } from "../navbar-link/navbar-link.component";

@Component({
    selector: 'bj-doc-navbar-accordion',
    templateUrl: './navbar-accordion.component.html',
    styleUrls: ['./navbar-accordion.component.scss'],
    imports: [CommonModule, RouterModule, BjAccordionComponent, NavbarLinkComponent]
})
export class NavbarAccordionComponent implements OnInit {
  @Input() label:string | undefined;
  @Input() subList:{url:string, label:string}[] | undefined;

  @Input() id!:string;

  constructor() { }

  ngOnInit(): void {
  }

}
