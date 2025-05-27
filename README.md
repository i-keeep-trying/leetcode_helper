# 🤖 LeetCode AI Helper (Chrome Extension)

**LeetCode AI Helper** is a lightweight Chrome extension built with plain JavaScript and HTML that assists users in solving problems on [LeetCode](https://leetcode.com) using Google's Gemini AI API. It automatically extracts the problem statement, code, and test cases from the page, keeps track of conversation history, and provides intelligent, contextual solutions in real time.

> 💡 Think of it as your personalized LeetCode assistant — always available right on the page.

---

## ✨ Features

- ✅ **Built-in Gemini API integration** (supports Gemini 2.0 Flash).
- ✅ **No frameworks** — built using plain JavaScript and minimal HTML.
- ✅ **Seamless integration with LeetCode** — reads:
  - Problem title and description.
  - Provided input/output examples.
  - The user's current code.
- ✅ **Interactive chat interface** embedded in the page.
- ✅ **Remembers chat history** for the current question.
- ✅ **Prompt engineering** to generate high-quality AI responses.
- ✅ **API key validation** — checks the key before saving it to ensure smooth experience.
- ✅ **Clean popup UI** for entering and managing your Gemini API key.

---

## 🛠 Installation

1. Clone or download this repository.

2. In Chrome:
   - Go to `chrome://extensions/`
   - Enable **Developer mode** (top right).
   - Click **"Load unpacked"**.
   - Select the folder where you cloned the project.

3. You should now see the **LeetCode AI Helper** icon in your browser toolbar.

---

## 🔑 Setting Up Your Gemini API Key

1. Click the extension icon (puzzle icon in Chrome toolbar).
2. A popup will appear asking you to enter your **Gemini API key**.
3. Paste your key and press Enter or click the "Save" button.
4. The extension will **validate the key** by sending a test request to Gemini:
   - ✅ If valid: key is saved and the popup closes.
   - ❌ If invalid: you'll see an error and can re-enter the key.

> Don't have an API key? Get it from [Google AI Studio](https://aistudio.google.com/app/apikey).

---

## 💬 How It Works

Once you're on a LeetCode problem page:

1. The content script (`content.js`) automatically runs in the background.
2. It extracts:
   - The problem description and title.
   - Code from the editor.
   - Input/output examples.
3. A chat box appears on the page (or can be toggled).
4. The AI is prompt-engineered to:
   - Provide explanations.
   - Suggest improvements.
   - Debug and analyze your code.
   - Offer hints and alternative approaches.
5. Chat history is maintained **per question** so you can continue conversations without losing context.

---
