import { VercelRequest, VercelResponse } from '@vercel/node';
import { readFileSync } from 'node:fs';
import path from 'node:path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('i got here', req.headers.host)
  try {
    // 1. Point to the index.html in your root directory
    const filePath = path.join(process.cwd(), 'index.html');

    // 2. Read the file
    const html = readFileSync(filePath, 'utf8');

    // 3. Send the response
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);

  } catch (error) {
    return res.status(500).send("Error loading index.html. Make sure it is in the root folder.");
  }
}