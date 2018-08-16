import { Lesson } from "./lesson.model";


export class ContTransSentenceSpanish {

  lesson :Lesson;

  constructor (
    public lesson_id: number,
    public name: string,
    public sentence?: string,
    public translation?: string,
    public answer?: string
  ) {}

}
