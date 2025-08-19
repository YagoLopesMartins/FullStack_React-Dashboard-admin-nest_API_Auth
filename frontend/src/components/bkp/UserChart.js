import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function UserChart({ users }) {
  const chartRef = useRef();

  useEffect(() => {
    const data = [
      { role: 'Admin', status: 'Ativo', count: users.filter(user => user.role === 'ADMIN' && user.status === 'ACTIVE').length },
      { role: 'Admin', status: 'Inativo', count: users.filter(user => user.role === 'ADMIN' && user.status === 'INATIVE').length },
      { role: 'Comum', status: 'Ativo', count: users.filter(user => user.role === 'COMMON' && user.status === 'ACTIVE').length },
      { role: 'Comum', status: 'Inativo', count: users.filter(user => user.role === 'COMMON' && user.status === 'INATIVE').length },
    ];

    const svg = d3.select(chartRef.current)
      .attr('width', 400)
      .attr('height', 200);

    svg.selectAll('*').remove();

    const x = d3.scaleBand().domain(data.map(d => `${d.role} ${d.status}`)).range([0, 400]).padding(0.2);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.count)]).range([200, 0]);

    svg.append('g')
      .attr('transform', 'translate(0,200)')
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));

    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(`${d.role} ${d.status}`))
      .attr('y', d => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', d => 200 - y(d.count))
      .attr('fill', '#69b3a2');
  }, [users]);

  return <svg ref={chartRef}></svg>;
}

export default UserChart;
