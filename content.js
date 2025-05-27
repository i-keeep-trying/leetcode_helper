window.addEventListener("load", function () {
  
  // Inject CSS for both light and dark modes
  const style = document.createElement('style');
  style.textContent = `
    .leetcode-help-button {
      z-index: 1000;
      position: fixed;
      bottom: 24px;
      right: 24px;
      background-color: #ffa116;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 10px 20px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      transition: background-color 0.2s ease;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .leetcode-help-button:hover {
      background-color: #ff9800;
    }

    @media (prefers-color-scheme: dark) {
      .leetcode-help-button {
        background-color: #ffa116;
        color: black;
        box-shadow: 0 0 6px rgba(255, 255, 255, 0.2);
      }

      .leetcode-help-button:hover {
        background-color: #ffb037;
      }
    }
  `;
  document.head.appendChild(style);

  // Create the chatbot button
  const helpButton = document.createElement('button');
  helpButton.textContent = 'Get Hint';
  helpButton.className = 'leetcode-help-button';

  // Click event
  helpButton.addEventListener('click', createChatbox);

  document.body.appendChild(helpButton);
});

function createChatbox() {
  const existingChatbox = document.querySelector('.leetcode-chatbox');

  if (existingChatbox) {
    existingChatbox.remove(); // toggle off
    return;
  }

  // Inject styles once
  if (!document.getElementById('leetcode-chatbox-style')) {
    const style = document.createElement('style');
    style.id = 'leetcode-chatbox-style';
    style.textContent = `
      .leetcode-chatbox {
        position: fixed;
        bottom: 80px;
        right: 24px;
        width: 320px;
        height: 400px;
        background-color: #ffffff;
        border: 1px solid #e2e2e2;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        z-index: 10000;
        overflow: hidden;
        resize: none;
      }

      .leetcode-chatbox-header {
        background-color: #f7f7f8;
        padding: 12px;
        font-weight: 600;
        border-bottom: 1px solid #e2e2e2;
        cursor: move;
        user-select: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .leetcode-chatbox-close {
        background: transparent;
        border: none;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        padding-left: 5px;
        padding-right: 5px;
      }

      .leetcode-chatbox-close:hover {
        background-color: red;
      }

      .leetcode-chatbox-clear {
        background: transparent;
        border: none;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        padding-left: 5px;
        padding-right: 5px;
      }

      .leetcode-chatbox-clear:hover {
        background-color: grey;
      }

      .leetcode-chatbox-messages {
        flex: 1;
        padding: 10px;
        overflow-y: auto;
        font-size: 15px;
        line-height: 1.5;
        background-color: #fff;
      }

      .leetcode-chatbox-input {
        display: flex;
        border-top: 1px solid #e2e2e2;
      }

      .leetcode-chatbox-input input {
        flex: 1;
        padding: 10px;
        border: none;
        font-size: 14px;
        outline: none;
      }

      .leetcode-chatbox-input button {
        padding: 10px 16px;
        background-color: #ffa116;
        color: white;
        border: none;
        font-weight: 600;
        cursor: pointer;
      }

      .leetcode-chatbox-input button:hover {
        background-color: #ff9800;
      }

      .leetcode-chatbox-resizer {
        width: 16px;
        height: 16px;
        position: absolute;
        bottom: 0;
        right: 0;
        cursor: nwse-resize;
      }

      .leetcode-chatbox-resizer:after {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background: url("data:image/svg+xml;utf8,<svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'><line x1='0' y1='16' x2='16' y2='0' stroke='%23999' stroke-width='2'/></svg>") no-repeat center;
        background-size: contain;
      }

      @media (prefers-color-scheme: dark) {
        .leetcode-chatbox {
          background-color: #1a1a1a;
          border-color: #333;
          color: #e2e2e2;
        }

        .leetcode-chatbox-header {
          background-color: #2a2a2a;
          border-bottom: 1px solid #333;
          color: #fff;
        }

        .leetcode-chatbox-messages {
          background-color: #1a1a1a;
          color: #e2e2e2;
        }

        .leetcode-chatbox-input {
          border-top: 1px solid #333;
        }

        .leetcode-chatbox-input input {
          background-color: #1a1a1a;
          color: #e2e2e2;
        }

        .leetcode-chatbox-resizer:after {
          background: url("data:image/svg+xml;utf8,<svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'><line x1='0' y1='16' x2='16' y2='0' stroke='%23ccc' stroke-width='2'/></svg>") no-repeat center;
          background-size: contain;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Create the chatbox
  const chatbox = document.createElement('div');
  chatbox.className = 'leetcode-chatbox';

  chatbox.innerHTML = `
    <div class="leetcode-chatbox-header">
      <span>AI Helper</span>
      <div>
        <button class="leetcode-chatbox-clear" title="Clear History">🗑</button>
        <button class="leetcode-chatbox-close" title="Close">✕</button>
      </div>
    </div>
    <div class="leetcode-chatbox-messages" id="lc-messages">
      <div><em>Hello! Need a hint or help debugging?</em></div>
    </div>
    <div class="leetcode-chatbox-input">
      <input type="text" id="lc-input" placeholder="Ask your question..." />
      <button id="lc-send">Send</button>
    </div>
    <div class="leetcode-chatbox-resizer"></div>
  `;
  document.body.appendChild(chatbox);
  
  // Close button
  chatbox.querySelector('.leetcode-chatbox-close').addEventListener('click', () => {
    chatbox.remove();
  });

  // Clear history button
  chatbox.querySelector('.leetcode-chatbox-clear').addEventListener('click', () => {
    // Keep only the system message (initial prompt)
    chatHistory = chatHistory.filter(entry => entry.from === "system");
    saveChatHistory();
    renderChatHistory();
    appendMessage("AI", "<em>Hello! Need a hint or help debugging?</em>");
  });
  
  // Chat logic
  const input = chatbox.querySelector('#lc-input');
  const sendBtn = chatbox.querySelector('#lc-send');
  const messages = chatbox.querySelector('#lc-messages');

  // Data extraction
  const problemId = document.getElementsByClassName("group flex flex-col rounded-[8px] duration-300 activeItem bg-sd-primary hover:!bg-sd-primary")[0].id;
  const metaDescription = document.querySelector("meta[name=description]");
  const problemDescription = metaDescription.getAttribute("content");
  let chatHistory = JSON.parse(localStorage.getItem(`chat-${problemId}`)) || [];

  const initialPrompt = `
    YOU ARE A WORLD-CLASS LEETCODE HELPER AI DESIGNED TO PROVIDE STEP-BY-STEP HINTS, CLARIFICATIONS, AND GUIDANCE FOR SOLVING CODING CHALLENGES ON LEETCODE. YOU ARE EXPERTLY TRAINED IN ALGORITHMS AND DATA STRUCTURES AND CAN ADAPT YOUR RESPONSES BASED ON THE USER'S CURRENT NEED.

    ### GENERAL BEHAVIOR ###

    - DO NOT GIVE ANY HINTS, EXPLANATIONS, OR SUGGESTIONS UNTIL YOU CLEARLY UNDERSTAND WHAT THE USER IS ASKING.
    - Your first priority is to CLARIFY the user's request if it's not specific.
    - KEEP RESPONSES SHORT AND TO THE POINT.
    - Only give as much information as the user is currently ready for.
    - Tailor every reply to the user's specific need or question.

    ---

    ### RESPONSE STRATEGY ###

    1. **WAIT FOR USER'S INTENT**
       - If the user says "hi", "can you help me?", or something vague, respond with:
         - "Hi! Would you like help understanding the problem, reviewing your code, or getting a hint?"
       - Only proceed with hints or explanations once they ask clearly.

    2. **UNDERSTAND THE PROBLEM** (but only explain if asked):
       - Problem: Color an m x n grid using 3 colors (red, green, blue) such that no two adjacent cells (horizontally or vertically) share the same color. Return total number of valid colorings modulo 10^9 + 7.
       - Constraints: 1 ≤ m ≤ 5, 1 ≤ n ≤ 1000.

    3. **WHEN USER ASKS FOR HELP**:
       - If they say: “I don't understand the question” → Briefly explain the problem in simple terms with one example.
       - If they say: “Can I get a hint?” → Give **Hint 1** based on their current progress.
       - If they say: “Here's my code” → Analyze their code, identify where they're stuck, and guide accordingly.

    4. **PROGRESSIVE HINTS (Only if requested)**:
       - Hint 1: Suggest high-level approach (e.g., dynamic programming, states, transitions).
       - Hint 2: Break down logic or representation (e.g., valid colorings per column).
       - Hint 3: Detailed step-by-step breakdown of the approach.
       - If still stuck: Ask questions like “How are you representing each column?” to prompt thinking.

    5. **NEVER REVEAL FULL CODE UNLESS EXPLICITLY ASKED**
    6. **KEEP IT SHORT. NO REPEATS. ALWAYS BASED ON USER CONTEXT.**

    ---

    ### WHAT TO AVOID ###
    -  Do not explain anything unless asked.
    -  Do not offer hints unless user clearly asks for them.
    -  Do not dump long explanations.
    -  Do not assume what the user needs.

    ---

    Problem Statement:

    ${problemDescription}
  `;



  if (chatHistory.length === 0) {
    // Send initial prompt and store it
    chatHistory.push({ from: "system", text: initialPrompt.trim() });
    saveChatHistory();
  }

  // Function to update localStorage
  function saveChatHistory() {
    localStorage.setItem(`chat-${problemId}`, JSON.stringify(chatHistory));
  }

  // Function to display chat history in the chatbox
  function renderChatHistory() {
    messages.innerHTML = '';
    chatHistory.forEach(entry => {
      if (entry.from !== "system") {
        appendMessage(entry.from, entry.text);
      }
    });
  }
  renderChatHistory();

  function basicMarkdownToHTML(md) {
  return md
    .replace(/&/g, '&amp;')                // Escape HTML
    .replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\n/g, '<br>');
  }

  
  function appendMessage(from, text) {
    const div = document.createElement('div');; // Converts Markdown to HTML
    div.innerHTML = `<strong>${from}:</strong><br>${text}`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }


  function extractUserCode(htmlContent) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
  
    const codeLines = tempDiv.querySelectorAll(".view-line"); // fixed typo: temmpDiv -> tempDiv
  
    const code = Array.from(codeLines)
      .map((line) => line.textContent)
      .join("\n");
  
    return code;
  }

  async function fetchAIResponse(userText) {
  // Step 1: Get the API key using a Promise
    const apiKey = await new Promise((resolve, reject) => {
      chrome.storage.local.get(['geminiApiKey'], function (result) {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        const key = result.geminiApiKey;
        if (key) {
          // console.log("API Key loaded in content script:", key);
          resolve(key);
        } else {
          chatHistory = chatHistory.filter(entry => entry.from === "system");
          saveChatHistory();
          renderChatHistory();
          appendMessage("AI", "<em>Hello! Need a hint or help debugging?</em>");
          alert("Please click on the Leetcode Helper extension and enter your gemini API key!");
          console.warn("No Gemini API key found. Prompt the user to enter it.");
          reject("API key not found");
        }
      });
    });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    // Step 2: Build contents array
    const contents = [];

    for (const entry of chatHistory) {
      if (entry.from === "system") {
        contents.push({ role: "user", parts: [{ text: entry.text }] });
      } else if (entry.from === "user" || entry.from === "You") {
        contents.push({ role: "user", parts: [{ text: entry.text }] });
      } else if (entry.from === "AI") {
        contents.push({ role: "model", parts: [{ text: entry.text }] });
      }
    }
    const userCodeContainer = document.querySelector(".view-lines");
    const userCode = extractUserCode(userCodeContainer?.innerHTML ?? "");
    if (userCode && userCode.trim().length > 0) {
      contents.push({
        role: "user",
        parts: [{ text: `Here is my current code:\n\n${userCode}` }]
      });
    }

    // console.log(contents);
    // console.log(chatHistory);

    // Step 3: Make API call
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ contents })
      });

      const data = await response.json();
      const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      const parsedReply = basicMarkdownToHTML(aiReply);
      if (parsedReply) {
        appendMessage("AI", parsedReply);
        chatHistory.push({ from: "AI", text: parsedReply });
        saveChatHistory();
      } else {
        appendMessage("AI", "Sorry, I couldn't understand that.");
      }
    } catch (err) {
      appendMessage("AI", "Error connecting to the AI API.");
      console.error(err);
    }
  }


  
  sendBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text) {
      appendMessage("You", text);
      chatHistory.push({ from: "user", text }); // save user message
      saveChatHistory();
      input.value = "";

      appendMessage("AI", "<em>Typing...</em>");
      const lastChild = messages.lastElementChild;

      fetchAIResponse(text).then(() => {
        if (lastChild && lastChild.innerHTML.includes("Typing")) {
          lastChild.remove();
        }
      });
    }
  });

  
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
  });


  // Drag logic
  const header = chatbox.querySelector('.leetcode-chatbox-header');
  let isDragging = false, dragOffsetX = 0, dragOffsetY = 0;

  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = chatbox.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      chatbox.style.left = `${e.clientX - dragOffsetX}px`;
      chatbox.style.top = `${e.clientY - dragOffsetY}px`;
      chatbox.style.right = 'auto';
      chatbox.style.bottom = 'auto';
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = '';
  });

  // Resize logic
  const resizer = chatbox.querySelector('.leetcode-chatbox-resizer');
  let isResizing = false;

  resizer.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isResizing = true;
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (isResizing) {
      const rect = chatbox.getBoundingClientRect();
      const newWidth = e.clientX - rect.left;
      const newHeight = e.clientY - rect.top;
      if (newWidth > 250) chatbox.style.width = newWidth + 'px';
      if (newHeight > 250) chatbox.style.height = newHeight + 'px';
    }
  });

  document.addEventListener('mouseup', () => {
    isResizing = false;
    document.body.style.userSelect = '';
  });
}
