import React, { useRef, useEffect  } from "react";
import { useFrame } from "@react-three/fiber";

const Cube = ({ running, onUpdate, velocity, initialPosition   }) => {

    const ref = useRef();                // Reference to the mesh for updating position
    const positionRef = useRef(initialPosition); // Current x position
    const animationTimeRef = useRef(0);

    // This will be used to track the last time we sent an update to the parent component
    const lastSampleTimeRef = useRef(0); // Last time we sent an update to parent
    const sampleInterval = 0.1;          // Minimum time interval (seconds) between updates

      // Reset position when initialPosition changes (optional)
    useEffect(() => {
        positionRef.current = initialPosition;
        if (ref.current) {
        ref.current.position.x = initialPosition;
        }
    }, [initialPosition]);

    
    useFrame((state, delta) => {
    if (!running) return;

    animationTimeRef.current += delta; // increment only while running
    positionRef.current += velocity * delta; // Update position based on velocity and delta time dX = v*dt
    ref.current.position.x = positionRef.current;

    if (animationTimeRef.current - lastSampleTimeRef.current >= sampleInterval) {
        lastSampleTimeRef.current = animationTimeRef.current;
        onUpdate(animationTimeRef.current, positionRef.current);
    }
    });


  return (
    <mesh position={[0, 0, 0]} ref={ref}>
      <boxGeometry args={[1, 6, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export default Cube;
