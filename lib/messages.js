import sql from "better-sqlite3";
import { cache } from "react";
import { revalidatePath, unstable_cache } from "next/cache";

const db = new sql("messages.db");

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addMessage(message) {
  db.prepare("INSERT INTO messages (text) VALUES (?)").run(message);
}

// DB 요청을 캐시하기 위해 react - cache 함수 적용
export const getMessages = unstable_cache(
  cache(() => {
    console.log("Fetching messages from db");
    return db.prepare("SELECT * FROM messages").all();
  }),
  ["messages"],
  {
    tags: ["msg"],
  }
);
