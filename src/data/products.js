import productManifest from '../assets/images/products/manifest.json'

const categoryDescriptions = {
  'jute-fabric': 'Discover premium-grade jute fabric that combines durability, sustainability, and natural charm. Ideal for crafting, upholstery, home décor, and custom-made bags, our jute fabric offers a versatile solution for eco-conscious creators and businesses looking to add a rustic yet stylish touch.',
  'jute-wedding-bags': 'Celebrate your special day with beautifully designed jute wedding bags that make perfect return gifts for guests. Crafted with care, these eco-friendly bags bring elegance and sustainability together, making them a memorable keepsake for weddings, engagements, and festive occasions.',
  'jute-promotional-bags': 'Promote your brand in style with our customizable jute promotional bags. Sturdy, reusable, and eco-conscious, these bags are ideal for trade shows, corporate giveaways, and events, helping you make a lasting impression while contributing to a greener planet.',
  'jute-shopping-bags': 'Upgrade your shopping experience with our stylish, heavy-duty jute shopping bags. Designed for repeated use, these biodegradable bags are perfect for groceries, retail purchases, and everyday errands, offering both fashion and functionality while reducing plastic waste.',
  'hand-bags': 'Explore our exclusive collection of eco-friendly handbags made from jute and other sustainable materials. Whether for casual outings, office wear, or special occasions, these handbags combine practicality with contemporary style, making them a perfect addition to your wardrobe.',
  'jute-file-folders': 'Keep your important documents neat, organized, and eco-friendly with our premium jute file holders. Suitable for office, school, and personal use, these sturdy holders not only protect your files but also make a stylish and sustainable statement in any professional setting.',
  'jute-executive-bags': 'Make a professional and eco-conscious impression with our range of jute executive bags. Featuring spacious compartments, sleek designs, and durable craftsmanship, these bags are ideal for carrying laptops, files, and essentials for work, meetings, or travel.',
  'multi-color-fancy-bags': 'Add a splash of color to your style with our multi-color fancy jute bags. Perfect for gifting, parties, and everyday fashion, these bags are crafted from high-quality jute and feature vibrant designs that stand out while supporting sustainable living.',
}

// Keep the source site's established product URLs local to this React app.
const categoryRoutes = {
  'jute-fabric': '/jute-fabric-wholesale-market',
  'jute-wedding-bags': '/wedding-jute-bags-for-return-gifts',
  'jute-shopping-bags': '/eco-friendly-jute-shopping-bags-wholesale',
  'hand-bags': '/products/hand-bags',
  'jute-promotional-bags': '/products/jute-promotional-bags',
  'jute-file-folders': '/products/jute-file-folders',
  'jute-executive-bags': '/products/jute-executive-bags',
  'multi-color-fancy-bags': '/products/multi-color-fancy-bags',
}

const localImageUrls = import.meta.glob('../assets/images/products/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
})

const imageByPath = Object.fromEntries(
  Object.entries(localImageUrls).map(([path, url]) => [path.replace('../assets/images/products/', ''), url]),
)

export const products = productManifest.map((category) => {
  const gallery = category.items.map((item) => ({
    ...item,
    category: category.name,
    image: imageByPath[item.image],
  }))

  return {
    id: category.slug,
    slug: category.slug,
    route: categoryRoutes[category.slug] ?? `/products/${category.slug}`,
    name: category.name,
    description: categoryDescriptions[category.slug],
    image: gallery[0]?.image,
    gallery,
  }
})
