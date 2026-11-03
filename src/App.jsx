import './style.css'
import { useState, lazy, Suspense  } from 'react'
import { Canvas } from '@react-three/fiber'
import logo from './assets/logo.png'
import About from './components/About.jsx'
import Contributors from './components/Contributors.jsx'

const Experience = lazy(()=> import('./Visualizer.jsx'))

export default function App ()
{
    // modals
    const [panel, setPanel] = useState(null);

    return <>
     <Canvas
            gl={ { antialias: true}}
            style={{ position: 'relative', zIndex: 1 }} 
        >
        <Suspense fallback={null}>
        <Experience/>
        </Suspense>
    </Canvas>

    <img src={logo} alt="logo" className='logo-div'/>

    <p className="text-div">Vous pouvez envoyer une image qui sera intégrée au visualiseur</p>


    {/* modals */}
    <button className="button-about" onClick={() => setPanel('about')}>About</button>
    <button className="button-contributors" onClick={() => setPanel('contributors')}>Contributors</button>

{panel &&(
    <button className="button-close" onClick={() => setPanel(null)}>close</button>
    )}

{panel === 'about' && (
    <div className="modal-overlay" onClick={() => setPanel(null)}>
    <div className="modal-content" onClick={() => setPanel(null)}>
      <About/>   
      <button onClick={() => setPanel('contributors')}>See contributors →</button>
      <button onClick={() => setPanel(null)}>← Back to radio</button>
    </div>
    </div>
    )}


{panel === 'contributors' && (
    <div className="modal-overlay" onClick={() => setPanel(null)}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
        <Contributors/>

      <button onClick={() => setPanel('about')}>See about →</button>
      <button onClick={() => setPanel(null)}>← Back to radio</button>
    
    </div>
    </div>
    )}


    </>
}

