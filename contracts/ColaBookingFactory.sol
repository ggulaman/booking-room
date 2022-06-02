// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.7;

import './ColaBooking.sol';

/// @title Cola Booking Factory
/// @author raul castillo
/// @notice Smart Contract (SC) which generates ColaBooking(CB) SCs. This is a beta version.
/// @dev TODO: 1. Check no duplicated CB SC for the same date | 2. Check which functions should not be public | 3. Import the OpenZeppelin Owner SC 
contract ColaBookingFactory {
    // event for Etherum Virtual Machine (EVM) logging the Owner of the SC (Smart Contract)
    event OwnerSet(address indexed oldOwner, address indexed newOwner);

    // event for Etherum Virtual Machine (EVM) logging a new ColaBooking SC creation
    event ColaDayCreated(uint256 numColaDays, uint256 numRoomsPerCompany);

    address public owner; // store address of ColaBookingFactory owner
    uint public numColaDays; // number of ColaBooking deployed
    mapping (uint => ColaBooking) public colaBookingDays; // maps the numColaDays with 

    /**
     * @dev We should implement the OpenZeppelin Owner SC
     */
    constructor() {
        owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
        emit OwnerSet(address(0), owner);
    }

    /**
     * @notice Creates a new ColaBooking SC
     * @dev TODO: 1. NFT deposit is pending. 2. Dynamic Fee might be integrated in the future. 3. Lottery is pending
     * @param _date in epox, _numRoomsPerCompany the num. of available rooms per company
     * @return the ColaBooking SC id
     */
    function createColaDay(uint _date, uint _numRoomsPerCompany) public returns(uint) {
        require(owner == msg.sender, "only owner can create");
        ColaBooking colaBooking = new ColaBooking(_date, owner, _numRoomsPerCompany);
        colaBookingDays[numColaDays] = colaBooking;
        
        emit ColaDayCreated(numColaDays, _numRoomsPerCompany);
        numColaDays += 1;
        return numColaDays -1;
    }
}