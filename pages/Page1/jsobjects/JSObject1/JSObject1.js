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
      console.error("Invalid selection!");
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
            return endpoint; // The endpoint itself is the image URL for HTTP errors
          }
        } else {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
      })
      .then(imageUrl => {
        if (imageUrl) {
          if (selectedPet === 'cat') {
            const imageObjectURL = window.URL.createObjectURL(imageUrl);
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

  // Copy the image URL to the clipboard
  copyImageUrl() {
    const imageUrl = Image1.image; // Get the current image URL
    navigator.clipboard.writeText(imageUrl) // Copy to clipboard
      .then(() => {
        console.log('Image URL copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy image URL: ', err);
      });
  },

  handleSelectChange() {
    // Call fetchImage whenever the user selects an option from Select2
    this.fetchImage();
  },

  handlePetSelect() {
    // Enable Select2 when a pet is selected
    Select2.setDisabled(Select1.selectedOptionValue === '');
  },

  fetchCatImage() {
    console.log("Fetching cat image..."); // Debug log
    Image1.setImage(''); // Clear previous image before fetching a new one

    // API endpoint for fetching a random cat image
    const endpoint = 'https://cataas.com/cat'; // Fetch only cat images

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
        const imageObjectURL = window.URL.createObjectURL(imageBlob);
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

  fetchDuckImage() {
    console.log("Fetching duck image..."); // Debug log
    Image1.setImage(''); // Clear previous image before fetching a new one

    // API endpoint for fetching a random duck image
    const endpoint = 'https://random-d.uk/api/random';

    // Fetch the duck image
    fetch(endpoint)
      .then(response => {
        if (response.ok) {
          return response.json(); // Parse JSON response
        } else {
          throw new Error(`Failed to fetch duck image: ${response.statusText}`);
        }
      })
      .then(data => {
        const duckImageUrl = data.url; // Get the image URL from the response
        Image1.setImage(duckImageUrl); // Set the image source
      })
      .catch(error => {
        console.error("Error fetching duck image:", error);
        Image1.setImage(''); // Clear image on error
      });
  },

  fetchFoxImage() {
    console.log("Fetching fox image..."); // Debug log
    Image1.setImage(''); // Clear previous image before fetching a new one

    // API endpoint for fetching a random fox image
    const endpoint = 'https://randomfox.ca/floof/';

    // Fetch the fox image
    fetch(endpoint)
      .then(response => {
        if (response.ok) {
          return response.json(); // Parse JSON response
        } else {
          throw new Error(`Failed to fetch fox image: ${response.statusText}`);
        }
      })
      .then(data => {
        const foxImageUrl = data.image; // Get the image URL from the response
        Image1.setImage(foxImageUrl); // Set the image source
      })
      .catch(error => {
        console.error("Error fetching fox image:", error);
        Image1.setImage(''); // Clear image on error
      });
  },

  handleButtonClick(buttonType) {
    if (buttonType === 'cat') {
      this.fetchCatImage();
    } else if (buttonType === 'dog') {
      this.fetchDogImage();
    } else if (buttonType === 'duck') {
      this.fetchDuckImage();
    } else if (buttonType === 'fox') {
      this.fetchFoxImage(); // Call the new fox image function
    }
  }
};