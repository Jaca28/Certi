// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract CertiBits{  // defino que mi contrato se va a llamar Inbox

    uint public totalCertiBits;   // variable donde se almacena la información
    address owner;
    mapping (string => address[]) public hash2addressList;
    mapping (address => mapping(string => bool)) public address2hashstate;

    constructor () {  // este es el metodo constructor donde     inicializo el contrato con un mensaje
        owner = msg.sender;
    }
    
    uint IDu;
    
    function isOwner() view private returns(bool) {
        return msg.sender == owner;    
    }
    
    modifier onlyOwner {
        require(isOwner(), "Only owner can do that!");
        _;
    }
    
    struct usuario {
        uint IDusuario;
        string nombre;
        string nit;
        string email;
        address owner;
    }
    usuario[] public usuarios;
    mapping (address => uint) public pubkey2IDu;
    mapping (address => bool) public address2state;
    mapping (address => uint) public saldo;
    
    function nuevo_usuario(string memory _nombre, string memory _nit, string memory _email, address _owner) public {
        require(address2state[msg.sender]==false,"This Address is already subscribed to the contract");
        usuarios.push(usuario(IDu,_nombre,_nit,_email,_owner));
        pubkey2IDu[msg.sender]=IDu;
        IDu+=1;
        address2state[msg.sender]=true;
    }

    function certify(string memory _hash) public { // esta función permite reemplazar el mensaje almacenada en la variable message
        require(address2state[msg.sender],"Address not subscribed to the contract");
        require(!address2hashstate[msg.sender][_hash],"Address already signed these document");
        require(saldo[msg.sender]>=1,"No balance");
        saldo[msg.sender]-=1;
        address2hashstate[msg.sender][_hash]=true;
        hash2addressList[_hash].push(msg.sender);
        totalCertiBits++;
    }
    
    function recargar() public payable {
        require(address2state[msg.sender],"Address not subscribed to the contract");
        require(msg.value>=1e18,"The value must be at least 1 Celo");
        if( msg.value>=1e18 && msg.value<2e18 ){
            saldo[msg.sender]+=10;
        }
        if(msg.value>=2e18 && msg.value<3e18){
            saldo[msg.sender]+=25;
        }
        if(msg.value>=3e18){
            saldo[msg.sender]+=50;
        }
    }

    function claimProfit(address payable _receiver) public payable onlyOwner {
        
        _receiver.transfer(address(this).balance);

    }
}