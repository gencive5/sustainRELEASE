import './style.css'
import { useState, lazy, Suspense  } from 'react'
import { Canvas } from '@react-three/fiber'
import blinkButton from './assets/slash1.svg'
import soundButton from './assets/grey.svg'
import logo from './assets/logo.png'

const Experience = lazy(()=> import('./Experience copy.jsx'))

export default function App ()
{
    const [blinkTrigger, setBlinkTrigger] = useState(false)

    const handleBlink = () => {
        setBlinkTrigger(prev => !prev)
        setTimeout(() => setBlinkTrigger(false), 100)
    }

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
        <Experience blinkTrigger={blinkTrigger} muted={muted} />
        </Suspense>
    </Canvas>

      <img src={logo} alt="logo" className='logo-div'/>
        <button className= "blink-btn" onClick={handleBlink}>
            <img src={blinkButton} alt="Blink" className='blink-svg'/>
 
        </button>
     
    <button onClick={handleToggleMute} className="sound-btn">
        {muted ? "unmute" : "mute"}
        <img src={soundButton} alt="Sound" className={`sound-svg ${muted ? '' : 'unmuted'}`}/>
    </button>

    <p className="text-div">Vous pouvez envoyer une image qui sera intégrée au visualiseur</p>

    </>
}