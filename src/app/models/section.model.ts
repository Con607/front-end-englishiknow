
export class Section {

  id :number;
  
  constructor(
    public name: string,
    public course_id: number,
    public quiz_id?: number,
    public lesson_ids?: number[]
  ) {}

}
