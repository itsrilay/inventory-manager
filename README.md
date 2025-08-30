# Inventory Manager

Inventory management system for an IT store, featuring product and category management.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

`git clone https://github.com/itsrilay/inventory-manager`

2. Navigate to the local repository folder:

`cd inventory-manager`

3. Install dependencies:

`npm install`

4. Set up environment variables:

- `PORT` (Optional, default is 3000): Port on which the app will run.
- `CONNECTION_STRING`: Connection string for the Postgres database.
- `DEMO_MODE`: (true / false) Enable demo mode where DB actions are not performed (useful for live demos).
- `SESSION_SECRET`: A secret key for `express-session`.

5. Seed the database:

`node ./db/populatedb.js`

## Usage

1. Start the app by running:

`node app.js`

2. Open a browser and visit `localhost:PORT` (default `localhost:3000`).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
