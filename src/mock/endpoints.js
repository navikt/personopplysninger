const fs = require('fs');
router = require('express').Router();

router.get('/user', file('mock/bruker.json'));

function file(filename) {
    return (request, response) => {
        response.writeHead(200, 'OK');
        fs.createReadStream(filename).pipe(response);
    };
}

module.exports = router;
