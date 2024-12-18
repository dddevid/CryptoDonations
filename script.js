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

// Funzione per inviare una donazione tramite wallet Web3
async function donateWithWallet(crypto) {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Connessione a MetaMask o altro wallet Ethereum
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            // Ottieni l'indirizzo dell'utente
            const userAddress = await signer.getAddress();

            // Ottieni l'indirizzo della criptovaluta in base al tipo
            const donationAddress = getDonationAddress(crypto);

            // Chiedi l'importo della donazione all'utente
            const amount = prompt("Quanto vuoi donare? (in ETH)");

            // Verifica se l'importo è valido
            if (amount && !isNaN(amount)) {
                const donationAmount = ethers.parseUnits(amount, 'ether');

                // Invia la transazione
                const tx = await signer.sendTransaction({
                    to: donationAddress,
                    value: donationAmount,
                });

                alert(`Transazione completata! Hash della transazione: ${tx.hash}`);
            } else {
                alert("Importo non valido.");
            }
        } catch (error) {
            console.error('Errore durante l\'invio della donazione:', error);
            alert("Errore durante la connessione al wallet o l'invio della donazione.");
        }
    } else {
        alert("Wallet Web3 non rilevato. Per favore, installa MetaMask o un altro wallet Web3.");
    }
}

// Funzione per ottenere l'indirizzo di donazione in base alla criptovaluta
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

// Aggiungi eventi ai pulsanti di donazione
document.getElementById('eth-donate').addEventListener('click', () => {
    donateWithWallet('eth');
});

document.getElementById('solana-donate').addEventListener('click', () => {
    alert("Solana non supporta il trasferimento tramite Web3.js direttamente. Usa il tuo wallet Solana.");
});

// Altri eventi per le altre criptovalute possono essere aggiunti allo stesso modo.
