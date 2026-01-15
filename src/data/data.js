export const profileData = {
  meta: {
    locale: "pt-BR",
    updatedAt: "2026-01-15",
  },

  hero: {
    name: "Pedro Henrique Diógenes da Fonseca",
    role: "Experiência com Full-Stack",
    location: "ITA",
    headline:
      "Estudante do 4º ano de Engenharia de Computação no ITA, com formatura prevista para 2027  —  1 ano de experiência no desenvolvimento de produtos web com foco em UX/UI, com atuação também no backend, incluindo modelagem e uso de bancos de dados relacionais com PostgreSQL.",
    ctas: {
      primary: { label: "Ver projetos", to: "projects" }, // id da section
      secondary: { label: "Contato", href: "mailto:seuemail@exemplo.com" },
    },
    highlights: [
      { label: "React + Vite", value: "Front-end" },
      { label: "Node / Supabase", value: "Back-end" },
      { label: "RLS / RPC", value: "Segurança" },
      { label: "UI/UX", value: "Interface" },
    ],
  },

  links: {
    email: "mailto:phdffonseca@gmail.com",
    github: "https://github.com/Pedro-Fonseca10",
    wpp: "https://wa.me/5583996630540",
  },

  about: {
    title: "Sobre",
    paragraphs: [
      "Tenho 21 anos, inglês em nível B2 próximo a C1 e francês em A2. Nasci em Natal/RN, mas morei em João Pessoa/PB até os 18 anos.",
      "Sou um desenvolvedor focado em criar experiências fluidas e interfaces limpas, com arquitetura sólida e boa engenharia.",
      "Gosto de trabalhar com produtos completos: autenticação, dados, design system, performance, SEO e deploy. Há também a necessidade de reforçar que sou adepto do uso dos XaaS - everything as a service, como exemplo de experiência pessoal há: supabase e vercel.",
    ],
    expectations: [
      "Construção de design moderno e UX/UI user-friendly",
      "Entendimento de fluxos completos (auth, dados, deploy)",
      "Performance e consistência",
      "Vontade de construir",
    ],
    preferredStack: ["React", "Vite", "Supabase", "PostgreSQL", "Node.js"],
  },

  skills: {
    title: "Stacks",
    groups: [
      {
        group: "Front-end",
        items: ["React", "Vite", "CSS", "Acessibilidade", "Responsivo"],
      },
      {
        group: "Back-end",
        items: ["Node.js", "APIs", "Supabase", "PostgreSQL", "RLS", "RPC"],
      },
      {
        group: "Produto",
        items: ["UI/UX", "Copywriting", "Métricas"],
      },
    ],
  },

  projects: {
    title: "Projetos",
    items: [
      {
        title: "Landing Page Editor",
        description:
          "Um editor de landing pages voltado à prototipação, desenvolvido para que a empresa júnior do ITA apresente propostas de sites aos seus clientes. A plataforma é inspirada no Wix - finalizado.",
        tags: ["React/Vite", "CSS-tailwind"],

        metrics: [
          { label: "Foco", value: "UX" },
          { label: "Stack", value: "Front" },
        ],
      },
      {
        title: "Venus Club",
        description:
          "Site de anúncio com foco em segurança, confiabilidade e qualidade - em desenvolvimento.",
        tags: ["React/Vite", "Supabase"],

        metrics: [
          { label: "Foco", value: "Segurança" },
          { label: "Stack", value: "Full-stack" },
        ],
      },
      {
        title: "Bots no Telegram",
        description:
          "Automatização de vendas no X1 por meio de bots no telegram, no objetivo de alcançar escalabilidade - finalizado.",
        tags: ["CopyWriting", "Negócios"],

        metrics: [
          { label: "Foco", value: "Negócios" },
          { label: "Stack", value: "Automatização" },
        ],
      },
    ],
  },

  timeline: {
    title: "Linha do tempo",
    items: [
      {
        when: "2025",
        title: "Projetos Full-Stack",
        description:
          "Imersão prática no desenvolvimento de produtos web completos, atuando desde a concepção da experiência do usuário (UX/UI) até a implementação do backend. Envolvimento com arquitetura de aplicações, integração de APIs, modelagem de dados e preocupação com usabilidade, desempenho e escalabilidade.",
      },
      {
        when: "2024",
        title: "Desenvolvimento em Programação",
        description:
          "Aprofundamento em estruturas de dados e algoritmos em C++, com foco na resolução de problemas de maior complexidade. Implementação e análise de algoritmos clássicos como Dijkstra e Prim, além de buscas em grafos, heaps e técnicas fundamentais para otimização e eficiência computacional.",
      },
      {
        when: "2023",
        title: "Ingresso no ITA",
        description:
          "Aprovação no vestibular do ITA e início da graduação em Engenharia de Computação. Primeiro contato formal com a programação por meio da linguagem C, resolvendo problemas clássicos e desenvolvendo a base lógica e algorítmica que sustentaria os estudos posteriores em computação.",
      },
    ],
  },

  contact: {
    title: "Contato",
    subtitle:
      "Quer que eu adapte este currículo para uma vaga específica ou inclua mais projetos?",
    actions: [
      {
        label: "Enviar email",
        href: "mailto:seuemail@exemplo.com",
        variant: "primary",
      },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/seu-perfil" },
      { label: "GitHub", href: "https://github.com/seu-usuario" },
    ],
    footerNote: "© 2026 Pedro Henrique Diógenes da Fonseca",
  },
};
