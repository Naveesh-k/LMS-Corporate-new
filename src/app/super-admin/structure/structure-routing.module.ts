import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent } from './pages/course-form/course-form.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { FirstLectureComponent } from './pages/first-lecture/first-lecture.component';
import { LectureListComponent } from './pages/lecture-list/lecture-list.component';

const routes: Routes = [
  { path:'', component: CourseFormComponent},
  { path:'course', component: CourseFormComponent},
  { path:'list', component: CourseListComponent},
  { path:'leacture-list', component: LectureListComponent},
  { path:'first-leacture', component: FirstLectureComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StructureRoutingModule { }
