import Head from "next/head";
import Link from "next/link";
import Navbar from "./components/Navbar/Navbar"
import Dashboard from "./components/dashboard/Dashboard";
export default function Home() {
  return (
    <>
      <Head>
        <Link rel="icon" href="./favicon.ico" />
      </Head>
      <main>
        <Navbar></Navbar>
        <Dashboard></Dashboard>
      </main>
    </>
  );
}
