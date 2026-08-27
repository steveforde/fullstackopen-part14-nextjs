import AuthSessionProvider from "./components/SessionProvider"
import NavBar from "./components/NavBar"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>
          <NavBar />
          <main style={{ padding: "1rem" }}>{children}</main>
        </AuthSessionProvider>
      </body>
    </html>
  )
}