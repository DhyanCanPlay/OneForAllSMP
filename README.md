# One For All SMP Website

This repository contains the source code for the official website of the One For All (OFA) Survival Multiplayer (SMP) Minecraft server, available at `oneforall.social`. This is a modern, responsive landing page built with Next.js to provide server information and attract new players.

## ✨ Features

*   **Live Server Status:** An API route (`/api/status`) uses `minecraft-server-util` to fetch and display the live player count, online status, and maintenance mode of the Minecraft server.
*   **Modern Frontend Stack:** Built with Next.js (App Router), React, and TypeScript for a robust and type-safe codebase.
*   **Responsive Design:** Styled with Tailwind CSS and Shadcn/ui, ensuring a seamless experience across desktop and mobile devices.
*   **Interactive UI:** Features client-side interactivity, including a "Copy IP" button, smooth scrolling, and animations powered by Framer Motion.
*   **Comprehensive Sections:** The site is organized into clear sections:
    *   **Hero:** A cinematic introduction with calls-to-action to join the server and Discord.
    *   **Features:** Highlights the key aspects of the SMP, such as being a public server with no griefing.
    *   **Join Steps:** A step-by-step guide for new players to connect to the server on both Java and Bedrock editions.
    *   **Gallery:** A grid showcasing in-game screenshots of community builds and activities.
    *   **Rules:** A clear list of server rules to ensure fair play.
*   **Community Feedback:** Integrates an embedded Google Form for bug reports, suggestions, and storyline participation.

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dhyancanplay/oneforallsmp.git
    ```

2.  **Navigate into the project directory:**
    ```bash
    cd oneforallsmp
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

The codebase is organized as follows:

*   `/app`: Contains the core application logic, pages, and layout for the Next.js App Router.
    *   `page.tsx`: The main entry point that assembles all the sections of the homepage.
    *   `api/status/route.ts`: The serverless function that provides the live Minecraft server status.
    *   `globals.css`: Global styles, Tailwind CSS directives, and custom theme variables.
*   `/components`: Reusable React components that make up the website's UI.
    *   `HeroSection.tsx`, `FeaturesSection.tsx`, etc.: Components for each major section of the landing page.
    *   `ui/`: A collection of base UI components from Shadcn/ui, such as buttons, cards, and dialogs.
*   `/public`: Static assets like images and the server logo.
*   `/hooks`: Custom React hooks, such as `use-toast` and `use-mobile`.
*   `next.config.mjs`: Configuration file for the Next.js application.
