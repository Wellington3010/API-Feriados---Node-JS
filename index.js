
    const config = require('./config/apiConfig');
    const port = 3000;
    const app = config();
    


    app.listen(port,() => {
    console.log(port);
});


