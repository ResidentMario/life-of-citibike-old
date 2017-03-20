let d3 = require("d3");

class InsetGraphElement {
    constructor(el, props, state) {
        let svg = d3.select(el).append('svg')
            .attr("class", "inset-graph")
            .attr("width", props.width)
            .attr("height", props.height);
    }
}

function create(el, props, state) {
    return new InsetGraphElement(el, props, state);
}

module.exports = {
    create: create
};