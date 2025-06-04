import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

const Cube = ({ running, velocity, initialPosition, onUpdate }) => {

  const ref = useRef(); // Reference to the 3D mesh for updating position
  const currentPositionRef = useRef(initialPosition); // Ref to hold the current x position of the cube (mutable state)
  const elapsedRunningTimeRef = useRef(0); // Ref to hold total elapsed time while animation is running (used for plotting)
  
  const lastSampleTimeRef = useRef(0); // Ref to store last time update was sent to parent (for throttling)
  const sampleInterval = 0.1; // Minimum interval between sending updates (in seconds)

  /**
   * Sync internal position and mesh position if initialPosition prop changes.
   * This allows the cube to jump smoothly to a new starting position if the user changes it.
   */
  useEffect(() => {
    currentPositionRef.current = initialPosition;
    if (ref.current) {
      ref.current.position.x = initialPosition;
    }
  }, [initialPosition]);

  /**
   * Animation frame update function:
   * - Runs only when animation is running
   * - Updates elapsed running time and position incrementally based on velocity and delta time
   * - Updates the mesh position accordingly
   * - Sends throttled updates to the parent component for plotting
   */
  useFrame((state, delta) => {
    if (!running) return;

    // Increment elapsed running time only while running (used for plotting)
    elapsedRunningTimeRef.current += delta;

    // Increment position based on current velocity and elapsed time since last frame
    currentPositionRef.current += velocity * delta;

    // Update the mesh position in the 3D scene
    ref.current.position.x = currentPositionRef.current;

    // Send update to parent if enough time has passed since last update
    if (elapsedRunningTimeRef.current - lastSampleTimeRef.current >= sampleInterval) {
      lastSampleTimeRef.current = elapsedRunningTimeRef.current;
      onUpdate(elapsedRunningTimeRef.current, currentPositionRef.current);
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
