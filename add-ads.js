const fs = require('fs');
const path = require('path');

const ad1 = `                                    const s = document.createElement('script');
                                    (s as any).settings = {};
                                    s.src = "//juvenilechoice.com/bZXSV_sOd.Ghln0/YFWfcY/veSmt9OunZiUxlXkTPzTIcs0_MgTHYdyOMmzocktLNnzjQxx-N/j/I/0YMBQU";
                                    s.async = true;
                                    s.referrerPolicy = 'no-referrer-when-downgrade';
                                    el.appendChild(s);`;

const ad2 = `                                    const s = document.createElement('script');
                                    (s as any).settings = {};
                                    s.src = "//second-director.com/cmD.9z6qb-2C5/l/StWNQ-9KN/zjMV5ONLzYY/y/O/ST0/3JMSz/kY3zN/jQMAzz";
                                    s.async = true;
                                    s.referrerPolicy = 'no-referrer-when-downgrade';
                                    el.appendChild(s);`;

const pages = [
  { name: 'compound-interest-calculator', ad: ad1 },
  { name: 'credit-utilization-calculator', ad: ad1 },
  { name: 'fd-calculator', ad: ad1 },
  { name: 'inflation-calculator', ad: ad1 },
  { name: 'loan-calculator', ad: ad1 },
  { name: 'loan-eligibility-calculator', ad: ad2 },
  { name: 'net-worth-calculator', ad: ad2 },
  { name: 'retirement-calculator', ad: ad2 },
  { name: 'sip-calculator', ad: ad2 }
];

for (const page of pages) {
  const file = path.join(__dirname, 'app', 'tools', page.name, 'page.tsx');
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  if (content.includes('data-ad-loaded')) {
    console.log(`Skipping ${page.name}, already has ad`);
    continue;
  }

  const insertBefore = `            <div className="w-full max-w-[1600px] mx-auto flex justify-center gap-6 px-4">
                {/* Left Ad (Desktop Only) */}
                <div className="hidden xl:flex flex-col items-end w-[300px] pt-8 gap-6">
                    <div className="w-[300px] min-h-[250px] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden flex items-center justify-center relative"
                        ref={(el) => {
                            if (el && !el.hasAttribute('data-ad-loaded')) {
                                el.setAttribute('data-ad-loaded', 'true');
                                if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
${page.ad}
                                }
                            }
                        }}
                    >
                        <span className="text-zinc-400 dark:text-zinc-600 text-xs" />
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 w-full max-w-5xl min-w-0">
                    <ToolWrapper`;

  content = content.replace(/<ToolWrapper/, insertBefore);
  
  content = content.replace(/        <\/>\r?\n    \);\r?\n}/, `                </div> {/* End Main Content Area */}
            </div>
        </>
    );
}`);

  fs.writeFileSync(file, content);
  console.log(`Updated ${page.name}`);
}
