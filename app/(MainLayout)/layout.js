import { Inter } from "next/font/google";
import "../globals.css";

import Navbar from "@/components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Event Planner",
  description: "Community event planner application. Create and attend events",
};

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <Navbar/>
          {children}
        </div>
      </body>
    </html>
  );
}
