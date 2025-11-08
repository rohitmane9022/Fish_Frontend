// lib/data.js - Mock Data

export const categories = [
  {
    _id: "1",
    name: "Fish",
    imageUrl: "/fish.png",
    subcategories: [
      {
        _id: "1a",
        name: "Sea Water Fish",
        imageUrl: "/uploads/seawater-fish.jpg"
      },
      {
        _id: "1b",
        name: "Fresh Water Fish",
        imageUrl: "/uploads/freshwater-fish.jpg"
      },
      {
        _id: "1c",
        name: "Prawns & Crabs",
        imageUrl: "/uploads/prawns.jpg"
      }
    ]
  },
  {
    _id: "2",
    name: "Fresh Chicken Raw",
    imageUrl: "/chicken.png",
    subcategories: []
  },
  {
    _id: "3",
    name: "Zorabian",
    imageUrl: "/uploads/zorabian.jpg",
    subcategories: [
      {
        _id: "3a",
        name: "Raw Chicken",
        imageUrl: "/uploads/zorabian-raw.jpg"
      },
      {
        _id: "3b",
        name: "Ready to Cook Chicken",
        imageUrl: "/uploads/zorabian-ready.jpg"
      }
    ]
  },
  {
    _id: "4",
    name: "Captain Cook",
    imageUrl: "/uploads/captain-cook.jpg",
    subcategories: []
  },
  {
    _id: "5",
    name: "Venky's",
    imageUrl: "/uploads/venkys.jpg",
    subcategories: []
  },
  {
    _id: "6",
    name: "Gadre",
    imageUrl: "/uploads/gadre.jpg",
    subcategories: []
  },
  {
    _id: "7",
    name: "McCain",
    imageUrl: "/uploads/mccain.jpg",
    subcategories: []
  },
  {
    _id: "8",
    name: "Green Peas",
    imageUrl: "/uploads/green-peas.jpg",
    subcategories: []
  },
  {
    _id: "9",
    name: "Paratha",
    imageUrl: "/uploads/paratha.jpg",
    subcategories: []
  }
];

export const products = [
  // Chicken Products
  {
    _id: "690a417a9792b8f196552091",
    name: "Chicken Curry Cut - Small Pieces",
    description: "Fresh chicken curry cut pieces.",
    category: {
      _id: "2",
      name: "Chicken",
      imageUrl: "/uploads/chicken-raw.jpg"
    },
    subcategory: "Chicken",
    tags: ["chicken", "boneless"],
    highlights: ["No preservatives", "Farm fresh"],
    imageUrl: "/Chicken1.png",
    isHit: true,
    weight: "500g",
    pieces: "5-9",
    serves: 3,
    nutrition: {
      energy: "250 kcal",
      carbohydrate: "0g",
      fat: "15g",
      protein: "27g"
    },
    originalPrice: 349,
    price: 299,
    discount: "15%",
    deliveryTime: "Tomorrow 12PM - 2PM",
    v: 0
  },
  {
    _id: "690a412d9792b8f19655208a",
    name: "Chicken Curry Cut - Small Pieces (Large Pack)",
    description: "The ideal pack for all your delicious curry feast.",
    category: {
      _id: "2",
      name: "Chicken",
      imageUrl: "/uploads/chicken-raw.jpg"
    },
    subcategory: "Chicken",
    tags: ["chicken", "boneless"],
    highlights: ["No preservatives", "Farm fresh"],
    imageUrl: "/Chicken1.png",
    isHit: true,
    weight: "1000g",
    pieces: "24-36",
    serves: 6,
    nutrition: {
      energy: "250 kcal",
      carbohydrate: "0g",
      fat: "15g",
      protein: "27g"
    },
    originalPrice: 365,
    price: 322,
    discount: "12%",
    deliveryTime: "Today 12PM - 2PM",
    v: 0
  },
  {
    _id: "690a41b49792b8f196552092",
    name: "Chicken Breast - Boneless",
    description: "Enjoy tender pieces of juicy chicken breast.",
    category: {
      _id: "2",
      name: "Chicken",
      imageUrl: "/uploads/chicken-raw.jpg"
    },
    subcategory: "Chicken",
    tags: ["chicken", "boneless", "breast"],
    highlights: ["No preservatives", "Farm fresh"],
    imageUrl: "/Chicken1.png",
    isHit: false,
    weight: "450g",
    pieces: "2-4",
    serves: 4,
    nutrition: {
      energy: "165 kcal",
      carbohydrate: "0g",
      fat: "3.6g",
      protein: "31g"
    },
    originalPrice: 311,
    price: 274,
    discount: "12%",
    deliveryTime: "Today 12PM - 2PM",
    v: 0
  },
  {
    _id: "prod_chicken_4",
    name: "Chicken Boneless & Mince",
    description: "Fresh boneless chicken and minced meat.",
    category: {
      _id: "2",
      name: "Chicken",
      imageUrl: "/uploads/chicken-raw.jpg"
    },
    subcategory: "Boneless & Mince",
    tags: ["chicken", "boneless", "mince"],
    highlights: ["No preservatives", "Farm fresh"],
    imageUrl: "/Chicken1.png",
    isHit: false,
    weight: "500g",
    pieces: "N/A",
    serves: 4,
    nutrition: {
      energy: "200 kcal",
      carbohydrate: "0g",
      fat: "12g",
      protein: "25g"
    },
    originalPrice: 280,
    price: 245,
    discount: "13%",
    deliveryTime: "Today 12PM - 2PM",
    v: 0
  },
  {
    _id: "prod_chicken_5",
    name: "Chicken Speciality Cuts",
    description: "Premium specialty chicken cuts.",
    category: {
      _id: "2",
      name: "Chicken",
      imageUrl: "/uploads/chicken-raw.jpg"
    },
    subcategory: "Speciality Cuts",
    tags: ["chicken", "specialty"],
    highlights: ["Premium cuts", "Farm fresh"],
    imageUrl: "/Chicken1.png",
    isHit: true,
    weight: "400g",
    pieces: "6-8",
    serves: 3,
    nutrition: {
      energy: "220 kcal",
      carbohydrate: "0g",
      fat: "14g",
      protein: "26g"
    },
    originalPrice: 320,
    price: 275,
    discount: "14%",
    deliveryTime: "Tomorrow 8AM - 10AM",
    v: 0
  },

  // Fish Products - Sea Water
  {
    _id: "prod_fish_1",
    name: "Pomfret - Whole",
    description: "Fresh sea water pomfret fish.",
    category: {
      _id: "1",
      name: "Fish",
      imageUrl: "/uploads/fish-category.jpg"
    },
    subcategory: "Sea Water Fish",
    tags: ["fish", "seafood", "seawater"],
    highlights: ["Fresh catch", "Daily delivery"],
    imageUrl: "/Chicken1.png",
    isHit: true,
    weight: "500g",
    pieces: "2-3",
    serves: 3,
    nutrition: {
      energy: "180 kcal",
      carbohydrate: "0g",
      fat: "8g",
      protein: "28g"
    },
    originalPrice: 450,
    price: 399,
    discount: "11%",
    deliveryTime: "Today 2PM - 4PM",
    v: 0
  },
  {
    _id: "prod_fish_2",
    name: "Surmai / King Fish Steak",
    description: "Premium king fish steak.",
    category: {
      _id: "1",
      name: "Fish",
      imageUrl: "/uploads/fish-category.jpg"
    },
    subcategory: "Sea Water Fish",
    tags: ["fish", "seafood", "seawater"],
    highlights: ["Fresh catch", "Daily delivery"],
    imageUrl: "/Chicken1.png",
    isHit: true,
    weight: "500g",
    pieces: "4-5",
    serves: 4,
    nutrition: {
      energy: "190 kcal",
      carbohydrate: "0g",
      fat: "9g",
      protein: "26g"
    },
    originalPrice: 550,
    price: 495,
    discount: "10%",
    deliveryTime: "Today 2PM - 4PM",
    v: 0
  },

  // Fish Products - Fresh Water
  {
    _id: "prod_fish_3",
    name: "Rohu - Curry Cut",
    description: "Fresh water rohu fish curry cut.",
    category: {
      _id: "1",
      name: "Fish",
      imageUrl: "/uploads/fish-category.jpg"
    },
    subcategory: "Fresh Water Fish",
    tags: ["fish", "freshwater"],
    highlights: ["Fresh catch", "Daily delivery"],
    imageUrl: "/Chicken1.png",
    isHit: false,
    weight: "500g",
    pieces: "8-10",
    serves: 4,
    nutrition: {
      energy: "170 kcal",
      carbohydrate: "0g",
      fat: "7g",
      protein: "25g"
    },
    originalPrice: 280,
    price: 249,
    discount: "11%",
    deliveryTime: "Today 2PM - 4PM",
    v: 0
  },

  // Prawns
  {
    _id: "prod_prawn_1",
    name: "Medium Prawns",
    description: "Fresh medium-sized prawns.",
    category: {
      _id: "1",
      name: "Fish",
      imageUrl: "/uploads/fish-category.jpg"
    },
    subcategory: "Prawns & Crabs",
    tags: ["prawns", "seafood"],
    highlights: ["Fresh catch", "Cleaned"],
    imageUrl: "/Chicken1.png",
    isHit: true,
    weight: "500g",
    pieces: "25-30",
    serves: 4,
    nutrition: {
      energy: "100 kcal",
      carbohydrate: "1g",
      fat: "1g",
      protein: "24g"
    },
    originalPrice: 380,
    price: 340,
    discount: "11%",
    deliveryTime: "Today 2PM - 4PM",
    v: 0
  },

  // Zorabian Products
  {
    _id: "prod_zorabian_1",
    name: "Zorabian Chicken Sausages",
    description: "Premium chicken sausages ready to cook.",
    category: {
      _id: "3",
      name: "Zorabian",
      imageUrl: "/uploads/zorabian.jpg"
    },
    subcategory: "Ready to Cook Chicken",
    tags: ["ready-to-cook", "chicken", "sausages"],
    highlights: ["Ready to cook", "Premium quality"],
    imageUrl: "/Chicken1.png",
    isHit: true,
    weight: "250g",
    pieces: "6",
    serves: 2,
    nutrition: {
      energy: "220 kcal",
      carbohydrate: "5g",
      fat: "18g",
      protein: "12g"
    },
    originalPrice: 180,
    price: 160,
    discount: "11%",
    deliveryTime: "Tomorrow 8AM - 10AM",
    v: 0
  },
  {
    _id: "prod_zorabian_2",
    name: "Zorabian Chicken Nuggets",
    description: "Crispy chicken nuggets.",
    category: {
      _id: "3",
      name: "Zorabian",
      imageUrl: "/uploads/zorabian.jpg"
    },
    subcategory: "Ready to Cook Chicken",
    tags: ["ready-to-cook", "chicken", "nuggets"],
    highlights: ["Ready to cook", "Kids favorite"],
    imageUrl: "/Chicken1.png",
    isHit: false,
    weight: "300g",
    pieces: "15",
    serves: 3,
    nutrition: {
      energy: "240 kcal",
      carbohydrate: "15g",
      fat: "14g",
      protein: "16g"
    },
    originalPrice: 200,
    price: 175,
    discount: "13%",
    deliveryTime: "Tomorrow 8AM - 10AM",
    v: 0
  },

  // Captain Cook
  {
    _id: "prod_captain_1",
    name: "Captain Cook Fish Fingers",
    description: "Crispy fish fingers ready to fry.",
    category: {
      _id: "4",
      name: "Captain Cook",
      imageUrl: "/uploads/captain-cook.jpg"
    },
    subcategory: "Ready to Cook",
    tags: ["ready-to-cook", "fish", "fingers"],
    highlights: ["Ready to cook", "Crispy"],
    imageUrl: "/Chicken1.png",
    isHit: true,
    weight: "400g",
    pieces: "12",
    serves: 3,
    nutrition: {
      energy: "210 kcal",
      carbohydrate: "20g",
      fat: "10g",
      protein: "14g"
    },
    originalPrice: 250,
    price: 220,
    discount: "12%",
    deliveryTime: "Tomorrow 8AM - 10AM",
    v: 0
  },

  // Venky's
  {
    _id: "prod_venkys_1",
    name: "Venky's Chicken Salami",
    description: "Premium chicken salami.",
    category: {
      _id: "5",
      name: "Venky's",
      imageUrl: "/uploads/venkys.jpg"
    },
    subcategory: "Ready to Cook",
    tags: ["ready-to-cook", "chicken", "salami"],
    highlights: ["Ready to eat", "Premium"],
    imageUrl: "/Chicken1.png",
    isHit: false,
    weight: "200g",
    pieces: "N/A",
    serves: 2,
    nutrition: {
      energy: "280 kcal",
      carbohydrate: "3g",
      fat: "22g",
      protein: "18g"
    },
    originalPrice: 150,
    price: 135,
    discount: "10%",
    deliveryTime: "Tomorrow 8AM - 10AM",
    v: 0
  },

  // Gadre
  {
    _id: "prod_gadre_1",
    name: "Gadre Crab Sticks",
    description: "Delicious crab sticks.",
    category: {
      _id: "6",
      name: "Gadre",
      imageUrl: "/uploads/gadre.jpg"
    },
    subcategory: "Ready to Cook",
    tags: ["ready-to-cook", "seafood", "crab"],
    highlights: ["Ready to eat", "Seafood"],
    imageUrl: "/Chicken1.png",
    isHit: true,
    weight: "250g",
    pieces: "10",
    serves: 2,
    nutrition: {
      energy: "120 kcal",
      carbohydrate: "8g",
      fat: "2g",
      protein: "18g"
    },
    originalPrice: 180,
    price: 160,
    discount: "11%",
    deliveryTime: "Tomorrow 8AM - 10AM",
    v: 0
  },

  // McCain
  {
    _id: "prod_mccain_1",
    name: "McCain French Fries",
    description: "Crispy golden french fries.",
    category: {
      _id: "7",
      name: "McCain",
      imageUrl: "/uploads/mccain.jpg"
    },
    subcategory: "Ready to Cook",
    tags: ["ready-to-cook", "fries", "potato"],
    highlights: ["Quick cook", "Crispy"],
    imageUrl: "/Chicken1.png",
    isHit: true,
    weight: "420g",
    pieces: "N/A",
    serves: 3,
    nutrition: {
      energy: "312 kcal",
      carbohydrate: "45g",
      fat: "13g",
      protein: "4g"
    },
    originalPrice: 160,
    price: 145,
    discount: "9%",
    deliveryTime: "Tomorrow 8AM - 10AM",
    v: 0
  },

  // Green Peas
  {
    _id: "prod_peas_1",
    name: "Green Peas - Frozen",
    description: "Fresh frozen green peas.",
    category: {
      _id: "8",
      name: "Green Peas",
      imageUrl: "/uploads/green-peas.jpg"
    },
    subcategory: "Frozen Vegetables",
    tags: ["vegetables", "frozen", "peas"],
    highlights: ["Fresh frozen", "No preservatives"],
    imageUrl: "/Chicken1.png",
    isHit: false,
    weight: "500g",
    pieces: "N/A",
    serves: 4,
    nutrition: {
      energy: "81 kcal",
      carbohydrate: "14g",
      fat: "0.4g",
      protein: "5g"
    },
    originalPrice: 80,
    price: 70,
    discount: "13%",
    deliveryTime: "Tomorrow 8AM - 10AM",
    v: 0
  },

  // Paratha
  {
    _id: "prod_paratha_1",
    name: "Aloo Paratha",
    description: "Delicious potato stuffed paratha.",
    category: {
      _id: "9",
      name: "Paratha",
      imageUrl: "/uploads/paratha.jpg"
    },
    subcategory: "Ready to Cook",
    tags: ["paratha", "ready-to-cook", "indian"],
    highlights: ["Ready to cook", "Authentic taste"],
    imageUrl: "/Chicken1.png",
    isHit: true,
    weight: "400g",
    pieces: "4",
    serves: 2,
    nutrition: {
      energy: "290 kcal",
      carbohydrate: "42g",
      fat: "11g",
      protein: "6g"
    },
    originalPrice: 120,
    price: 105,
    discount: "13%",
    deliveryTime: "Tomorrow 8AM - 10AM",
    v: 0
  }
];

// Helper functions
export const getProductById = (id) => {
  return products.find(product => product._id === id);
};

export const getProductsByCategory = (categoryId) => {
  return products.filter(product => product.category._id === categoryId);
};

export const getProductsBySubcategory = (subcategory) => {
  return products.filter(product => product.subcategory === subcategory);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.isHit);
};

export const getCategoryById = (id) => {
  return categories.find(category => category._id === id);
};

export const increaseProductQuantity = (id) => {
  const product = products.find((p) => p._id === id);
  if (product) {
    product.quantity += 1;
    return product.quantity;
  }
  return null;
};

export const decreaseProductQuantity = (id) => {
  const product = products.find((p) => p._id === id);
  if (product && product.quantity > 1) {
    product.quantity -= 1;
    return product.quantity;
  }
  return product ? product.quantity : null;
};