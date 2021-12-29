// import connection.js file for metamask connection
import metamaskConfig from './connection.js'
import { ethers } from './ethers-5.1.esm.min.js'

const network = document.getElementById('networkId')
const chainId = document.getElementById('chainId')
const account = document.getElementById('accountId')
const balance = document.getElementById('balance')
const hash = document.getElementById('hash')

const connect = document.getElementById('connectToWallet')

const signButton = document.getElementById('signButton')

// check if metamask is installed in browser
if (metamaskConfig.isMetamaskInstalled) {
    console.log('Metamask is installed!')
} else {
    alert('Install Metamask extension to connect with DApp!')
}

// event triggered when account is changed in metamask
ethereum.on('accountsChanged', async(accounts) => {
    console.log('Account changed from', account)
    account.innerHTML = await metamaskConfig.getAccount()
    balance.innerHTML = await metamaskConfig.getBalance()
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

// add click event listener on the connect button

//Boton firmar

signButton.addEventListener('click', async(e) => {
    e.preventDefault()

    const names = document.getElementById('name').value;
    const identification = document.getElementById('identification').value;
    const email = document.getElementById('email').value;
    let getAccountAddress = await metamaskConfig.getAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    console.log("Solo hace falta firmar........");

    console.log(getAccountAddress);

    const contract = new ethers.Contract(contractAddress, abi, signer);

    console.log(contract);
    console.log(signer);
    console.log(names);
    console.log(identification);
    console.log(email);

    // let ethereum = window.ethereum;

    // const tx = await contract.nuevo_usuario(names, identification, email, signer.getAddress());

    try {
        const tx = await contract.nuevo_usuario(names, identification, email, signer.getAddress());

        const receipt = await tx.wait();

        if (receipt) {
            Swal.fire(
                'Signature Registered!',
                'Your Sign was registered in the Smart contract, please recharge your signature for sign documents!',
                'success'
            );

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            });
        }
    } catch (error) {

        Swal.fire({
            icon: 'error',
            title: 'Eror',
            text: error.data.message,
            footer: '<a href="">Why do I have this issue?</a>'
        });
    }

    // Request account access if needed
    await ethereum.enable();

    // Acccounts now exposed
    // const params = [{
    //     data: tx
    // }];

    // try {

    //     const transactionHash = await provider.send('eth_sendTransaction', params);
    //     // const receipt = await tx.wait();
    //     console.log('receipt is' + receipt);
    //     console.log('transactionHash is ' + transactionHash);

    // } catch (error) {

    // }

    // const isTransactionMined = async(transactionHash) => {
    //     const txReceipt = await provider.getTransactionReceipt(transactionHash);
    //     if (txReceipt && txReceipt.blockNumber) {
    //         return txReceipt;
    //     }
    // }

    // isTransactionMined();



});