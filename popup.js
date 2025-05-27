document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('apiKeyInput');
  const statusEl = document.getElementById('status');
  const form = document.getElementById('apiKeyForm');

  // Load saved key (if any)
  chrome.storage.local.get(['geminiApiKey'], function (result) {
    if (result.geminiApiKey) {
      input.value = result.geminiApiKey;
      statusEl.textContent = 'API key loaded.';
      statusEl.className = 'success';
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const apiKey = input.value.trim();

    if (!apiKey) {
      statusEl.textContent = 'Please enter a valid API key.';
      statusEl.className = 'error';
      return;
    }

    statusEl.textContent = 'Validating API key...';
    statusEl.className = '';

    // Step 1: Send test request to validate the key
    fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: "Explain how AI works in a few words" }
            ]
          }
        ]
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Step 2: Key is valid — save it and close popup
        chrome.storage.local.set({ geminiApiKey: apiKey }, function () {
          statusEl.textContent = '✅ API key is valid and saved!';
          statusEl.className = 'success';
          setTimeout(() => window.close(), 800);
        });
      })
      .catch(err => {
        // Step 3: Show error and allow re-entry
        statusEl.textContent = '❌ Invalid API key. Please check and try again.';
        statusEl.className = 'error';
        console.error('API key validation failed:', err.message);
      });
  });
});
