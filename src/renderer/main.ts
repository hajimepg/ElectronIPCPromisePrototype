import Vue from "vue";

import * as ipcPromise from "../ipcPromise/ipcPromise";

/* tslint:disable:object-literal-sort-keys */
const app = new Vue({
    el: "#app",
    data: {
        message: "hello from vue"
    }
});
/* tslint:enable:object-literal-sort-keys */

ipcPromise.send("channel1", undefined)
    .then((response: any) => {
        console.log(`1st time response from channel1: ${response}`);
    });

ipcPromise.send("channel1", undefined)
    .then((response: any) => {
        console.log(`2nd time response from channel1: ${response}`);
    });

ipcPromise.send("channel2", undefined)
    .then((response: any) => {
        console.log(`1st response from channel2: ${response}`);
    });

ipcPromise.send("channel2", undefined)
    .then((response: any) => {
        console.log(`2nd time response from channel2: ${response}`);
        return ipcPromise.send("channel1", undefined);
    })
    .then((response: any) => {
        console.log(`3rd response from channel2: ${response}`);
    });

(async () => {
    const response1 = await ipcPromise.send("channel1", undefined);
    const response2 = await ipcPromise.send("channel2", undefined);

    console.log(`response1 = ${response1}, response2 = ${response2}`);
})();

ipcPromise.send("double", 3)
    .then((response: any) => {
        console.log(`double of 3 = ${response}`);
    });
