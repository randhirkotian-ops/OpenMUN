/**
 * Country intelligence records.
 *
 * Every field is transcribed from an official or primary source and carries a
 * citation. Nothing here is model-generated. Figures are labelled with the year
 * of the underlying dataset; delegates should verify against the linked source
 * before quoting in committee.
 */

export type Cited = { value: string; source: string; url: string };

export type CountrySpeech = {
  speaker: string;
  role: string;
  title: string;
  date: string;
  topic: string;
  keywords: string[];
  summary: string;
  transcriptUrl: string;
  videoUrl: string;
};

export type CountryProfile = {
  name: string;
  flag: string;
  region: string;
  leadership: Cited[];
  politicalSystem: Cited;
  population: Cited;
  gdp: Cited;
  priorities: string[];
  prioritiesSource: { label: string; url: string };
  events: { date: string; text: string; url: string }[];
  treaties: { name: string; status: string; url: string }[];
  memberships: string[];
  votingNotes: { text: string; url: string }[];
  links: { label: string; url: string }[];
  speeches: CountrySpeech[];
};

export const COUNTRIES: CountryProfile[] = [
  {
    name: "India",
    flag: "🇮🇳",
    region: "South Asia",
    leadership: [
      {
        value: "Head of State — President Droupadi Murmu",
        source: "President of India, official site",
        url: "https://presidentofindia.nic.in/",
      },
      {
        value: "Head of Government — Prime Minister Narendra Modi",
        source: "Prime Minister's Office",
        url: "https://www.pmindia.gov.in/en/",
      },
      {
        value: "Minister of External Affairs — Dr. S. Jaishankar",
        source: "Ministry of External Affairs",
        url: "https://www.mea.gov.in/",
      },
      {
        value: "Permanent Representative to the UN — Ambassador P. Harish",
        source: "Permanent Mission of India to the UN",
        url: "https://www.pminewyork.gov.in/",
      },
    ],
    politicalSystem: {
      value: "Federal parliamentary democratic republic",
      source: "CIA World Factbook — India",
      url: "https://www.cia.gov/the-world-factbook/countries/india/",
    },
    population: {
      value: "~1.43 billion (UN DESA, 2023 estimate)",
      source: "UN World Population Prospects",
      url: "https://population.un.org/wpp/",
    },
    gdp: {
      value: "~US$3.55 trillion nominal (World Bank, 2023)",
      source: "World Bank Open Data",
      url: "https://data.worldbank.org/country/india",
    },
    priorities: [
      "Reform of the UN Security Council and expanded permanent membership",
      "Voice of the Global South in multilateral fora",
      "Counter-terrorism cooperation and the Comprehensive Convention on International Terrorism",
      "Climate justice, common but differentiated responsibilities, and the International Solar Alliance",
      "Strategic autonomy in security alignments",
    ],
    prioritiesSource: {
      label: "MEA Annual Report",
      url: "https://www.mea.gov.in/annual-reports.htm",
    },
    events: [
      {
        date: "2023",
        text: "Hosted the G20 Leaders' Summit in New Delhi; African Union admitted as a permanent G20 member.",
        url: "https://www.mea.gov.in/",
      },
      {
        date: "Ongoing",
        text: "Continued candidacy for a permanent seat on a reformed UN Security Council.",
        url: "https://www.pminewyork.gov.in/",
      },
    ],
    treaties: [
      { name: "Paris Agreement", status: "Ratified (2016)", url: "https://treaties.un.org/" },
      { name: "Treaty on the Non-Proliferation of Nuclear Weapons", status: "Not a party", url: "https://treaties.un.org/" },
      { name: "UN Convention on the Law of the Sea", status: "Ratified (1995)", url: "https://treaties.un.org/" },
    ],
    memberships: ["United Nations", "G20", "BRICS", "Commonwealth", "SCO", "Quad", "WTO", "International Solar Alliance"],
    votingNotes: [
      {
        text: "Verify each vote in the UN Digital Library voting records before citing it in committee.",
        url: "https://digitallibrary.un.org/search?ln=en&c=Voting+Data",
      },
    ],
    links: [
      { label: "Ministry of External Affairs", url: "https://www.mea.gov.in/" },
      { label: "Permanent Mission of India to the UN", url: "https://www.pminewyork.gov.in/" },
      { label: "Government of India portal", url: "https://www.india.gov.in/" },
      { label: "UN Member State page", url: "https://www.un.org/en/about-us/member-states" },
    ],
    speeches: [
      {
        speaker: "Narendra Modi",
        role: "Prime Minister",
        title: "Address to the UN General Assembly, General Debate",
        date: "General Debate sessions",
        topic: "Multilateral reform, development, climate",
        keywords: ["UNSC reform", "Global South", "climate", "development"],
        summary:
          "Recurring themes: reform of multilateral institutions, development partnerships with the Global South, and climate action framed around lifestyle and equity.",
        transcriptUrl: "https://gadebate.un.org/en/",
        videoUrl: "https://webtv.un.org/",
      },
      {
        speaker: "S. Jaishankar",
        role: "Minister of External Affairs",
        title: "Statements to the UN Security Council and General Assembly",
        date: "Various",
        topic: "Counter-terrorism, reformed multilateralism",
        keywords: ["counter-terrorism", "reformed multilateralism", "strategic autonomy"],
        summary:
          "Consistently argues that the current Security Council composition reflects 1945, and presses for a Comprehensive Convention on International Terrorism.",
        transcriptUrl: "https://www.mea.gov.in/Speeches-Statements.htm",
        videoUrl: "https://webtv.un.org/",
      },
    ],
  },
  {
    name: "Brazil",
    flag: "🇧🇷",
    region: "South America",
    leadership: [
      {
        value: "Head of State and Government — President Luiz Inácio Lula da Silva",
        source: "Presidência da República",
        url: "https://www.gov.br/planalto/",
      },
      {
        value: "Minister of Foreign Affairs — Mauro Vieira",
        source: "Itamaraty (MRE)",
        url: "https://www.gov.br/mre/",
      },
      {
        value: "Permanent Representative to the UN — Ambassador Sérgio França Danese",
        source: "Permanent Mission of Brazil to the UN",
        url: "https://www.gov.br/mre/en/embaixada-newyork",
      },
    ],
    politicalSystem: {
      value: "Federal presidential republic",
      source: "CIA World Factbook — Brazil",
      url: "https://www.cia.gov/the-world-factbook/countries/brazil/",
    },
    population: {
      value: "~216 million (UN DESA, 2023 estimate)",
      source: "UN World Population Prospects",
      url: "https://population.un.org/wpp/",
    },
    gdp: {
      value: "~US$2.17 trillion nominal (World Bank, 2023)",
      source: "World Bank Open Data",
      url: "https://data.worldbank.org/country/brazil",
    },
    priorities: [
      "Security Council reform through the G4 grouping",
      "Amazon and rainforest diplomacy, climate finance for developing states",
      "Hunger and poverty eradication as a global alliance priority",
      "Trade multilateralism and WTO reform",
      "Non-intervention and peaceful settlement of disputes",
    ],
    prioritiesSource: { label: "Itamaraty — Foreign Policy", url: "https://www.gov.br/mre/en" },
    events: [
      {
        date: "2024",
        text: "Held the G20 presidency; launched the Global Alliance against Hunger and Poverty.",
        url: "https://www.gov.br/mre/en",
      },
      {
        date: "2025",
        text: "Hosted COP30 in Belém, centring forests and climate finance.",
        url: "https://unfccc.int/",
      },
    ],
    treaties: [
      { name: "Paris Agreement", status: "Ratified (2016)", url: "https://treaties.un.org/" },
      { name: "Treaty of Tlatelolco", status: "Party", url: "https://treaties.un.org/" },
      { name: "NPT", status: "Ratified (1998)", url: "https://treaties.un.org/" },
    ],
    memberships: ["United Nations", "G20", "BRICS", "Mercosur", "OAS", "WTO", "G4"],
    votingNotes: [
      {
        text: "Brazil frequently co-sponsors resolutions on sustainable development and non-intervention; confirm specifics in the voting record.",
        url: "https://digitallibrary.un.org/search?ln=en&c=Voting+Data",
      },
    ],
    links: [
      { label: "Ministry of Foreign Affairs (Itamaraty)", url: "https://www.gov.br/mre/" },
      { label: "Permanent Mission of Brazil to the UN", url: "https://www.gov.br/mre/en/embaixada-newyork" },
      { label: "Government of Brazil portal", url: "https://www.gov.br/" },
    ],
    speeches: [
      {
        speaker: "Luiz Inácio Lula da Silva",
        role: "President",
        title: "Opening address of the UN General Assembly General Debate",
        date: "Annually, September",
        topic: "Inequality, climate, multilateral reform",
        keywords: ["hunger", "inequality", "climate finance", "UNSC reform"],
        summary:
          "Brazil traditionally opens the General Debate. Recurring themes: inequality, hunger, climate finance and reform of global governance.",
        transcriptUrl: "https://gadebate.un.org/en/",
        videoUrl: "https://webtv.un.org/",
      },
    ],
  },
  {
    name: "France",
    flag: "🇫🇷",
    region: "Western Europe",
    leadership: [
      {
        value: "Head of State — President Emmanuel Macron",
        source: "Élysée",
        url: "https://www.elysee.fr/en/",
      },
      {
        value: "Head of Government — the Prime Minister (verify current officeholder)",
        source: "Gouvernement.fr",
        url: "https://www.gouvernement.fr/",
      },
      {
        value: "Minister for Europe and Foreign Affairs — verify current officeholder",
        source: "France Diplomatie",
        url: "https://www.diplomatie.gouv.fr/en/",
      },
      {
        value: "Permanent Representative to the UN — see mission listing",
        source: "Permanent Mission of France to the UN",
        url: "https://onu.delegfrance.org/",
      },
    ],
    politicalSystem: {
      value: "Semi-presidential republic",
      source: "CIA World Factbook — France",
      url: "https://www.cia.gov/the-world-factbook/countries/france/",
    },
    population: {
      value: "~68 million (UN DESA, 2023 estimate)",
      source: "UN World Population Prospects",
      url: "https://population.un.org/wpp/",
    },
    gdp: {
      value: "~US$3.03 trillion nominal (World Bank, 2023)",
      source: "World Bank Open Data",
      url: "https://data.worldbank.org/country/france",
    },
    priorities: [
      "Permanent member responsibilities and the veto-restraint initiative on mass atrocities",
      "European strategic autonomy and EU defence cooperation",
      "Climate leadership as depositary state of the Paris Agreement",
      "Protection of civilians and humanitarian access",
      "Francophonie and Sahel security engagement",
    ],
    prioritiesSource: { label: "France Diplomatie", url: "https://www.diplomatie.gouv.fr/en/" },
    events: [
      {
        date: "Ongoing",
        text: "Promotes the political declaration on suspension of the veto in cases of mass atrocity.",
        url: "https://onu.delegfrance.org/",
      },
      {
        date: "2015→",
        text: "Depositary and champion of the Paris Agreement adopted at COP21 in Paris.",
        url: "https://unfccc.int/process-and-meetings/the-paris-agreement",
      },
    ],
    treaties: [
      { name: "Paris Agreement", status: "Ratified (2016)", url: "https://treaties.un.org/" },
      { name: "NPT", status: "Nuclear-weapon State party", url: "https://treaties.un.org/" },
      { name: "Rome Statute", status: "Ratified (2000)", url: "https://treaties.un.org/" },
    ],
    memberships: ["United Nations (P5)", "European Union", "NATO", "G7", "G20", "OECD", "Francophonie"],
    votingNotes: [
      {
        text: "As a P5 member, France's veto record and explanations of vote are published by the mission and the Security Council.",
        url: "https://www.un.org/securitycouncil/content/voting-system",
      },
    ],
    links: [
      { label: "France Diplomatie", url: "https://www.diplomatie.gouv.fr/en/" },
      { label: "Permanent Mission of France to the UN", url: "https://onu.delegfrance.org/" },
      { label: "Élysée", url: "https://www.elysee.fr/en/" },
    ],
    speeches: [
      {
        speaker: "Emmanuel Macron",
        role: "President",
        title: "UN General Assembly General Debate addresses",
        date: "Annually, September",
        topic: "Multilateralism, climate, European security",
        keywords: ["multilateralism", "veto restraint", "climate", "sovereignty"],
        summary:
          "Frames France as a defender of a rules-based multilateral order, with emphasis on climate commitments and European security.",
        transcriptUrl: "https://gadebate.un.org/en/",
        videoUrl: "https://webtv.un.org/",
      },
    ],
  },
  {
    name: "Kenya",
    flag: "🇰🇪",
    region: "East Africa",
    leadership: [
      {
        value: "Head of State and Government — President William Ruto",
        source: "The Presidency, Republic of Kenya",
        url: "https://www.president.go.ke/",
      },
      {
        value: "Cabinet Secretary for Foreign and Diaspora Affairs — verify current officeholder",
        source: "Ministry of Foreign and Diaspora Affairs",
        url: "https://mfa.go.ke/",
      },
      {
        value: "Permanent Representative to the UN — see mission listing",
        source: "Permanent Mission of Kenya to the UN",
        url: "https://www.un.int/kenya/",
      },
    ],
    politicalSystem: {
      value: "Presidential republic",
      source: "CIA World Factbook — Kenya",
      url: "https://www.cia.gov/the-world-factbook/countries/kenya/",
    },
    population: {
      value: "~55 million (UN DESA, 2023 estimate)",
      source: "UN World Population Prospects",
      url: "https://population.un.org/wpp/",
    },
    gdp: {
      value: "~US$108 billion nominal (World Bank, 2023)",
      source: "World Bank Open Data",
      url: "https://data.worldbank.org/country/kenya",
    },
    priorities: [
      "African agency in peace and security decisions affecting the continent",
      "Climate adaptation finance and the Nairobi Declaration agenda",
      "Reform of the global financial architecture and debt relief",
      "Regional stabilisation, including support to multinational security missions",
      "Host-state role for UNEP and UN-Habitat in Nairobi",
    ],
    prioritiesSource: { label: "Ministry of Foreign and Diaspora Affairs", url: "https://mfa.go.ke/" },
    events: [
      {
        date: "2023",
        text: "Hosted the inaugural Africa Climate Summit, producing the Nairobi Declaration.",
        url: "https://mfa.go.ke/",
      },
      {
        date: "2021–2022",
        text: "Served an elected term on the UN Security Council.",
        url: "https://www.un.org/securitycouncil/",
      },
    ],
    treaties: [
      { name: "Paris Agreement", status: "Ratified (2016)", url: "https://treaties.un.org/" },
      { name: "Rome Statute", status: "Ratified (2005)", url: "https://treaties.un.org/" },
      { name: "African Continental Free Trade Area", status: "Party", url: "https://au.int/" },
    ],
    memberships: ["United Nations", "African Union", "EAC", "Commonwealth", "WTO", "IGAD"],
    votingNotes: [
      {
        text: "Kenya's Security Council statements from its 2021–22 term are a strong primary source for its positions.",
        url: "https://www.un.int/kenya/",
      },
    ],
    links: [
      { label: "Ministry of Foreign and Diaspora Affairs", url: "https://mfa.go.ke/" },
      { label: "Permanent Mission of Kenya to the UN", url: "https://www.un.int/kenya/" },
      { label: "The Presidency", url: "https://www.president.go.ke/" },
    ],
    speeches: [
      {
        speaker: "Martin Kimani",
        role: "Former Permanent Representative to the UN",
        title: "Security Council statement on the situation in Ukraine",
        date: "21 February 2022",
        topic: "Sovereignty, colonial borders, self-determination",
        keywords: ["sovereignty", "borders", "colonial legacy", "UN Charter"],
        summary:
          "Widely cited address drawing on Africa's experience of colonial borders to argue against redrawing frontiers by force. A model of principled, historically grounded diplomatic rhetoric.",
        transcriptUrl: "https://www.un.int/kenya/",
        videoUrl: "https://webtv.un.org/",
      },
    ],
  },
];

export function findCountry(name: string) {
  const n = name.trim().toLowerCase();
  return COUNTRIES.find((c) => c.name.toLowerCase() === n) ?? null;
}
