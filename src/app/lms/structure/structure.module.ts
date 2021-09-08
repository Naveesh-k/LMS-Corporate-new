import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StructureComponent } from './structure.component';

import { StructureRoutingModule } from './structure-routing.module';
import { BoardComponent } from './pages/board/board.component';
import { CoursePreviewComponent } from './pages/course-preview/course-preview.component';
import { DashVarComponent } from './pages/dash-var/dash-var.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { HomeComponent } from './pages/home/home.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingComponent } from './pages/setting/setting.component';
import { CommonHeaderComponent } from './common/common-header/common-header.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { BulletinBoardComponent } from './pages/bulletin-board/bulletin-board.component';
import { CpCommonHeaderComponent } from './common/cp-common-header/cp-common-header.component';
import { CpSidebarComponent } from './common/cp-sidebar/cp-sidebar.component';
import { CpDashboardComponent } from './pages/cp-dashboard/cp-dashboard.component';
import { NgxEditorModule } from 'ngx-editor';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    StructureComponent,
    BoardComponent,
    CoursePreviewComponent,
    DashVarComponent,
    ExploreComponent,
    HomeComponent,
    MyCoursesComponent,
    ProfileComponent,
    SettingComponent,
    CommonHeaderComponent,
    SidebarComponent,
    BulletinBoardComponent,
    CpCommonHeaderComponent,
    CpSidebarComponent,
    CpDashboardComponent,
  ],
  imports: [
    CommonModule,
    StructureRoutingModule,
    SlickCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    // NgbModule
  ],
  bootstrap: [StructureComponent],
})
export class StructureModule {}
