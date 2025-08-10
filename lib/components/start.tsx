import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';
import { gsap } from '../animations/gsap';

const Start = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pinkRef = useRef<SVGSVGElement>(null);
    const darkRef = useRef<SVGSVGElement>(null);
    const pinkPathRef = useRef<SVGPathElement>(null);
    const darkPathRef = useRef<SVGPathElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: {
                ease: "power1.inOut",
            },
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                pin: true,
            },
        });
        tl
            .to(pinkPathRef.current, {
                morphSVG: {
                    shape:
                        "M720.5 100C169 100 10.5 839 -429 839H1870C1204 839 1272 100 720.5 100Z",
                },
                y: 0,
            })
            .to(darkPathRef.current, {
                morphSVG: {
                    shape:
                        "M720.5 100C169 100 210.5 839 -429 839H1870C1204 839 1272 100 720.5 100Z",
                },
                y: 0,
            }, "<")
            .to([pinkRef.current, darkRef.current], {
                scale: 1.7,
                transformOrigin: 'center center',
            })
    }, []);

    return (
        <div ref={containerRef} className='relative bg-[#F8F7F5] h-[100vh] w-full overflow-hidden'>
            <PinkGradient svgRef={pinkRef} pathRef={pinkPathRef} />
            <DarkGradient svgRef={darkRef} pathRef={darkPathRef} />
        </div>
    );
};

export default Start;

export const PinkGradient = ({ svgRef, pathRef }: { svgRef: React.RefObject<SVGSVGElement | null>, pathRef: React.RefObject<SVGPathElement | null> }) => {
    return (
        <svg
            ref={svgRef}
            className='absolute bottom-0 w-[100vw] h-[100vh]'
            fill="none"
        >
            <g filter="url(#filter0_f_2_28104)">
                <path
                    ref={pathRef}
                    className='svgg_1'
                    d="M720.5 0C193.5 0 177.5 142 -549 142H1990C1262 142 1247.5 0 720.5 0Z"
                    fill="url(#paint0_linear_2_28104)"
                    transform="translate(0, 683)"
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
        className='absolute bottom-0 w-[100vw] h-[100vh]'
        width="1440"
        height="546"
        viewBox="0 0 1440 546"
        fill="none"
    >
        <g filter="url(#filter0_f_2_28105)">
            <path
                ref={pathRef}
                className='svgg_2'
                d="M722 0C170.5 0 210.5 109 -429 109H1870C1204 109 1273.5 0 722 0Z"
                transform="translate(0, 637)"
                fill="url(#paint0_linear_2_28105)"
            />
        </g>
        <defs>
            <filter id="filter0_f_2_28105" x="-529" y="0" width="2499" height="939" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="44" result="effect1_foregroundBlur_2_28105" />
            </filter>
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
