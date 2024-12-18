let web3;
let currentProvider;

// Connect Wallet functionality
document.getElementById('connect-wallet').addEventListener('click', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            // Request account access
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            currentProvider = accounts[0];
            alert(`Connected to wallet: ${currentProvider}`);
        } catch (error) {
            console.error('User denied account access or error occurred', error);
        }
    } else if (window.solana) {
        alert("Solana Wallet detected");
        // Here you would add code to interact with Solana wallet (for example using @solana/web3.js)
    } else {
        alert("No Web3 wallet detected. Please install MetaMask or other Web3 wallet.");
    }
});

// Copy address to clipboard
function copyToClipboard(address) {
    navigator.clipboard.writeText(address)
        .then(() => {
            alert('Address copied to clipboard!');
        })
        .catch(err => {
            console.error('Error copying address: ', err);
        });
}
