// app/layout.jsx
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header"; // Make sure this file exists: Header.jsx
import { checkUser } from "@/lib/checkUser";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Career Coach",
  description: "Your personal AI career guidance app",
};

export default async function RootLayout({ children }) {
  await checkUser();
  return (
    <ClerkProvider>
      <html lang="en">
        <head />
        <body className={inter.className}>
          <Header />
          <main className="min-h-screen">{children}</main>

          <footer className="bg-gray-900 text-gray-400 py-6 mt-10">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-center md:text-left">
                © {new Date().getFullYear()} CareerCoach AI. Made by Meghana.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a
                  href="https://github.com/your-github"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  GitHub
                </a>
                <a
                  href="mailto:your-email@example.com"
                  className="hover:text-white transition"
                >
                  Contact
                </a>
                <a href="#about" className="hover:text-white transition">
                  About
                </a>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
