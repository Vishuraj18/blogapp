module.exports=(app)=>{
    const blog=require('../controllers/controllers');

    app.get('/api/blogs',blog.getall);
    app.post('/api/create',blog.create);
    app.get('/api/blog/:blogID',blog.getone);
    app.put('/api/update/:blogID',blog.updateone);
    app.delete('/api/delete/:blogID',blog.deleteone);
    app.get('/api/blogt/:blogTitle',blog.bytitle);
    app.get('/api/bloga/:blogauthor',blog.byauthor);
    app.get('/api/blogd/:blogdesc',blog.bydesc);
}