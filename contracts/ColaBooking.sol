// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.7;

import "./ColaBookingCommon.sol";

/// @title Cola Booking
/// @author raul castillo
/// @notice Smart Contract (SC) which handles the room booking during the Cola day. This is a beta version.
/// @dev TODO: 1. Check which functions should not be public | 2. Import the OpenZeppelin Owner SC  | 3. Pearse the Gas Consumption
contract ColaBooking {
    using ColaBookingCommon for *;


    // EVENTS
    // event for Etherum Virtual Machine (EVM) logging a New Booking
    event newBooking(uint indexed bookingId, uint indexed companyId, uint indexed hour, uint roomId);
    // event for Etherum Virtual Machine (EVM) logging a New Cancelation
    event bookingCancelation(uint addresscompanyId, uint _hour, uint _roomId);


    // MODIFIERS
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    // GENERIC VARIABLES
    address public owner; // address of the SC owner
    uint public date; // date of the cola day in epox time
    uint public maxBookingsPerUser = 1; // Max amount of Booking per Employee/User
    bool public canBook = true; // To enable / disable the booking system
    uint public numRoomsPerCompany; // number of rooms available per company
    uint8 private constant numCompanies = 2; // numer of companies
    string[numCompanies] public companiesArray = ["CocaCola","Pepsi"]; // array with companies names
    
    // BOOKING DATA VARIABLES 
    uint256 private bookingsCounter = 1; // counter to count the number of bookings, which is used as a booking receipt ID
    mapping(address => uint256) public numberUserBookings; // maps an address with the sum of all its bookings
    uint256[] public bookingsArrayMap; // Array mapping each room with its receipt ID, where [] (numCompanies * numHours * rooms). Each item has an int, where if it's 0, means the room is not booked. If >0, that's its booking receipt
    ColaBookingCommon.bookingStructure[] public bookingReceiptsList; // Array linking each booking receipt with a struc with booking metadata
    address[] public cocacolaPendingEmployees; // array with all CocaCola employees
    address[] public pepsiPendingEmployees; // array with all CocaCola employees
    address[] public cocacolaEmployees; // array with all CocaCola employees
    address[] public pepsiEmployees; // array with all Pepsi employees

    /**
     * @notice Creates a SC which will be called from the UI
     */
    constructor (uint256 _date, address _owner, uint _numRoomsPerCompany) {
        date = _date;
        owner = _owner;
        numRoomsPerCompany = _numRoomsPerCompany;
        
        for (uint i=0; i < 24 * 2 * _numRoomsPerCompany; i++) {
            bookingsArrayMap.push(0);
        }
        bookingReceiptsList.push();
    }


    // READ FUNCTIONS
    /**
     * @notice  asdf
     * @return asdf
     */
    function getBookingCounter() public view returns(uint) {
        return(bookingsCounter-1);
    }

    /**
     * @notice Returns the Index of Room to be used on bookingsArrayMap
     * @param _companyId 0 CocaCola 1 Pepsi, _hour between 0 and 23, _roomId between 0 and num. of rooms per company
     * @return the index
     */
    function getRoomIndex(uint _companyId, uint _hour, uint _roomId) private view returns(uint) {
        require(_companyId < numCompanies, "Company Id not exist");
        require(_hour < 24, "Until 11 pm");
        require(_roomId < numRoomsPerCompany, "Room Id not exist");
        uint roomIndex = _roomId + _hour * numRoomsPerCompany + _companyId * 24  * numRoomsPerCompany;
        return(roomIndex);
    }

    /**
     * @notice Employee belongs to a company
     * @param _companyId 0 CocaCola 1 Pepsi, _user
     * @return bool
     */
    function getIfUserBelongsTo(uint _companyId, address _user) view public returns(bool) {
        if (_companyId == 0) {
            for (uint i=0; i < cocacolaEmployees.length; i++) {
                if (cocacolaEmployees[i] == _user) {
                    return(true);
                }
            }
        } else {
            for (uint i=0; i < pepsiEmployees.length; i++) {
                if (pepsiEmployees[i] == _user) {
                    return(true);
                }
            }
        }
        return false;
    }

    /**
     * @notice Employee belongs to a company
     * @param _companyId 0 CocaCola 1 Pepsi, _user
     * @return bool
     */
    function getIfUserPendingFor(uint _companyId, address _user) view public returns(bool) {
        if (_companyId == 0) {
            for (uint i=0; i < cocacolaPendingEmployees.length; i++) {
                if (cocacolaPendingEmployees[i] == _user) {
                    return(true);
                }
            }
        } else {
            for (uint i=0; i < pepsiPendingEmployees.length; i++) {
                if (pepsiPendingEmployees[i] == _user) {
                    return(true);
                }
            }
        }
        return false;
    }

    /**
     * @notice Returns the number of bookings of the user
     * @return the number of bookings of the user
     */
    function getNumberOfUserBookings() view public returns(uint256) {
        return(numberUserBookings[msg.sender]);
    }

    /**
     * @notice Returns if a room is booked
     * @param _companyId 0 CocaCola 1 Pepsi, _hour between 0 and 23, _roomId between 0 and num. of rooms per company
     * @return true or false
     */
    function getIfRoomIsBooked(uint _companyId, uint _hour, uint _roomId) view public returns(bool) {
        return(bookingsArrayMap[getRoomIndex(_companyId, _hour, _roomId)]>0);
    }

    /**
     * @notice Returns all user bookings
     * @return an array of bookingStructure
     */
    function getUserBookings () view public returns(ColaBookingCommon.bookingStructure[] memory) {
        uint numOfUserBookings = getNumberOfUserBookings();
        uint counterOfUserBookings;
        ColaBookingCommon.bookingStructure[] memory userBookings = new ColaBookingCommon.bookingStructure[](numOfUserBookings);
        for (uint i=0; i < 24 * numCompanies * numRoomsPerCompany; i++) {
            if (bookingReceiptsList[bookingsArrayMap[i]].user == msg.sender) {
                userBookings[counterOfUserBookings] = bookingReceiptsList[bookingsArrayMap[i]];
                counterOfUserBookings += 1;
            }
        }
        return(userBookings);
    }

    /**
     * @notice Returns the available/booked rooms per company at certain time
     * @param _companyId 0 CocaCola 1 Pepsi, _hour between 0 and 23
     * @return an array of int with the receipts (0 is available, >0 is booked )
     */
    function getRoomsStatusPerCompanyAt (uint _companyId, uint _hour) view public returns(uint256 [] memory) {
        uint256[] memory companyRoomsAtList = new uint256[](numRoomsPerCompany);
        for (uint i=0; i < numRoomsPerCompany; i++) {
            companyRoomsAtList[i] = bookingsArrayMap[getRoomIndex(_companyId, _hour, i)];
        }
        return(companyRoomsAtList);
    }

    function getEmployeesOf(uint _companyId) view public returns(address []memory) {
        if (_companyId  == 1) {
            return cocacolaEmployees;
        } else {
            return pepsiEmployees;
        }
    }

    function getPendingEmployeesOf(uint _companyId) view public returns(address []memory) {
        if (_companyId  == 0) {
            return cocacolaPendingEmployees;
        } else {
            return pepsiPendingEmployees;
        }
    }


    // WRITE FUNCTIONS
    /**
     * @notice Books a room
     * @dev TODO: 1. Recognise user by NFT
     * @param _hour between 0 and 23, _roomId between 0 and num. of rooms per company
     * @return the booking receipt
     */
    function bookARoom (uint _hour, uint _roomId) public returns(uint256){
        require(getNumberOfUserBookings() < maxBookingsPerUser, "User cannot place more bookings");
        require(canBook, "Bookings are disable");
        require(getIfUserBelongsTo(0, msg.sender) || getIfUserBelongsTo(1, msg.sender), "user does not belong to any company");

        uint companyId = getIfUserBelongsTo(0, msg.sender) ? 1 : 0;
        require(!getIfRoomIsBooked(companyId, _hour, _roomId), "Room Is Not Available");

        bookingsCounter += 1;        
        bookingsArrayMap[getRoomIndex(companyId, _hour, _roomId)] = bookingsCounter - 1;
        numberUserBookings[msg.sender] += 1;
        bookingReceiptsList.push(ColaBookingCommon.bookingStructure({
            crTime: block.timestamp,
            company: companyId,
            hour: _hour,
            roomId: _roomId,
            user: msg.sender
        }));
        emit newBooking(bookingsCounter - 1, companyId, _hour, _roomId);
        return bookingsCounter - 1;
    }

    /**
     * @notice Cancels a booking
     * @dev TODO: 1. Recognise user by NFT
     * @param _hour between 0 and 23, _roomId between 0 and num. of rooms per company
     * @return the booking receipt
     */
    function cancelABooking (uint256 _hour, uint256 _roomId/*, uint256 _bookingId*/) public returns (ColaBookingCommon.bookingStructure memory){
        require(getIfUserBelongsTo(0, msg.sender) || getIfUserBelongsTo(1, msg.sender), "user does not belong to any company");
        uint companyId = getIfUserBelongsTo(0, msg.sender) ? 1 : 0;
        uint256 bookingReciptId = bookingsArrayMap[getRoomIndex(companyId, _hour, _roomId)];
        require(msg.sender == bookingReceiptsList[bookingReciptId].user, "only booker user can cancel it");
        
        bookingsArrayMap[getRoomIndex(companyId, _hour, _roomId)] = 0;
        numberUserBookings[msg.sender] -= 1;
        
        emit bookingCancelation(companyId, _hour, _roomId);
        return(bookingReceiptsList[bookingReciptId]);
    }

    /**
     * @notice Sets the max. number of bookings per user
     * @param _maxBookingsPerUser, which is the max number
     */
    function setMaxBookingPerUser (uint256 _maxBookingsPerUser) public onlyOwner {
        //require(msg.sender == owner, "Only Owner Can Update it");
        maxBookingsPerUser = _maxBookingsPerUser;
    }

    /**
     * @notice Disables bookings
     */
    function stopBookings () public onlyOwner {
        //require(msg.sender == owner, "Only Owner Can Update it");
        require(canBook == true, "Bookings are already cancelled");
        canBook = false;
    }

    /**
     * @notice Enables bookings
     */
    function startBookings () public onlyOwner {
        //require(msg.sender == owner, "Only Owner Can Update it");
        require(canBook == false, "Bookings are already cancelled");
        canBook = true;
    }

    /**
     * @notice user to sign up their address
     * @dev TODO: Implement this with a NFT
     * @param _companyId 0 CocaCola 1 Pepsi, _employeeAddress
     */
    function signUpEmployee (uint _companyId) public {
        require(!getIfUserPendingFor(0, msg.sender), "Employee is Pending For CocaCola Approval");
        require(!getIfUserPendingFor(1, msg.sender), "Employee is Pending For Pepsi Approval");
        require(!getIfUserBelongsTo(0, msg.sender), "Employee already belongs to CocaCola");
        require(!getIfUserBelongsTo(1, msg.sender), "Employee already belongs to Pepsi");
        if (_companyId == 0) {
            cocacolaPendingEmployees.push(msg.sender);
        } else {
            pepsiPendingEmployees.push(msg.sender);
        }
    }

    function deleteAddressInPending (uint256 _companyId, address _employeeAddress) public onlyOwner {
        //require(msg.sender == owner, "Only Owner Can Update it");
        if (_companyId == 0) {
            for (uint i=0; i < cocacolaPendingEmployees.length; i++) {
                if (cocacolaPendingEmployees[i] == _employeeAddress) {
                    cocacolaPendingEmployees[i] = address(0);
                    return;
                }
            }
        } else {
            for (uint i=0; i < pepsiPendingEmployees.length; i++) {
                if (pepsiPendingEmployees[i] == _employeeAddress) {
                    pepsiPendingEmployees[i] = address(0);
                    return;
                }
            }
        }
    }

    /**
     * @notice admin approve users
     * @dev TODO: Implement this with a NFT
     * @param _companyId 0 CocaCola 1 Pepsi, list of addresses to approve
     */
    function approveEmployee (uint256 _companyId, address _employeeAddress) public onlyOwner {
        //require(msg.sender == owner, "Only Owner Can Update it");
        require(getIfUserPendingFor(_companyId, _employeeAddress), "Employee is not in pending list");
        if (_companyId == 0) {
            cocacolaEmployees.push(_employeeAddress);
        } else {
            pepsiEmployees.push(_employeeAddress);
        }
        deleteAddressInPending(_companyId, _employeeAddress);
    }

    /**
     * @notice Deletes an Employee from Cocala or Pepsi list of employees
     * @dev TODO: 1. Delete this and recognise user by NFT
     * @param _companyId 0 CocaCola 1 Pepsi, _employeeAddress
     */
    function removeEmployee (uint _companyId, address _employeeAddress) public onlyOwner {
        //require(msg.sender == owner, "Only Owner Can Update it");
        require(getIfUserBelongsTo(_companyId, _employeeAddress), "Address does not belong");
        if (_companyId == 0) {
            for (uint i=0; i < cocacolaEmployees.length; i++) {
                if (cocacolaEmployees[i] == _employeeAddress) {
                    cocacolaEmployees[i] = address(0);
                    return;
                }
            }
        } else {
            for (uint i=0; i < pepsiEmployees.length; i++) {
                if (pepsiEmployees[i] == _employeeAddress) {
                    pepsiEmployees[i] = address(0);
                    return;
                }
            }
        }
    }
}