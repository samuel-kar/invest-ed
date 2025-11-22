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
    title: 'Portfolio Building Fundamentals',
    description:
      'Master the basics of constructing a well-diversified investment portfolio that matches your risk tolerance and goals.',
    comingSoon: true,
    category: 'Portfolio Management',
  },
]
