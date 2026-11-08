import '../style.css'
import sanityImg from '../assets/images/sanity.png'
import gencive5Img from '../assets/images/gencives.png'
import rwImg from '../assets/images/rw.png'
import {useState} from 'react'

export default function Contributors() {

const items = [ 
  {id: 1, label: "sanity", handle: "@sanity_musik", url: "https://instagram.com/sanity_musik", img: sanityImg},  
  {id: 2, label: "gencives", handle: "@gencive5", url: "https://instagram.com/gencive5", img: gencive5Img},
  {id: 3, label: "roger white, ", img: rwImg}, 
]

const [activeId, setActiveId] = useState(null)

const activeItem = items.find (i => i.id === activeId)

const isMouse = (event) => event.pointerType === 'mouse'

const handleTap = (id) => setActiveId(prev => (prev === id ? null : id))

return <>
<div className="hover-img">
   {activeItem && <img src={activeItem.img} alt={activeItem.label}/>}
</div>

<ul className="text-contributors">
  {items.map(item =>(
    <li
      className="list-contributors"
      key={item.id}
      onPointerEnter={(event) => isMouse (event) && setActiveId(item.id)}
      onPointerLeave={(event) => isMouse (event) && setActiveId(null)}
      onClick={() => handleTap(item.id)}
    >{item.label}
     {item.handle && (
  <>
    {'\u00a0'}(
    <a href={item.url} target="_blank" rel="noopener noreferrer">
      {item.handle}
    </a>
    )
  </>
)}
{', '}
    </li>
  )
  )}
</ul>


</>
}



<a href="https://www.instagram.com/marie_gibert/?hl=en">@marie_gibert</a>