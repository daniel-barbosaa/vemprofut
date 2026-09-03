import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { withSupabase } from "npm:@supabase/server@^1";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent";

const playerSchema = {
  type: "object",
  properties: {
    players: {
      type: "array",
      description: "Nomes dos jogadores encontrados na lista.",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Nome do jogador.",
          },
        },
        required: ["name"],
      },
    },
  },
  required: ["players"],
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function callGemini(apiKey: string, prompt: string) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: playerSchema,
        },
      }),
    });

    if (response.ok) {
      return response;
    }

    // Tenta novamente em caso de indisponibilidade temporária.
    if (response.status === 503 && attempt < 2) {
      console.warn(`Gemini retornou 503. Tentando novamente... (${attempt}/2)`);

      await sleep(1500);
      continue;
    }

    return response;
  }

  throw new Error("Falha ao chamar o Gemini.");
}

export default {
  fetch: withSupabase({ auth: "publishable" }, async (req) => {
    if (req.method !== "POST") {
      return Response.json({ error: "Método não permitido." }, { status: 405 });
    }

    try {
      const { text } = await req.json();

      if (typeof text !== "string" || !text.trim()) {
        return Response.json(
          { error: "O campo 'text' é obrigatório." },
          { status: 400 },
        );
      }

      if (text.length > 5000) {
        return Response.json(
          { error: "A lista é muito grande." },
          { status: 400 },
        );
      }

      const apiKey = Deno.env.get("GEMINI_API_KEY");

      if (!apiKey) {
        console.error("GEMINI_API_KEY não configurada.");

        return Response.json(
          { error: "Serviço de IA não configurado." },
          { status: 500 },
        );
      }

      const prompt = `
Extraia os nomes dos jogadores presentes na lista abaixo.

Regras:
- Retorne somente nomes de pessoas.
- Não invente nomes.
- Ignore mensagens, números, emojis e frases.
- Preserve os nomes como aparecem no texto.
- Não transforme "+1" ou referências a outras pessoas em nomes.
- Retorne somente o JSON solicitado pelo schema.

Lista:
---
${text}
---
`;

      const response = await callGemini(apiKey, prompt);

      if (!response.ok) {
        console.error("Gemini API error:", response.status);

        if (response.status === 503) {
          return Response.json(
            {
              error: "A IA está temporariamente indisponível.",
            },
            { status: 503 },
          );
        }

        if (response.status === 429) {
          return Response.json(
            {
              error: "Limite temporário da IA atingido.",
            },
            { status: 429 },
          );
        }

        return Response.json(
          {
            error: "Falha ao processar a lista.",
          },
          { status: 502 },
        );
      }

      const data = await response.json();

      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!generatedText) {
        console.error("Resposta inesperada do Gemini.");

        return Response.json(
          {
            error: "Resposta inválida da IA.",
          },
          { status: 502 },
        );
      }

      try {
        const result = JSON.parse(generatedText);

        if (!result || !Array.isArray(result.players)) {
          throw new Error("Formato inválido.");
        }

        return Response.json(result);
      } catch (error) {
        console.error("JSON inválido retornado pelo Gemini:", error);

        return Response.json(
          {
            error: "Não foi possível interpretar a resposta da IA.",
          },
          { status: 502 },
        );
      }
    } catch (error) {
      console.error("parse-player-list error:", error);

      return Response.json(
        {
          error: "Falha ao processar a lista.",
        },
        { status: 500 },
      );
    }
  }),
};
