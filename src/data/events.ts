import { LitoralEvent } from "@/types";

export const litoralEvents: LitoralEvent[] = [
  {
    id: "festa-rocio",
    title: "Festa Estadual de Nossa Senhora do Rocio",
    category: "Religioso",
    month: "Novembro",
    dateRange: "06 a 16 de Novembro",
    city: "Paranaguá",
    location: "Santuário Estadual do Rocio",
    description:
      "A maior festa religiosa do Paraná e a terceira maior do Brasil. Reúne mais de 200 mil fiéis em procissões terrestres e marítimas pela baía, além de feiras gastronômicas com barreado e pescados.",
    highlights: [
      "Procissão Marítima na Baía",
      "Missa Campal Solene",
      "Feira Gastronômica e Artesanato",
      "Show de fogos e cultura caiçara",
    ],
    image:
      "https://images.unsplash.com/photo-1548102245-c79dbcfa9f92?w=800&h=500&fit=crop&auto=format",
    coordinates: [-48.5163, -25.556],
  },
  {
    id: "festa-tainha",
    title: "Festa Nacional da Tainha de Paranaguá & Pontal",
    category: "Gastronômico",
    month: "Julho",
    dateRange: "01 a 10 de Julho",
    city: "Paranaguá",
    location: "Praça de Eventos / Rua da Praia",
    description:
      "Celebração máxima da safra da pesca da tainha no litoral sul do país. Pavilhões gastronômicos servem tainha recheada com farofa de camarão, música ao vivo e fandango.",
    highlights: [
      "Tainha assada na telha e recheada",
      "Apresentações de Fandango Caiçara",
      "Competição de Canoa Caiçara",
      "Shows regionais gratuitos",
    ],
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop&auto=format",
    coordinates: [-48.508, -25.5176],
  },
  {
    id: "festival-caranguejo",
    title: "Festival Gastronômico do Caranguejo",
    category: "Gastronômico",
    month: "Janeiro",
    dateRange: "15 a 25 de Janeiro",
    city: "Pontal do Paraná",
    location: "Balneário de Shangri-lá / Praia de Leste",
    description:
      "Evento oficial do verão caiçara com a melhor receita de caranguejo ao alho e óleo, vinagrete e farinha de mandioca de Morretes, respeitando as normas de defeso ambiental do IAT.",
    highlights: [
      "Caranguejada tradicional caiçara",
      "Música à beira-mar",
      "Conscientização do defeso marinho",
      "Ambiente familiar",
    ],
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop&auto=format",
    coordinates: [-48.393, -25.558],
  },
  {
    id: "encontro-fandango",
    title: "Encontro de Fandango Caiçara do Litoral",
    category: "Cultural",
    month: "Agosto",
    dateRange: "18 a 22 de Agosto",
    city: "Paranaguá",
    location: "Centro Histórico & Ilha dos Valadares",
    description:
      "Celebração do Fandango Caiçara, declarado Patrimônio Cultural Imaterial do Brasil pelo IPHAN. Mestres fandangueiros tocam violas artesanais, rabecas e dançam com tamancos de madeira.",
    highlights: [
      "Patrimônio Imaterial do IPHAN",
      "Bailados com tamancos de madeira",
      "Oficinas de lutheria de rabeca",
      "Tradicional bebida 'Cataia'",
    ],
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=500&fit=crop&auto=format",
    coordinates: [-48.5097, -25.519],
  },
  {
    id: "travessia-ilha-mel",
    title: "Travessia Ecológica & Corrida da Ilha do Mel",
    category: "Ecológico",
    month: "Outubro",
    dateRange: "20 a 22 de Outubro",
    city: "Ilha do Mel",
    location: "Praia de Brasília e Encantadas",
    description:
      "Competição de ecoturismo e corrida de trilha contornando as praias selvagens e dunas da ilha. Evento com pegada de carbono neutra e plantio de mudas de restinga nativa.",
    highlights: [
      "Corrida rústica de areia e trilha",
      "Campanha de limpeza das praias",
      "Plantio de mudas de restinga",
      "Conscientização ambiental",
    ],
    image:
      "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&h=500&fit=crop&auto=format",
    coordinates: [-48.3, -25.51],
  },
];
