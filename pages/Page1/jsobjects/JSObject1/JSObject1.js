export default {
  fetchCatImage() {
    console.log("Fetching cat image..."); // Debug log
    Image1.setImage(''); // Clear previous image before fetching a new one

    // API endpoint for fetching a random cat image
    const endpoint = 'https://cataas.com/cat'; // Changed to fetch only images

    // Fetch the cat image
    fetch(endpoint)
      .then(response => {
        if (response.ok) {
          return response.blob(); // Convert response to blob
        } else {
          throw new Error(`Failed to fetch cat image: ${response.statusText}`);
        }
      })
      .then(imageBlob => {
        const imageObjectURL = URL.createObjectURL(imageBlob);
        Image1.setImage(imageObjectURL); // Set the image source
      })
      .catch(error => {
        console.error("Error fetching cat image:", error);
        Image1.setImage(''); // Clear image on error
      });
  },

  fetchDogImage() {
    console.log("Fetching dog image..."); // Debug log
    Image1.setImage(''); // Clear previous image before fetching a new one

    // API endpoint for fetching a random dog image
    const endpoint = 'https://dog.ceo/api/breeds/image/random';

    // Fetch the dog image
    fetch(endpoint)
      .then(response => {
        if (response.ok) {
          return response.json(); // Parse JSON response
        } else {
          throw new Error(`Failed to fetch dog image: ${response.statusText}`);
        }
      })
      .then(data => {
        const dogImageUrl = data.message; // Get the image URL from the response
        Image1.setImage(dogImageUrl); // Set the image source
      })
      .catch(error => {
        console.error("Error fetching dog image:", error);
        Image1.setImage(''); // Clear image on error
      });
  },

  captureScreenshot() {
    // Use html2canvas to take a screenshot of the specified element
    html2canvas(document.querySelector("#elementToCapture")).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      this.shareOnSocialMedia(imgData); // Call the share function with the image data
    });
  },

  shareOnSocialMedia(imgData) {
    // Construct the social media sharing URL with the image data
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imgData)}`;
    // Open the sharing URL in a new window
    window.open(shareUrl, '_blank');
  },

  handleButtonClick(buttonType) {
    // Determine which button was clicked and fetch the corresponding image
    if (buttonType === 'cat') {
      this.fetchCatImage();
    } else if (buttonType === 'dog') {
      this.fetchDogImage();
    }
  }
};