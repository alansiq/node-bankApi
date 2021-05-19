# Rocketseat's FinApi #01 

Part of Rocketseat's introductory course to NodeJs. The goal is to develop a simple API and learn further about HTTP requests.

During this introductory part of the course I learned the basics about HTTP requests, Express.js usage with Node and also the concept of middlewares. 🚀

This repo is using Nodemon for a better development experience. You can run it after installing with:
```bash
npm run dev
```
or

```bash
yarn dev
```

### What have I learned?

I wrote a post in my blog to help my learning process during this course. This challenge was short, but it's always good to revisit de basics on HTTP requests and the usage of Express. You can check out the blog post about this repository accessing [this link](https://www.alansiqueira.com/blog/http-101).

## Requirements:
- [X] Should be able to create an account.
- [X] Should be able to search for a customer's bank statement.
- [X] Should be able to make a deposit.
- [X] Should be able to withdraw money.
- [X] Should be able to search account info filtering dates.
- [X] Should be able to obtain a customer's account data.
- [X] Should be able to delete an account.

## Business rules:
- [X] Should not be able to register two accounts with the same SSN.
- [X] Should not be able to deposit money into a non-existant account.
- [X] Should not be able to get a bank statement from a non-existant account.
- [X] Should not be able to withdraw from a non-existant account.
- [X] Should not be able to delete a non-existant account.
- [X] Should not be able to withdraw if there's not enough money in the account. 