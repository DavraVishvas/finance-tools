const fs = require('fs');
const glob = require('fs').readdirSync('app/tools');
glob.forEach(d => {
    const p = 'app/tools/' + d + '/page.tsx';
    if (fs.existsSync(p)) {
        let c = fs.readFileSync(p, 'utf8');
        c = c.replace('<div className="w-full max-w-[1600px] mx-auto flex justify-center gap-6 px-4">', '<div className="w-full max-w-[1600px] mx-auto flex flex-col xl:flex-row justify-center gap-6 px-4">');
        c = c.replace('<div className="hidden xl:flex flex-col items-end w-[300px] pt-8 gap-6">', '<div className="flex flex-col items-center xl:items-end w-full xl:w-[300px] pt-4 xl:pt-8 gap-6">');
        fs.writeFileSync(p, c);
        console.log('Fixed mobile layout for ' + d);
    }
});
