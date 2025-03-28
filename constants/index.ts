export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Prostore"
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "A modern ecommerce store built with Next.js"
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"

export const GITHUB_REPO_URL =
  process.env.GITHUB_REPO_URL || "https://github.com/naseralmuhana/prostore"

// auth
// export const signInDefaultValues = {
//   email: "user@example.com",
//   password: "123456",
// }
export const signInDefaultValues = {
  email: "admin@example.com",
  password: "123456",
}

// product
export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4

export const productDefaultValues = {
  name: "",
  slug: "",
  category: "",
  images: [],
  brand: "",
  description: "",
  price: "0",
  stock: 0,
  rating: "0",
  numReviews: "0",
  isFeatured: false,
  banner: null,
}

// cart
export const DEFAULT_SHIPPING_PRICE =
  Number(process.env.DEFAULT_SHIPPING_PRICE) || 10
export const DEFAULT_TAX_PERCENTAGE =
  Number(process.env.DEFAULT_TAX_PERCENTAGE) || 0.15

// shipping address
export const shippingAddressDefaultValues = {
  fullName: "",
  streetAddress: "",
  city: "",
  postalCode: "",
  country: "",
}

// payment method
export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(", ")
  : ["PayPal", "Stripe", "CashOnDelivery"]

export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || "PayPal"

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12

// nav-main
export const ADMIN_LINKS = [
  { title: "Dashboard", href: "/admin/dashboard" },
  {
    title: "Products",
    href: "/admin/products",
  },
  {
    title: "Orders",
    href: "/admin/orders",
  },
  {
    title: "Users",
    href: "/admin/users",
  },
]

export const USER_LINKS = [
  { title: "Profile", href: "/user/profile" },
  { title: "Orders", href: "/user/orders" },
]

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(", ")
  : ["admin", "user"]

export const userDefaultValues = {
  name: "",
  email: "",
  role: USER_ROLES[1],
}
