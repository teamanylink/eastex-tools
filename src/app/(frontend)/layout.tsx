import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]">
      <Header />
      <main className="flex-1 pt-28">
        {children}
      </main>
      <Footer />
    </div>
  )
}
