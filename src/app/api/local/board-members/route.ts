import { NextResponse } from "next/server";
import { readLocalDb, writeLocalDb } from "../../../../lib/localDb";

export async function GET() {
  const db = await readLocalDb();
  return NextResponse.json(db?.boardMembers ?? []);
}

export async function PUT(request: Request) {
  const payload = await request.json();
  const db = (await readLocalDb()) ?? {
    posts: [],
    events: [],
    boardMembers: [],
    associations: [],
    councils: [],
  };
  db.boardMembers = db.boardMembers.map((member) =>
    member.id === payload.id ? { ...member, ...payload } : member
  );
  await writeLocalDb(db);
  return NextResponse.json(payload);
}
