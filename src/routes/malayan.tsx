import { AppShell, Header, Navbar } from "@mantine/core";
import { MalayanPlayer } from "../malayan/components/player";
import { MalayanProvider } from "../malayan/contexts/play";

export const PlayMalayan = (props: {}) => {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          This screen allows you to play the Malayan Campaign. There are only
          two real choices for the player. The first is whether to attack or
          defend in the frontline locations. The other decision is whether to
          retreat from those frontline locations after the battle.
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <h1 style={{ margin: 0 }}>Battle Card: Play Malayan Campaign</h1>
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
      <MalayanProvider>
        <MalayanPlayer />
      </MalayanProvider>
    </AppShell>
  );
};
