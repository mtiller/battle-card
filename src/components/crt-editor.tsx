import { Select, Switch, Table } from "@mantine/core";
import {
  IconDice1,
  IconDice2,
  IconDice3,
  IconDice4,
  IconDice5,
  IconDice6,
} from "@tabler/icons";
import React from "react";
import { CombatOutcome, CombatResolutionTable } from "../rules";

export interface CRTEditorProps {
  title: string;
  table: CombatResolutionTable;
  setTable: (x: CombatResolutionTable) => void;
}

export const CRTEditor = (props: CRTEditorProps) => {
  const update = React.useCallback(
    (adv: "A" | "N" | "G", row: number, outcome: CombatOutcome) => {
      let col = props.table.noAdvantage;
      if (adv === "A") col = props.table.alliedAdvantage;
      if (adv === "G") col = props.table.germanAdvantage;
      col[row] = outcome;
      console.log(`Setting ${row} in column ${adv} to `, outcome);
      console.log("Setting table to ", props.table);
      props.setTable({ ...props.table });
    },
    [props.table, props.setTable]
  );
  const Row = (rprops: {
    row: number;
    adv: "A" | "N" | "G";
    outcome: CombatOutcome[];
  }) => {
    const { row } = rprops;
    return (
      <td>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Select
            style={{ width: "4.25em" }}
            label="Allies"
            value={`${rprops.outcome[row].alliedLosses}`}
            onChange={(ev) => {
              if (ev !== null)
                update(rprops.adv, rprops.row, {
                  ...rprops.outcome[row],
                  alliedLosses: +ev,
                });
            }}
            data={[
              { value: "0", label: "0" },
              { value: "-1", label: "-1" },
              { value: "-2", label: "-2" },
              { value: "-3", label: "-3" },
            ]}
          />
          <Select
            style={{ width: "4.25em" }}
            label="German"
            value={`${rprops.outcome[row].germanLosses}`}
            onChange={(ev) => {
              if (ev !== null)
                update(rprops.adv, rprops.row, {
                  ...rprops.outcome[row],
                  germanLosses: +ev,
                });
            }}
            data={[
              { value: "0", label: "0" },
              { value: "-1", label: "-1" },
              { value: "-2", label: "-2" },
              { value: "-3", label: "-3" },
            ]}
          />
        </div>
        <Switch
          label="Control"
          checked={rprops.outcome[row].alliesControl}
          onChange={(ev) => {
            if (ev !== null)
              update(rprops.adv, rprops.row, {
                ...rprops.outcome[row],
                alliesControl: ev.currentTarget.checked,
              });
          }}
        />
      </td>
    );
  };
  return (
    <div style={{ margin: 5 }}>
      <h2>{props.title}</h2>
      <Table withBorder withColumnBorders horizontalSpacing="md">
        <thead>
          <tr>
            <td></td>
            <td style={{ textAlign: "center" }} colSpan={3}>
              Advantage
            </td>
          </tr>
          <tr>
            <th>Allied Roll</th>
            <th>Allied</th>
            <th>None</th>
            <th>German</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <IconDice1 />
            </td>
            <Row row={0} adv="A" outcome={props.table.alliedAdvantage} />
            <Row row={0} adv="N" outcome={props.table.noAdvantage} />
            <Row row={0} adv="G" outcome={props.table.germanAdvantage} />
          </tr>
          <tr>
            <td>
              <IconDice2 />
            </td>
            <Row row={1} adv="A" outcome={props.table.alliedAdvantage} />
            <Row row={1} adv="N" outcome={props.table.noAdvantage} />
            <Row row={1} adv="G" outcome={props.table.germanAdvantage} />
          </tr>
          <tr>
            <td>
              <IconDice3 />
            </td>
            <Row row={2} adv="A" outcome={props.table.alliedAdvantage} />
            <Row row={2} adv="N" outcome={props.table.noAdvantage} />
            <Row row={2} adv="G" outcome={props.table.germanAdvantage} />
          </tr>
          <tr>
            <td>
              <IconDice4 />
            </td>
            <Row row={3} adv="A" outcome={props.table.alliedAdvantage} />
            <Row row={3} adv="N" outcome={props.table.noAdvantage} />
            <Row row={3} adv="G" outcome={props.table.germanAdvantage} />
          </tr>
          <tr>
            <td>
              <IconDice5 />
            </td>
            <Row row={4} adv="A" outcome={props.table.alliedAdvantage} />
            <Row row={4} adv="N" outcome={props.table.noAdvantage} />
            <Row row={4} adv="G" outcome={props.table.germanAdvantage} />
          </tr>
          <tr>
            <td>
              <IconDice6 />
            </td>
            <Row row={5} adv="A" outcome={props.table.alliedAdvantage} />
            <Row row={5} adv="N" outcome={props.table.noAdvantage} />
            <Row row={5} adv="G" outcome={props.table.germanAdvantage} />
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
