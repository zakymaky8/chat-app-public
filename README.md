## Front end Chat App

## Contents

[Description](#description)
[Tech Stack](#tech-stack-used)
[Installation](#installation)
[Contribution](#contribution)
1. [option 1](#option-1)
2. [option 2](#option-2)

[Liscense](#license)
[Deployement](#deployement)
[Live Demo](#live-demo)


## Description
- Front end chat application, which is made to streamline messaging exprerience between two users.

#### How it works;
1. First a user must create an account to be involved in messaging chatmates.
2. A user can be logged in using either his/her username or email.

After #1 and #2 achieved successfully, user can start chat in the following ways

3. The user can only find his/her chatmate by searching chatmate's perfectly typed username so the user must know his/her chatmate's username beforehand.
4. Then according to chatmate's searchablilty setting the user might get the user or will be notified there was restrictions.
5. So assuming the chatmate's preference is good to go, and result found using username, the user will be provided with **Chat** button to start chat. During this a pair will be created regardless of the chatmate whether approved or not evenif there was no chat message sent between pairs.
6. A person can stop others from searching him/her or chatting him. this way unsolicited pairs will be hindered.
7. If user deletes the whole chat with chatmate, it will be deleted on the other side too. (this will be updated with better functionalities later or you are welcome to work on it by following what is on [contributions](#contribution)) section.
8. Active and Offline statuses are with just logging in and out respectively. Other improvements are intended to be added or you are welcome to.


## Tech Stack used

1. **Front end frameword** : Here ***Next js*** is used to build interfaces, to aquire benefits from server side rendering and good user experience.
2. **CSS framework**: ***TailwindCSS***, utility first framework which flourished this applications in almost every stylings and micro-interactive functionalities for better user experience.
3. **Type safe development**: **TypeScript**, has been the go to languange these days to make typing perfect, so I used it.
4. **Web socket**: Socket io client is used to streamline real time communication between the server and client.

## Features


## Installation

To install the packages, use the following steps
1. open your terminal in VS code( if you use so):
    `ctrl + backtick `

2. Then do

```bash
npm install
```

3. To Run the app in your dev server

```bash
npm run dev #then develpement server will start listening on port 3008, you can change it from package.json file
```
## Features

1. **Search** users can search other users using their username and create a pair.
2. **Chat with self**: Chats with self or saving thoughts without being on the track of nobody else's surveilliance.
3. **Setting and preferences**: it allows a user to 
    1. Set theme,
    2. Decide on whether otehrs can search him/her or can't,
    3. Decide on which person can chat with him/her, for existing chatmates or new comers.
    4. Select specific usernames allowed to chat with him/her.
    5. Change basic profile information
    6. Change password
4. **Active and Online status**: It allows users to see their chatmate's online status.
5. **Deleting**, **editing** a message and a **replying** pointed to specific message.


## Contribution

Contributions are welcome. Your suggestions are invaulable to me. If you plan to do so, follow the following steps in two different ways.
#### Option 1

1. Fork the repository, if you want to work on it on your dedicated repository,
2. Optimize per use suitability in your local machine (it is all yours after that, but I would love to see your suggestions)
3. And code around limitlesslly

#### Option 2
1. Clone the repository (have the exact copy of the codebase on your local machine);
2. Create an issue for your intended changes.
3. Create a branch for that issue.
4. Then change to the root directory while your are at it do,
``` bash
    git fetch --all
    git checkout [your_branch_name]
```
5. Make changes on that branch.
6. After you are comfortable with your new feature or suggestions (whatever), you would be benefited from
    ```
    git pull origin [main_branch]
    ```
7. Finally push your changes
    ```
    git push
    ```
8. Create pull request, I am there to approve.

## License
This project is licensed under the [MIT License](https://github.com/Uwancha/memory-card/blob/main/LICENSE). Feel free to play around manipulating it.

## Deployement

This front end application is deployed on [vercel](https://vercel.com/), and the

1. **API**: is served on [Render](https://render.com), which serves the frontend app
2. **Database**: mongodb database is awesomely served from [Mongodb Atlas](https://cloud.mongodb.com/), which keeps track of **CRUDing** attempts.


## Live Demo

Application is Live at [chat_with_chatter](https://chatwithchatter.vercel.app/).