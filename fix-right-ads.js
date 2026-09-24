const fs = require('fs');
const path = require('path');

const rightAdsBlock = `
                {/* Right Ads (Sticky) */}
                <div className="hidden xl:flex flex-col w-[300px] shrink-0 sticky top-24 gap-6">
                    <div className="w-[300px] min-h-[250px] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden flex items-center justify-center relative">
                        <iframe src="/ad2.html" width="300" height="250" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" title="Advertisement" />
                    </div>
                    <div className="w-[300px] min-h-[250px] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden flex items-center justify-center relative">
                        <iframe src="/ad1.html" width="300" height="250" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" title="Advertisement" />
                    </div>
                    <div className="w-[300px] min-h-[250px] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden flex items-center justify-center relative">
                        <iframe src="/ad2.html" width="300" height="250" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" title="Advertisement" />
                    </div>
                </div>
`;

const bottomRegexWithoutRightAds = /(<\/div>\s*(?:\{\/\*.*?\*\/\}\s*)?)<\/div>\s*<\/>/;

const toolsDir = path.join(__dirname, 'app', 'tools');
if (fs.existsSync(toolsDir)) {
    const toolDirs = fs.readdirSync(toolsDir);
    toolDirs.forEach(dir => {
        const filePath = path.join(toolsDir, dir, 'page.tsx');
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // If the page already has Right Ads (Sticky), just replace it
            if (content.includes('{/* Right Ads (Sticky) */}')) {
                const rightAdsRegex = /\{\/\*\s*Right Ads \(Sticky\)\s*\*\/\}[\s\S]*?<\/div>\s*<\/div>\s*<\/>/;
                let newContent = content.replace(rightAdsRegex, rightAdsBlock.trim() + '\n            </div>\n        </>');
                if (content !== newContent) {
                    fs.writeFileSync(filePath, newContent);
                    console.log(`Updated tool ${dir}`);
                }
            } else {
                // Otherwise, insert it before the last </div>
                let newContent = content.replace(bottomRegexWithoutRightAds, `$1${rightAdsBlock}            </div>\n        </>`);
                if (content !== newContent) {
                    fs.writeFileSync(filePath, newContent);
                    console.log(`Updated tool ${dir}`);
                } else {
                    console.log(`No changes for ${dir}`);
                }
            }
        }
    });
}
