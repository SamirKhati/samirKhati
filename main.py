import pyttsx3

# Initialize the engine
engine = pyttsx3.init()

# Set properties (optional)
engine.setProperty('rate', 150)   # Speed of speech
engine.setProperty('volume', 1)   # Volume (0.0 to 1.0)

# Get user input
text = input("Enter the text you want to convert to speech: ")

voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)  # Try 0 or 1

# Convert text to speech
engine.say(text)

# Run the speech engine
engine.runAndWait()