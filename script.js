document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("toggleMode");
    const body = document.body;

    // Load dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        toggleButton.innerText = "☀️ Light Mode";
    }

    // Toggle Dark Mode
    toggleButton.addEventListener("click", function() {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            toggleButton.innerText = "☀️ Light Mode";
        } else {
            localStorage.setItem("darkMode", "disabled");
            toggleButton.innerText = "🌙 Dark Mode";
        }
    });
});


function validateDigits(input) {
    let validDigits = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (input.value !== validDigits) {
        document.getElementById("digitWarning").style.display = "block";
    } else {
        document.getElementById("digitWarning").style.display = "none";
    }
    input.value = validDigits;
}

function generateWords() {
    let prefix = document.getElementById("prefix").value.trim();
    let count = parseInt(document.getElementById("wordCount").value);
    let digits = document.getElementById("digits").value;
    let filename = document.getElementById("filename").value.trim();

    if (prefix === "" || count <= 0 || digits.length === 0 || filename === "") {
        alert("Please enter valid values for all fields.");
        return;
    }

    let words = new Set();
    while (words.size < count) {
        let word = "";
        for (let i = 0; i < 4; i++) {  // Fixed 4-digit word length
            word += digits[Math.floor(Math.random() * digits.length)];
        }
        words.add(prefix + word);
    }

    let sortedWords = Array.from(words).sort(); // Sort words

    let textContent = sortedWords.join("\n");
    let blob = new Blob([textContent], { type: "text/plain" });
    let fileSize = (blob.size / 1024).toFixed(2); // Get file size in KB

    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename + ".txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    document.getElementById("fileSize").innerText = `File Size: ${fileSize} KB`;
}
