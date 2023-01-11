import {
  Card,
  Group,
  Text,
  Badge,
  Image,
  Button,
  AppShell,
  Header,
  Grid,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

import marketGarden from "../assets/market-garden.jpg";
import malayanCampaign from "../assets/malayan.jpg";
import moroRiver from "../assets/moro-river.jpg";
import mortainBattle from "../assets/mortain.jpg";
import firstAlamein from "../assets/first-alamein.jpg";

export interface AppCardProps {
  img: string;
  title: string;
  route: string;
  status: string;
  children?: string;
}

export const AppCard = (props: AppCardProps) => {
  const navigate = useNavigate();
  return (
    <Card
      style={{ maxWidth: "30vw" }}
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Image src={props.img} height={160} alt="Norway" />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{props.title}</Text>
        <Badge color="pink" variant="light">
          {props.status}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {props.children}
      </Text>

      <Button
        disabled={props.status != "Done"}
        onClick={() => navigate(props.route)}
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
      >
        Jump to {props.title}
      </Button>
    </Card>
  );
};
export const Home = (props: {}) => {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <h1 style={{ margin: 0 }}>Battle Card Series: Analysis Tools</h1>
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
      <Grid>
        <Grid.Col span={4}>
          <AppCard
            img={marketGarden}
            title="Market Garden"
            status="Done"
            route="/market-garden"
          >
            With Fjord Tours you can explore more of the magical fjord
            landscapes with tours and activities on and around the fjords of
            Norway
          </AppCard>
        </Grid.Col>
        <Grid.Col span={4}>
          <AppCard
            img={moroRiver}
            title="Moro River"
            status="Pending"
            route="/moro-river"
          >
            With Fjord Tours you can explore more of the magical fjord
            landscapes with tours and activities on and around the fjords of
            Norway
          </AppCard>
        </Grid.Col>
        <Grid.Col span={4}>
          <AppCard
            img={mortainBattle}
            title="Mortain"
            status="Pending"
            route="/mortain"
          >
            With Fjord Tours you can explore more of the magical fjord
            landscapes with tours and activities on and around the fjords of
            Norway
          </AppCard>
        </Grid.Col>
        <Grid.Col span={4}>
          <AppCard
            img={malayanCampaign}
            title="Malayan Campaign: 1941"
            status="Pending"
            route="/malayan"
          >
            With Fjord Tours you can explore more of the magical fjord
            landscapes with tours and activities on and around the fjords of
            Norway
          </AppCard>
        </Grid.Col>
        <Grid.Col span={4}>
          <AppCard
            img={firstAlamein}
            title="First Alamein"
            status="Pending"
            route="/first-alamein"
          >
            With Fjord Tours you can explore more of the magical fjord
            landscapes with tours and activities on and around the fjords of
            Norway
          </AppCard>
        </Grid.Col>
      </Grid>
    </AppShell>
  );
};