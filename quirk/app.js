// Generate a random user ID
function generateUserId() {
  return Math.floor(Math.random() * 1000);
}

// Generate a QR code for the user ID
function generateQRCode(userId) {
  const qrCode = new QRCode(document.getElementById('qr-code'), {
    text: userId.toString(),
    width: 128,
    height: 128,
  });
  document.getElementById('qr-code').style.display = 'block';
}

// Display the profile with the given data
function displayProfile(profileData) {
  const { picture, name, details } = profileData;
  document.getElementById('profile-picture').src = picture;
  document.getElementById('profile-name').textContent = name;
  document.getElementById('profile-details').textContent = details;
  document.getElementById('profile-container').style.display = 'block';
}

// Display error message
function displayError(message) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
}

// Function to handle the scan result
function handleScanResult(result) {
  const userId = parseInt(result);
  if (!isNaN(userId)) {
    fetchProfileData(userId)
      .then((profileData) => {
        displayProfile(profileData);
      })
      .catch((error) => {
        displayError('Error fetching profile data');
        console.error('Error fetching profile data:', error);
      });
  } else {
    displayError('Invalid QR code');
  }
}

// Simulate fetching profile data from an API or database
function fetchProfileData(userId) {
  // Replace this with your actual data fetching logic
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulating profile data retrieval
      const profileData = {
        picture: 'profile-picture.jpg',
        name: 'John Doe',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      };
      if (userId === 1) {
        resolve(profileData);
      } else {
        reject(new Error('User not found'));
      }
    }, 1000);
  });
}

// Main execution flow
window.addEventListener('DOMContentLoaded', () => {
  const userId = generateUserId();
  generateQRCode(userId);

  const video = document.getElementById('video');
  const qrCodeScanner = new Instascan.Scanner({ video });
  qrCodeScanner.addListener('scan', (content) => {
    handleScanResult(content);
  });

  Instascan.Camera.getCameras()
    .then((cameras) => {
      if (cameras.length > 0) {
        video.style.display = 'block';
        qrCodeScanner.start(cameras[0]);
      } else {
        displayError('No cameras found');
        console.error('No cameras found.');
      }
    })
    .catch((error) => {
      displayError('Error accessing cameras');
      console.error('Error accessing cameras:', error);
    });
});
