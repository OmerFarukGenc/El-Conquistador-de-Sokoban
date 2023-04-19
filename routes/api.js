const express = require('express');
const sokoban = require("../utils/sokoban");
const router = express.Router();
const fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("api");
  next();
});

router.get("/level/:number", function(req,res,next){
        fs.readFile("./assets/levels/" + req.params.number + ".txt",(err,data) => {
            if(err){
                res.send(JSON.stringify(err));
            }

            const inputArray = data.toString().split(/[ \n]/);


            const row = inputArray[0];
            const col = inputArray[1];
            var index = 2;
            const resultData = {};
            resultData.row = row;
            resultData.col = col;
            resultData.mat = [];
            for(var i = 0;i < row;i++){
              resultData.mat.push([]);
              for(var j = 0;j < col;j++)
                resultData.mat[i].push(inputArray[index++]);
            }

            res.json(resultData);

        })

})

router.post("/moveOne",function(req,res,next){

  console.log("MOVE ONE");
  //console.log(req.body.mat);
  console.log(sokoban(req.body.mat));
  res.send(sokoban(req.body.mat));
  return;
})

module.exports = router;
