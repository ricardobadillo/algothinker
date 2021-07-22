const applyAttributes = (selection, ...atributes) => {
    
    for(let [attr, value] of atributes) {
        selection
            .attr(attr, value);
    }

    return selection;
}

const centerTextInsideContainer = (selection, containerWidth) => {
    let widthHalf = containerWidth / 2;

    selection
    .attr("transform", `translate(${widthHalf}, ${widthHalf})`)
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "middle")
}

export {
    applyAttributes,
    centerTextInsideContainer,
}