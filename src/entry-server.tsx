// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.svg" />
          <title>Mapping Education in Indonesia | Datawan</title>
          <meta
            name="description"
            content="Mapping Education: Visualizing School Distribution and Population Density in Indonesia"
          />

          {/* opengraph */}
          <meta
            property="og:title"
            content="Mapping Education in Indonesia | Datawan"
          />
          <meta
            property="og:description"
            content="Mapping Education: Visualizing School Distribution and Population Density in Indonesia"
          />
          <meta
            property="og:image"
            content="https://schools.datawan.id/og.png"
          />
          <meta property="og:url" content="https://schools.datawan.id" />

          {/* twitter / x */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@jfrAziz" />
          <meta
            name="twitter:image"
            content="https://schools.datawan.id/og.png"
          />
          <meta
            property="twitter:title"
            content="Mapping Education in Indonesia | Datawan"
          />
          <meta
            property="twitter:description"
            content="Mapping Education: Visualizing School Distribution and Population Density in Indonesia"
          />

          {/* assets */}
          {assets}
        </head>
        <body data-kb-theme="dark">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
