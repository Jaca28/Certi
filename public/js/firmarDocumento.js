// import connection.js file for metamask connection
import metamaskConfig from './connection.js'
import { ethers } from './ethers-5.1.esm.min.js'

const network = document.getElementById('networkId');
const chainId = document.getElementById('chainId');
const account = document.getElementById('accountId');
const balance = document.getElementById('balance');

const connect = document.getElementById('connectToWallet')

const firmarButton = document.getElementById('firmarButton')

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

firmarButton.addEventListener('click', async(e) => {
    e.preventDefault()

    let lastHash = document.getElementById("file_hash").innerHTML


    let getAccountAddress = await metamaskConfig.getAccount();

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    console.log("Solo hace falta firmar........");

    console.log(getAccountAddress);
    // console.log(document.getElementById("file_hash").innerHTML);

    const contract = new ethers.Contract(contractAddress, abi, signer);

    let result = lastHash.slice(18, 82);

    console.log("El hash a  publicar es :" + result);

    try {
        const tx = await contract.certify(result);

        const receipt = await tx.wait();

        if (receipt) {
            Swal.fire(
                'Document Signed!',
                'You have signed your document, and the hash document with your sign was uploaded to the Celo Blockchain!',
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

    // const transactionHash = await provider.send('eth_sendTransaction', params);
    // const receipt = await tx.wait();

    // if (receipt) {
    //     Swal.fire(
    //         'Document Signed!',
    //         'You have been Signed your document!',
    //         'success'
    //     )

    // } else {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Oops...',
    //         text: 'Something went wrong!',
    //         footer: '<a href="">Why do I have this issue?</a>'
    //     })
    // }
    // receipt;


    // async(transactionHash) => {
    //     const txReceipt = await provider.getTransactionReceipt(transactionHash);
    //     if (txReceipt && txReceipt.blockNumber) {
    //         swal("Your document has been signed", "Go to verify!", "success");
    //         return txReceipt;
    //     }
    // }



});