import { NextResponse } from "next/server";

export async function GET() {
  console.log(123);
  return NextResponse.json({ message: "Hello, API!" });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ message: `Data received: ${body.data}` });
}
