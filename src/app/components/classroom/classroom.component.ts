import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { Lesson } from '../../models/lesson.model';
import { LessonsService } from '../../services/lessons.service';
import { Article } from '../../models/article.model';
import { ArticlesService } from '../../services/articles.service';
import { ContTransSentenceEnglish } from '../../models/cont-trans-sentence-english';
import { ContTransSentenceEnglishService } from '../../services/cont-trans-sentence-english.service';
import { ContTransSentenceSpanish } from '../../models/cont-trans-sentence-spanish';
import { ContTransSentenceSpanishService } from '../../services/cont-trans-sentence-spanish.service';

import swal from 'sweetalert2'

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: [
      './classroom.component.css',
      '../../../assets/css/Article-Clean.css',
      '../../../assets/css/Collapsible-sidebar-left-or-right--Content-overlay.css',
      '../../../assets/css/Navigation-with-Button.css',
      '../../../assets/css/Projects-Clean.css',
      ]
})
export class ClassroomComponent implements OnInit {

  sidebar :boolean;
  course_id :number;
  course :Course;
  current_section_index :number = 0;
  current_lesson_index :number = 0;
  current_lesson :Lesson;
  articles :Article[] = [];
  transToEnglishes :ContTransSentenceEnglish[] = [];
  transToSpanishes :ContTransSentenceSpanish[] = [];

  constructor( private _navbarService:NavbarService,
                private router:Router,
                private activatedRoute:ActivatedRoute,
                private _coursesService:CoursesService,
                private _lessonsService:LessonsService,
                private _articlesService:ArticlesService,
                private _contTransSentenceEnglishService:ContTransSentenceEnglishService,
                private _contTransSentenceSpanishService:ContTransSentenceSpanishService ) {

    this.sidebar = false;

    activatedRoute.params.subscribe( params => {
      this.course_id = +params['course_id'];
    })

    this._coursesService.getCourse( this.course_id )
        .subscribe( resp => {
          this.course = resp;
          console.log(resp);
        })
  }

  ngOnInit() {
    this._navbarService.hide();
  }


  toggleSidebar() {
    this.sidebar = !this.sidebar;
  }


  lessonSelected() :boolean {
    if ( this.current_lesson ) {
        return true;
    }
    return false;
  }

  setCurrentLesson( lesson :Lesson ) {
    this.current_lesson = lesson;
    this.getArticles();
    this.getTransToEnglishes();
    this.getTransToSpanishes();
  }


  getFirstLesson() {
    this.setCurrentLesson(this.course.course_sections[0].lessons[0]);
    // console.log(this.current_lesson);
  }


  getLesson( section_index :number, lesson_index :number ) {
    this.setCurrentLesson(this.course.course_sections[section_index].lessons[lesson_index]);

    this.current_section_index = section_index;
    this.current_lesson_index = lesson_index;
  }

  getNextLesson() {
    let lesson :number = this.current_lesson_index;
    let section :number = this.current_section_index;

    if ( this.checkIfMoreLessons() ) {
      lesson = lesson + 1;
      console.log('If checkIfMoreLessons = true then lesson = ' + lesson);
    }
    if ( !this.checkIfMoreLessons() ) {
      section = section + 1;
      lesson = 0;
      console.log('If checkIfMoreLessons = false then lesson = ' + lesson + ' and section = ' + section);
    }

    console.log( 'section = ' + section + ', lesson = ' + lesson );
    this.setCurrentLesson(this.course.course_sections[section].lessons[lesson]);

    this.current_lesson_index = lesson;
    this.current_section_index = section;
    console.log('section = ' + section);
    console.log('lesson = ' + lesson);
  }

  checkIfMoreSections() :boolean {
    if ( this.course.course_sections.length > this.current_section_index + 1 ) {
      return true;
    }
    return false;
  }

  checkIfMoreLessons() :boolean {
    if ( this.course.course_sections[this.current_section_index].lessons.length > this.current_lesson_index + 1 ) {
      console.log(this.course.course_sections[this.current_section_index].lessons.length + ' > ' + this.current_lesson_index + 1);
      return true;
    }
    return false;
  }


  getPrevLesson() {
    let lesson :number = this.current_lesson_index;
    let section :number = this.current_section_index;

    if ( this.checkIfLessLessons() ) {
      lesson = lesson - 1;
      console.log('If checkIfLessLessons = true then lesson = ' + lesson);
    }
    if ( !this.checkIfLessLessons() ) {
      section = section - 1;
      lesson = this.course.course_sections[section].lessons.length - 1;
      console.log('If checkIfLessLessons = false then lesson = ' + lesson + ' and section = ' + section);
    }

    console.log( 'section = ' + section + ', lesson = ' + lesson );
    this.setCurrentLesson(this.course.course_sections[section].lessons[lesson]);

    this.current_lesson_index = lesson;
    this.current_section_index = section;
    console.log('section = ' + section);
    console.log('lesson = ' + lesson);
  }

  checkIfLessSections() :boolean {
    if (this.current_section_index === 0 ) {
        return false;
    }
    if ( (this.course.course_sections.length - (this.current_section_index)) >= 1 ) {
      return true;
    }
    return false;
  }

  checkIfLessLessons() :boolean {
    if (this.current_lesson_index === 0) {
        return false;
    }
    if ( (this.course.course_sections[this.current_section_index].lessons.length - (this.current_lesson_index)) >= 1 ) {
      console.log(this.course.course_sections[this.current_section_index].lessons.length+' - '+(this.current_lesson_index)+' >= '+1);
      return true;
    }
    console.log(this.course.course_sections[this.current_section_index].lessons.length+' - '+(this.current_lesson_index)+' >= '+1);
    return false;
  }



  getArticles() {
    this._articlesService.getArticles( this.current_lesson.id )
        .subscribe( resp => {
          this.articles = resp;
          console.log(resp);
        })
  }

  getTransToEnglishes() {
    this._contTransSentenceEnglishService.getTransToEnglishes( this.current_lesson.id )
        .subscribe( resp => {
          this.transToEnglishes = resp;
          console.log(resp);
        })
  }

  getTransToSpanishes() {
    this._contTransSentenceSpanishService.getTransToSpanishes( this.current_lesson.id )
        .subscribe( resp => {
          this.transToSpanishes = resp;
          console.log(resp);
        })
  }


}
