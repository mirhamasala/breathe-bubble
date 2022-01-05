import type { NextPage } from "next";
import Head from "next/head";
import Bubble from "../components/Bubble";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-screen bg-slate-900">
      <Head>
        <title>Breathe Bubble</title>
        <meta name="description" content="Breathe bubble" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 py-16 ">
        <Bubble />
      </main>

      <div className="px-8">
        <footer className="flex items-center justify-center py-8 border-t border-slate-500 text-slate-500">
          Breathe Bubble by
          <a
            className="pl-1 underline text-slate-400"
            href="https://www.mirhamasala.com/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mirha Masala
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Home;
