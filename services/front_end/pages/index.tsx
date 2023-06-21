import * as React from "react";
import { useRef, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

type IMAGE = {
  url: string;
  img: File;
};

export default function Home() {
  const imageInput = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<IMAGE>();

  const handleImagesAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imagesUploaded = event.target.files as FileList;
    setImg({
      url: URL.createObjectURL(imagesUploaded[0]),
      img: imagesUploaded[0],
    });
  };

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
          <Button variant="contained" color="error">
            btn1
          </Button>
          <Button variant="contained">btn2</Button>
        </Stack>
      </Box>
    </Box>
  );
}
