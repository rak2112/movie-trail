module.exports = {
  "roots": [
    "<rootDir>/web-app/src"
  ],
  "transform": {
    "^.+\\.ts?$": "ts-jest"
  },
  "testURL": 'http://localhost',
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
}