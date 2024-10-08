"use client"
import Image from "next/image";
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Scrollbar from 'smooth-scrollbar';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

useEffect(() => {
    // Initialize Smooth Scrollbar
    const scrollBar = Scrollbar.init(document.querySelector('.main'), {
      damping: 0.3,
      delegateTo: document,
      alwaysShowTracks: false,
      speed: 5,
    });

    // Set ScrollTrigger defaults
    ScrollTrigger.defaults({
      scroller: '.main',
    });

    // Create ScrollTrigger scroller proxy
    ScrollTrigger.scrollerProxy('.main', {
      scrollTop(value) {
        if (arguments.length) {
          scrollBar.scrollTop = value;
        }
        return scrollBar.scrollTop;
      },
    });

    // Update ScrollTrigger on scrollbar scroll
    scrollBar.addListener(ScrollTrigger.update);

    // Iterate over sections to change background and text color
    const sectionColor = document.querySelectorAll('[data-bgcolor]');
    sectionColor.forEach((colorSection, i) => {
      const prevBgColor = i === 0 ? '' : sectionColor[i - 1].dataset.bgcolor;

      ScrollTrigger.create({
        trigger: colorSection,
        scroller: '.main',
        start: 'top 50%',
        onEnter: () =>
          gsap.to('.main', {
            background: colorSection.dataset.bgcolor,
            overwrite: 'auto',
          }),
        onLeaveBack: () =>
          gsap.to('.main', {
            background: prevBgColor,
            overwrite: 'auto',
          }),
      });
    });

    // Cleanup function
    return () => {
      scrollBar.destroy();
      ScrollTrigger.killAll();
    };
  }, []); // Run effect only once

  return (
    <>
      <main className='main h-screen max-w-screen flex flex-col tracking-wider bg-gradient-to-t from-[#FFEFBA] to-[#FFFFFF]'>
        <section className='min-h-screen w-full' data-bgcolor="linear-gradient(to right, #FFEFBA, #FFFFFF)" id="hero">
          <Hero />
        </section>
        <section className='min-h-screen w-full' data-bgcolor="linear-gradient(to top, #FFFFFF, #FFEFBA)" id="about">
          <About />
        </section>
        <section className='min-h-screen w-full' data-bgcolor="linear-gradient(to right, #FFEFBA, #FFFFFF)" id="contact">
          <Contact />
        </section>
      </main>
      <Navbar/> 
    </>
  );
}
