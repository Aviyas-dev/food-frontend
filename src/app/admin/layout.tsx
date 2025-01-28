import { Navigation } from "./_components/Navigation";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <ClerkProvider>
     
      <SignedOut >
        <SignInButton>
          
          <button className=" rounded-full border-sky-500 bg-sky-500 outline-2 outline-offset-2 w-52 h-8 text-yellow-300 font-extrabold">Нэвтрэх</button>
        


        </SignInButton>
      </SignedOut>
      
      <SignedIn>
        <div className="bg-muted h-screen flex gap-6  ">
          <Navigation />
          <div>
            <UserButton />
            <div>{children}</div>
          </div>
        </div>
      </SignedIn>
    </ClerkProvider>
   
  );
}
