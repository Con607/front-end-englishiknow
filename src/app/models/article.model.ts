import { Lesson } from "./lesson.model";


export class Article {

  lesson :Lesson;

  constructor (
    public lesson_id: number,
    public name: string,
    public content?: string
  ) {}

}
