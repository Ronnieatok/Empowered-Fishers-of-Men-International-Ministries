import "@/styles/globals.css";
import Preloader from "@/components/layout/Preloader";

export const metadata = {
  title: "Empowered Fishers of Men International Ministries",
  description: "Off to go where the people are and empower every Christian to become a witness.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
