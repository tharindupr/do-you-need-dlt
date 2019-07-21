import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {

   private _user_response: number;
   _selected:string;   
   _platform_json_url = 'assets/json/platforms.json';
   _tee_data_url = 'assets/json/tree-data.json';
   platformArray ="";
   treeData="";

   public getJSON(url): Observable<any> {
      return this.http.get(url);
    }
  
    constructor(private http: HttpClient) {
         this.getJSON(this._platform_json_url).subscribe(data => {
           this.platformArray = data;
         });
         this.getJSON(this._tee_data_url).subscribe(data => {
            this.treeData = data;
         });
 
    }
  

   @Output() platformEmitter = new EventEmitter<string>();

   @Input() 
   set user_response(value) {
      this._user_response = value;
      d3.select("#three").select("svg").remove();
      //console.log(this.platformArray);
      this.getJSON(this._platform_json_url).subscribe(data => {
         this.platformArray = data;
         this.getJSON(this._tee_data_url).subscribe(data => {
            this.treeData = data;
         });
         this.loadMindMap(this._user_response, this.platformArray, this.treeData);
      });
      
   }


   @Input() 
   set platform(value) {
      if(!value)
         this._selected = "None";
      else
         this._selected = value["name"];
   }


  

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

   loadMindMap(user_response, platforms, treeData){

   
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
         .data(nodes, function(d : any) {return d.id || (d.id = ++i); });
   
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
         .style("fill", function(d :any) {
            return d._children ? "#512DA8" : "#fff";
         });
   

      // Add labels for the nodes
      nodeEnter.append('text')
         .attr("dy", ".35em")
         .attr("x", function(d : any) {
            return d.children || d._children ? -13 : 13;
         })
         .attr("text-anchor", function(d : any){
            return d.children || d._children ? "end" : "start";
         })
         .text(function(d : any) { return d.data.name; });
   
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
      .style("fill", function(d : any) {
         if(d.data.type){
            console.log("play");
            return d.data.type.includes(user_response) ? "#81D4FA" : "#fff";
            
         }  
         else
            return d._children ? "#81D4FA" : "#fff";
      })
      .attr('cursor', function(d :any){
         if(d.data.type){
            return d.data.type.includes(user_response) ? "pointer" : "";
         }  
      });
   
   
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
         .data(links, function(d : any) { return d.id; });
   
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
      nodes.forEach(function(d : any){
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
               console.log("from tablle");
               console.log(platforms);
               emitter.emit(platforms[d.data.index]);
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


