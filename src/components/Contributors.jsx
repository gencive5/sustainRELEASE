import '../style.css'
import sanityImg from '../assets/images/sanity.png'
import gencive5Img from '../assets/images/gencives.png'
import rwImg from '../assets/images/rw.png'
import {useState} from 'react'

export default function Contributors() {

const items = [ 
  {id: 1, label: "sanity (@sanity_musik)", img: sanityImg},
  {id: 2, label: "gencives (@gencive5)", img: gencive5Img},
  {id: 3, label: "roger white", img: rwImg}, 
]

const [activeId, setActiveId] = useState(null)

const activeItem = items.find (i => i.id === activeId)

const handleTap = (id) => setActiveId(prev => (prev === id ? null : id))

return <>
<div className="hover-img">
   {activeItem && <img src={activeItem.img} alt={activeItem.label}/>}
</div>

<ul className="text-about">
  {items.map(item =>(
    <li
      key={item.id}
      onMouseEnter={() => setActiveId(item.id)}
      onMouseLeave={() => setActiveId(null)}
      onClick={() => handleTap(item.id)}
    >{item.label}</li>
  )
  )}
</ul>


</>
}



