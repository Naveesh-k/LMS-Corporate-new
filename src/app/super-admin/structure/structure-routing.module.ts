import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent } from './pages/course-form/course-form.component';
import { CourseListComponent } from './pages/course-list/course-list.component';

const routes: Routes = [
  { path:'', component: CourseFormComponent},
  { path:'course', component: CourseFormComponent},
  { path:'list', component: CourseListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StructureRoutingModule { }
