
    const config = require('./config/apiConfig');
    const port = process.env.PORT || 5432;
    const app = config();
    


    app.listen(port,() => {
    console.log(port);
});


