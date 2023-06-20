import * as React from "react";
import { Box, Button, ButtonBase, Stack, Typography } from "@mui/material";

export default function Example() {
  return (
    <Box
      sx={{
        flex: 1,
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        "& button": { m: 1 },
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Stable Diffusion</Typography>
        <Stack
          direction="row"
          sx={{
            justifyContent: "center",
            p: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              color: "text.primary",
            }}
            color="error"
          >
            btn1
          </Button>
          <Button variant="contained" sx={{ color: "text.secondary" }}>
            btn2
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
