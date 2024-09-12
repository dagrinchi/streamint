# Streamint
## Video platform Hackaton Luminarium LATAM 2024

### The idea

Create a descentralized video platform, enable direct transactions between content creators, video distributors and publishers.

1. First run the arfleet client with:

```
cd ./arfleet-js/backend
nvm use
npm install
cd ../
./arfleet client
```

2. Then, for running development backend project:


```
cd ./backend
mv .env.example .env
nvm use
npm install
npm run dev
```

3. Visit: [http://localhost:3000](http://localhost:3000)

4. Create a new account with Content Creator ROLE [http://localhost:3000/init](http://localhost:3000/init)

5. Then, Connect your Ar Connect Wallet [http://localhost:3000/wallet](http://localhost:3000/wallet)

6. Now you're ready to create and upload your new videos in [http://localhost:3000/posts/create](http://localhost:3000/post/create)

7. And finally, for running development frontend project

```
cd ./frontend
mv .env.example .env
nvm use
npm install
npm run dev
```

8. Visit: [http://localhost:8080](http://localhost:8080) for video scrolling visualization

### Libraries

I'm using mainly [keystonejs](https://keystonejs.com/), [NextJS](https://nextjs.org/), [arweave-wallet-kit](https://docs.arweavekit.com/wallets/wallet-kit) and [ArFleet](https://github.com/aoacc/arfleet-js)


### What's next

I would like to explore LUA and [Autonomous Finance](https://www.autonomous.finance/) to automate the videos monetization process.


Wilson David Alméciga

Discord - dagrinchi

[![protocol.land](https://arweave.net/eZp8gOeR8Yl_cyH9jJToaCrt2He1PHr0pR4o-mHbEcY)](https://protocol.land/#/repository/e378cae0-a692-4b09-aa82-82196a45d31f)