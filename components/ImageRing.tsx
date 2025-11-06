'use client';

import { Group } from 'three';
import ImagePlane from './ImagePlane';

interface ImageRingProps {
  imageUrls: string[];
  radius: number;
  yOffset: number;
}

export default function ImageRing({ imageUrls, radius, yOffset }: ImageRingProps) {
  return (
    <group>
      {imageUrls.map((url, index) => (
        <ImagePlane
          key={`${url}-${index}`}
          index={index}
          count={imageUrls.length}
          radius={radius}
          url={url}
          yOffset={yOffset}
        />
      ))}
    </group>
  );
}







