const generateHtml = (rootContent, state) => `
  <!doctype html>
  <html>
  <head>
    <title>k n v a s</title>

    <link
      href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Slab:300,400"
      rel="stylesheet"
    >
    <link
      href="/dist/index.css"
      rel="stylesheet"
    >

  </head>
  <body>
    <div id="app-anchor">${rootContent}</div>

    <script>
      window._state = ${JSON.stringify(state).replace(/</g, '\\u003c')}
    </script>

    <script src="/dist/client-bundle.js"></script>
  </body>
  </html>
`;

export default generateHtml;
