const fs = require('fs');
const path = require('path');

const adBannerHtml = `
            {/* Global Content Ad */}
            <div className="w-full flex justify-center py-4 my-6 bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800">
              <div className="w-full max-w-[728px] min-h-[90px] bg-zinc-100 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden flex items-center justify-center relative">
                <iframe 
                    src="/ad1.html" 
                    width="100%" 
                    height="90" 
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    title="Advertisement"
                />
              </div>
            </div>
`;

// 1. Static pages
const staticDirs = ['about', 'faq', 'contact', 'legal', 'privacy', 'terms'];
staticDirs.forEach(dir => {
    const filePath = path.join(__dirname, 'app', dir, 'page.tsx');
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Don't add twice
        if (content.includes('Global Content Ad')) return;

        content = content.replace(/(<\/h1>\s*<\/div>)/, `$1${adBannerHtml}`);

        const lastDivIndex = content.lastIndexOf('</div>');
        if (lastDivIndex !== -1) {
            content = content.slice(0, lastDivIndex) + adBannerHtml + content.slice(lastDivIndex);
        }

        fs.writeFileSync(filePath, content);
        console.log(`Updated ${dir}`);
    }
});

// 2. Tool pages
const toolsDir = path.join(__dirname, 'app', 'tools');
if (fs.existsSync(toolsDir)) {
    const toolDirs = fs.readdirSync(toolsDir);
    toolDirs.forEach(dir => {
        const filePath = path.join(toolsDir, dir, 'page.tsx');
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            if (content.includes('Global Content Ad')) return;

            content = content.replace(/(\s*)(<\/div>\s*{\/\* End Main Content Area \*\/})/, `$1${adBannerHtml}$1$2`);
            
            fs.writeFileSync(filePath, content);
            console.log(`Updated tool ${dir}`);
        }
    });
}
