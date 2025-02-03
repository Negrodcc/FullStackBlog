const lodash = require('lodash')

const dummy = (blogs) => {
    //blogs is a JSON file, meaning, its an array where each element is a diccionary {}
    return 1;
}

const totalLikes = (blogs) => {
    const sum = (acc, blog) => blog.likes + acc;
    return blogs.reduce(sum, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (acc, blog) => {
        // console.log("current blog is : ", blog)
        // console.log("current acc is : ", acc)        
        return acc.likes <= blog.likes ? blog : acc;  // Always return a value
    }

    const initialChampion = {likes : -1}

    if (blogs.length === 0) {
        throw new Error("array it's empty"); 
    }
    else {
        return blogs.reduce(reducer, initialChampion)
    }
}

const mostOftenAuthor = (blogs) => {
    if (blogs.length === 0) {
        throw new Error("array empty");
    }
    // console.log(blogs)
    //now we count how many times each author appears
    const authorCount = lodash.countBy(blogs, 'author'); 
    //and then we search for the maximum, firs transforming the hash in a array of arrays, and then filtering by the counter
    const mostFrequent = lodash.maxBy(Object.entries(authorCount), ([author, count]) => count);
    // Transform the result into the desired format
    const result = mostFrequent ? { author: mostFrequent[0], blogs: mostFrequent[1] } : null;
    return result;
}

const mostPopularAuthor = (blogs) => {
    if (blogs.length === 0) {
        throw new Error("array empty");
    }
    //this is a O(N) algorithym
    const likesMap = {}
    blogs.forEach((blog, index) => {
        if (likesMap[blog.author]) {
            likesMap[blog.author] += blog.likes
        }
        else {
            likesMap[blog.author] = blog.likes
        }
    });
    //then we do another for to look the maximum likes
    var champion = {author : null, likes : 0}
    for (const key in likesMap) {
        if (likesMap[key] >= champion.likes) {
            champion = { author : key, likes : likesMap[key] }
        }
    }
    //final algorithm is 2*O(N)
    return champion
}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostOftenAuthor,
    mostPopularAuthor
  }