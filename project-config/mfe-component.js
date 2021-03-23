import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import './mfe-component.css';

function MfeComponentLoader({ moduleName }) {
  const [ModuleComponent, setModuleComponent] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;
    System.import(moduleName)
      .then((module) => {
        if (isMounted) {
          if (typeof module.bootstrap === 'function') {
            module.bootstrap();
          }
          setModuleComponent(() => module.component());
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {
      isMounted = false;
    };
  }, [moduleName]);

  return ModuleComponent ? <ModuleComponent /> : null;
}

function MfeComponentErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="MfeComponentErrorFallback">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export function MfeComponent({ moduleName }) {
  return (
    <ErrorBoundary
      FallbackComponent={MfeComponentErrorFallback}
      onReset={() => {}}
    >
      <MfeComponentLoader moduleName={moduleName} />
    </ErrorBoundary>
  );
}
