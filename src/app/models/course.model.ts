import { Section } from "./section.model";

export class Course {

  [x: string]: any;
  course_sections: Section[];
  id: number;

  constructor (
    public author_id: number,
    public title: string,
    public description: string,
    public price: number,
    public passing_mark: number,
    public free: boolean = false,
    public featured: boolean = false,
    public reviewed: boolean = false,
    public published: boolean = false,
    public images?: File,
    public sale_price?: number,
    public duration?: number,
    public max_students?: number,
    public feature_image?: string

  ) {}

}
