'use server'

import * as auth from '@/auth'
//import { redirect } from 'next/navigation';

export const signIn=async()=>{
    return auth.signIn();
}
