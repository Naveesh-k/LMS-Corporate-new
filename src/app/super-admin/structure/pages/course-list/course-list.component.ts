import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})

export class CourseListComponent implements OnInit {
  sales: any =[];

  constructor() { }

  ngOnInit(): void {

    this.sales = [
      { id: '1', title: 'Lorem Ipsum is simply dummy text of the printing and typesetting', provider: 'admin', generateDate: '1/1/2021', startDate: '1/1/2021',status: 'Active' },
      { id: '2', title: 'Lorem Ipsum is simply dummy text of the printing and typesetting', provider: 'provider', generateDate: '1/1/2021', startDate: '1/1/2021' ,status: 'Disable'},
      { id: '3', title: 'Lorem Ipsum is simply dummy text of the printing and typesetting', provider: 'admin', generateDate: '1/1/2021', startDate: '1/1/2021' ,status: 'Active'},
      ];

  }

}
