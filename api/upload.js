import { put } from '@vercel/blob';

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { searchParams } = new URL(request.url);
        const filename = searchParams.get('filename');
        const content = await request.text();

        // This securely pushes your text to your Vercel Storage bucket
        const blob = await put(filename, content, {
            access: 'public',
            addRandomSuffix: false
        });

        return response.status(200).json(blob);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}
