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
        content="Vadim Sher est pianiste et compositeur spécialisé en musique de théâtre et de cinéma. Il est directeur artistique de la Compagnie MUSARDS basée à Paris."
      />
      <link rel="icon" href="/favicon.png" />
    </Head>
  );
}
