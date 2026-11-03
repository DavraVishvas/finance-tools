import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || 'unknown';
    const sessionId = request.cookies.get('session_id')?.value || 'unknown';
    const userAgentStr = request.headers.get('user-agent') || '-';

    const { browser } = userAgent(request);
    const browserName = browser.name || 'unknown';

    const logData = {
      event_type: 'client_event',
      timestamp: new Date().toISOString(),
      ip,
      session_id: sessionId,
      user_agent: userAgentStr,
      browser: browserName,
      js_verified: true,
      client_event_type: data.client_event_type || 'unknown',
      event_details: data.event_details || null,
      url: data.url || '-',

      // Useful bot signals
      webdriver: data.webdriver,
      platform: data.platform,
      language: data.language,
      languages: data.languages,
      hardwareConcurrency: data.hardwareConcurrency,
      deviceMemory: data.deviceMemory,
      screenWidth: data.screenWidth,
      screenHeight: data.screenHeight,

      // Interaction
      eventTimestamp: data.eventTimestamp,
      mouseX: data.mouseX,
      mouseY: data.mouseY,
      scrollY: data.scrollY,

      // Session behaviour
      timeSinceSessionStart: data.timeSinceSessionStart,
      eventCount: data.eventCount,
      clickCount: data.clickCount,
      scrollCount: data.scrollCount
    };

    console.log('\n[TRAFFIC_LOG_CLIENT]\n', JSON.stringify(logData, null, 2), '\n');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

