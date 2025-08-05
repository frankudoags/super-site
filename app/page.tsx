"use client";

import { initLenisWithGSAP } from "@/lib/animations/lenis";
import End from "@/lib/components/end";
import Middle from "@/lib/components/middle";
import Start from "@/lib/components/start";
import { Fragment, useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const lenis = initLenisWithGSAP();
    return () => {
      lenis?.destroy();
    };
  }, []);
  return (
    <Fragment>
      <Start />
      <Middle />
      <End />
    </Fragment>
  );
}
