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

const [hoveredId, setHoveredId] = useState(null);

const hoveredItem = items.find (i => i.id === hoveredId)

return <>
<div className="hover-img">
   {hoveredItem && <img src={hoveredItem.img} alt={hoveredItem.label}/>}
</div>

<ul className="text-about">
  {items.map(item =>(
    <li
      key={item.id}
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={() => setHoveredId(null)}
    >{item.label}</li>
  )
  )}
</ul>


</>
}



