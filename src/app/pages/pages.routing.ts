import { Routes } from '@angular/router';

import { TeamComponent } from '../components/team/team.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { ContactusComponent } from '../components/contactus/contactus.component';
import { CartComponent } from '../components/shopping-cart/cart/cart.component';
import { NewCourseComponent } from '../components/courses/new-course/new-course.component';
import { CourseComponent } from '../components/courses/course/course.component';
import { WordListComponent } from '../components/word-list/word-list.component';



export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'team',
        component: TeamComponent,
        data: {
          title: 'Team',
          urls: [{ title: 'Team', url: '/team' }, { title: 'Team' }]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'courses',
        component: CoursesComponent,
        data: {
          title: 'Courses',
          urls: [{ title: 'Courses', url: '/courses' }, { title: 'Courses' }]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'course/:id',
        component: CourseComponent,
        data: {
          title: 'Course',
          urls: [{ title: 'Course', url: '/course/:id' }, { title: 'Course' }]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'new-course',
        component: NewCourseComponent,
        data: {
          title: 'New Course',
          urls: [{ title: 'New Course', url: '/new-course' }, { title: 'New Course' }]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'contact-us',
        component: ContactusComponent,
        data: {
          title: 'Contact Us',
          urls: [{ title: 'Contact Us', url: '/contact-us' }, { title: 'Contact Us' }]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'cart',
        component: CartComponent,
        data: {
          title: 'Cart',
          urls: [{ title: 'Cart', url: '/cart' }, { title: 'Cart' }]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'word-list',
        component: WordListComponent,
        data: {
          title: 'Word List',
          urls: [{ title: 'Word List', url: '/word-list' }, { title: 'Word List' }]
        }
      }
    ]
  }
];
