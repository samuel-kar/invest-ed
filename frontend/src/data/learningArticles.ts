export interface LearningArticle {
  id: string
  title: string
  description: string
  comingSoon: boolean
  category: string
}

export const learningArticles: LearningArticle[] = [
  {
    id: 'dividend-investing-strategy',
    title: 'Dividend Investing Strategy',
    description:
      'Learn how to build a portfolio focused on dividend-paying stocks for steady income and long-term wealth building.',
    comingSoon: true,
    category: 'Investment Strategies',
  },
  {
    id: 'growth-investing-strategy',
    title: 'Growth Investing Strategy',
    description:
      'Discover how to identify and invest in high-growth companies that can deliver significant returns over time.',
    comingSoon: true,
    category: 'Investment Strategies',
  },
  {
    id: 'portfolio-building-fundamentals',
    title: 'Portfolio Building Fundamentals',
    description:
      'Master the basics of constructing a well-diversified investment portfolio that matches your risk tolerance and goals.',
    comingSoon: true,
    category: 'Portfolio Management',
  },
  {
    id: 'understanding-risk-return',
    title: 'Understanding Risk and Return',
    description:
      'Learn how to assess investment risk, understand the risk-return relationship, and make informed decisions.',
    comingSoon: true,
    category: 'Risk Management',
  },
]
