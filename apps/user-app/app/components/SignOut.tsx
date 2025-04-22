"use client"
import { logout } from '@/app/actions/auth'
import Button from '@/components/Button'
import React from 'react'

function SignOut() {
  return (
    <div>
      <Button variant={'secondary'} onClick={() => logout()}>SignOut</Button>
    </div>
  )
}

export default SignOut