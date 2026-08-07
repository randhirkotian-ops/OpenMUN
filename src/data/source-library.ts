export type LibrarySource = {
  title: string;
  org: string;
  category: "UN" | "Health" | "Children" | "Economy" | "Government" | "NGO" | "Academic" | "Legal";
  url: string;
  description: string;
};

export const SOURCE_LIBRARY: LibrarySource[] = [
  { title: "UN Digital Library", org: "United Nations", category: "UN", url: "https://digitallibrary.un.org/", description: "Resolutions, voting records, speeches and official documents." },
  { title: "UN Official Document System", org: "United Nations", category: "UN", url: "https://documents.un.org/", description: "Full text of UN documents by symbol." },
  { title: "General Assembly resolutions", org: "United Nations", category: "UN", url: "https://www.un.org/en/ga/documents/resolutions.shtml", description: "Adopted GA resolutions by session." },
  { title: "Security Council resolutions", org: "United Nations", category: "UN", url: "https://www.un.org/securitycouncil/content/resolutions", description: "SC resolutions and presidential statements." },
  { title: "UN Treaty Collection", org: "United Nations", category: "Legal", url: "https://treaties.un.org/", description: "Ratification status for every multilateral treaty." },
  { title: "UN Web TV", org: "United Nations", category: "UN", url: "https://webtv.un.org/", description: "Live and archived footage of UN meetings and speeches." },
  { title: "General Debate statements", org: "United Nations", category: "UN", url: "https://gadebate.un.org/en/", description: "Transcripts of every General Debate address." },
  { title: "SDG Indicators Database", org: "UN Statistics Division", category: "UN", url: "https://unstats.un.org/sdgs/dataportal", description: "Official SDG indicator data by country." },
  { title: "WHO Global Health Observatory", org: "World Health Organization", category: "Health", url: "https://www.who.int/data/gho", description: "Health statistics across member states." },
  { title: "UNICEF Data", org: "UNICEF", category: "Children", url: "https://data.unicef.org/", description: "Child wellbeing, education and protection indicators." },
  { title: "World Bank Open Data", org: "World Bank", category: "Economy", url: "https://data.worldbank.org/", description: "GDP, trade, poverty and development indicators." },
  { title: "IMF Data", org: "International Monetary Fund", category: "Economy", url: "https://www.imf.org/en/Data", description: "Macroeconomic and financial statistics." },
  { title: "UNHCR Refugee Data Finder", org: "UNHCR", category: "UN", url: "https://www.unhcr.org/refugee-statistics/", description: "Forced displacement statistics." },
  { title: "CIA World Factbook", org: "CIA", category: "Government", url: "https://www.cia.gov/the-world-factbook/", description: "Country profiles: government, economy, geography." },
  { title: "OHCHR country pages", org: "UN Human Rights", category: "UN", url: "https://www.ohchr.org/en/countries", description: "Treaty body reports and human rights reviews." },
  { title: "Amnesty International reports", org: "Amnesty International", category: "NGO", url: "https://www.amnesty.org/en/research/", description: "Independent human rights research." },
  { title: "Human Rights Watch World Report", org: "Human Rights Watch", category: "NGO", url: "https://www.hrw.org/world-report", description: "Annual country-by-country review." },
  { title: "Crisis Group reports", org: "International Crisis Group", category: "NGO", url: "https://www.crisisgroup.org/", description: "Conflict analysis and policy recommendations." },
  { title: "JSTOR", org: "JSTOR", category: "Academic", url: "https://www.jstor.org/", description: "Peer-reviewed journals across the social sciences." },
  { title: "Google Scholar", org: "Google", category: "Academic", url: "https://scholar.google.com/", description: "Academic literature search with citation counts." },
  { title: "Our World in Data", org: "Our World in Data", category: "Academic", url: "https://ourworldindata.org/", description: "Cited datasets and charts on global problems." },
  { title: "ICJ decisions", org: "International Court of Justice", category: "Legal", url: "https://www.icj-cij.org/decisions", description: "Judgments, advisory opinions and orders." },
];
