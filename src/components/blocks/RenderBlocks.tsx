import { HeroBlock } from './HeroBlock'
import { ListingTableBlock } from './ListingTableBlock'
import { RichContentBlock } from './RichContentBlock'
import { FAQBlock } from './FAQBlock'
import { ProsConsBlock } from './ProsConsBlock'
import { ComparisonTableBlock } from './ComparisonTableBlock'
import { CTABannerBlock } from './CTABannerBlock'

const blockComponents: Record<string, React.ComponentType<any>> = {
  hero: HeroBlock,
  listingTable: ListingTableBlock,
  richContent: RichContentBlock,
  faq: FAQBlock,
  prosCons: ProsConsBlock,
  comparisonTable: ComparisonTableBlock,
  ctaBanner: CTABannerBlock,
}

type Props = {
  blocks: any[]
}

export function RenderBlocks({ blocks }: Props) {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className="space-y-12">
      {blocks.map((block, i) => {
        const Component = blockComponents[block.blockType]
        if (!Component) return null
        return <Component key={block.id || i} {...block} />
      })}
    </div>
  )
}
