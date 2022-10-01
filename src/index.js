import {App} from "./app"
require("./style.css")

document.addEventListener("DOMContentLoaded", () => {
    const app = new App();
    window.app = app;
});