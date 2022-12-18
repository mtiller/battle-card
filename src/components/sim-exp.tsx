import { Paper, Text } from "@mantine/core";

export const SimulatorExplanation = (props: {}) => {
  return (
    <Paper shadow="xs" p="md">
      <p>
        <Text>
          The simulator functions by running 10,000 games using a representative
          playing strategy. We can then collect statistics on the outcome of
          these games and/or view the game report for each game.{" "}
        </Text>
      </p>
      <Text>
        Note that there are several things you can change here. The first is the
        random number generator seed. For any given seed, we will always
        generate the exact some set of outcomes. But by changing the seed, we
        can create different sets of 10,000 games to examine. I'm not sure this
        is useful, because 10,000 seems to be more than enough games to draw
        statistical conclusions (and we can run more, it just doesn't seem
        necessary).
      </Text>
    </Paper>
  );
};
