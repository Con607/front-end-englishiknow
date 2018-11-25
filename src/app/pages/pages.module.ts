import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PagesRoutes } from './pages.routing';

import { TeamComponent } from '../components/team/team.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { ContactusComponent } from '../components/contactus/contactus.component';
import { CartComponent } from '../components/shopping-cart/cart/cart.component';
import { NewCourseComponent } from '../components/courses/new-course/new-course.component';
import { CourseComponent } from '../components/courses/course/course.component';
import { WordListComponent } from '../components/word-list/word-list.component';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  declarations: [
    TeamComponent,
    CoursesComponent,
    NewCourseComponent,
    CourseComponent,
    ContactusComponent,
    CartComponent,
    WordListComponent
  ]
})
export class PagesModule {}
