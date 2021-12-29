function connectMetamask() {

    var isMetamaskInstalled = () => ethereum.isMetamaskInstalled()

    if (isMetamaskInstalled) {
        console.log('Metamask Is Installed!')
    } else {
        alert('Install Metamask extension to connect with Dapp')
    }

    var isMetamaskConnected = () => ethereum.isConnected()

    const getChainId = async() => {
        return await ethereum.request({ method: 'eth_chainId' })
    }

    const getNetworkId = async() => {
        return await ethereum.request({ method: 'net_version' })
    }

    if (isMetamaskConnected()) {
        ethereum.autoRefreshOnNetworkChange = false
        network.innerHTML = getNetworkId()
        ChainId.innerHTML = getChainId()
        connectToAccount();
        console.log('Metamask Connected:', isMetamaskConnected())
    } else {
        alert('Connect to available ethereum network!');
        console.log('Connect to available ethereum network!')
    }

    const connectToAccount = async() => {
        try {
            let account = await ethereum.request({ method: 'eth_accounts' })
            return account
        } catch (error) {
            console.log('Error getting account: ', error)
            return error
        }
    }
}