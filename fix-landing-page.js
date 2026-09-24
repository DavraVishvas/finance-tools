const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'page.tsx');

if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace ad2 with ad3
    content = content.replace(/src="\/ad2\.html"/g, 'src="/ad3.html"');
    
    // Remove background and border classes from the ad containers
    const borderRegex1 = /bg-zinc-100 dark:bg-zinc-800\/30 border border-zinc-200 dark:border-zinc-800 /g;
    const borderRegex2 = /bg-zinc-50 dark:bg-zinc-900\/50 border border-zinc-200 dark:border-zinc-800 /g;
    
    content = content.replace(borderRegex1, '');
    content = content.replace(borderRegex2, '');
    
    fs.writeFileSync(filePath, content);
    console.log("Updated landing page ads");
} else {
    console.log("File not found");
}
