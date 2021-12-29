// import connection.js file for metamask connection
import metamaskConfig from './connection.js';
import { ethers } from './ethers-5.1.esm.min.js';

const network = document.getElementById('networkId');
const chainId = document.getElementById('chainId');
const account = document.getElementById('accountId');
const balance = document.getElementById('balance');

const connect = document.getElementById('connectToWallet');

const consultDataButton = document.getElementById('consultButton');

// check if metamask is installed in browser
if (metamaskConfig.isMetamaskInstalled) {
    console.log('Metamask is installed!');
} else {
    alert('Install Metamask extension to connect with DApp!');
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

consultDataButton.addEventListener('click', async(e) => {
    e.preventDefault()

    let lastHash = document.getElementById("file_hash").innerHTML;
    let responseBlock = document.getElementById("responseBlock");
    let hashState = document.getElementById("hashState");
    let signState = document.getElementById("signState");
    let documentState = document.getElementById("documentState");
    let signers = document.getElementById("signers");




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

    // let ethereum = window.ethereum;

    let result = lastHash.slice(18, 82);

    hashState.innerHTML = result;

    const saldo = await contract.saldo(signer.getAddress());

    const docfirmado = await contract.address2hashstate(signer.getAddress(), result);

    const totalCertificates = await contract.totalCertiBits();

    responseBlock.style.display = 'block';
    console.log("El saldo es:" + saldo);

    console.log("Total de firmas en la plataforma:" + totalCertificates);

    if (docfirmado == true) {
        signState.innerHTML = "This document has been signed by you.";
        console.log("Este documento ha sido firmado por usted");
    } else {
        signState.innerHTML = "This document has not been signed by you.";
        console.log("Usted no ha firmado este documento")
    }

    const signersList = [];

    for (let i = 0; i <= totalCertificates; i++) {
        const signers_contract = await contract.hash2addressList(result, i);

        if (signers_contract) {
            documentState.innerHTML = "This document has been signed in the platform.";
            console.log("Este documento ha sido firmado en la plataforma");
        } else {
            documentState.innerHTML = "This document has not been signed in the platform.";
            console.log("Este documento no ha sido firmado en la plataforma");
        }

        console.log(signers);
        let li = document.createElement("li");
        li.innerText = signers_contract;
        signers.appendChild(li);

    }

    console.log(signersList);

    signers.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        signers.appendChild(li);
    })


    // Request account access if needed
    // await ethereum.enable();

    // // Acccounts now exposed
    // const params = [{
    //     data: tx
    // }];

    // const transactionHash = await provider.send('eth_sendTransaction', params);
    // const receipt = await tx.wait();
    // console.log('receipt is' + receipt);
    // console.log('transactionHash is ' + transactionHash);

});