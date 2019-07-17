import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { platform } from 'os';
import * as d3 from 'd3';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {

   private _user_response: number;
   _selected:string;   

   @Output() platformEmitter = new EventEmitter<string>();

   @Input() 
   set user_response(value) {
      this._user_response = value;
      d3.select("#three").select("svg").remove();
      this.loadMindMap(this._user_response);
   }


   @Input() 
   set platform(value) {
      if(!value)
         this._selected = "None";
      else
         this._selected = value["name"];
   }


   platformArray = platforms;

   ngInit(){
      this.platformEmitter.emit('');
      this._selected = "None";
   }


   ngAfterContentInit() {

   }


   isColored(p, pless){
      if(this._user_response == 2 && pless == "Yes"){
         return true;
      }
      else if(this._user_response == 3 && p == "Yes"){
         return true;
      }
      else if(this._user_response == 4 && p == "Yes"){
         return true;
      }
      return false;
   }

   loadMindMap(user_response){
      
      var treeData =
      {  
      "name":"Data Structure",
      "children":[  
         {  
            "name":"Blockchain",
            "children":[  
               {  
                  "name":"PoW",
                  "children":[  
                     {  
                        "name":"BitCoin",
                        "type":[2],
                        "index": 0,
                     },
                     {  
                        "name":"Ethereum",
                        "type":[2],
                        "index": 1,
                     }
                  ]
               },
               {  
                  "name":"BFT",
                  "children":[  
                     {  
                        "name":"LibraBFT",
                        "type":[3,4],
                        "index": -1,
                     },
                     {  
                        "name":"PBFT",
                        "children":[  
                           {  
                              "name":"Fabric",
                              "type":[3,4],
                              "index": 4,
                           },
                           {  
                              "name":"Zilliqa",
                              "index": -1,
                           }
                        ]
                     },
                     {  
                        "name":"CordaBFT",
                        "type":[3,4],
                        "index": 5,
                     }
                  ]
               },
               {  
                  "name":"PoS",
                  "children":[  
                     {  
                        "name":"Casper",
                        "type":[2],
                        "index": 2,

                     }
                  ]
               },
               {  
                  "name":"PoEt",
                  "children":[  
                     {  
                        "name":"Sawtooth",
                        "type":[2, 3],
                        "index": 3,
                     }
                  ]
               }
            ]
         },
         {  
            "name":"Directed Acyclic Graph",
            "children":[  
               {  
                  "name":"HashGraph",
                  "index": -1,
               },
               {  
                  "name":"Distributed PoW",
                  "children":[  
                     {  
                        "name":"IOTA",
                        "type":[2],
                        "index": 6,
                     }
                  ]
               },
               {  
                  "name":"MainChain",
                  "index": -1,
               }
            ]
         }
      ]
   };
   
   // Set the dimensions and margins of the diagram
   var margin = {top: 20, right: 90, bottom: 30, left: 90},
      width = 600 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
   
   // append the svg object to the body of the page
   // appends a 'group' element to 'svg'
   // moves the 'group' element to the top left margin
   var svg = d3.select("#three").append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate("
            + margin.left + "," + margin.top + ")");
   
   var i = 0,
      duration = 750,
      root;
   
   // declares a tree layout and assigns the size
   var treemap = d3.tree().size([height, width]);
   
   // Assigns parent, children, height, depth
   root = d3.hierarchy(treeData, function(d) { return d.children; });
   root.x0 = height / 2;
   root.y0 = 0;
   
   expandAll(this.platformEmitter);
   // // Collapse after the second level
   //root.children.forEach(collapse);
   
   update(root, this.platformEmitter);
   
   // Collapse the node and all it's children
   function collapse(d) {
      if(d.children) {
      d._children = d.children
      d._children.forEach(collapse)
      d.children = null
      }
   }

   function expand(d){   
      var children = (d.children)?d.children:d._children;
      if (d._children) {        
          d.children = d._children;
          d._children = null;       
      }
      if(children)
        children.forEach(expand);
   }
   
   function expandAll(x){
         expand(root); 
         update(root,x);
   }
   
   function update(source, emitter) {
   
      // Assigns the x and y position for the nodes
      var treeData = treemap(root);
   
      // Compute the new tree layout.
      var nodes = treeData.descendants(),
         links = treeData.descendants().slice(1);
   
      // Normalize for fixed-depth.
      nodes.forEach(function(d){ d.y = d.depth * 100});
   
      // ****************** Nodes section ***************************
   
      // Update the nodes...
      var node = svg.selectAll('g.node')
         .data(nodes, function(d) {return d.id || (d.id = ++i); });
   
      // Enter any new modes at the parent's previous position.
      var nodeEnter = node.enter().append('g')
         .attr('class', 'node')
         .attr("transform", function(d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
      })
      .on('click', click);
   
      // Add Circle for the nodes
      nodeEnter.append('circle')
         .attr('class', 'node')
         .attr('r', 1e-6)
         .style("stroke", function(d : any) { 
            if(d.data.type){
               return d.data.type.includes(user_response) ? "#6200EE" : "#81D4FA";
            }
               
            else
               return "#81D4FA"
         })
         .style("fill", function(d) {
            return d._children ? "#512DA8" : "#fff";
         });
   

      // Add labels for the nodes
      nodeEnter.append('text')
         .attr("dy", ".35em")
         .attr("x", function(d) {
            return d.children || d._children ? -13 : 13;
         })
         .attr("text-anchor", function(d) {
            return d.children || d._children ? "end" : "start";
         })
         .text(function(d) { return d.data.name; });
   
      // UPDATE
      var nodeUpdate = nodeEnter.merge(node);
   
      // Transition to the proper position for the node
      nodeUpdate.transition()
      .duration(duration)
      .attr("transform", function(d) { 
            return "translate(" + d.y + "," + d.x + ")";
      });
   
      // Update the node attributes and style
      nodeUpdate.select('circle.node')
      .attr('r', 10)
      .style("fill", function(d) {
            return d._children ? "#81D4FA" : "#fff";
      })
      .attr('cursor', 'pointer');
   
   
      // Remove any exiting nodes
      var nodeExit = node.exit().transition()
         .duration(duration)
         .attr("transform", function(d) {
            return "translate(" + source.y + "," + source.x + ")";
         })
         .remove();
   
      // On exit reduce the node circles size to 0
      nodeExit.select('circle')
      .attr('r', 1e-6);
   
      // On exit reduce the opacity of text labels
      nodeExit.select('text')
      .style('fill-opacity', 1e-6);
   
      // ****************** links section ***************************
   
      // Update the links...
      var link = svg.selectAll('path.link')
         .data(links, function(d) { return d.id; });
   
      // Enter any new links at the parent's previous position.
      var linkEnter = link.enter().insert('path', "g")
         .attr("class", "link")
         .attr('d', function(d){
            var o = {x: source.x0, y: source.y0}
            return diagonal(o, o)
         });
   
      // UPDATE
      var linkUpdate = linkEnter.merge(link);
   
      // Transition back to the parent element position
      linkUpdate.transition()
         .duration(duration)
         .attr('d', function(d){ return diagonal(d, d.parent) });
   
      // Remove any exiting links
      var linkExit = link.exit().transition()
         .duration(duration)
         .attr('d', function(d) {
            var o = {x: source.x, y: source.y}
            return diagonal(o, o)
         })
         .remove();
   
      // Store the old positions for transition.
      nodes.forEach(function(d){
      d.x0 = d.x;
      d.y0 = d.y;
      });
   
      // Creates a curved (diagonal) path from parent to the child nodes
      function diagonal(s, d) {
   
      var path = `M ${s.y} ${s.x}
               C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`
   
      return path
      }

   
      // Toggle children on click.
      function click(d) {
         if(d.data.type && d.data.type.includes(user_response)){
               emitter.emit(platforms[d.data.index]);
               console.log(d);
         }
         if (d.children) {

               d._children = d.children;
               d.children = null;
            } else {
               d.children = d._children;
               d._children = null;
            }
         update(d, emitter);
      }
   }

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
     "extended_name": "Bitcoin",
     "organization": "None",
     "official_community": "https://bitcointalk.org/",
     "developer_documentation":"https://bitcoin.org/en/developer-documentation",
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
     "extended_name": "Ethereum",
     "organization": "Ethereum Foundation",
     "official_community": "https://forum.ethereum.org/",
     "developer_documentation":"http://www.ethdocs.org/en/latest/",
      "specific":{  
         "pros":[  
      "Has 30 times more developer than the next blockchain community. (by end 2018).",
      "Ethereum has a total of 15,791 nodes whereas Bitcoin has 9,678 nodes and Ripple has only 809 nodes. (by end 2018) Which means more decentralized network.",
      "Proven reliability : Already running thousands of decentralized applications."
 
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
     "extended_name": "Casper Ethereum",
     "organization": "Ethereum Foundation",
     "official_community": "NA",
     "developer_documentation":"NA",
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
      "name":"Sawtooth",
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
     "extended_name": "Hyperledger Sawtooth",
     "organization": "Linux Foundation",
     "official_community": "https://lists.hyperledger.org/g/sawtooth",
     "developer_documentation":"https://sawtooth.hyperledger.org/docs/",
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
      "name":"Fabric",
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
     "extended_name": "Hyperledger Fabric",
     "organization": "Linux Foundation",
     "official_community": "https://lists.hyperledger.org/g/fabric",
     "developer_documentation":"https://hyperledger-fabric.readthedocs.io/en/release-1.4/",
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
     "extended_name": "Hyperledger Fabric",
     "organization": "R3",
     "official_community": "https://www.corda.net/community/",
     "developer_documentation":"https://docs.corda.net",
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
      "extended_name": "IOTA",
     "organization": "IOTA foundation",
     "official_community": "https://www.iota.org/contact-us/community-support",
     "developer_documentation":"https://docs.iota.org/",
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