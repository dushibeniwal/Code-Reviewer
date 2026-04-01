# AI-Powered Code Review System

A full-stack web application designed to dissect, optimize, and document source code using advanced Agentic AI workflows. The system parses user code, evaluates logical complexity, checks syntax, suggests optimizations, and visually maps the data flow.

## 🏗 System Architecture

The project is structured as a monolithic repository split into two specific micro-environments:
- **`client/`**: The dynamic Vite React Frontend.
- **`server/`**: The Node.js Express Backend & Multi-Agent Engine.

Both sides run concurrently, tethered securely through CORS, and backed by a local/remote MongoDB instance to persist interaction logs.

---

## 🚦 Application Flow & Data Lifecycle

The application functions via a streamlined "Multi-Agent" orchestrator:

1. **User Input (`client/src/components/CodeEditor.jsx`)**: The user selects a language (Java, JavaScript, or C++) and inputs raw source code.
2. **Data Transmission (`client/src/App.jsx`)**: The frontend `fetch` API fires a `POST` request to the backend at `http://localhost:5001/api/review`.
3. **Parallel Analysis (`server/routes/review.js`)**: The Express router intercepts the code and fires off three independent AI agents *concurrently* using `Promise.all()` -> (`syntaxAgent`, `optimizationAgent`, and `complexityAgent`).
4. **Logic Synthesis (`explanationAgent`)**: Once the three sub-agents independently finish, their outputs are piped synchronously into an `explanationAgent` which summarizes their findings and generates a logical Mermaid Flowchart based on the codebase's logic.
5. **Persistence (`MongoDB Database`)**: The fully realized review payload is cached to the database via Mongoose models.
6. **Data Visualization (`ResultsPanel`, `MarkdownRenderer`, `ComplexityGraph`)**: The Express server returns the generated payload back to the frontend. Custom `react-markdown` and `recharts` engines parse the text and illuminate custom mathematics charts.

---

## 🧠 The AI Agents (Backend Integration)

We bypass standard sequential LLM calls by leveraging specialized multi-agent routing. Each file inside `server/agents/` instructs Google's **Gemini 2.5 Flash API** (`@google/genai`) to act as an expert in a specific domain.

*   `syntaxAgent.js` -> Detects bugs and line-level undefined variables.
*   `optimizationAgent.js` -> Suggests performance enhancements and semantic refactoring.
*   `complexityAgent.js` -> Enforces strict `[TIME: O(N)]` / `[SPACE: O(1)]` outputs for frontend data rendering.
*   `explanationAgent.js` -> Translates previous agent data into a ````mermaid```` schema.

---

## 🗄 Database Schema (MongoDB)

All executed reviews are safely logged using the Mongoose ORM.
**Path:** `server/models/Review.js`

```javascript
{
  code: { type: String, required: true },       // The raw code the user submitted
  language: { type: String, required: true },   // "Java", "JavaScript", or "C++"
  response: {                                   // The outputted multi-agent analysis JSON
      syntax: String,
      optimization: String,
      complexity: String,
      explanation: String
  },     
  timestamp: { type: Date, default: Date.now }  // Native runtime logging
}
```

---

## 🚀 How To Run & Rebuild

If you are cloning this repository or starting it from scratch:

### 1. Requirements
Ensure you are running **Node.js** (v18+) and have the **MongoDB Daemon** running locally on your hardware. 

### 2. Environment Variables
Inside the `/server` directory, create a `.env` file mapping your credentials:
```env
GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=mongodb://localhost:27017/codereview
PORT=5001
```

### 3. Server Startup (Terminal 1)
Boot up the multi-agent backend server, exposing the API routing on `http://localhost:5001`.
```bash
cd server
npm install
npm start
``` 

### 4. Client Startup (Terminal 2)
Boot up the Vite React frontend on `http://localhost:5173`.
```bash
cd client
npm install
npm run dev
```

Visit the local `5173` port on your browser, paste your code, and let the agents do their work!
