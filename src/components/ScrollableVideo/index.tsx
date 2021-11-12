import { PropsWithChildren, useEffect, useRef } from 'react';

type Props = {
  speed?: number,
};

const ScrollableVideo = ({
  speed = 1,
  children
}: PropsWithChildren<Props>) => {
  if (speed <= 0){
    throw new Error("Speed cannot be less than or equal to 0");
  }

  const vid = useRef<HTMLVideoElement>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get current refs
    if (!vid.current || !container.current) throw new Error("Ref not found");
    const v = vid.current;
    const c = container.current;

    // Configure Speed
    const playbackConst = window.innerHeight * (1 / speed);
    let duration = playbackConst;
    let containerHeight = 0;
    
    // Add loadedmetadata listener
    v.addEventListener('loadedmetadata', () => {
      duration = v.duration;
      containerHeight = v.duration * playbackConst;
      c.style.height = `${containerHeight}px`;
    });
    
    // Register handler for updating frame
    const update = () => {
      var currentPixel = window.scrollY;
      var totalPixels = containerHeight - window.innerHeight;
      var pixelsPerSecond = totalPixels / duration;
      var currentTime =  currentPixel / pixelsPerSecond;
      v.currentTime = currentTime;
      window.requestAnimationFrame(update);
    };
    window.requestAnimationFrame(update);
  });

  return (
    <>
      <div ref={container} />
      <video
        ref={vid}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        {children}
      </video>
    </>
  );
};

export default ScrollableVideo;