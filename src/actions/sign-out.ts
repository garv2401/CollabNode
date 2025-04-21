'use server'

import * as auth from '@/auth'
import { redirect } from 'next/navigation';

export const signOut=async()=>{
    auth.signOut();
    redirect('/');
}