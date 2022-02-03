export default {
  API: "http://localhost:8088",
};

export const fetchIt = (url, method = "GET", body = null) => {
  let options = {
    method: method,
    headers: {},
  };

  switch (method) {
    case "POST":
    case "PUT":
      options.headers = {
        "Content-Type": "application/json",
      };
      break;
    default:
      break;
  }

  if (body !== null) {
    options.body = body;
  }

  return fetch(url, options).then((r) => r.json());
};

export const humanDate = (object) => {
  const format = {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  };
  return new Date(object.timestamp).toLocaleString("en-us", format);
};

export const toTimestamp = (date) => {
  const myDate = date.split("-");
  const newTimestamp = new Date(myDate).getTime();
  return newTimestamp;
};

export const formattedDate = (timestamp) => {
  var date_not_formatted = new Date(timestamp);

  var formatted_string = date_not_formatted.getFullYear() + "-";

  if (date_not_formatted.getMonth() < 9) {
    formatted_string += "0";
  }
  formatted_string += date_not_formatted.getMonth() + 1;
  formatted_string += "-";

  if (date_not_formatted.getDate() < 10) {
    formatted_string += "0";
  }
  formatted_string += date_not_formatted.getDate();

  return formatted_string;
};

export const simpleArraySum = (ar) => {
  var sum = 0;
  for (var i = 0; i < ar.length; i++) {
    sum += ar[i];
  }
  return sum.toFixed(2);
};
