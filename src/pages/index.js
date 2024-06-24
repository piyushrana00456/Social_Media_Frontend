import NavbarComponent from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24`} style={{border: '1px solid red'}}>
      <NavbarComponent/>
        Hello world
      </main>
  );
}
