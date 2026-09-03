import { supabase } from "@/app/lib/supabase";
import { usePeladaStore } from "@/store/pelada/pelada.store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
type ImportedPlayer = {
  name: string;
};

export function usePlayersController() {
  const { addPlayer, pelada, removePlayer } = usePeladaStore();
  const navigate = useNavigate();

  const [showAddPlayers, setShowAddPlayers] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showImportPreview, setShowImportPreview] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");

  const [importText, setImportText] = useState("");
  const [importedPlayers, setImportedPlayers] = useState<ImportedPlayer[]>([]);

  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const totalPlayers = pelada?.players.length ?? 0;
  const hasDrawnTeams = Boolean(pelada?.queue.length);
  const sessionStarted = Boolean(pelada?.sessionStarted);
  const canEditPlayers = !sessionStarted;

  function handleAddPlayer() {
    const name = newPlayerName.trim();

    if (!name) return;

    addPlayer(name);

    setNewPlayerName("");
    setShowAddPlayers(false);
  }

  function handleOpenImport() {
    setImportError(null);
    setShowImport(true);
  }

  function handleCloseImport() {
    if (isImporting) return;

    setShowImport(false);
    setImportText("");
    setImportError(null);
  }

  async function handleImport() {
    const text = importText.trim();

    if (!text || isImporting) return;

    setImportError(null);
    setIsImporting(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "parse-player-list",
        {
          body: { text },
        },
      );

      if (error) {
        console.error("Erro ao importar lista:", error);

        setImportError("Não foi possível processar a lista. Tente novamente.");

        return;
      }

      if (!data?.players || !Array.isArray(data.players)) {
        console.error("Resposta inválida:", data);

        setImportError("Não conseguimos identificar os jogadores dessa lista.");

        return;
      }

      const players = data.players.filter(
        (player: ImportedPlayer) =>
          player &&
          typeof player.name === "string" &&
          player.name.trim().length > 0,
      );

      if (players.length === 0) {
        setImportError(
          "Nenhum jogador foi encontrado. Confira a lista e tente novamente.",
        );

        return;
      }

      setImportedPlayers(players);
      setShowImport(false);
      setShowImportPreview(true);
    } catch (error) {
      console.error("Erro inesperado:", error);

      setImportError("Ocorreu um erro ao processar a lista. Tente novamente.");
    } finally {
      setIsImporting(false);
    }
  }

  function handleConfirmImport() {
    const existingNames = new Set(
      (pelada?.players ?? []).map((player) => player.name.trim().toLowerCase()),
    );

    const newPlayers = importedPlayers.filter(
      (player) => !existingNames.has(player.name.trim().toLowerCase()),
    );

    newPlayers.forEach((player) => {
      addPlayer(player.name.trim());
    });

    setImportedPlayers([]);
    setImportText("");
    setShowImportPreview(false);
  }

  const newImportedPlayers = importedPlayers.filter(
    (player) =>
      !(pelada?.players ?? []).some(
        (existing) =>
          existing.name.trim().toLowerCase() ===
          player.name.trim().toLowerCase(),
      ),
  );

  function handleCloseImportPreview() {
    setShowImportPreview(false);
  }

  function handleContinue() {
    if (hasDrawnTeams) {
      navigate("/teams");
      return;
    }

    navigate("/draw");
  }

  return {
    handleContinue,
    newImportedPlayers,
    handleConfirmImport,
    removePlayer,
    handleImport,
    handleCloseImport,
    handleOpenImport,
    totalPlayers,
    canEditPlayers,
    handleAddPlayer,
    importError,
    showAddPlayers,
    showImport,
    showImportPreview,
    setShowAddPlayers,
    hasDrawnTeams,
    handleCloseImportPreview,
    sessionStarted,
    importText,
    setImportText,
    isImporting,
    importedPlayers,
    newPlayerName,
    setNewPlayerName,
    pelada,
  };
}
