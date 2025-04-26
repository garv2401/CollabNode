# CollabNode

**CollabNode** is a Quora-inspired full-stack discussion platform built using **Next.js**, **React**, **TypeScript**, and **Prisma**. It enables users to share knowledge, engage in discussions, and discover content with ease.

## Features

- GitHub authentication for secure and seamless login  
- Create, like, comment on, and delete posts (if you're the author)  
- View all posts you've shared, liked, or saved  
- Powerful search bar to explore content site-wide  
- Full route caching, server-side rendering (SSR), and on-demand revalidation for optimal performance

## Tech Stack

- **Frontend:** Next.js, React, TypeScript  
- **Backend:** Next.js API Routes  
- **Database:** sqlite with Prisma ORM  
- **Authentication:** GitHub OAuth via NextAuth.js  
- **Deployment:** Render

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/collabnode.git
cd collabnode
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_URL=your_postgresql_database_url
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

> Tip: You can get `GITHUB_ID` and `GITHUB_SECRET` from GitHub Developer Settings.

### 4. Set up the database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the development server

```bash
npm run dev
```

Visit `http://localhost:3000` to explore the app locally.

## Live Demo

[https://collabnode.vercel.app](https://collabnode.vercel.app)

## Contributing

Contributions are welcome! Feel free to open issues, suggest improvements, or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

---

Built with passion and curiosity — feedback is always appreciated!

