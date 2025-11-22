export interface LearningArticle {
  id: string
  title: string
  description: string
  comingSoon: boolean
  category: string
}

export const learningArticles: LearningArticle[] = [
  {
    id: 'quick-start-dividend',
    title: 'learn.guides.dividendAnalysis.title',
    description: 'learn.guides.dividendAnalysis.description',
    comingSoon: false,
    category: 'Dividend Analysis',
  },
  {
    id: 'portfolio-building-fundamentals',
    title: 'learn.articles.portfolioBuildingFundamentals.title',
    description: 'learn.articles.portfolioBuildingFundamentals.description',
    comingSoon: true,
    category: 'Portfolio Management',
  },
]
