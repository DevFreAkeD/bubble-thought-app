"use client";

import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import {
  FaceDetector,
  FilesetResolver,
  Detection,
} from "@mediapipe/tasks-vision";
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
    const [faceDetector, setFaceDetector] = useState<FaceDetector | null>(null);
    const [detections, setDetections] = useState<Detection[]>([]);
    
    useEffect(() => {
      const initializeFaceDetector = async () => {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );
        const detector = await FaceDetector.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
        });
        setFaceDetector(detector);
      };
      initializeFaceDetector();
    }, []);
  
    useEffect(() => {
      if (!faceDetector || !webcamRef.current) return;
      const interval = setInterval(async () => {
        if (webcamRef.current?.video?.readyState === 4) {
          const video = webcamRef.current.video;
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;
          const detectionResults = faceDetector.detectForVideo(video, performance.now());
          const scaledDetections = detectionResults?.detections.map((detection) => ({
            ...detection,
            boundingBox: {
              originX: window.innerWidth - ((detection.boundingBox.originX / videoWidth) * window.innerWidth),
              originY: (detection.boundingBox.originY / videoHeight) * window.innerHeight,
              width: (detection.boundingBox.width / videoWidth) * window.innerWidth,
              height: (detection.boundingBox.height / videoHeight) * window.innerHeight,
            },
          }));
          setDetections(scaledDetections || []);
        }
      }, 100);
      return () => clearInterval(interval);
    }, [faceDetector]);
  
    return (
      <div className="relative w-screen h-screen bg-black flex items-center justify-center">
        <Webcam
          ref={webcamRef}
          className="absolute w-full h-full object-cover"
          videoConstraints={{ facingMode: "user" }}
          mirrored
        />
        {detections.map((detection, index) => (
          detection.boundingBox ? (
            <ThoughtBubble
              key={index}
              x={detection.boundingBox.originX - detection.boundingBox.width / 2}
              y={detection.boundingBox.originY - 50}
              text={randomThoughts[index % randomThoughts.length]}
            />
          ) : null
        ))}
      </div>
    );
  }