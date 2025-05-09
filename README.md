# Respire Frontend

This is the frontend codebase for the Respire social media platform.

## Features

- User authentication
- News feed with posts
- Post creation and deletion
- User profiles
- Real-time notifications

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file with the following variables:

```
API_BASE="https://your-api-url.com"
NEXT_PUBLIC_API_BASE="https://your-api-url.com"
NEXT_PUBLIC_WS_BASE="wss://your-api-url.com"
```

## Tech Stack

- Next.js
- TypeScript
- Redux Toolkit
- Tailwind CSS
- React Bootstrap