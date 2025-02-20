function generateWords() {
    let prefix = document.getElementById("prefix").value.trim();
    let count = parseInt(document.getElementById("wordCount").value);
    let digits = document.getElementById("digits").value;
    let filename = document.getElementById("filename").value.trim();
    let fileSizeElement = document.getElementById("fileSize");

    if (prefix === "" || count <= 0 || digits.length === 0 || filename === "") {
        alert("Please enter valid values for all fields.");
        return;
    }

    let words = new Set();
    while (words.size < count) {
        let word = "";
        for (let i = 0; i < 4; i++) {  
            word += digits[Math.floor(Math.random() * digits.length)];
        }
        words.add(prefix + word);
    }

    let sortedWords = Array.from(words).sort();

    let textContent = sortedWords.join("\n");
    let blob = new Blob([textContent], { type: "text/plain" });
    let fileSize = (blob.size / 1024).toFixed(2); 

    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename + ".txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Show file size
    fileSizeElement.innerText = `File Size: ${fileSize} KB`;
    fileSizeElement.style.display = "block"; 

    // Hide file size after 5 seconds
    setTimeout(() => {
        fileSizeElement.style.display = "none";
    }, 3000);
}
