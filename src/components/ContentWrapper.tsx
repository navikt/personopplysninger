import * as React from 'react';
import Personalia from "./Personalia";
import Adresse from "./Adresse";
import Familierelasjoner from "./Familierelasjoner";
import Arbeidsforhold from "./Arbeidsforhold";

const ContentWrapper = () => {
    return (
        <div className="panel">
            <Personalia />
            <Adresse />
            <Familierelasjoner />
            <Arbeidsforhold />
        </div>
    );
};

export default ContentWrapper;
