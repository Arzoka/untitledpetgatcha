# Untitledpetgatcha
(doesnt have a name yet)

## Description

This is a discordjs bot that allows rolling for pets, daily rewards, and 10+ commands. This was a silly little weekend side-project and will most likely be getting updated from now on as I'm really enjoying it.

## Installation

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file in the root directory and add the following
```
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_database_url
```
4. Run npx prisma migrate dev
5. Run npx prisma db push
6. Run npx prisma generate
7. Run `npm run deploy-cmds`
8. Run `npm run dev`

## Dependancies
- discord.js
- dotenv
- prisma
- supabase

## How does it work?
- The bot uses <a href="https://www.discord.js.org">discordjs</a> to listen to and register commands.
- <a href="https://supabase.com/">supabase</a> for the database, as its free for a limited amount of data and works well with Prisma.
- <a href="https://www.prisma.io/docs/">prisma</a> to interact with the database.
- <a href="https://www.npmjs.com/package/dotenv">dotenv</a> to load environment variables from a .env file.
- Currently using javascript, planning to switch to typescript soon as in my opinion it's a much nicer development experience.

