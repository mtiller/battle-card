import { AppShell, Header, Grid } from "@mantine/core";

import marketGarden from "../assets/market-garden.jpg";
import malayanCampaign from "../assets/malayan.jpg";
import moroRiver from "../assets/moro-river.jpg";
import mortainBattle from "../assets/mortain.jpg";
import firstAlamein from "../assets/first-alamein.jpg";
import { AppCard } from "../components/app-card";

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
            Operation Market Garden was one of the largest Allied operations of
            the Second World War.
          </AppCard>
        </Grid.Col>
        <Grid.Col span={4}>
          <AppCard
            img={mortainBattle}
            title="Mortain"
            status="Underway"
            route="/mortain"
          >
            In August 1944, a few hundred men defended a hill near Mortain,
            France, against a massive German counterattack.
          </AppCard>
        </Grid.Col>
        <Grid.Col span={4}>
          <AppCard
            img={moroRiver}
            title="Moro River"
            status="Pending"
            route="/moro-river"
          >
            The Moro was fought in the area of the Moro River and the city of
            Ortona in Italy.
          </AppCard>
        </Grid.Col>
        <Grid.Col span={4}>
          <AppCard
            img={malayanCampaign}
            title="Malayan Campaign: 1941"
            status="Pending"
            route="/malayan"
          >
            After taking over military bases in Vietnam, Japanese troops under
            General Yamashita Tomoyuki invaded northern Malaya while Japanese
            aircraft bombed Singapore.
          </AppCard>
        </Grid.Col>
        <Grid.Col span={4}>
          <AppCard
            img={firstAlamein}
            title="First Alamein"
            status="Pending"
            route="/first-alamein"
          >
            The First Battle of El Alamein was a battle of the Western Desert
            campaign fought in Egypt.
          </AppCard>
        </Grid.Col>
      </Grid>
    </AppShell>
  );
};
