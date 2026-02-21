
export interface WebsiteData {
  title: string;
  description: string;
  theme: 'light' | 'dark';
  primaryColor: string;
  sections: Section[];
}

export interface Section {
  type: 'hero' | 'about' | 'services' | 'contact' | 'footer';
  content: any;
}

export const generateWebsite = (prompt: string): WebsiteData => {
  const lowerPrompt = prompt.toLowerCase();
  
  // Basic keyword extraction
  const isRestaurant = lowerPrompt.includes('restaurant') || lowerPrompt.includes('food') || lowerPrompt.includes('cafe');
  const isPortfolio = lowerPrompt.includes('portfolio') || lowerPrompt.includes('personal') || lowerPrompt.includes('developer');
  const isDark = lowerPrompt.includes('dark') || lowerPrompt.includes('black') || lowerPrompt.includes('night');
  
  const heroImage = isRestaurant ? 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_bcc36bff-2a93-4a7f-8840-937ffc8effdb.jpg' :
                    isPortfolio ? 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_ce1d2dbe-17ed-4ef4-9874-8a47d0324a21.jpg' :
                    'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_cfa820c3-59e8-4c9f-92c3-2282e39ba4b8.jpg';

  const title = extractTitle(prompt) || (isRestaurant ? 'Gourmet Delight' : isPortfolio ? 'Creative Portfolio' : 'Modern Website');
  
  const primaryColor = lowerPrompt.includes('blue') ? '#3b82f6' : 
                      lowerPrompt.includes('green') ? '#10b981' : 
                      lowerPrompt.includes('red') ? '#ef4444' : '#8b5cf6';

  const sections: Section[] = [
    {
      type: 'hero',
      content: {
        title: title,
        subtitle: extractSubtitle(prompt) || (isRestaurant ? 'Experience the best flavors in town.' : 'Building the future of the web with passion.'),
        buttonText: 'Get Started',
        image: heroImage
      }
    },

    {
      type: 'about',
      content: {
        title: 'About Us',
        text: isRestaurant ? 'We are a family-owned restaurant dedicated to providing high-quality food and a warm atmosphere.' : 
              isPortfolio ? 'I am a passionate creator with over 5 years of experience in the industry.' :
              'We are a team of professionals committed to excellence in everything we do.'
      }
    },
    {
      type: 'services',
      content: {
        title: isRestaurant ? 'Our Menu' : 'Our Services',
        items: isRestaurant ? [
          { name: 'Pasta Carbonara', description: 'Classic Italian pasta with eggs and bacon.', icon: '🍝' },
          { name: 'Margherita Pizza', description: 'Fresh tomatoes, mozzarella, and basil.', icon: '🍕' },
          { name: 'Tiramisu', description: 'Traditional coffee-flavored dessert.', icon: '🍰' }
        ] : [
          { name: 'Web Design', description: 'Beautiful and functional web interfaces.', icon: '🎨' },
          { name: 'Development', description: 'Robust and scalable web applications.', icon: '💻' },
          { name: 'SEO Optimization', description: 'Improve your search engine rankings.', icon: '🚀' }
        ]
      }
    },
    {
      type: 'contact',
      content: {
        title: 'Get In Touch',
        email: 'hello@example.com',
        phone: '+1 234 567 890'
      }
    },
    {
      type: 'footer',
      content: {
        copyright: `© 2026 ${title}. All rights reserved.`
      }
    }
  ];

  return {
    title,
    description: prompt,
    theme: isDark ? 'dark' : 'light',
    primaryColor,
    sections
  };
};

const extractTitle = (prompt: string): string | null => {
  const match = prompt.match(/called "([^"]+)"/) || prompt.match(/named "([^"]+)"/);
  return match ? match[1] : null;
};

const extractSubtitle = (prompt: string): string | null => {
  const match = prompt.match(/with subtitle "([^"]+)"/);
  return match ? match[1] : null;
};

export const convertToHTML = (data: WebsiteData): string => {
  const { title, theme, primaryColor, sections } = data;
  const isDark = theme === 'dark';
  
  const bg = isDark ? '#0a0a0a' : '#ffffff';
  const text = isDark ? '#f8fafc' : '#0f172a';
  const cardBg = isDark ? '#1a1a1a' : '#f1f5f9';

  let sectionsHtml = '';
  
  sections.forEach(section => {
    switch (section.type) {
      case 'hero':
        sectionsHtml += `
          <header class="min-h-screen flex items-center justify-center text-center px-4 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-full opacity-30 bg-cover bg-center" style="background-image: url('${section.content.image}')"></div>
            <div class="absolute top-0 left-0 w-full h-full opacity-70" style="background: radial-gradient(circle at center, ${bg} 20%, transparent 100%)"></div>
            <div class="relative z-10 max-w-4xl">
              <h1 class="text-5xl md:text-7xl font-bold mb-6" style="color: ${text}">${section.content.title}</h1>
              <p class="text-xl md:text-2xl mb-8 opacity-80" style="color: ${text}">${section.content.subtitle}</p>
              <button class="px-8 py-4 rounded-full font-bold text-white transition-transform hover:scale-105" style="background-color: ${primaryColor}">${section.content.buttonText}</button>
            </div>
          </header>
        `;
        break;
      case 'about':
        sectionsHtml += `
          <section id="about" class="py-24 px-4">
            <div class="max-w-4xl mx-auto text-center">
              <h2 class="text-4xl font-bold mb-8" style="color: ${text}">${section.content.title}</h2>
              <p class="text-lg leading-relaxed opacity-70" style="color: ${text}">${section.content.text}</p>
            </div>
          </section>
        `;
        break;
      case 'services':
        sectionsHtml += `
          <section id="services" class="py-24 px-4 bg-opacity-50" style="background-color: ${cardBg}">
            <div class="max-w-6xl mx-auto">
              <h2 class="text-4xl font-bold mb-16 text-center" style="color: ${text}">${section.content.title}</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                ${section.content.items.map((item: any) => `
                  <div class="p-8 rounded-2xl border border-opacity-10 transition-shadow hover:shadow-xl" style="background-color: ${bg}; border-color: ${primaryColor}">
                    <div class="text-4xl mb-4">${item.icon}</div>
                    <h3 class="text-2xl font-bold mb-4" style="color: ${text}">${item.name}</h3>
                    <p class="opacity-70" style="color: ${text}">${item.description}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>
        `;
        break;
      case 'contact':
        sectionsHtml += `
          <section id="contact" class="py-24 px-4">
            <div class="max-w-xl mx-auto">
              <h2 class="text-4xl font-bold mb-12 text-center" style="color: ${text}">${section.content.title}</h2>
              <form class="space-y-6">
                <div>
                  <input type="text" placeholder="Name" class="w-full p-4 rounded-xl border border-opacity-20 bg-transparent" style="color: ${text}; border-color: ${text}">
                </div>
                <div>
                  <input type="email" placeholder="Email" class="w-full p-4 rounded-xl border border-opacity-20 bg-transparent" style="color: ${text}; border-color: ${text}">
                </div>
                <div>
                  <textarea placeholder="Message" rows="5" class="w-full p-4 rounded-xl border border-opacity-20 bg-transparent" style="color: ${text}; border-color: ${text}"></textarea>
                </div>
                <button type="button" class="w-full py-4 rounded-xl font-bold text-white transition-opacity hover:opacity-90" style="background-color: ${primaryColor}">Send Message</button>
              </form>
            </div>
          </section>
        `;
        break;
      case 'footer':
        sectionsHtml += `
          <footer class="py-12 px-4 text-center border-t border-opacity-10" style="border-color: ${text}">
            <p class="opacity-50" style="color: ${text}">${section.content.copyright}</p>
          </footer>
        `;
        break;
    }
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: ${bg}; color: ${text}; scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${bg}; }
        ::-webkit-scrollbar-thumb { background: ${primaryColor}; border-radius: 4px; }
    </style>
</head>
<body>
    <nav class="fixed top-0 w-full z-50 backdrop-blur-md bg-opacity-70 px-6 py-4 flex justify-between items-center" style="background-color: ${bg}">
        <div class="text-2xl font-bold" style="color: ${primaryColor}">${title}</div>
        <div class="space-x-8 hidden md:flex">
            <a href="#about" class="hover:opacity-100 opacity-70 transition-opacity">About</a>
            <a href="#services" class="hover:opacity-100 opacity-70 transition-opacity">Services</a>
            <a href="#contact" class="hover:opacity-100 opacity-70 transition-opacity">Contact</a>
        </div>
    </nav>
    <main>
        ${sectionsHtml}
    </main>
</body>
</html>
  `.trim();
};
