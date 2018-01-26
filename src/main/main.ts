import * as path from "path";
import * as url from "url";

import { app, BrowserWindow } from "electron";

import IPCPromiseReceiver from "../ipcPromise/ipcPromiseReceiver";

let window: BrowserWindow | null;

function createWindow() {
    window = new BrowserWindow({ width: 800, height: 600 });

    window.loadURL(url.format({
        pathname: path.join(__dirname, "../../static/index.html"),
        protocol: "file:",
        slashes: true
    }));

    window.webContents.openDevTools();

    window.on("closed", () => {
        window = null;
    });
}

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (window === null) {
        createWindow();
    }
});

const ipcPromiseReceiver = new IPCPromiseReceiver();

ipcPromiseReceiver.on("channel1", (payload: any, callback: (result: any) => void) => {
    callback("channel1 called");
});

ipcPromiseReceiver.on("channel2", (payload: any, callback: (result: any) => void) => {
    setTimeout(() => {
        callback("channel2 called");
    }, 1000);
});

ipcPromiseReceiver.on("double", (payload: number, callback: (result: any) => void) => {
    callback(payload * 2);
});
