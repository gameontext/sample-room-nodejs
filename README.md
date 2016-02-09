# Microservices with a Game On! Room
[Game On!](https://game-on.org/) is both a sample microservices application, and a throwback text adventure brought to you by the wasdev team at IBM. It aims to do a few things:

- Provide a sample microservices-based application.
- Demonstrate how microservice architectures work from two points of view:
 - As a Player: Naviagate through a network/maze of rooms, where each room is a unique implementation of a common API. Each room supports chat, and interaction with items (some of which may be in the room, some of which may be separately defined services as well).
 - As a Developer: Learn about microservice architectures and supporting infrastructure by extending the game with your own services. Write additional rooms or items and see how they interact with the rest of the system.


##Introduction

This walkthrough will guide you through adding a room to a running Game On! server.  You will be shown how to setup a container based room that is implemented in the Go programming language.  There are also instructions for deploying a similar room written in Node.js that is deployed as a Cloud Foundry application in Bluemix.  Both of these rooms take a microservice approach to adding a room to a running Game On! text adventure game server.  

### Installation prerequisites

Gameon-room-nodejs when deployed using an instant runtime requires:

- [Bluemix account](https://console.ng.bluemix.net)
- [IBM DevOps Services Account](https://hub.jazz.net/register)
- [GitHub account](https://github.com/)


## Create Bluemix accounts and log in
To build a Game On! room in Bluemix, you will first need a Bluemix account. 

### Sign up and log into Bluemix and DevOps
Sign up for Bluemix at https://console.ng.bluemix.net and DevOps Services at https://hub.jazz.net. When you sign up, you'll create an IBM ID, create an alias, and register with Bluemix.


## Get Game On! API Key and User ID
For a new room to register with the Game On! server, you must first log into game-on.org and sign in using one of several methods to get your Game On! user ID and ApiKey.

1.	Go to https://game-on.org/ and click **Play**
2.	Select any authentication method to log in with your username and password for that type.
3.	Click the **Edit Profile** button(the person icon) at the top right.
4.	You should now see the ID and API key at the bottom of the page.  You may need to refresh the page to generate the API key.  You will need to make note of your API key for later in the walkthrough.

## Getting the source code

The source code is located on GitHub, navigate to our [source code](https://github.com/cfsworkload/gameon-room-nodejs) and fork the project into your own repository.  

 1. Navigate to [IBM DevOps](https://hub.jazz.net/)
 2. Click on **CREATE PROJECT**
 3. Select **Link to an existing GitHub repository**
 4. Select **Link to a Git Repo on GitHub**
 5. Click on the dropdown menu that appears, and choose your newly forked project.  
 6. Chose your **Region**, **Organization**, and **Space**.  Generally the defaults will be sufficient.
 7. Click **CREATE**.  The create button will fork your GitHub project into IBM DevOps services, and redirect you to your new project.  

## Updating Code with Game On! credentials

### Configure Node.js room

Once you have created your new project, you will be able to configure the room to your liking.

 1. From your [IBM DevOps](https://hub.jazz.net/) project, click **EDIT CODE** located in the top right corner of your project's overview page.
 2. Select the **server.js** file, you will have to adjust 4 values near the top of the file
	 
	 -  **gameonAPIKey** - Use the ApiKey value from the game-on.org user settings page.
	 - **gameonUID** : Use the Id value from the game-on.org user settings page.
	 - **endpointip** : This will be the hostname of your applicaiton.  By default it will be your projectname.mybluemix.net
	 - **theRoomName**:  Name your room!

 3. Press the Play button to deploy your application to Bluemix.


