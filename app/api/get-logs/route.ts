import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'bot_logs.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // The file might be constantly written to and could be malformed if interrupted.
    // Try to parse it, if it fails, try to fix common JSON array errors.
    let logs = [];
    try {
      logs = JSON.parse(fileContent);
    } catch (e) {
      // If parsing fails, it might be due to a trailing comma or missing closing bracket.
      try {
        const fixedContent = fileContent.replace(/,\s*$/, '') + ']';
        logs = JSON.parse(fixedContent);
      } catch (e2) {
        // Just return empty if it's completely unparseable
        console.error("Could not parse bot_logs.json");
      }
    }
    
    // Return the latest 500 logs max to avoid crashing the browser
    return NextResponse.json(logs.slice(0, 500));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read logs' }, { status: 500 });
  }
}

