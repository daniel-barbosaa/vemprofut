import { Apple, Check, CheckCircle2, Laptop, Smartphone } from "lucide-react";

import { useDevice } from "@/app/utils/device";
import { Screen } from "@/view/components/screen";

const BENEFITS = [
  { id: "1", label: "Acesso mais rápido" },
  { id: "2", label: "Funciona como um aplicativo" },
  { id: "3", label: "Não ocupa muito espaço" },
  { id: "4", label: "Atualizações automáticas" },
];

export function InstallApp() {
  const { isAndroid, isIOS, isStandalone } = useDevice();
  console.log({ isAndroid, isIOS, isStandalone });

  if (!isAndroid && !isIOS) {
    return (
      <Screen>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="mb-4 flex items-center gap-3">
            <Laptop className="text-emerald-400" />
            <h3 className="font-semibold text-white">
              Dispositivo não suportado
            </h3>
          </div>

          <p className="text-zinc-400">
            A instalação como aplicativo está disponível para dispositivos
            móveis. Acesse o VemProFut pelo navegador do seu smartphone para
            instalar o app.
          </p>
        </div>
      </Screen>
    );
  }

  if (isStandalone) {
    return (
      <Screen>
        <div className="mx-auto max-w-lg py-4">
          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-center">
            <CheckCircle2 className="mx-auto mb-4 size-12 text-emerald-400" />

            <h2 className="text-xl font-semibold text-white">
              Aplicativo instalado
            </h2>

            <p className="mt-2 text-zinc-400">
              O <span className="font-bold">VemProFut</span> já está instalado
              no seu dispositivo e pode ser acessado diretamente pela tela
              inicial.
            </p>
          </div>
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <div className="mx-auto max-w-lg py-4">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-emerald-500/10">
            <Smartphone className="size-12 text-emerald-400" />
          </div>

          <h1 className="text-3xl font-bold text-white">Instale o VemProFut</h1>

          <p className="mt-3 text-zinc-400">
            Tenha acesso à sua pelada com apenas um toque, direto da tela
            inicial do seu celular.
          </p>
        </div>

        <div className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          {BENEFITS.map((item) => (
            <div className="mb-4 flex items-center gap-2" key={item.id}>
              <Check className="text-emerald-400" />
              <span className="text-white">{item.label}</span>
            </div>
          ))}
        </div>

        <h2 className="mb-5 text-xl font-semibold text-white">Como instalar</h2>

        {isAndroid && (
          <div className="mb-5 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 flex items-center gap-3">
              <Smartphone className="text-emerald-400" />

              <h3 className="font-semibold text-white">Android</h3>
            </div>

            <ol className="space-y-3 text-zinc-300">
              <li>1. Abra o menu ⋮ do navegador.</li>

              <li>2. Toque em "Adicionar à tela inicial".</li>

              <li>3. Confirme a instalação.</li>
            </ol>
          </div>
        )}

        {isIOS && (
          <div className="mb-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 flex items-center gap-3">
              <Apple className="text-emerald-400" />

              <h3 className="font-semibold text-white">iPhone</h3>
            </div>

            <ol className="space-y-3 text-zinc-300">
              <li>1. Toque em Compartilhar.</li>

              <li>2. Escolha "Adicionar à Tela de Início".</li>

              <li>3. Confirme.</li>
            </ol>
          </div>
        )}
      </div>
    </Screen>
  );
}
