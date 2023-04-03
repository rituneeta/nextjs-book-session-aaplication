import React from 'react'
import { useSession } from 'next-auth/react';
import HomePage from './index';
import ChooseSlot from '@/components/chooseSlot/chooseSlot'

export default function bookSlot() {
  const { status } = useSession();
  return status === 'authenticated' ? <ChooseSlot /> : <HomePage/>
};