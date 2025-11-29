import { Box, Typography } from "@mui/material";
import Image from "next/image";

const Timelines = () => {
  const items = [
    {
      id: "1",
      label:
        "Cross-platform: Access and manage your tasks from any device, anywhere, in perfect sync.",
      image: "/cross-platform.png",
    },
    {
      id: "2",
      label:
        "Team Collaboration: Unify your team's work and communication in a single, visual workspace.",
      image: "/team-collaboration.png",
    },
    {
      id: "3",
      label:
        "Personal Tasks: Organize your life and focus on what's next with a personal productivity hub.",
      image: "/personal-devt.png",
    },
    {
      id: "4",
      label:
        "Agile Sprint: Visualize your sprint workflow from backlog to done with seamless agility.",
      image: "/agile-sprint.png",
    },
    {
      id: "5",
      label:
        "Project Management: Bring clarity and momentum to your projects with intuitive visual planning.",
      image: "/professional-devt.png",
    },
  ];
  return (
    <Box component="ol">
      {items.map((item) => (
        <Box component="li" key={item.id}>
          <Box component="span" sx={{ borderRadius: "100%" }} />
          <Box>
            <Typography>{item.label}</Typography>
          </Box>
          <Image
            src={`${item.image}`}
            alt={`${item.label}`}
            width={320}
            height={748}
          />
        </Box>
      ))}
    </Box>
  );
};

export default Timelines;
