module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  transformIgnorePatterns: ["/node_modules/(?!react-native).+\\.js$"],
  modulePathIgnorePatterns: ["/__tests__/__utils__"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
