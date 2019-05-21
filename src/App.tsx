import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Forside from "./pages/forside/Forside";
import DetaljertArbeidsforhold from "./pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold";
import "./index.less";

export const baseUrl = "/person/personopplysninger";
const App = () => {
  return (
    <div className="pagecontent">
      <Router>
        <Route exact path={`(/|${baseUrl}/)`} component={Forside} />
        <Route
          path={`${baseUrl}/arbeidsforhold/:id`}
          exact
          component={DetaljertArbeidsforhold}
        />
      </Router>
    </div>
  );
};

export default App;
