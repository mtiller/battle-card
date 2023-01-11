import { AppShell, Header, Navbar } from "@mantine/core";
import { SimulatorExplanation } from "../components/sim-exp";
import { Simulator } from "../components/simulator";

export interface HomeProps {}

export const Home = (props: HomeProps) => {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          <SimulatorExplanation />
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <h1 style={{ margin: 0 }}>Battle Card: Market Garden, 1944</h1>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Simulator />
    </AppShell>
  );
};
