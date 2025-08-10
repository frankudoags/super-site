import { gsap } from "gsap";
    
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(MotionPathPlugin,MorphSVGPlugin,ScrollTrigger, useGSAP);

export { gsap, useGSAP};
