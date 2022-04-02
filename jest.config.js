module.exports = {
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testEnvironment: "node",
  roots: ["<rootDir>"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  coverageDirectory: "./coverage/",
  moduleFileExtensions: ["ts", "js", "json"],
  collectCoverageFrom: ["**/*.(t|j)s"],
};
