import Vue from 'vue'

export const eventBus = new Vue()

export function sendMessage (
    message = { eventName: "test", params: { name: "Alice", age: 21 } }
){
    document.getElementById("map").contentWindow.postMessage(message, appConfig.mapIp);
}