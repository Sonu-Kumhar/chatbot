const apiKey = "AIzaSyCZHSDay1KQub3vxUBCCK-OmexuZJYB9WM"; // Replace with your actual API key
const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    let message = userInput.value.trim();
    if (message === "") return;

    // Display user message
    let userMessage = `<div class="message user-message">${message}</div>`;
    chatBox.innerHTML += userMessage;
    userInput.value = "";

    // Auto-scroll to bottom
    setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 100);

    // Call Gemini API
    fetch(apiUrl + "?key=" + apiKey, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }]
        })
    })
    .then(response => response.json())
    .then(data => {
        let botMessage = `<div class="message bot-message">${data.candidates[0].content.parts[0].text}</div>`;
        chatBox.innerHTML += botMessage;

        // Auto-scroll to latest message
        setTimeout(() => {
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 100);
    })
    .catch(error => {
        console.error("Error:", error);
        chatBox.innerHTML += `<div class="message bot-message">Error fetching response.</div>`;
        
        setTimeout(() => {
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 100);
    });
}

// Allow pressing "Enter" to send message
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
