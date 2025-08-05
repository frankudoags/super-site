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
    // Scaling both gradient SVGs
    gsap.to([pinkRef.current, darkRef.current], {
      scale: 1.0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'top 50%',
        scrub: true,
      },
      transformOrigin: 'center center',
      ease: "sine.inOut",
    });

    // Morphing both paths
    gsap.to(pinkPathRef.current, {
      duration: 0.5,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        end: 'top 20%',
        scrub: true,
      },
      height: "100vh",
      morphSVG: {
        shape:
          "M720.5 142C193.5 142 177.5 0 -549 0H1990C1262 0 1247.5 142 720.5 142Z",
      },
      ease: "sine.inOut",
      y: "-40vh",
      markers: true,
    });

    // Morphing both paths
    gsap.to(darkPathRef.current, {
      duration: 0.5,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true,
      },
      height: "100vh",
      morphSVG: {
        shape:
          "M722 109C170.5 109 210.5 0 -429 0H1870C1204 0 1273.5 109 722 109Z",
      },
      ease: "sine.inOut",
      y: "-40vh",
      markers: true,
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className='relative bg-[#F8F7F5] h-[100vh] w-full overflow-hidden'>
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
      className='absolute top-0 w-[100vw] h-[100vh] scale-[180%]'
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_2_28104)">
        <path
          ref={pathRef}
          d="M720.5 778C1150 778 1548.5 -207.5 1990 -436H-549C-205.5 -239.5 291 778 720.5 778Z"
          fill="url(#paint0_linear_2_28104)"
        />
      </g>
      <defs>
        <filter id="filter0_f_2_28104" x="-733" y="0" width="2907" height="1582" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="92" result="effect1_foregroundBlur_2_28104" />
        </filter>
        <linearGradient
          id="paint0_linear_2_28104"
          x1="720.5"
          y1="448"
          x2="720.5"
          y2="1398"
          gradientUnits="userSpaceOnUse"
        >
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
    className='absolute top-0 w-[100vw] h-[100vh] scale-[150%]'
    width="1440"
    height="546"
    viewBox="0 0 1440 546"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_f_2_28105)">
      <path
        ref={pathRef}
        d="M720.5 583C1272 583 1230.5 -156 1870 -156H-429C237 -156 169 583 720.5 583Z"
        fill="url(#paint0_linear_2_28105)"
      />
    </g>
    <defs>
      {/* <filter id="filter0_f_2_28105" x="-529" y="0" width="2499" height="939" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="44" result="effect1_foregroundBlur_2_28105" />
            </filter> */}
      <linearGradient
        id="paint0_linear_2_28105"
        x1="720.5"
        y1="338.992"
        x2="720.5"
        y2="1199"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.077751" stopColor="#2E3532" />
        <stop offset="0.309881" stopColor="#2E3532" />
      </linearGradient>
    </defs>
  </svg>
);
