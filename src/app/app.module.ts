import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { APP_ROUTING } from './app.routes';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { StoreComponent } from './components/store/store.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseComponent } from './components/courses/course/course.component';
import { NewCourseComponent } from './components/courses/new-course/new-course.component';
import { TeamComponent } from './components/team/team.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { LessonComponent } from './components/lessons/lesson/lesson.component';
import { NewLessonComponent } from './components/lessons/new-lesson/new-lesson.component';
import { UpdateLessonComponent } from './components/lessons/update-lesson/update-lesson.component';
import { UpdateArticleComponent } from './components/articles/update-article/update-article.component';
import { EditArticleComponent } from './components/articles/edit-article/edit-article.component';
import { TranslateEngToSpasComponent } from './components/translate-eng-to-spas/translate-eng-to-spas.component';
import { EditTransToEnglishComponent } from './components/translate-eng-to-spas/edit-trans-to-english/edit-trans-to-english.component';
import { TranslateSpaToEngsComponent } from './components/translate-spa-to-engs/translate-spa-to-engs.component';
import { EditTransToSpanishComponent } from './components/translate-spa-to-engs/edit-trans-to-spanish/edit-trans-to-spanish.component';


// Services
import { CoursesService } from './services/courses.service';
import { NavbarService } from './services/navbar.service';
import { SectionsService } from './services/sections.service';
import { LessonsService } from './services/lessons.service';
import { ArticlesService } from './services/articles.service';
import { ContTransSentenceEnglishService } from './services/cont-trans-sentence-english.service';
import { ContTransSentenceSpanishService } from './services/cont-trans-sentence-spanish.service';

import { AngularTokenModule } from 'angular-token';

// Pipes
import { KeepHtmlPipe } from './pipes/keep-html.pipe';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { SignInComponent } from './components/sign-in/sign-in.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    ClassroomComponent,
    StoreComponent,
    CoursesComponent,
    NewCourseComponent,
    CourseComponent,
    LessonComponent,
    FooterComponent,
    TeamComponent,
    ContactusComponent,
    NewLessonComponent,
    UpdateLessonComponent,
    UpdateArticleComponent,
    EditArticleComponent,
    KeepHtmlPipe,
    TranslateEngToSpasComponent,
    EditTransToEnglishComponent,
    TranslateSpaToEngsComponent,
    EditTransToSpanishComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    AngularTokenModule.forRoot({
      apiBase: 'http://localhost:3000'
    })
  ],
  providers: [
    CoursesService,
    SectionsService,
    NavbarService,
    LessonsService,
    ArticlesService,
    ContTransSentenceEnglishService,
    ContTransSentenceSpanishService,
    AngularTokenModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
