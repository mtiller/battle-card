import { Select, Table } from "@mantine/core";
import {
  IconDice1,
  IconDice2,
  IconDice3,
  IconDice4,
  IconDice5,
  IconDice6,
} from "@tabler/icons";
import { InitialAirdropLossesByZone } from "../rules";

export interface InitialLossesEditorProps {
  lossesByZone: InitialAirdropLossesByZone;
  setLossesByZone: (x: InitialAirdropLossesByZone) => void;
}

export const InitialLossesEditor = (props: InitialLossesEditorProps) => {
  const Entry = (eprops: { row: number; col: number }) => {
    return (
      <Select
        style={{ width: "4.25em" }}
        value={`${props.lossesByZone[eprops.row][eprops.col]}`}
        onChange={(ev) => {
          if (ev === null) return;
          const newLosses: InitialAirdropLossesByZone = [...props.lossesByZone];
          const newRow = [...props.lossesByZone[eprops.row]];
          newRow[eprops.col] = +ev;
          (newLosses as Array<Array<number>>)[eprops.row] = newRow;
          props.setLossesByZone(newLosses);
        }}
        data={[
          { value: "0", label: "0" },
          { value: "-1", label: "-1" },
          { value: "-2", label: "-2" },
          { value: "-3", label: "-3" },
        ]}
      />
    );
  };
  return (
    <div>
      <h2>Initial Airdrop Losses</h2>
      <Table>
        <thead>
          <tr>
            <th>Zone</th>
            <th>
              <IconDice1 />
            </th>
            <th>
              <IconDice2 />
            </th>
            <th>
              <IconDice3 />
            </th>
            <th>
              <IconDice4 />
            </th>
            <th>
              <IconDice5 />
            </th>
            <th>
              <IconDice6 />
            </th>
          </tr>
        </thead>
        <tbody>
          {props.lossesByZone.map((zone, i) => (
            <tr key={i}>
              <td>Zone {i > 1 ? i + 2 : i + 1}</td>
              {zone.map((v, j) => (
                <td key={`e${i}-${j}`}>
                  <Entry row={i} col={j} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
