import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SplineSceneBasic } from "@/components/ui/Demo";
import axios from "axios";

export default async function Home() {
  // try {
  //   const res = await axios.post('http://localhost:3000/api/Users', { name: 'Garvit', age: 20 }); // Use relative URL
  //   console.log(res.data.message);
  // } catch (error: any) {
  //   console.error("Error creating user:", error.response?.data?.message || error.message);
  // }
  return (
    <div className="">
      <h1>Home</h1>
    </div>
  );
}
