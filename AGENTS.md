# Instrucciones para agentes

- Lee `IDEA.md` antes de cambiar el producto y alinea con ella nombres, marca y comportamiento. Actualmente está sin completar: pide al estudiante que la complete antes de implementar personalizaciones; no inventes esos datos.
- Explica en español, brevemente, qué harás y por qué; el proyecto es una plantilla de clase.

## Estructura y ejecución

- `backend/`: Minimal API .NET 9; `Program.cs` registra `/api/items` y `/api/agent`. Ejecuta desde esa carpeta con `dotnet run` (HTTP `localhost:5080`). `ItemStore` conserva catálogo solo en memoria y lo reinicia con datos de ejemplo.
- `frontend/`: React 19 + TypeScript + Vite. Ejecuta `npm install` una vez y `npm run dev` (HTTP `localhost:5173`; el puerto es estricto). El CORS de la API permite ese origen.
- Los tipos del frontend en `src/types.ts` deben reflejar el modelo C# `backend/Models/Item.cs`; las propiedades JSON usan camelCase.
- Personalización habitual: `backend/Data/ItemStore.cs` (datos de muestra), `backend/Agent/AgentService.cs` y `appsettings.json` (asistente), `frontend/src/config.ts` (marca), `frontend/src/components/ItemList.tsx` (tarjetas).

## Verificación y secretos

- Tras cambios de API: `dotnet build` desde `backend/`. Tras cambios de frontend: `npm run build` desde `frontend/` (incluye comprobación TypeScript). No hay scripts de test configurados en `frontend/package.json`.
- No inicies servidores persistentes; deja que el estudiante ejecute `dotnet run` o `npm run dev` en su terminal.
- Las claves del asistente van en .NET User Secrets desde `backend/` (`dotnet user-secrets set "Agent:ApiKey" "..."`), nunca en `appsettings.json` ni en commits. El README documenta Gemini y Groq.
- No instales software ni borres archivos sin confirmación. No hagas push ni cambies de rama salvo petición; antes de un commit, resume los cambios.
