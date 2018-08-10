import { Lesson } from "./lesson.model";

export class Section {

  id :number;
  lessons :Lesson[];

  constructor(
    public name: string,
    public course_id: number,
    public quiz_id?: number
  ) {}

}
