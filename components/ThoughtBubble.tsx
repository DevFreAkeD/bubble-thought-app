import React from "react";

interface ThoughtBubbleProps {
  x: number;
  y: number;
  text: string;
}

const ThoughtBubble: React.FC<ThoughtBubbleProps> = ({ x, y, text }) => {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{ left: x, top: y, transform: "translate(-50%, -100%)" }}
    >
      <img
        src="/Bubble.png"
        alt="Thought Bubble"
        className="w-auto h-[30rem] object-contain"
      />
      <p className="absolute mt-[-2rem] text-black font-bold text-xl text-center w-[20rem]">
        {text}
      </p>
    </div>
  );
};

export default ThoughtBubble;
