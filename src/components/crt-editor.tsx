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
  const AARow = (rprops: { row: number; outcome: CombatOutcome[] }) => {
    const { row } = rprops;
    return (
      <td>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Select
            style={{ width: "4.25em" }}
            label="Allies"
            value={`${rprops.outcome[row].alliedLosses}`}
            // onChange={(ev) => {
            //   if (ev !== null)
            //     props.setInitial([+ev, props.initial[1], props.initial[2]]);
            // }}
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
            // onChange={(ev) => {
            //   if (ev !== null)
            //     props.setInitial([+ev, props.initial[1], props.initial[2]]);
            // }}
            data={[
              { value: "0", label: "0" },
              { value: "-1", label: "-1" },
              { value: "-2", label: "-2" },
              { value: "-3", label: "-3" },
            ]}
          />
        </div>
        <Switch label="Control" value={rprops.outcome[row].germanLosses} />
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
            <AARow row={0} outcome={props.table.alliedAdvantage} />
            <AARow row={0} outcome={props.table.noAdvantage} />
            <AARow row={0} outcome={props.table.germanAdvantage} />
          </tr>
          <tr>
            <td>
              <IconDice2 />
            </td>
            <AARow row={1} outcome={props.table.alliedAdvantage} />
            <AARow row={1} outcome={props.table.noAdvantage} />
            <AARow row={1} outcome={props.table.germanAdvantage} />
          </tr>
          <tr>
            <td>
              <IconDice3 />
            </td>
            <AARow row={2} outcome={props.table.alliedAdvantage} />
            <AARow row={2} outcome={props.table.noAdvantage} />
            <AARow row={2} outcome={props.table.germanAdvantage} />
          </tr>
          <tr>
            <td>
              <IconDice4 />
            </td>
            <AARow row={3} outcome={props.table.alliedAdvantage} />
            <AARow row={3} outcome={props.table.noAdvantage} />
            <AARow row={3} outcome={props.table.germanAdvantage} />
          </tr>
          <tr>
            <td>
              <IconDice5 />
            </td>
            <AARow row={4} outcome={props.table.alliedAdvantage} />
            <AARow row={4} outcome={props.table.noAdvantage} />
            <AARow row={4} outcome={props.table.germanAdvantage} />
          </tr>
          <tr>
            <td>
              <IconDice6 />
            </td>
            <AARow row={5} outcome={props.table.alliedAdvantage} />
            <AARow row={5} outcome={props.table.noAdvantage} />
            <AARow row={5} outcome={props.table.germanAdvantage} />
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
