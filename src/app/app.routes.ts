import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { StoreComponent } from './components/store/store.component';
import { CoursesComponent } from './components/courses/courses.component';
import { NewCourseComponent } from './components/courses/new-course/new-course.component';
import { CourseComponent } from './components/courses/course/course.component';
import { LessonComponent } from './components/lessons/lesson/lesson.component';
import { TeamComponent } from './components/team/team.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { NewLessonComponent } from './components/lessons/new-lesson/new-lesson.component';
import { UpdateLessonComponent } from './components/lessons/update-lesson/update-lesson.component';
import { UpdateArticleComponent } from './components/articles/update-article/update-article.component';
import { EditArticleComponent } from './components/articles/edit-article/edit-article.component';
import { EditTransToEnglishComponent } from './components/translate-eng-to-spas/edit-trans-to-english/edit-trans-to-english.component';
import { EditTransToSpanishComponent } from './components/translate-spa-to-engs/edit-trans-to-spanish/edit-trans-to-spanish.component';
import { SignInComponent } from './components/sign-in/sign-in.component';


const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'course/:id', component: CourseComponent },
  { path: 'new-course', component: NewCourseComponent },

  { path: 'lesson', component: LessonComponent },
  { path: 'new-lesson/:course_id/:section_id', component: NewLessonComponent },
  { path: 'update-lesson/:course_id/:lesson_id', component: UpdateLessonComponent },

  { path: 'update-article/:lesson_id', component: UpdateArticleComponent },
  { path: 'edit-article/:lesson_id/:article_id/:course_id', component: EditArticleComponent },

  { path: 'edit-translate-eng-to-spa/:lesson_id/:transToEnglish_id/:course_id', component: EditTransToEnglishComponent },

  { path: 'edit-translate-spa-to-eng/:lesson_id/:transToSpanish_id/:course_id', component: EditTransToSpanishComponent },

  { path: 'classroom/:course_id', component: ClassroomComponent },

  { path: 'sign-in', component: SignInComponent },

  { path: 'team', component: TeamComponent },
  { path: 'contact-us', component: ContactusComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'store', component: StoreComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
