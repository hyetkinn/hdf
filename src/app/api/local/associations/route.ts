import { NextResponse } from "next/server";
import { readLocalDb, writeLocalDb } from "../../../../lib/localDb";
import { associations as baseAssociations } from "../../../../lib/data/associations";

export async function GET() {
  const db = await readLocalDb();
  if (db?.associations?.length) {
    return NextResponse.json(db.associations);
  }
  return NextResponse.json(baseAssociations);
}

export async function PUT(request: Request) {
  const payload = await request.json();
  const db = (await readLocalDb()) ?? {
    posts: [],
    events: [],
    boardMembers: [],
    associations: baseAssociations,
    councils: [],
  };
  if (!db.associations?.length) {
    db.associations = baseAssociations;
  }
  const index = db.associations.findIndex(
    (association) => association.id === payload.id || association.slug === payload.slug
  );
  if (index >= 0) {
    db.associations[index] = { ...db.associations[index], ...payload };
  } else {
    db.associations = [...db.associations, payload];
  }
  await writeLocalDb(db);
  return NextResponse.json(payload);
}
