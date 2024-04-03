This is a is inspired by project propmtopia created by [adrianhajdin](https://github.com/adrianhajdin) His YouTube Channel [JavaScript Mastery](https://www.youtube.com/@javascriptmastery).

I created this project using NextJs with TypeScript. And instedad of using mongoose for database connection I used Prisma(ORM) just for practicing and learning Prisma. 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).  
[Visit Website](https://promptopia-psi-umber.vercel.app/)

## Getting Started

- Install all the dependencies `npm i`

- Add Eviroment Variables
```
NEXTAUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL=
NEXTAUTH_URL=
```
- for NextAuth Secret add a random generated string
- For `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` you have to create an application on google console and get ID and SECRET
- In `DATABASE_URL` add your database connection string
- In NEXTAUTH_URL add your applications url
- Initialize prisma `npx prisma init`
- Generate the schema mentioned in the schema file `npx prisma generate`
- Now run the development server `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
