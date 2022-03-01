// Solidity program to
// count number of
// values in a mapping
pragma solidity ^0.4.18;

contract rvTest {
	
	struct account {
		string username;
	}
	
	mapping (address => account) accounts;
	
	//Function adding values to the mapping
	function set(string un) public {
		var act = accounts[msg.sender];

		act.username = un;
	}
	
	function get() view public returns (string) {
		return accounts[msg.sender].username;
	}
}