const sample = `
    #This is a comment
    # This is a comment

    first_key = first_answer # This is a comment
    second_key = second_answer #This is a comment
    third_key = {
        first_inner_key = first_inner_answer #
        second_inner_key = second_inner_answer
        third_inner_key = {
            first_inner_inner_key = first_inner_inner_answer
        }
    fourth_inner_key = fourth_inner_answer
    }

`;

const read = (path) => {
    return sample;
};

module.exports = {
    read
};