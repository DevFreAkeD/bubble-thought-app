"use client";

import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as blazeface from "@tensorflow-models/blazeface";
import ThoughtBubble from "./ThoughtBubble";

const randomThoughts = [
  "I need coffee...",
  "I'm a genius!",
  "Time to conquer the world!",
  "Cats are probably watching us...",
  "I should take a nap...",
  "What if I'm in a simulation?",
  "Pizza sounds amazing right now!",
  "Where did I put my keys?",
];

export default function CameraFeed() {
  const webcamRef = useRef<Webcam>(null);
  const [model, setModel] = useState<blazeface.BlazeFaceModel | null>(null);
  const [faces, setFaces] = useState<any[]>([]);

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
      const blazefaceModel = await blazeface.load();
      setModel(blazefaceModel);
    };
    loadModel();
  }, []);

  useEffect(() => {
    if (!model || !webcamRef.current) return;

    const detectFaces = async () => {
      if (webcamRef.current?.video?.readyState === 4) {
        const video = webcamRef.current.video;
        const predictions = await model.estimateFaces(video, false);

        const scaledFaces = predictions.map((prediction) => {
          const { topLeft, bottomRight } = prediction;
          const [x1, y1] = topLeft as [number, number];
          const [x2, y2] = bottomRight as [number, number];

          return {
            x: window.innerWidth - ((x1 / video.videoWidth) * window.innerWidth),
            y: (y1 / video.videoHeight) * window.innerHeight,
            width: ((x2 - x1) / video.videoWidth) * window.innerWidth,
            height: ((y2 - y1) / video.videoHeight) * window.innerHeight,
          };
        });

        setFaces(scaledFaces);
      }
      requestAnimationFrame(detectFaces);
    };

    detectFaces();
  }, [model]);

  return (
    <div className="relative w-screen h-screen bg-black flex items-center justify-center">
      <Webcam
        ref={webcamRef}
        className="absolute w-full h-full object-cover"
        videoConstraints={{ facingMode: "user" }}
        mirrored
      />
      {faces.map((face, index) => (
        <ThoughtBubble
          key={index}
          x={face.x - face.width / 2}
          y={face.y - 40}
          text={randomThoughts[index % randomThoughts.length]}
        />
      ))}
    </div>
  );
}
