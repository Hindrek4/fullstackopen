const {test, after, describe} = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const api = supertest(app);

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('a specific blog can be viewed via ID', async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToView = blogsAtStart[0];

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    expect(resultBlog).toBeDefined();
});

describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
        const newBlog = {
            title: 'hanna',
            author: '1337',
            url: 'www.neti.ee',
            likes: 43434,
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDB();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

        const titles = blogsAtEnd.map((blog) => blog.title);
        expect(titles).toContain('Harry Potter');
    });

    after(async () => {
        await mongoose.connection.close();
    });
});
