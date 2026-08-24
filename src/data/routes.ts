import { TourRoute } from "@/types";

export const tourRoutes: TourRoute[] = [
  {
    id: "circuito-historico-paranagua",
    title: "Circuito Histórico & Colonial",
    category: "História",
    badge: "Mais Popular",
    description:
      "Uma viagem no tempo pelos quatro séculos da fundação do Paraná. Caminhe pelas ruelas coloniais, visite o museu dos jesuítas e saboreie o autêntico barreado caiçara.",
    distanceKm: 4.8,
    estimatedDuration: "3h a pé / bike",
    color: "#fbbf24",
    icon: "🏛️",
    coordinates: [
      [-48.5097, -25.519], // Centro Histórico
      [-48.5119, -25.5173], // MAE / UFPR
      [-48.508, -25.5176], // Rua da Praia
      [-48.5073, -25.5198], // Mercado do Café
      [-48.5143, -25.5155], // Estação Ferroviária
      [-48.5163, -25.556], // Santuário do Rocio
    ],
    stops: [
      {
        attractionId: "centro-historico",
        title: "Centro Histórico de Paranaguá",
        order: 1,
        coordinates: [-48.5097, -25.519],
        tip: "Inicie na Praça da Matriz admirando a arquitetura barroca do século XVII.",
      },
      {
        attractionId: "museu-arqueologia",
        title: "Museu de Arqueologia e Etnologia (MAE)",
        order: 2,
        coordinates: [-48.5119, -25.5173],
        tip: "Visite a coleção de sambaquis milenares no antigo Colégio dos Jesuítas.",
      },
      {
        attractionId: "rua-da-praia",
        title: "Rua da Praia & Rio Itiberê",
        order: 3,
        coordinates: [-48.508, -25.5176],
        tip: "Passeio pelo calçadão histórico com vista para as canoas caiçaras.",
      },
      {
        attractionId: "mercado-cafe",
        title: "Mercado Municipal do Café",
        order: 4,
        coordinates: [-48.5073, -25.5198],
        tip: "Parada para o almoço: experimente o pastel de camarão sete-barbas e o Barreado.",
      },
      {
        attractionId: "estacao-ferroviaria",
        title: "Estação Ferroviária Histórica (1885)",
        order: 5,
        coordinates: [-48.5143, -25.5155],
        tip: "Marco da histórica ferrovia que conecta a serra ao litoral.",
      },
    ],
  },
  {
    id: "circuito-praias-pontal",
    title: "Rota das Praias & Balneários",
    category: "Praias",
    badge: "Sol & Mar",
    description:
      "Mais de 23 km de orla contínua com praias limpas, restingas preservadas, quiosques acolhedores e a vila de pescadores de Pontal do Sul.",
    distanceKm: 14.2,
    estimatedDuration: "4h de carro / bike",
    color: "#22c5d9",
    icon: "🏖️",
    coordinates: [
      [-48.3783, -25.5792], // Praia de Leste
      [-48.4023, -25.5412], // Praia Ipanema
      [-48.393, -25.558], // Shangri-lá
      [-48.3509, -25.5697], // Pontal do Sul
      [-48.3485, -25.5715], // Terminal Ponta do Poço
    ],
    stops: [
      {
        attractionId: "praia-leste",
        title: "Praia de Leste",
        order: 1,
        coordinates: [-48.3783, -25.5792],
        tip: "Ideal para banho de mar calmo logo pela manhã.",
      },
      {
        attractionId: "praia-ipanema",
        title: "Praia Ipanema",
        order: 2,
        coordinates: [-48.4023, -25.5412],
        tip: "Aproveite a orla arborizada e o comércio gastronômico.",
      },
      {
        attractionId: "shangrila",
        title: "Balneário Shangri-lá",
        order: 3,
        coordinates: [-48.393, -25.558],
        tip: "Tranquilidade e natureza preservada para caminhadas.",
      },
      {
        attractionId: "pontal-sul",
        title: "Vila de Pescadores de Pontal do Sul",
        order: 4,
        coordinates: [-48.3509, -25.5697],
        tip: "Cultura tradicional de pesca artesanal e pôr do sol inesquecível.",
      },
      {
        attractionId: "terminal-embarque",
        title: "Terminal de Embarque Ponta do Poço",
        order: 5,
        coordinates: [-48.3485, -25.5715],
        tip: "Ponto de partida para a travessia das ilhas e observação de botos.",
      },
    ],
  },
  {
    id: "expedicao-ilha-do-mel",
    title: "Expedição Ecológica Ilha do Mel",
    category: "Ecológico",
    badge: "Natureza Intocada",
    description:
      "Aventura em uma ilha sem carros! Travessia náutica pela baía com botos, trilhas de restinga, cavernas marinhas e patrimônio histórico colonial.",
    distanceKm: 9.5,
    estimatedDuration: "Dia inteiro (Barco + Trilhas)",
    color: "#4ade80",
    icon: "🏝️",
    coordinates: [
      [-48.3485, -25.5715], // Ponta do Poço (Embarque)
      [-48.31, -25.573], // Gruta das Encantadas
      [-48.3, -25.51], // Farol das Conchas & Brasília
      [-48.336, -25.461], // Ilha das Peças / Baía
    ],
    stops: [
      {
        attractionId: "terminal-embarque",
        title: "Embarque na Ponta do Poço",
        order: 1,
        coordinates: [-48.3485, -25.5715],
        tip: "Pegue a lancha rápida matinal no terminal oficial.",
      },
      {
        attractionId: "gruta-encantadas",
        title: "Gruta das Encantadas",
        order: 2,
        coordinates: [-48.31, -25.573],
        tip: "Acesse a passarela ecológica preferencialmente na maré baixa.",
      },
      {
        attractionId: "ilha-mel-passeio",
        title: "Farol das Conchas & Fortaleza Colonial",
        order: 3,
        coordinates: [-48.3, -25.51],
        tip: "Suba os degraus do farol para uma vista 360° panorâmica do Atlântico.",
      },
      {
        attractionId: "ilha-pecas",
        title: "Baía dos Botos e Ilha das Peças",
        order: 4,
        coordinates: [-48.336, -25.461],
        tip: "Avistamento livre de botos-cinza nas águas calmas da baía.",
      },
    ],
  },
  {
    id: "circuito-mata-atlantica",
    title: "Trilha da Mata Atlântica & Manguezais",
    category: "Ecológico",
    badge: "Eco-Consciência",
    description:
      "Imersão na biodiversidade da maior reserva contínua de Mata Atlântica do país. Cachoeiras, fauna silvestre rara e ecossistemas de manguezal.",
    distanceKm: 32.0,
    estimatedDuration: "1 a 2 dias",
    color: "#10b981",
    icon: "🌿",
    coordinates: [
      [-48.5, -25.512], // Parque Saint-Hilaire/Lange
      [-48.45, -25.46], // Manguezais da Baía
      [-48.5061, -25.5185], // Aquário de Paranaguá
      [-48.34, -25.56], // Santuário dos Botos
    ],
    stops: [
      {
        attractionId: "saint-hilaire-lange",
        title: "Parque Nacional Saint-Hilaire/Lange",
        order: 1,
        coordinates: [-48.5, -25.512],
        tip: "Caminhadas ecológicas e banho nas cachoeiras cristalinas com guia.",
      },
      {
        attractionId: "aquario-paranagua",
        title: "Aquário Marinho de Paranaguá",
        order: 2,
        coordinates: [-48.5061, -25.5185],
        tip: "Aprenda sobre os ecossistemas marinhos e a fauna resgatada.",
      },
      {
        attractionId: "pontal-sul",
        title: "Centro de Estudos do Mar (CEM/UFPR)",
        order: 3,
        coordinates: [-48.3509, -25.5697],
        tip: "Polo de pesquisa oceanográfica e conservação de cetáceos.",
      },
    ],
  },
];
