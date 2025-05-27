import Header from "@/components/Header";
import "@fontsource/khand/700.css";
import "@fontsource/quicksand/400.css";

export const metadata = {
  title: "About Daniel Sydney | Otto AI Portfolio",
  description: "Learn more about Daniel&apos;s background, design approach, and professional experience.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-6 font-[Quicksand]">
      <Header />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-[Khand] font-bold mb-6">Hi, I&apos;m Daniel...thanks for stopping by.</h1>
        
        <p className="text-gray-300 leading-relaxed">
          Firstly, thank you stopping by for a quick visit 👋🏾
        </p>

        <p className="text-gray-300 mt-4 leading-relaxed">
          I&apos;m a freelance Product and UX/UI Designer with over 8 years experience. With my background originally in web development, 
          I am multi-disciplined, with a User-Centered approach to design, research and prototyping with keen attention to detail from 
          concept to execution.
        </p>       

        <p className="text-gray-300 mt-4 leading-relaxed">
          I&apos;ve worked with startups and well established companies in the UK such as Capita, AXA, NatWest Bank, NorthStandard, 
          Royal College of Nursing (RCN), Sage, Rohan Designs and Natterbox.
        </p>

        <p className="text-gray-300 mt-4 leading-relaxed">
          I&apos;m ready to help, guide, be a part of your team and work together!
        </p>
      </div>
    </main>
  );
}