import React, { useRef } from 'react'
import { gsap } from '../animations/gsap'
import { useGSAP } from '@gsap/react';

const Middle = () => {
    return (
        <div className='w-full flex flex-col items-start justify-start text-5xl mx-auto z-20 overflow-hidden'>
            <div className='relative bg-[#2E3532] h-[300vh] w-full'>
                <SnakePath />

                <h1 className='text-5xl text-white text-center'>
                    Heading goes here
                </h1>
            </div>
        </div>
    )
}

export default Middle

export const SnakePath = () => {
    const circleRef = useRef<SVGCircleElement | null>(null)
    const pathRef = useRef<SVGPathElement | null>(null)
    const trailRef = useRef<SVGPathElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)

    useGSAP(() => {
        const path = pathRef.current
        const trail = trailRef.current
        const circle = circleRef.current

        if (!path || !trail || !circle) return

        const pathLength = path.getTotalLength()

        // Apply stroke dash setup
        gsap.set(trail, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
        })

        // Circle moves along the path
        gsap.to(circle, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
            },
            motionPath: {
                path: path,
                align: path,
                alignOrigin: [0.5, 0.5],
                autoRotate: false,
            },
            ease: 'none',
        })

        // Thin trail appears behind the circle
        gsap.to(trail, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
            },
            strokeDashoffset: 0, 
            ease: 'none',
        })
    }, {scope: containerRef})

    return (
        <div ref={containerRef} className="absolute top-0 w-full h-full z-1">
            <svg
                className="w-full h-full max-w-[1500px] mx-auto"
                viewBox="0 0 797 822"
                preserveAspectRatio="xMidYMid meet"
                fill="none"
            >
                {/* Back path — full width */}
                <path
                    ref={pathRef}
                    d="M150.097 12C223.097 12 517.597 48.8044 517.597 81.9996C517.597 127 -93.9024 123.5 28.0973 197C150.097 270.5 1106.9 427.232 671.097 634C534.097 699 217.098 725.5 225.098 865"
                    stroke="url(#white_gradient)"
                    strokeWidth="7"
                    strokeLinecap="round"
                />
                {/* Define gradient for the path */}
                <defs>
                    <linearGradient id="white_gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.05" />
                        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
                    </linearGradient>
                </defs>

                {/* Animated thin trail path */}
                <path
                    ref={trailRef}
                    d="M150.097 12C223.097 12 517.597 48.8044 517.597 81.9996C517.597 127 -93.9024 123.5 28.0973 197C150.097 270.5 1106.9 427.232 671.097 634C534.097 699 217.098 725.5 225.098 865"
                    stroke="#C8BFFF"
                    strokeWidth="7"
                    strokeLinecap="round"
                />

                {/* Circle that moves on scroll */}
                <circle
                    ref={circleRef}
                    cx="14.5117"
                    cy="14.5117"
                    r="4.8838"
                    fill="white"
                    stroke="#C8BFFF"
                    strokeWidth="4.25587"
                />
            </svg>
        </div>
    )
}
