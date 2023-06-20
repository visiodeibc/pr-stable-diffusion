import * as React from "react";
import { Box, Button, Stack } from "@mui/material";

export default function Example() {
  return (
    <Box
      sx={{
        flex: 1,
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Stack
        direction="row"
        sx={{
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            color: "text.primary",
            bgcolor: "text.secondary",
          }}
        >
          Contained
        </Button>
        <Box
          sx={{
            color: "text.primary",
          }}
          margin={3}
        >
          Before
        </Box>
        <Box sx={{ color: "text.primary" }} margin={3}>
          After
        </Box>
      </Stack>
    </Box>
  );
}
