import base64
from io import BytesIO
from fastapi import FastAPI, Response, UploadFile
from fastapi.middleware.cors import CORSMiddleware

import torch
from diffusers import StableDiffusionImageVariationPipeline
from PIL import Image
from torchvision import transforms


# init fastapi
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# init model
device = "mps" if torch.backends.mps.is_available() else "cpu"
sd_pipe = StableDiffusionImageVariationPipeline.from_pretrained(
    "lambdalabs/sd-image-variations-diffusers",
    revision="v2.0",
)
sd_pipe = sd_pipe.to(device)

tform = transforms.Compose(
    [
        transforms.ToTensor(),
        transforms.Resize(
            (224, 224),
            interpolation=transforms.InterpolationMode.BICUBIC,
            antialias=False,
        ),
        transforms.Normalize(
            [0.48145466, 0.4578275, 0.40821073],
            [0.26862954, 0.26130258, 0.27577711],
        ),
    ]
)


@app.post("/imgTransform")
def imgTransform(file: UploadFile or None = None):
    image_data = file.file.read()
    pil_image = Image.open(BytesIO(image_data))
    inp = tform(pil_image).to(device).unsqueeze(0)
    result = sd_pipe(inp, guidance_scale=3).images[0]
    buffer = BytesIO()
    result.save(buffer, format="JPEG")
    result = base64.b64encode(buffer.getvalue())
    return Response(content=result, media_type="image/jpeg")
