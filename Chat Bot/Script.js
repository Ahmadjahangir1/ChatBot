// script.js

async function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
  
    // Display user input
    displayMessage("User: " + userInput, "user");
  
    // Check if user input matches the command
    if (userInput.toLowerCase() === "get user") {
      const userResponse = await fetchUserData();
      displayMessage("Admin Bot: " + userResponse, "bot");
    } else {
      displayMessage("Admin Bot: Type 'get user' to fetch a random user profile", "bot");
    }
  
    // Clear user input
    document.getElementById("user-input").value = "";
  }
  
  // Fetch user data from Random User API
  async function fetchUserData() {
    const url = "https://randomuser.me/api/";
    
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const user = data.results[0];
        const userInfo = `
          Name: ${user.name.first} ${user.name.last}
          Location: ${user.location.city}, ${user.location.country}
          Email: ${user.email}
        `;
        return userInfo;
      } else {
        return "Error: Unable to fetch user data.";
      }
    } catch (error) {
      console.error("Error:", error);
      return "Error: Something went wrong!";
    }
  }
  
  // Display messages in the chat output
  function displayMessage(text, sender) {
    const chatOutput = document.getElementById("chat-output");
    const messageDiv = document.createElement("div");
    messageDiv.className = sender;
    messageDiv.textContent = text;
    chatOutput.appendChild(messageDiv);
    chatOutput.scrollTop = chatOutput.scrollHeight; // Scroll to the latest message
  }
  