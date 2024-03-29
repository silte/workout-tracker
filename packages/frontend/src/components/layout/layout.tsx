import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

// import { ReactComponent as Logo } from '../../assets/logo.svg';
import { Container } from '../container/container';
import { DesktopHeader } from '../desktop-header/desktop-header';
import { DesktopNavigation } from '../desktop-navigation/desktop-navigation';
import { ErrorBoundaryHandler } from '../error-boundary/error-boundary';
import { LoaderSuspense } from '../loader/loader-suspense';
import { MobileHeader } from '../mobile-header/mobile-header';
import { MobileNavigation } from '../mobile-navigation/mobile-navigation';

const OutletWithErrorBoundary = (): JSX.Element => (
  <ErrorBoundaryHandler errorPage="in-app">
    <LoaderSuspense>
      <Outlet />
    </LoaderSuspense>
  </ErrorBoundaryHandler>
);

const Logo = () => <img src="/logo512.png" className="block w-auto h-10" />;

export const Layout = (): JSX.Element => {
  const [currentWindowWidth, setCurrentWindowWidth] = useState(
    window.outerWidth
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const loadInitialWidth = (times = 0) => {
      if (window?.outerWidth) {
        setCurrentWindowWidth(window.outerWidth);
        return;
      } else if (times < 10) {
        timeout = setTimeout(loadInitialWidth, 50, times + 1);
      }
    };

    loadInitialWidth();

    return () => clearTimeout(timeout);
  }, []);

  window.addEventListener('resize', () =>
    setCurrentWindowWidth(window.outerWidth)
  );

  if (currentWindowWidth >= 1024) {
    return (
      <div className="bg-white">
        <Container className="grid grid-cols-[16rem,1fr] min-h-screen px-0">
          <aside className="after:bg-white-off after:ml-[-100vw] after:pr-[100vw] after:absolute after:top-0 after:bottom-0 after:right-0 relative border-r">
            <div className="sticky top-0 z-10 min-h-screen px-4 pt-12 pb-12 bottom-12">
              <header>
                <NavLink to="/" className="inline-flex items-center gap-3 mb-8">
                  <Logo />
                  <h2 className="text-2xl font-bold tracking-tight text-black">
                    Workout tracker
                  </h2>
                </NavLink>
                <DesktopNavigation />
              </header>
            </div>
          </aside>
          <main>
            <div className="px-8 py-12" data-testid="layout-root">
              <DesktopHeader />
              <OutletWithErrorBoundary />
            </div>
          </main>
        </Container>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-screen overflow-y-scroll lg:hidden">
      <main className="flex-grow bg-white lg:pb-24 min-h-screen-safe pb-safe">
        <div className={`px-4 mt-[44px] pt-4 pb-24`} data-testid="layout-root">
          <OutletWithErrorBoundary />
        </div>
      </main>
      <header>
        <MobileHeader />
        <MobileNavigation />
      </header>
    </div>
  );
};
