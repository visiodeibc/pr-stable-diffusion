import * as React from "react";
import { useRef, useState } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Image } from "mui-image";

type IMAGE = {
  url: string;
  img: File;
};

export default function Home() {
  const imageInput = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<IMAGE>();

  const handleImagesAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imagesUploaded = event.target.files as FileList;
    setImg({
      url: URL.createObjectURL(imagesUploaded[0]),
      img: imagesUploaded[0],
    });
  };

  return (
    <Container
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        "& button": { m: 1 },
      }}
    >
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImagesAdded}
        style={{ display: "none" }}
      />
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Stable Diffusion</Typography>
        <Stack
          direction="row"
          sx={{
            justifyContent: "center",
            p: 2,
          }}
        >
          <ButtonBase
            sx={{
              width: "20vh",
              height: "20vh",
              border: 2,
              borderRadius: 5,
              borderStyle: "dotted",
              boxShadow: 3,
            }}
            disabled
          >
            {img ? (
              <Image
                src={img.url}
                alt={"uploaded image"}
                sx={{
                  borderRadius: 5,
                }}
              />
            ) : (
              "Uploaded Image"
            )}
          </ButtonBase>
          <ButtonBase
            sx={{
              width: "20vh",
              height: "20vh",
              border: 2,
              borderRadius: 5,
              borderStyle: "dotted",
              boxShadow: 3,
            }}
            disabled
          >
            Processed Image
          </ButtonBase>
        </Stack>
        <Button variant="contained" onClick={() => inputRef.current?.click()}>
          Upload
        </Button>
      </Paper>
    </Container>
  );
}
