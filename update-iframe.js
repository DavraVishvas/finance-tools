const fs = require('fs');
const path = require('path');
 // Not available by default, I'll use simple fs methods.

const toolsDir = path.join(__dirname, 'app', 'tools');
const filesToUpdate = [];

// Get all tools page.tsx
const toolDirs = fs.readdirSync(toolsDir);
for (const dir of toolDirs) {
  const filePath = path.join(toolsDir, dir, 'page.tsx');
  if (fs.existsSync(filePath)) {
    filesToUpdate.push({ path: filePath, name: dir });
  }
}
// Add landing page
filesToUpdate.push({ path: path.join(__dirname, 'app', 'page.tsx'), name: 'landing' });

for (const fileObj of filesToUpdate) {
  let content = fs.readFileSync(fileObj.path, 'utf8');
  let updated = false;

  // We need to replace the ad 1 block
  const ad1Regex = /<div className="w-\[300px\] min-h-\[250px\] bg-zinc-50 dark:bg-zinc-800\/30 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden flex items-center justify-center relative"[\s\S]*?juvenilechoice\.com[\s\S]*?<\/div>/g;
  
  if (ad1Regex.test(content)) {
    content = content.replace(ad1Regex, `<div className="w-[300px] min-h-[250px] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden flex items-center justify-center relative">
                    <iframe 
                        src="/ad1.html" 
                        width="300" 
                        height="250" 
                        style={{ border: 'none', overflow: 'hidden' }}
                        scrolling="no"
                        title="Advertisement"
                    />
                </div>`);
    updated = true;
  }

  // We need to replace the ad 2 block
  const ad2Regex = /<div className="w-\[300px\] min-h-\[250px\] bg-zinc-50 dark:bg-zinc-800\/30 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden flex items-center justify-center relative"[\s\S]*?second-director\.com[\s\S]*?<\/div>/g;
  
  if (ad2Regex.test(content)) {
    content = content.replace(ad2Regex, `<div className="w-[300px] min-h-[250px] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden flex items-center justify-center relative">
                    <iframe 
                        src="/ad2.html" 
                        width="300" 
                        height="250" 
                        style={{ border: 'none', overflow: 'hidden' }}
                        scrolling="no"
                        title="Advertisement"
                    />
                </div>`);
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(fileObj.path, content);
    console.log(`Updated iframe ad in ${fileObj.name}`);
  }
}
