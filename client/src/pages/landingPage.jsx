// hah om sai ram om bhaskaraya namaha om namaha sivayaa 

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate(); // initializing navigate
  return (
    <div className="min-h-screen bg-[radial-gradient(circle,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 md:px-12 py-6">
        <div className="flex items-center gap-2 text-lg font-bold">
          <div className="rounded-full bg-black w-6 h-6" />
          <span>Plivo Pulse</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1 cursor-pointer font-medium">
            Product <ChevronDown className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-1 cursor-pointer font-medium">
            Resources <ChevronDown className="w-4 h-4" />
          </div>
          <div className="cursor-pointer font-medium">Pricing</div>
          <div className="cursor-pointer font-medium">Docs</div>
        </nav>
        <Button className="rounded-full bg-black text-white hover:bg-gray-900 px-6 py-2 text-sm"
        onClick={() => navigate("/signin")}>
          Sign In
        </Button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 md:px-12 py-20">
        <div className="text-xs font-medium bg-muted px-3 py-1 rounded-full mb-6 text-muted-foreground border border-border">
          Proudly Open Source
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold max-w-4xl leading-tight text-gray-900">
          A better way to monitor your <br className="hidden md:block" />
          services.
        </h1>

        <p className="text-lg mt-6 max-w-2xl text-muted-foreground">
          Monitor your API and website globally, identify performance issues,
          downtime and receive alerts before your users are affected.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button className="rounded-full px-6 py-2 text-sm" onClick={() => navigate("/signup")}>Get Started</Button>
          <Button variant="outline" className="rounded-full px-6 py-2 text-sm">
            Star on GitHub <span className="ml-2">7.1K</span>
          </Button>
        </div>
      </section>
    </div>
  );
}
