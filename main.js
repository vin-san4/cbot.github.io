// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
      // Close mobile menu if open
      navLinks.classList.remove('active');
    }
  });
});

// Chat Demo
const chatMessages = document.querySelector('.chat-messages');
const messageInput = document.querySelector('#message-input');
const sendButton = document.querySelector('#send-message');

const botResponses = {
  default: "I'm here to help! Feel free to ask me anything about our services.",
  help: "I can assist you with product information, pricing, technical support, and more. What would you like to know?",
  pricing: "We offer flexible pricing plans starting from $19/month. Would you like to learn more about our pricing tiers?",
  features: "CBOT comes with advanced AI capabilities, 24/7 availability, multi-language support, and seamless integration options.",
};

function addMessage(text, isBot) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isBot ? 'bot' : 'user'}`;
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(message) {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('help')) return botResponses.help;
  if (lowerMessage.includes('price') || lowerMessage.includes('cost')) return botResponses.pricing;
  if (lowerMessage.includes('feature') || lowerMessage.includes('what')) return botResponses.features;
  return botResponses.default;
}

function handleMessage() {
  const message = messageInput.value.trim();
  if (message) {
    addMessage(message, false);
    messageInput.value = '';
    
    // Simulate bot thinking
    setTimeout(() => {
      const response = getBotResponse(message);
      addMessage(response, true);
    }, 1000);
  }
}

sendButton.addEventListener('click', handleMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleMessage();
});

// Initialize chat with welcome message
addMessage("Hi! I'm CBOT. How can I assist you today?", true);

// Waitlist Form
const waitlistForm = document.querySelector('#waitlist-form');

waitlistForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.querySelector('#name').value,
    email: document.querySelector('#email').value,
    company: document.querySelector('#company').value
  };

  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert('Thank you for joining our waitlist! We\'ll be in touch soon.');
      waitlistForm.reset();
    } else {
      const data = await response.json();
      alert(data.message || 'Failed to join waitlist. Please try again.');
    }
  } catch (error) {
    alert('An error occurred. Please try again later.');
  }
});
