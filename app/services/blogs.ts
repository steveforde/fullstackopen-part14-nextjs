const blogs = [
  {
    id: 1,
    title: "React Server Components Explained",
    author: "Dan Abramov",
    url: "https://react.dev",
    likes: 12,
  },
  {
    id: 2,
    title: "Full Stack Open Next.js Journey",
    author: "Matti Luukkainen",
    url: "https://fullstackopen.com",
    likes: 25,
  },
  {
    id: 3,
    title: "Routing in Next.js App Router",
    author: "Vercel Team",
    url: "https://nextjs.org",
    likes: 8,
  },
]

let nextId = 4

export const getBlogs = () => {
  return blogs
}

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 })
}