import './style.css'
import { useState, lazy, Suspense  } from 'react'
import { Canvas } from '@react-three/fiber'
import soundButton from './assets/grey.svg'
import logo from './assets/logo.png'

const Experience = lazy(()=> import('./Experience copy.jsx'))

export default function App ()
{
    const [muted, setMuted] = useState(true);
    const handleToggleMute = () => setMuted(current => !current);

    return <>
     <Canvas
            gl={ {
                antialias: true
            }}
             style={{ position: 'relative', zIndex: 1 }} 
        >
        <Suspense fallback={null}>
        <Experience muted={muted} />
        </Suspense>
    </Canvas>

    <img src={logo} alt="logo" className='logo-div'/>

    <button onClick={handleToggleMute} className="sound-btn">
        {muted ? "unmute" : "mute"}
        <img src={soundButton} alt="Sound" className={`sound-svg ${muted ? '' : 'unmuted'}`}/>
    </button>

    <p className="text-div">Vous pouvez envoyer une image qui sera intégrée au visualiseur</p>

    </>
}