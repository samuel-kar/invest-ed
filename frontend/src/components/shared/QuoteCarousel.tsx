import Carousel, { type CarouselItem } from './Carousel'
import { type Quote } from '../../data/quotes'

interface QuoteCarouselProps {
  quotes: Quote[]
}

export default function QuoteCarousel({ quotes }: QuoteCarouselProps) {
  const carouselItems: CarouselItem[] = quotes.map((quote) => ({
    id: quote.id,
    content: (
      <div className="px-6 py-6">
        <div className="flex min-h-[220px] flex-col items-center justify-center text-center sm:min-h-[260px]">
          <blockquote className="space-y-4">
            <p
              className="text-xl md:text-2xl font-medium italic"
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
      </div>
    ),
  }))

  return (
    <Carousel items={carouselItems} autoplay={true} autoplayInterval={6000} />
  )
}
