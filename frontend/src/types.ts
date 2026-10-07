// Debe coincidir con backend/Models/Item.cs (en camelCase).
export type Item = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  level: string;
};

export type NewItem = Omit<Item, "id">;

export type ChatMessage = { role: "user" | "assistant"; content: string };
