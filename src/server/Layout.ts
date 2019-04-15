import reactHelmet from "react-helmet"
import serialize from "serialize-javascript"

// tslint:disable-next-line:no-var-requires
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!)

// https://realfavicongenerator.net/
const icons = `
<!--suppress HtmlUnknownTarget -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/manifest.json">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">
`

export const Layout = (parameters: { markup: string, initialState: object, css: string, authToken: string, i18Store: object, lang: string, bundle: string }) => {
    const {markup, initialState, css, authToken, i18Store, lang, bundle} = parameters
    const helmet = reactHelmet.renderStatic(markup)

    return `<!doctype html>
        <html lang="">
        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta charSet='utf-8' />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            ${icons}
            ${assets.client.css
        ? `<link rel="stylesheet" href="${assets.client.css}">`
        : ""}
              ${process.env.NODE_ENV === "production"
        ? `<script src="${assets.client.js}" defer></script>`
        : `<script src="${assets.client.js}" defer crossorigin></script>`}
          <style id="jss-server-side">${css}</style>
        </head>
        <body>
            <div id="root">${markup}</div>
            <script>
              window.__PRELOADED_STATE__ = ${serialize(initialState)}
              window.__AUTH__ = "${authToken}"
              window.__PRELOADED_I18N__ = ${serialize(i18Store)}
              window.__INITIAL_LANG__ = "${lang}"
              process = process || {}
              env = env || {}
              process.env.REACT_APP_API_ENDPOINT = "${process.env.REACT_APP_API_ENDPOINT}"
              process.env.REACT_APP_AUTH0_LOGOUT_CALLBACK = "${process.env.REACT_APP_AUTH0_LOGOUT_CALLBACK}"
              process.env.REACT_APP_AUTH0_DOMAIN = "${process.env.REACT_APP_AUTH0_DOMAIN}"
              process.env.REACT_APP_AUTH0_CLIENT_ID = "${process.env.REACT_APP_AUTH0_CLIENT_ID}"
              process.env.REACT_APP_AUTH0_CALLBACK = "${process.env.REACT_APP_AUTH0_CALLBACK}"
              process.env.REACT_APP_AUTH0_AUDIENCE = "${process.env.REACT_APP_AUTH0_AUDIENCE}"
            </script>
            ${bundle}
        </body>
    </html>`
}
