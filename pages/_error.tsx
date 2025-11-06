import { NextPageContext } from 'next';
import Error from 'next/error';

interface ErrorProps {
  statusCode: number;
}

function ErrorPage({ statusCode }: ErrorProps) {
  return <Error statusCode={statusCode} />;
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? (err as any).statusCode : 404;
  return { statusCode };
};

export default ErrorPage;

