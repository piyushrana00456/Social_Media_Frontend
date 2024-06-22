import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
  console.log("AuthProvider wrapping the app");
  return (
    <AuthProvider>
       <Component {...pageProps} />
    </AuthProvider>
  );
}
