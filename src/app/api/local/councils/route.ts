import { NextResponse } from "next/server";
import { readLocalDb, writeLocalDb } from "../../../../lib/localDb";

const defaults = [
  {
    id: "council-youth",
    slug: "genclik",
    name: "Gençlik Konseyi",
    president: "",
    subheads: [],
    instagram: "",
    facebook: "",
    events: [],
  },
  {
    id: "council-women",
    slug: "kadin",
    name: "Kadın Konseyi",
    president: "",
    subheads: [],
    instagram: "",
    facebook: "",
    events: [],
  },
];

export async function GET() {
  const db = await readLocalDb();
  if (db?.councils?.length) {
    return NextResponse.json(db.councils);
  }
  return NextResponse.json(defaults);
}

export async function PUT(request: Request) {
  const payload = await request.json();
  const db = (await readLocalDb()) ?? {
    posts: [],
    events: [],
    boardMembers: [],
    associations: [],
    councils: defaults,
  };
  if (!db.councils?.length) {
    db.councils = defaults;
  }
  const index = db.councils.findIndex(
    (council) => council.id === payload.id || council.slug === payload.slug
  );
  if (index >= 0) {
    db.councils[index] = { ...db.councils[index], ...payload };
  } else {
    db.councils = [...db.councils, payload];
  }
  await writeLocalDb(db);
  return NextResponse.json(payload);
}
