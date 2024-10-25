export const IsLikedByRegUser = (regUserId, post) => {
    if (Array.isArray(post.liked)) {
        for (let like of post.liked) {
            if (regUserId === like.userId) {
                return true;
            }
        }
    }
    return false;
};
