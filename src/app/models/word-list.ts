
export class WordList {

  constructor (
    public word: string,
    public fast_video: string,
    public slow_video: string,
    public word_fast_video?: File,
    public word_example_ids?: number,
    public id?: number
  ) {}

}
