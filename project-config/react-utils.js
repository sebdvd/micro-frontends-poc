import React from 'react';

export function useStyles(styles) {
  React.useLayoutEffect(() => {
    styles.use();
    return () => {
      styles.unuse();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
