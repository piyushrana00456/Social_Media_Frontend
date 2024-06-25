import NavbarComponent from "@/components/Navbar/Navbar";
import { useState } from "react";

export default function Home() {
  const [isSearchInFocus, setIsSearchInFocus] = useState({inFocus: false, data: []});
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
      <NavbarComponent isSearchInFocus={isSearchInFocus} setIsSearchInFocus={setIsSearchInFocus}/>
        {
          isSearchInFocus?.inFocus ? "Users LIst" : "Hello World"
        }
      </main>
  );
}
