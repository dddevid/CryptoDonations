let web3;
let currentProvider;

// Funzione per connettere il wallet
document.getElementById('connect-wallet').addEventListener('click', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            // Richiedi l'accesso all'account
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            currentProvider = accounts[0];
            alert(`Connesso al wallet: ${currentProvider}`);
        } catch (error) {
            console.error('L\'utente ha negato l\'accesso o si è verificato un errore', error);
        }
    } else {
        alert("Wallet Web3 non rilevato. Si prega di installare MetaMask o un altro wallet Web3.");
    }
});

// Funzione per copiare l'indirizzo negli appunti
function copyToClipboard(address) {
    navigator.clipboard.writeText(address)
        .then(() => {
            alert('Indirizzo copiato negli appunti!');
        })
        .catch(err => {
            console.error('Errore nel copiare l\'indirizzo: ', err);
        });
}

// Funzione per inviare una donazione
async function sendDonation(crypto, amount) {
    if (!web3) {
        alert("Per favore, connetti il tuo wallet prima di fare una donazione.");
        return;
    }

    const donationAddress = getDonationAddress(crypto); // Ottieni l'indirizzo di donazione
    const donationAmount = web3.utils.toWei(amount, 'ether'); // Converte l'importo in wei (unità di Ethereum)

    try {
        const tx = await web3.eth.sendTransaction({
            from: currentProvider,
            to: donationAddress,
            value: donationAmount,
        });
        alert(`Transazione completata! Hash della transazione: ${tx.transactionHash}`);
    } catch (error) {
        console.error('Errore durante l\'invio della donazione', error);
        alert("Si è verificato un errore durante la donazione.");
    }
}

// Funzione per ottenere l'indirizzo di donazione in base alla criptovaluta scelta
function getDonationAddress(crypto) {
    switch (crypto) {
        case 'eth':
            return '0x01195b0Ae97b2D461aB0C746663bFE915eb9ac7c';
        case 'solana':
            return 'E3JUcjyR6UCJtppU24iDrq82FyPeV9nhL1PKHx57iPXu';
        case 'base':
            return '0x01195b0Ae97b2D461aB0C746663bFE915eb9ac7c';
        case 'polygon':
            return '0x01195b0Ae97b2D461aB0C746663bFE915eb9ac7c';
        case 'btc-taproot':
            return 'bc1p5paurws3z4c8gslznmvnxjw4hlesfe02yncqaqyljvl9vxuchk6smcen70';
        case 'btc-segwit':
            return 'bc1qrfv880kc8qamanalc5kcqs9q5wszh90e5eggyz';
        default:
            throw new Error("Cryptocurrency not supported");
    }
}

// Aggiungi un evento di clic per ogni bottone di donazione
document.getElementById('eth-donate').addEventListener('click', () => {
    const amount = prompt("Quanto vuoi donare in ETH?");
    if (amount && !isNaN(amount)) {
        sendDonation('eth', amount);
    } else {
        alert("Importo non valido.");
    }
});

document.getElementById('solana-donate').addEventListener('click', () => {
    alert("Solana non supporta il trasferimento tramite Web3.js direttamente. Usa il tuo wallet Solana.");
});

// Altri eventi per le altre criptovalute possono essere aggiunti allo stesso modo.
