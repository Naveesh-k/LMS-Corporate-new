import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigate-portal',
  templateUrl: './navigate-portal.component.html',
  styleUrls: ['./navigate-portal.component.scss'],
})
export class NavigatePortalComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}
}
