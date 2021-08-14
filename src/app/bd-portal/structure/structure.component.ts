import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'structure-root',
  templateUrl: './structure.component.html',
})
export class StructureComponent {
  title = 'bd-portal';
  constructor(public router: Router) {}
}
