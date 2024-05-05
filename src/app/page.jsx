import Link from 'next/link';
import React from 'react'

export default function HomePage() {
  return (
    <div>
      <h1>HomePage GA</h1>
      <Link href="/login">Login</Link>
    </div>
  );
}
