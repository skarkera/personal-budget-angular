import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'pb-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {

 private data = [
    {"title": "Eat out", "budget": "25"},
    {"title": "Rent", "budget": "375"},
    {"title": "Grocery", "budget": "110"},
    {"title": "Pet Budget", "budget": "150"},
    {"title": "Electricity", "budget": "100"},
    {"title": "Shopping", "budget": "100"},
    {"title": "Water Bill", "budget": "70"}
  ]

  private svg;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  private createSvg(): void {
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
}

private createColors(): void {
  this.colors = d3.scaleOrdinal()
  .domain(this.data.map(d => d.budget.toString()))
 // .domain(this.dataService.dataSource1.data)

  .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782", "#ff8c00", "#a05d56"]);
}

private drawChart(): void {
  // Compute the position of each group on the pie:
  const pie = d3.pie<any>().value((d: any) => Number(d.budget));

  // Build the pie chart
  this.svg
  .selectAll('pieces')
  .data(pie(this.data))
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(this.radius)
  )
  .attr('fill', (d, i) => (this.colors(i)))
  .attr("stroke", "#121926")
  .style("stroke-width", "1px");

  // Add labels
  const labelLocation = d3.arc()
  .innerRadius(100)
  .outerRadius(this.radius);

  this.svg
  .selectAll('pieces')
  .data(pie(this.data))
  .enter()
  .append('text')
  .text(d => d.data.title)
 // .text(d => this.data)
  .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
  .style("text-anchor", "middle")
  .style("font-size", 15);
}

  constructor(public dataService: DataServiceService) {
  }

  ngOnInit(): void {

    this.createSvg();
    this.createColors();
    this.drawChart();
  }

}
