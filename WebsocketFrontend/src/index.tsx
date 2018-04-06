import * as React from "react";
import * as ReactDOM from "react-dom";

import { Screen } from "./components/Screen";

ReactDOM.render(
    <Screen />,
    document.getElementById("root")
);

let ws = new WebSocket("ws://localhost:8181/");
let data: Blob;

ws.onmessage = function (e) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    var objurl = window.URL.createObjectURL(e.data);
    data
    var img = new Image();
    img.src = objurl;
    img.onload = function () {
        ctx.drawImage(img, 0, 0)
    }
}