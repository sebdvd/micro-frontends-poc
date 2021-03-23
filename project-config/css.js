export function loadCSS() {
  try {
    const cssId = `css_${MODULE_NAME}`;
    if (!document.getElementById(cssId)) {
      const styles = document.createElement('link');
      styles.id = cssId;
      styles.rel = 'stylesheet';
      styles.type = 'text/css';
      styles.media = 'screen';
      styles.href = CSS_FILENAME;
      document.getElementsByTagName('head')[0].appendChild(styles);
    }
  } catch (error) {
    console.warn('failed to load module css file', CSS_FILENAME);
    console.error(error);
  }
}
