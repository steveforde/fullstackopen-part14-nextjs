import Link from "next/link"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: "1rem", background: "#f0f0f0", borderBottom: "1px solid #ccc" }}>
          <Link href="/">home</Link>
          {" | "}
          <Link href="/blogs">blogs</Link>
        </nav>
        <main style={{ padding: "1rem" }}>{children}</main>
      </body>
    </html>
  )
}