import { useState, type FormEvent } from "react";
import { api } from "../api";
import type { NewItem } from "../types";

const empty: NewItem = { name: "", description: "", category: "", price: 0, level: "principiante" };

export function ItemForm({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState<NewItem>(empty);
  const [saving, setSaving] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.createItem(form);
      setForm(empty);
      onCreated();
    } catch (err) {
      alert(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="card form" onSubmit={submit}>
      <h3>Agregar rutina o clase</h3>
      <label htmlFor="item-name">Nombre</label>
      <input id="item-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <label htmlFor="item-category">Tipo de entrenamiento</label>
      <input id="item-category" placeholder="Fuerza, cardio, yoga…" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
      <label htmlFor="item-description">Descripción</label>
      <textarea id="item-description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <label htmlFor="item-level">Nivel</label>
      <select id="item-level" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
        <option value="principiante">Principiante</option>
        <option value="intermedio">Intermedio</option>
        <option value="avanzado">Avanzado</option>
      </select>
      <label htmlFor="item-price">Valor de la clase (COP)</label>
      <input
        id="item-price"
        type="number"
        min="0"
        step="0.01"
        value={form.price || ""}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
      />
      <button className="primary" disabled={saving}>
        {saving ? "Guardando…" : "Guardar clase"}
      </button>
    </form>
  );
}
