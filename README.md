# Sab Fits

## Project Description

"Sab Fits" is a full-stack online clothing store complete with real credit checkout. Users can search, sell, add to cart, and checkout their favorite items.

## Features

- User Authentication and Permissions
- Real Credit Card Checkout
- Image Uploads
- Sending Email
- Relational GraphQL Queries

## Models

The application includes six main models:

- **Users**
- **Items**
- **Orders**
- **CartItems**
- **OrderItems**
- **Roles**

## Technologies Used

### Frontend

- **React.js**: Building the user interface
- **Next.js**: Server-side rendering, routing, and tooling
- **Styled Components**: Styling
- **Context API**: Managing local state
- **Apollo Client**: Data management, performing GraphQL mutations, fetching data, caching, and handling error/loading states

### Backend

- **Keystone.js**: Node.js based GraphQL server and headless CMS
  - Admin interface to manage data
  - Provides GraphQL CRUD APIs for database
  - Schema definition and data relationships
  - Custom server-side logic
- **Stripe**: Charging credit cards
- **Node.js**: Backend runtime environment

### Testing

- **Jest**
- **React Testing Library**

## Setup Instructions

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up environment variables
4. Start the development server with `npm run dev`

## Contributions

Contributions are welcome. Please open an issue or submit a pull request.
