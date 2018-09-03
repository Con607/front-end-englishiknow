
export class WordList {

  constructor (
    public word: string,
    public word_fast_video?: File,
    public word_slow_video?: File,
    public word_example_ids?: number,
    public id?: number
  ) {}

}
