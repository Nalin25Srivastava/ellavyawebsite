/**
 * Product Categories
 * 
 * Defines the main classification for all products in the store.
 * Each category has an ID, display name, icon, and brief description.
 */
export const categories = [
  { id: 'herbal', name: 'Herbal Powders', icon: '🌿', description: 'Skin & Hair Care' },
  { id: 'hair', name: 'Hair Care & Essential Oils', icon: '🌸', description: 'Natural Nourishment' },
  { id: 'bath', name: 'Home Made Natural Soap', icon: '🧼', description: 'Artisan Handcrafted Soaps' },
  { id: 'toners', name: 'Floral & Skin Toners', icon: '🌹', description: 'Refreshing Mist' },
  { id: 'food', name: 'Food & Edible Powders', icon: '🍃', description: 'Healthy Herbs' }
];

/**
 * Product Catalog Data
 * 
 * Contains all products available on the site.
 * Products include pricing, stock levels, benefits, usage guides, and image paths.
 */
export const allProducts = [
  /* -------------------------------------------------------------------------- */
  /* 🌿 Herbal Powders (Skin & Hair Care)                                       */
  /* -------------------------------------------------------------------------- */
  { 
    id: 2, 
    name: 'Moringa Powder', 
    category: 'herbal', 
    price: '₹450', 
    mrp: '₹599',
    quantity: '200g',
    stock: 45,
    benefits: ['Boosts Immunity', 'High in Antioxidants', 'Improves Skin Health', 'Natural Energy Booster'],
    usage: 'Mix 1 teaspoon with warm water, smoothies, or juices. Can also be added to soups and salads.',
    instructions: 'Store in a cool, dry place. Reseal the pouch after use to maintain freshness.',
    images: [
      '/images/moringa/5.jpeg',
      '/images/moringa/1.jpeg',
      '/images/moringa/2.jpeg',
      '/images/moringa/3.jpeg',
      '/images/moringa/4.jpeg',
      '/images/moringa/front.png',
      '/images/moringa/6.png'
    ]
  },
  { 
    id: 3, 
    name: 'Lemon Peel Powder', 
    category: 'herbal', 
    price: '₹199', 
    mrp: '₹299',
    quantity: '100g',
    stock: 32,
    benefits: ['Natural Skin Brightener', 'Rich in Vitamin C', 'Fights Acne & Pimples', 'Removes Excess Oil'],
    usage: 'Make a paste with water or rose water. Apply on face for 15 mins then wash off.',
    instructions: 'Patch test before use. Avoid contact with eyes.',
    images: [
      '/images/lemon_peel/5.png',
      '/images/lemon_peel/1.jpeg',
      '/images/lemon_peel/2.jpeg',
      '/images/lemon_peel/3.jpeg',
      '/images/lemon_peel/4.jpeg',
      '/images/lemon_peel/front.png',
      '/images/lemon_peel/6.png'
    ]
  },
  { 
    id: 4, 
    name: 'Beetroot Powder', 
    category: 'herbal', 
    price: '₹249', 
    mrp: '₹349',
    quantity: '100g',
    stock: 28,
    benefits: ['Natural Pink Glow', 'Rich in Iron', 'Acts as Natural Lip Tint', 'Detoxifies Skin'],
    usage: 'Use in face packs with honey or curd. Can also be used as a natural blush.',
    instructions: 'Highly pigmented, use sparingly.',
    images: [
      '/images/beetroot/5.png',
      '/images/beetroot/1.jpeg',
      '/images/beetroot/2.jpeg',
      '/images/beetroot/3.jpeg',
      '/images/beetroot/4.jpeg',
      '/images/beetroot/front.png',
      '/images/beetroot/6.png'
    ]
  },
  { 
    id: 5, 
    name: 'Hibiscus Powder', 
    category: 'herbal', 
    price: '₹299', 
    mrp: '₹399',
    quantity: '150g',
    stock: 15,
    benefits: ['Promotes Hair Growth', 'Prevents Premature Greying', 'Conditions Hair Naturally', 'Scalp Health'],
    usage: 'Mix with curd or water for hair mask. Leave for 30 mins before washing.',
    instructions: 'Best results when used weekly.',
    images: [
      '/images/hibiscus/5.png',
      '/images/hibiscus/1.jpeg',
      '/images/hibiscus/2.jpeg',
      '/images/hibiscus/3.jpeg',
      '/images/hibiscus/4.jpeg',
      '/images/hibiscus/front.png',
      '/images/hibiscus/6.png'
    ]
  },
  { 
    id: 6, 
    name: 'Multani Mitti', 
    category: 'herbal', 
    price: '₹149', 
    mrp: '₹199',
    quantity: '250g',
    stock: 120,
    benefits: ['Deep Pore Cleansing', 'Oil Absorption', 'Cooling Effect on Skin', 'Removes Sun Tan'],
    usage: 'Mix with rose water or plain water. Apply and let dry completely before washing.',
    instructions: 'Not recommended for very dry skin.',
    images: [
      '/images/multani/1.png',
      '/images/multani/2.png',
      '/images/multani/3.png',
      '/images/multani/front.png'
    ]
  },
  { 
    id: 7, 
    name: 'Bridal Ubtan Powder', 
    category: 'herbal', 
    price: '₹599', 
    mrp: '₹799',
    quantity: '150g',
    stock: 10,
    benefits: ['Instant Bridal Glow', 'Gentle Exfoliation', 'Traditional Recipe', 'Removes Dead Skin'],
    usage: 'Mix with raw milk or rose water. Massage gently on face and body.',
    instructions: 'Use twice a week for best results.',
    images: [
      '/images/bridal_ubtan/1.jpeg',
      '/images/bridal_ubtan/2.jpeg',
      '/images/bridal_ubtan/3.jpeg',
      '/images/bridal_ubtan/4.png',
      '/images/bridal_ubtan/5.png',
      '/images/bridal_ubtan/6.png'
    ]
  },
  { id: 8, name: 'Sandalwood Powder', category: 'herbal', price: '₹899', mrp: '₹1200', quantity: '50g', stock: 5, benefits: ['Fragrant Skin Smoothing', 'Anti-aging Properties'], usage: 'Milk/Water paste', instructions: 'Spot test first', image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=400' },
  { id: 9, name: 'Lemon Powder', category: 'herbal', price: '₹199', mrp: '₹299', quantity: '100g', stock: 40, benefits: ['Skin Glow', 'Citrus Power'], usage: 'Face Pack', instructions: 'Avoid direct sun after use', image: 'https://images.unsplash.com/photo-1596003906949-67221c37965c?auto=format&fit=crop&q=80&w=400' },
  { id: 10, name: 'Tulsi Powder', category: 'herbal', price: '₹179', mrp: '₹249', quantity: '100g', stock: 65, benefits: ['Antibacterial', 'Clear Skin'], usage: 'Water paste', instructions: 'Daily use safe', image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&q=80&w=400' },
  { id: 11, name: 'Tomato Powder', category: 'herbal', price: '₹199', mrp: '₹299', quantity: '100g', stock: 35, benefits: ['Shrinks Pores', 'Antioxidants'], usage: 'Face mask', instructions: 'Gentle on skin', image: 'https://images.unsplash.com/photo-1590623661136-e0ce11b81604?auto=format&fit=crop&q=80&w=400' },
  
  /* -------------------------------------------------------------------------- */
  /* 🌸 Hair Care & Essential Oils                                              */
  /* -------------------------------------------------------------------------- */
  { id: 12, name: 'Tea Tree Oil', category: 'hair', price: '₹349', mrp: '₹450', quantity: '15ml', stock: 20, benefits: ['Dandruff Control', 'Acne Treatment'], usage: 'Dilute with carrier oil', instructions: 'Do not apply directly', image: '/images/tea_tree_oil/1.png' },
  { id: 13, name: 'Rosemary Oil', category: 'hair', price: '₹399', mrp: '₹499', quantity: '15ml', stock: 18, benefits: ['Scalp Stimulation', 'Hair Thickness'], usage: 'Add to shampoo/oil', instructions: 'Avoid eyes', image: '/images/rosemary/1.png' },
  { id: 14, name: 'Hibiscus Oil', category: 'hair', price: '₹329', mrp: '₹420', quantity: '100ml', stock: 25, benefits: ['Natural Conditioning', 'Smooth Hair'], usage: 'Massage on scalp', instructions: 'Overnight for best results', image: '/images/hibiscus/5.png' },
  
  /* -------------------------------------------------------------------------- */
  /* 🧼 Home Made Natural Soaps                                                */
  /* -------------------------------------------------------------------------- */
  { id: 15, name: 'Rose Natural Soap', category: 'bath', price: '₹199', mrp: '₹249', quantity: '100g', stock: 50, benefits: ['Hydrating', 'Floral Fragrance'], usage: 'Body wash', instructions: 'Keep dry after use', image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=400' },
  { id: 25, name: 'Lemon Natural Soap', category: 'bath', price: '₹199', mrp: '₹249', quantity: '100g', stock: 45, benefits: ['Refreshing', 'Antibacterial'], usage: 'Daily bath', instructions: 'Natural ingredients', image: 'https://images.unsplash.com/photo-1554433607-66b5efe9d304?auto=format&fit=crop&q=80&w=400' },
  { id: 26, name: 'Beetroot Natural Soap', category: 'bath', price: '₹199', mrp: '₹249', quantity: '100g', stock: 30, benefits: ['Glowing Skin', 'Moisturizing'], usage: 'Face & Body', instructions: 'No chemicals', image: 'https://images.unsplash.com/photo-1626262411306-056801938531?auto=format&fit=crop&q=80&w=400' },
  { id: 27, name: 'Multani Mitti Soap', category: 'bath', price: '₹199', mrp: '₹249', quantity: '100g', stock: 60, benefits: ['Oil Control', 'Acne Free'], usage: 'Face Wash', instructions: 'Cooling effect', image: '/images/soaps/multani-facial-bar.jpeg' },
  { id: 28, name: 'Rice Natural Soap', category: 'bath', price: '₹199', mrp: '₹249', quantity: '100g', stock: 40, benefits: ['Skin Brightening', 'Smooth Texture'], usage: 'Daily use', instructions: 'Rice Bran essence', image: 'https://images.unsplash.com/photo-1586201327693-8661997042fb?auto=format&fit=crop&q=80&w=400' },
  { id: 29, name: 'Coffee Natural Soap', category: 'bath', price: '₹199', mrp: '₹249', quantity: '100g', stock: 25, benefits: ['Exfoliating', 'Awakening'], usage: 'Scrub soap', instructions: 'Avoid face if sensitive', image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&q=80&w=400' },
  { id: 30, name: 'Tomato Natural Soap', category: 'bath', price: '₹199', mrp: '₹249', quantity: '100g', stock: 35, benefits: ['De-tanning', 'Vitamin Rich'], usage: 'Body bath', instructions: 'Sun protection', image: 'https://images.unsplash.com/photo-1590623661136-e0ce11b81604?auto=format&fit=crop&q=80&w=400' },
  { id: 31, name: 'Neem & Tulsi Soap', category: 'bath', price: '₹229', mrp: '₹275', quantity: '100g', stock: 55, benefits: ['Medicinal', 'Fights Infection'], usage: 'Antibacterial bath', instructions: 'Best for summers', image: 'https://images.unsplash.com/photo-1546466691-1ec856bfdaaf?auto=format&fit=crop&q=80&w=400' },
  { id: 32, name: 'Charcoal Natural Soap', category: 'bath', price: '₹229', mrp: '₹275', quantity: '100g', stock: 48, benefits: ['Detoxifying', 'Deep Cleanse'], usage: 'Pollution relief', instructions: 'Twice daily safe', image: 'https://images.unsplash.com/photo-1571109002272-97034988fce7?auto=format&fit=crop&q=80&w=400' },
  { id: 16, name: 'Liquid Hand Wash', category: 'bath', price: '₹149', mrp: '₹199', quantity: '250ml', stock: 80, benefits: ['Soft Hands', 'Germ Protection'], usage: 'Hand wash', instructions: 'Rinse well', image: 'https://images.unsplash.com/photo-1559333086-b0a56225a93c?auto=format&fit=crop&q=80&w=400' },
  
  /* -------------------------------------------------------------------------- */
  /* 🌹 Floral & Skin Toners                                                    */
  /* -------------------------------------------------------------------------- */
  { 
    id: 17, 
    name: 'Rose Water', 
    category: 'toners', 
    price: '₹249', 
    mrp: '₹349',
    quantity: '100ml',
    stock: 90,
    benefits: ['Natural Toner', 'Hydrating Mist', 'Sets Makeup', 'Balances pH'],
    usage: 'Spray on face anytime for refreshness. Use before moisturizer.',
    instructions: 'Store in fridge for extra cooling.',
    images: [
      '/images/rose_water/1.jpeg',
      '/images/rose_water/2.jpeg',
      '/images/rose_water/3.png',
      '/images/rose_water/4.png',
      '/images/rose_water/5.png',
      '/images/rose_water/6.png'
    ]
  },
  { id: 1, name: 'Aloe Vera Gel', category: 'toners', price: '₹299', mrp: '₹399', quantity: '200g', stock: 100, benefits: ['Soothing', 'Multi-purpose'], usage: 'Skin & Hair', instructions: 'Safe for all ages', image: '/images/gels.png' },
  
  /* -------------------------------------------------------------------------- */
  /* 🍃 Food / Edible Powders                                                  */
  /* -------------------------------------------------------------------------- */
  { id: 18, name: 'Garlic Powder', category: 'food', price: '₹129', mrp: '₹175', quantity: '100g', stock: 150, benefits: ['Pure Spice', 'Immunity'], usage: 'Cooking', instructions: 'Keep in glass jar', image: 'https://images.unsplash.com/photo-1584436125133-c40d9d4791e3?auto=format&fit=crop&q=80&w=400' }
];

