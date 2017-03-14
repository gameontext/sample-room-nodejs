# Microservices with a Game On! Room

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/88c9a48c21544cffa2965cfa0def40bb)](https://www.codacy.com/app/gameontext/gameon-room-nodejs?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=gameontext/gameon-room-nodejs&amp;utm_campaign=Badge_Grade)

[Game On!](https://gameontext.org/) is both a sample microservices application, and a throwback text adventure brought to you by the wasdev team at IBM. This application demonstrates how microservice architectures work from two points of view:

1. As a Player: navigate through a network/maze of rooms, where each room is a unique implementation of a common API. Each room supports chat, and interaction with items (some of which may be in the room, some of which might be separately defined services as well).
2. As a Developer: learn about microservice architectures and their supporting infrastructure by extending the game with your own services. Write additional rooms or items and see how they interact with the rest of the system.

You can learn more about Game On! at [http://gameontext.org/](http://gameontext.org/).

##Introduction

This walkthrough will guide you through adding a room to a running Game On! microservices application.  You will be shown how to setup a Node.js room that is deployed as (a) a Cloud Foundry application in Bluemix, or (b) as a docker container published to the IBM Container 
Service in Bluemix.

## Getting the source code

The source code is located in GitHub, navigate to our [repository](https://github.com/gameontext/gameon-room-nodejs.git) and create a fork of the repository into your own repo. Navigate to your new fork and clone the repository with `git 
clone https://github.com/<<yourGitHubId>>/gameon-room-nodejs.git`. Alternatively you can download the ZIP file and unzip the code on to your local machine.

## Deploying your room

To deploy your room you can either:
* [Deploy to Bluemix as a Cloud Foundry app](#deploying-as-a-cloud-foundry-app)
or
* [Deploy using Docker](#deploy-to-ibm-container-service)

## Registering your room

Microservices in production should support automatic scaling, with multiple instances of the room microservice running in parallel, with new instances starting or existing instances stopping at unpredictable times.

To register your room you need the websocket endpoint. This will vary depending on where you have deployed your app, but should look something like:
* Bluemix/Container group in IBM Container Service:
  * US South: `ws://<cf-app-name>.mybluemix.net/room`
  * United Kingdom: `ws://<cf-app-name>.eu-gb.mybluemix.net/room`
* Single container instance in IBM Container Service
  * `ws://<ip address>:9080/room`

Use the Edit Rooms dialog in Game On! to register your room:

1.  Go to [GameOn](https://gameontext.org) and sign in.
2.  Once you are signed in, go to the top right of the browser window and click on your username (or person icon).
3.  From this window, again click the top right panel to select **Edit rooms**.
4.  Under **Select or create a room**, make sure **create a room** is selected from the dropdown.
5.  Fill in the room information as specified. If you don't know all the details yet, leave those blank and come back and fill them in later.
6.  Click **Create** and the room will be created for you.

## Visit your room in the game

Once the room is set up and it has registered with Game On!, it will be accessible as a room in the game.

1. If you aren't in The First Room, use `/sos` to return there.
2. Use the Game On! command `/listmyrooms` from The First Room, to see your list of rooms. Your newly registered room should appear in that list.
3. Use the `/teleport` command to go directly to your room from The First Room to see it in action.

Congratulations, you've deployed a microservice that extended an existing microservices-based application so that it can do something new.

Suggested activities:
* Make it more resilient -- add additional instances using the autoscaling add-on: https://console.ng.bluemix.net/catalog/services/auto-scaling
* Consider how to allow chat messages to propagate between independent instances using a shared datastore or cache, or an event bus, or...
* Want some more ideas, check out the [Advanced Adventures section](https://gameontext.gitbooks.io/gameon-gitbook/content/walkthroughs/createMore.html) of our GitBook.


### List of host provided commands

The Game On! host provides a set a universal commands:
- **/exits** - List of all exits from the current room.
- **/help** - List of all available commands for the current room.
- **/sos** - Go back to The First Room.

### The First Room commands

The First Room is usually where new users will start in Game On!. From there, additional commands are available and maintained by Game On!. For the list of current commands use the `/help` command.

## Deploying as a Cloud Foundry app

### Installation prerequisites for Bluemix deployment

When deployed using an instant runtime, Gameon-room-nodejs requires:

- [Bluemix account](https://console.ng.bluemix.net)
- [Cloud Foundry command line](https://docs.cloudfoundry.org/cf-cli/)

### Create Bluemix accounts and log in

Sign up for Bluemix at https://console.ng.bluemix.net and DevOps Services at https://hub.jazz.net. When you sign up, you'll create an IBM ID, create an alias, and register with Bluemix.
* Make a note of your username and org, as you will need both later.
  * By default, the space is dev and the org is the project creator's user name. For example, if sara@example.com signs in to Bluemix for the first time, the active space is dev and the org is sara@example.com.
* Make a note of your region! (US South, United Kingdom, or Australia)
  * When you log into Bluemix, your logged in username, organization, and space are shown in the top right. If you click in the top right corner, you'll see the region displayed in the panel displayed on the right side of the screen.

### Deploying the app

1. Login to the Cloud Foundry command line: `cf login`
2. Enter Bluemix API endpoint
  * From the Bluemix console, click on your username in the top right corner. You'll see the region displayed in the panel on the right side of the screen.
  * US South: `https://api.ng.bluemix.net`
  * London: `https://api.eu-gb.bluemix.net`
3. Enter email and password for Bluemix login
4. Enter the Bluemix organization
5. Enter the Bluemix space
6. `cf push <cf-app-name>`

**NOTE:** Choose a unique app name to be included as part of the URL (`cf-app-name`). It must not contain spaces or special characters.

After your room has been pushed, you should be able to view it at:
  * US South: `http://<cf-app-name>.mybluemix.net/`
  * United Kingdom: `http://<cf-app-name>.eu-gb.mybluemix.net/`

### Next step

Now you need to [register your room](#registering-your-room) using the Websocket URL. Go to your app endpoint, either by going directly to the URL or by clicking on the route in your Bluemix Dashboard to see your Websocket URL. This will vary by region, but should look something like:
  * US South: `ws://<cf-app-name>.mybluemix.net/room`
  * United Kingdom: `ws://<cf-app-name>.eu-gb.mybluemix.net/room` 

## Deploy to IBM Container service

### Installation prerequisites

1. [Cloud foundry API](https://github.com/cloudfoundry/cli/releases)
2. [Install the IBM Containers plugin](https://console.ng.bluemix.net/docs/containers/container_cli_cfic_install.html)

### Deploying to IBM Container service

You can either [deploy as a single container](#deploying-as-a-single-container) or [deploy as a container group](#deploy-as-a-container-group).

#### Deploying as a single container

1. Log in to the IBM container service. This needs to be done in two stages:
  1. Log into the Cloud Foundry CLI using `cf login`. You will need to specify the API endpoint as `api.ng.bluemix.net` for the US South server, or `api.eu-gb.bluemix.net` for the UK server.
  2. After this run the command `cf ic login`. This will perform the authentication to the IBM Container Service.
2. Build the container in the Bluemix registry by running the command  `cf ic build -t gonode .` from the root of the project.
3. Run `cf ic images` and check your image is available.
4. Start the container by running the command `cf ic run -p 3000 --name gonode <registry>/<namespace>/gonode`. You can find the full path from the output of `cf ic images`. An example would be:

  `cf ic run -p 3000 --name gonode registry.ng.bluemix.net/pavittr/gonode`

5. While you are waiting for the container to start, request a public IP address using the command `cf ic ip request`. This will return you a public IP address you can bind to your container.
6. With the returned IP address, bind it using the command `cf ic ip bind <ip address> gonode`.
7. Issue `cf ic ps`, and wait for your container to go from "Networking" to "Running".
8. Your room is now successfully running.

##### Next step

Now you need to [register your room](#registering-your-room) using the Websocket URL. Go to your app endpoint, either by going directly to the URL or by clicking on the route in your Bluemix Dashboard to see your Websocket URL. This will vary by region, but should look something like:
  * US South: `ws://<cf-app-name>.mybluemix.net/room`
  * United Kingdom: `ws://<cf-app-name>.eu-gb.mybluemix.net/room`

#### Deploy as a container group

Instead of deploying a container as a single instance, you can instead deploy a container group. A container group can be used to deploy multiple instances of the same container and load balance between them.

1. Log in to the IBM container service. This needs to be done in two stages:
  1. Log into the Cloud Foundry CLI using `cf login`. Ypu will need to specify the API endpoint as `api.ng.bluemix.net` for the US South server, or `api.eu-gb.bluemix.net` for the UK server.
  2. After this run the command `cf ic login`. This will perform the authentication to the IBM Container Service.
2. Run `cf ic images` and check the `gonode` image is available. If not, run the command `cf ic build -t gonode .` from the root of the project to create it.
3. Create the container group by running `cf ic group create -p 3000 -n <appName> --name gonodegroup <registry>/<namespace>/gonode`. You can find the full path from the output of `cf ic images`. An example would be:

  `cf ic group create -p 3000 --name gonodegroup registry.ng.bluemix.net/pavittr/gonode`

4. Run the command ` cf ic route map -n <appHost> -d mybluemix.net  gonodegroup`. This will make your containers available at <appHost>.mybluemix.net.
5. Run the command `cf ic group instances gonodegroup` to check the status of your instances. Once they are in "Running" state your group is ready to use.

##### Next step

Now you need to [register your room](#registering-your-room) using the Websocket URL. Go to your app endpoint, either by going directly to the URL or by clicking on the route in your Bluemix Dashboard to see your Websocket URL. This will vary by region, but should look something like:
  * US South: `ws://<cf-app-name>.mybluemix.net/room`
  * United Kingdom: `ws://<cf-app-name>.eu-gb.mybluemix.net/room`
