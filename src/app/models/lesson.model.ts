import { Section } from "./section.model";


export class Lesson {

  id :number;
  section :Section;

  constructor (
    public name :string,
    public duration :number,
    public preview :boolean = false,
    public author_id :number,
    public course_section_id: number,
    public comment_ids? :number[],
    public content_text_ids? :number[],
    public cont_trans_sentence_english_ids? :number[]
  ) {}

}
