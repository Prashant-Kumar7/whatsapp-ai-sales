
# WhatsApp Ai sales

A brief description of what this project does and who it's for


## Getting Started:

### Setting up next-app locally

First clone the repository locally, by running the following command







```bash
git clone https://github.com/codes30/whatsapp-ai-sales.git
```

Next step, cd inside the repo. run the following

```bash
cd whatsapp-ai-sales/next-app
```

Next, install all the dependency. run the following.
Using ```npm``` to install the packages

```bash
npm i
```
To start the project locally in development mode, run.

```bash
npm run dev
```



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`

`NEXTAUTH_URL`

`NEXTAUTH_SECRET`

`AWS_REGION`

`AWS_ACCESS_KEY_ID`

`AWS_SECRET_ACCESS_KEY`

`AWS_S3_BUCKET_NAME`


## Appendix

Any additional information goes here

```AWS_ACCESS_KEY_ID``` and ```AWS_SECRET_ACCESS_KEY``` is generate from the IAM user

give ```CORS``` permission to the local server where app is running.

Also give ```Access``` permission to the IAM user by setting up ```polices``` 
