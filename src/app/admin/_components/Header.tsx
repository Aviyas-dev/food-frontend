'use client';


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



export default function Header() {
  
  return( 
  <div className="w-[1171px ]" >
    <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

  </div>
  )
}
