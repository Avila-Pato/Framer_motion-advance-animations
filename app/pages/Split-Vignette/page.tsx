"use client"
import Lenis from "lenis";
import React, { useEffect } from "react";
import { useSpring } from 'framer-motion'
import GalleryImg from "./components/Gallery";
import Description from "./components/description";

const projects = [
  {
    name: "Dyan Thank",
    handle: "dyanthank",
  },
  {
    name: "Leidinger Mathias",
    handle: "leidingermathias",
  },
  {
    name: "Mark Rammers",
    handle: "markrammers",
  },
  {
    name: "Landon Stoll",
    handle: "landonstoll",
  }
]

export default function Home() {
useEffect(() => {
  const lenis = new Lenis()

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
}, [])
  

   const spring = {
        stiffness: 150,
        damping: 15,
        mass: 0.1
    }

    const mousePosition = {
        x: useSpring(0, spring),
        y: useSpring(0, spring)
    }

    const mouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const { clientX, clientY } = e

        const targetX = clientX - (window.innerWidth / 2 * 0.25)
        const targetY = clientY - (window.innerHeight / 2 * 0.30)

        mousePosition.x.set(targetX)
        mousePosition.y.set(targetY)
    }


  return (
    <main className="container" onMouseMove={mouseMove}>
      {
       projects.map(({handle}, i) => {
        return <GalleryImg key={i} handle={handle} mousePosition={mousePosition} />
       })
      }
      <Description mousePosition={mousePosition} projects={projects} />
    </main>
  );
}
