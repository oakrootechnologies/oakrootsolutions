import Head from 'next/head';
import dynamic from 'next/dynamic';

// Dynamically import to avoid SSR issues
const ProjectRingPage = dynamic(() => import('@/components/ProjectRingPage'), {
  ssr: false,
});

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects - Oakroot</title>
        <meta name="description" content="Explore our portfolio of creative projects" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ProjectRingPage />
    </>
  );
}

