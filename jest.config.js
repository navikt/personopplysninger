module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.svg$": "jest-svg-transformer",
    "^.+\\.(png)$": "<rootDir>/config/jest/fileTransform.js",
    "^.+\\.(css|less)$": "<rootDir>/config/jest/cssTransform.js"
  },
  transformIgnorePatterns: ["/node_modules/(?!react-native).+\\.js$"],
  modulePathIgnorePatterns: ["/__tests__/__utils__"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
