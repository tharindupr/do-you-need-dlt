import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { platform } from 'os';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {

  platformArray = platforms;

  ngInit(){

  }
}


var platforms =[  
  {  
     "name":"Bitcoin",
     "permissioned":"No",
     "permissionless":"Yes",
     "public":"Yes",
     "private":"No",
     "consensus":"PoW",
     "data_structure":"Blockchain",
     "smart_contract":"Go, C++",
     "token":"Bitcoin",
     "tps":"7",
     "quantum":"No",
     "turing":"No",
   "open_source": "Yes",
     "specific":{  
        "pros":[  
           "Use UTXO data model for representing transactions and therefore it has better privacy.",
           "More robust transaction history due to the simplicity of the output-based history."
        ],
        "cons":[  
           "It can be harder to work with complex smart contract."
        ]
     }
  },
  {  
     "name":"Ethereum",
     "permissioned":"No",
     "permissionless":"Yes",
     "public":"Yes",
     "private":"No",
     "consensus":"PoW",
     "data_structure":"Blockchain",
     "smart_contract":"Solidity",
     "token":"ETH",
     "tps":"200",
     "quantum":"No",
     "turing":"No",
   "open_source": "Yes",
     "specific":{  
        "pros":[  
     "Has 30 times more developer than the next blockchain community. (by end 2018)",
     "Ethereum has a total of 15,791 nodes whereas Bitcoin has 9,678 nodes and Ripple has only 809 nodes. (by end 2018) Which means more decentralized network",
     "Proven reliability : Already running thousands of decentralized applications"

        ],
        "cons":[  
     "PoW mechanism for validating transactions has made the network slower and open to congestion.",
     "Cryptocurrencies are super-volatile and are affected profoundly by market rumours. A recent hoax about the death of Vitalik led to a $4 billion selloff."

        ]
     }
  },
  {  
     "name":"Casper",
     "permissioned":"No",
     "permissionless":"Yes",
     "public":"Yes",
     "private":"No",
     "consensus":"PoS",
     "data_structure":"Blockchain",
     "smart_contract":"Solidity",
     "token":"ETH",
     "tps":"NA",
     "quantum":"No",
     "turing":"No",
   "open_source": "Yes",
     "specific":{  
        "pros":[  
     "Transaction throughput is higher than PoW Ethereum.",
     "Mining energy consumption is lesser than PoW Ethereum."

        ],
        "cons":[  
     "Mining algorithm favors the people having a large number of ETH tokens."
        ]
     }
  },
  {  
     "name":"Hyperledger Sawtooth",
     "permissioned":"Yes",
     "permissionless":"Yes",
     "public":"Yes",
     "private":"Yes",
     "consensus":"PoET",
     "data_structure":"Blockchain",
     "smart_contract":"Python",
     "token":"NA",
     "tps":"70",
     "quantum":"No",
     "turing":"Yes",
   "open_source": "Yes",
     "specific":{  
        "pros":[  
           "Support for permissioned and permissionless implementations.",
           "Support for event creation and broadcasting.",
           "Scalability is higher than Fabric.",
           "Easier to extend the node count over a period of time with help of peering mechanism.",
           "Can extract the ledger data and then write it to any database for analytics and better read speed.",
           "More simpler network architecture, No complex systems like orderer."
        ],
        "cons":[  
           "Not perfoming very well with small number of nodes."
        ]
     }
  },
  {  
     "name":"Hyperledger Fabric",
     "permissioned":"Yes",
     "permissionless":"No",
     "public":"Yes",
     "private":"Yes",
     "consensus":"BFT",
     "data_structure":"Blockchain",
     "smart_contract":"Go, Java",
     "token":"NA",
     "tps":"3500",
     "quantum":"No",
     "turing":"Yes",
   "open_source": "Yes",
     "specific":{  
        "pros":[ 
     "Available as a managed service on AWS.",
     "A permission-ed version of PBFT is used and therefore it's effective for providing high throughput transactions for small networks.",
     "Extendable and modular architecture."

        ],
        "cons":[  
     "Cant provide same decentralization as Sawtooth. "
        ]
     }
  },
  {  
     "name":"Corda",
     "permissioned":"Yes",
     "permissionless":"No",
     "public":"Yes",
     "private":"Yes",
     "consensus":"BFT",
     "data_structure":"Blockchain",
     "smart_contract":"Kotlin, Java",
     "token":"NA",
     "tps":"1678",
     "quantum":"No",
     "turing":"No",
   "open_source": "Yes",
     "specific":{  
        "pros":[ 
      "Orcales provide transaction services offchain.",
      "Each node has only a partial copy of the database and there is no global blockchain.",
      "Legal footing: Deals recorded by the ledger are by contract accepted as admissible evidence and legally binding bu all parties in any dispute. ",
      "Assured identity: Parties will have assurance over the identity of participants in the network. (By core identity framework)",
      "Different versions of Corda will be able to coexist on the same network and applications will continue to run on later versions."

        ],
        "cons":[  
     "Do not have the necessary means and the technological characteristics to build an ecosystem based on economic incentives."
        ]
     }
  },
   {  
     "name":"IOTA",
     "permissioned":"No",
     "permissionless":"Yes",
     "public":"Yes",
     "private":"No",
     "consensus":"Distributed PoW",
     "data_structure":"DAG",
     "smart_contract":"Java",
     "token": "IOTA",
     "tps":"1500",
     "quantum":"Yes",
     "turing":"No",
   "open_source": "Yes",
     "specific":{  
        "pros":[ 
      "Scalability: IOTA can achieve high transaction throughput thanks to parallelized validation of transactions with no limit as to the number of transactions that can be confirmed in a certain interval. Rate of the transaction is proportional to the number of transaction nodes. ",
      "No Transaction Fees: IOTA has no transaction fees.",
      "Decentralization: IOTA has no miners. Every participant in the network that is making a transaction actively participates in the consensus. ",
      "Quantum-immunity: IOTA utilized a newly designed trinary hash function called Curl, which is quantum immune (Winternitz signatures).",
      "Different versions of Corda will be able to coexist on the same network and applications will continue to run on later versions."

        ],
        "cons":[  
     "Parallel transaction validation becomes infeasible when the network grows."
        ]
     }
  }
];