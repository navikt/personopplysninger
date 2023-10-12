declare module '@navikt/arbeidsforhold' {
    import React from 'react';

    interface DetaljertArbeidsforhold {
        prop?: unknown;
    }

    interface ListeMedArbeidsforhold {
        prop?: unknown;
    }

    interface AFListeOnClick {
        prop?: unknown;
    }

    export const DetaljertArbeidsforhold = React.SFC<DetaljertArbeidsforhold>;
    export const ListeMedArbeidsforhold = React.SFC<ListeMedArbeidsforhold>;
    export const AFListeOnClick = React.SFC<AFListeOnClick>;
}
