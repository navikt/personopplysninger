import { fireEvent, render, screen } from "@testing-library/react";
import NAVSelect from "@/components/felter/select/NAVSelect";

describe("NAVSelect", () => {
    it("velger alternativet med samme navn når verdien ikke finnes", () => {
        const onChange = vi.fn();
        render(
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
                language="nb"
            />,
        );

        expect(onChange).toHaveBeenCalledWith({ value: "NOR", label: "Norge (NOR)" });
    });

    it("viser at søket ikke ga treff", async () => {
        render(
            <NAVSelect
                id="land"
                name="land"
                label="Land"
                submitted={false}
                options={[{ value: "SWE", label: "Sverige (SWE)" }]}
                onChange={vi.fn()}
                language="nb"
            />,
        );

        fireEvent.input(screen.getByRole("combobox", { name: "Land" }), { target: { value: "xyz" } });

        expect(await screen.findByText("Ingen treff funnet for xyz...")).toBeInTheDocument();
    });
});
