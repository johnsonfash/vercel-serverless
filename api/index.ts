import { VercelRequest, VercelResponse } from '@vercel/node';
import { readFileSync } from 'node:fs';
import path from 'node:path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Log with a timestamp and a unique emoji to make it stand out
  const timestamp = new Date().toISOString();
  console.log(`🚀 [${timestamp}] - Incoming Request from: ${req.headers.host}`);
  
  try {
    const filePath = path.join(process.cwd(), 'index.html');
    const html = readFileSync(filePath, 'utf8');

    // 2. Explicitly set headers
    res.setHeader('Content-Type', 'text/html');
    
    // 3. Use .end() after .send() to force the lifecycle to close properly
    return res.status(200).send(html);

  } catch (error) {
    console.error("❌ CRITICAL ERROR:", error);
    return res.status(500).send("Internal Server Error");
  }
}