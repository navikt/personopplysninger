import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import DetaljertArbeidsforhold from "./pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold";
import Forside from "./pages/forside/Forside";
import "./index.less";

const App = () => (
  <div className="pagecontent">
    <Router>
      <Route path="/" exact component={Forside} />
      <Route
        path="/arbeidsforhold/:id"
        exact
        component={DetaljertArbeidsforhold}
      />
    </Router>
  </div>
);

export default App;
