import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Cube = ({ running, onUpdate }) => {
  const ref = useRef();                // Reference to the mesh for updating position
  const timerRef = useRef(0);          // Internal timer tracking elapsed animation time
  const lastSampleTimeRef = useRef(0); // Last time we sent an update to parent
  const sampleInterval = 0.1;          // Minimum time interval (seconds) between updates

  useFrame((state, delta) => {
    if (!running) return;              // Skip animation if paused

    timerRef.current += delta;         // Increment timer by frame time delta
    const x = Math.sin(timerRef.current) * 2; // Calculate new x-position (smooth oscillation)
    ref.current.position.x = x;        // Update cube position

    // Send data to parent only if sampleInterval seconds passed since last update
    if (timerRef.current - lastSampleTimeRef.current >= sampleInterval) {
      lastSampleTimeRef.current = timerRef.current; // Update last sample time
      onUpdate(timerRef.current, x);                  // Call parent's update function
    }
  });

  return (
    <mesh position={[0, 0, 0]} ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export default Cube;
