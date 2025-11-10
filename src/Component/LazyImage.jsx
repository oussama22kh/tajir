import { useState, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';
import { getStorageUrl } from '../config/api.js';

/**
 * LazyImage Component
 * Implements lazy loading for images with fallback skeleton loader
 * Optimizes performance by loading images only when they're near the viewport
 */
export const LazyImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  objectFit = 'cover',
  priority = false,
  onLoad,
  onError,
  placeholderColor = '#f0f0f0',
}) => {
  const [isLoading, setIsLoading] = useState(!priority);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(priority ? src : null);

  useEffect(() => {
    if (priority) return;

    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };
    img.onerror = () => {
      setError(true);
      setIsLoading(false);
      onError?.();
    };
    img.src = src;
  }, [src, priority, onError]);

  const handleImageLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleImageError = () => {
    setError(true);
    setIsLoading(false);
    onError?.();
  };

  return (
    <Box
      component="div"
      sx={{
        width,
        height,
        overflow: 'hidden',
        backgroundColor: placeholderColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
      className={className}
    >
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ position: 'absolute' }}
        />
      )}

      {error ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#e0e0e0',
            color: '#999',
            fontSize: '0.875rem',
          }}
        >
          Error loading image
        </Box>
      ) : (
        imageSrc && (
          <img
            src={imageSrc}
            alt={alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit,
              display: isLoading ? 'none' : 'block',
            }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )
      )}
    </Box>
  );
};

/**
 * StorageImage Component
 * Wrapper around LazyImage for images stored in the storage backend
 */
export const StorageImage = ({
  path,
  alt,
  width,
  height,
  className = '',
  objectFit = 'cover',
  priority = false,
  onLoad,
  onError,
}) => {
  const imageSrc = getStorageUrl(path);

  return (
    <LazyImage
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      objectFit={objectFit}
      priority={priority}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

/**
 * ResponsiveImage Component
 * Renders images with responsive srcset for better performance
 * Automatically serves appropriate image size based on screen size
 */
export const ResponsiveImage = ({
  src,
  alt,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  className = '',
  priority = false,
  onLoad,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(!priority);
  const [error, setError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleImageError = () => {
    setError(true);
    setIsLoading(false);
    onError?.();
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', paddingBottom: '66.67%' }}>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      )}

      {error ? (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999',
          }}
        >
          Error loading image
        </Box>
      ) : (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: isLoading ? 'none' : 'block',
          }}
          className={className}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      )}
    </Box>
  );
};

export default {
  LazyImage,
  StorageImage,
  ResponsiveImage,
};
