# :books: Poll Platform

## Prerequisites
You need to have `node` and `npm` or `yarn` installed on your machine.

## :hammer: Installation guide

1. Clone the repo
```sh
git clone git@github.com:Miaababikir/poll-platform.git 
```
2. Install dependencies
```sh
npm install 
```
3. Copy `.env.example` to `.env`
```sh
cp .env.example .env
```
4. Set up the database configuration on the `.env` file
5. Update the `data-source.ts` on `database` folder with your database credentials
6. Run database seeder
```sh
npm run seed
```
8. Now you are good to go :fire: .