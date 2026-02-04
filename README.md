<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![LinkedIn][linkedin-shield]][linkedin-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/itsrilay/inventory-manager">
    <img src="https://raw.githubusercontent.com/itsrilay/inventory-manager/main/public/images/logo.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Inventory Manager</h3>

  <p align="center">
    A full-stack inventory management system built with a modern, decoupled architecture.
    <br />
    <br />
    <a href="https://inventory-manager-mrto.onrender.com">View Original Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#project-overview">Project Overview</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- PROJECT OVERVIEW -->

## Project Overview

![Project Screen Shot][project-screenshot]

The application is composed of two main parts:

*   **Backend:** A RESTful API built with **Node.js**, **Express**, and **TypeScript**. It uses **Prisma** as an ORM to communicate with a **PostgreSQL** database.

*   **Frontend:** A dynamic single-page application (SPA) built with **React** and **TypeScript**, bootstrapped with **Vite**. It uses **React Router** for client-side navigation.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

*   [![React][React.js]][React-url]
*   [![Vite][Vite.js]][Vite-url]
*   [![TypeScript][TypeScript.js]][TypeScript-url]
*   [![Express][Express.js]][Express-url]
*   [![Prisma][Prisma.io]][Prisma-url]
*   [![PostgreSQL][PostgreSQL.org]][PostgreSQL-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm
*   PostgreSQL

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/itsrilay/inventory-manager.git
    cd inventory-manager
    ```

2.  **Install Backend Dependencies**
    ```sh
    npm install
    ```

3.  **Install Frontend Dependencies**
    ```sh
    npm install --prefix client
    ```

4.  **Generate Prisma Client**
    This command creates the necessary Prisma Client files in `node_modules`.
    ```sh
    npx prisma generate
    ```

5.  **Set up PostgreSQL Database**
    The following commands should be run as a PostgreSQL superuser (e.g., `postgres`).
    ```sql
    -- 1. Create the user and database
    CREATE ROLE myuser WITH LOGIN PASSWORD 'mypassword';
    CREATE DATABASE inventory_manager;

    -- 2. Connect to the new database
    \c inventory_manager

    -- 3. Grant permissions and ownership to the new user
    GRANT ALL ON SCHEMA public TO myuser;
    ALTER SCHEMA public OWNER TO myuser;
    ```

6.  **Set up Environment Variables**
    Create a `.env` file in the root of the project and add your environment variables:
    ```env
    # Database connection string
    DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/inventory_manager"

    # Port for the Express server (optional, defaults to 3000)
    PORT=3000

    # Demo mode to disable database writes (optional, defaults to false)
    DEMO_MODE=false
    ```

7.  **Sync Database Schema**
    This command reads your `prisma/schema.prisma` file and creates the necessary tables in your database.
    ```sh
    npx prisma db push
    ```

8.  **Seed the Database (Optional)**
    To populate the database with initial sample data, run the seed script:
    ```sh
    npm run seed
    ```

9.  **Start the Application**
    This command will start both the backend API server and the frontend Vite development server concurrently.
    ```sh
    npm run dev:all
    ```

10. **Visit the Application**
    Open a browser and navigate to the frontend URL provided by Vite (usually `http://localhost:5173`).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

This project is distributed under the MIT License - see [LICENSE][license-url] for more details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/ruis2003
[license-shield]: https://img.shields.io/github/license/itsrilay/inventory-manager.svg?style=for-the-badge
[license-url]: https://github.com/itsrilay/inventory-manager/blob/master/LICENSE
[product-screenshot]: public/images/screenshot-project.png

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/
[Vite.js]: https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E
[Vite-url]: https://vitejs.dev/
[TypeScript.js]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[Prisma.io]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[PostgreSQL.org]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/