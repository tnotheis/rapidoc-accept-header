const path = require("path");

const app = require("express")();

app.get("/rapidoc/rapidoc-min.js", (_req, res) =>
  res.sendFile(
    path.join(__dirname, "node_modules", "rapidoc", "dist", "rapidoc-min.js")
  )
);

app.get("/docs/openapi.yaml", (_req, res) =>
  res.sendFile(path.join(__dirname, "openapi.yaml"))
);

app.get("", (_req, res) => {
  res.send(`
        <!doctype html>
            <head>
                <meta charset="utf-8">
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;600&amp;family=Roboto+Mono&amp;display=swap" rel="stylesheet">
                <script type="module" src="/rapidoc/rapidoc-min.js"></script>
            </head>
            <body>
                <rapi-doc
                    spec-url="/docs/openapi.yaml"
                    regular-font="Open Sans"
                    mono-font="Roboto Mono"
                > </rapi-doc>
            </body>
        </html>
    `);
});

app.get("/my-route", (req, res) => {
  console.log(req.headers.accept);
  res.send(`Received Accept header: '${req.headers.accept}'`);
});

app.listen(3333, () => {
  console.log("Listening on port 3333");
});
