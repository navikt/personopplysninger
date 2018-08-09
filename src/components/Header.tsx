import * as React from 'react';
import '../less/Header.less';
//import { Undertittel } from 'nav-frontend-typografi';

export interface Props {
    name: string;
}

const Header = (props: {name: string}) => {
    return (
        <header className="header">
            <div>Dine personopplysninger</div>
            <div>Hei {props.name}, her kan du se og laste ned informasjon NAV har nyttet til deg.</div>
            <div>Vi har samlet informasjonen vi har tilgjengelig knyttet til deg på denne siden.</div>
            <div>Les om personvern i Arbeids- og velferdsetaten her.</div>
        </header>
    );
};

export default Header;
