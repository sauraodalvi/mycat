export default {
  fetchImage() {
    console.log("Fetching image..."); // Debug log
    Image1.setImage(''); // Clear previous image before fetching a new one

    // Get the selected pet and HTTP code from the dropdowns
    const selectedPet = Select1.selectedOptionValue; // e.g., "cat", "dog", "duck", "http"
    const selectedHttpCode = Select2.selectedOptionValue; // e.g., "200", "404", "500"

    // Construct the API endpoint based on the selected pet
    let endpoint;
    if (selectedPet === 'cat') {
      endpoint = 'https://cataas.com/cat'; // Fetch only cat images
    } else if (selectedPet === 'dog') {
      endpoint = 'https://dog.ceo/api/breeds/image/random'; // Fetch random dog image
    } else if (selectedPet === 'duck') {
      endpoint = 'https://random-d.uk/api/random'; // Fetch random duck image
    } else if (selectedPet === 'http') {
      endpoint = `https://http.cat/${selectedHttpCode}`; // Fetch image based on HTTP error code
    } else {
      console.error("Invalid pet selected!");
      return;
    }

    // Fetch the image based on the constructed endpoint
    fetch(endpoint)
      .then(response => {
        if (response.ok) {
          if (selectedPet === 'cat') {
            return response.blob(); // For cat images, convert response to blob
          } else if (selectedPet === 'dog') {
            return response.json().then(data => data.message); // Get dog image URL
          } else if (selectedPet === 'duck') {
            return response.json().then(data => data.url); // Get duck image URL
          } else if (selectedPet === 'http') {
            // For HTTP error codes, the response is an image
            return endpoint; // The endpoint itself is the image URL
          }
        } else {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
      })
      .then(imageUrl => {
        if (imageUrl) {
          // If the selected pet is cat, set the image source directly from the blob
          if (selectedPet === 'cat') {
            const imageObjectURL = URL.createObjectURL(imageUrl);
            Image1.setImage(imageObjectURL); // Set the image source for cat
          } else {
            Image1.setImage(imageUrl); // Set the image source for dog, duck, or HTTP error
          }
        }
      })
      .catch(error => {
        console.error("Error fetching image:", error);
        Image1.setImage(''); // Clear image on error
      });
  },

  handleSelectChange() {
    // Call fetchImage whenever the user selects an option from Select2
    this.fetchImage();
  },

  handlePetSelect() {
    // Enable Select2 when a pet is selected
    Select2.setDisabled(Select1.selectedOptionValue === '');
  }
};