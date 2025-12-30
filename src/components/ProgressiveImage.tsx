import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
}

export function ProgressiveImage({ src, alt, className = '', placeholderSrc }: ProgressiveImageProps): JSX.Element {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImgSrc(src);
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <div className="relative overflow-hidden">
      <motion.img
        src={imgSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'blur-md scale-110' : 'blur-0 scale-100'} transition-all duration-700`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        loading="lazy"
        decoding="async"
        fetchpriority="auto"
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50 animate-shimmer" />
      )}
    </div>
  );
}
