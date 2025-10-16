import Carousel, { type CarouselItem } from './Carousel'
import { type Quote } from '../../data/quotes'

interface QuoteCarouselProps {
  quotes: Quote[]
}

export default function QuoteCarousel({ quotes }: QuoteCarouselProps) {
  const carouselItems: CarouselItem[] = quotes.map((quote) => ({
    id: quote.id,
    content: (
      <div className="text-center px-8 py-6">
        <blockquote>
          <p
            className="text-xl md:text-2xl font-medium italic mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            "{quote.text}"
          </p>
          <footer>
            <cite
              className="text-sm md:text-base not-italic font-semibold"
              style={{ color: 'var(--accent-color)' }}
            >
              — {quote.author}
            </cite>
          </footer>
        </blockquote>
      </div>
    ),
  }))

  return (
    <Carousel items={carouselItems} autoplay={true} autoplayInterval={6000} />
  )
}
