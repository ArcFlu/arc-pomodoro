
# Arc-Pomodoro

Arc-Pomodoro is a Pomodoro web app designed to help users improve their productivity through time management techniques. This project is built with Next.js.

---

## Getting Started 🚀

### Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Git](https://git-scm.com/)
- [pnpm](https://pnpm.io/) (You can install pnpm globally by running the following command):
  
  ```bash
  npm install -g pnpm
  ```

### Installation

1. Clone the repository:
   
   ```bash
   git clone https://github.com/your-repo-name/arc-pomodoro.git
   cd arc-pomodoro
   ```

2. Install dependencies:
   
   ```bash
   pnpm install
   ```

3. Start the development server:
   
   ```bash
   pnpm run dev
   ```

4. Open your browser and visit:
   
   ```
   http://localhost:3000
   ```

---

## Development Checklist ✅

### Step 1: Initial Setup
- [ ] Fork and clone the repository.
- [ ] Install Node.js and check the version using `node -v`.
- [ ] Run the app locally and confirm it opens at `http://localhost:3000`.

### Step 2: Understand the Project Structure
- [ ] Open the project in a code editor (e.g., VSCode).
- [ ] Explore the `src/app` folder to understand how routing works in Next.js.
- [ ] Review the `package.json` file for the list of dependencies.

### Step 3: Add Functionality
- [ ] Add a button below the "Pomodoro Timer" text with the label "Start".
- [ ] Create a `useState` hook to track whether the timer is running.
- [ ] Toggle the text of the button between "Start" and "Stop" when clicked.

### Step 4: Styling
- [ ] Style the "Pomodoro Timer" component with a border and some padding.

### Step 5: Display Timer
- [ ] Use a `useState` hook to track time (e.g., 25 minutes).
- [ ] Display the countdown timer (e.g., `25:00`) inside the "Pomodoro Timer" component.
- [ ] Implement a `setInterval` to decrease the time every second.

### Step 6: Enhance Features
- [ ] Add functionality to pause the timer when "Stop" is clicked.
- [ ] Reset the timer to 25 minutes after completing a session.
- [ ] Add a sound alert when the timer reaches 0.

---

## Recommended VSCode Plugins

To enhance your development experience, consider adding the following VSCode plugins:

1. **Prettier**  
   Automatically format your code to keep it clean and consistent. Prettier supports multiple languages, including JavaScript, TypeScript, HTML, and CSS.  
   - Install from the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

2. **Tailwind CSS IntelliSense**  
   Provides advanced features like autocomplete, syntax highlighting, and linting for Tailwind CSS classes.  
   - Install from the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss).

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---
