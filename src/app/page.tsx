import Head from "next/head";
import Link from "next/link";
import Navbar from "./components/Navbar/Navbar"
export default function Home() {
  return (
    <>
      <Head>
        <Link rel="icon" href="./favicon.ico" />
      </Head>
      <main>
        <Navbar></Navbar>
      </main>
    </>
  );
}
