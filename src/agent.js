
const superagent = require('superagent');

const API_ROOT = 'http://149.248.14.120/api';

const responseBody = res => res.body;

const requests = {
    get: url =>
        superagent.get(`${API_ROOT}${url}`).then(responseBody),
    del: url =>
        superagent.del(`${API_ROOT}${url}`).then(responseBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`).send(body).then(responseBody),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`).send(body).then(responseBody)
};

const Auth = {
    login: (username, password) => 
        requests.post('/users/login', { user: { username, password }}),
    register: (username, email, password) =>
        requests.post('/users', { user: { username, email, password }}),
    getUser: id =>
        requests.post('/users/get', {user:{id}}),
    save: user => 
        requests.put('/users', { user })
}

const Profile = {
    get: (id, username) =>
        requests.post('/profiles', { user1:{id}, user2:{username} })
}


const Articles = {
    all: page => 
        requests.get(`/articles?limit=10`),
    del: slug =>
        requests.del(`/articles/${slug}`),
    get: slug =>
        requests.get(`/articles/${slug}`),
    new: (id, article) =>
        requests.post(`/articles`, { user:{id}, article })
};


const Comments = {
    create: (slug, comment) =>
      requests.post(`/articles/${slug}/comments`, { comment }),
    delete: (slug, commentId) =>
      requests.del(`/articles/${slug}/comments/${commentId}`),
    forArticle: slug =>
      requests.get(`/articles/${slug}/comments`)
};


export default {
    Articles,
    Auth,
    Comments,
    Profile
}