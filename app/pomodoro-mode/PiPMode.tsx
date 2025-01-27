'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/shadcn-ui/button';
import usePictureInPicture, { ExtendedHTMLVideoElement } from 'react-use-pip';
import { toPng } from 'html-to-image';

interface PiPModeProps {
  children: JSX.Element;
}

const PiPMode: React.FC<PiPModeProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<ExtendedHTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [canvasSize, setCanvasSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const {
    isPictureInPictureActive,
    isPictureInPictureAvailable,
    togglePictureInPicture,
  } = usePictureInPicture(videoRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const wrapper = wrapperRef.current;

    if (!canvas || !video || !wrapper) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Adjust canvas resolution for high-DPI displays
    const dpr = window.devicePixelRatio || 1;

    const updateCanvasSize = () => {
      const { width, height } = wrapper.getBoundingClientRect();
      setCanvasSize({
        width: width * dpr,
        height: height * dpr,
      });
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [children]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const wrapper = wrapperRef.current;

    if (!canvas || !video || !wrapper) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderToCanvas = async () => {
      try {
        const dataUrl = await toPng(wrapper);

        const img = new Image();
        img.src = dataUrl;

        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      } catch (error) {
        console.error('Error rendering to canvas:', error);
      }
    };

    // Call the rendering function initially
    renderToCanvas();

    // Set up the video stream from the canvas
    const stream = canvas.captureStream(30);
    video.srcObject = stream;
    console.log('Stream:', video.srcObject);

    // Continuously render frames to the canvas and update the stream
    const animate = () => {
      renderToCanvas();
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      video.srcObject = null; // Clean up the stream on component unmount
    };
  }, [canvasSize, children]);

  return (
    <>
      {isPictureInPictureAvailable && (
        <Button
          onClick={() => togglePictureInPicture(!isPictureInPictureActive)}
        >
          {isPictureInPictureActive ? 'Exit' : 'Enter'} Picture-in-Picture (PiP)
          Mode
        </Button>
      )}
      {/* Hidden wrapper for the JSX element */}
      <div ref={wrapperRef}>{children}</div>
      <video
        ref={videoRef as React.RefObject<HTMLVideoElement>}
        autoPlay
        muted
        style={{
          visibility: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      ></video>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          visibility: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      ></canvas>
    </>
  );
};

export default PiPMode;
