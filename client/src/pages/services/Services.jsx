import ServiceHero from './components/ServiceHero'
import CropSuggestionExplainer from './components/CropSuggestionService'
import MarketExplainer from './components/MarketExplainer'
import SchemeExplainer from './components/SchemeExplainer'
import BuyerWishlistExplainer from './components/BuyerWishlistExplainer'
import { useRef } from 'react'

const Services = () => {
  const suggestionRef = useRef(null)
  const marketRef = useRef(null)
  const schemeRef = useRef(null)
  const wishlistRef = useRef(null)

  const scrollToSuggestion = () =>
    suggestionRef.current?.scrollIntoView({ behavior: 'smooth' })

  const scrollToMarket = () =>
    marketRef.current?.scrollIntoView({ behavior: 'smooth' })

  const scrollToScheme = () =>
    schemeRef.current?.scrollIntoView({ behavior: 'smooth' })

  const scrollToWishlist = () =>
    wishlistRef.current?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <ServiceHero
        scrollToSuggestion={scrollToSuggestion}
        scrollToMarket={scrollToMarket}
        scrollToScheme={scrollToScheme}
        scrollToWishlist={scrollToWishlist}
      />

      <div ref={suggestionRef}>
        <CropSuggestionExplainer />
      </div>

      <div ref={marketRef}>
        <MarketExplainer />
      </div>

      <div ref={schemeRef}>
        <SchemeExplainer />
      </div>

      <div ref={wishlistRef}>
        <BuyerWishlistExplainer />
      </div>
    </>
  )
}

export default Services
