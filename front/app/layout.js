import RequireAuth from "./components/RequireAuth";
import "./globals.css";

export const metadata = {
  title: "Permission",
  description: "Permission Nextjs Nodejs MERN",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased `}>
          <div className="min-h-screen bg-gray-100">
          <RequireAuth>
           {children}
          </RequireAuth>
          </div>
      </body>
    </html>
  );
}
