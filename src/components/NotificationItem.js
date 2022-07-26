import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";

export function NotificationItem({ title, content }) {
  return (
    <Box>
      <Typography component="h3" variant="body2" fontSize="20px" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Box>
        <Typography variant="body1" component="p" sx={{ whiteSpace: "normal" }} gutterBottom>
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
          unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate
          numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
      </Box>
    </Box>
  );
}
