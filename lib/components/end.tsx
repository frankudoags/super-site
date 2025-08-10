import React, { useRef } from 'react';
import { gsap } from '../animations/gsap';
import { useGSAP } from '@gsap/react';

const End = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinkRef = useRef<SVGSVGElement>(null);
  const darkRef = useRef<SVGSVGElement>(null);
  const pinkPathRef = useRef<SVGPathElement>(null);
  const darkPathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'top 40%',
        scrub: true,
        pin: true,
        markers: true,
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className='relative bg-[#F8F7F5] h-[200vh] w-full overflow-hidden'>
      <PinkGradient svgRef={pinkRef} pathRef={pinkPathRef} />
      <DarkGradient svgRef={darkRef} pathRef={darkPathRef} />
    </div>
  );
};

export default End;

export const PinkGradient = ({ svgRef, pathRef }: { svgRef: React.RefObject<SVGSVGElement | null>, pathRef: React.RefObject<SVGPathElement | null> }) => {
  return (
    <svg
      ref={svgRef}
      className='absolute top-0 w-[100vw] h-[100vh]'
      width="1440" height="850" viewBox="0 0 1440 850" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_f_56_2686)">
        <path
          ref={pathRef}
          d="M720.5 778C1150 778 1548.5 -207.5 1990 -436H-549C-205.5 -239.5 291 778 720.5 778Z" fill="url(#paint0_linear_56_2686)" />
      </g>
      <defs>
        {/* <filter id="filter0_f_56_2686" x="-733" y="-620" width="2907" height="1582" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="92" result="effect1_foregroundBlur_56_2686" />
        </filter> */}
        <linearGradient id="paint0_linear_56_2686" x1="720.5" y1="514" x2="720.5" y2="-436" gradientUnits="userSpaceOnUse">
          <stop offset="0.077751" stopColor="#F1C0BA" />
          <stop offset="0.309881" stopColor="#F8F7F5" />
        </linearGradient>
      </defs>
    </svg>

  );
};



export const DarkGradient = ({ svgRef, pathRef }: { svgRef: React.RefObject<SVGSVGElement | null>, pathRef: React.RefObject<SVGPathElement | null> }) => (
  <svg
    ref={svgRef}
    className='absolute top-0 w-[100vw] h-[100vh]'
    width="1440" height="683" viewBox="0 0 1440 683" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_f_56_2687)">
      <path
        ref={pathRef}
        d="M720.5 583C1272 583 1230.5 -156 1870 -156H-429C237 -156 169 583 720.5 583Z"
         fill="url(#paint0_linear_56_2687)" />
    </g>
    <defs>
      <filter id="filter0_f_56_2687" x="-529" y="-256" width="2499" height="939" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="92" result="effect1_foregroundBlur_56_2687" />
      </filter>
      <linearGradient id="paint0_linear_56_2687" x1="720.5" y1="344.008" x2="720.5" y2="-516.001" gradientUnits="userSpaceOnUse">
        <stop offset="0.077751" stopColor="#2E3532" />
        <stop offset="0.309881" stopColor="#2E3532" />
      </linearGradient>
    </defs>
  </svg>

);
