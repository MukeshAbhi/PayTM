"use client"
import Button from '@/components/Button'
import React, { useState } from 'react'
import { getData } from '../actions/user';
import Link from 'next/link';

type User = {
  id: string;
  name: string;
};

function Test() {
  const [user, setUser] = useState<User | null>(null);

  const clickHandler = async () => {
    const fetchedUser = await getData();
  
    if (fetchedUser) {
      setUser({
        id: fetchedUser.id,
        name: fetchedUser.name ?? "", 
      });
    }
  };
  

  if(user){
    return (
      <div className='flex flex-col gap-4 text-6xlxl font-bold bg-amber-300 h-screen justify-center items-center'>
          <Button ><Link href={"/"}>Home</Link></Button>
          <div>Id : {user.id}</div>
          <div>Name : {user.name}</div>
      </div>
    )
  }
  
  return (
    <div className='flex flex-col gap-4 text-6xlxl font-bold bg-amber-300 h-screen justify-center items-center'>
        <Button onClick={() => clickHandler()}>Find User</Button>
    </div>
  )
}

export default Test