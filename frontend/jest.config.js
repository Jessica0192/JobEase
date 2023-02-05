module.exports = {
  "parser": "babel-eslint",
  "transform": {
    "^.+\\.js$": "babel-jest"
  },
  "babelConfig": {
    "presets": [
      "@babel/preset-env"
    ]
  },
  "moduleFileExtensions": [
    "js",
    "vue"
  ],
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/jest/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/test/jest/__mocks__/styleMock.js"
  },
  "transformIgnorePatterns": [
    "/node_modules/(?!(babel-jest|jest-vue-preprocessor)/)"
  ],
  "moduleDirectories": [
    "node_modules",
    "src"
  ],
  "testMatch": [
    "<rootDir>/test/jest/*.spec.js"
  ],
  "testEnvironment": "node"
};
