import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { RESTRICTED_NAVBAR_PATHS } from "@/utils/contants";
import NavbarComponent from "@/components/Navbar/Navbar";

export default function App({ Component, pageProps }) {
  
  const router = useRouter();

  const showNavbar = !RESTRICTED_NAVBAR_PATHS.includes(router.pathname);
  
  return (
    <AuthProvider>
      {
        showNavbar && <NavbarComponent />
      }
      <Component {...pageProps} />
    </AuthProvider>
  );
}
