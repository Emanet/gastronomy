// src/pages/_app.tsx
import Navbar from "@/components/NavBar";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Navbar />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
