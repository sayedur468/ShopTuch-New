/**
 * ==========================================================================
 * SHOPTUCH — PRODUCT CATALOG DATA SYSTEM
 * 24+ Premium Fashion Products & Helper Utilities
 * ==========================================================================
 * 
 * HOW TO ADD A NEW PRODUCT:
 * To add a new product, copy any product object in the `PRODUCTS_DATA` array,
 * assign a unique `id` (e.g. "ST025"), update title, slug, prices, colors,
 * sizes, and category. The entire store will automatically render the new item.
 */

const PRODUCTS_DATA = [
  {
    id: "ST001",
    title: "Heavyweight Boxy Hoodie",
    slug: "heavyweight-boxy-hoodie",
    category: "Hoodies",
    subcategory: "Sweatshirts & Fleece",
    gender: "Unisex",
    brand: "ShopTuch Essentials",
    price: 68.00,
    comparePrice: 95.00,
    discount: 28,
    rating: 4.9,
    reviews: 168,
    ratingBreakdown: { 5: 142, 4: 20, 3: 4, 2: 2, 1: 0 },
    colors: [
      { name: "Onyx Black", hex: "#18181A" },
      { name: "Raw Ecru", hex: "#E8E4DC" },
      { name: "Slate Heather", hex: "#7A8288" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 32,
    sku: "ST-HD-001",
    featured: true,
    bestseller: true,
    newArrival: false,
    trending: true,
    tags: ["hoodie", "heavyweight", "oversized", "cotton", "fleece", "unisex", "minimal"],
    description: "Engineered from 480 GSM organic loopback cotton fleece, this heavyweight hoodie features a structured double-layered hood, seamless kangaroo pocket, and relaxed drop-shoulder tailoring designed for modern drape.",
    features: [
      "480 GSM heavy organic cotton loopback fleece",
      "Seamless ergonomic kangaroo pouch pocket",
      "Reinforced double-layered structured hood (cordless design)",
      "Ribbed 2x2 spandex-reinforced cuffs and hem",
      "Pre-shrunk to retain signature boxy fit through lifetime washes"
    ],
    details: {
      material: "100% GOTS-Certified Organic French Terry Cotton",
      fit: "Relaxed Boxy Fit — size down for a standard tailored fit",
      care: "Machine wash cold with like colors. Hang dry recommended.",
      origin: "Ethically spun and tailored in Guimarães, Portugal"
    },
    shippingInfo: "Free standard shipping over $75. Express delivery available within 1-2 business days.",
    returnInfo: "30-day complimentary returns and exchanges with prepaid shipping labels.",
    images: [
      "assets/images/products/product-01.svg",
      "assets/images/products/product-01-2.svg",
      "assets/images/products/product-01-3.svg"
    ]
  },
  {
    id: "ST002",
    title: "Mulberry Silk Slip Midi Dress",
    slug: "mulberry-silk-slip-midi-dress",
    category: "Dresses",
    subcategory: "Evening & Occasion",
    gender: "Women",
    brand: "ShopTuch Atelier",
    price: 148.00,
    comparePrice: 195.00,
    discount: 24,
    rating: 4.8,
    reviews: 94,
    ratingBreakdown: { 5: 78, 4: 12, 3: 3, 2: 1, 1: 0 },
    colors: [
      { name: "Midnight Champagne", hex: "#D8C5B2" },
      { name: "Obsidian Noir", hex: "#141414" },
      { name: "Emerald Olive", hex: "#3A4D39" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 18,
    sku: "ST-DR-002",
    featured: true,
    bestseller: true,
    newArrival: true,
    trending: true,
    tags: ["dress", "silk", "midi", "evening", "slip", "luxury", "women"],
    description: "Cut on the true bias for a fluid, sculpted contour that glides over the silhouette. Crafted from 19mm pure grade-6A Mulberry silk with delicate adjustable straps and a refined cowl neckline.",
    features: [
      "100% Grade-6A pure 19mm Mulberry silk charmeuse",
      "Bias-cut drape for a flattering, natural silhouette",
      "Adjustable micro-rouleau shoulder straps with gold hardware",
      "Subtle side slit for ease of movement",
      "French-seamed internal construction for friction-free wear"
    ],
    details: {
      material: "100% Mulberry Silk (19 Momme Charmeuse)",
      fit: "True to size. Designed to drape fluidly without hugging tight",
      care: "Dry clean or hand wash cold with silk detergent. Cool iron on reverse.",
      origin: "Crafted in Como, Italy"
    },
    shippingInfo: "Complimentary luxury gift-box packaging included on all Atelier orders.",
    returnInfo: "30-day return policy. Unworn items with security ribbon attached.",
    images: [
      "assets/images/products/product-02.svg",
      "assets/images/products/product-02-2.svg",
      "assets/images/products/product-02-3.svg"
    ]
  },
  {
    id: "ST003",
    title: "Double-Breasted Wool Overcoat",
    slug: "double-breasted-wool-overcoat",
    category: "Outerwear",
    subcategory: "Coats & Trench",
    gender: "Men",
    brand: "ShopTuch Heritage",
    price: 285.00,
    comparePrice: 380.00,
    discount: 25,
    rating: 4.95,
    reviews: 112,
    ratingBreakdown: { 5: 104, 4: 7, 3: 1, 2: 0, 1: 0 },
    colors: [
      { name: "Camel Melton", hex: "#B88E5D" },
      { name: "Charcoal Herringbone", hex: "#32353B" },
      { name: "Midnight Navy", hex: "#17202A" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 14,
    sku: "ST-CT-003",
    featured: true,
    bestseller: true,
    newArrival: false,
    trending: true,
    tags: ["coat", "wool", "outerwear", "tailoring", "men", "camel", "winter"],
    description: "An architectural masterpiece in heavy Italian Melton wool. Designed with peak lapels, horn button fastenings, structured roped shoulders, and a full Bemberg cupro lining for smooth layering over suits or knits.",
    features: [
      "620 GSM Italian virgin Melton wool with water-resistant finish",
      "Full Bemberg cupro jacquard breathable lining",
      "Natural buffalo horn buttons with secure thread cross-stitching",
      "Deep interior passport and phone welt pockets",
      "Single center back vent for walking mobility"
    ],
    details: {
      material: "90% Virgin Wool, 10% Cashmere; Lining: 100% Cupro",
      fit: "Tailored classic overcoat cut — fits comfortably over a suit jacket",
      care: "Specialist dry clean only. Steam refresh recommended.",
      origin: "Tailored in Biella, Northern Italy"
    },
    shippingInfo: "Complimentary signature required courier delivery with breathable garment bag.",
    returnInfo: "30-day complimentary concierge returns and sizing exchange.",
    images: [
      "assets/images/products/product-03.svg",
      "assets/images/products/product-03-2.svg",
      "assets/images/products/product-03-3.svg"
    ]
  },
  {
    id: "ST004",
    title: "Relaxed Japanese Selvedge Denim",
    slug: "relaxed-japanese-selvedge-denim",
    category: "Jeans",
    subcategory: "Trousers & Pants",
    gender: "Men",
    brand: "ShopTuch Heritage",
    price: 120.00,
    comparePrice: 160.00,
    discount: 25,
    rating: 4.75,
    reviews: 86,
    ratingBreakdown: { 5: 68, 4: 14, 3: 3, 2: 1, 1: 0 },
    colors: [
      { name: "Raw Indigo Selvedge", hex: "#1C2D42" },
      { name: "Vintage Stone Wash", hex: "#6C87A3" },
      { name: "Faded Washed Black", hex: "#2A2A2E" }
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    stock: 22,
    sku: "ST-JN-004",
    featured: true,
    bestseller: false,
    newArrival: true,
    trending: true,
    tags: ["denim", "selvedge", "jeans", "pants", "japan", "indigo", "raw"],
    description: "Woven on vintage Toyoda shuttle looms in Kojima, Okayama. 14oz ring-spun denim featuring classic pink-line selvedge ID, donut button fly, and a relaxed straight taper silhouette.",
    features: [
      "14oz Kurabo Japanese shuttle-loom selvedge denim",
      "Pink-line ticker tape selvedge outer seam",
      "Solid copper hand-stamped rivets and donut button fly",
      "Heavyweight natural vegetable-tanned leather waistband patch",
      "Chain-stitched hem on vintage Union Special 43200G machines"
    ],
    details: {
      material: "100% Long-Staple Cotton Selvedge Denim",
      fit: "Relaxed Straight with gentle taper from knee to hem",
      care: "Wear frequently before first wash. Wash inside out in cold water.",
      origin: "Milled in Okayama, Japan; Sewn in Los Angeles"
    },
    shippingInfo: "Ships within 24 hours. Includes custom chainstitch hem length options.",
    returnInfo: "30-day returns accepted on unwashed, unhemmed items.",
    images: [
      "assets/images/products/product-04.svg",
      "assets/images/products/product-04-2.svg",
      "assets/images/products/product-04-3.svg"
    ]
  },
  {
    id: "ST005",
    title: "Merino Wool Ribbed Turtleneck",
    slug: "merino-wool-ribbed-turtleneck",
    category: "Tops",
    subcategory: "Knitwear & Sweaters",
    gender: "Women",
    brand: "ShopTuch Atelier",
    price: 88.00,
    comparePrice: 120.00,
    discount: 27,
    rating: 4.85,
    reviews: 132,
    ratingBreakdown: { 5: 112, 4: 16, 3: 4, 2: 0, 1: 0 },
    colors: [
      { name: "Cream Butter", hex: "#F5F0E6" },
      { name: "Toffee Camel", hex: "#A67A4F" },
      { name: "Charcoal Melange", hex: "#3A3A3D" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 27,
    sku: "ST-KT-005",
    featured: true,
    bestseller: true,
    newArrival: false,
    trending: false,
    tags: ["merino", "wool", "knitwear", "sweater", "turtleneck", "winter", "women"],
    description: "Ultra-fine 19.5 micron Australian Merino wool knit into a tactile 2x2 rib that provides exceptional thermal insulation without bulk. Naturally odor-resistant, breathable, and itch-free.",
    features: [
      "100% Extra-fine Australian Merino wool yarn",
      "Zero-itch ultrafine fibers with silky surface feel",
      "Seamless 3D knit engineering for seamless armhole comfort",
      "Foldover high-rib turtleneck collar that holds its shape",
      "Naturally thermoregulating across autumn through spring"
    ],
    details: {
      material: "100% Extra-Fine Merino Wool (19.5 Micron)",
      fit: "Tailored slim fit designed for effortless tucking into trousers or skirts",
      care: "Hand wash cold with wool wash. Lay flat on dry towel.",
      origin: "Spun in Melbourne, Australia"
    },
    shippingInfo: "Free standard shipping over $75. Eco-friendly recycled packaging.",
    returnInfo: "30-day returns and exchanges supported.",
    images: [
      "assets/images/products/product-05.svg",
      "assets/images/products/product-05-2.svg",
      "assets/images/products/product-05-3.svg"
    ]
  },
  {
    id: "ST006",
    title: "Chelsea Leather Ankle Boot",
    slug: "chelsea-leather-ankle-boot",
    category: "Shoes",
    subcategory: "Boots",
    gender: "Unisex",
    brand: "ShopTuch Studio",
    price: 195.00,
    comparePrice: 260.00,
    discount: 25,
    rating: 4.9,
    reviews: 78,
    ratingBreakdown: { 5: 70, 4: 6, 3: 2, 2: 0, 1: 0 },
    colors: [
      { name: "Full Grain Black", hex: "#111111" },
      { name: "Espresso Suede", hex: "#4A3B32" }
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    stock: 19,
    sku: "ST-SH-006",
    featured: true,
    bestseller: true,
    newArrival: true,
    trending: true,
    tags: ["shoes", "boots", "chelsea", "leather", "unisex", "footwear"],
    description: "Goodyear-welted Chelsea boot in supple calfskin leather with heavy-gauge elastic side gores and dual woven pull tabs. Built on a storm-welted Vibram rubber lug sole for all-weather traction.",
    features: [
      "Full-grain European calfskin leather with natural wax burnish",
      "360-degree Goodyear welt construction (fully resoleable)",
      "High-density Vibram Morflex rubber commando sole",
      "Full calfskin lining and vegetable-tanned leather footbed",
      "Reinforced elastic side webbing for longevity"
    ],
    details: {
      material: "Full-Grain European Calf Leather; Vibram Rubber Sole",
      fit: "Fits true to size. If between sizes, choose the larger size",
      care: "Condition with neutral leather balm. Store with cedar shoe trees.",
      origin: "Handcrafted in Porto, Portugal"
    },
    shippingInfo: "Complimentary express courier with shoe storage dust bags.",
    returnInfo: "30-day returns. Must be tried on indoor carpeted surfaces.",
    images: [
      "assets/images/products/product-06.svg",
      "assets/images/products/product-06-2.svg",
      "assets/images/products/product-06-3.svg"
    ]
  },
  {
    id: "ST007",
    title: "Minimalist Structured Leather Tote",
    slug: "minimalist-structured-leather-tote",
    category: "Accessories",
    subcategory: "Bags & Leather",
    gender: "Unisex",
    brand: "ShopTuch Atelier",
    price: 175.00,
    comparePrice: 240.00,
    discount: 27,
    rating: 4.88,
    reviews: 62,
    ratingBreakdown: { 5: 54, 4: 7, 3: 1, 2: 0, 1: 0 },
    colors: [
      { name: "Tuscan Tan", hex: "#8A5A36" },
      { name: "Piano Black", hex: "#141414" },
      { name: "Alabaster Beige", hex: "#D6CEBF" }
    ],
    sizes: ["One Size"],
    stock: 15,
    sku: "ST-BG-007",
    featured: false,
    bestseller: true,
    newArrival: false,
    trending: true,
    tags: ["bag", "tote", "leather", "accessories", "laptop", "commute", "luxury"],
    description: "An unlined minimalist carryall engineered from buttery Italian vegetable-tanned leather that develops a rich, personalized patina over time. Accommodates up to a 16-inch laptop with interior zipped slip pocket.",
    features: [
      "Italian vegetable-tanned full-grain vacchetta leather",
      "Reinforced handle drop fits comfortably over heavy winter coats",
      "Internal detachable zippered pouch with key leash",
      "Solid brushed brass hardware and protective base studs",
      "Hand-painted and burnished raw edges"
    ],
    details: {
      material: "100% Italian Vegetable Tanned Calfskin",
      fit: "Dimensions: 40cm W x 34cm H x 14cm D. Handle Drop: 26cm",
      care: "Treat with natural leather wax annually. Avoid prolonged water exposure.",
      origin: "Handcrafted in Florence, Italy"
    },
    shippingInfo: "Ships with custom cotton canvas protective dust bag.",
    returnInfo: "30-day complimentary return policy.",
    images: [
      "assets/images/products/product-07.svg",
      "assets/images/products/product-07-2.svg",
      "assets/images/products/product-07-3.svg"
    ]
  },
  {
    id: "ST008",
    title: "Tailored Pleated Wide-Leg Trouser",
    slug: "tailored-pleated-wide-leg-trouser",
    category: "Bottoms",
    subcategory: "Trousers & Pants",
    gender: "Women",
    brand: "ShopTuch Studio",
    price: 98.00,
    comparePrice: 135.00,
    discount: 27,
    rating: 4.82,
    reviews: 104,
    ratingBreakdown: { 5: 88, 4: 12, 3: 4, 2: 0, 1: 0 },
    colors: [
      { name: "Dark Taupe", hex: "#7D7469" },
      { name: "Pitch Black", hex: "#141414" },
      { name: "Cream Stone", hex: "#E0DACE" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 24,
    sku: "ST-TR-008",
    featured: true,
    bestseller: false,
    newArrival: true,
    trending: true,
    tags: ["trouser", "pants", "wide-leg", "pleated", "tailored", "office", "women"],
    description: "High-rise tailored trousers with sharp front double pleats, clean waistband tabs, and an elongated wide-leg profile that creates an effortless fluid drape from waist to shoe.",
    features: [
      "Crease-resistant tropical wool-blend with natural bi-stretch",
      "Interior curtain waistband with extended button tab closure",
      "Deep slant side pockets and clean rear welt pockets",
      "Generous 4cm internal hem allowance for custom length tailoring",
      "High-rise structured fit that elongates the legs"
    ],
    details: {
      material: "60% Wool, 38% Recycled Polyester, 2% Elastane",
      fit: "High-waisted, wide through hip and leg. Floor-length inseam",
      care: "Dry clean or delicate cold machine cycle. Cool iron.",
      origin: "Crafted in Istanbul, Turkey"
    },
    shippingInfo: "Free shipping on orders over $75. Eco packaging.",
    returnInfo: "30-day returns accepted.",
    images: [
      "assets/images/products/product-08.svg",
      "assets/images/products/product-08-2.svg",
      "assets/images/products/product-08-3.svg"
    ]
  },
  {
    id: "ST009",
    title: "Oversized Organic Cotton Oxford Shirt",
    slug: "oversized-organic-cotton-oxford-shirt",
    category: "Shirts",
    subcategory: "Button-Downs",
    gender: "Unisex",
    brand: "ShopTuch Essentials",
    price: 74.00,
    comparePrice: 98.00,
    discount: 24,
    rating: 4.78,
    reviews: 145,
    ratingBreakdown: { 5: 120, 4: 18, 3: 5, 2: 2, 1: 0 },
    colors: [
      { name: "Sky Blue Bengal", hex: "#A8C3D8" },
      { name: "Crisp Optic White", hex: "#FFFFFF" },
      { name: "Sage Stripe", hex: "#B0C2B6" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 40,
    sku: "ST-SH-009",
    featured: false,
    bestseller: true,
    newArrival: false,
    trending: true,
    tags: ["shirt", "oxford", "cotton", "button-down", "unisex", "oversized"],
    description: "Woven from heavy two-ply organic cotton in a traditional basketweave oxford cloth. Features mother-of-pearl buttons, a curved high-low split hem, and a structured button-down collar with generous roll.",
    features: [
      "100% Long-Staple Organic Cotton Oxford Cloth (200 GSM)",
      "Genuine Australian Mother-of-Pearl trocas shell buttons",
      "Single needle lockstitch construction (18 stitches per inch)",
      "Box pleat with locker loop at rear yoke for unrestricted reach",
      "Pre-washed for instant lived-in softness"
    ],
    details: {
      material: "100% Organic Two-Ply Cotton",
      fit: "Relaxed boyfriend/oversized fit. Choose true size for intended drape",
      care: "Machine wash warm, tumble dry low or line dry. Warm iron.",
      origin: "Crafted in Izmir, Turkey"
    },
    shippingInfo: "Standard shipping 3-5 days. Free over $75.",
    returnInfo: "30-day return policy.",
    images: [
      "assets/images/products/product-09.svg",
      "assets/images/products/product-09-2.svg",
      "assets/images/products/product-09-3.svg"
    ]
  },
  {
    id: "ST010",
    title: "Cropped Goose Down Puffer Jacket",
    slug: "cropped-goose-down-puffer-jacket",
    category: "Outerwear",
    subcategory: "Jackets & Puffers",
    gender: "Women",
    brand: "ShopTuch Studio",
    price: 210.00,
    comparePrice: 280.00,
    discount: 25,
    rating: 4.92,
    reviews: 89,
    ratingBreakdown: { 5: 82, 4: 6, 3: 1, 2: 0, 1: 0 },
    colors: [
      { name: "Matte Slate", hex: "#4A5560" },
      { name: "Deep Espresso", hex: "#2E241E" },
      { name: "Glacier Bone", hex: "#E6E2D8" }
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: 16,
    sku: "ST-JK-010",
    featured: true,
    bestseller: false,
    newArrival: true,
    trending: true,
    tags: ["puffer", "jacket", "down", "winter", "outerwear", "warm", "women"],
    description: "Insulated with 750 fill power RDS-certified goose down encased in water-repellent matte Japanese nylon. Features a high protective funnel neck, storm cuffs, and cinchable bungee waist toggles.",
    features: [
      "750 Fill Power Responsible Down Standard (RDS) goose down (90/10)",
      "Ultra-matte Japanese micro-ripstop nylon with DWR finish",
      "Fleece-lined thermal handwarmer storm pockets",
      "Internal elastic drawcord at hem to lock in body heat",
      "Heavy-duty two-way YKK VISLON zipper with storm flap"
    ],
    details: {
      material: "Shell: 100% Recycled Nylon; Fill: 90% Goose Down, 10% Feathers",
      fit: "Boxy cropped silhouette sitting just at top of hips",
      care: "Machine wash cold delicate with down detergent. Tumble dry low with tennis balls.",
      origin: "Engineered in Sendai, Japan"
    },
    shippingInfo: "Complimentary express priority courier delivery.",
    returnInfo: "30-day returns accepted.",
    images: [
      "assets/images/products/product-10.svg",
      "assets/images/products/product-10-2.svg",
      "assets/images/products/product-10-3.svg"
    ]
  },
  {
    id: "ST011",
    title: "Heavyweight Boxy Crewneck Tee",
    slug: "heavyweight-boxy-crewneck-tee",
    category: "Tops",
    subcategory: "T-Shirts",
    gender: "Unisex",
    brand: "ShopTuch Essentials",
    price: 38.00,
    comparePrice: 50.00,
    discount: 24,
    rating: 4.88,
    reviews: 310,
    ratingBreakdown: { 5: 280, 4: 25, 3: 5, 2: 0, 1: 0 },
    colors: [
      { name: "Vintage White", hex: "#F7F5EE" },
      { name: "Washed Black", hex: "#222224" },
      { name: "Earthy Olive", hex: "#4E5340" },
      { name: "Mocha Brown", hex: "#5C4B40" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 85,
    sku: "ST-TS-011",
    featured: false,
    bestseller: true,
    newArrival: false,
    trending: true,
    tags: ["t-shirt", "tee", "heavyweight", "crewneck", "cotton", "essentials", "unisex"],
    description: "The definitive everyday t-shirt. Knitted from ultra-dense 280 GSM combed organic cotton with a 1.25-inch high-rib collar that never sags or rolls over time.",
    features: [
      "280 GSM heavyweight combed ring-spun organic cotton",
      "Thick 1.25\" binded rib collar that stays crisp wash after wash",
      "Drop shoulders with wide elbow-length sleeve profile",
      "Blind-stitched hems for clean seamless finish",
      "Zero chemical garment wash for soft skin touch"
    ],
    details: {
      material: "100% Organic Combed Cotton (280 GSM)",
      fit: "Signature boxy streetwear cut. True to size for relaxed fit",
      care: "Machine wash cold with like colors. Hang dry to maintain shape.",
      origin: "Spun & sewn in Braga, Portugal"
    },
    shippingInfo: "Ships within 24 hours. Multi-buy discount eligible.",
    returnInfo: "30-day return policy.",
    images: [
      "assets/images/products/product-11.svg",
      "assets/images/products/product-11-2.svg",
      "assets/images/products/product-11-3.svg"
    ]
  },
  {
    id: "ST012",
    title: "Acetate Cat-Eye Sunglasses",
    slug: "acetate-cat-eye-sunglasses",
    category: "Accessories",
    subcategory: "Eyewear",
    gender: "Women",
    brand: "ShopTuch Atelier",
    price: 110.00,
    comparePrice: 150.00,
    discount: 26,
    rating: 4.86,
    reviews: 58,
    ratingBreakdown: { 5: 50, 4: 7, 3: 1, 2: 0, 1: 0 },
    colors: [
      { name: "Tortoiseshell Amber", hex: "#7B4B27" },
      { name: "Jet Black Gloss", hex: "#111111" }
    ],
    sizes: ["One Size"],
    stock: 21,
    sku: "ST-EY-012",
    featured: false,
    bestseller: false,
    newArrival: true,
    trending: true,
    tags: ["sunglasses", "eyewear", "accessories", "acetate", "uv", "luxury"],
    description: "Handcrafted from Italian Mazzucchelli biological acetate. Sculpted with bold angular beveled edges, 5-barrel custom hinges, and Carl Zeiss Category 3 polarized UV400 lenses.",
    features: [
      "Mazzucchelli M49 bio-acetate frame (100% biodegradable)",
      "Carl Zeiss CR-39 scratch-resistant polarized lenses (100% UVA/UVB)",
      "Custom 5-barrel gold-plated German OBE barrel hinges",
      "Subtle laser-etched ShopTuch signature inside temple",
      "Includes hard protective leather case and microfiber cleaning cloth"
    ],
    details: {
      material: "Bio-Acetate; Carl Zeiss Optical Lenses",
      fit: "Frame width: 144mm; Bridge: 19mm; Temple length: 145mm",
      care: "Clean with microfiber cloth and lens solution. Keep in case when not in use.",
      origin: "Handcrafted in Cadore, Northern Italy"
    },
    shippingInfo: "Complimentary express courier delivery with hard leather case.",
    returnInfo: "30-day return policy.",
    images: [
      "assets/images/products/product-12.svg",
      "assets/images/products/product-12-2.svg",
      "assets/images/products/product-12-3.svg"
    ]
  },
  {
    id: "ST013",
    title: "Cashmere Oversized Cardigan",
    slug: "cashmere-oversized-cardigan",
    category: "Tops",
    subcategory: "Knitwear & Sweaters",
    gender: "Women",
    brand: "ShopTuch Atelier",
    price: 185.00,
    comparePrice: 245.00,
    discount: 24,
    rating: 4.94,
    reviews: 82,
    ratingBreakdown: { 5: 78, 4: 3, 3: 1, 2: 0, 1: 0 },
    colors: [
      { name: "Oatmeal Melange", hex: "#D6CABA" },
      { name: "Rich Charcoal", hex: "#303033" }
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: 12,
    sku: "ST-KT-013",
    featured: true,
    bestseller: true,
    newArrival: false,
    trending: true,
    tags: ["cashmere", "cardigan", "knitwear", "sweater", "luxury", "women"],
    description: "Spun from 100% Grade-A Mongolian cashmere in a plush 5-gauge fisherman rib. Finished with genuine horn buttons and deep slouchy front patch pockets.",
    features: [
      "100% Grade-A Mongolian Cashmere (15.2 micron fiber fineness)",
      "Plush 5-gauge chunky fisherman rib stitch",
      "Oversized drop shoulders and long cocoon sleeves",
      "Genuine burnt horn buttons securely stitched",
      "Pill-resistant long-staple fibers that soften with every wear"
    ],
    details: {
      material: "100% Grade-A Pure Cashmere",
      fit: "Slouchy oversized cocoon silhouette. True to size for relaxed aesthetic",
      care: "Hand wash cold with cashmere wash. Lay flat on dry towel.",
      origin: "Ethically combed in Inner Mongolia; Spun in Biella, Italy"
    },
    shippingInfo: "Complimentary cedar storage block and dust bag included.",
    returnInfo: "30-day complimentary returns.",
    images: [
      "assets/images/products/product-13.svg",
      "assets/images/products/product-13-2.svg",
      "assets/images/products/product-13-3.svg"
    ]
  },
  {
    id: "ST014",
    title: "Raw Edge Wool Shacket",
    slug: "raw-edge-wool-shacket",
    category: "Jackets",
    subcategory: "Outerwear & Overshirts",
    gender: "Men",
    brand: "ShopTuch Studio",
    price: 135.00,
    comparePrice: 180.00,
    discount: 25,
    rating: 4.8,
    reviews: 64,
    ratingBreakdown: { 5: 54, 4: 8, 3: 2, 2: 0, 1: 0 },
    colors: [
      { name: "Forest Green Plaid", hex: "#2C3D32" },
      { name: "Shadow Houndstooth", hex: "#3B3A36" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 20,
    sku: "ST-JK-014",
    featured: false,
    bestseller: false,
    newArrival: true,
    trending: false,
    tags: ["shacket", "jacket", "wool", "overshirt", "men", "outerwear"],
    description: "The ideal transitional layering layer. Crafted from heavy brushed wool blend featuring oversized utility chest flap pockets and subtle raw edge detailing along the hem.",
    features: [
      "420 GSM recycled wool-blend brushed flannel",
      "Twin military-style buttoned chest flap pockets",
      "Matte black snap-button front closure",
      "Smooth cupro sleeve lining for zero-drag layering over knits"
    ],
    details: {
      material: "70% Recycled Wool, 30% Polyamide",
      fit: "Overshirt fit designed to layer over t-shirts and thick hoodies",
      care: "Dry clean only.",
      origin: "Crafted in Porto, Portugal"
    },
    shippingInfo: "Standard shipping 3-5 days. Free over $75.",
    returnInfo: "30-day return policy.",
    images: [
      "assets/images/products/product-14.svg",
      "assets/images/products/product-14-2.svg",
      "assets/images/products/product-14-3.svg"
    ]
  },
  {
    id: "ST015",
    title: "Minimalist Italian Suede Loafer",
    slug: "minimalist-italian-suede-loafer",
    category: "Shoes",
    subcategory: "Loafers & Flats",
    gender: "Men",
    brand: "ShopTuch Atelier",
    price: 165.00,
    comparePrice: 220.00,
    discount: 25,
    rating: 4.87,
    reviews: 49,
    ratingBreakdown: { 5: 44, 4: 4, 3: 1, 2: 0, 1: 0 },
    colors: [
      { name: "Snuff Suede", hex: "#6E503C" },
      { name: "Midnight Navy", hex: "#1C2430" }
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    stock: 14,
    sku: "ST-SH-015",
    featured: false,
    bestseller: false,
    newArrival: true,
    trending: true,
    tags: ["shoes", "loafers", "suede", "men", "footwear", "summer", "smart"],
    description: "An unlined Belgian-style penny loafer handcrafted in water-repellent velvety snuff suede. Finished with a flexible leather sole with rubber injection inserts for all-day city comfort.",
    features: [
      "Water-repellent European split calfskin suede",
      "Unlined glove-soft interior that molds to your foot",
      "Blake-stitched leather outsole with anti-slip rubber forepart",
      "Memory foam padded arch support footbed"
    ],
    details: {
      material: "Calfskin Suede; Leather Sole with Rubber Inset",
      fit: "Fits true to size. Wear sockless or with no-show socks",
      care: "Brush with brass suede brush. Treat with hydrophobic suede spray.",
      origin: "Crafted in Montegranaro, Italy"
    },
    shippingInfo: "Complimentary signature required delivery.",
    returnInfo: "30-day returns accepted on carpeted trials.",
    images: [
      "assets/images/products/product-15.svg",
      "assets/images/products/product-15-2.svg",
      "assets/images/products/product-15-3.svg"
    ]
  },
  {
    id: "ST016",
    title: "Sculptural Chunky Chain Necklace",
    slug: "sculptural-chunky-chain-necklace",
    category: "Accessories",
    subcategory: "Jewelry",
    gender: "Women",
    brand: "ShopTuch Atelier",
    price: 65.00,
    comparePrice: 88.00,
    discount: 26,
    rating: 4.91,
    reviews: 73,
    ratingBreakdown: { 5: 68, 4: 4, 3: 1, 2: 0, 1: 0 },
    colors: [
      { name: "18K Gold Vermeil", hex: "#D4AF37" },
      { name: "Sterling Silver 925", hex: "#C0C0C0" }
    ],
    sizes: ["One Size"],
    stock: 28,
    sku: "ST-JW-016",
    featured: false,
    bestseller: true,
    newArrival: false,
    trending: true,
    tags: ["jewelry", "necklace", "gold", "silver", "accessories", "women"],
    description: "Bold interlinked cable chain forged from recycled 925 sterling silver plated with an ultra-thick 2.5 micron layer of 18K yellow gold (vermeil). Custom oversized toggle clasp.",
    features: [
      "18K Gold Vermeil (2.5 micron heavy electroplating on 925 Silver)",
      "Custom sculptural T-bar toggle clasp closure",
      "Hypoallergenic, 100% nickel and lead free",
      "Waterproof and anti-tarnish protective coating"
    ],
    details: {
      material: "Recycled 925 Sterling Silver, 18K Yellow Gold",
      fit: "Length: 45cm / 17.7 inches; Link width: 10mm",
      care: "Polish with jewelry cleaning cloth. Keep dry.",
      origin: "Handcrafted in Arezzo, Italy"
    },
    shippingInfo: "Includes luxury velvet gift box.",
    returnInfo: "30-day returns on unworn jewelry.",
    images: [
      "assets/images/products/product-16.svg",
      "assets/images/products/product-16-2.svg",
      "assets/images/products/product-16-3.svg"
    ]
  },
  {
    id: "ST017",
    title: "Belted Trench Coat in Technical Twill",
    slug: "belted-trench-coat-in-technical-twill",
    category: "Outerwear",
    subcategory: "Coats & Trench",
    gender: "Women",
    brand: "ShopTuch Atelier",
    price: 240.00,
    comparePrice: 320.00,
    discount: 25,
    rating: 4.96,
    reviews: 118,
    ratingBreakdown: { 5: 114, 4: 4, 3: 0, 2: 0, 1: 0 },
    colors: [
      { name: "Classic Trench Khaki", hex: "#C7B9A2" },
      { name: "Ink Black", hex: "#111111" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 15,
    sku: "ST-CT-017",
    featured: true,
    bestseller: true,
    newArrival: false,
    trending: true,
    tags: ["trench", "coat", "outerwear", "khaki", "waterproof", "women", "luxury"],
    description: "The definitive modern trench. Cut from high-density water-repellent organic cotton gabardine. Features traditional storm flaps, epaulettes, horn D-ring belt, and a detachable wool collar throat latch.",
    features: [
      "Water-repellent 360 GSM organic cotton gabardine weave",
      "Signature storm flap and deep rain-resistant back yoke",
      "Waist belt with genuine leather-wrapped buckle and D-rings",
      "Deep interior storm pockets with magnetic snap flaps"
    ],
    details: {
      material: "100% Organic Cotton Gabardine; Cupro Lining",
      fit: "Relaxed double-breasted silhouette with room for layering",
      care: "Specialist dry clean only.",
      origin: "Crafted in London, UK"
    },
    shippingInfo: "Complimentary priority courier delivery.",
    returnInfo: "30-day complimentary returns.",
    images: [
      "assets/images/products/product-17.svg",
      "assets/images/products/product-17-2.svg",
      "assets/images/products/product-17-3.svg"
    ]
  },
  {
    id: "ST018",
    title: "French Linen Relaxed Resort Shirt",
    slug: "french-linen-relaxed-resort-shirt",
    category: "Shirts",
    subcategory: "Short Sleeve & Linen",
    gender: "Men",
    brand: "ShopTuch Studio",
    price: 64.00,
    comparePrice: 85.00,
    discount: 25,
    rating: 4.79,
    reviews: 92,
    ratingBreakdown: { 5: 76, 4: 13, 3: 3, 2: 0, 1: 0 },
    colors: [
      { name: "Natural Flax", hex: "#DFD7CA" },
      { name: "Mediterranean Indigo", hex: "#28435C" },
      { name: "Terracotta Rust", hex: "#9E543A" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 35,
    sku: "ST-SH-018",
    featured: false,
    bestseller: false,
    newArrival: true,
    trending: false,
    tags: ["linen", "shirt", "resort", "camp-collar", "summer", "men"],
    description: "Woven from 100% certified Normandy flax linen. Features an open Cuban camp collar, straight vented hem, and natural mother-of-pearl buttons for breezy warm-weather elegance.",
    features: [
      "100% Certified French Normandy Flax Linen (165 GSM)",
      "Camp/Cuban style open spread collar",
      "Straight hem with reinforced side seam gussets",
      "Pre-washed with organic enzymes for supple hand feel"
    ],
    details: {
      material: "100% Normandy Flax Linen",
      fit: "Relaxed boxy resort fit",
      care: "Machine wash cold gentle. Line dry.",
      origin: "Crafted in Normandy, France"
    },
    shippingInfo: "Free shipping over $75.",
    returnInfo: "30-day returns accepted.",
    images: [
      "assets/images/products/product-18.svg",
      "assets/images/products/product-18-2.svg",
      "assets/images/products/product-18-3.svg"
    ]
  },
  {
    id: "ST019",
    title: "Pleated High-Waist Linen Midi Skirt",
    slug: "pleated-high-waist-linen-midi-skirt",
    category: "Bottoms",
    subcategory: "Skirts",
    gender: "Women",
    brand: "ShopTuch Studio",
    price: 82.00,
    comparePrice: 110.00,
    discount: 25,
    rating: 4.83,
    reviews: 67,
    ratingBreakdown: { 5: 58, 4: 7, 3: 2, 2: 0, 1: 0 },
    colors: [
      { name: "Sand Ecru", hex: "#E4DCD0" },
      { name: "Black Noir", hex: "#141414" }
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: 20,
    sku: "ST-SK-019",
    featured: false,
    bestseller: false,
    newArrival: true,
    trending: false,
    tags: ["skirt", "linen", "midi", "pleated", "women", "bottoms"],
    description: "Flowy A-line midi skirt crafted from washed European linen. Detailed with wide sunray pleats, side seam pockets, and a clean flat front waistband with concealed side zip.",
    features: [
      "100% European Heritage Flax Linen",
      "Structured flat front waistband with discrete elastic back",
      "Two deep invisible side-seam pockets",
      "Fully lined with lightweight organic cotton voile"
    ],
    details: {
      material: "100% Linen; Lining: 100% Organic Cotton",
      fit: "High waist, A-line drape reaching mid-calf",
      care: "Machine wash cold gentle. Hang dry.",
      origin: "Crafted in Vilnius, Lithuania"
    },
    shippingInfo: "Standard shipping 3-5 days. Free over $75.",
    returnInfo: "30-day returns accepted.",
    images: [
      "assets/images/products/product-19.svg",
      "assets/images/products/product-19-2.svg",
      "assets/images/products/product-19-3.svg"
    ]
  },
  {
    id: "ST020",
    title: "Italian Calfskin Reversible Dress Belt",
    slug: "italian-calfskin-reversible-dress-belt",
    category: "Accessories",
    subcategory: "Belts & Small Leather",
    gender: "Unisex",
    brand: "ShopTuch Heritage",
    price: 58.00,
    comparePrice: 78.00,
    discount: 26,
    rating: 4.89,
    reviews: 95,
    ratingBreakdown: { 5: 86, 4: 8, 3: 1, 2: 0, 1: 0 },
    colors: [
      { name: "Black / Cognac Tan", hex: "#111111" }
    ],
    sizes: ["85cm (30-32)", "95cm (34-36)", "105cm (38-40)"],
    stock: 30,
    sku: "ST-BL-020",
    featured: false,
    bestseller: true,
    newArrival: false,
    trending: false,
    tags: ["belt", "leather", "reversible", "accessories", "unisex", "tailoring"],
    description: "Two belts in one. Premium Italian smooth full-grain calfskin on one side and rich pebbled cognac tan on the reverse. Fitted with a rotating solid palladium-finished brass buckle.",
    features: [
      "Dual-sided reversible Italian full-grain calfskin leather",
      "Twist-and-lock solid brass buckle in brushed palladium finish",
      "Feathered edge profile (32mm width) suitable for suits and jeans",
      "Precision laser-beveled sizing holes with reinforced core"
    ],
    details: {
      material: "100% Italian Full-Grain Calfskin; Solid Brass Hardware",
      fit: "32mm width. Measure existing belt to middle hole for size",
      care: "Wipe with soft cloth. Treat with natural leather balm.",
      origin: "Crafted in Florence, Italy"
    },
    shippingInfo: "Includes travel dust pouch and gift box.",
    returnInfo: "30-day returns on unworn items.",
    images: [
      "assets/images/products/product-20.svg",
      "assets/images/products/product-20-2.svg",
      "assets/images/products/product-20-3.svg"
    ]
  },
  {
    id: "ST021",
    title: "Minimalist High-Top Leather Sneaker",
    slug: "minimalist-high-top-leather-sneaker",
    category: "Shoes",
    subcategory: "Sneakers",
    gender: "Unisex",
    brand: "ShopTuch Studio",
    price: 155.00,
    comparePrice: 200.00,
    discount: 22,
    rating: 4.92,
    reviews: 110,
    ratingBreakdown: { 5: 102, 4: 7, 3: 1, 2: 0, 1: 0 },
    colors: [
      { name: "All White Monochrome", hex: "#FFFFFF" },
      { name: "Pebbled Off-White / Gum", hex: "#F3EFE6" }
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    stock: 25,
    sku: "ST-SN-021",
    featured: true,
    bestseller: true,
    newArrival: false,
    trending: true,
    tags: ["shoes", "sneakers", "leather", "high-top", "minimalist", "unisex"],
    description: "Crafted from full-grain Italian Nappa leather, stitched to a vulcanized Margom rubber cupsole. Built with waxed cotton laces and an ultra-plush calfskin lining.",
    features: [
      "Italian full-grain Nappa leather upper",
      "Original Italian Margom vulcanized rubber cupsole",
      "Side-stitched sidewall construction for perpetual durability",
      "Ergonomic removable antibacterial leather footbed"
    ],
    details: {
      material: "Full-Grain Nappa Leather; Margom Rubber Sole",
      fit: "Fits true to European sizing. Half sizes size down",
      care: "Wipe with damp cloth and leather sneaker cleaner.",
      origin: "Handmade in Civitanova Marche, Italy"
    },
    shippingInfo: "Complimentary shipping with two sets of waxed laces.",
    returnInfo: "30-day returns on unworn shoes.",
    images: [
      "assets/images/products/product-21.svg",
      "assets/images/products/product-21-2.svg",
      "assets/images/products/product-21-3.svg"
    ]
  },
  {
    id: "ST022",
    title: "Organic Cotton Ribbed Tank",
    slug: "organic-cotton-ribbed-tank",
    category: "Tops",
    subcategory: "Tanks & Camis",
    gender: "Women",
    brand: "ShopTuch Essentials",
    price: 32.00,
    comparePrice: 42.00,
    discount: 24,
    rating: 4.81,
    reviews: 140,
    ratingBreakdown: { 5: 118, 4: 18, 3: 4, 2: 0, 1: 0 },
    colors: [
      { name: "Snow White", hex: "#FFFFFF" },
      { name: "Charcoal Heather", hex: "#3A3A3C" },
      { name: "Warm Almond", hex: "#DEC8B5" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 60,
    sku: "ST-TK-022",
    featured: false,
    bestseller: false,
    newArrival: false,
    trending: true,
    tags: ["tank", "ribbed", "cotton", "tops", "basics", "women"],
    description: "A sculpting everyday essential in a rich 2x2 ribbed organic cotton with just enough stretch. Features a modest scoop neckline and wide bra-friendly straps.",
    features: [
      "95% GOTS-Certified Organic Cotton, 5% Spandex",
      "2x2 dense rib that retains elasticity without stretching out",
      "Bra-friendly wide shoulder strap coverage",
      "Self-fabric bound neckline and armholes"
    ],
    details: {
      material: "95% Organic Cotton, 5% Elastane",
      fit: "Fitted stretch silhouette. True to size",
      care: "Machine wash cold. Tumble dry low.",
      origin: "Crafted in Guimarães, Portugal"
    },
    shippingInfo: "Fast 2-4 day shipping. Free over $75.",
    returnInfo: "30-day returns accepted.",
    images: [
      "assets/images/products/product-22.svg",
      "assets/images/products/product-22-2.svg",
      "assets/images/products/product-22-3.svg"
    ]
  },
  {
    id: "ST023",
    title: "Double-Faced Wool Wrap Coat",
    slug: "double-faced-wool-wrap-coat",
    category: "Outerwear",
    subcategory: "Coats & Trench",
    gender: "Women",
    brand: "ShopTuch Atelier",
    price: 295.00,
    comparePrice: 390.00,
    discount: 24,
    rating: 4.97,
    reviews: 86,
    ratingBreakdown: { 5: 84, 4: 2, 3: 0, 2: 0, 1: 0 },
    colors: [
      { name: "Ivory Cloud", hex: "#EDE8DF" },
      { name: "Caramel Toffee", hex: "#9E6D42" }
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: 11,
    sku: "ST-CT-023",
    featured: true,
    bestseller: true,
    newArrival: true,
    trending: true,
    tags: ["coat", "wool", "wrap", "luxury", "outerwear", "winter", "women"],
    description: "Pure luxury. Hand-stitched double-faced virgin wool that is unlined yet exceptionally warm and weightless. Features an oversized shawl collar, deep patch pockets, and a matching self-tie belt.",
    features: [
      "100% Double-Faced Virgin Merino Wool (580 GSM)",
      "Meticulously hand-split and blind-stitched seams",
      "Generous wrap collar and detachable matching self-belt",
      "Deep drop-in front patch pockets and raglan sleeve construction"
    ],
    details: {
      material: "100% Double-Faced Virgin Wool",
      fit: "Fluid relaxed silhouette cinched at waist with self-tie belt",
      care: "Specialist dry clean only. Steam refresh.",
      origin: "Handcrafted in Florence, Italy"
    },
    shippingInfo: "Complimentary luxury garment bag & priority shipping.",
    returnInfo: "30-day complimentary returns.",
    images: [
      "assets/images/products/product-23.svg",
      "assets/images/products/product-23-2.svg",
      "assets/images/products/product-23-3.svg"
    ]
  },
  {
    id: "ST024",
    title: "Merino Wool Ribbed Beanie",
    slug: "merino-wool-ribbed-beanie",
    category: "Accessories",
    subcategory: "Hats & Scarves",
    gender: "Unisex",
    brand: "ShopTuch Essentials",
    price: 36.00,
    comparePrice: 48.00,
    discount: 25,
    rating: 4.85,
    reviews: 125,
    ratingBreakdown: { 5: 108, 4: 14, 3: 3, 2: 0, 1: 0 },
    colors: [
      { name: "Onyx Black", hex: "#111111" },
      { name: "Cream Oatmeal", hex: "#E8E2D5" },
      { name: "Forest Moss", hex: "#3B4A3E" }
    ],
    sizes: ["One Size"],
    stock: 50,
    sku: "ST-BN-024",
    featured: false,
    bestseller: false,
    newArrival: false,
    trending: true,
    tags: ["beanie", "hat", "merino", "wool", "accessories", "unisex", "winter"],
    description: "Double-layered 100% Extra-fine Merino wool watch cap with an adjustable foldover cuff. Seamless whole-garment construction that sits comfortably without pressure points.",
    features: [
      "100% Extra-Fine Australian Merino Wool",
      "Seamless 3D knit engineering (zero crown bunching)",
      "Double-layered foldover cuff for maximum ear warmth",
      "Naturally moisture-wicking and odor-resistant"
    ],
    details: {
      material: "100% Extra-Fine Merino Wool",
      fit: "Classic fisherman watch cap fit with adjustable turn-up",
      care: "Hand wash cold. Lay flat to dry.",
      origin: "Knitted in Hawick, Scotland"
    },
    shippingInfo: "Fast 2-4 day shipping. Free over $75.",
    returnInfo: "30-day return policy.",
    images: [
      "assets/images/products/product-24.svg",
      "assets/images/products/product-24-2.svg",
      "assets/images/products/product-24-3.svg"
    ]
  },
  {
    id: "ST025",
    title: "Insulated Quilted Puffer Vest",
    slug: "insulated-quilted-puffer-vest",
    category: "Jackets",
    subcategory: "Outerwear & Vests",
    gender: "Unisex",
    brand: "ShopTuch Studio",
    price: 118.00,
    comparePrice: 160.00,
    discount: 26,
    rating: 4.91,
    reviews: 84,
    ratingBreakdown: { 5: 76, 4: 7, 3: 1, 2: 0, 1: 0 },
    colors: [
      { name: "Matte Black", hex: "#141414" },
      { name: "Raw Sandstone", hex: "#D8D1C5" },
      { name: "Forest Pine", hex: "#2C3D32" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 28,
    sku: "ST-VT-025",
    featured: true,
    bestseller: true,
    newArrival: true,
    trending: true,
    tags: ["vest", "puffer", "jacket", "outerwear", "winter", "layering", "unisex"],
    description: "Lightweight thermal insulation in water-repellent Japanese technical ripstop nylon. Features a high stand collar, two-way zipper, and zippered interior security pockets.",
    features: [
      "Water-repellent Japanese micro-ripstop shell with DWR finish",
      "Thermoregulating lightweight recycled insulation",
      "Dual-direction YKK VISLON zipper with corded pull tabs",
      "Elasticated armholes and adjustable hem drawcord"
    ],
    details: {
      material: "Shell: 100% Recycled Nylon; Fill: 100% Eco-Down",
      fit: "Regular fit designed for effortless layering over hoodies or under coats",
      care: "Machine wash cold gentle. Tumble dry low.",
      origin: "Crafted in Porto, Portugal"
    },
    shippingInfo: "Complimentary priority express courier delivery over $75.",
    returnInfo: "30-day returns and size exchanges.",
    images: [
      "assets/images/products/product-10.svg",
      "assets/images/products/product-10-2.svg",
      "assets/images/products/product-10-3.svg"
    ]
  },
  {
    id: "ST026",
    title: "Pleated Relaxed Tapered Chino",
    slug: "pleated-relaxed-tapered-chino",
    category: "Bottoms",
    subcategory: "Trousers & Chinos",
    gender: "Men",
    brand: "ShopTuch Heritage",
    price: 88.00,
    comparePrice: 115.00,
    discount: 23,
    rating: 4.86,
    reviews: 64,
    ratingBreakdown: { 5: 56, 4: 7, 3: 1, 2: 0, 1: 0 },
    colors: [
      { name: "British Khaki", hex: "#C4B293" },
      { name: "Navy Marine", hex: "#1C2430" },
      { name: "Washed Olive", hex: "#4A5243" }
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    stock: 32,
    sku: "ST-TR-026",
    featured: true,
    bestseller: false,
    newArrival: true,
    trending: true,
    tags: ["chino", "trouser", "pants", "bottoms", "pleated", "men", "cotton"],
    description: "Crafted from heavy 310 GSM organic cotton twill with single front pleats, slant hand pockets, and a relaxed rise with gradual taper toward the cuff.",
    features: [
      "310 GSM long-staple organic cotton twill",
      "Single forward pleat for ease of movement",
      "Corozo nut button closure and durable brass zip fly",
      "Reinforced interior binding and split back waistband"
    ],
    details: {
      material: "100% Organic Cotton Twill",
      fit: "Relaxed through seat and thigh with gentle ankle taper",
      care: "Machine wash cold inside out. Hang dry.",
      origin: "Crafted in Izmir, Turkey"
    },
    shippingInfo: "Free standard shipping over $75.",
    returnInfo: "30-day complimentary return policy.",
    images: [
      "assets/images/products/product-04.svg",
      "assets/images/products/product-04-2.svg",
      "assets/images/products/product-04-3.svg"
    ]
  },
  {
    id: "ST027",
    title: "Ribbed Cashmere-Blend Winter Scarf",
    slug: "ribbed-cashmere-blend-winter-scarf",
    category: "Accessories",
    subcategory: "Hats & Scarves",
    gender: "Unisex",
    brand: "ShopTuch Atelier",
    price: 72.00,
    comparePrice: 95.00,
    discount: 24,
    rating: 4.95,
    reviews: 128,
    ratingBreakdown: { 5: 122, 4: 5, 3: 1, 2: 0, 1: 0 },
    colors: [
      { name: "Oatmeal Heather", hex: "#D6CABA" },
      { name: "Pitch Black", hex: "#111111" },
      { name: "Camel Melton", hex: "#B88E5D" }
    ],
    sizes: ["One Size (190cm x 35cm)"],
    stock: 45,
    sku: "ST-SC-027",
    featured: true,
    bestseller: true,
    newArrival: true,
    trending: true,
    tags: ["scarf", "cashmere", "wool", "accessories", "winter", "unisex", "luxury"],
    description: "Ultra-soft 70% virgin wool and 30% Grade-A cashmere knit in a tactile 3D rib with finished self-edges. Provides exceptional warmth without excess bulk.",
    features: [
      "70% Virgin Merino Wool, 30% Mongolian Cashmere",
      "Plush 2x2 ribbed knit construction with substantial hand feel",
      "Generous 190cm length allows double-loop wrapping",
      "Naturally insulating and gentle on sensitive skin"
    ],
    details: {
      material: "70% Virgin Wool, 30% Cashmere",
      fit: "Dimensions: 190cm L x 35cm W",
      care: "Hand wash cold with wool detergent. Lay flat to dry.",
      origin: "Spun in Biella, Northern Italy"
    },
    shippingInfo: "Complimentary luxury gift box packaging.",
    returnInfo: "30-day satisfaction guarantee.",
    images: [
      "assets/images/products/product-24.svg",
      "assets/images/products/product-24-2.svg",
      "assets/images/products/product-24-3.svg"
    ]
  },
  {
    id: "ST028",
    title: "Silk Satin Bias-Cut Slip Skirt",
    slug: "silk-satin-bias-cut-slip-skirt",
    category: "Bottoms",
    subcategory: "Skirts",
    gender: "Women",
    brand: "ShopTuch Atelier",
    price: 115.00,
    comparePrice: 155.00,
    discount: 25,
    rating: 4.93,
    reviews: 98,
    ratingBreakdown: { 5: 92, 4: 5, 3: 1, 2: 0, 1: 0 },
    colors: [
      { name: "Champagne Pearl", hex: "#E8DEC8" },
      { name: "Midnight Noir", hex: "#141414" },
      { name: "Olive Moss", hex: "#4A5243" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 22,
    sku: "ST-SK-028",
    featured: true,
    bestseller: true,
    newArrival: true,
    trending: true,
    tags: ["skirt", "silk", "satin", "slip", "bottoms", "women", "luxury"],
    description: "Cut on the true bias from heavy 19mm pure Mulberry silk satin for a fluid, liquid drape that skims effortlessly over curves. Features an invisible elasticated waistband.",
    features: [
      "100% Pure Mulberry Silk Satin (19 Momme)",
      "True bias-cut construction for a sculpted, fluid drape",
      "Concealed elasticated waistband for seamless comfort",
      "French-seamed internal finishing"
    ],
    details: {
      material: "100% Grade-6A Mulberry Silk",
      fit: "High waist, midi length. Fits true to size",
      care: "Hand wash cold with silk wash or dry clean. Cool iron inside out.",
      origin: "Crafted in Como, Italy"
    },
    shippingInfo: "Complimentary gift box included with Atelier orders.",
    returnInfo: "30-day complimentary return policy.",
    images: [
      "assets/images/products/product-02.svg",
      "assets/images/products/product-02-2.svg",
      "assets/images/products/product-02-3.svg"
    ]
  },
  {
    id: "ST029",
    title: "Handcrafted Tuscan Leather Crossbody Bag",
    slug: "handcrafted-tuscan-leather-crossbody-bag",
    category: "Accessories",
    subcategory: "Bags & Leather",
    gender: "Unisex",
    brand: "ShopTuch Atelier",
    price: 145.00,
    comparePrice: 195.00,
    discount: 25,
    rating: 4.91,
    reviews: 76,
    ratingBreakdown: { 5: 70, 4: 5, 3: 1, 2: 0, 1: 0 },
    colors: [
      { name: "Saddle Tan", hex: "#9E6238" },
      { name: "Piano Noir", hex: "#111111" }
    ],
    sizes: ["One Size"],
    stock: 24,
    sku: "ST-BG-029",
    featured: true,
    bestseller: true,
    newArrival: true,
    trending: true,
    tags: ["bags", "bag", "leather", "crossbody", "accessories", "tote", "handbag"],
    description: "Structured architectural silhouette crafted from butter-soft Tuscan vacchetta leather with solid brass buckle hardware and an adjustable shoulder strap for crossbody or shoulder carry.",
    features: [
      "100% Full-grain Italian vegetable-tanned vacchetta leather",
      "Concealed magnetic front closure with solid brass accent hardware",
      "Internal zippered pocket and dedicated phone slot",
      "Durable natural cotton twill lining with leather binding"
    ],
    details: {
      material: "Full-Grain Italian Vacchetta Calfskin",
      fit: "Dimensions: 26cm W x 18cm H x 8cm D; Strap drop: 45-56cm",
      care: "Treat with natural leather conditioner periodically.",
      origin: "Handcrafted in Florence, Italy"
    },
    shippingInfo: "Includes protective cotton dust cover.",
    returnInfo: "30-day complimentary returns.",
    images: [
      "assets/images/products/product-07.svg",
      "assets/images/products/product-07-2.svg",
      "assets/images/products/product-07-3.svg"
    ]
  },
  {
    id: "ST030",
    title: "Studio Pro Active Noise-Cancelling Headphones",
    slug: "studio-pro-active-noise-cancelling-headphones",
    category: "Electronics",
    subcategory: "Audio & Tech",
    gender: "Unisex",
    brand: "ShopTuch Studio",
    price: 249.00,
    comparePrice: 320.00,
    discount: 22,
    rating: 4.95,
    reviews: 142,
    ratingBreakdown: { 5: 135, 4: 6, 3: 1, 2: 0, 1: 0 },
    colors: [
      { name: "Space Slate", hex: "#1E293B" },
      { name: "Silver Frost", hex: "#E2E8F0" }
    ],
    sizes: ["One Size"],
    stock: 20,
    sku: "ST-EL-030",
    featured: true,
    bestseller: true,
    newArrival: true,
    trending: true,
    tags: ["electronics", "headphones", "audio", "tech", "wireless", "anc"],
    description: "Audiophile-grade 40mm custom planar magnetic drivers enclosed in anodized aluminum and memory foam lambskin earcups. Features hybrid active noise cancellation and 40-hour battery life.",
    features: [
      "High-resolution 40mm custom planar magnetic drivers",
      "Hybrid ANC with environmental transparency audio mode",
      "40-hour fast-charging battery (15 min charge = 6 hours playback)",
      "Premium tactile aluminum dials and lambskin memory cushions"
    ],
    details: {
      material: "Anodized Aerospace Aluminum, Lambskin Memory Foam",
      fit: "Ergonomic over-ear fit with adjustable gimbal pivot",
      care: "Wipe clean with microfiber cloth. Store in magnetic hard case.",
      origin: "Engineered in Kyoto, Japan"
    },
    shippingInfo: "Complimentary express priority courier delivery.",
    returnInfo: "30-day risk-free trial and return guarantee.",
    images: [
      "assets/images/categories/cat-electronics.svg",
      "assets/images/categories/cat-electronics.svg",
      "assets/images/categories/cat-electronics.svg"
    ]
  },
  {
    id: "ST031",
    title: "Sculptural Ceramic Minimalist Arch Vase",
    slug: "sculptural-ceramic-minimalist-arch-vase",
    category: "Home & Living",
    subcategory: "Decor & Ceramics",
    gender: "Unisex",
    brand: "ShopTuch Atelier",
    price: 68.00,
    comparePrice: 90.00,
    discount: 24,
    rating: 4.92,
    reviews: 88,
    ratingBreakdown: { 5: 82, 4: 5, 3: 1, 2: 0, 1: 0 },
    colors: [
      { name: "Sandstone Ecru", hex: "#ECE5DA" },
      { name: "Terracotta Clay", hex: "#B45309" }
    ],
    sizes: ["Medium (24cm)", "Large (32cm)"],
    stock: 26,
    sku: "ST-HM-031",
    featured: true,
    bestseller: true,
    newArrival: true,
    trending: true,
    tags: ["home", "living", "homeliving", "decor", "vase", "ceramic", "nordic"],
    description: "Wheel-thrown Nordic stoneware vase with an architectural arched silhouette and matte textured glaze. Designed as a standalone art object or for dried botanicals.",
    features: [
      "Handcrafted high-fired textured stoneware",
      "Waterproof interior glaze suitable for fresh floral stems",
      "Architectural geometric arch with soft curved bridge",
      "Protective felt pads on underside to protect furniture"
    ],
    details: {
      material: "100% High-Fired Natural Stoneware Ceramic",
      fit: "Dimensions: 20cm W x 25cm H x 8cm D",
      care: "Hand wash with mild soapy water. Air dry.",
      origin: "Crafted in Copenhagen, Denmark"
    },
    shippingInfo: "Ships in heavy reinforced eco-cushioned packaging.",
    returnInfo: "30-day return policy.",
    images: [
      "assets/images/categories/cat-home-living.svg",
      "assets/images/categories/cat-home-living.svg",
      "assets/images/categories/cat-home-living.svg"
    ]
  },
  {
    id: "ST032",
    title: "Cold-Pressed Botanical Radiance Face Oil",
    slug: "cold-pressed-botanical-radiance-face-oil",
    category: "Beauty",
    subcategory: "Skincare & Elixirs",
    gender: "Unisex",
    brand: "ShopTuch Atelier",
    price: 54.00,
    comparePrice: 72.00,
    discount: 25,
    rating: 4.96,
    reviews: 164,
    ratingBreakdown: { 5: 158, 4: 5, 3: 1, 2: 0, 1: 0 },
    colors: [
      { name: "Golden Elixir (30ml)", hex: "#F59E0B" }
    ],
    sizes: ["30ml / 1.0 fl oz", "50ml / 1.7 fl oz"],
    stock: 45,
    sku: "ST-BT-032",
    featured: true,
    bestseller: true,
    newArrival: true,
    trending: true,
    tags: ["beauty", "skincare", "oil", "wellness", "elixir", "organic", "glow"],
    description: "An antioxidant powerhouse formulated with virgin cold-pressed rosehip, squalane, marula, and neroli oils. Restores the lipid barrier and imparts an instant dewy glow.",
    features: [
      "100% Organic certified virgin cold-pressed botanical oils",
      "Rich in Omega 3, 6, 9 and bio-available Vitamin C & E",
      "Fast-absorbing non-comedogenic dry-oil formulation",
      "Housed in UV-protective frosted glass with precision dropper"
    ],
    details: {
      material: "Organic Rosehip, Squalane, Jojoba, Neroli Essential Oil",
      fit: "Suitable for all skin types including sensitive and acne-prone",
      care: "Store in cool place away from direct sunlight.",
      origin: "Formulated in Grasse, France"
    },
    shippingInfo: "Complimentary luxury gift box packaging.",
    returnInfo: "30-day satisfaction guarantee.",
    images: [
      "assets/images/categories/cat-beauty.svg",
      "assets/images/categories/cat-beauty.svg",
      "assets/images/categories/cat-beauty.svg"
    ]
  },
  {
    id: "ST033",
    title: "Sapphire Automatic Minimalist Steel Watch",
    slug: "sapphire-automatic-minimalist-steel-watch",
    category: "Watches",
    subcategory: "Automatic Timepieces",
    gender: "Unisex",
    brand: "ShopTuch Heritage",
    price: 290.00,
    comparePrice: 380.00,
    discount: 24,
    rating: 4.97,
    reviews: 95,
    ratingBreakdown: { 5: 92, 4: 3, 3: 0, 2: 0, 1: 0 },
    colors: [
      { name: "Midnight Noir Dial", hex: "#111827" },
      { name: "Sunray Silver Dial", hex: "#CBD5E1" }
    ],
    sizes: ["38mm Case", "40mm Case"],
    stock: 18,
    sku: "ST-WT-033",
    featured: true,
    bestseller: true,
    newArrival: true,
    trending: true,
    tags: ["watches", "watch", "timepiece", "chronograph", "automatic", "luxury"],
    description: "A masterclass in restraint. 316L surgical stainless steel casing with anti-reflective scratchproof sapphire crystal and Japanese 24-jewel automatic mechanical movement.",
    features: [
      "Japanese Miyota 9015 automatic movement (42-hour power reserve)",
      "Scratch-resistant double-domed sapphire crystal with AR coating",
      "Hand-stitched Italian vegetable-tanned full-grain leather strap",
      "5 ATM / 50M water resistance suitable for daily life"
    ],
    details: {
      material: "316L Surgical Stainless Steel, Sapphire Crystal, Italian Calfskin",
      fit: "Case diameter: 39mm; Thickness: 9.8mm; Lug-to-lug: 46mm",
      care: "Clean case with microfiber cloth. Service movement every 5 years.",
      origin: "Assembled in Geneva, Switzerland"
    },
    shippingInfo: "Includes wooden collector box and certificate of authenticity.",
    returnInfo: "30-day complimentary returns on unworn timepieces.",
    images: [
      "assets/images/categories/cat-watches.svg",
      "assets/images/categories/cat-watches.svg",
      "assets/images/categories/cat-watches.svg"
    ]
  }
];

// Product Data API Helper Functions
const ProductService = {
  // Get all products (merging any admin local storage custom products)
  getAll: function() {
    try {
      const stored = localStorage.getItem('shoptuch_custom_products');
      if (stored) {
        const custom = JSON.parse(stored);
        if (Array.isArray(custom) && custom.length > 0) {
          return [...custom, ...PRODUCTS_DATA];
        }
      }
    } catch (e) {
      console.warn('Error reading custom products from localStorage:', e);
    }
    return PRODUCTS_DATA;
  },

  getById: function(id) {
    if (!id) return null;
    const all = this.getAll();
    const clean = id.toString().toLowerCase().trim();
    return all.find(p => p.id.toLowerCase() === clean || (p.slug && p.slug.toLowerCase() === clean)) || null;
  },

  getBySlug: function(slug) {
    if (!slug) return null;
    const all = this.getAll();
    return all.find(p => p.slug.toLowerCase() === slug.toLowerCase()) || null;
  },

  getFeatured: function(limit = 8) {
    return this.getAll().filter(p => p.featured).slice(0, limit);
  },

  getNewArrivals: function(limit = 8) {
    return this.getAll().filter(p => p.newArrival).slice(0, limit);
  },

  getBestSellers: function(limit = 8) {
    return this.getAll().filter(p => p.bestseller).slice(0, limit);
  },

  getTrending: function(limit = 8) {
    return this.getAll().filter(p => p.trending).slice(0, limit);
  },

  getRelated: function(productId, limit = 4) {
    const current = this.getById(productId);
    if (!current) return this.getFeatured(limit);
    return this.getAll()
      .filter(p => p.id !== current.id && (p.category === current.category || p.gender === current.gender))
      .slice(0, limit);
  },

  getCategories: function() {
    const map = {};
    this.getAll().forEach(p => {
      if (!map[p.category]) {
        map[p.category] = {
          name: p.category,
          count: 0,
          image: `assets/images/categories/cat-${p.category.toLowerCase().replace(/[^a-z0-9]/g, '')}.svg`
        };
      }
      map[p.category].count++;
    });
    return Object.values(map);
  },

  // Currency Management & Formatter
  currencyKey: 'shoptuch_currency',

  getCurrency: function() {
    try {
      return localStorage.getItem(this.currencyKey) || 'USD';
    } catch (e) {
      return 'USD';
    }
  },

  setCurrency: function(curr) {
    try {
      localStorage.setItem(this.currencyKey, curr || 'USD');
    } catch (e) {}
  },

  formatPrice: function(amount, currency = null) {
    const selectedCurrency = currency || this.getCurrency();
    const rates = {
      USD: { symbol: '$', rate: 1.0, position: 'before' },
      EUR: { symbol: '€', rate: 0.92, position: 'after' },
      GBP: { symbol: '£', rate: 0.79, position: 'before' },
      CAD: { symbol: 'CA$', rate: 1.36, position: 'before' },
      AUD: { symbol: 'AU$', rate: 1.52, position: 'before' },
      JPY: { symbol: '¥', rate: 155.0, position: 'before' }
    };

    const cfg = rates[selectedCurrency] || rates.USD;
    const num = Number(amount) || 0;
    const val = num * cfg.rate;
    const converted = selectedCurrency === 'JPY' ? Math.round(val).toLocaleString() : val.toFixed(2);
    
    if (cfg.position === 'after') {
      return `${converted} ${cfg.symbol}`;
    }
    return `${cfg.symbol}${converted}`;
  },

  // Custom Product Storage (for admin / live demo)
  saveCustomProduct: function(product) {
    try {
      const stored = localStorage.getItem('shoptuch_custom_products');
      let custom = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(custom)) custom = [];
      custom.unshift(product);
      localStorage.setItem('shoptuch_custom_products', JSON.stringify(custom));
      return true;
    } catch (e) {
      console.warn('Error saving custom product:', e);
      return false;
    }
  },

  deleteProduct: function(id) {
    try {
      const stored = localStorage.getItem('shoptuch_custom_products');
      if (stored) {
        let custom = JSON.parse(stored);
        if (Array.isArray(custom)) {
          custom = custom.filter(p => p.id !== id);
          localStorage.setItem('shoptuch_custom_products', JSON.stringify(custom));
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  },

  resetCatalog: function() {
    try {
      localStorage.removeItem('shoptuch_custom_products');
    } catch (e) {}
  }
};

// Global export for browser scripts
if (typeof window !== 'undefined') {
  window.PRODUCTS_DATA = PRODUCTS_DATA;
  window.ProductService = ProductService;
}
