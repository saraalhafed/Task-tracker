"use client"
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function layout({ children }: ChildrenProps) {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/');
    }
  }, []);
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
/*this page private routing in next.js */