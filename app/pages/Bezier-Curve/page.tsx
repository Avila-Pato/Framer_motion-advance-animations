"use client";
import React, { useEffect, useRef } from "react";
import styles from "./components/style.module.scss";

const BezierCurve = () => {
  const path = useRef<SVGPathElement>(null);
  const progressRef = useRef(0);
  const mouseXRef = useRef(0.5);
  const reqId = useRef<number>(0);
  const timeRef = useRef(Math.PI / 2);

  const setPath = (value: number) => {
    const width = window.innerWidth * 0.7; // largo de la linea
    path.current?.setAttributeNS(
      null,
      "d",
      `M 0 50 Q ${width * mouseXRef.current} ${50 + value} ${width} 50`, // curva bezier
    );
  };

  useEffect(() => {
    setPath(0);
    const handleResize = () => setPath(0);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const animateIn = () => {
    if (reqId.current) {
      cancelAnimationFrame(reqId.current);
      timeRef.current = Math.PI / 2;
    }
    setPath(progressRef.current);
    reqId.current = requestAnimationFrame(animateIn);
  };

  const animateOut = () => {
    const newProgress = progressRef.current * Math.sin(timeRef.current);
    setPath(newProgress);
    progressRef.current = lerp(progressRef.current, 0, 0.04);
    timeRef.current += 0.2;

    if (Math.abs(progressRef.current) > 0.5) {
      reqId.current = requestAnimationFrame(animateOut);
    } else {
      timeRef.current = Math.PI / 2;
      progressRef.current = 0;
    }
  };

  const resetAnimation = () => {
    cancelAnimationFrame(reqId.current);
    animateOut();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    mouseXRef.current = (e.clientX - rect.left) / rect.width;
    // ancho de la animacion de la linea al pasar mouse
    progressRef.current = (e.clientY - rect.top - rect.height / 2) * 1.5; 
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.line}>
          <div
            className={styles.box}
            onMouseEnter={animateIn}
            onMouseLeave={resetAnimation}
            onMouseMove={handleMouseMove}
          />
          <svg>
            <path ref={path} />
          </svg>
        </div>

        <div className={styles.description}>
          <p>Smart Development</p>
          <p>
            Combining unique design and rich technology, we build digital
            products exactly as they were designed, without shortcuts or
            simplifications.
          </p>
        </div>

        <div className={styles.tagsContainer}>
          <p>Areas</p>
          <div className={styles.tags}>
            <p>E-commerce</p>
            <p>Finance</p>
            <p>Education</p>
            <p>Social</p>
            <p>Entertainment</p>
            <p>Medicine</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BezierCurve;
