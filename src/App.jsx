import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";           // Import Cube component
import PositionChart from "./PositionChart"; // Your chart component

const App = () => {
  const [running, setRunning] = useState(false); // Controls animation state
  const [data, setData] = useState({ times: [], positions: [] }); // Stores data for chart

  // Receives updates from Cube and appends new data points
  const handleUpdate = (time, position) => {
    setData((prev) => {
      const newTimes = [...prev.times, time];
      const newPositions = [...prev.positions, position];
      return { times: newTimes, positions: newPositions };
    });
  };

  return (
    <>
      {/* Button to toggle animation */}
      <button onClick={() => setRunning(!running)}>
        {running ? "Pause" : "Start"} Animation
      </button>

      {/* 3D Canvas rendering the Cube */}
      <Canvas>
        <directionalLight position={[0, 0, 2]} />
        <ambientLight intensity={0.1} />
        <Cube running={running} onUpdate={handleUpdate} />
      </Canvas>

      {/* Chart displaying position vs time */}
      <PositionChart data={data} />
    </>
  );
};

export default App;
