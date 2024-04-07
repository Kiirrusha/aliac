import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";
import app from "..";

describe("http", () => {
  let room = null
  it("return empty array of rooms", async () => {
    const response = await app
      .handle(new Request("http://localhost/rooms"))
      .then((res) => res.text());
    expect(response).toBe("[]");
  });

  it("add one room and check them", async () => {
    await app.handle(
      new Request("http://localhost/rooms?user_name=test", { method: "POST" })
    );

    const response = app
      .handle(new Request("http://localhost/rooms"))
      .then((res) => res.json());

    expect((await response).length).toBe(1);
    response.then((rooms) => {
      room = rooms[0];
    })

  });

  it("join room websocket", async () => {
    const socket = new WebSocket("ws://localhost:3000/room");
    const connect = await new Promise((res, rej) => {
      socket.addEventListener("open", () => {
        res("connect");
      });

      setTimeout(() => {
        rej("timeout");
      }, 1000);
    });
    expect(connect).toBe("connect");

    new Promise((res, rej) => {
      socket.addEventListener("message", (event) => {
     
        console.log(event.data);
        res(event.data);
      });
      socket.send(
        JSON.stringify({ eventType: "join", data: { user_name: "test", roomId: room.id } })
      );

     
    });
  });
});
