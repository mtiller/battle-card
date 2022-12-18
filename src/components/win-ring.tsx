import { RingProgress, Text } from "@mantine/core";

export interface WinRingProps {
  title: string;
  per: number;
}

export const WinRing = (props: WinRingProps) => {
  return (
    <div>
      <RingProgress
        size={150}
        label={
          <div>
            <Text align="center" size="md">
              {props.title}
            </Text>
            <Text color="blue" weight={700} align="center" size="xl">
              {props.per}%
            </Text>
          </div>
        }
        sections={[
          { value: props.per, color: "green" },
          { value: 100 - props.per, color: "orange" },
        ]}
      />
    </div>
  );
};
