import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StructureComponent } from './structure.component';
import { BoardComponent } from './pages/board/board.component';
import { CoursePreviewComponent } from './pages/course-preview/course-preview.component';
import { DashVarComponent } from './pages/dash-var/dash-var.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { HomeComponent } from './pages/home/home.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingComponent } from './pages/setting/setting.component';
import { BulletinBoardComponent } from './pages/bulletin-board/bulletin-board.component';

const routes: Routes = [
  {
    path: '',
    component: StructureComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'board', component: BoardComponent },
      { path: 'course-preview', component: CoursePreviewComponent },
      { path: 'dash-var', component: DashVarComponent },
      { path: 'explore', component: ExploreComponent },
      { path: 'my-course', component: MyCoursesComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'bulletin-board', component: BulletinBoardComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StructureRoutingModule {}
