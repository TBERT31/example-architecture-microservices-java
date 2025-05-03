import { NextResponse } from "next/server";
import { getAccessToken } from "@/utils/sessionTokenAccessor";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accessToken = await getAccessToken();
  const url = `${process.env.DEMO_BACKEND_URL}/api/product`;

  const resp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!resp.ok) {
    return NextResponse.json({ error: await resp.text() }, { status: resp.status });
  }

  const data = await resp.json();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const postBody = await req.json();
  const accessToken = await getAccessToken();
  const url = `${process.env.DEMO_BACKEND_URL}/api/product`;

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(postBody),
  });

  if (!resp.ok) {
    return NextResponse.json({ error: await resp.text() }, { status: resp.status });
  }

  const data = await resp.json();
  return NextResponse.json(data);
}
