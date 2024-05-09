const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0");
const day = String(date.getDate()).padStart(2, "0");

const time = String(date.getTime()).padStart(2, "0");
const minute = String(date.getMinutes()).padStart(2, "0");
const second = String(date.getSeconds()).padStart(2, "0");

const now = `${year}-${month}-${day} ${time}:${minute}:${second}`;

export default now;
