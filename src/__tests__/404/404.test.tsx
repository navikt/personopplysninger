import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import PageNotFound from "../../pages/404/404";

describe("PageNotFound", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<PageNotFound />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
