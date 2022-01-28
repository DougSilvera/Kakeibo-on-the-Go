export default {
    API: "http://localhost:8088"
}

export const fetchIt = (url, method = "GET", body = null) => {
    let options = {
        "method": method,
        "headers": {}
    }

    switch (method) {
        case "POST":
        case "PUT":
            options.headers = {
                "Content-Type": "application/json"
            }
            break;
        default:
            break;
    }

    if (body !== null) {
        options.body = body
    }

    return fetch(url, options).then(r => r.json())
}

export const humanDate = (object) => {
    const format = {
        day: "numeric",
        month: "2-digit",
        year: "numeric",
      };
   return( new Date(object.timestamp).toLocaleString(
    "en-us",
    format
  ))}