export const authCookieOptions = {
    signed: true,
    httpOnly: true,
    secure: false
}

export const manageCookies = (basePath, req, res) => {
    if(basePath === "logout") {
        res.clearCookie("__auth__", authCookieOptions)
        res.redirect("/")
        return
    }

    const cookieNames = Object.keys(req.cookies)
    for(const cookieName of cookieNames) {
        if(cookieName.startsWith("com.auth0.auth")) {
            res.clearCookie(cookieName)
        }
    }
}
