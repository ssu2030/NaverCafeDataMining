var express = require('express');
var router = express.Router();

var fs = require('fs');

router.get('/loading/:itemName', loadingPage);
router.get('/infos/:itemName', showItemDetail);

//로딩 페이지
function loadingPage(req, res, next){
    //동작 이뤄지고 나서
    res.redirect('/infos/'+req.params.itemName);
}

//아이템 정보 보여주는 페이지
function showItemDetail(req, res, next){
    var item = req.params.itemName;
    res.send(item);
}       

module.exports = router;