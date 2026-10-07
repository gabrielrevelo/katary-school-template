using System.Collections.Concurrent;
using KataryApi.Models;

namespace KataryApi.Data;

// Almacén en memoria: se reinicia cada vez que corres la API.
// Reto para casa: reemplázalo por una base de datos con Entity Framework Core.
public class ItemStore
{
    private readonly ConcurrentDictionary<int, Item> _items = new();
    private int _nextId;

    public ItemStore()
    {
        Seed(new Item(0, "Fuerza desde cero", "Clase de técnica básica con ejercicios de fuerza para todo el cuerpo.", "Fuerza", 25000, "principiante"));
        Seed(new Item(0, "Cardio por intervalos", "Clase de cardio que alterna esfuerzos moderados con períodos de recuperación.", "Cardio", 28000, "intermedio"));
        Seed(new Item(0, "Yoga inicial", "Clase de posturas básicas, respiración y movilidad.", "Yoga", 22000, "principiante"));
        Seed(new Item(0, "Fuerza avanzada", "Rutina de fuerza con ejercicios compuestos para personas con experiencia.", "Fuerza", 35000, "avanzado"));
        Seed(new Item(0, "Entrenamiento funcional", "Clase en circuito con ejercicios de equilibrio, coordinación y resistencia.", "Funcional", 30000, "intermedio"));
    }

    public IEnumerable<Item> GetAll() => _items.Values.OrderBy(i => i.Id);

    public Item? Get(int id) => _items.GetValueOrDefault(id);

    public Item Add(Item item)
    {
        var created = item with { Id = Interlocked.Increment(ref _nextId) };
        _items[created.Id] = created;
        return created;
    }

    public bool Remove(int id) => _items.TryRemove(id, out _);

    private void Seed(Item item) => Add(item);
}
