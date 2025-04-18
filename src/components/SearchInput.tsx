'use client'
import React from 'react'
import { Input } from './ui/input'
import { useSearchParams } from 'next/navigation'
import {search} from "@/actions/search"

const SearchInput = () => {
    const searchParams=useSearchParams();
  return (
    <form action={search} className="w-full">
        {searchParams!==null && <Input className='border-2 border-gray-300 ' name='term' id='term' type='text' defaultValue={searchParams.get('term') || ""} placeholder="Search posts here..."/>
        }
    </form>
  )
}

export default SearchInput