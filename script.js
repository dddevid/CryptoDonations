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
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Ottieni l'indirizzo dell'utente
            const userAddress = await signer.getAddress();

            // Ottieni l'indirizzo della criptovaluta in base al tipo
            const donationAddress = getDonationAddress(crypto);

            // Chiedi l'importo della donazione all'utente
            const amountInEth = prompt("Quanto vuoi donare? (in ETH)");

            // Verifica se l'importo è valido
            if (amountInEth && !isNaN(amountInEth)) {
                // Converti l'importo in ETH in base alla criptovaluta selezionata
                const amount = convertEthToCrypto(amountInEth, crypto);

                // Invia la transazione (questa parte va modificata in base alla criptovaluta)
                let tx;
                if (crypto === 'eth' || crypto === 'base' || crypto === 'polygon') { 
                    // Per ETH, Base e Polygon, usiamo la stessa logica di invio transazione
                    const donationAmount = ethers.utils.parseUnits(amount, 'ether');
                    tx = await signer.sendTransaction({
                        to: donationAddress,
                        value: donationAmount,
                    });
                } else {
                    // Per altre criptovalute, la logica di invio transazione va implementata 
                    // in base alla libreria e al metodo di interazione con la blockchain specifica.
                    // Ad esempio, per Solana, potresti usare web3.js o @solana/web3.js
                    alert(`Donazione in ${crypto} non ancora implementata.`);
                    return; 
                }

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

// Funzione per convertire ETH in altre criptovalute (implementazione di esempio)
// **NOTA:** Questa funzione è solo un esempio e non riflette tassi di cambio reali.
// Dovresti integrare un servizio di API per ottenere tassi di cambio aggiornati.
function convertEthToCrypto(amountInEth, crypto) {
    switch (crypto) {
        case 'eth':
            return amountInEth;
        case 'solana':
            // Esempio: 1 ETH = 50 SOL (Tasso di cambio fittizio)
            return (parseFloat(amountInEth) * 50).toString();
        case 'base':
            return amountInEth;
        case 'polygon':
            return amountInEth;
        // Aggiungi altre criptovalute e i loro tassi di cambio qui
        default:
            throw new Error("Cryptocurrency not supported");
    }
}

// Funzione per ottenere l'indirizzo di donazione in base alla criptovaluta
function getDonationAddress(crypto) {
    // ... (codice invariato) ...
}

// Aggiungi eventi ai pulsanti di donazione
document.getElementById('eth-donate').addEventListener('click', () => {
    donateWithWallet('eth');
});

document.getElementById('solana-donate').addEventListener('click', () => {
    donateWithWallet('solana'); 
});

// Altri eventi per le altre criptovalute possono essere aggiunti allo stesso modo.
