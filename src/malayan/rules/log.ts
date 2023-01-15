export interface ControlEvent {
  type: "control";
  who: string;
  area: string;
}

export type LogEvent = ControlEvent;

export type MalayanLog = LogEvent[];
