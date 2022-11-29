import "@testing-library/jest-dom";
import PageNotFound from "../../pages/404/404";
import { render } from "@testing-library/react";

describe("PageNotFound", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<PageNotFound />);
    expect(asFragment()).toMatchSnapshot();
  });
});
