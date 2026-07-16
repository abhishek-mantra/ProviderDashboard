import { useState } from 'react';
import defaultAvatar from 'figma:asset/59888568f386304ceb75a19e8246bae27d64b3eb.png';

interface AvatarWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  initials?: string;
}

export function AvatarWithFallback({ src, alt, className = '', initials }: AvatarWithFallbackProps) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    // If no src or image failed to load, use the default avatar
    return (
      <img
        src={defaultAvatar}
        alt={alt}
        className={className}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setImageError(true)}
    />
  );
}
