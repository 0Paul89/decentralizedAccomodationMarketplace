// main.js
import RainbowKit from 'rainbowkit';

// Set the contract address and ABI of the NFT marketplace
const contractAddress = '0x...';
const contractAbi = [{...}];

// Connect to the Ethereum network using RainbowKit
const rainbow = new RainbowKit();
                     
async function connectToWallet() {
  // Check if MetaMask is installed and the user is not already connected
  if (window.ethereum && !window.ethereum.selectedAddress) {
    // Request connection to MetaMask
    await window.ethereum.enable();
  }
  // Connect to the wallet using RainbowKit
  await rainbow.connect();
}

// Create an instance of the NFT marketplace contract
const contract = new rainbow.web3.eth.Contract(contractAbi, contractAddress);

// Get the list of NFTs for sale
const nftIds = await contract.methods.getNftIds().call();

// Display the list of NFTs
const nftList = document.querySelector('#nft-list');

for (const nftId of nftIds) {
  const nft = await contract.methods.nfts(nftId).call();
  const nftElement = document.createElement('div');
  nftElement.innerHTML = `
    <h3>${nft.name}</h3>
    <p>Price: ${nft.price}</p>
    <button class="view-button" data-nft-id="${nftId}">View</button>
  `;
  nftList.appendChild(nftElement);
}

// Add an event listener to the "View" buttons
nftList.addEventListener('click', async event => {
  if (event.target.className === 'view-button') {
    // Get the NFT ID from the button's data attribute
    const nftId = event.target.getAttribute('data-nft-id');

    // Get the NFT's details from the contract
    const nft = await contract.methods.nfts(nftId).call();

    // Display the NFT's details
    const nftDetails = document.querySelector('#nft-details');
    nftDetails.innerHTML = `
      <h3>${nft.name}</h3>
      <p>Price: ${nft.price}</p>
      <p>Image URL: ${nft.imageUrl}</p>
      <p>Description: ${nft.description}</p>
    `
  }
}
                        
const connectButton = document.getElementById('connect-button');
const addButton = document.getElementById('add-button');

connectButton.addEventListener('click', async () => {
  // Connect to wallet
  await connectToWallet();
  // Show add button
  addButton.style.display = 'block';
});
    
addButton.addEventListener('click', async () => {
  // Add NFT to list
  await addNFTToList();
  
});

async function addNFTToList() {
  // Get the NFT details from the user
  const nftName = prompt('Enter the NFT name:');
  const nftPrice = prompt('Enter the NFT price:');
  const nftImageUrl = prompt('Enter the NFT image URL:');
  const nftDescription = prompt('Enter the NFT description:');

  // Add the NFT to the contract using RainbowKit's API
  await rainbow.addNFT(contract, nftName, nftPrice, nftImageUrl, nftDescription);

  // Update the NFT list to show the new NFT
  updateNFTList();
}

async function updateNFTList() {
  // Clear the current NFT list
  nftList.innerHTML = '';

  // Get the updated list of NFTs for sale
  const nftIds = await contract.methods.getNftIds().call();

  // Display the updated list of NFTs
  for (const nftId of nftIds) {
    const nft = await contract.methods.nfts(nftId).call();
    const nftElement = document.createElement('div');
    nftElement.innerHTML = `
      <h3>${nft.name}</h3>
      <p>Price: ${nft.price}</p>
      <button class="view-button" data-nft-id="${nftId}">View</button>
    `;
    nftList.appendChild(nftElement);
  }
  function searchNFTs() {
    // Get the search query from the input field
    var searchQuery = document.getElementById("search").value;

    // Get the selected filter criteria from the checkboxes
    var filterCriteria = [];
    var filterElements = document.getElementsByName("filter");
    for (var i = 0; i < filterElements.length; i++) {
      if (filterElements[i].checked) {
        filterCriteria.push(filterElements[i].value);
      }
    }

    // Use the search query and filter criteria to search and filter the NFTs
    // Your code here...
  }
  
  async function filterNFTs(property1, property2, property3) {
  // Create an array to store the filtered NFTs
  const filteredNFTs = [];

  // Get the list of NFTs for sale
  const nftIds = await contract.methods.getNftIds().call();

  // Iterate over the NFTs and check if they match the specified properties
  for (const nftId of nftIds) {
    const nft = await contract.methods.nfts(nftId).call();

    // Check if the NFT matches all of the specified properties
      if (nft.property1 === property1 && nft.property2 === property2 && nft.property3 === property3) {
        // If the NFT matches, add it to the filtered array
        filteredNFTs.push(nft);
       }
    }

   // Return the array of filtered NFTs
   return filteredNFTs;
  }

}
    
   
