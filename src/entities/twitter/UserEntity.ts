/**
 * Twitter apiから返ってきたデータを元にユーザーオブジェクトを生成するクラス
 * @param id id
 * @param name 名前
 * @param username ハンドル名
 * @param description プロフィールの詳細
 */
export default class UserEntity {
  public id: string;
  public name: string;
  public username: string;
  public description?: string;

  constructor(
    id: string,
    name: string,
    username: string,
    description?: string
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.description = description;
  }
}
