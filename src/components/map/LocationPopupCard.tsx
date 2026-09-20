"use client";

import Image from "next/image";
import { X, ChevronRight } from "lucide-react";
import { CATEGORY_CONFIG } from "@/data/attractions";
import { Attraction } from "@/types";

export interface LocationPopupCardProps<T extends Attraction = Attraction> {
  /** Local / Ponto turístico ativo selecionado no mapa */
  location: T;
  /** Callback para fechar/ocultar o card flutuante */
  onClose: () => void;
  /** Callback para navegar ou abrir a tela de detalhes dinamicamente */
  onNavigateDetails: (location: T) => void;
}

/**
 * Componente genérico e reutilizável para exibição de card flutuante no mapa.
 * Recebe o item dinamicamente, gerencia o fechamento e delega a navegação.
 */
export function LocationPopupCard<T extends Attraction = Attraction>({
  location,
  onClose,
  onNavigateDetails,
}: LocationPopupCardProps<T>) {
  const cfg = CATEGORY_CONFIG[location.category] || {
    color: "#22c5d9",
    bg: "rgba(34,197,217,0.15)",
    icon: "📍",
    accent: "#0d7a8a",
  };

  const handleAction = () => {
    // 1. Executa a navegação/abertura da tela de detalhes passando os dados do item
    onNavigateDetails(location);
    // 2. Garante o fechamento do card flutuante ativo no mapa
    onClose();
  };

  return (
    <div
      className="w-[min(19rem,calc(100vw-1.25rem))] rounded-2xl overflow-hidden shadow-2xl animate-fade-in border border-white/15 text-white"
      style={{
        background:
          "linear-gradient(155deg, rgba(8, 25, 49, 0.99), rgba(5, 16, 34, 0.99))",
        boxShadow:
          "0 18px 46px rgba(0,0,0,0.56), 0 1px 0 rgba(255,255,255,0.08) inset",
      }}
    >
      {/* Imagem do Local */}
      <div className="relative h-36 w-full overflow-hidden bg-slate-900">
        <Image
          src={location.image}
          alt={location.name}
          fill
          className="object-cover"
          sizes="288px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,16,34,0.96)] via-slate-950/15 to-black/25" />

        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar card flutuante"
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center bg-slate-950/70 hover:bg-slate-950 text-white border border-white/15 transition-colors cursor-pointer"
        >
          <X size={12} />
        </button>

        {/* Badge da Categoria */}
        <div className="absolute bottom-2 left-3">
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1"
            style={{
              background: cfg.bg,
              color: cfg.color,
              border: `1px solid ${cfg.color}40`,
            }}
          >
            <span>{cfg.icon}</span>
            <span>{location.category}</span>
          </span>
        </div>
      </div>

      {/* Conteúdo Informativo */}
      <div className="p-4 space-y-2.5">
        <div>
          <h3 className="font-bold text-white text-[15px] leading-snug tracking-tight">
            {location.name}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-[11px] text-white/50">
            <span>★ {location.rating.toFixed(1)}</span>
            <span>·</span>
            <span>{location.city}</span>
          </div>
        </div>

        <p className="text-xs text-white/65 line-clamp-2 leading-relaxed">
          {location.shortDesc}
        </p>

        {/* Botão de Navegação / Detalhes */}
        <div className="pt-2.5 flex items-center justify-between border-t border-white/10">
          <button
            onClick={handleAction}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer shadow-md"
            style={{
              background: cfg.color,
              color: "#081226",
            }}
          >
            <span>Ver detalhes & Navegação</span>
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
