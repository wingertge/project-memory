import ReactHelmet from "react-helmet"
import serialize from "serialize-javascript"
import proc from "./env"

// tslint:disable-next-line:no-var-requires
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!)

// https://realfavicongenerator.net/
const icons = `
<!--suppress HtmlUnknownTarget -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff1493">
<meta name="msapplication-TileColor" content="#ff1493">
<meta name="theme-color" content="#ff1493">
`

export const Layout = (parameters: { markup: string, initialState: object, css: string, authToken: string, i18Store: object, lang: string, bundle: string }) => {
    const {markup, initialState, css, authToken, i18Store, lang, bundle} = parameters
    const helmet = ReactHelmet.renderStatic()

    return `<!doctype html>
        <html lang="${lang}">
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
              ${proc.env.NODE_ENV === "production"
        ? `<script src="${assets.client.js}" defer></script>`
        : `<script src="${assets.client.js}" defer crossorigin></script>`}
          <style id="jss-server-side">${css}</style>
        </head>
        <body>
            <div id="root">${markup}</div>
            <script>
              window.__PRELOADED_STATE__ = ${serialize(initialState)}
              window.__AUTH__ = ${authToken ? `"${authToken}"` : "undefined"}
              window.__PRELOADED_I18N__ = ${serialize(i18Store)}
              window.__INITIAL_LANG__ = "${lang}"
              window.__REACT_APP_API_ENDPOINT__ = "${proc.env.REACT_APP_API_ENDPOINT}"
              window.__REACT_APP_AUTH0_LOGOUT_CALLBACK__ = "${proc.env.REACT_APP_AUTH0_LOGOUT_CALLBACK}"
              window.__REACT_APP_AUTH0_DOMAIN__ = "${proc.env.REACT_APP_AUTH0_DOMAIN}"
              window.__REACT_APP_AUTH0_CLIENT_ID__ = "${proc.env.REACT_APP_AUTH0_CLIENT_ID}"
              window.__REACT_APP_AUTH0_CALLBACK__ = "${proc.env.REACT_APP_AUTH0_CALLBACK}"
              window.__REACT_APP_AUTH0_AUDIENCE__ = "${proc.env.REACT_APP_AUTH0_AUDIENCE}"
              window.__REACT_APP_CMS_SPACE__ = "${proc.env.REACT_APP_CMS_SPACE}"
              window.__REACT_APP_CMS_TOKEN__ = "${proc.env.REACT_APP_CMS_TOKEN}"
            </script>
            ${bundle}
        </body>
    </html>`
}
