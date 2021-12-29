// import connection.js file for metamask connection
import metamaskConfig from './connection.js';
import { ethers } from './ethers-5.1.esm.min.js';

const network = document.getElementById('networkId');
const chainId = document.getElementById('chainId');
const account = document.getElementById('accountId');
const balance = document.getElementById('balance');
const hash = document.getElementById('hash');

const connect = document.getElementById('connectToWallet');

const buy_one = document.getElementById('buy_1');
const buy_two = document.getElementById('buy_2');
const buy_three = document.getElementById('buy_3');

// check if metamask is installed in browser
if (metamaskConfig.isMetamaskInstalled) {
    console.log('Metamask is installed!')
} else {
    alert('Install Metamask extension to connect with DApp!')
}

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

buy_one.addEventListener('click', async(e) => {
    e.preventDefault()

    let getAccountAddress = await metamaskConfig.getAccount();

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    console.log("Solo hace falta firmar........");

    console.log(getAccountAddress);

    const contract = new ethers.Contract(contractAddress, abi, signer);

    // let ethereum = window.ethereum;

    try {
        const tx = await contract.recargar({ value: ethers.utils.parseEther('1'), });

        const receipt = await tx.wait();

        if (receipt) {
            Swal.fire(
                'Signature Recharged!',
                'Your Signature was recharged, now you can sign documents!',
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

    // const tx = await contract.recargar({ value: ethers.utils.parseEther('1'), });

    // // Acccounts now exposed
    // const params = [{
    //     data: tx,
    //     value: '1'
    // }];

    // const transactionHash = await provider.send('eth_sendTransaction', params);
    // const receipt = await tx.wait();
    // console.log('receipt is' + receipt);
    // console.log('transactionHash is ' + transactionHash);

});

buy_two.addEventListener('click', async(e) => {
    e.preventDefault()

    let getAccountAddress = await metamaskConfig.getAccount();

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    console.log("Solo hace falta firmar........");

    console.log(getAccountAddress);

    const contract = new ethers.Contract(contractAddress, abi, signer);

    // let ethereum = window.ethereum;

    try {
        const tx = await contract.recargar({ value: ethers.utils.parseEther('2'), });

        const receipt = await tx.wait();

        if (receipt) {
            Swal.fire(
                'Signature Recharged!',
                'Your Signature was recharged, now you can sign documents!',
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


    // const tx = await contract.recargar({ value: ethers.utils.parseEther('2'), });


    // Request account access if needed
    // await ethereum.enable();

    // Acccounts now exposed
    // const params = [{
    //     data: tx,
    //     value: '2'
    // }];

    // const transactionHash = await provider.send('eth_sendTransaction', params);
    // const receipt = await tx.wait();
    // console.log('receipt is' + receipt);
    // console.log('transactionHash is ' + transactionHash);

});

buy_three.addEventListener('click', async(e) => {
    e.preventDefault()

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

    try {
        const tx = await contract.recargar({ value: ethers.utils.parseEther('3'), });

        const receipt = await tx.wait();

        if (receipt) {
            Swal.fire(
                'Signature Recharged!',
                'Your Signature was recharged, now you can sign documents!',
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

    // const tx = await contract.recargar({ value: ethers.utils.parseEther('3'), });

    // Request account access if needed
    // await ethereum.enable();

    // Acccounts now exposed
    // const params = [{
    //     data: tx,
    //     value: '3'
    // }];

    // const transactionHash = await provider.send('eth_sendTransaction', params);
    // const receipt = await tx.wait();
    // console.log('receipt is' + receipt);
    // console.log('transactionHash is ' + transactionHash);

});