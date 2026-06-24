AI Form Builder SaaS
This is a Next.js-powered SaaS application that allows users to generate professional forms in seconds using AI prompts.
Users can customize their forms with various themes, backgrounds, and styles, share them via unique URLs, and manage form responses with export capabilities.


🚀 Features
AI Form Generation: Create full forms (titles, fields, and placeholders) simply by writing a prompt like "student coding workshop registration".
Dynamic Form Editor:
Edit field labels and placeholders.
Add or delete form fields.
Select from multiple Daisy UI themes (e.g., Aqua, Bumblebee, Retro).
Apply gradient backgrounds and custom border styles.
Form Management: Dashboard to view, edit, share, or delete your created forms.
Response Handling:
Live shareable form links for public submission.
View collected responses and export them to Excel (.xlsx).
Advanced Authentication:
Secure sign-in/up via Clerk with social login support (Google, Facebook, etc.).
Optional Social Authentication requirement for form respondents.



🛠️ Tech Stack
Framework: Next.js (App Router).
Language: JavaScript.
AI Engine: Google Gemini API.
Database & ORM: PostgreSQL (Neon DB) with Drizzle ORM.
Styling: Tailwind CSS.
UI Components: Shadcn UI and Daisy UI.
Authentication: Clerk.


⚙️ Prerequisites
Before you begin, ensure you have the following accounts and API keys:
Clerk Account: For authentication keys.
Google AI Studio: For the Gemini API key.
Neon Console: For the PostgreSQL connection string.




🛠️ Installation & Setup
Clone the repository:
Install dependencies:
Configure Environment Variables: Create a .env.local file in the root directory and add the following keys:
Sync the Database Schema: Push the Drizzle schema to your Neon PostgreSQL instance:
Run the Development Server:
Open http://localhost:3000 to see the application.


📜 Available Scripts
npm run dev: Runs the app in development mode.
npm run DB push: Syncs your local Drizzle schema with the remote database.
npm run DB studio: Opens the Drizzle Studio GUI to manage your database records.

You can visit live project at https://form-bot-nine.vercel.app/
📁 Project Structure
/app: Contains the Next.js App Router pages and layouts.
/app/_components: Shared UI components like the Header and Hero section.
/configs: Database connection (Drizzle) and AI model configurations.
/configs/schema.js: PostgreSQL table definitions (Forms and Responses).
/public: Assets like logos and icons.
