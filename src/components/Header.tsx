import * as React from 'react';

export interface Props {
    name: string;
}

const Header = (props: {name: string}) => {
    return (
        <header className="header">
            <h1 className="title">Dine personopplysninger</h1>
            <div>Hei {props.name}, her kan du se og laste ned informasjon NAV har nyttet til deg.</div>
            <div>Vi har samlet informasjonen vi har tilgjengelig knyttet til deg på denne siden.</div>
            <div>Les om personvern i Arbeids- og velferdsetaten her.</div>
        </header>
    );
};

export default Header;
