# Microservices with a Game On! Room

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/88c9a48c21544cffa2965cfa0def40bb)](https://www.codacy.com/app/gameontext/gameon-room-nodejs?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=gameontext/sample-room-nodejs&amp;utm_campaign=Badge_Grade)

[Game On!](https://gameontext.org/) is both a sample microservices application, and a throwback text adventure brought to you by the wasdev team at IBM. This application demonstrates how microservice architectures work from two points of view:

1. As a Player: navigate through a network/maze of rooms, where each room is a unique implementation of a common API. Each room supports chat, and interaction with items (some of which may be in the room, some of which might be separately defined services as well).
2. As a Developer: learn about microservice architectures and their supporting infrastructure by extending the game with your own services. Write additional rooms or items and see how they interact with the rest of the system.

You can learn more about Game On! at [http://gameontext.org/](http://gameontext.org/).

## Introduction

This walkthrough will guide you through creating and deploying a simple room (a microservice) to the running Game On! application using Node.js.

The microservice can be (a) deployed as a Cloud Foundry application or (b) built into a Docker container.

Game On! communicates with this service (a room) over WebSockets using the [Game On! WebSocket protocol](https://book.gameontext.org/microservices/WebSocketProtocol.html). Consider this a stand-in for asynchronous messaging like MQTT, which requires a lot more setup than a simple WebSocket does.

## Requirements

Node 6.3.1 is used by the Dockerfile. You can use newer, but be sure to update the Dockerfile accordingly.

## Let's get started!

1. Create your own fork of this repository ([what's a fork?](https://help.github.com/articles/fork-a-repo/))
2. Create a local clone of your fork ([Cloning a repository](https://help.github.com/articles/cloning-a-repository/))

## Build the service locally

1. `cd sample-room-nodejs`
2. `npm install`
3. `npm start`

After running this, the server will be running locally at [http://localhost:3000/](http://localhost:3000/).
* Visiting this page provides a small form you can use to test the WebSocket endpoint in your service directly.
* A health URL is also defined by the service, at http://localhost:3000/health

## Make your room public!

For Game On! to include your room, you need to tell it where the publicly reachable WebSocket endpoint is. This usually requires two steps:

* [**hosting your service somewhere with a publicly reachable endpoint**](https://book.gameontext.org/walkthroughs/deployRoom.html), and then
* [registering your room with the game](https://book.gameontext.org/walkthroughs/registerRoom.html).

## Build a docker container

Creating a Docker image is straight-up: `docker build .` right from the root menu.

### List of host provided commands

The Game On! host provides a set a universal commands:
- **/exits** - List of all exits from the current room.
- **/help** - List of all available commands for the current room.
- **/sos** - Go back to The First Room.
