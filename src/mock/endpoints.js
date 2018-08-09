const fs = require('fs');
router = require('express').Router();

router.get('/user', file('mock/bruker.json'));
router.get('/adresse', file('mock/adresse.json'));

function file(filename) {
    return (request, response) => {
        response.writeHead(200, 'OK');
        fs.createReadStream(filename).pipe(response);
    };
}

module.exports = router;
