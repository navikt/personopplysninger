import * as React from "react";
import ReactTestRenderer from "react-test-renderer";
import wrapIntl from "./__utils__/IntlTestHelper";
import PostAdresse from "../pages/forside/sections/4-personinfo/3-adresser/folkeregisteret/PostAdresse";

test("render Postadresse with content", () => {
  const postadresse = {
    adresse1: "12345 HFJEF IQUFJ HFURHGHQBEUQ",
    adresse2: "BATOOM LUNCHAGRAMA,GONGRUPEA,DD",
    adresse3: "GGLAM,10000 HCAMGHU,THAILAND",
    datoFraOgMed: "2018-03-13",
    land: "THA",
    postnummer: "9913"
  };

  const component = ReactTestRenderer.create(
    wrapIntl(<PostAdresse postadresse={postadresse} />)
  );
  expect(component.toJSON()).toMatchSnapshot();
});
