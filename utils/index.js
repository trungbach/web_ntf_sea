export function checkProperties(obj) {
    for (var key in obj) {
        if (obj[key] !== null && obj[key] != "")
            return false;
    }
    return true;
}

export function getTokenFromServer(req, res) {
    if(!req.headers.cookie) {
        res.writeHead(302, { Location: `/login?${req.url}` })
        res.end();
        
      } else {
        const tokenCookie =  req.headers.cookie.split(";")
        .find(c => c.trim().startsWith("token="));
        const token = tokenCookie && tokenCookie.split('=')[1]
        return token
      }
}

export function handleExprireToken (req, res) {
    res.setHeader('Set-Cookie','token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT')
    res.setHeader('Set-Cookie','user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT')
    res.writeHead(302, { Location: `/login?${req.url || '/'}` })
    res.end();
}