import * as d3 from "d3";
import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ResultComponent} from '../result/result.component';
import { loadLContextFromNode } from '@angular/core/src/render3/discovery_utils';


@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  @Input() phase: object;
  @Input() name: String;
  constructor() {
  }
  @Output() nextEmiter: EventEmitter<number> = new EventEmitter<number>();
   
  ngOnInit() {
     this.nextEmiter.emit(0);
  }
 
  ngAfterContentInit() {
      var treeData = this.phase.config;

      if(this.phase.id == "one" || this.phase.id == "two"){
          this.loadTree(treeData);
      }


  }
  

  loadTree(treeData){
      // Set the dimensions and margins of the diagram
      var margin = {top: 20, right: 90, bottom: 30, left: 190},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      // appends a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svgheight;
      if(this.phase.id == "one")
        svgheight =  1800;
      else if (this.phase.id == "two")
        svgheight =  500;

      var svg = d3.select("#"+this.phase.id)
          .append("svg")
          .attr("width", width + margin.right + margin.left)
          .attr("height", svgheight)
        .append("g")
          .attr("transform", "translate("
                + margin.left + "," + margin.top + ")");

      var i = 0,
          duration = 750,
          root;

      // declares a tree layout and assigns the size
      var treemap = d3.tree().size([height, width]);

      // Assigns parent, children, height, depth
      root = d3.hierarchy(treeData, function(d : any) { return d.children; });
      root.y0 = height / 2;
      root.x0 = 0;

      // Collapse after the second level
      root.children.forEach(collapse);

      update(root, this.nextEmiter);

      // Collapse the node and all it's children
      function collapse(d) {
        if(d.children) {
          d._children = d.children
          d._children.forEach(collapse)
          d.children = null
        }
      }

      function update(source, SETEMITTER) {
        //console.log(SETEMITTER); for debuging

        // Assigns the x and y position for the nodes
        var treeData = treemap(root);

        // Compute the new tree layout.
        var nodes : any = treeData.descendants();
        var links = treeData.descendants().slice(1);

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
        nodeEnter.append('svg:rect')
            .attr('class', 'node')
            .attr('height', '20')
            .attr('rx', '10')
            .attr('ry', '10')
            .attr("x", function(d : any) {
              var label = d.data.label;
              var text_len = label.length * 6;
              var width = d3.max([70, text_len])
              return -width / 2;
            })
            .attr("width", function(d : any) {
              var label = d.data.label;
              var text_len = label.length * 7;
              var width = d3.max([70, text_len])
              return width+8;
            })
            //.attr('r', 1e-6)
            .style("stroke-width", "1")
            .style("stroke", function(d : any) { 
              if(d.data.type === "end"){
                //console.log();
                SETEMITTER.emit(d.data.output); 
              }
              return d.data.type === "split" ? "#512DA8" :  d.data.type === "end" ? "#512DA8" : "#FF1744";
            })
            .style("fill", function(d : any) {
                return d._children ? "#B39DDB" : d.data.type === "end" ? "#00C853" : "#fff";
            });
        // Add labels for the nodes
        nodeEnter.append('svg:text')
            .attr("text-anchor", "middle")
            .attr("dy", "14px")
            .attr("dx", function(d : any){
              if (d.data.label == "Yes" || d.data.label == "No")
                  return "0%";
              else 
                  return "2%";
            })
            .style("font-size", "14px")
            .text(function(d : any) { return d.data.label; });

        // UPDATE
        var nodeUpdate = nodeEnter.merge(node);
        // Transition to the proper position for the node
        nodeUpdate.transition()
          .duration(duration)
          .attr("transform", function(d : any) { 
              return "translate(" + (d.x)  + "," + d.y+ ")";
          });

        // Update the node attributes and style
        nodeUpdate.select('rect')
          .style("fill", function(d : any) {
              return d._children ? "#81D4FA" : d.data.type === "end" ? "#D1C4E9" : "#fff";
          })
          .attr('cursor', 'pointer');


        // Remove any exiting nodes
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + source.x + "," + source.y + ")";
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
              var o = {y: source.x0, x: source.y0}
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
          d.x0 = d.y;
          d.y0 = d.x;
        });

        // Creates a curved (diagonal) path from parent to the child nodes
        function diagonal(s, d) {
          var path = `M ${s.x} ${s.y}
                  C ${(s.x + d.x) / 2} ${s.y},
                    ${(s.x + d.x) / 2} ${d.y},
                    ${d.x} ${d.y}`;

          return path;
        }
        // Toggle children on click.
        function click(d) {
          if (d.children) {
              if(d.parent.children.length > 1){
                d.parent.children.forEach(myFunction);
                function myFunction(item, index){ 
                  if(d.data.label != item.data.label){
                    item._children = item.temp;
                  }        
                }

              }
              d._children = d.children;
              d.children = null;
            } else {
              if(d.parent.children.length > 1){
                
                d.parent.children.forEach(myFunction);
                function myFunction(item, index){ 
                    if(d.data.label != item.data.label){
                            item["temp"] = item._children;
                            item._children = null;
                    }
                              
                }

              }

              d.children = d._children;
              d._children = null;
              //console.log(d);
            }
          //console.log(this.setEmiter);
          update(d, SETEMITTER);
        }



      }   
  }


  
  

}




