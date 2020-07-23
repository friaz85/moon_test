import { Component, OnInit } from "@angular/core";
import * as io from "socket.io-client";

const SOCKET_ENDPOINT = "localhost:3000";
@Component({
  selector: "app-chat-inbox",
  templateUrl: "./chat-inbox.component.html",
  styleUrls: ["./chat-inbox.component.css"],
})
export class ChatInboxComponent implements OnInit {
  socket;
  message: string;
  username: string = "";
  name: string = "";

  constructor() {}

  ngOnInit() {
    this.setupSocketConnection();
  }

  login() {
    console.log("Entra");
    this.name = this.username;
    this.socket.emit("login", this.name);
  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on("message-broadcast", (data: any) => {
      console.log(data);
      if (data) {
        const element = document.createElement("li");
        element.innerHTML =
          '<p style="color: red; font-weight: bold;">' +
          data.from +
          ":</p>" +
          data.message;
        element.style.background = "white";
        element.style.padding = "15px 30px";
        element.style.margin = "10px";
        document.getElementById("message-list").appendChild(element);
      }
    });
  }

  SendMessage() {
    this.socket.emit("message", this.message);
    const element = document.createElement("li");
    element.innerHTML =
      '<p style="color: red; font-weight: bold;">Yo:</p>' + this.message;
    element.style.background = "white";
    element.style.padding = "15px 30px";
    element.style.margin = "10px";
    element.style.textAlign = "right";
    document.getElementById("message-list").appendChild(element);
    this.message = "";
  }
}
