import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface CarouselItem {
  id: string
  content: React.ReactNode
}

interface CarouselProps {
  items: CarouselItem[]
  autoplay?: boolean
  autoplayInterval?: number
  showNavigation?: boolean
  showDots?: boolean
}

export default function Carousel({
  items,
  autoplay = true,
  autoplayInterval = 5000,
  showNavigation = true,
  showDots = true,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    autoplay
      ? [Autoplay({ delay: autoplayInterval, stopOnInteraction: false })]
      : [],
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const [selectedIndex, setSelectedIndex] = React.useState(0)

  React.useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  return (
    <div className="relative">
      {/* Carousel viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item) => (
            <div key={item.id} className="flex-[0_0_100%] min-w-0">
              {item.content}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      {showNavigation && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all hover:opacity-80"
            style={{ backgroundColor: 'var(--bg-tertiary)' }}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} style={{ color: 'var(--text-primary)' }} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all hover:opacity-80"
            style={{ backgroundColor: 'var(--bg-tertiary)' }}
            aria-label="Next slide"
          >
            <ChevronRight size={20} style={{ color: 'var(--text-primary)' }} />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {showDots && (
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor:
                  index === selectedIndex
                    ? 'var(--accent-color)'
                    : 'var(--border-color)',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
