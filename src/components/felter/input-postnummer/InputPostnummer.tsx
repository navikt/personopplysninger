import React, { useEffect, useState } from "react";
import { fetchPostnummer } from "../../../clients/apiClient";
import { HTTPError } from "../../error/Error";
import { Input } from "nav-frontend-skjema";

interface Props {
  value: string;
  submitted: boolean;
  label: string;
  error: string | null;
  onChange: (value: string) => void;
  onErrors: (value: string) => void;
}

export interface Kode {
  kode: string;
  tekst: string;
}

const SelectPostnummer = React.memo((props: Props) => {
  const [loading, settLoading] = useState(false);
  const [postnummer, settPostnummer] = useState([] as Kode[]);
  const [fetchError, settFetchError] = useState();

  useEffect(() => {
    if (!loading) {
      settLoading(true);
      fetchPostnummer()
        .then((postnummer: Kode[]) => {
          settPostnummer(postnummer);
        })
        .catch((error: HTTPError) => {
          settFetchError(error);
        })
        .then(() => {
          settLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const poststed = postnummer
    .filter(postnummer => postnummer.kode === props.value)
    .shift();

  useEffect(() => {
    const errorText = "Ugyldig postnummer";
    if (props.error !== errorText && !poststed) {
      props.onErrors(errorText);
    }
  }, [props, poststed]);

  return (
    <div className="input-postnummer__container">
      <Input
        value={props.value}
        label={props.label}
        bredde={"S"}
        feil={
          props.submitted && props.error
            ? { feilmelding: props.error }
            : undefined
        }
        onChange={e => props.onChange(e.target.value)}
      />
      <div className="input-postnummer__poststed">
        {poststed && !fetchError && <>{poststed.tekst}</>}
      </div>
    </div>
  );
});

export default SelectPostnummer;
