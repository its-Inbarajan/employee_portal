import { getServerSession } from "next-auth";


export async function GET() {
    const session = await getServerSession();

    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const res = await fetch(`${process.env.API_URL}/me`, {
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
        }
    });

    const data = await res.json();

    return data
}