import { useEffect } from 'react';
import { useRouter } from 'next/router';

function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/page/1');
  }, [router]);

  return <div id="home-page" data-testid="home-page"></div>;
}

export default HomePage;
