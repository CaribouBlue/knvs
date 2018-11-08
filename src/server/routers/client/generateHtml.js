const generateHtml = (rootContent) => `
  <!doctype html>
  <html>
  <head>
    <title>k n v a s</title>

    <link href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Slab:300,400" rel="stylesheet">
    <link href="/dist/index.css" rel="stylesheet">

  </head>
  <body>
    <div id="app-anchor">${rootContent}</div>

    <script src="/dist/client-bundle.js"></script>
  </body>
  </html>
`;

export default generateHtml;
