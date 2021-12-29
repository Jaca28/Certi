import { ethers } from './ethers-5.1.esm.min.js'
import { utils } from './ethers-5.1.esm.min.js'

const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
const signer = provider.getSigner()

// function to check if metamask is installed
var isMetamaskInstalled = () => ethereum.isMetamaskInstalled

// function to check if metamask is connected to the current chain
var isMetamaskConnected = () => ethereum.isConnected()

const connectToAccount = async() => {
    try {
        let account = await ethereum.request({ method: 'eth_requestAccounts' })
        return account
    } catch (error) {
        console.log('Error connecting to metamask account:\n', error)
        return error
    }
}

contractAddress = '0x0847D345396D20A223fa234FdcC2CA9Aa176b297';

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

const contract = new ethers.Contract(contractAddress, abi, provider);

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
// Prompt user for account connections
await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner();
console.log("Account:", await signer.getAddress());


console.log(`payWithMetamask(receiver='0xdDfC828B5A3738216889dFF4DB51416Fb9173570', sender='0x9d434d1fDCA17F0705c925Da34fAd7e20Aa05b5C', strEther='1')`)

let ethereum = window.ethereum;


// Request account access if needed
await ethereum.enable();


let provider = new ethers.providers.Web3Provider(ethereum);

// Acccounts now exposed
const params = [{
    from: sender,
    to: receiver,
    value: ethers.utils.parseUnits(strEther, 'ether').toHexString()
}];

const transactionHash = await provider.send('eth_sendTransaction', params)
console.log('transactionHash is ' + transactionHash);


export default {
    signer,
    isMetamaskInstalled,
    isMetamaskConnected,
    connectToAccount,
}