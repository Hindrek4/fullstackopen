const dummy = () => {
    return 1;
};

const totalLikes = (blogs) => {
    const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
    return totalLikes;
};

module.exports = {
    totalLikes,
    dummy,
};
