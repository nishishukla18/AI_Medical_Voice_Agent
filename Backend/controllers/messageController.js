import sql from "../configs/db.js";

// Generate random alias
function generateAlias() {
  const animals = ["Lion", "Tiger", "Panda", "Eagle", "Dolphin"];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${randomAnimal}_${randomNumber}`;
}

export const getMessages = async (req, res) => {
  try {
    const rows = await sql`
      SELECT * FROM messages 
      WHERE created_at > NOW() - INTERVAL '5 days' 
      ORDER BY created_at DESC
    `;
    res.json(rows); // rows is already an array
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

export const postMessage = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ error: "Message content required" });
    }

    const alias = generateAlias();

    const rows = await sql`
      INSERT INTO messages (alias, content) 
      VALUES (${alias}, ${content.trim()}) 
      RETURNING *
    `;

    if (!rows || rows.length === 0) {
      console.error("Insert failed, no rows returned");
      return res.status(500).json({ error: "Failed to insert message" });
    }

    res.json(rows[0]); // rows is an array
  } catch (err) {
    console.error("Error posting message:", err);
    res.status(500).json({ error: "Failed to post message" });
  }
};
