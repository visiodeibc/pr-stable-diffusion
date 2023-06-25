import * as React from "react";
import { useRef, useState } from "react";
import { Image } from "mui-image";
import axios from "axios";
import {
  Box,
  Button,
  ButtonBase,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

type IMAGE = {
  url: string;
  img: File;
};

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<IMAGE>();
  const [processedImg, setProcessedImg] = useState<IMAGE>();

  const handleImagesAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imagesUploaded = event.target.files as FileList;
    setImg({
      url: URL.createObjectURL(imagesUploaded[0]),
      img: imagesUploaded[0],
    });
  };

  const submitImage = async () => {
    console.log("submitting image");
    const formData = new FormData();
    if (img) {
      formData.append("file", img.img);
    }
    const config = {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    };
    const result = await axios({
      method: "post",
      url: "http://localhost:5001/imgTransform",
      data: formData,
      headers: config,
      withCredentials: false,
    });
    setProcessedImg(result.data);
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
          {img ? (
            <Box
              sx={{
                m: 1,
                width: "20vh",
                height: "20vh",
              }}
            >
              <Image
                src={img?.url}
                alt={"uploaded image"}
                sx={{
                  borderRadius: 5,
                  boxShadow: 3,
                }}
              />
            </Box>
          ) : (
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
              Uploaded Image
            </ButtonBase>
          )}
          {processedImg ? (
            <Box
              sx={{
                m: 1,
                width: "20vh",
                height: "20vh",
              }}
            >
              <Image
                src={`data:image/jpeg;base64,${processedImg}`}
                alt={"uploaded image"}
                sx={{
                  borderRadius: 5,
                  boxShadow: 3,
                }}
              />
            </Box>
          ) : (
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
          )}
        </Stack>
        <Button variant="contained" onClick={() => inputRef.current?.click()}>
          Upload
        </Button>
        {img && (
          <Button variant="contained" onClick={submitImage}>
            Submit
          </Button>
        )}
      </Paper>
    </Container>
  );
}
