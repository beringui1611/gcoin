// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Gcoin is ERC20 {


    /* This contract is only for the genesis token. Exploited Smart Contracts result in 
    better performance and code readability, as well as improved maintenance.
    The YieldGenesis contract will have a function to return the official contract. */

    address owner;
    uint32 price = 1000000; /*pegged to the dollar */
    address oficialAddress;

    constructor()ERC20("Genesys Coin","GNS"){
      _mint(msg.sender, 6_802_250 *10 **decimals());
      owner = msg.sender;
       
    }


    /*this function returns the owner of the token */

    function getOwner() public view returns(address){
        return owner;
    }


    /* this function returns the price of the token */

    function getPrice() public view returns(uint32){
        return price;
    }


    /* this function add new address the official contract */

    function registerOficialContract(address _address) onlyOwner external {
        oficialAddress = _address;
    }


    /* this function returns address of the official smart contract */

    function getOficialAddress() public view returns(address){
        return oficialAddress;
    }


    /* this function burnable make a controll cross chain */
    function burn(uint amount) external onlyOwner {
        _burn(_msgSender(), amount);
    }


    function decimals() public view override returns (uint8) {
        return 6;
	}


    /* this modifier uesed for access controll */
    modifier onlyOwner(){
        require(_msgSender() == owner, "do you not permission");
        _;
    }


}
