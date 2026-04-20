import React from 'react'
import Highlighttext from './Highlighttext'
import img1 from '../../../assests/7211597-most-popular-naruto-wallpaper-hd-for-desktop-full-hd-1080p-for-pc-desktop-best-naruto-wallpaper-naruto-wallpaper-wallpaper-naruto-shippuden.jpg'
import img2 from '../../../assests/9672612-akatsuki-naruto-desktop-wallpaper-r.jpg'
import img3 from '../../../assests/9672621-naruto-desktop-wallpaper-4k.png'
const Learninglanguage = () => {
  return (
    <div className="mt-32">
      <div className="flex flex-col gap-5">
        <div className="text-4xl text-center font-semibold">
          <h1 className="inline-block"> My Life</h1>
          <Highlighttext text={"KNOWLEDGE IS KEY TO SUCCESS"} />
        </div>

        <div className="text-center mx-auto text-zinc-700 text-base mt-3 font-medium w-[60%]">
          Lorem ipsum dolor, sit amet consectetucing elit. Nemo animi fuga
          ipsam, quisquam, eveniet nam consequuntur ex dolorem quibusdam vero
          odit voluptatibus modi atque minima iste veniam perferendis, alias
          exercitationem?
        </div>

        <div className="flex flex-row items-center justify-center mt-10">
          <img src={img1} className="object-contain w-[30%] h-60"></img>

          <img src={img2} className="object-contain w-[30%] h-60 "></img>

          <img src={img3} className="object-contain w-[30%] h-60 ml-4"></img>
        </div>
      </div>
    </div>
  );
}

export default Learninglanguage
