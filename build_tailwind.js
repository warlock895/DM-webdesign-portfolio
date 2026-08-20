const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'ytchnl-static');

const tailwindConfig = `
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            display: ['Plus Jakarta Sans', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            accent: '#6366f1', // Indigo
          }
        }
      }
    }
  </script>
  <style type="text/tailwindcss">
    @layer utilities {
      .reveal {
        @apply opacity-0 translate-y-8 transition-all duration-700 ease-out;
      }
      .reveal.visible {
        @apply opacity-100 translate-y-0;
      }
    }
    body { background-color: #09090b; }
  </style>
`;

const getBaseTemplate = (title, contentHTML, activePage) => {
    const navLinks = [
        { href: 'index.html', label: 'About' },
        { href: 'services.html', label: 'Services' },
        { href: 'youtube.html', label: 'YouTube' },
        { href: 'pinterest.html', label: 'Pinterest' },
        { href: 'contact.html', label: 'Hire Me' }
    ];

    const renderLinks = (isMobile = false) => navLinks.map(link => {
        const isActive = activePage === link.href;
        const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium";
        const stateClasses = isActive 
            ? "bg-accent/10 text-accent" 
            : "text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900 hover:translate-x-1";
        return `<a href="${link.href}" class="${baseClasses} ${stateClasses}">${link.label}</a>`;
    }).join('\n            ');

    return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono&family=Plus+Jakarta+Sans:wght@700&display=swap" rel="stylesheet">
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    ${tailwindConfig}
</head>
<body class="bg-zinc-950 text-zinc-50 font-sans antialiased overflow-x-hidden">

    <!-- Mobile Navbar -->
    <nav class="lg:hidden sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 p-4 flex items-center justify-between">
        <a href="index.html" class="font-display font-bold text-xl tracking-tight flex items-center gap-2">
            DM <span class="text-accent">Editz</span>
        </a>
        <button id="mobile-menu-btn" class="p-2 text-zinc-400 hover:text-zinc-50">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
    </nav>

    <!-- Mobile Drawer -->
    <div id="mobile-drawer" class="fixed inset-0 z-40 bg-zinc-950 transform translate-x-full transition-transform duration-300 lg:hidden flex flex-col pt-20 px-6">
        <nav class="flex flex-col gap-2">
            ${renderLinks(true)}
        </nav>
    </div>

    <div class="flex min-h-screen">
        <!-- Desktop Sidebar -->
        <aside class="hidden lg:flex flex-col w-[280px] h-screen sticky top-0 border-r border-zinc-800 bg-zinc-950 p-6 z-10">
            <a href="index.html" class="font-display font-bold text-2xl tracking-tight mb-12 flex items-center gap-2">
                DM <span class="text-accent">Editz</span>
            </a>
            <nav class="flex-1 flex flex-col gap-2">
                ${renderLinks()}
            </nav>
            <div class="mt-auto pt-6 border-t border-zinc-800">
                <p class="text-zinc-500 text-sm">&copy; 2026 DM_editz_111</p>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 w-full lg:w-[calc(100vw-280px)]">
            <div class="max-w-[1200px] mx-auto p-6 lg:p-12 w-full">
                ${contentHTML}
            </div>
        </main>
    </div>

    <script src="script.js"></script>
</body>
</html>`;
};

// Define page contents
const pages = {
    'index.html': getBaseTemplate(
        'DM_editz_111 | Web Development & Content Creation',
        `
        <div class="reveal max-w-3xl mt-8 lg:mt-20">
            <h1 class="font-display text-4xl lg:text-6xl tracking-tight mb-6 leading-tight">
                I'm DM <span class="text-accent">Editz</span>
            </h1>
            <p class="text-zinc-400 text-base lg:text-lg leading-relaxed mb-10 max-w-2xl">
                I am a web designer and digital content creator. While I love producing engaging video content for my YouTube channel, 
                <strong class="text-zinc-50">I am currently only offering freelance Web Design services.</strong><br><br>
                My focus right now is on crafting modern, highly-converting web applications and stunning landing pages tailored to your brand's unique identity. Let's build something extraordinary together.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
                <a href="contact.html" class="bg-accent hover:bg-indigo-400 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:-translate-y-1 text-center">Get a Website</a>
                <a href="https://www.youtube.com/@darkmage-g8l" target="_blank" class="bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:-translate-y-1 text-center">Visit My YouTube</a>
            </div>
        </div>
        `,
        'index.html'
    ),
    'services.html': getBaseTemplate(
        'Services | DM_editz_111',
        `
        <div class="reveal mb-12">
            <h1 class="font-display text-3xl lg:text-5xl tracking-tight mb-4">Web Design <span class="text-accent">Services</span></h1>
            <p class="text-zinc-400 text-lg">High-quality web development tailored to your needs.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 reveal delay-100">
            <!-- Service 1 -->
            <div class="bg-zinc-900 border border-zinc-800 p-8 rounded-xl hover:-translate-y-2 hover:border-accent/50 transition-all duration-300 group">
                <h3 class="font-display text-2xl mb-2 group-hover:text-accent transition-colors">UI/UX Design</h3>
                <p class="text-zinc-400 leading-relaxed mb-6">Crafting beautiful, intuitive interfaces that convert visitors into customers.</p>
                <span class="font-mono text-xs uppercase bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">Design</span>
            </div>
            
            <!-- Service 2 -->
            <div class="bg-zinc-900 border border-zinc-800 p-8 rounded-xl hover:-translate-y-2 hover:border-accent/50 transition-all duration-300 group">
                <h3 class="font-display text-2xl mb-2 group-hover:text-accent transition-colors">Frontend Dev</h3>
                <p class="text-zinc-400 leading-relaxed mb-6">Building responsive, fast-loading websites using HTML, CSS, React, and modern tools.</p>
                <span class="font-mono text-xs uppercase bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">Development</span>
            </div>
        </div>

        <div class="reveal mt-16 delay-200">
            <h2 class="font-display text-2xl lg:text-3xl tracking-tight mb-8">Pricing Packages</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-colors">
                    <h3 class="text-xl font-bold mb-2">Landing Page</h3>
                    <h4 class="text-accent font-display text-2xl mb-4">,1500</h4>
                    <p class="text-zinc-400 text-sm">A sleek, fast-loading single-page website.</p>
                </div>
                <div class="bg-zinc-900 border border-accent p-6 rounded-xl relative shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:shadow-[0_0_25px_rgba(99,102,241,0.2)] transition-shadow">
                    <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
                    <h3 class="text-xl font-bold mb-2">Portfolio Site</h3>
                    <h4 class="text-accent font-display text-2xl mb-4">,11,000</h4>
                    <p class="text-zinc-400 text-sm">Showcase your work professionally with a multi-page layout.</p>
                </div>
                <div class="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-colors">
                    <h3 class="text-xl font-bold mb-2">Business Site</h3>
                    <h4 class="text-accent font-display text-2xl mb-4">,11,500</h4>
                    <p class="text-zinc-400 text-sm">A complete website for your small business to establish credibility.</p>
                </div>
            </div>
        </div>
        `,
        'services.html'
    ),
    'contact.html': getBaseTemplate(
        'Contact | DM_editz_111',
        `
        <div class="reveal max-w-2xl mt-8 lg:mt-20">
            <h1 class="font-display text-3xl lg:text-5xl tracking-tight mb-6">Ready to <span class="text-accent">build something?</span></h1>
            <p class="text-zinc-400 text-lg leading-relaxed mb-10">
                Let's talk about your simple website needs. Reach out directly on Telegram, and we'll get started right away.
            </p>
            <a href="https://t.me/DMwebdesign" target="_blank" class="inline-block bg-accent hover:bg-indigo-400 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-accent/20">
                Message on Telegram
            </a>
        </div>
        `,
        'contact.html'
    ),
    'youtube.html': getBaseTemplate(
        'YouTube | DM_editz_111',
        `
        <div class="reveal mb-12">
            <h1 class="font-display text-3xl lg:text-5xl tracking-tight mb-4">My <span class="text-accent">YouTube</span></h1>
            <p class="text-zinc-400 text-lg">Check out my latest video content and edits.</p>
        </div>
        
        <div class="reveal bg-zinc-900 border border-zinc-800 p-6 md:p-10 rounded-2xl flex flex-col md:flex-row gap-8 items-center md:items-start max-w-4xl">
            <div class="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-zinc-800 shrink-0">
                <img src="./logo1.jpeg" alt="DM Editz Profile" class="w-full h-full object-cover">
            </div>
            <div class="flex-1 text-center md:text-left">
                <h2 class="font-display text-3xl font-bold mb-1">DM_editz_111</h2>
                <p class="text-zinc-500 font-mono text-sm mb-4">@darkmage-g8l</p>
                <p class="text-zinc-400 leading-relaxed mb-6 max-w-xl mx-auto md:mx-0">
                    High-quality video edits, gaming montages, and digital content creation. Subscribe to stay updated with my latest projects!
                </p>
                <a href="https://www.youtube.com/@darkmage-g8l" target="_blank" class="inline-block bg-[#ff0000] hover:bg-[#cc0000] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-red-500/20">
                    Subscribe
                </a>
            </div>
        </div>
        `,
        'youtube.html'
    ),
    'pinterest.html': getBaseTemplate(
        'Pinterest | DM_editz_111',
        `
        <div class="reveal mb-12">
            <h1 class="font-display text-3xl lg:text-5xl tracking-tight mb-4">My <span class="text-accent">Pinterest</span></h1>
            <p class="text-zinc-400 text-lg">Design inspiration and concepts.</p>
        </div>

        <div class="reveal max-w-2xl bg-zinc-900 border border-zinc-800 p-8 rounded-2xl text-center">
            <svg class="w-16 h-16 mx-auto text-[#e60023] mb-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.184 0 7.439 2.977 7.439 6.945 0 4.155-2.618 7.502-6.257 7.502-1.22 0-2.368-.634-2.763-1.385l-.754 2.874c-.272 1.042-1.01 2.342-1.503 3.136 1.127.348 2.33.535 3.565.535 6.62 0 11.985-5.365 11.985-11.987C24.004 5.367 18.638 0 12.017 0z"/></svg>
            <h2 class="font-display text-2xl font-bold mb-4">Follow my boards</h2>
            <p class="text-zinc-400 mb-8 max-w-md mx-auto">
                Explore my curated collections of web design inspiration, UI/UX trends, and creative visual concepts.
            </p>
            <a href="https://in.pinterest.com/dm_editz_111/" target="_blank" class="inline-block bg-[#e60023] hover:bg-[#ad081b] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-red-600/20">
                View Pinterest Profile
            </a>
        </div>
        `,
        'pinterest.html'
    )
};

Object.entries(pages).forEach(([filename, html]) => {
    fs.writeFileSync(path.join(dir, filename), html);
    console.log(`Generated Tailwind version of ${filename}`);
});
