// SPDX-License-Identifier: MIT

pragma solidity ~0.8.0;

contract SecureCert {
    address private owner;

    struct Certificate {
        address student;
        address issuer;
        uint256 issued_at;
    }

    constructor() {
        owner = msg.sender;
    }

    mapping(bytes32 => Certificate) private certificates;
    mapping(address => string) public issuers;

    bytes32[] private certificate_hashes;
    address[] private issuer_addresses;

    event IssuerAdded(address indexed issuer, string indexed name);
    event IssuerRemoved(address indexed issuer, string indexed name);
    event CertificateIssued(bytes32 indexed certificate, address indexed student, address indexed issuer);
    event CertificateRevoked(bytes32 indexed certificate, address indexed student, address indexed issuer);

    function addIssuer(address _address, string memory _name) external onlyOwner {
        require(_address != address(0), "Invalid address provided!");
        require(bytes(issuers[_address]).length == 0, "The issuer already exists!");

        issuers[_address] = _name;
        issuer_addresses.push(_address);
        emit IssuerAdded(_address, _name);
    }

    function removeIssuer(address _address) external onlyOwner {
        require(_address != address(0), "Invalid address provided!");
        require(bytes(issuers[_address]).length > 0, "The issuer already exists!");
        string memory _name = issuers[_address];
        uint length = issuer_addresses.length;

        // Move last element to current slot and pop the last element
        for (uint i = 0; i < length; i++) {
            if (issuer_addresses[i] ==_address) {
                issuer_addresses[i] = issuer_addresses[length - 1];
                issuer_addresses.pop();
                break;
            }
        }

        delete issuers[_address];
        emit IssuerRemoved(_address, _name);
    }

    function getAllIssuers() public view returns (address[] memory, string[] memory) {
        uint256 count = issuer_addresses.length;
        address[] memory addresses = new address[](count);
        string[] memory names = new string[](count);

        for (uint256 i = 0; i < count; i++) {
            address _address = issuer_addresses[i];
            addresses[i] = _address;
            names[i] = issuers[_address];
        }

        return (addresses, names);
    }

    function issueCertificate(address _student, bytes32 _hash) external authorizedIssuer {
        require(_student != address(0), "Invalid address provided!");
        require(_hash != bytes32(0), "Invalid hash provided!");
        require(certificates[_hash].student == address(0), "The certificate already exists!");

        certificates[_hash] = Certificate(_student, msg.sender, block.timestamp);
        certificate_hashes.push(_hash);

        emit CertificateIssued(_hash, _student, msg.sender);
    }

    function revokeCertificate(bytes32 _hash) external authorizedIssuer {
        require(_hash != bytes32(0), "Invalid hash provided!");
        require(certificates[_hash].student != address(0), "The certificate does not exists!");
        require(certificates[_hash].issuer == msg.sender, "Only certificate issuer can revoke it!");

        Certificate memory cert = certificates[_hash];
        uint length = certificate_hashes.length;

        // Move last element to current slot and pop the last element
        for (uint i = 0; i < length; i++) {
            if (certificate_hashes[i] ==_hash) {
                certificate_hashes[i] = certificate_hashes[length - 1];
                certificate_hashes.pop();
                break;
            }
        }

        delete certificates[_hash];
        emit CertificateRevoked(_hash, cert.student, msg.sender);
    }

    function getCertificate(bytes32 _hash) public view returns (address, string memory, address, bytes32, uint, bool) {
        require(_hash != bytes32(0), "Invalid hash provided!");

        Certificate memory cert = certificates[_hash];
        string memory issuer = issuers[cert.issuer];

        return (cert.issuer, issuer, cert.student, _hash, cert.issued_at, cert.student != address(0));
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner is allowed to perform this action!");
        _;
    }

    modifier authorizedIssuer() {
        require(bytes(issuers[msg.sender]).length > 0, "Only authorized issuers are allowed to perform this action!");
        _;
    }
}
