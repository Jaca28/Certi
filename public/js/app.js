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

// if metamask is connected do this
const checkOnLoad = async() => {
    if (metamaskConfig.isMetamaskConnected) {
        ethereum.autoRefreshOnNetworkChange = false
        network.innerHTML = await metamaskConfig.getNetworkId()
        chainId.innerHTML = await metamaskConfig.getChainId()
        await metamaskConfig.connectToAccount()
        console.log('Metamask connected:', await metamaskConfig.isMetamaskConnected())
    } else {
        alert('Connect to available ethereum network!')
        console.log('Connect to available ethereum network!')
    }
}

checkOnLoad()

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
connect.addEventListener('click', async(e) => {
    e.preventDefault()

    let getAccountAddress = await metamaskConfig.getAccount()
    if (getAccountAddress.length < 1) {
        getAccountAddress = await metamaskConfig.connectToAccount()
        account.innerHTML = getAccountAddress;
        balance.innerHTML = await metamaskConfig.getBalance()
    } else {
        account.innerHTML = getAccountAddress;
        balance.innerHTML = await metamaskConfig.getBalance()
    }
    console.log(getAccountAddress)
})

//Boton firmar

signButton.addEventListener('click', async(e) => {
    e.preventDefault()

    const names = document.getElementById('name');
    const identification = document.getElementById('identification');
    const email = document.getElementById('email');



    let getAccountAddress = await metamaskConfig.getAccount();

    if (getAccountAddress.length < 1) {
        getAccountAddress = await metamaskConfig.connectToAccount();
        account.innerHTML = getAccountAddress;
        balance.innerHTML = await metamaskConfig.getBalance();
        hash.innerHTML = document.getElementById("file_hash").innerHTML;
    } else {
        account.innerHTML = getAccountAddress;
        balance.innerHTML = await metamaskConfig.getBalance();
        hash.innerHTML = document.getElementById("file_hash").innerHTML;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    console.log("Solo hace falta firmar........");

    console.log(getAccountAddress);
    console.log(document.getElementById("file_hash").innerHTML);

    contractAddress = '0x8F49164fB8D780C151822f3F536fb4C9926a52bB';

    abi = [{
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [{
                "internalType": "string",
                "name": "_hash",
                "type": "string"
            }],
            "name": "Certify",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "name": "address2state",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "hash2addressList",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "string",
                    "name": "_nombre",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_nit",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_email",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "nuevo_usuario",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "name": "pubkey2IDu",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "_pk_usuario",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_valor",
                    "type": "uint256"
                }
            ],
            "name": "recargar",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "name": "saldo",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalCertiBits",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "name": "usuarios",
            "outputs": [{
                    "internalType": "uint256",
                    "name": "IDusuario",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "nombre",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "nit",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "email",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const contract = new ethers.Contract(contractAddress, abi, signer);

    console.log(contract);
    console.log(signer);

    console.log(`payWithMetamask(receiver='0xdDfC828B5A3738216889dFF4DB51416Fb9173570', sender='0x9d434d1fDCA17F0705c925Da34fAd7e20Aa05b5C', strEther='1')`);

    let ethereum = window.ethereum;

    const tx = await contract.nuevo_usuario('names', 'identification', 'email', signer.getAddress());


    // Request account access if needed
    await ethereum.enable();

    // Acccounts now exposed
    const params = [{
        data: tx
    }];

    const transactionHash = await provider.send('eth_sendTransaction', params);
    const reciept = await tx.wait();
    console.log('transactionHash is ' + transactionHash);

});