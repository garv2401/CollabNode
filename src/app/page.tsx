
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SplineSceneBasic } from "@/components/ui/Demo";
import axios from "axios";

import {signIn} from "./api/actions/sign-in"
import {signOut} from "./api/actions/sign-out"

import  {auth} from '@/auth'

export default async function Home() {
  // try {
  //   const res = await axios.post('http://localhost:3000/api/Users', { name: 'Garvit', age: 20 }); // Use relative URL
  //   console.log(res.data.message);
  // } catch (error: any) {
  //   console.error("Error creating user:", error.response?.data?.message || error.message);
  // }


  const session=await auth();




  return (
    <div className="">
      <h1>Home</h1>
      {/* <Button type="submit" onClick={()=>auth.signIn()} className="text-white bg-black">Sign In</Button>

      <Button type="submit" onClick={()=>auth.signOut()} className="text-white bg-black">Sign Out</Button> */}

      <form action={signIn}>
      <Button type="submit" className="text-white bg-black">Sign In</Button>
      </form>

      <form action={signOut}>
      <Button type="submit" className="text-white bg-black">Sign Out</Button>


      {
        session?.user && 
        <div>
          <div>{JSON.stringify(session.user)}</div>
        </div>
      }



      </form>
    </div>
  );
}
