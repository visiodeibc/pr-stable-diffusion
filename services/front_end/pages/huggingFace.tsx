import * as React from "react";
import { useState } from "react";
import { Image } from "mui-image";
import { HfInference } from "@huggingface/inference";
import {
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type IMAGE = {
  url: string;
  img: File;
};

export default function Home() {
  const [prompt, setPrompt] = useState<string | null>();
  const [processedImg, setProcessedImg] = useState<string | null>();
  const [processing, setProcessing] = useState<boolean>(false);
  const inference = new HfInference(process.env.HUGGING_FACE_TOKEN);

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPrompt(event.target.value);

  const req = async () => {
    try {
      setProcessing(true);
      setProcessedImg(null);
      if (prompt) {
        const res = await inference.textToImage({
          model: "stabilityai/stable-diffusion-2",
          inputs: prompt,
          parameters: {
            negative_prompt: "blurry",
          },
        });
        setProcessedImg(URL.createObjectURL(res as Blob));
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finished");
      setProcessing(false);
    }
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
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h5">Hugginface Inference JS</Typography>
          <Typography variant="body2">
            Source : https://huggingface.co/docs/huggingface.js/index
          </Typography>
        </Paper>
        <Stack
          sx={{
            alignItems: "center",
            p: 2,
          }}
        >
          <TextField
            fullWidth
            variant="standard"
            label="write your prompt here..."
            onChange={inputChange}
            sx={{ py: 2 }}
          />
          {processedImg ? (
            <Box
              sx={{
                m: 1,
                width: "20vh",
                height: "20vh",
              }}
            >
              <Image
                src={processedImg}
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
              {processing ? <CircularProgress /> : "Created Image"}
            </ButtonBase>
          )}
        </Stack>
        <Button variant="contained" onClick={req}>
          Process
        </Button>
      </Paper>
    </Container>
  );
}
