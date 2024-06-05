import React from 'react'
import Heroe from '@/components/front/index/Heroe';
import TextImageSection from '@/components/front/index/Section00';

export default function Page() {
  return (
    <div>
      <Heroe />
      <TextImageSection className="mb-10" />
    </div>
  );
}
