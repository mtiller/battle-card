import { CorpLocation, State, Zone } from "../../state";

const corpLocations: CorpLocation[] = [
  "belgium",
  "zone1",
  "zone2",
  "zone3",
  "zone4",
];

export function zoneState(z: Zone): number[] {
  return [z.allied, z.german, z.control ? 0 : 1];
}

export function flattenState(s: State, zone: number): number[] {
  return [
    zone, // 1: What zone is battle taking place in (or advance option if value is 0) [0-4]
    s.day, // 1: Whay day it is [1-6]
    ...zoneState(s.zones[0]), // 3: State of each zone [0-6,0-6,0-1]
    ...zoneState(s.zones[1]), // 3
    ...zoneState(s.zones[2]), // 3
    ...zoneState(s.zones[3]), // 3
    s.dropped ? 0 : 1, // 1: Whether troopers have dropped [0-1]
    corpLocations.indexOf(s.corp), // 1: Where the 30th Corp is [1-5]
  ];
}
