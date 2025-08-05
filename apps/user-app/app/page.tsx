import { auth } from "@/authTypes";
import { Intro } from "@/components/Intro";

export default async function Page() {
  const session = await auth();
  console.log("Form home : ", session);

  
  
  return (
      <Intro/>
    )
}

