import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";           // Cube component for 3D animation
import PositionChart from "./PositionChart"; // Chart to visualize position over time

const MAX_DATA_POINTS = 1000; // Limit stored data points to avoid performance issues

const App = () => {
  
  const [running, setRunning] = useState(false);    // State controlling animation running/paused
  const [data, setData] = useState({ times: [], positions: [] }); // State storing arrays of times and positions for plotting

  // Group velocity and initialPosition into one state object
  const [motionParams, setMotionParams] = useState({
    velocity: 1,
    initialPosition: 0,
  });
  

  // Callback to receive updates from Cube and store data for charting
  const handleUpdate = (time, position) => {
    setData((prev) => ({
      times: [...prev.times, time].slice(-MAX_DATA_POINTS),
      positions: [...prev.positions, position].slice(-MAX_DATA_POINTS),
    }));
  };

  // Helper to update velocity or initialPosition in motionParams
  const updateMotionParam = (param, value) => {
    setMotionParams((prev) => ({
      ...prev,
      [param]: value,
    }));
  };

  return (
    <>
      {/* Velocity input with label for accessibility */}
      <label>
        Velocity (m/s):{" "}
        <input
          type="number"
          value={motionParams.velocity}
          onChange={(e) => updateMotionParam("velocity", parseFloat(e.target.value) || 0)}
          step="1"
          style={{ marginBottom: "10px" }}
        />
      </label>

      {/* Initial position input */}
      <label style={{ marginLeft: "10px" }}>
        Initial Position (m):{" "}
        <input
          type="number"
          value={motionParams.initialPosition}
          onChange={(e) => updateMotionParam("initialPosition", parseFloat(e.target.value) || 0)}
          step="1"
          style={{ marginBottom: "10px" }}
        />
      </label>

      {/* Button to toggle animation running state */}
      <button
        onClick={() => setRunning(!running)}
        style={{ display: "block", marginTop: "10px", marginBottom: "10px" }}
      >
        {running ? "Pause" : "Start"} Animation
      </button>

      {/* 3D canvas rendering the Cube */}
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
          velocity={motionParams.velocity}
          initialPosition={motionParams.initialPosition}
          onUpdate={handleUpdate}
        />
      </Canvas>

      {/* Chart displaying position vs time */}
      <PositionChart data={data} />
    </>
  );
};

export default App;
