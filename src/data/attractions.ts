import { Attraction, Category } from "@/types";

export const CATEGORY_CONFIG: Record<
  Category,
  { color: string; bg: string; icon: string; accent: string }
> = {
  Praias: {
    color: "#22c5d9",
    bg: "rgba(34,197,217,0.15)",
    icon: "🏖️",
    accent: "#0d7a8a",
  },
  Ilhas: {
    color: "#4ade80",
    bg: "rgba(74,222,128,0.15)",
    icon: "🏝️",
    accent: "#166534",
  },
  Natureza: {
    color: "#86efac",
    bg: "rgba(134,239,172,0.15)",
    icon: "🌿",
    accent: "#15803d",
  },
  História: {
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.15)",
    icon: "🏛️",
    accent: "#92400e",
  },
  Cultura: {
    color: "#f97316",
    bg: "rgba(249,115,22,0.15)",
    icon: "🎭",
    accent: "#c2410c",
  },
  Gastronomia: {
    color: "#e85d3a",
    bg: "rgba(232,93,58,0.15)",
    icon: "🦞",
    accent: "#9a3412",
  },
  Passeios: {
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.15)",
    icon: "⛵",
    accent: "#5b21b6",
  },
};

export const attractions: Attraction[] = [
  // Pontal do Paraná
  {
    id: "praia-leste",
    name: "Praia de Leste",
    category: "Praias",
    city: "Pontal do Paraná",
    lat: -25.5792,
    lng: -48.3783,
    shortDesc: "Extensa faixa de areia com mar calmo, ideal para famílias e banho de mar.",
    description:
      "Praia de Leste é um dos balneários mais tradicionais de Pontal do Paraná, com uma longa faixa de areia fina e mar relativamente calmo. Possui boa infraestrutura, com quiosques, restaurantes e fácil acesso. É um destino clássico para famílias que buscam tranquilidade e contato direto com o mar do litoral paranaense.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=500&fit=crop&auto=format",
    ],
    rating: 4.4,
    highlights: ["Mar calmo", "Acessível", "Infraestrutura completa", "Ideal para famílias"],
    hours: "Aberta 24h",
    tip: "Visitar no início da manhã para encontrar a praia tranquila e o mar cristalino.",
    biome: "Restinga e Zona Costeira",
    ecoTip: "Ajude a manter a praia limpa. Não deixe plásticos na areia e preserve as dunas com vegetação nativa.",
    preservationStatus: "Área de Monitoramento Ambiental Costeiro",
  },
  {
    id: "praia-ipanema",
    name: "Praia Ipanema",
    category: "Praias",
    city: "Pontal do Paraná",
    lat: -25.5412,
    lng: -48.4023,
    shortDesc: "Balneário charmoso com ambiente familiar e belo pôr do sol.",
    description:
      "Ipanema é um dos balneários mais queridos do litoral paranaense, com casas de veraneio, comércio local e uma comunidade acolhedora. A praia tem areia clara e águas calmas, perfeita para banho e lazer. Nos fins de semana, o balneário ganha vida com visitantes que aproveitam o mar e a gastronomia local.",
    image:
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop&auto=format",
    ],
    rating: 4.3,
    highlights: ["Ambiente familiar", "Pôr do sol", "Comércio local", "Tranquilidade"],
    hours: "Aberta 24h",
    tip: "Experimente frutos do mar frescos nos restaurantes à beira-mar.",
    biome: "Restinga Litorânea",
    ecoTip: "Evite transitar com veículos sobre as dunas para evitar a erosão da praia.",
    preservationStatus: "Monitoramento de Balneabilidade IAT",
  },
  {
    id: "shangrila",
    name: "Shangri-lá",
    category: "Praias",
    city: "Pontal do Paraná",
    lat: -25.558,
    lng: -48.393,
    shortDesc: "Balneário paradisíaco com charme e natureza preservada.",
    description:
      "Shangri-lá vive à altura do seu nome encantador: um recanto de praias limpas, arborização abundante e atmosfera calma. O balneário tem um perfil mais residencial e preservado, o que garante tranquilidade e contato genuíno com a natureza litorânea paranaense.",
    image:
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop&auto=format",
    ],
    rating: 4.5,
    highlights: ["Natureza preservada", "Arborização", "Atmosfera tranquila", "Pouco movimento"],
    tip: "Ótimo para caminhadas ao longo da orla ao pôr do sol.",
    biome: "Faixa de Restinga Preservada",
    ecoTip: "Respeite as áreas de nidificação de aves marinhas na areia alta.",
    preservationStatus: "Área de Preservação Permanente (APP) de Orla",
  },
  {
    id: "pontal-sul",
    name: "Pontal do Sul",
    category: "Praias",
    city: "Pontal do Paraná",
    lat: -25.5697,
    lng: -48.3509,
    shortDesc: "Vila de pescadores com praia selvagem e porto de embarque para as ilhas.",
    description:
      "Pontal do Sul é o ponto mais a leste do continente no município e o principal portal para a Ilha do Mel e o Parque Nacional Marinho. A vila preserva a rica cultura da pesca artesanal, com barcos coloridos e pescadores tradicionais. Abriga também o Centro de Estudos do Mar (CEM) da UFPR, referência em pesquisas marinhas.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1490197415175-074fd86b1fcc?w=800&h=500&fit=crop&auto=format",
    ],
    rating: 4.6,
    highlights: ["Porto de pesca", "Cultura artesanal", "Ponto de embarque", "Pesquisa marinha"],
    tip: "Embarque cedo para a Ilha do Mel para aproveitar o dia todo e observar botos na baía.",
    biome: "Restinga e Estuário da Baía de Paranaguá",
    ecoTip: "Avistamento frequente do boto-cinza. Mantenha distância segura e nunca os alimente.",
    preservationStatus: "Área de Proteção Ambiental Marinha",
  },
  {
    id: "terminal-embarque",
    name: "Terminal de Embarque — Ponta do Poço",
    category: "Passeios",
    city: "Pontal do Paraná",
    lat: -25.5715,
    lng: -48.3485,
    shortDesc: "Principal terminal marítimo com saídas para Ilha do Mel e Paranaguá.",
    description:
      "O Terminal de Ponta do Poço é o grande hub de transporte aquaviário do litoral paranaense, conectando o continente à Ilha do Mel (Brasília e Encantadas) e às ilhas da Baía de Paranaguá. Possui estrutura com bilheteria oficial, estacionamentos e receptivo turístico com vista espetacular da baía.",
    image:
      "https://images.unsplash.com/photo-1566288623394-377af472d80b?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1566288623394-377af472d80b?w=800&h=500&fit=crop&auto=format",
    ],
    rating: 4.2,
    highlights: ["Saídas para Ilha do Mel", "Barcas diárias", "Paisagem da baía", "Ponto de partida"],
    hours: "06:00 às 18:00 (saídas a cada 30 min em alta temporada)",
    tip: "Compre passagem de ida e volta com antecedência para evitar filas no retorno.",
    biome: "Canal Marítimo da Baía",
    ecoTip: "Utilize embarcações credenciadas pela Capitania dos Portos e IAT.",
  },
  {
    id: "saint-hilaire-lange",
    name: "Parque Nacional Saint-Hilaire/Lange",
    category: "Natureza",
    city: "Pontal do Paraná",
    lat: -25.512,
    lng: -48.5,
    shortDesc: "Área de proteção integral da Mata Atlântica com trilhas, cachoeiras e biodiversidade exuberante.",
    description:
      "O Parque Nacional de Saint-Hilaire/Lange protege mais de 25.000 hectares contíguos de Mata Atlântica que se estendem da serra ao mar. Abriga centenas de espécies de animais raros como a onça-pintada, o papagaio-de-cara-roxa e o jacutinga, além de cachoeiras cristalinas. É um Patrimônio Natural da Humanidade reconhecido pela UNESCO.",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&h=500&fit=crop&auto=format",
    ],
    rating: 4.8,
    highlights: [
      "Mata Atlântica protegida",
      "Cachoeiras",
      "Trilhas ecológicas",
      "Biodiversidade global",
      "Patrimônio UNESCO",
    ],
    hours: "Ter–Dom, 08:00 às 17:00",
    tip: "Use calçados fechados, leve repelente e contrate guia credenciado para trilhas longas.",
    biome: "Floresta Ombrófila Densa (Mata Atlântica)",
    ecoTip: "Não retire nenhuma planta, semente ou pedra. Mantenha silêncio para observar as aves nativas.",
    preservationStatus: "Unidade de Conservação de Proteção Integral (ICMBio)",
  },

  // Paranaguá
  {
    id: "centro-historico",
    name: "Centro Histórico de Paranaguá",
    category: "História",
    city: "Paranaguá",
    lat: -25.519,
    lng: -48.5097,
    shortDesc: "O berço da civilização paranaense, com casario colonial e ruas de pedras do séc. XVII ao XIX.",
    description:
      "O Centro Histórico de Paranaguá é um dos conjuntos urbanos coloniais mais preservados do sul do país. Tombado pelo IPHAN em 1990, reúne sobrados coloniais, igrejas barrocas, fontes e o antigo Colégio dos Jesuítas. Conta a história das primeiras expedições de povoamento do Paraná e o apogeu do ciclo do mate e do porto.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?w=800&h=500&fit=crop&auto=format",
    ],
    rating: 4.7,
    highlights: ["Arquitetura colonial", "Patrimônio IPHAN", "Igrejas históricas", "Século XVII"],
    tip: "Faça o circuito a pé começando pela Praça da Matriz em direção à Rua da Praia.",
    biome: "Área Urbana Histórica Estuarina",
    preservationStatus: "Tombamento Nacional pelo IPHAN",
  },
  {
    id: "rua-da-praia",
    name: "Rua da Praia (Rua General Carneiro)",
    category: "Cultura",
    city: "Paranaguá",
    lat: -25.5176,
    lng: -48.508,
    shortDesc: "Charmoso calçadão à beira do Rio Itiberê, repleto de bares, cultura e feiras típicas.",
    description:
      "A lendária Rua da Praia é o ponto de encontro da sociedade parnanguara às margens do Rio Itiberê. Concentra restaurantes com a autêntica culinária caiçara, sobrados restaurados com azulejos portugueses e a passarela de pedestres com vista panorâmica para as canoas e a Ilha dos Valadares.",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=500&fit=crop&auto=format",
    ],
    rating: 4.5,
    highlights: ["Vista para o Itiberê", "Culinária caiçara", "Vida noturna", "Feira de artesanato"],
    tip: "Visite no fim de tarde para provar o fandango caiçara e o tradicional Barreado.",
    biome: "Margem Estuarina do Rio Itiberê",
    ecoTip: "Apoie a produção de artesãos e pescadores caiçaras locais.",
  },
  {
    id: "mercado-cafe",
    name: "Mercado Municipal do Café e Pescados",
    category: "Gastronomia",
    city: "Paranaguá",
    lat: -25.5198,
    lng: -48.5073,
    shortDesc: "Templo gastronômico do litoral com frutos do mar frescos, camarão e pastel caiçara.",
    description:
      "O Mercado Municipal do Café de Paranaguá, construído em estrutura metálica com arquitetura do século XIX, é o polo da gastronomia marítima paranaense. Diariamente recebe barcos com pescados frescos, ostras e o famoso camarão sete-barbas. Ao lado, os quiosques servem porções fartas, barreado e pastéis de siri imperdíveis.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop&auto=format",
    ],
    rating: 4.6,
    highlights: ["Camarão sete-barbas", "Barreado tradicional", "Prédio histórico", "Pescado fresco"],
    hours: "Ter–Dom, 07:00 às 18:00",
    tip: "Peça o famoso pastel de camarão com caldo de cana no almoço caiçara.",
    biome: "Estuário de Pesca Sustentável",
    ecoTip: "Respeite o período de defeso do caranguejo e camarão comprando apenas de fontes legais.",
  },
  {
    id: "santuario-rocio",
    name: "Santuário Estadual de N. Sra. do Rocio",
    category: "Cultura",
    city: "Paranaguá",
    lat: -25.556,
    lng: -48.5163,
    shortDesc: "Santuário mariano em estilo neogótico dedicado à Padroeira do Estado do Paraná.",
    description:
      "O Santuário de Nossa Senhora do Rocio é o principal centro de fé católica do Paraná, atraindo mais de 200 mil peregrinos em sua festa anual em novembro. Sua igreja neogótica domina a paisagem da baía e guarda a milagrosa imagem encontrada por pescadores no século XVII.",
    image:
      "https://images.unsplash.com/photo-1548102245-c79dbcfa9f92?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1548102245-c79dbcfa9f92?w=800&h=500&fit=crop&auto=format",
    ],
    rating: 4.7,
    highlights: ["Arquitetura neogótica", "Vista da baía", "Peregrinação", "História religiosa"],
    hours: "Aberto diariamente, 06:30 às 19:30",
    tip: "O mirante externo oferece uma das vistas mais amplas da orla e manguezais de Paranaguá.",
    biome: "Encosta Costeira e Baía",
  },
  {
    id: "estacao-ferroviaria",
    name: "Estação Ferroviária de Paranaguá",
    category: "História",
    city: "Paranaguá",
    lat: -25.5155,
    lng: -48.5143,
    shortDesc: "Terminal histórico da centenária Estrada de Ferro Paranaguá–Curitiba (1885).",
    description:
      "Marco histórico da engenharia brasileira, a Estação de Paranaguá foi construída pelos irmãos Rebouças no século XIX para escoar a produção paranaense até o porto. A ferrovia atravessa viadutos e túneis cavados na rocha da Serra do Mar e é considerada uma das viagens cênicas de trem mais bonitas do mundo.",
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=500&fit=crop&auto=format",
    ],
    rating: 4.5,
    highlights: ["Engenharia Rebouças", "Arquitetura séc. XIX", "Trem da Serra do Mar", "Tombado"],
    hours: "Área externa aberta 24h",
    tip: "Excelente local para fotos da arquitetura ferroviária clássica.",
    biome: "Transição Serra do Mar e Planície Litorânea",
  },
  {
    id: "museu-arqueologia",
    name: "Museu de Arqueologia e Etnologia (MAE/UFPR)",
    category: "História",
    city: "Paranaguá",
    lat: -25.5173,
    lng: -48.5119,
    shortDesc: "Acervo arqueológico de sambaquis e cultura indígena no antigo Colégio dos Jesuítas (1755).",
    description:
      "Instalado no monumental edifício do antigo Colégio dos Jesuítas (século XVIII), o MAE/UFPR abriga uma das mais ricas coleções arqueológicas e etnográficas do país. Suas salas apresentam artefatos milenares dos homens dos sambaquis que habitaram a costa do Paraná há mais de 4.000 anos, além de cultura indígena Guarani e Kaingang.",
    image:
      "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&h=500&fit=crop&auto=format",
    ],
    rating: 4.6,
    highlights: ["Artefatos de sambaquis", "Edifício jesuíta 1755", "Entrada gratuita", "Arqueologia"],
    hours: "Ter–Sex 09:00 às 17:00 | Sáb–Dom 12:00 às 17:00",
    tip: "A visita é educativa e guiada. Não deixe de conhecer a maquete tátil dos sambaquis.",
    biome: "Patrimônio Arqueológico e Histórico",
    preservationStatus: "Museu Federal da UFPR / Tombamento Histórico",
  },
  {
    id: "aquario-paranagua",
    name: "Aquário Marinho de Paranaguá",
    category: "Natureza",
    city: "Paranaguá",
    lat: -25.5185,
    lng: -48.5061,
    shortDesc: "Centro de educação ambiental com espécies marinhas nativas, raias e pinguins.",
    description:
      "O Aquário de Paranaguá é um dos maiores do sul do Brasil, focado na preservação da biodiversidade aquática da Baía de Paranaguá e costa atlântica. Possui tanques táteis com raias e tubarões, pinguinário, manguezal artificial educativo e recintos com animais resgatados.",
    image:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&h=500&fit=crop&auto=format",
    ],
    rating: 4.3,
    highlights: ["Tanque de raias", "Pinguins de Magalhães", "Educação ambiental", "Para todas as idades"],
    hours: "Ter–Dom, 10:00 às 17:30",
    tip: "Ótimo programa em família para conhecer a fauna marinha que vive na nossa baía.",
    biome: "Ecossistemas Marinho e Estuarino",
    ecoTip: "O aquário atua na reabilitação de animais marinhos encalhados no litoral.",
  },

  // Ilha do Mel
  {
    id: "ilha-mel-passeio",
    name: "Ilha do Mel — Farol e Fortaleza",
    category: "Ilhas",
    city: "Ilha do Mel",
    lat: -25.51,
    lng: -48.3,
    shortDesc: "Paraíso ecológico sem carros, com praias paradisíacas, o Farol das Conchas e a Fortaleza do séc. XVIII.",
    description:
      "A Ilha do Mel é o maior tesouro ecológico do Paraná. 95% do seu território compõe uma Estação Ecológica e Parque Estadual de Mata Atlântica e restinga. O Farol das Conchas (1872) oferece um mirante 360° do oceano, e a Fortaleza de N. Sra. dos Prazeres (1767) guarda canhões coloniais à beira-mar.",
    image:
      "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop&auto=format",
    ],
    rating: 4.9,
    highlights: [
      "Sem circulação de carros",
      "Farol das Conchas (1872)",
      "Fortaleza colonial (1767)",
      "Trilhas de Mata Atlântica",
      "Preservação integral",
    ],
    tip: "A ilha possui limite diário de visitantes (5.000 pessoas). Leve lanterna para caminhar à noite pelas trilhas de areia.",
    biome: "Restinga Arbórea e Mata Atlântica Insular",
    ecoTip: "Proibido qualquer veículo automotor. Todo o lixo gerado deve ser descartado nas lixeiras das vilas.",
    preservationStatus: "Estação Ecológica e Parque Estadual (IAT)",
  },
  {
    id: "gruta-encantadas",
    name: "Gruta das Encantadas",
    category: "Ilhas",
    city: "Ilha do Mel",
    lat: -25.573,
    lng: -48.31,
    shortDesc: "Misteriosa fenda geológica esculpida pelo mar com lendas caiçaras de sereias.",
    description:
      "A Gruta das Encantadas é uma formação rochosa única no sul da Ilha do Mel, onde o bater incessante das ondas do Atlântico esculpiu uma caverna natural em meio a um dique de diabásio negro. O acesso é feito por uma passarela de madeira sustentável na maré baixa.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=500&fit=crop&auto=format",
    ],
    rating: 4.8,
    highlights: ["Formação geológica", "Passarela ecológica", "Lendas caiçaras", "Visual selvagem"],
    hours: "Visitação recomendada durante a Maré Baixa",
    tip: "Consulte a tábua de marés no EcoPortal antes de caminhar até a gruta para pegar a água baixa.",
    biome: "Costão Rochoso e Mar Aberto",
    ecoTip: "Caminhe apenas pelas passarelas demarcadas para não desgastar as rochas e a vegetação pioneira.",
  },
  {
    id: "ilha-pecas",
    name: "Vila das Peças e Baía dos Golfinhos",
    category: "Passeios",
    city: "Paranaguá",
    lat: -25.461,
    lng: -48.336,
    shortDesc: "Passeio de barco por manguezais protegidos com observação natural de botos-cinza.",
    description:
      "Localizada na entrada do Complexo Estuarino de Paranaguá, a Ilha das Peças faz parte do Parque Nacional do Superagui. O trajeto de barco a partir de Pontal do Sul ou Paranaguá é o principal ponto do litoral brasileiro para avistar botos-cinza nadando em bandos livres.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop&auto=format",
    ],
    rating: 4.8,
    highlights: ["Avistamento de botos", "Manguezais intactos", "Comunidade tradicional", "Passeio náutico"],
    tip: "Contrate barqueiros locais na Ponta do Poço. O passeio costuma durar cerca de 4 horas.",
    biome: "Manguezal e Complexo Estuarino",
    ecoTip: "Barcos devem manter velocidade reduzida e motor em neutro próximo aos golfinhos.",
    preservationStatus: "Parque Nacional do Superagui / APA de Guaraqueçaba",
  },
];