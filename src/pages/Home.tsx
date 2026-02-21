
import React from 'react';
import { Button } from '@/components/ui/button';
import { RocketIcon, MagicWandIcon, GitHubLogoIcon, ExternalLinkIcon, StarFilledIcon, CheckCircledIcon, LightningBoltIcon, DesktopIcon, MobileIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/10 py-4 px-6 md:px-20 flex justify-between items-center transition-all">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20">
            AI
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            WebGen
          </span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {['Features', 'Pricing', 'Showcase', 'About'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button className="rounded-full px-8 py-5 font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              Go to App
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-32 px-6 text-center overflow-hidden">
        <div className="hero-glow" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-500/10 blur-[100px] rounded-full" />
        
        <div className="max-w-5xl mx-auto relative z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 mb-8 animate-bounce shadow-lg shadow-primary/5">
            <StarFilledIcon className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold tracking-widest uppercase">The Future of Web Design is Here</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[1.1] md:leading-[1.05]">
            Build Your Website with <br />
            <span className="gradient-text">Pure Imagination.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            Just describe your business, and our AI will generate a complete, 
            responsive, and high-converting website in seconds. No code, no stress.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/dashboard">
              <Button size="lg" className="rounded-2xl px-12 py-8 text-xl font-bold bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 transition-all hover:-translate-y-2 group">
                <MagicWandIcon className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                Start Building Free
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="rounded-2xl px-12 py-8 text-xl font-bold glass hover:bg-white/5 transition-all">
              View Showcase
            </Button>
          </div>
          
          <div className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all cursor-default">
            {['Trustpilot', 'Product Hunt', 'Capterra', 'G2 Crowd'].map((brand) => (
              <span key={brand} className="text-2xl font-bold tracking-tighter">{brand}</span>
            ))}
          </div>
        </div>
      </header>

      {/* Social Proof Section */}
      <section className="py-24 px-6 bg-muted/20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="text-5xl font-extrabold text-primary">10k+</div>
            <div className="text-muted-foreground font-medium">Websites Built</div>
          </div>
          <div className="space-y-4">
            <div className="text-5xl font-extrabold text-primary">4.9/5</div>
            <div className="text-muted-foreground font-medium">User Satisfaction</div>
          </div>
          <div className="space-y-4">
            <div className="text-5xl font-extrabold text-primary">2 Sec</div>
            <div className="text-muted-foreground font-medium">Generation Time</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Supercharge Your Presence</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to launch a professional website today.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "One-Click AI Gen", 
                desc: "Describe your brand and let the AI handle the layout, design, and content.",
                icon: MagicWandIcon 
              },
              { 
                title: "Fully Responsive", 
                desc: "Your website looks perfect on every screen size, from mobile to desktop.",
                icon: MobileIcon 
              },
              { 
                title: "Clean Export", 
                desc: "Download high-quality HTML/CSS code that you can host anywhere.",
                icon: RocketIcon 
              },
              { 
                title: "Lightning Fast", 
                desc: "Optimized code for maximum speed and SEO performance.",
                icon: LightningBoltIcon 
              },
              { 
                title: "Glassmorphism UI", 
                desc: "Modern design system with beautiful blurs and gradients.",
                icon: DesktopIcon 
              },
              { 
                title: "Zero Setup", 
                desc: "No backend, no accounts, no complexity. Just create and download.",
                icon: CheckCircledIcon 
              }
            ].map((feature, i) => (
              <div key={i} className="p-10 rounded-3xl glass border-primary/10 hover:border-primary/40 hover:bg-primary/5 transition-all hover:scale-[1.02] flex flex-col items-start gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10" />
        <div className="max-w-4xl mx-auto glass border-primary/30 p-16 md:p-24 rounded-[3rem] text-center shadow-[0_0_100px_rgba(139,92,246,0.15)] animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-8 tracking-tighter">Ready to launch <br /> your big idea?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto">
            Join thousands of creators who are building the next generation of the web with AI.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="rounded-2xl px-16 py-8 text-xl font-bold bg-primary hover:bg-primary/90 transition-all hover:-translate-y-2">
              Build My Website
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border/10 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              AI
            </div>
            <span className="font-bold text-xl tracking-tight">WebGen</span>
          </div>
          <p className="text-muted-foreground">© 2026 AI WebGen. All rights reserved.</p>
          <div className="flex gap-6">
            <GitHubLogoIcon className="w-6 h-6 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
            <ExternalLinkIcon className="w-6 h-6 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
};
