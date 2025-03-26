"use client";
import { useEffect, useRef } from "react";
import LeftSidebar from "@/components/LeftSidebar";
import Live from "@/components/Live";
import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/RightSidebar";
import fabric from "fabric";
import {
  handleCanvasMouseDown,
  handleResize,
  initializeFabric,
} from "@/lib/canvas";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas>(null);
  const isDrawing = useRef<boolean>(false);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>('rectangle');//set to rectangle for testing

useEffect(() => {
  if (!fabricRef.current) {
    const canvas = initializeFabric({ fabricRef, canvasRef });
    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        isDrawing,
        canvas,
        shapeRef,
        selectedShapeRef,
      });
    });
  }

  const handleResize = () => {
    if (fabricRef.current) {
      handleResize({ fabricRef });
    }
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
  return (
    <main className="h-screen overflow-hidden">
      <Navbar />
      <section className="flex h-full flex-row">
        <LeftSidebar />
        <Live canvasRef={canvasRef} />
        <RightSidebar />
      </section>
    </main>
  );
}
