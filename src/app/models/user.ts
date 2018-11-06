
export class User {

  constructor (
    public email: string,
    public password: string,
    public role?: string,
    // public img? :string,
    // public role :string = 'STUDENT_ROLE',
    public id? :number
  ) {}

}
