import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="swC2FvmvEZwOlfTGZfnAGrSaSbuuDC56Th5ZBP_bi30"
        />
        <meta name="author" content="amir m fatahi" />
        <meta
          name="description"
          content="TaskTonic is a simple and easy to use task manager app that helps you manage your tasks and projects efficiently. Control each step of your tasks with ease and get things done on time. Stay organized and focused on your goals with TaskTonic."
        />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.png" />
        <title>TaskTonic - Your Daily Todo Handler</title>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
