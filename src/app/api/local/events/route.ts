import { NextResponse } from "next/server";
import { readLocalDb, writeLocalDb } from "../../../../lib/localDb";

export async function GET() {
  const db = await readLocalDb();
  return NextResponse.json(db?.events ?? []);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const db = (await readLocalDb()) ?? {
    posts: [],
    events: [],
    boardMembers: [],
    associations: [],
    councils: [],
  };
  const newEvent = {
    ...payload,
    id: `event-${Date.now()}`,
  };
  db.events = [newEvent, ...db.events];
  await writeLocalDb(db);
  return NextResponse.json(newEvent, { status: 201 });
}
