
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MagicWandIcon, RocketIcon, DownloadIcon, CopyIcon, CodeIcon, EyeOpenIcon, ResetIcon } from '@radix-ui/react-icons';
import { generateWebsite, convertToHTML, WebsiteData } from '@/lib/generator';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Dashboard: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<WebsiteData | null>(null);
  const [htmlCode, setHtmlCode] = useState('');

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description for your website.");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate generation time
    setTimeout(() => {
      try {
        const data = generateWebsite(prompt);
        const html = convertToHTML(data);
        setGeneratedData(data);
        setHtmlCode(html);
        setIsGenerating(false);
        toast.success("Website generated successfully!");
      } catch (err) {
        setIsGenerating(false);
        toast.error("Failed to generate website.");
      }
    }, 2000);
  };

  const handleDownload = () => {
    if (!htmlCode) return;
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedData?.title?.toLowerCase().replace(/\s+/g, '-') || 'index'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Download started!");
  };

  const handleCopy = () => {
    if (!htmlCode) return;
    navigator.clipboard.writeText(htmlCode);
    toast.success("Code copied to clipboard!");
  };

  return (
    <div className="grid gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl gradient-text">
          Create Your Website
        </h1>
        <p className="text-muted-foreground text-lg">
          Describe what you need, and our AI will build it in seconds.
        </p>
      </div>

      <Card className="glass-card shadow-2xl border-primary/20">
        <CardContent className="p-8">
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <label className="text-sm font-semibold text-primary uppercase tracking-widest">
                Describe your website
              </label>
              <Textarea 
                placeholder="e.g., A modern seafood restaurant called 'Ocean Blue' with a dark theme and blue primary colors. Include a menu section."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[150px] text-lg bg-background/50 border-primary/20 focus-visible:ring-primary/40 resize-none transition-all focus-visible:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
              />
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating}
                size="lg"
                className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95"
              >
                {isGenerating ? (
                   <span className="flex items-center gap-2">
                     <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Generating...
                   </span>
                ) : (
                  <>
                    <MagicWandIcon className="w-5 h-5" />
                    Generate Website
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setPrompt('')}
                className="gap-2 border-border/50 hover:bg-background/80 px-8 py-6 rounded-xl transition-all"
              >
                <ResetIcon className="w-5 h-5" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {generatedData && (
        <div className="animate-fade-in space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Preview & Export</h2>
            <div className="flex gap-4">
              <Button variant="outline" className="gap-2 glass border-primary/20 hover:bg-primary/10" onClick={handleCopy}>
                <CopyIcon className="w-4 h-4" />
                Copy Code
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90" onClick={handleDownload}>
                <DownloadIcon className="w-4 h-4" />
                Download HTML
              </Button>
            </div>
          </div>

          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 mb-6 rounded-xl">
              <TabsTrigger value="preview" className="rounded-lg py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                <div className="flex items-center gap-2">
                  <EyeOpenIcon className="w-4 h-4" />
                  Live Preview
                </div>
              </TabsTrigger>
              <TabsTrigger value="code" className="rounded-lg py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                <div className="flex items-center gap-2">
                  <CodeIcon className="w-4 h-4" />
                  Source Code
                </div>
              </TabsTrigger>
              <TabsTrigger value="deploy" className="rounded-lg py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                <div className="flex items-center gap-2">
                  <RocketIcon className="w-4 h-4" />
                  How to Deploy
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-0 ring-offset-background focus-visible:outline-none">
              <div className="rounded-2xl overflow-hidden border border-border/50 bg-white shadow-2xl aspect-[16/10] min-h-[600px] relative">
                <iframe 
                  title="Generated Website Preview"
                  srcDoc={htmlCode} 
                  className="w-full h-full border-none"
                  sandbox="allow-scripts allow-forms allow-same-origin"
                />
              </div>
            </TabsContent>
            <TabsContent value="code" className="mt-0 ring-offset-background focus-visible:outline-none">
              <pre className="p-8 rounded-2xl bg-muted/30 border border-border/50 overflow-x-auto text-sm font-mono leading-relaxed h-[600px]">
                <code>{htmlCode}</code>
              </pre>
            </TabsContent>
            <TabsContent value="deploy" className="mt-0 ring-offset-background focus-visible:outline-none">
              <Card className="glass shadow-none border-none">
                <CardContent className="p-8 space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary">
                      🚀 Deploy Your Website for Free
                    </h3>
                    <p className="text-muted-foreground">Follow these simple steps to put your website online.</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div className="space-y-4">
                      <h4 className="font-bold text-lg">Option 1: Netlify (Easiest)</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                        <li>Go to <a href="https://app.netlify.com/drop" target="_blank" className="text-primary hover:underline">Netlify Drop</a>.</li>
                        <li>Drag and drop the downloaded <code>index.html</code> file.</li>
                        <li>Your site is live instantly with a free subdomain!</li>
                      </ol>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-lg">Option 2: Vercel</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                        <li>Install Vercel CLI or use their dashboard.</li>
                        <li>Upload your project folder.</li>
                        <li>Follow the prompts to deploy.</li>
                      </ol>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-lg">Option 3: GitHub Pages</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                        <li>Create a new repository on GitHub.</li>
                        <li>Upload your <code>index.html</code> file.</li>
                        <li>Enable "Pages" in repository settings.</li>
                      </ol>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-lg">Option 4: Custom Domains</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                        <li>Get a free domain from Freenom (if available).</li>
                        <li>Link it to Netlify/Vercel via DNS settings.</li>
                        <li>Enjoy your professional web address!</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>
      )}

      {/* Feature Cards for Dashboard */}
      {!generatedData && !isGenerating && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            { title: "No Code Required", desc: "Just text prompts, zero coding needed.", icon: "✨" },
            { title: "Responsive Design", desc: "Mobile, tablet, and desktop ready.", icon: "📱" },
            { title: "Instant Export", desc: "Download clean HTML/CSS files.", icon: "📥" }
          ].map((feature, i) => (
            <Card key={i} className="glass border-primary/10 hover:border-primary/30 transition-all hover:scale-[1.02]">
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{feature.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
