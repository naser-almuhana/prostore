# ProStore - Fullstack eCommerce Platform

ProStore is a full-stack eCommerce website built with **Next.js 15**,**React 19**, **Prisma**, **TailwindCSS v4**, **Stripe**, **PayPal**, and more. It allows users to browse products, manage their carts, and complete purchases with various payment methods. The platform includes an admin dashboard for managing products, orders, and users.

## 🌟 Live Demo

- [Main Store](https://prostore-alpha-two.vercel.app/)
- [Sample Product](https://prostore-alpha-two.vercel.app/product/polo-sporting-stretch-shirt)
- [Product Search](https://prostore-alpha-two.vercel.app/search?q=all&category=Men%27s+Dress+Shirts&price=1-50&rating=all&sort=newest&page=1)
- [Checkout Flow](https://prostore-alpha-two.vercel.app/cart) → [Shipping](https://prostore-alpha-two.vercel.app/shipping-address) → [Payment](https://prostore-alpha-two.vercel.app/payment-method) → [place-order](https://prostore-alpha-two.vercel.app/place-order)

## 🚀 Features

### 🛍️ Customer Experience

| Feature                | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| **Product Discovery**  | Search by name/category, filter by price/rating, sort options |
| **Rich Product Pages** | Image galleries, reviews, availability status                 |
| **Smart Cart**         | Guest cart → user cart on login, real-time price updates      |
| **Checkout Flow**      | 3-step process: Shipping → Payment → Review                   |
| **Order Tracking**     | View order status, payment confirmation, delivery updates     |

### 💻 Admin Dashboard

| Feature                | Description                                      |
| ---------------------- | ------------------------------------------------ |
| **Analytics**          | Sales charts, revenue metrics, customer insights |
| **Product Management** | CRUD operations for product catalog              |
| **Order Processing**   | Update payment/delivery status, view all orders  |
| **User Management**    | View users, modify roles, manage access          |

### 💳 Payment Options

| Method               | Features                                        |
| -------------------- | ----------------------------------------------- |
| **PayPal**           | Secure checkout, automatic payment confirmation |
| **Stripe**           | Credit card processing, PCI-compliant           |
| **Cash on Delivery** | Admin-marked payment status                     |

### ✉️ Notifications

- Email receipts with order details
- Toast notifications for all user actions

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 (App Router) - React 19
- **UI**: ShadCN components
- **Styling**: TailwindCSS v4
- **State**: React Server Components
- **Forms**: React Hook Form + Zod + Uploadthing

### Backend

- **ORM**: Prisma
- **Database**: PostgreSQL (NeonDB)
- **Auth**: NextAuth.js
- **Payments**: Stripe & PayPal & Cash on Delivery
- **Emails**: Resend + React Email

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or later)
- **NeonDB Account** (Postgresql)
- **Stripe & PayPal Developer Accounts** for payment integrations
- **Resend Developer Account** for email notifications

### Installation

Follow these steps to get the application up and running locally:

1. **Clone the Repository**

   Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/prostore.git
   cd prostore
   ```

2. **Install Dependencies**

   Install the required dependencies using npm or yarn:

   ```bash
   npm install
   or
   yarn install
   ```

3. **Set Up Environment Variables**

   Copy the .env.example file to .env and fill in your environment variables as described below:

   ```bash
   cp .env.example .env
   ```

   Update the .env file with the necessary values. This file contains crucial information such as your database connection URL, Stripe/PayPal credentials, and other keys. You will need to create accounts for services like Stripe, PayPal, and Resend to obtain these credentials. For more details about the environment variables, please see the [Explanation of Environment Variables](#explanation-of-environment-variables) section.
   <br>

4. **Run Database Migrations**

   Run Prisma migrations to set up the database schema:

   ```bash
   npx prisma migrate dev
   ```

   If you'd like to seed the database with sample data (optional), run:

   ```bash
   npx tsx ./db/seed.ts
   ```

5. **Start the Development Server**

   For local development, run the following:

   ```bash
   npm run dev
   ```

   Your app will be available at http://localhost:3000
   <br>

6. **Build and Deploy for Production**

   To build the app for production:

   ```bash
   npm run build
   ```

   After building, you can start the app in production mode:

   ```bash
   npm run start
   ```

   This will serve the app optimized for production.

## Explanation of Environment Variables

Here’s a brief explanation of each environment variable in your `.env` file:

### General Configuration

- `NEXT_PUBLIC_APP_NAME`: Name of your app (public-facing).
- `NEXT_PUBLIC_APP_DESCRIPTION`: Description of your app (public-facing).
- `NEXT_PUBLIC_SERVER_URL`: URL of your server (base URL for API requests).

### Authentication & Security

- `AUTH_SECRET`: A secret used for signing and verifying tokens.
- `AUTH_TRUST_HOST`: Used to trust the host (usually set to true or a specific domain).
- `ENCRYPTION_KEY`: Key used for encrypting sensitive data.

### Database Configuration

- `DATABASE_URL`: The connection string to your database (e.g., PostgreSQL, MySQL, etc.).

### Payment Configuration

- `PAYMENT_METHODS`: List of accepted payment methods (e.g., PayPal, Stripe).
- `DEFAULT_PAYMENT_METHOD`: The default payment method to be used in the app.

### PayPal Integration

- `PAYPAL_API_URL`: The PayPal API URL to communicate with.
- `PAYPAL_CLIENT_ID`: Your PayPal client ID for OAuth integration.
- `PAYPAL_APP_SECRET`: The secret associated with your PayPal app for authentication.

### Stripe Integration

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: The publishable Stripe key, exposed on the client side.
- `STRIPE_SECRET_KEY`: The secret Stripe key, used for server-side authentication.

### File Upload

- `UPLOADTHING_TOKEN`: Token used for authentication with your file upload service.
- `UPLOADTHING_SECRET`: Secret key for file uploads.
- `UPLOADTHING_APPID`: The app ID for UploadThing.

### Email Service

- `RESEND_API_KEY`: API key for sending emails using Resend.
- `SENDER_EMAIL`: The email address used to send notifications and receipts.

### Other Configuration

- `NEXT_PUBLIC_TARGET_DATE`: A public-facing target date (likely for countdown timers or promotions).
