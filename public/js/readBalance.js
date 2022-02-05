import metamaskConfig from './connection.js';
import { ethers } from './ethers-5.1.esm.min.js';

if (metamaskConfig.isMetamaskInstalled) {
    console.log('Metamask is installed!');
} else {
    Swal.fire({
        icon: 'error',
        title: 'Please Install Metamask',
        text: 'You can install from here',
        footer: '<a href="https://metamask.io/">Install</a>'
    });;
}

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
// Prompt user for account connections
await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner();

let maticBalance = (await signer.getBalance());
console.log("El balance de matic es: " + await metamaskConfig.getBalance());
console.log((maticBalance));
document.getElementById("maticBalance").innerHTML = (maticBalance/1e18).toFixed(3) + ' MATIC';

// event triggered when account is changed in metamask
ethereum.on('accountsChanged', async(accounts) => {
    console.log('Account changed from', account)
    account.innerHTML = await metamaskConfig.getAccount()
    maticBalance.innerHTML = await metamaskConfig.getBalance()

})

// event triggered when metamask is connected to chain and can make rpc request
ethereum.on('connect', (chainId) => {
    console.log(chainId)
    console.log('Metamask Connected:', ethereum.isConnected())
})

// event triggered when metamask is disconnected from chain and can not make rpc request
ethereum.on('disconnect', (chainId) => {
    console.log(chainId)
    console.log('Metamask Connected:', ethereum.isConnected())
    alert('Metamask is not connected to ethereum network. Retry!')
})

let getAccountAddress = await metamaskConfig.getAccount();
const contract = new ethers.Contract(contractAddress, abi, signer);
const saldo = await contract.saldo(signer.getAddress());
console.log("Las firmas son:" + saldo);
document.getElementById("signBalance").innerHTML = saldo + ' Signatures';