import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-screen px-8 bg-slate-900">
      <Head>
        <title>Breathe Bubble</title>
        <meta name="description" content="Breathe bubble" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 py-16 ">
        <h1 className="text-6xl text-slate-300">Breathe Bubble</h1>
      </main>

      <footer className="flex items-center justify-center py-8 border-t border-slate-500 text-slate-300">
        By
        <a
          className="pl-1"
          href="https://www.mirhamasala.com/about"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mirha Masala
        </a>
      </footer>
    </div>
  );
};

export default Home;
