import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import NAVSelect from "@/components/felter/select/NAVSelect";
import nbMessages from "@/text/nb";

describe("NAVSelect", () => {
    it("velger alternativet med samme navn når verdien ikke finnes", () => {
        const onChange = vi.fn();
        render(
            <IntlProvider locale="nb" messages={nbMessages}>
                <NAVSelect
                    id="land"
                    name="land"
                    label="Land"
                    submitted={false}
                    option={{ value: "NO", label: "Norge" }}
                    options={[
                        { value: "SWE", label: "Sverige (SWE)" },
                        { value: "NOR", label: "Norge (NOR)" },
                    ]}
                    onChange={onChange}
                />
            </IntlProvider>,
        );

        expect(onChange).toHaveBeenCalledWith({ value: "NOR", label: "Norge (NOR)" });
    });
});
