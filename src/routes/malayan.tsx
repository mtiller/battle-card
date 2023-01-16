import { AppShell, Header, Navbar } from "@mantine/core";
import { MalayanMap } from "../malayan/components/map";
import { MalayanPlayer } from "../malayan/components/player";
import { MalayanProvider } from "../malayan/contexts/play";

export const PlayMalayan = (props: {}) => {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          Explanation
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <h1 style={{ margin: 0 }}>Battle Card: Malayan Campaign</h1>
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
