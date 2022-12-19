import * as React from 'react';
import * as RainbowKit from 'rainbowkit';
import abi from './constants.js';

interface INft {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

interface IState {
  contract: any;
  nftIds: string[];
  nfts: INft[];
  selectedNftId: string | null;
  connected: boolean;
  myAccount: string | null;
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      contract: null,
      nftIds: [],
      nfts: [],
      selectedNftId: null,
      connected: false,
      myAccount: null,
    };
  }

  async componentDidMount() {
    // Set the contract address and ABI of the NFT marketplace
    const contractAddress = '0x4365C874AaFe16Cc17D99c0d4d3d9Af6608F74D0';
    const contractAbi = [{abi}];

    // Connect to the Ethereum network using RainbowKit
    const rainbow = new RainbowKit();

    await this.connectToWallet();

    // Create an instance of the NFT marketplace contract
    const contract = new rainbow.web3.eth.Contract(contractAbi, contractAddress);

    this.setState({ contract });

    // Get the list of NFTs for sale
    const nftIds = await contract.methods.getNftIds().call();

    this.setState({ nftIds });
  }

  async connectToWallet() {
    // Check if MetaMask is installed and the user is not already connected
    if (window.ethereum && !window.ethereum.selectedAddress) {
      // Request connection to MetaMask
      await window.ethereum.enable();
    }

    // Connect to the wallet using RainbowKit
    await rainbow.connect();

    this.setState({ connected: true });
  }

  async viewNft(nftId: string) {
    const { contract } = this.state;

    // Get the NFT details
    const nft = await contract.methods.nfts(nftId).call();

    this.setState({
      selectedNftId: nftId,
      nfts: [...this.state.nfts, nft],
    });
  }

  render() {
    const { nftIds, nfts, selectedNftId, connected, myAccount } = this.state;

    let content: JSX.Element;

    if (!connected) {
      content = <div>Connecting to wallet...</div>;
    } else if (!myAccount) {
      content = <div>Please log in to your wallet</div>;
    } else if (selectedNftId) {
      // Display the selected NFT
      const selectedNft = nfts.find(nft => nft.id === selectedNftId);
      if (selectedNft) {
        content = (
          <div>
            <div>
              <img src={selectedNft.imageUrl} alt={selectedNft.name} />
            </div>
            <div>Name: {selectedNft.name}</div>
            <div>Price: {selectedNft.price}</div>
            <div>Description: {selectedNft.description}</div>
            <button onClick={() => this.setState({ selectedNftId: null })}>
              Back
            </button>
          </div>
        );
      } else {
        content = <div>Loading NFT details...</div>;
      }
    } else {
      // Display the list of NFTs
      content = (
        <ul>
          {nftIds.map(nftId => (
            <li key={nftId}>
              <button onClick={() => this.viewNft(nftId)}>View NFT</button>
            </li>
          ))}
        </ul>
      );
    }

    return <div>{content}</div>;
  }
}

export default App;
