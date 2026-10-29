import './style.css'
import { useState, lazy, Suspense  } from 'react'
import { Canvas } from '@react-three/fiber'
import logo from './assets/logo.png'

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
    <p className= "text-about">sustainRELEASE!
    Ce site né d'une volonté de ne pas laisser les cultures populaires et underground aux masses bourgeoise et ou commerciale, en créant un espace d'échange permettant de continuer de développer nos réseaux autodidactes , offrant l'opportunité de partager son travail quel qu'il soit a condition de ne promouvoir aucune forme de domination (sexiste,raciste,transphobe,homophobe,sociale)

    CONCRETEMENT
    Vous pouvez envoyer votre travail en format… et il apparaitra sur le visualiseur ou l' on peut retrouver toute vos publications
    mais également de la musique qui pourra etre diffusé en direct sur notre radio web ou l'on pourra aussi retrouver des podcasts de temps en temps 

    Toutes les publications sont vérifiées avant d'être publiées 
    Nous privilégions le travail de personnes autodidactes et ou hors parcours scolaire
    
    face à la violence de l'impérialisme colonial Occidental et americain organisons nous et renforcons les réseaux contestataires</p>
      <button onClick={() => setPanel('contributors')}>See contributors →</button>
      <button onClick={() => setPanel(null)}>← Back to radio</button>
    </div>
    </div>
    )}


{panel === 'contributors' && (
    <div className="modal-overlay" onClick={() => setShowContributors(false)}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
        <p className= "text-about">Sanity, gencive5, Roger White,</p>

      <button onClick={() => setPanel('about')}>See about →</button>
      <button onClick={() => setPanel(null)}>← Back to radio</button>
    
    </div>
    </div>
    )}


    </>
}

