import Header from "@/components/Header";
import "@fontsource/khand/700.css";
import "@fontsource/quicksand/400.css";

export const metadata = {
  title: "Other Projects & Experiments | Otto AI Portfolio",
  description: "Explore Daniel's side projects, branding explorations, and creative experiments.",
};

export default function OtherPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-6 font-[Quicksand]">
      <Header />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-[Khand] font-bold mb-6">Other Work...</h1>
        <p className="text-gray-300 leading-relaxed">
          This is a place for everything else Daniel feels like sharing his other skills — such graphic work and his first novel (still in progress).
        </p>
        {/* <ul className="list-disc list-inside mt-4 text-gray-300 space-y-2">
          <li>👾 Experimental UI designs</li>
          <li>🎨 Branding & identity concepts</li>
          <li>📚 Work-in-progress projects & prototypes</li>
          <li>🧠 Random bits that don’t fit anywhere else</li>
        </ul> */}
      </div>
    </main>
  );
}
