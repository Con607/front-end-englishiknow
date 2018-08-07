import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { StoreComponent } from './components/store/store.component';
import { CoursesComponent } from './components/courses/courses.component';
import { NewCourseComponent } from './components/courses/new-course/new-course.component';
import { CourseComponent } from './components/courses/course/course.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { TeamComponent } from './components/team/team.component';
import { ContactusComponent } from './components/contactus/contactus.component';


const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'course/:id', component: CourseComponent },
  { path: 'new-course', component: NewCourseComponent },
  { path: 'lesson', component: LessonComponent },
  { path: 'team', component: TeamComponent },
  { path: 'contact-us', component: ContactusComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'classroom', component: ClassroomComponent },
  { path: 'store', component: StoreComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
