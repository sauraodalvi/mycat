export default {
  fetchCatImage() {
    console.log("Button clicked, fetching cat image..."); // Debug log
    Image1.setImage(''); // Clear previous image before fetching a new one

    try {
      // Get the selected option from the SingleSelect1 widget
      const selectedTag = SingleSelect1.selectedOptionValue; // Ensure this is the correct property
      console.log("Selected tag:", selectedTag); // Debug log
      
      // Get the input value from Input1
      const inputText = Input1.text; // Assuming Input1 is a text input widget
      console.log("Input text:", inputText); // Debug log

      // Determine the endpoint based on Switch1 state
      let endpoint;
      if (Switch1.isSwitchedOn) { // Check if the switch is on for GIFs
        // Default GIF URL if no tags or input text
        endpoint = selectedTag || inputText ? 
          `https://cataas.com/cat/gif/says/${inputText}?fontColor=orange&fontSize=20&tags=${selectedTag}` :
          `https://cataas.com/cat/gif`; // Default GIF URL
      } else { // Switch is off for images
        // Default image URL if no tags or input text
        endpoint = selectedTag || inputText ? 
          `https://cataas.com/cat/${selectedTag}/says/${inputText}` :
          `https://cataas.com/cat`; // Default image URL
      }

      // Append a timestamp only if necessary
      const finalEndpoint = endpoint + (endpoint.includes('?') ? '&' : '?') + `_=${new Date().getTime()}`;

      console.log("Fetching from endpoint:", finalEndpoint); // Debug log

      // Fetch the content from the constructed URL
      fetch(finalEndpoint)
        .then(response => {
          console.log("Response status:", response.status); // Debug log
          if (response.ok) {
            // Set the image directly from the endpoint
            Image1.setImage(finalEndpoint); // Use the final endpoint directly for the image source
          } else {
            throw new Error(`Failed to fetch content: ${response.statusText}`);
          }
        })
        .catch(error => {
          console.error("Error fetching content:", error);
          // Clear image on error
          Image1.setImage(''); // Use setImage method
        });
    } catch (error) {
      console.error("Error fetching content:", error);
      // Clear image on error
      Image1.setImage(''); // Use setImage method
    }
  },

  copyImageUrl() {
    const imageUrl = Image1.image; // Get the currently displayed image URL
    if (!imageUrl) {
      showAlert('No image to copy!', 'error'); // Alert if no image is displayed
      return;
    }

    copyToClipboard(imageUrl) // Use Appsmith's built-in function to copy to clipboard
      .then(() => {
        console.log('Image URL copied to clipboard:', imageUrl);
        // Show a simple success message to the user
        showAlert('Image copied', 'success'); // Updated message
      })
      .catch(err => {
        console.error('Failed to copy image URL:', err);
        showAlert('Failed to copy image URL', 'error');
      });
  }
};