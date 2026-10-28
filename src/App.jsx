import './style.css'
import { useState, lazy, Suspense  } from 'react'
import { Canvas } from '@react-three/fiber'
import soundButton from './assets/grey.svg'
import logo from './assets/logo.png'

const Experience = lazy(()=> import('./Visualiser.jsx'))

export default function App ()
{
    // mute - unmute
    const [muted, setMuted] = useState(true);
    const handleToggleMute = () => setMuted(current => !current);

    // modals
    const [showAbout, setShowAbout] = useState(false);
    const [showContributors, setShowContributors] = useState(false);

    return <>
     <Canvas
            gl={ { antialias: true}}
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


    {/* modals */}
    
    <button className="button-about" onClick={() => setShowAbout(true)}>About</button>
    <button className="button-contributors" onClick={() => setShowContributors(true)}>Contributors</button>


    {showAbout && (
    <div className="modal-overlay" onClick={() => setShowAbout(false)}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
    
    </div>
    </div>
    )}

    {showContributors && (
    <div className="modal-overlay" onClick={() => setShowAbout(false)}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
    
    </div>
    </div>
    )}


    </>
}

