# Microservices with a Game On! Room
[Game On!](https://game-on.org/) is both a sample microservices application, and a throwback text adventure brought to you by the wasdev team at IBM.

This application demonstrates how microservice architectures work from two points of view:

1. As a Player: Navigate through a network/maze of rooms, where each room is a unique implementation of a common API. Each room supports chat, and interaction with items (some of which may be in the room, some of which might be separately defined services as well).
2. As a Developer: Learn about microservice architectures and their supporting infrastructure by extending the game with your own services. Write additional rooms or items and see how they interact with the rest of the system.


##Introduction

This solution explores microservice architectures via a text adventure game. You can learn more about Game On! at [http://game-on.org/](http://game-on.org/).

This walkthrough will guide you through adding a room to a running Game On! microservices application.  You will be shown how to setup a Node.js room that is deployed as a Cloud Foundry application in Bluemix. 

### Installation prerequisites

Gameon-room-nodejs when deployed using an instant runtime requires:

- [Bluemix account](https://console.ng.bluemix.net)
- [IBM DevOps Services Account](https://hub.jazz.net/register)
- [GitHub account](https://github.com/)


## Create Bluemix accounts and log in
To build a Game On! room in Bluemix, you will first need a Bluemix account. 

### Sign up and log in to Bluemix and DevOps
Sign up for Bluemix at https://console.ng.bluemix.net and DevOps Services at https://hub.jazz.net. When you sign up, you'll create an IBM ID, create an alias, and register with Bluemix.

## Get Game On! ID and Shared Secret
For a new room to register with the Game On! server, you must first log into game-on.org and sign in using one of several methods to get your **Game On! ID** and **Shared Secret**.

1.  Go to [https://game-on.org/](https://game-on.org/) and click **Play**.
2.  Select an authentication method and log in with your user name and password for that type.
3.  Click the **Edit Profile** button at the upper right.
4.  You should now see **Game On! ID** and **Shared Secret** near the bottom of the page.  (If necessary, refresh the page, or even log out and log back in, to generate your **Shared Secret**).  Please make note of your **Game On! ID** and **Shared Secret** for later in the walkthrough.

## Getting the source code

Our source code is stored on GitHub. 

1. Head the project's [GitHub](https://github.com/cfsworkload/gameon-room-nodejs) repository and fork it to your own GitHub repository.
2. Navigate to [IBM DevOps](https://hub.jazz.net/).
3. Click **CREATE PROJECT**.
4. Select **Link to an existing GitHub repository**.
5. Select **Link to a Git Repo on GitHub**.
6. Choose your newly forked project from the dropdown menu that appears. 
7. Choose your **Region**, **Organization**, and **Space**.  Generally the defaults will be sufficient.
8. Click **CREATE**.  This will fork your GitHub project into IBM DevOps services, and redirect you to your new project.

## Configure your room

Once you have created your new project, you will be able to configure the room to your liking.

1. From your [IBM DevOps](https://hub.jazz.net/) project, click **EDIT CODE** at the upper right corner of your project's overview page.
2. Select the **server.js** file. You will have to adjust 4 values near the top of the file
	 
	 - **gameonAPIKey** - Use the ApiKey value from the game-on.org user settings page.
	 - **gameonUID** : Use the ID value from the game-on.org user settings page.
	 - **endpointip** : This will be the host name of your app, which by default will be your projectname.mybluemix.net
	 - **theRoomName**:  Name your room!

3. Press Play to deploy your app to Bluemix.

## Access room on Game On!
Once the room is set up and it has registered with the server, it will be accessible on [Game On!](https://game-on.org/). It may take a moment for the room to appear.

1. Log in to [Game On!](https://game-on.org/) using the authentication method you used to create your user ID and shared secret for the registered room.
2. Use the Game On! command `/listmyrooms` from The First Room, to see your list of rooms. Once your room is registered, it will appear in that list.
3. To get to your room, navigate through the network or go directly to it using the `/teleport` command from The First Room.

### List of host provided commands
The Game On! host provides a set a universal commands:
- **/exits** - List of all exits from the current room.
- **/help** - List all available commands for the current room.
- **/sos** - Go back to The First Room.

### The First Room commands
The First Room is usually where new users will start in Game On!. From there, additional commands are available and maintained by the Game On!. For the list of current commands use the `/help` command.
