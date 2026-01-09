import "./globals.css";
import NavBar from "../components/NavBar";
import Providers from "../components/Providers";

export const metadata = {
  title: "Dr. Victor Chukwu",
  description:
    "Official site of Dr. Victor Chukwu – books, programs, teachings, music, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
            <NavBar />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-slate-800 py-6 text-xs text-slate-400">
              <div className="mx-auto max-w-5xl px-4">
                <p>
                  © {new Date().getFullYear()} Dr. Victor Chukwu. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
