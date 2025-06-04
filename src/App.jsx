import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";           // Import Cube component
import PositionChart from "./PositionChart"; // Your chart component

const App = () => {
  const [running, setRunning] = useState(false); // Controls animation state
  const [data, setData] = useState({ times: [], positions: [] }); // Stores data for chart

  const [velocity, setVelocity] = useState(1);
  const [initialPosition, setInitialPosition] = useState(0);
  

  // Receives updates from Cube and appends new data points
  const handleUpdate = (time, position) => {
    setData((prev) => ({
      times: [...prev.times, time],
      positions: [...prev.positions, position],
    }));
  };

  return (
    <>
      {/* Velocity input */}
      <input
        type="number"
        value={velocity}
        onChange={(e) => setVelocity(parseFloat(e.target.value) || 0)}
        step="2"
        style={{ marginBottom: "10px" }}
      />
      {/* Initial position input */}
      <input
        type="number"
        value={initialPosition}
        onChange={(e) => setInitialPosition(parseFloat(e.target.value) || 0)}
        step="0.1"
        style={{ marginBottom: "10px", marginLeft: "10px" }}
      />

      {/* Button to toggle animation */}
      <button onClick={() => setRunning(!running)}>
        {running ? "Pause" : "Start"} Animation
      </button>

      {/* 3D Canvas rendering the Cube */}
      <Canvas
          orthographic
          camera={{
            left: -10,   // left plane
            right: 10,   // right plane
            top: 10,     // top plane
            bottom: -10, // bottom plane
            near: 0.1,
            far: 1000,
            position: [0, 0, 10], // camera position in the scene
          }}
        >
        <directionalLight position={[0, 0, 2]} />
        <ambientLight intensity={0.1} />
          
        <Cube 
          running={running} 
          onUpdate={handleUpdate} 
          velocity={velocity}
          initialPosition={initialPosition}
        />
      </Canvas>

      {/* Chart displaying position vs time */}
      <PositionChart data={data} />
    </>
  );
};

export default App;
