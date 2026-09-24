const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'app', 'tools');
if (fs.existsSync(toolsDir)) {
    const toolDirs = fs.readdirSync(toolsDir);
    toolDirs.forEach(dir => {
        const filePath = path.join(toolsDir, dir, 'page.tsx');
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Replace the styled wrapper with a plain one
            const styledWrapperRegex = /className="w-\[300px\] min-h-\[250px\] bg-zinc-50 dark:bg-zinc-800\/30 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden flex items-center justify-center relative"/g;
            const plainWrapper = 'className="w-[300px] min-h-[250px] flex items-center justify-center relative"';
            
            let newContent = content.replace(styledWrapperRegex, plainWrapper);
            if (content !== newContent) {
                fs.writeFileSync(filePath, newContent);
                console.log(`Cleaned borders in ${dir}`);
            }
        }
    });
}
