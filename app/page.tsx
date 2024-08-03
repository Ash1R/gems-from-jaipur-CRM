// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
    router.push('/metalinput');
    router.push('/officeexpense');
    router.push('/jobdisplay');
    router.push('/purchases');

  }, [router]);

  return null;
}
