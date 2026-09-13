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
  // ============================================================
  // PONTAL DO PARANÁ — TURISMO E NATUREZA
  // ============================================================

  {
    id: "pontal-sul",
    name: "Balneário de Pontal do Sul",
    category: "Praias",
    city: "Pontal do Paraná",
    lat: -25.5737,
    lng: -48.3577,
    altitudeM: 5,
    address: "Pontal do Sul, Pontal do Paraná, Paraná, Brasil",

    shortDesc:
      "Balneário costeiro de Pontal do Paraná, conhecido pelas praias, cultura caiçara e embarques para a Ilha do Mel.",

    description:
      "Balneário localizado no litoral de Pontal do Paraná, conhecido por suas praias, paisagens costeiras e por ser um dos principais pontos de embarque para a Ilha do Mel. A região também oferece opções de lazer, gastronomia e contato com a natureza. Pontal do Sul possui grande importância histórica ligada à pesca tradicional e ao desenvolvimento turístico da costa paranaense.",

    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pontal_do_Paran%C3%A1_-_Praia.jpg",

    gallery: [
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pontal_do_Paran%C3%A1_-_Praia.jpg",
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pontal_do_Paran%C3%A1.jpg",
    ],

    rating: 4.7,

    highlights: [
      "Embarque para a Ilha do Mel",
      "Cultura caiçara",
      "Pesca artesanal",
      "Praias e paisagens costeiras",
      "Gastronomia local",
    ],

    hours: "Acesso livre 24h",

    tip: "Aproveite a orla no início da manhã para observar a movimentação dos barcos de pesca e a paisagem da Baía de Paranaguá.",

    biome: "Restinga e Estuário da Baía de Paranaguá",

    ecoTip:
      "Não deixe lixo na praia e mantenha distância segura da fauna marinha.",

    preservationStatus: "Área Costeira e Estuarina",

    source:
      "Prefeitura Municipal de Pontal do Paraná / Informações Turísticas Municipais",

    imageCredit: "AndreWormsbecker — Wikimedia Commons — CC BY-SA 4.0",
  },

  {
    id: "ilhas-dos-currais",
    name: "Parque Nacional Marinho das Ilhas dos Currais",
    category: "Natureza",
    city: "Pontal do Paraná",
    lat: -25.73889,
    lng: -48.35139,
    altitudeM: 0,

    address:
      "Oceano Atlântico, em frente à costa de Pontal do Paraná, próximo a Praia de Leste",

    shortDesc:
      "Parque Nacional Marinho formado por três ilhas oceânicas, importante área de conservação da fauna marinha e de aves.",

    description:
      "O Parque Nacional Marinho das Ilhas dos Currais é formado por três ilhas localizadas em frente ao litoral paranaense. A unidade protege ecossistemas marinhos e costeiros e é reconhecida pela importância para aves marinhas e atividades de pesquisa e mergulho.",

    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ilha_dos_Currais.JPG",

    gallery: [
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ilha_dos_Currais.JPG",
    ],

    rating: 4.9,

    highlights: [
      "Parque Nacional Marinho",
      "Três ilhas oceânicas",
      "Proteção da fauna marinha",
      "Importância para aves marinhas",
      "Mergulho e pesquisa científica",
    ],

    hours: "Visitação náutica conforme regras da unidade",

    tip: "Consulte previamente as regras de visitação e utilize operadores autorizados.",

    biome: "Ecossistema Insular Oceânico e Costeiro",

    ecoTip:
      "Não desembarque em áreas proibidas e nunca se aproxime ou alimente animais silvestres.",

    preservationStatus: "Unidade de Conservação de Proteção Integral",

    source: "Viaje Paraná / ICMBio",

    imageCredit: "DAR7 e Eloy Olindo Setti — Wikimedia Commons — CC BY-SA 3.0",
  },

  {
    id: "estrada-ecologica-guaraguacu",
    name: "Estrada Ecológica do Guaraguaçu",
    category: "Natureza",
    city: "Pontal do Paraná",
    lat: -25.667177,
    lng: -48.511427,
    altitudeM: 12,

    address:
      "Estrada Domingos Mesquita Santana, 601, Pontal do Paraná – PR, Brasil",

    shortDesc:
      "Estrada ecológica que acompanha a região do Rio Guaraguaçu e dá acesso ao Sambaqui do Guaraguaçu.",

    description:
      "A Estrada Ecológica do Guaraguaçu, oficialmente denominada Estrada Domingos Mesquita Santana, acompanha a região do Rio Guaraguaçu e integra o circuito ecocultural do município. O caminho dá acesso ao Sambaqui do Guaraguaçu e passa por áreas de Mata Atlântica e ambientes naturais.",

    image: "/images/estrada-ecologica-do-guaraguacu.jpg",

    gallery: ["/images/estrada-ecologica-do-guaraguacu.jpg"],

    rating: 4.6,

    highlights: [
      "Circuito Ecocultural do Guaraguaçu",
      "Acesso ao Sambaqui do Guaraguaçu",
      "Mata Atlântica",
      "Paisagens naturais",
      "Caminhadas e cicloturismo",
    ],

    hours: "Acesso livre durante o dia",

    tip: "Leve água, repelente e utilize calçados adequados para caminhada.",

    biome: "Floresta Ombrófila Densa de Terras Baixas",

    ecoTip:
      "Não retire plantas, animais ou materiais naturais e leve todo o lixo produzido.",

    preservationStatus: "Área de Preservação Ambiental e Corredor Ecológico",

    source:
      "Prefeitura de Pontal do Paraná — Circuito Ecocultural do Guaraguaçu",

    imageCredit: "Wikimedia Commons — CC BY-SA 4.0",
  },

  {
    id: "comunidade-maciel",
    name: "Comunidade do Maciel (Ilha do Maciel)",
    category: "Cultura",
    city: "Pontal do Paraná",
    lat: -25.556472,
    lng: -48.403206,
    altitudeM: 16,

    address: "Comunidade do Maciel, Pontal do Paraná – PR, CEP 83255-000",

    shortDesc:
      "Comunidade tradicional caiçara formada por famílias de pescadores artesanais.",

    description:
      "Vila tradicional onde vivem famílias de pescadores artesanais. A comunidade possui casas coloridas, canoas, redes de pesca e mantém tradições ligadas à cultura caiçara. A região também recebe uma etapa da Caminhada Internacional na Natureza — Circuito Ilha do Maciel.",

    image: "/images/comunidade-maciel.jpg",

    gallery: ["/images/comunidade-maciel.jpg"],

    rating: 4.7,

    highlights: [
      "Comunidade tradicional caiçara",
      "Pesca artesanal",
      "Casas e canoas tradicionais",
      "Cultura local",
      "Caminhada Internacional na Natureza",
    ],

    hours: "Visitação durante o período diurno",

    tip: "Valorize os moradores e o turismo comunitário durante a visita.",

    biome: "Estuário e Manguezal da Baía de Paranaguá",

    ecoTip:
      "Respeite as áreas residenciais, os pescadores e os ambientes naturais da comunidade.",

    preservationStatus: "Comunidade Tradicional Caiçara",

    source:
      "Prefeitura de Pontal do Paraná — Comunidade do Maciel / Ilha do Maciel",

    imageCredit: "Wikimedia Commons — CC BY-SA 4.0",
  },

  // ============================================================
  // HISTÓRIA
  // ============================================================

  {
    id: "sambaqui-guaraguacu",
    name: "Sambaqui do Guaraguaçu",
    category: "História",
    city: "Pontal do Paraná",
    lat: -25.6655,
    lng: -48.5135,
    altitudeM: 15,

    startDate: "Aproximadamente 2.270 a.C.",
    endDate: "Tombado em 1982",

    address:
      "Região do Rio Guaraguaçu, acesso pela Estrada Ecológica, Pontal do Paraná – PR",

    shortDesc:
      "Importante sítio arqueológico que registra a ocupação humana pré-histórica do litoral paranaense.",

    description:
      "O Sambaqui do Guaraguaçu é um importante sítio arqueológico localizado no município de Pontal do Paraná. O local é formado por vestígios de antigas populações que habitaram o litoral paranaense há milhares de anos. Os sambaquis são estruturas formadas pelo acúmulo de conchas, restos de animais, peixes e outros materiais utilizados pelas populações que viveram na região. O sítio possui grande importância histórica, arqueológica e cultural e foi tombado pelo Estado do Paraná em 1982.",

    image: "/images/sambaqui-guaraguacu.jpg",

    gallery: ["/images/sambaqui-guaraguacu.jpg"],

    rating: 4.8,

    highlights: [
      "Datação aproximada de 2.270 a.C.",
      "Tombamento em 1982",
      "Sítio arqueológico",
      "Ocupação humana pré-histórica",
      "Patrimônio cultural do Paraná",
    ],

    hours: "Visitação conforme regras do sítio",

    tip: "Não retire, movimente ou recolha qualquer material arqueológico.",

    biome: "Patrimônio Arqueológico e Mata Atlântica",

    ecoTip: "É proibido escavar ou retirar materiais do sítio arqueológico.",

    preservationStatus: "Sítio Arqueológico Tombado pelo Estado do Paraná",

    source: "Governo do Estado do Paraná / Patrimônio Cultural",

    imageCredit: "Patrimônio Cultural do Paraná — CC BY 4.0",
  },

  {
    id: "rio-guaraguacu",
    name: "Rio Guaraguaçu",
    category: "Natureza",
    city: "Pontal do Paraná",
    lat: -25.662,
    lng: -48.508,
    altitudeM: 8,

    address: "Bacia Hidrográfica do Rio Guaraguaçu, Pontal do Paraná – PR",

    shortDesc:
      "Um dos principais rios de Pontal do Paraná, cercado por Mata Atlântica, manguezais e áreas de importância histórica.",

    description:
      "O Rio Guaraguaçu é um dos principais rios de Pontal do Paraná e possui grande importância ambiental, histórica e cultural. Suas margens apresentam áreas de Mata Atlântica, manguezais e locais relacionados à ocupação humana antiga. A região também é utilizada para passeios de barco, observação da natureza e outras atividades de turismo.",

    image: "/images/rio-guaraguaçu.jpg",

    gallery: ["/images/rio-guaraguaçu.jpg"],

    rating: 4.7,

    highlights: [
      "Mata Atlântica",
      "Manguezais",
      "Passeios de barco",
      "Observação da natureza",
      "Ligação com o Sambaqui do Guaraguaçu",
    ],

    hours: "Atividades náuticas durante o dia",

    tip: "Prefira passeios conduzidos por operadores locais que conheçam a região.",

    biome: "Bacia Fluvial Estuarina e Manguezal",

    ecoTip: "Não jogue resíduos no rio e mantenha distância da fauna.",

    preservationStatus: "Área de Preservação Permanente de Recursos Hídricos",

    source: "Prefeitura de Pontal do Paraná / Viaje Paraná",

    imageCredit: "Wikimedia Commons — CC BY-SA 4.0",
  },

  {
    id: "emancipacao-pontal",
    name: "Emancipação de Pontal do Paraná",
    category: "História",
    city: "Pontal do Paraná",
    lat: -25.5786,
    lng: -48.3755,
    altitudeM: 6,

    startDate: "20/12/1995",
    endDate: "01/01/1997",

    address: "Pontal do Paraná – PR, Brasil",

    shortDesc:
      "Marco histórico da criação do município de Pontal do Paraná, desmembrado de Paranaguá.",

    description:
      "Pontal do Paraná fazia parte do município de Paranaguá antes de sua emancipação. O movimento para a criação de um novo município ganhou força durante as décadas de 1980 e 1990. A emancipação foi estabelecida pela Lei Estadual nº 11.252, de 20 de dezembro de 1995, e o município foi oficialmente instalado em 1º de janeiro de 1997.",

    image: "/images/emancipacao-de-pontal-do-parana.jpg",

    gallery: ["/images/emancipacao-de-pontal-do-parana.jpg"],

    rating: 4.6,

    highlights: [
      "Lei Estadual nº 11.252",
      "Criação em 20/12/1995",
      "Instalação em 01/01/1997",
      "Desmembramento de Paranaguá",
      "História municipal",
    ],

    hours: "Patrimônio histórico / acesso público",

    tip: "Conheça também outros pontos históricos e comunidades tradicionais do município.",

    biome: "Área Urbana e Costeira",

    preservationStatus: "Patrimônio Cívico e Histórico Municipal",

    source:
      "Governo do Estado do Paraná / Prefeitura Municipal de Pontal do Paraná",

    imageCredit: "Prefeitura Municipal de Pontal do Paraná / Wikimedia Commons",
  },

  {
    id: "praia-leste",
    name: "Praia de Leste",
    category: "Praias",
    city: "Pontal do Paraná",
    lat: -25.5792,
    lng: -48.3783,

    shortDesc:
      "Um dos balneários mais conhecidos de Pontal do Paraná, com extensa faixa de areia.",

    description:
      "Praia de Leste é um dos balneários tradicionais de Pontal do Paraná. A região possui extensa faixa de areia e infraestrutura turística, sendo também a área costeira mais próxima das Ilhas dos Currais.",

    image:
      "/images/praia-de-leste.jpg",

    gallery: [
      "/images/praia-de-leste.jpg",
    ],

    rating: 4.5,

    highlights: [
      "Extensa faixa de areia",
      "Balneário tradicional",
      "Infraestrutura turística",
      "Proximidade das Ilhas dos Currais",
    ],

    hours: "Aberta 24h",

    tip: "Confira as condições de balneabilidade antes de entrar no mar.",

    biome: "Restinga e Zona Costeira",

    ecoTip: "Não deixe lixo na areia e evite áreas de vegetação de restinga.",

    preservationStatus: "Área de Monitoramento Ambiental Costeiro",

    source: "Prefeitura Municipal de Pontal do Paraná",

    imageCredit: "Wikimedia Commons — CC BY-SA 4.0",
  },

  // ============================================================
  // OUTROS BALNEÁRIOS DE PONTAL DO PARANÁ
  // ============================================================

  {
    id: "praia-ipanema",
    name: "Praia Ipanema",
    category: "Praias",
    city: "Pontal do Paraná",
    lat: -25.5412,
    lng: -48.4023,

    shortDesc:
      "Balneário tradicional de Pontal do Paraná com praia, comércio e ambiente residencial.",

    description:
      "Ipanema é um dos balneários de Pontal do Paraná. A região combina áreas residenciais, comércio local e acesso à praia.",

    image: "/images/praia-ipanema.jpg",

    gallery: ["/images/praia-ipanema.jpg"],

    rating: 4.3,

    highlights: [
      "Praia",
      "Comércio local",
      "Ambiente residencial",
      "Turismo de verão",
    ],

    hours: "Aberta 24h",

    tip: "Prefira os horários de menor movimento para aproveitar a orla com mais tranquilidade.",

    biome: "Restinga Litorânea",

    ecoTip: "Evite pisar na vegetação de restinga.",

    preservationStatus: "Monitoramento de Balneabilidade",

    source: "Prefeitura Municipal de Pontal do Paraná",

    imageCredit: "Wikimedia Commons — CC BY-SA 4.0",
  },

  {
    id: "shangrila",
    name: "Shangri-lá",
    category: "Praias",
    city: "Pontal do Paraná",
    lat: -25.558,
    lng: -48.393,

    shortDesc:
      "Balneário de Pontal do Paraná com praias e áreas residenciais próximas à natureza.",

    description:
      "Shangri-lá é um dos balneários tradicionais de Pontal do Paraná, reunindo áreas residenciais, comércio local e acesso à faixa costeira.",

    image: "/images/shangri-la-pontal-do-parana.jpg",

    gallery: ["/images/shangri-la-pontal-do-parana.jpg"],

    rating: 4.5,

    highlights: [
      "Praia",
      "Área residencial",
      "Vegetação costeira",
      "Turismo de verão",
    ],

    hours: "Aberta 24h",

    tip: "Caminhe pela orla respeitando a vegetação de restinga.",

    biome: "Faixa de Restinga",

    ecoTip: "Não transite com veículos sobre as dunas ou vegetação.",

    preservationStatus: "Área Costeira",

    source: "Prefeitura Municipal de Pontal do Paraná",

    imageCredit: "Wikimedia Commons — CC BY-SA 4.0",
  },

  {
    id: "terminal-embarque",
    name: "Terminal de Embarque — Ponta do Poço",
    category: "Passeios",
    city: "Pontal do Paraná",
    lat: -25.5715,
    lng: -48.3485,

    shortDesc:
      "Região de embarque náutico utilizada para deslocamentos e passeios pelo litoral paranaense.",

    description:
      "A região de Ponta do Poço possui importância para o transporte e atividades náuticas do litoral de Pontal do Paraná, incluindo deslocamentos em direção à Ilha do Mel e outras áreas da Baía de Paranaguá.",

    image: "/images/terminal-de-embarque-ponta-do-poco.jpg",

    gallery: ["/images/terminal-de-embarque-ponta-do-poco.jpg"],

    rating: 4.4,

    highlights: [
      "Transporte náutico",
      "Ilha do Mel",
      "Baía de Paranaguá",
      "Atividades turísticas",
    ],

    hours: "Conforme horários das embarcações",

    tip: "Confirme horários e pontos oficiais de embarque antes da viagem.",

    biome: "Canal Marítimo da Baía",

    ecoTip: "Utilize operadores e embarcações autorizados.",

    source: "Prefeitura de Pontal do Paraná",

    imageCredit: "Wikimedia Commons — CC BY-SA 4.0",
  },

  {
    id: "saint-hilaire-lange",
    name: "Parque Nacional Saint-Hilaire/Lange",
    category: "Natureza",
    city: "Pontal do Paraná",
    lat: -25.512,
    lng: -48.5,

    shortDesc:
      "Unidade de conservação que protege importantes áreas de Mata Atlântica da Serra do Mar.",

    description:
      "O Parque Nacional de Saint-Hilaire/Lange protege uma importante área de Mata Atlântica na Serra do Mar paranaense, contribuindo para a conservação da biodiversidade e dos recursos naturais da região.",

    image: "/images/parque-nacional-saint-hilaire-lange.jpg",

    gallery: ["/images/parque-nacional-saint-hilaire-lange.jpg"],

    rating: 4.8,

    highlights: [
      "Mata Atlântica",
      "Serra do Mar",
      "Biodiversidade",
      "Unidade de conservação",
    ],

    hours: "Conforme regras de visitação do ICMBio",

    tip: "Verifique previamente quais trilhas e áreas estão abertas à visitação.",

    biome: "Floresta Ombrófila Densa",

    ecoTip:
      "Siga as regras da unidade de conservação e não retire elementos da natureza.",

    preservationStatus: "Unidade de Conservação de Proteção Integral",

    source: "ICMBio",

    imageCredit: "ICMBio / Wikimedia Commons",
  },

  // ============================================================
  // PARANAGUÁ
  // ============================================================

  {
    id: "centro-historico",
    name: "Centro Histórico de Paranaguá",
    category: "História",
    city: "Paranaguá",
    lat: -25.519,
    lng: -48.5097,

    shortDesc:
      "Conjunto histórico de Paranaguá com casario colonial, igrejas e patrimônio cultural.",

    description:
      "O Centro Histórico de Paranaguá reúne construções históricas, igrejas, sobrados e espaços públicos ligados à formação histórica da cidade.",

    image: "/images/centro-historico-de-paranagua.jpg",

    gallery: ["/images/centro-historico-de-paranagua.jpg"],

    rating: 4.8,

    highlights: [
      "Arquitetura colonial",
      "Patrimônio histórico",
      "Igrejas históricas",
      "Centro urbano antigo",
    ],

    tip: "Explore o centro a pé para observar os detalhes arquitetônicos dos casarões.",

    biome: "Área Urbana Histórica Estuarina",

    preservationStatus: "Patrimônio Histórico",

    source: "IPHAN / Prefeitura Municipal de Paranaguá",

    imageCredit: "Wikimedia Commons",
  },

  {
    id: "rua-da-praia",
    name: "Rua da Praia (Rua General Carneiro)",
    category: "Cultura",
    city: "Paranaguá",
    lat: -25.5176,
    lng: -48.508,

    shortDesc:
      "Área histórica junto ao Rio Itiberê com gastronomia, cultura e arquitetura tradicional.",

    description:
      "A Rua da Praia é uma das áreas mais conhecidas do centro histórico de Paranaguá, localizada junto ao Rio Itiberê e cercada por construções históricas e estabelecimentos comerciais.",

    image: "/images/rua-da-praia-paranagua.jpg",

    gallery: ["/images/rua-da-praia-paranagua.jpg"],

    rating: 4.5,

    highlights: [
      "Rio Itiberê",
      "Centro histórico",
      "Gastronomia",
      "Cultura caiçara",
    ],

    tip: "Visite no final da tarde para aproveitar a paisagem do Rio Itiberê.",

    biome: "Margem Estuarina do Rio Itiberê",

    ecoTip: "Valorize o comércio e os produtores culturais locais.",

    source:
      "Prefeitura Municipal de Paranaguá / Secretaria de Cultura e Turismo",

    imageCredit: "Wikimedia Commons — CC BY-SA 4.0",
  },

  {
    id: "mercado-cafe",
    name: "Mercado Municipal do Café e Pescados",
    category: "Gastronomia",
    city: "Paranaguá",
    lat: -25.5209,
    lng: -48.50629,
    altitudeM: 0.5,

    startDate: "Início do século XIX",

    address: "Rua General Carneiro, 139, Centro Histórico, Paranaguá – PR",

    shortDesc:
      "Mercado histórico ligado à gastronomia e à atividade comercial de Paranaguá.",

    description:
      "O Mercado Municipal do Café é um espaço tradicional de Paranaguá ligado à comercialização de alimentos e à gastronomia local.",

    image: "/images/mercado-municipal-do-cafe.jpg",

    gallery: ["/images/mercado-municipal-do-cafe.jpg"],

    rating: 4.7,

    highlights: [
      "Mercado histórico",
      "Gastronomia local",
      "Pescados",
      "Centro histórico",
    ],

    hours: "Conforme funcionamento do mercado",

    tip: "Aproveite para conhecer também os demais pontos históricos do centro.",

    biome: "Estuário de Pesca",

    source: "Prefeitura Municipal de Paranaguá",

    imageCredit: "Wikimedia Commons",
  },

  {
    id: "santuario-rocio",
    name: "Santuário Estadual de N. Sra. do Rocio",
    category: "Cultura",
    city: "Paranaguá",
    lat: -25.50664,
    lng: -48.53085,
    altitudeM: 5,

    startDate: "1813",

    address: "Praça Padre Thomaz Sheehan, 211, Rocio, Paranaguá – PR",

    shortDesc:
      "Importante santuário religioso do Paraná localizado no bairro Rocio, em Paranaguá.",

    description:
      "O Santuário de Nossa Senhora do Rocio é um importante espaço religioso e cultural de Paranaguá, ligado à tradição da devoção à padroeira do Paraná.",

    image: "/images/santuario-estadual.jpg",

    gallery: ["/images/santuario-estadual.jpg"],

    rating: 4.8,

    highlights: [
      "Patrimônio religioso",
      "Nossa Senhora do Rocio",
      "Festa do Rocio",
      "História de Paranaguá",
    ],

    hours: "Consulte os horários oficiais do Santuário",

    tip: "Durante a Festa do Rocio, consulte previamente a programação e os horários.",

    biome: "Área Urbana Costeira",

    source: "Santuário Estadual do Rocio / Mitra Diocesana",

    imageCredit: "Wikimedia Commons",
  },

  {
    id: "estacao-ferroviaria",
    name: "Estação Ferroviária de Paranaguá",
    category: "História",
    city: "Paranaguá",
    lat: -25.51674,
    lng: -48.50645,
    altitudeM: 5,

    address:
      "Avenida Maximiliano da Fonseca / Praça Almirante Tamandaré, Paranaguá – PR",

    shortDesc:
      "Estação histórica ligada à Estrada de Ferro Paranaguá–Curitiba.",

    description:
      "A Estação Ferroviária de Paranaguá está ligada à história ferroviária do Paraná e à Estrada de Ferro Paranaguá–Curitiba, importante ligação entre o litoral e o planalto paranaense.",

    image: "/images/estacao-ferroviaria-de-paranagua.jpg",

    gallery: ["/images/estacao-ferroviaria-de-paranagua.jpg"],

    rating: 4.6,

    highlights: [
      "Estrada de Ferro Paranaguá–Curitiba",
      "História ferroviária",
      "Arquitetura histórica",
      "Patrimônio cultural",
    ],

    hours: "Área externa",

    tip: "Combine a visita com outros pontos históricos do centro de Paranaguá.",

    biome: "Transição Serra do Mar e Planície Litorânea",

    source: "Patrimônio Cultural do Paraná",

    imageCredit: "Wikimedia Commons",
  },

  {
    id: "museu-arqueologia",
    name: "Museu de Arqueologia e Etnologia (MAE/UFPR)",
    category: "História",
    city: "Paranaguá",
    lat: -25.5209,
    lng: -48.5069,
    altitudeM: 5,

    address: "Rua XV de Novembro, 575, Centro Histórico, Paranaguá – PR",

    shortDesc:
      "Museu da UFPR dedicado à arqueologia e etnologia, instalado em edifício histórico.",

    description:
      "O Museu de Arqueologia e Etnologia da UFPR possui acervo relacionado à arqueologia e às cultures tradicionais do litoral paranaense, instalado em um edifício histórico no centro de Paranaguá.",

    image: "/images/museu-de-arqueologia-e-etnologia.jpg",

    gallery: ["/images/museu-de-arqueologia-e-etnologia.jpg"],

    rating: 4.7,

    highlights: ["Arqueologia", "Etnologia", "UFPR", "Patrimônio histórico"],

    hours: "Consulte os horários oficiais do MAE/UFPR",

    tip: "Confira previamente a programação de exposições e atividades educativas.",

    biome: "Patrimônio Arqueológico e Histórico",

    preservationStatus: "Museu da Universidade Federal do Paraná",

    source: "Universidade Federal do Paraná — MAE",

    imageCredit: "Wikimedia Commons / UFPR",
  },

  {
    id: "aquario-paranagua",
    name: "Aquário Marinho de Paranaguá",
    category: "Natureza",
    city: "Paranaguá",
    lat: -25.52296,
    lng: -48.50644,
    altitudeM: 4,

    address: "Rua João Régis, s/nº, Centro Histórico, Paranaguá – PR",

    shortDesc:
      "Espaço de educação ambiental dedicado à fauna marinha e estuarina.",

    description:
      "O Aquário Marinho de Paranaguá é voltado à educação ambiental e à apresentação de espécies relacionadas aos ambientes marinhos e estuarinos do litoral paranaense.",

    image: "/images/aquario-de-paranagua.jpg",

    gallery: ["/images/aquario-de-paranagua.jpg"],

    rating: 4.4,

    highlights: [
      "Educação ambiental",
      "Fauna marinha",
      "Ecossistemas estuarinos",
      "Atividade para famílias",
    ],

    hours: "Consulte os horários oficiais do Aquário",

    tip: "Verifique previamente os horários de funcionamento.",

    biome: "Ecossistemas Marinho e Estuarino",

    source:
      "Aquário Marinho de Paranaguá / fotos de visitantes via Tripadvisor",

    imageCredit: "Fotos de visitantes — Tripadvisor",
  },

  {
    id: "estacao-mall",
    name: "Estação Mall",
    category: "Gastronomia",
    city: "Paranaguá",
    lat: -25.51563,
    lng: -48.50698,
    altitudeM: 5,

    address: "Rua João Eugênio, 711, Costeira, Paranaguá – PR",

    shortDesc:
      "Centro comercial próximo à região histórica e à Estação Ferroviária de Paranaguá.",

    description:
      "Centro comercial localizado na região da Estação Ferroviária de Paranaguá, reunindo lojas, alimentação e serviços.",

    image: "/images/estacao-mall-paranagua.jpg",

    gallery: ["/images/estacao-mall-paranagua.jpg"],

    rating: 4.2,

    highlights: ["Lojas", "Alimentação", "Serviços", "Próximo à estação"],

    source: "Fotos de visitantes via Tripadvisor",

    imageCredit: "Fotos de visitantes — Tripadvisor",
  },

  {
    id: "antiga-alfandega",
    name: "Antiga Alfândega de Paranaguá",
    category: "História",
    city: "Paranaguá",
    lat: -25.5103,
    lng: -48.5103,
    altitudeM: 5,

    address: "Praça Ubaldino do Amaral / região do cais, Paranaguá – PR",

    shortDesc:
      "Edificação histórica ligada à atividade portuária e comercial de Paranaguá.",

    description:
      "A antiga Alfândega está ligada à história portuária e comercial de Paranaguá, refletindo a importância histórica do porto para o desenvolvimento da cidade.",

    image: "/images/antiga-alfandega-de-paranagua.jpg",

    gallery: ["/images/antiga-alfandega-de-paranagua.jpg"],

    rating: 4.5,

    highlights: [
      "História portuária",
      "Patrimônio histórico",
      "Região do cais",
      "Comércio marítimo",
    ],

    source:
      "iPatrimônio (CC BY 4.0) / CPC — Coordenação do Patrimônio Cultural do Paraná",

    imageCredit:
      "CPC / Prefeitura Municipal de Paranaguá — via iPatrimônio (CC BY 4.0)",
  },

  {
    id: "palacio-mathias-bohn",
    name: "Palácio Mathias Böhn",
    category: "História",
    city: "Paranaguá",
    lat: -25.520124,
    lng: -48.505084,
    altitudeM: 6,

    address: "Rua General Carneiro, 258, Centro Histórico, Paranaguá – PR",

    shortDesc:
      "Palacete histórico localizado no Centro Histórico de Paranaguá.",

    description:
      "O Palácio Mathias Böhn integra o conjunto de edificações históricas do centro de Paranaguá e possui importância para a memória arquitetônica e urbana da cidade.",

    image: "/images/palacio-mathias-bohn.jpg",

    gallery: ["/images/palacio-mathias-bohn.jpg"],

    rating: 4.4,

    highlights: [
      "Palacete histórico",
      "Centro Histórico",
      "Arquitetura",
      "Patrimônio cultural",
    ],

    source: "Fotos de visitantes via Tripadvisor",

    imageCredit: "Fotos de visitantes — Tripadvisor",
  },

  {
    id: "fazenda-morro-holandes",
    name: "Fazenda Morro Holandês",
    category: "Natureza",
    city: "Paranaguá",
    lat: -25.567721,
    lng: -48.6156003,
    altitudeM: 40,

    address: "Rodovia PR-508, km 7, Colônia Maria Luiza, Paranaguá – PR",

    shortDesc:
      "Propriedade rural de agricultura familiar com paisagens da região de Paranaguá.",

    description:
      "Propriedade rural localizada na Colônia Maria Luiza, ligada à agricultura familiar e ao turismo rural.",

    image: "/images/fazenda-morro-holandes.jpg",

    gallery: ["/images/fazenda-morro-holandes.jpg"],

    rating: 4.6,

    highlights: [
      "Agricultura familiar",
      "Turismo rural",
      "Paisagem rural",
      "Colônia Maria Luiza",
    ],

    source: "Turismo Rural de Paranaguá",

    imageCredit: "Wikimedia Commons — CC BY-SA 4.0",
  },

  {
    id: "palacio-visconde-nacar",
    name: "Palácio Visconde de Nácar",
    category: "História",
    city: "Paranaguá",
    lat: -25.5207,
    lng: -48.5078,
    altitudeM: 6,

    address: "Rua Visconde de Nácar, 33, Centro Histórico, Paranaguá – PR",

    shortDesc:
      "Palacete histórico de arquitetura neoclássica no Centro Histórico de Paranaguá.",

    description:
      "O Palácio Visconde de Nácar é uma importante construção histórica do centro de Paranaguá, ligada à história política e social da cidade.",

    image: "/images/palacio-visconde-de-nacar.jpg",

    gallery: ["/images/palacio-visconde-de-nacar.jpg"],

    rating: 4.6,

    highlights: [
      "Arquitetura neoclássica",
      "Centro Histórico",
      "Construção histórica",
      "Patrimônio cultural",
    ],

    source: "Patrimônio Cultural do Paraná",

    imageCredit: "Wikimedia Commons",
  },

  {
    id: "instituto-historico-geografico",
    name: "Instituto Histórico Geográfico de Paranaguá",
    category: "História",
    city: "Paranaguá",
    lat: -25.521646,
    lng: -48.507314,
    altitudeM: 6,

    address: "Rua XV de Novembro, 621, Centro Histórico, Paranaguá – PR",

    shortDesc:
      "Instituição dedicada à preservação da memória histórica e documental de Paranaguá.",

    description:
      "O Instituto Histórico e Geográfico de Paranaguá preserva documentos, objetos e registros relacionados à história da cidade e do litoral paranaense.",

    image: "/images/Instituto-Histórico-Geográfico.png",

    gallery: ["/images/Instituto-Histórico-Geográfico.png"],

    rating: 4.6,

    highlights: [
      "Acervo histórico",
      "Documentos",
      "Memória local",
      "História de Paranaguá",
    ],

    source:
      "Instituto Histórico e Geográfico de Paranaguá / fotos de visitantes via Tripadvisor",

    imageCredit: "Fotos de visitantes — Tripadvisor",
  },

  {
    id: "mercado-nilton-abel-lima",
    name: "Mercado Municipal Nilton Abel de Lima",
    category: "Gastronomia",
    city: "Paranaguá",
    lat: -25.52429,
    lng: -48.50686,
    altitudeM: 4,

    address: "Rua João Régis, s/nº, Centro Histórico, Paranaguá – PR",

    shortDesc:
      "Mercado municipal com produtos locais, artesanato e gastronomia.",

    description:
      "Mercado municipal de Paranaguá que reúne comércio de produtos locais, artesanato, alimentos e serviços.",

    image: "/images/mercado-municipal-nilton-abel-de-lima.jpg",

    gallery: ["/images/mercado-municipal-nilton-abel-de-lima.jpg"],

    rating: 4.4,

    highlights: [
      "Artesanato",
      "Produtos locais",
      "Gastronomia",
      "Comércio tradicional",
    ],

    source: "Prefeitura Municipal de Paranaguá",

    imageCredit: "Wikimedia Commons — CC BY-SA 4.0",
  },

  // ============================================================
  // ILHA DO MEL
  // ============================================================

  {
    id: "fortaleza-prazeres",
    name: "Fortaleza de Nossa Senhora dos Prazeres",
    category: "História",
    city: "Ilha do Mel",
    lat: -25.51056,
    lng: -48.31131,
    altitudeM: 5,

    startDate: "1767",
    endDate: "1769",

    address: "Praia da Fortaleza, Ilha do Mel, Paraná – Brasil",

    shortDesc:
      "Fortificação colonial construída para proteger a entrada da Baía de Paranaguá.",

    description:
      "A Fortaleza de Nossa Senhora dos Prazeres é uma fortificação histórica localizada na Ilha do Mel. Sua construção começou no século XVIII e está relacionada à defesa da entrada da Baía de Paranaguá.",

    image: "/images/fortaleza-de-nossa-senhora-dos-prazeres.jpg",

    gallery: ["/images/fortaleza-de-nossa-senhora-dos-prazeres.jpg"],

    rating: 4.9,

    highlights: [
      "Fortificação colonial",
      "Ilha do Mel",
      "História militar",
      "Vista para a baía",
    ],

    source: "IPHAN / Patrimônio Histórico Nacional",

    imageCredit: "Wikimedia Commons",
  },

  {
    id: "ilha-mel-passeio",
    name: "Ilha do Mel — Farol e Encantadas",
    category: "Ilhas",
    city: "Ilha do Mel",
    lat: -25.53909,
    lng: -48.29085,
    altitudeM: 90,

    startDate: "1872",

    address: "Ilha do Mel, Paranaguá – PR",

    shortDesc:
      "Destino natural do litoral paranaense conhecido pelo Farol das Conchas, praias e trilhas.",

    description:
      "A Ilha do Mel é um dos principais destinos turísticos do litoral do Paraná. A ilha reúne praias, trilhas, áreas de Mata Atlântica, o Farol das Conchas e a Fortaleza de Nossa Senhora dos Prazeres.",

    image: "/images/Ilha-do-mel-paranagua.jpg",

    gallery: ["/images/Ilha-do-mel-paranagua.jpg"],

    rating: 4.9,

    highlights: [
      "Farol das Conchas",
      "Praias",
      "Trilhas",
      "Mata Atlântica",
      "Fortaleza histórica",
    ],

    tip: "Planeje o passeio de acordo com os horários das embarcações e condições climáticas.",

    biome: "Restinga e Mata Atlântica Insular",

    ecoTip: "Leve seu lixo de volta e permaneça nas trilhas demarcadas.",

    preservationStatus: "Unidades de conservação estaduais",

    source: "Instituto Água e Terra / Viaje Paraná",

    imageCredit: "Wikimedia Commons",
  },

  {
    id: "gruta-encantadas",
    name: "Gruta das Encantadas",
    category: "Ilhas",
    city: "Ilha do Mel",
    lat: -25.573,
    lng: -48.31,

    shortDesc:
      "Formação rochosa natural localizada na Ilha do Mel, associada às lendas tradicionais da região.",

    description:
      "A Gruta das Encantadas é uma formação rochosa localizada na Ilha do Mel. O local está associado às lendas tradicionais da ilha e pode ser visitado conforme as condições de maré e acesso.",

    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ilha_do_Mel_-_Gruta_das_Encantadas.jpg",

    gallery: [
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ilha_do_Mel_-_Gruta_das_Encantadas.jpg",
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ilha_do_Mel_-_Gruta.jpg",
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ilha_do_Mel_-_Morro_da_Gruta_das_Encantadas.jpg",
    ],

    rating: 4.8,

    highlights: [
      "Formação rochosa",
      "Ilha do Mel",
      "Lendas tradicionais",
      "Paisagem costeira",
    ],

    hours: "Visitação condicionada às condições de maré e acesso",

    tip: "Verifique a maré antes de visitar a formação rochosa.",

    biome: "Costão Rochoso e Marinho",

    ecoTip: "Não suba em áreas frágeis da formação rochosa e não deixe lixo.",

    source:
      "Instituto Água e Terra / Wikimedia Commons — categoria Parque Estadual da Ilha do Mel",

    imageCredit: "Wikimedia Commons — Parque Estadual da Ilha do Mel",
  },

  {
    id: "ilha-pecas",
    name: "Vila das Peças e Baía dos Golfinhos",
    category: "Passeios",
    city: "Paranaguá",
    lat: -25.461,
    lng: -48.336,

    shortDesc:
      "Comunidade tradicional e área estuarina com paisagens naturais e possibilidade de observação de botos.",

    description:
      "A Ilha das Peças integra o complexo estuarino do litoral paranaense e possui comunidade tradicional, áreas de manguezal e ambientes naturais de grande importância.",

    image: "/images/Ilha-das-pecas-Barcos.jpg",

    gallery: ["/images/Ilha-das-pecas-Barcos.jpg"],

    rating: 4.8,

    highlights: [
      "Comunidade tradicional",
      "Manguezais",
      "Passeios náuticos",
      "Observação da natureza",
    ],

    tip: "Prefira operadores locais que conheçam as regras ambientais da região.",

    biome: "Manguezal e Complexo Estuarino",

    ecoTip:
      "Mantenha distância dos animais e não tente atraí-los para perto das embarcações.",

    preservationStatus: "Área protegida do complexo estuarino",

    source: "ICMBio / Parque Nacional do Superagui",

    imageCredit: "Me Leva Viajar — Acervo Local",
  },
];
