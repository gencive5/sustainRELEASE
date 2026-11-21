import '../style.css'
import sanityImg from '../assets/images/sanity.png'
import gencive5Img from '../assets/images/gencives.png'
import rwImg from '../assets/images/rw.png'
import {useState} from 'react'

export default function Contributors() {

const items = [ 
  {id: 1, label: "sanity", handle: "@sanity_musik", url: "https://instagram.com/sanity_musik", img: sanityImg},  
  {id: 2, label: "gencives", handle: "@gencive5", url: "https://instagram.com/gencive5", img: gencive5Img},
  {id: 3, label: "video-test", video: "https://www.youtube.com/embed/YaYwasi72K8", title: "Capybara eating half a watermelon"},
]

const [activeId, setActiveId] = useState(null)

const activeItem = items.find(i => i.id === activeId)

const isMouse = (event) => event.pointerType === 'mouse'

const handleTap = (id) => setActiveId(prev => (prev === id ? null : id))

return <>
<div className="hover-img">
   {activeItem?.video ? (
     <iframe
       src={activeItem.video}
       title={activeItem.title || activeItem.label}
       frameBorder="0"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       referrerPolicy="strict-origin-when-cross-origin"
       allowFullScreen
     />
   ) : activeItem?.img ? (
     <img src={activeItem.img} alt={activeItem.label}/>
   ) : null}
</div>

<ul className="text-contributors">
  {items.map(item =>(
    <li
      className="list-contributors"
      key={item.id}
      onPointerEnter={(event) => isMouse(event) && setActiveId(item.id)}
      onPointerLeave={(event) => isMouse(event) && setActiveId(null)}
      onClick={() => handleTap(item.id)}>

    {item.label}
    {item.handle && (
    <>
    {'\u00a0'}
    (<a href={item.url} target="_blank" rel="noopener noreferrer">{item.handle}</a>)
    </>
    )}
    {', '}
    </li>
  ))}
</ul>

</>
}