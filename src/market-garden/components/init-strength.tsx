import { Select } from "@mantine/core";

export interface InitialStrengthProps {
  initial: [number, number, number];
  setInitial: (x: [number, number, number]) => void;
}

export const InitialStrength = (props: InitialStrengthProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Select
        style={{ width: "4em" }}
        label="Zone 1"
        value={`${props.initial[0]}`}
        onChange={(ev) => {
          if (ev !== null)
            props.setInitial([+ev, props.initial[1], props.initial[2]]);
        }}
        placeholder="Pick one"
        data={[
          { value: "6", label: "6" },
          { value: "5", label: "5" },
          { value: "4", label: "4" },
        ]}
      />
      <Select
        style={{ width: "4em" }}
        label="Zone 2"
        value={`${props.initial[1]}`}
        onChange={(ev) => {
          if (ev !== null)
            props.setInitial([props.initial[0], +ev, props.initial[2]]);
        }}
        placeholder="Pick one"
        data={[
          { value: "6", label: "6" },
          { value: "5", label: "5" },
          { value: "4", label: "4" },
        ]}
      />
      <Select
        style={{ width: "4em" }}
        label="Arnhem"
        value={`${props.initial[2]}`}
        onChange={(ev) => {
          if (ev !== null)
            props.setInitial([props.initial[0], props.initial[1], +ev]);
        }}
        placeholder="Pick one"
        data={[
          { value: "6", label: "6" },
          { value: "5", label: "5" },
          { value: "4", label: "4" },
        ]}
      />
    </div>
  );
};
