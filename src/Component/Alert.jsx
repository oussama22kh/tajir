import { Box, Container, List, Typography, IconButton } from "@mui/material";
import { useUser } from "../contexts/usercontext";
import ClearIcon from "@mui/icons-material/Clear";
import Appbar from "./Appbar";

const statusStyles = {
  success: { backgroundColor: "#d4edda" }, // Light green
  warning: { backgroundColor: "#fff3cd" }, // Light yellow
  question: { backgroundColor: "#d1ecf1" }, // Light blue
  danger: { backgroundColor: "#f8d7da" }, // Light red
  error: { backgroundColor: "#f5c6cb" }, // Lighter red
  default: { backgroundColor: "#ffffff" }, // White
};
export default function Alert() {
  const { alerts, deletealert } = useUser();

  const handledelete = (notification_id) => {
    deletealert(notification_id);
  };

  return (
    <>
      <Appbar />
      <Container maxWidth="lg" sx={{ height: "90vh", marginTop: "15vh" }}>
        <Typography variant="h4" sx={{ margin: 5 }}>
          Notifications
        </Typography>
        <List>
          {alerts.map((item, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: "8px",
                boxShadow: 3,
                p: 2,
                my: 2,
                display: "flex",
                justifyContent: "space-between",
                ...(statusStyles[item.status] || statusStyles.default),
              }}
            >
              <Box>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2">{item.body}</Typography>
              </Box>
              <Box>
                <IconButton onClick={() => handledelete(item.id)}>
                  <ClearIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </List>
      </Container>
    </>
  );
}
