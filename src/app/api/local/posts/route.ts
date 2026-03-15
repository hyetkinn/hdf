import { NextResponse } from "next/server";
import { readLocalDb, writeLocalDb } from "../../../../lib/localDb";

export async function GET() {
  const db = await readLocalDb();
  return NextResponse.json(db?.posts ?? []);
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
  const newPost = {
    ...payload,
    id: `post-${Date.now()}`,
    date: new Date().toISOString(),
  };
  db.posts = [newPost, ...db.posts];
  await writeLocalDb(db);
  return NextResponse.json(newPost, { status: 201 });
}
