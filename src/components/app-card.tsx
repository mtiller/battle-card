import { Card, Image, Text, Button, Group, Badge } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export interface AppCardProps {
  img: string;
  title: string;
  route: string;
  status: "Done" | "Underway" | "Pending";
  children?: string;
}

export const AppCard = (props: AppCardProps) => {
  const navigate = useNavigate();
  return (
    <Card
      style={{
        maxWidth: "30vw",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
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

      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Text style={{ flexGrow: 1 }} size="sm" color="dimmed">
          {props.children}
        </Text>
        <Button
          disabled={props.status != "Done" && props.status != "Underway"}
          onClick={() => navigate(props.route)}
          variant="light"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
        >
          Jump to {props.title}
        </Button>
      </div>
    </Card>
  );
};
