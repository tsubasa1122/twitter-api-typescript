import Client from "twitter-api-sdk";

const MAX_RESULT = 100;

/**
 * Twitter api(user周り)との接続を集約し、具体的なやりとりを隠蔽するクラス
 * @param client TwitterのAPI Client
 */
export default class UserRepository {
  constructor(public client: Client) {
    this.client = client;
  }

  async findFollowers(id: string) {
    const tweet = await this.client.users.usersIdFollowers("448507447", {
      max_results: MAX_RESULT,
    });
    console.log(tweet?.data);
  }

  async searchByTweet(content: string) {
    // 本当はtweetsFullarchiveSearchを使いたいがOAUTH周りの設定が面倒だったので一旦Recentを使う
    const tweet = await this.client.tweets.tweetsRecentSearch({
      query: "test",
      max_results: MAX_RESULT,
      expansions: ["author_id"],
      "user.fields": ["username"],
    });
    console.log(tweet?.includes?.users?.length);
  }
}
