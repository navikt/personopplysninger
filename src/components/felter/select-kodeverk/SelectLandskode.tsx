import React, { ForwardedRef, useEffect, useState } from "react";
import { fetchRetningsnumre } from "clients/apiClient";
import { HTTPError } from "components/error/Error";
import { FormatOptionLabelMeta } from "react-select/base";
import NAVSelect from "components/felter/select/NAVSelect";

interface Props {
  option: OptionType;
  submitted: boolean;
  label: string;
  error?: string;
  onChange: (value?: OptionType) => void;
}

interface OptionType {
  value: string;
  label: string;
}

export interface Kode {
  landskode: string;
  land: string;
}

const SelectLandskode = React.forwardRef(
  (props: Props, ref: ForwardedRef<any>) => {
    const [loading, settLoading] = useState(false);
    const [retningsnumre, settRetningsnumre] = useState([] as Kode[]);
    const [fetchError, settFetchError] = useState<HTTPError | undefined>();

    useEffect(() => {
      if (!loading && !retningsnumre.length) {
        settLoading(true);
        fetchRetningsnumre()
          .then((landskoder) => {
            settRetningsnumre(landskoder);
          })
          .catch((error: HTTPError) => {
            settFetchError(error);
          })
          .then(() => {
            settLoading(false);
          });
      }
    }, [loading, retningsnumre]);

    const mapKoderToOptions = (koder: Kode[]): any =>
      koder.map((k, i) => ({
        label: `${k.land} (${k.landskode})`,
        value: k.landskode,
      }));

    const defineLabel = (
      option: OptionType,
      context: FormatOptionLabelMeta<OptionType, any>
    ) => (context.context === "value" ? `${option.value} ` : `${option.label}`);

    const options = mapKoderToOptions(retningsnumre)
      .sort((a: OptionType, b: OptionType) => (a.label < b.label ? -1 : 1))
      .sort((option: OptionType) => (option.value === "+47" ? -1 : 1));

    return (
      <NAVSelect
        id={"landskode"}
        loading={loading}
        label={props.label}
        error={props.error}
        options={options}
        fetchError={fetchError}
        defineLabel={defineLabel}
        option={props.option}
        submitted={props.submitted}
        onChange={props.onChange}
        borderUnderNth={0}
        ref={ref}
      />
    );
  }
);

export default SelectLandskode;
