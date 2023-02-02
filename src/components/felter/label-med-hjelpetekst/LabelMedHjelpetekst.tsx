import React, { Fragment, ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { CustomHelpText } from "components/customHelpText/CustomHelpText";
import { Label } from "@navikt/ds-react";

interface Props {
  label: ReactNode;
  hjelpetekst?: string;
  labelId?: string;
  labelForId?: string;
}

const LabelMedHjelpetekst = (props: Props) => {
  const { label, hjelpetekst, labelId, labelForId } = props;
  return (
    <>
      {label && (
        <Label htmlFor={labelForId} id={labelId}>
          {props.label}
        </Label>
      )}
      {hjelpetekst && (
        <CustomHelpText placement={"right"}>
          <FormattedMessage
            id={hjelpetekst}
            values={{
              b: (text: string) => <b>{text}</b>,
              p: (...chunks: string[]) => (
                <p>
                  {chunks.map((chunk, i) => (
                    <Fragment key={i}>{chunk}</Fragment>
                  ))}
                </p>
              ),
            }}
          />
        </CustomHelpText>
      )}
    </>
  );
};

export default LabelMedHjelpetekst;
