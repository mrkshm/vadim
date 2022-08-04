import Head from "next/head";

interface MetaHeadProps {
  title: string;
}

export default function MetaHead({ title }: MetaHeadProps) {
  return (
    <Head>
      <title>Vadim Sher - {title}</title>
      <meta
        name="description"
        content="Vadim Sher - Pianiste, compositeur, musicien de scène"
      />
      <link rel="icon" href="/favicon.png" />
    </Head>
  );
}
