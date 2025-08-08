
# ✨ CaptionCraft: Your AI Social Media Assistant ✨

Welcome to CaptionCraft! This is a powerful web application designed to help you create amazing, engaging captions for your social media posts in seconds. Say goodbye to writer's block and hello to viral content!

<br />

<p align="center">
  <img src="https://placehold.co/600x300.png" alt="CaptionCraft Banner" data-ai-hint="application hero illustration" style="border-radius: 10px;"/>
</p>

---

## 🚀 Core Features

- **🤖 AI-Powered Caption Generation**: Simply describe your photo or the vibe you're going for, and our AI will generate multiple creative captions for you.
- **🖼️ Smart Image Analysis**: Upload a photo, and our AI will understand its context to suggest even more relevant and creative captions.
- **🎨 Mood & Tone Selection**: Fine-tune your captions by selecting a mood, such as "Funny," "Professional," or "Excited."
- **🔐 Secure User Accounts**: Sign up and log in to save your generated captions and view your history.
- **🕓 Caption History**: Never lose a great idea! All your generated captions are saved to your profile for easy access later.

---

## 📂 Project Structure Explained

Understanding the layout of the project is key to understanding how it works. Here is a high-level overview of the directory structure and the purpose of each key file.

```
/
├── public/                 # Static assets (images, fonts) - not used in this project
├── src/
│   ├── ai/
│   │   ├── flows/
│   │   │   └── generate-caption.ts # The core AI logic for generating captions
│   │   ├── dev.ts            # Entry point for running Genkit locally
│   │   └── genkit.ts         # Configuration for the Genkit AI framework
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/route.ts # Handles all NextAuth.js authentication routes
│   │   │   │   └── register/route.ts      # API endpoint for new user registration
│   │   │   ├── posts/route.ts      # API endpoint for fetching user's saved posts
│   │   │   └── upload/route.ts     # API endpoint for handling image uploads
│   │   ├── (pages)/          # All the main pages of the application
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   └── ...
│   │   ├── globals.css       # Global styles and Tailwind CSS theme configuration
│   │   └── layout.tsx        # The root layout for the entire application
│   ├── components/
│   │   ├── ui/               # Reusable UI components from ShadCN (Button, Card, etc.)
│   │   ├── auth-form.tsx     # The sign-in and sign-up form component
│   │   ├── auth-modal.tsx    # The modal window that contains the auth form
│   │   ├── caption-card.tsx  # Component to display a single generated caption
│   │   └── caption-generator.tsx # The main interactive component on the homepage
│   ├── context/
│   │   └── AuthModalContext.tsx # Manages the global state for the authentication modal
│   ├── hooks/
│   │   ├── use-mobile.tsx    # Custom hook to detect if the user is on a mobile device
│   │   └── use-toast.ts      # Custom hook for showing notification popups (toasts)
│   ├── lib/
│   │   ├── auth.ts           # The heart of the authentication system (NextAuth.js options)
│   │   ├── db.ts             # Handles the connection to the MongoDB database
│   │   └── utils.ts          # Utility functions, primarily for styling
│   └── models/
│       ├── Post.ts           # Mongoose schema defining the structure of a Post
│       └── User.ts           # Mongoose schema defining the structure of a User
├── .env                      # **CRITICAL**: Stores all secret keys and environment variables
├── next.config.ts            # Configuration file for the Next.js framework
├── package.json              # Lists all project dependencies and scripts
└── tailwind.config.ts        # Configuration file for Tailwind CSS
```

---

## 🛠️ How It Works: A Look Inside the Magic Box

Think of CaptionCraft as a team of little robots working together. Here’s who does what:

### 1. **The User Interface (The "Storefront")**

This is everything you see and interact with in your browser. It's built to be fast, beautiful, and easy to use.

- **Framework**: **Next.js** with **React**. This is like the blueprint and frame of our application, making it structured and interactive. The files in `src/app/(pages)` define the different pages a user can visit. `src/app/layout.tsx` is the main template that wraps every page.
- **Styling**: **Tailwind CSS** & **ShadCN UI**. These are our interior designers. They provide the beautiful buttons, cards, and overall modern look and feel of the app, ensuring it works perfectly on both your computer and your phone. The configuration is in `src/app/globals.css` and `tailwind.config.ts`. The individual, reusable components (like `Button.tsx`, `Card.tsx`) live in `src/components/ui/`.

### 2. **The Brains of the Operation (The "Back Room")**

This part runs on a powerful computer (a server) and does all the heavy lifting.

- **AI Caption Generation**: `src/ai/flows/generate-caption.ts`
  - **What it is**: This is our master wordsmith. It's a special instruction file for our AI.
  - **How it works**: When you ask for captions, this file takes your description and mood, packages it up, and sends it to **Genkit** (`src/ai/genkit.ts`), which is our direct line to the powerful **Google Gemini AI**. The AI thinks for a moment and then sends back a list of creative captions.
  - **Saving Your Work**: If you are logged in, this flow also saves the generated captions to your user account in the database.

- **User Authentication (The "Security Guard")**: `src/lib/auth.ts` & `src/app/api/auth/**`
  - **What it is**: This system manages everything related to user accounts: signing up, logging in, and keeping your session secure.
  - **How it works**: We use a library called **NextAuth.js**. When you sign in, it uses the logic in `src/lib/auth.ts`. This file tells NextAuth how to check your email and password against the database. If they match, it gives you a special, secure "key" (a JWT token) that your browser holds onto. This key proves who you are as you navigate the app, so you don't have to log in on every page. The `src/app/api/auth/register/route.ts` file provides the endpoint for creating a new account.

- **The Database (The "Filing Cabinet")**: `src/lib/db.ts` & `src/models/**`
  - **What it is**: This is where we store all the important information, like user accounts and saved posts.
  - **How it works**: We use **MongoDB**, a powerful and flexible database. The `src/lib/db.ts` file manages the connection to this database. The `models` files (`User.ts`, `Post.ts`) act as templates, telling the app exactly how the data for each user and post should be structured using a library called **Mongoose**.

---

## 🏃‍♀️ Getting Started: How to Run This Project Locally

Follow these steps to set up and run CaptionCraft on your own computer.

### **Step 1: Get the Code**

First, you'll need to have the project files on your machine.

### **Step 2: Install the Tools (Dependencies)**

This project has a list of tools it needs to run. You can install them all with a single command. Open your terminal in the project folder and run:

```bash
npm install
```
This reads the `package.json` file and downloads all the necessary libraries.

### **Step 3: Set Up Your Environment (The Secret Keys)**

The application needs to connect to a database and use special keys for authentication and image uploads. You must provide these keys in a special file.

1.  Find the file named `.env` in the main project folder.
2.  You will see several lines that look like `VARIABLE_NAME="value"`.
3.  You need to replace the placeholder values with your actual secret keys from MongoDB and ImageKit. You also need to create a secret key for NextAuth.

Your `.env` file should look something like this:

```.env
# MongoDB Connection String (replace with your own)
MONGODB_URI="mongodb+srv://<user>:<password>@<cluster-url>/<database-name>"

# NextAuth Secret Key
# Generate a strong secret with: openssl rand -base64 32
NEXTAUTH_SECRET="your-super-secret-key-goes-here"

# ImageKit Configuration (replace with your own keys)
IMAGEKIT_PUBLIC_KEY="your_public_key"
IMAGEKIT_PRIVATE_KEY="your_private_key"
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your_endpoint"
```
**This step is crucial! The app will not run without these keys.**

### **Step 4: Run the Application!**

You are all set! To start the application, run the following command in your terminal:

```bash
npm run dev
```

This will start the development server. You can now open your web browser and navigate to **`http://localhost:9002`** to see CaptionCraft live!

---

Enjoy creating amazing content with CaptionCraft! 💖
