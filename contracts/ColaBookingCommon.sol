// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.7;

library  ColaBookingCommon {
    // Company Structure
    struct companyStructure {
        uint8 companyId;
        string name;
    }

    // Booking Structure
    struct bookingStructure {
        uint256 crTime;
        uint company;
        uint hour;
        uint roomId;
        address user;
    }
}
