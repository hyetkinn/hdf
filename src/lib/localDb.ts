import "server-only";
import { promises as fs } from "fs";
import path from "path";

type LocalDb = {
  posts: Array<Record<string, unknown>>;
  events: Array<Record<string, unknown>>;
  boardMembers: Array<Record<string, unknown>>;
  associations: Array<Record<string, unknown>>;
  councils: Array<Record<string, unknown>>;
};

const findDbPath = async () => {
  if (process.env.LOCAL_DB_PATH) {
    return process.env.LOCAL_DB_PATH;
  }
  let current = process.cwd();
  for (let i = 0; i < 10; i += 1) {
    const marker = path.join(current, "package.json");
    try {
      await fs.access(marker);
      return path.join(current, "data", "local-db.json");
    } catch {
      const parent = path.dirname(current);
      if (parent === current) break;
      current = parent;
    }
  }
  return path.join(process.cwd(), "data", "local-db.json");
};

export const readLocalDb = async (): Promise<LocalDb | null> => {
  try {
    const dbPath = await findDbPath();
    const raw = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(raw) as LocalDb;
  } catch {
    return null;
  }
};

export const writeLocalDb = async (db: LocalDb) => {
  const dbPath = await findDbPath();
  await fs.mkdir(path.dirname(dbPath), { recursive: true });
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2), "utf-8");
};
