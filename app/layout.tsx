import "./globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import { auth } from "@/auth";

export const metadata = {
  title: "propmtopia",
  description: "Discover & shar AI prompts",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  return (
    <html lang="en">
      <Provider session={session}>
        <body>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </body>
      </Provider>
    </html>
  );
}
