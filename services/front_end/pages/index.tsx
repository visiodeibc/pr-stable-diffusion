import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-14">
      <div className="relative w-4/5 items-center text-center my-10">
        <h1 className="text-4xl font-mono">Stable Diffusion</h1>
        <div className="flex justify-evenly py-6">
          <div
            className="box-border border-dotted border-4 p-4 mx-2 border-indigo-600 text-indigo-600"
            onClick={() => {
              console.log("before clicked");
            }}
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
