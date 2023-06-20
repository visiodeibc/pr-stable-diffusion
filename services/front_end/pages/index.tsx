import Image from "next/image";
import { useRef, useState } from "react";

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
    <main className="flex min-h-screen flex-col items-center p-14">
      <input
        accept="image/*"
        type="file"
        ref={imageInput}
        onChange={handleImagesAdded}
        className="transparent absolute top-0 left-0 w-0 h-0"
      />
      <div className="relative w-4/5 items-center text-center my-10">
        <h1 className="text-4xl font-mono">Stable Diffusion</h1>
        <div className="flex justify-evenly py-6">
          <div
            className="box-border border-dotted border-4 p-4 mx-2 border-indigo-600 text-indigo-600"
            onClick={() => imageInput?.current?.click()}
          >
            Before
          </div>
          <div
            className="box-border border-dotted border-4 p-4 mx-2 border-indigo-600 text-indigo-600"
            onClick={() => {
              console.log("after clicked");
            }}
          >
            After
          </div>{" "}
        </div>
        <button className="rounded-full bg-blue-400 p-3">Upload</button>
        <h1 className="text-m mt-4 font-mono">
          maybe something from backend...
        </h1>
      </div>
    </main>
  );
}
