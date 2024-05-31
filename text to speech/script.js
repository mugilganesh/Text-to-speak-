// Get references to the HTML elements
const textEL = document.getElementById('text');
const speakEL = document.getElementById('speak');

// Add click event listener to the button
speakEL.addEventListener('click', speakText);

// Add keydown event listener to the input element to handle Enter key
textEL.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        speakText();
    }
});

// Function to handle text-to-speech
function speakText() {
    // Stop any speaking in progress
    window.speechSynthesis.cancel();

    // Get the text from the input element
    const text = textEL.value.trim();

    // Check if the text is empty
    if (text === "") {
        alert("Please enter some text to speak.");
        return;
    }

    // Create a new speech synthesis utterance with the text
    const utterance = new SpeechSynthesisUtterance(text);

    // Optional: Set voice, pitch, and rate for better control
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        utterance.voice = voices[0]; // Choose a voice, e.g., the first one
    }
    utterance.pitch = 1; // Set pitch (0.1 to 2)
    utterance.rate = 1; // Set rate (0.1 to 10)

    // Handle errors
    utterance.onerror = function(event) {
        console.error('SpeechSynthesisUtterance.onerror', event);
        alert('An error occurred while attempting to speak the text.');
    };

    // Speak the text
    window.speechSynthesis.speak(utterance);
}
