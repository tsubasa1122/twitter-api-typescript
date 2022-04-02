import Client from "twitter-api-sdk";
import UserEntity from "../../../src/entities/twitter/userEntity";
import UserRepository from "../../../src/repositories/twitter/userRepository";
import { tweetsRecentSearchResponse } from "../../testData/tweetsRecentsSearch";
import { usersIdFollowersResponse } from "../../testData/usersIdFollowers";

describe("UserRepositoryのテスト", () => {
  describe("findFollowers", () => {
    describe("Twitter APIからのレスポンスがエラーの場合", () => {
      it("空配列を返すこと", async () => {
        const errorResponse = {
          message: "エラーだよ",
        };
        const twitterClientMock = new Client("");
        twitterClientMock.users.usersIdFollowers = jest
          .fn()
          .mockResolvedValue(errorResponse);

        const userRepository = new UserRepository(twitterClientMock);

        await expect(
          userRepository.findFollowers("1234")
        ).resolves.toStrictEqual([]);
      });
    });

    describe("Twitter APIからのレスポンスが正常の場合", () => {
      it("ユーザー一覧を返すこと", async () => {
        const twitterClientMock = new Client("");
        twitterClientMock.users.usersIdFollowers = jest
          .fn()
          .mockResolvedValue(usersIdFollowersResponse);

        const userRepository = new UserRepository(twitterClientMock);
        const users = usersIdFollowersResponse.data.map(
          ({ id, name, username }) => {
            return new UserEntity(id, name, username);
          }
        );

        await expect(
          userRepository.findFollowers("1234")
        ).resolves.toStrictEqual(users);
      });
    });
  });

  describe("searchByTweet", () => {
    describe("Twitter APIからのレスポンスがエラーの場合", () => {
      it("空配列を返すこと", async () => {
        const errorResponse = {
          message: "エラーだよ",
        };
        const twitterClient = new Client("");
        twitterClient.tweets.tweetsRecentSearch = jest
          .fn()
          .mockResolvedValue(errorResponse);

        const userRepository = new UserRepository(twitterClient);

        await expect(
          userRepository.searchByTweet("test")
        ).resolves.toStrictEqual([]);
      });
    });

    describe("Twitter APIからのレスポンスが正常の場合", () => {
      it("ユーザー一覧を返すこと", async () => {
        const twitterClient = new Client("");
        twitterClient.tweets.tweetsRecentSearch = jest
          .fn()
          .mockResolvedValue(tweetsRecentSearchResponse);

        const userRepository = new UserRepository(twitterClient);
        const users = tweetsRecentSearchResponse.includes.users.map(
          ({ id, name, username, description }) => {
            return new UserEntity(id, name, username, description);
          }
        );

        await expect(
          userRepository.searchByTweet("test")
        ).resolves.toStrictEqual(users);
      });
    });
  });
});
