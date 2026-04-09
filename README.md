# LocalLink Marketplace

LocalLink is a premium, full-stack local services marketplace that seamlessly connects clients seeking specialized tasks (plumbing, web development, painting, etc.) with trusted, local professionals. 

Built with the MERN stack (MongoDB, Express, React, Node.js), LocalLink heavily emphasizes scalable pagination architecture, beautiful modern reactive UI using TailwindCSS, and role-based access control routing architectures.

## ✨ Features

- **Role-Based Workflows**: Separate, heavily gated dashboards for `Clients`, `Providers`, and `Admins`.
- **Intelligent Real-time Sorting & Pagination**: Robust server-side pagination utilizing Mongoose pipelines (`limit`, `skip`), integrated cleanly into dynamic React functional components. Features "Sort by Newest", "Price: High to Low", etc.
- **Service Listings System**: Providers can post up to 3 services with rich details, categories, and varied hourly rates.
- **Hiring & Job Mechanics**: Clients can request hires, generating a "Job". Providers have full control to accept/decline jobs dynamically on their interface.
- **Admin Supervision Control panel**: System-level Administrators get real-time stats of users and network listings, alongside powers to instantly delete users, or flag/suspend pending, inactive, or unverified listings.
- **JWT Authorization**: All secured API calls require validated backend Bearer JSON Web Tokens.

## 🚀 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Lucide Icons, Axios, React Router Dom
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Cloud/Atlas), Mongoose
- **Security:** JWT (JSON Web Tokens), bcryptjs

---

## 💻 Local Development Setup

To run this platform locally on your own machine, follow these simple steps.

### 1. Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v16.x or newer recommended)
- npm or yarn
- A MongoDB cluster or local MongoDB instance (Your URI string will be required).

### 2. Environment Setup

Inside the `/server` directory, create a `.env` file that satisfies these internal demands:

```env
PORT=5000
MONGO_URI=your_mongodb_cluster_string_here
JWT_SECRET=your_super_secret_jwt_key
```

### 3. Installation

You will need two dedicated terminal windows running concurrently.

**Terminal 1 (Backend Server):**
```bash
cd server
npm install
npm run dev
```

**Terminal 2 (Frontend React App):**
```bash
cd client
npm install
npm run dev
```

### 4. Database Seeding (Demo Data)

If you've connected to a blank MongoDB instance, you can auto-populate it with dummy metrics, services, and roles to test the user interface immediately.

Run the custom script inside the root of your `server/` module:
```bash
cd server
node seed.js
```
*This will inject an Admin, Users, Providers, Multiple Listings, and History data automatically. Reference Demo_Accounts.md for credentials.*

---

## 🛠 Project Structure Overview

```text
LocalLink/                 # Root wrapper
├── client/                # React Frontend 
│   ├── src/               # Application logic
│   │   ├── components/    # Reusable UI parts (Pagination, Modals, ServiceCards)
│   │   ├── context/       # AuthContext for Token routing states
│   │   └── pages/         # Major dashboard and functional views 
│   └── package.json       # React Dependencies
│
├── server/                # Node.js + Express Backend
│   ├── config/            # DB Configuration logic (DNS Resolvers)
│   ├── controllers/       # Functional endpoints (Auth, Admin, Jobs, Services)
│   ├── models/            # Mongoose Schemas (User, Job, Service)
│   ├── routes/            # External API Gateway mapping
│   ├── seed.js            # Dummy data injector
│   └── index.js           # Server Initialization
└── README.md              # You are here!
```

---

## ⚖️ License
This projected is intended for demonstration, testing, and portfolio purposes.
