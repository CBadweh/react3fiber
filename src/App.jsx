import {Canvas, useFrame} from '@react-three/fiber'
import './App.css'
import {useRef} from 'react'

const Cube = ({position, size, color}) => {

  // Animation 
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.x += delta 
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2
  
  })


  //  Box Geometry 
  return (
    <mesh position = {position} ref= {ref}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
    </mesh>

  )
}


const App = () => {
  return (
    <Canvas>
      <directionalLight position = {[0, 0, 2]} />
      <ambientLight intensity={0.1} />

      {/*  User define component <Cube/> with its props: position, color, and size to pass to the components */}
      <Cube position={[1,0, 0]} color = {"green"} size={[1, 1, 1]} />     

    </Canvas>
  )
}

export default App
