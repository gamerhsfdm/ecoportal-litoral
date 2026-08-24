import { EcoArea } from "@/types";

export const ECO_CATEGORIES_CONFIG: Record<
  string,
  { label: string; color: string; fill: string; border: string; icon: string }
> = {
  "Parque Nacional": {
    label: "Parque Nacional (Proteção Integral)",
    color: "#22c55e",
    fill: "rgba(34, 197, 94, 0.22)",
    border: "#16a34a",
    icon: "🌲",
  },
  "Estação Ecológica": {
    label: "Estação Ecológica (Mata Atlântica & Restinga)",
    color: "#10b981",
    fill: "rgba(16, 185, 129, 0.25)",
    border: "#059669",
    icon: "🏝️",
  },
  "Área de Proteção Ambiental": {
    label: "APA (Uso Sustentável & Baía)",
    color: "#06b6d4",
    fill: "rgba(6, 182, 212, 0.2)",
    border: "#0891b2",
    icon: "🌊",
  },
  "Manguezal / Restingas": {
    label: "Manguezais e Restingas Costeiras",
    color: "#84cc16",
    fill: "rgba(132, 204, 22, 0.22)",
    border: "#65a30d",
    icon: "🦀",
  },
  "Reserva Natural": {
    label: "Reserva Marinha dos Golfinhos",
    color: "#38bdf8",
    fill: "rgba(56, 189, 248, 0.22)",
    border: "#0284c7",
    icon: "🐬",
  },
};

export const ecoAreas: EcoArea[] = [
  {
    id: "parna-saint-hilaire",
    name: "Parque Nacional de Saint-Hilaire/Lange",
    category: "Parque Nacional",
    city: "Pontal do Paraná / Matinhos / Paranaguá",
    areaHectares: 25118,
    description:
      "Unidade de Conservação Federal de Proteção Integral criada em 2001. Abriga uma das maiores florestas contínuas de Mata Atlântica do Brasil, protegendo nascentes vitais, cachoeiras e a Serra da Prata.",
    color: "#22c55e",
    fillOpacity: 0.25,
    center: [-48.56, -25.62],
    coordinates: [
      [
        [-48.62, -25.56],
        [-48.5, -25.54],
        [-48.47, -25.66],
        [-48.54, -25.72],
        [-48.64, -25.68],
        [-48.62, -25.56],
      ],
    ],
    fauna: [
      "Onça-pintada (Panthera onca)",
      "Papagaio-de-cara-roxa (Amazona brasiliensis)",
      "Gavião-pombo-pequeno",
      "Jacutinga",
      "Macaco-prego e Muriqui-do-sul",
    ],
    flora: [
      "Palmito-juçara (Euterpe edulis)",
      "Canela-preta e Cedro-rosa",
      "Bromélias e Orquídeas raras",
      "Figueiras centenárias da Mata Atlântica",
    ],
    importance:
      "Garante a segurança hídrica do litoral paranaense, protege espécies ameaçadas de extinção global e constitui zona núcleo da Reserva da Biosfera da UNESCO.",
    guidelines: [
      "Visitação permitida apenas em trilhas autorizadas com guias credenciados.",
      "Proibido acampar fora de locais demarcados ou fazer fogueiras.",
      "Não alimentar nem se aproximar de animais silvestres.",
      "Todo resíduo produzido deve ser integralmente levado de volta.",
    ],
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "esec-ilha-do-mel",
    name: "Estação Ecológica & Parque da Ilha do Mel",
    category: "Estação Ecológica",
    city: "Ilha do Mel (Paranaguá)",
    areaHectares: 2240,
    description:
      "Compreende mais de 90% do território da Ilha do Mel. Protege ecossistemas intocados de restinga arbórea, manguezais, costões rochosos e praias selvagens de alto valor biológico.",
    color: "#10b981",
    fillOpacity: 0.28,
    center: [-48.31, -25.52],
    coordinates: [
      [
        [-48.35, -25.48],
        [-48.27, -25.49],
        [-48.28, -25.58],
        [-48.33, -25.59],
        [-48.35, -25.48],
      ],
    ],
    fauna: [
      "Trinta-réis-real e Gaivotas migratórias",
      "Tartaruga-verde (Chelonia mydas)",
      "Lontra-neotropical",
      "Perereca-da-restinga",
    ],
    flora: [
      "Vegetação de dunas fixadoras (Ipomoea pes-caprae)",
      "Grumixameiras e Araçás de restinga",
      "Mangue-vermelho (Rhizophora mangle)",
    ],
    importance:
      "Barreira natural contra a erosão costeira, sítio de descanso para aves migratórias intercontinentais e santuário marinho intocado no sul do país.",
    guidelines: [
      "Proibida a entrada e circulação de qualquer veículo motorizado.",
      "Capacidade de carga controlada (máx. 5.000 pessoas simultâneas).",
      "Não coletar conchas, flores ou fragmentos rochosos das praias.",
      "Acesso restrito apenas a pedestres e ciclistas nas vilas.",
    ],
    image:
      "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "manguezal-baia-paranagua",
    name: "APA da Baía de Paranaguá & Manguezais Estuarinos",
    category: "Manguezal / Restingas",
    city: "Paranaguá / Guaraqueçaba / Antonina",
    areaHectares: 45000,
    description:
      "O maior e mais bem preservado complexo de manguezais do sul do Brasil. É o berçário da vida marinha de todo o Atlântico Sul, filtrando águas e sustentando centenas de famílias de pescadores caiçaras.",
    color: "#84cc16",
    fillOpacity: 0.22,
    center: [-48.45, -25.46],
    coordinates: [
      [
        [-48.58, -25.43],
        [-48.38, -25.4],
        [-48.32, -25.47],
        [-48.42, -25.52],
        [-48.56, -25.5],
        [-48.58, -25.43],
      ],
    ],
    fauna: [
      "Caranguejo-uçá (Ucides cordatus)",
      "Guará-vermelho (Eudocimus ruber)",
      "Camarão sete-barbas e Pescada-amarela",
      "Raias e Peixes estuarinos",
    ],
    flora: [
      "Mangue-vermelho (Rhizophora mangle)",
      "Mangue-preto (Avicennia schaueriana)",
      "Mangue-branco (Laguncularia racemosa)",
    ],
    importance:
      "Berçário reprodutivo de 80% das espécies de interesse pesqueiro comercial e fixador de carbono azul vital para o equilíbrio climático global.",
    guidelines: [
      "Respeito absoluto aos períodos de defeso do caranguejo e camarão.",
      "Descarte zero de resíduos sólidos ou efluentes nas águas do estuário.",
      "Navegação em baixa velocidade nas gamboas e canais estreitos.",
    ],
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "santuario-golfinhos",
    name: "Santuário Marinho dos Botos-Cinza (Canal da Galheta)",
    category: "Reserva Natural",
    city: "Pontal do Paraná / Paranaguá",
    areaHectares: 12000,
    description:
      "Área marinha de alta concentração de botos-cinza (Sotalia guianensis). O canal entre a Ponta do Poço e a Ilha do Mel serve de área de alimentação, socialização e cuidado com filhotes de cetáceos.",
    color: "#38bdf8",
    fillOpacity: 0.22,
    center: [-48.34, -25.56],
    coordinates: [
      [
        [-48.37, -25.53],
        [-48.31, -25.53],
        [-48.3, -25.6],
        [-48.36, -25.6],
        [-48.37, -25.53],
      ],
    ],
    fauna: [
      "Boto-cinza (Sotalia guianensis)",
      "Tartaruga-de-pente e Tartaruga-cabeçuda",
      "Atobás e Fragatas marinhas",
      "Cardumes de manjuba e sardinha",
    ],
    flora: ["Fitoplâncton oceânico", "Macroalgas marinhas bentônicas"],
    importance:
      "Uma das maiores populações residentes de boto-cinza do mundo, monitorada continuamente pelo Centro de Estudos do Mar (CEM/UFPR).",
    guidelines: [
      "Manter distância mínima de 50 metros das fêmeas com filhotes.",
      "Embarcações devem desacelerar e não cruzar a trajetória dos animais.",
      "Proibido nadar ou tentar tocar os golfinhos na água.",
    ],
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop&auto=format",
  },
];
