import Client from "twitter-api-sdk";
import UserEntity from "../../entities/twitter/userEntity";

const MAX_RESULT = 100;

/**
 * Twitter api(user周り)との接続を集約し、具体的なやりとりを隠蔽するクラス
 * @param client TwitterのAPI Client
 */
export default class UserRepository {
  constructor(private client: Client) {
    this.client = client;
  }

  /**
   * idで指定したユーザーのフォローしているユーザー一覧を取得する
   * @param id ユーザーのid
   */
  async findFollowers(id: string): Promise<UserEntity[]> {
    const response = await this.client.users.usersIdFollowers(id, {
      max_results: MAX_RESULT,
    });
    if (!response.data) return [];

    return response.data.map(({ id, name, username }) => {
      return new UserEntity(id, name, username);
    });
  }

  /**
   * contentで指定した内容を含むツイートを行ったユーザー一覧を取得する
   * @param content ツイート内容
   */
  async searchByTweet(content: string): Promise<UserEntity[]> {
    // 本当はtweetsFullarchiveSearchを使いたいがOAUTH周りの設定が面倒だったので一旦Recentを使う
    const response = await this.client.tweets.tweetsRecentSearch({
      query: content,
      max_results: MAX_RESULT,
      expansions: ["author_id"],
      "user.fields": ["id", "name", "username", "description"],
    });

    if (!response.includes || !response.includes.users) return [];

    return response.includes.users.map(
      ({ id, name, username, description }) => {
        return new UserEntity(id, name, username, description);
      }
    );
  }
}
