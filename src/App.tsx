import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Forside from "./pages/forside/Forside";
import DetaljertArbeidsforhold from "./pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold";
import "./index.less";

export const baseUrl = "/person/personopplysninger";
const App = () => (
  <div className="pagecontent">
    <Router>
      <Route exact={true} path={`(/|${baseUrl}/)`} component={Forside} />
      <Route
        exact={true}
        path={`${baseUrl}/arbeidsforhold/:id`}
        component={DetaljertArbeidsforhold}
      />
    </Router>
  </div>
);

export default App;
