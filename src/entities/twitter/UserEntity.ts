/**
 * Twitter apiから返ってきたデータを元にユーザーオブジェクトを生成するクラス
 * @param id id
 * @param name 名前
 * @param screen_name ハンドル名
 * @param url URL
 * @param description プロフィールの詳細
 */
export default class UserEntity {
  public id: number;
  public name: string;
  public screen_name: string;
  public url: string;
  public description: string;

  constructor(
    id: number,
    name: string,
    screen_name: string,
    url: string,
    description: string
  ) {
    this.id = id;
    this.name = name;
    this.screen_name = screen_name;
    this.url = url;
    this.description = description;
  }
}
