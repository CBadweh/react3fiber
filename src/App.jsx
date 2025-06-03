import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
// import './App.css'  // Assuming you have some styles in App.css

const Cube = ({ running }) => {
  // Cube Component   
  const ref = useRef()  // To update box position
  const timerRef = useRef(0) // For pause/resume functionality

  useFrame((state, delta) => {
    if (!running) return;  // Skip animation if not running  
    timerRef.current += delta;  // Advance custom timer only when running  
    ref.current.position.x = Math.sin(timerRef.current) * 2; // Use custom timer instead of elapsedTime to avoid jump on resume
  });
    

  return (
      <mesh position = {[0,0, 0]} ref={ref}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    )
  }

const App = () => {
  // Button State for Start/Pause Animation
  const [running, setRunning] = useState(false)

  return (
    <>
      {/* Render Start/Pause Button */}
      <button onClick={() => setRunning(!running)}>
        {running ? 'Pause' : 'Start'} Animation
      </button>

      {/* // r3f Canvas for animation */}
      <Canvas>
        <directionalLight position={[0, 0, 2]} />
        <ambientLight intensity={0.1} />
        <Cube running={running} />
      </Canvas>
    </>
  )
}

export default App
