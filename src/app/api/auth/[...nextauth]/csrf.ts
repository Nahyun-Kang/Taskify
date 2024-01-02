import { randomBytes } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

export function generateCsrfToken(): string {
  return randomBytes(32).toString('hex');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    const csrfToken = generateCsrfToken();

    // CSRF 토큰을 쿠키에 저장하거나 클라이언트에게 전송
    res.status(200).json({ csrfToken });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
