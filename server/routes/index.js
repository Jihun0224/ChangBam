const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const nodemailer = require("nodemailer");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
});
connection.connect(); //mysql 연결

//aws s3
// let multer = require("multer");
// let multerS3 = require("multer-s3");
// const AWS = require("aws-sdk");
// const path = require("path");
// AWS.config.loadFromPath(__dirname + "/../awsconfig.json");
// let s3 = new AWS.S3();

// let upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "cu-night",
//     key: function (req, file, cb) {
//       let extension = path.extname(file.originalname) + ".jpg";
//       cb(null, Date.now().toString() + extension);
//     },
//     acl: "public-read-write",
//   }),
// });

// var img_upload = upload.single("imageFile");

/*
const storage = multer.diskStorage({
    destination: (req, file, callback)=> {
        callback(null, 'upload/'); 
    }, 
    filename: (req, file, callback)=> {
        callback(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
    }
})
const upload = multer({storage: storage});

app.post('/profile', upload.single('imageFile'), function (req, res, next) {
    var id = req.body.id;
    var nickname = req.body.nicknamecheck;
    // console.log(req.file);
    
    
    if(nickname !=='') {
        console.log('hi');
        connection.query('UPDATE usertable SET nickname =? WHERE user_id=?', [nickname,id], function(err,rows,fields){
            console.log('완료');
        })
    }
  })
})*/
// router.post("/ImageUpload", upload.single("image"), function (req, res) {
//   const id = req.file.key;
//   res.json(id);
// });

// router.post("/profile", upload.single("imageFile"), function (req, res) {
//   var id = req.body.id;
//   var nickname = req.body.nicknamecheck;
//   if (req.body.imageFile !== "null") {
//     if (req.body.img !== "default.jpg") {
//       s3.deleteObject(
//         {
//           Bucket: "cu-night",
//           Key: req.body.img,
//         },
//         (err, data) => {
//           if (err) {
//             throw err;
//           }
//         }
//       );
//     }
//     connection.query(
//       "UPDATE user_table SET user_profile_image =? WHERE user_ID=?",
//       [req.file.key, id],
//       function (err, rows, fields) {}
//     );
//   }
//   //파일 하나만 업로드 할 때. ex) { img: File }
//   if (nickname !== "") {
//     connection.query(
//       "UPDATE user_table SET user_nickname =? WHERE user_ID=?",
//       [nickname, id],
//       function (err, rows, fields) {}
//     );
//   }
// });

router.post("/GetProfile", function (req, res) {
  var id = req.body.id;
  connection.query(
    "select user_profile_image FROM user_table WHERE user_ID=?",
    [id],
    function (err, rows, fields) {
      res.send(rows);
    }
  );
});

router.post("/rm", function (req, res) {
  var id = req.body.id;
  connection.query("DELETE FROM user_table WHERE user_ID=?", [id], function (
    err,
    rows,
    fields
  ) {});
});

router.post("/rename_pw", function (req, res) {
  var id = req.body.id;
  var pw = req.body.pw;
  connection.query(
    "UPDATE user_table SET user_hash =? WHERE user_ID=?",
    [pw, id],
    function (err, rows, fields) {
      console.log("완료");
    }
  );
});

router.post("/getpwd", function (req, res) {
  var id = req.body.id;
  connection.query(
    "select user_hash from user_table where user_ID=?",
    [id],
    function (err, rows, fields) {
      res.json(rows);
    }
  );
});

router.post("/log", function (req, res) {
  var id = req.body.id;
  var pw = req.body.pw;
  var salt = "salt";
  var nickname = req.body.nickname;
  var email = req.body.email;
  connection.query(
    "INSERT INTO user_table (user_ID,user_salt,user_hash,user_email,user_nickname) VALUES(? ,? ,?, ?, ?)",
    [id, salt, pw, email, nickname],
    function (err, rows, fields) {
      console.log("완료");
    }
  );
});

router.post("/admin", function (req, res) {
  var id = req.body.id;
  var pw = req.body.pw;
  connection.query(
    "select user_key,user_ID,user_hash,user_email,user_nickname from user_table where user_ID=?",
    [id],
    function (err, rows, fields) {
      var admin = new Object();
      admin.key = rows[0].user_key;
      admin.id = rows[0].user_ID;
      admin.email = rows[0].user_email;
      admin.nickname = rows[0].user_nickname;
      admin.boolean = false;
      if (rows[0] === undefined) {
        //쿼리문항목안나오면
        res.send(admin);
      } else if (rows[0].user_hash == pw) {
        //일치할떄
        admin.boolean = true;
        console.log(admin);
        res.send(admin);
      } else {
        //쿼리 비번이랑 받아온 비번이랑 안맞을떄
        res.send(admin);
      }
    }
  );
});

router.post("/nickname", function (req, res) {
  var nickname = req.body.nickname;
  connection.query(
    "select user_nickname from user_table where user_nickname=?",
    [nickname],
    function (err, rows, fields) {
      res.json(rows);
    }
  );
});

router.post("/user", function (req, res) {
  var ids = req.body.id;
  connection.query(
    "select user_ID from user_table where user_ID=?",
    [ids],
    function (err, rows, fields) {
      res.json(rows);
    }
  );
});

router.post("/email", function (req, res) {
  let email = req.body.email;
  let number = Math.floor(Math.random() * 1000000) + 100000;
  let changwonemail = "@changwon.ac.kr";
  if (number > 1000000) {
    number = number - 100000;
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    auth: {
      user: "",
      pass: "",
    },
  });

  let mailoption = {
    from: "cwnunight@gmail.com",
    to: email.concat(changwonemail),
    subject: "창원대의 밤 인증번호를 확인하세요!",
    text: `${number}`,
  };

  transporter.sendMail(mailoption, function (error, info) {
    if (error) {
      console.log(error);
      console.log(mailoption);
    } else {
      var ajson = new Object();
      ajson.emailsearch = number;
      console.log(mailoption);

      console.log(ajson);

      res.send(ajson);
    }
  });
});

//송용민

router.post("/comment", function (req, res) {
  var comment = req.body.comment;
  var nickname = req.body.nickname;
  connection.query(
    "INSERT INTO comment_table (comment_nickname,comment_body) VALUES(? ,?)",
    [nickname, comment],
    function (err, rows, fields) {}
  );
});
router.post("/comments", function (req, res) {
  var comment_row = req.body.comment_row;
  connection.query(
    "SELECT comment_key,comment_nickname,comment_date,comment_body from comment_table",
    function (err, rows, fields) {
      res.json(rows);
    }
  );
});
router.post("/dcomment", function (req, res) {
  var recomment = req.body.recomment;
  var nickname = req.body.nickname;
  var key = req.body.key;
  connection.query(
    "INSERT INTO dcomment_table (dcomment_nickname,dcomment_body,comment_table_comment_key) VALUES(? ,?,?)",
    [nickname, recomment, key],
    function (err, rows, fields) {}
  );
});
router.post("/dcomments", function (req, res) {
  var key = req.body.key;
  connection.query(
    "SELECT dcomment_nickname,dcomment_date,dcomment_body from dcomment_table where comment_table_comment_key=?",
    [key],
    function (err, rows, fields) {
      res.json(rows);
    }
  );
});
router.post("/meeting_write", function (req, res) {
  var head_count = req.body.head_count;
  var gender = req.body.gender;
  var tel = req.body.tel;
  var deadline = req.body.deadline;
  var introduce = req.body.introduce;
  let id = req.body.user_id;

  connection.query(
    "INSERT INTO group_table (group_size, group_sex, group_deadline, group_body, user_table_user_key) VALUES(?,?,?,?,?)",
    [head_count, gender, deadline, introduce, id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log(head_count, gender, tel, deadline, introduce);
      }
    }
  );
});
router.post("/meeting_writes", function (req, res) {
  var page = req.body.curpage;
  var rowsPerPage = req.body.rowsPerPage;
  var row_start;

  if (page === 1) {
    row_start = 0;
  } else {
    row_start = (page - 1) * rowsPerPage;
  }

  var sql =
    'SELECT group_size,group_sex, DATE_FORMAT(group_deadline,"%Y-%c-%d") AS deadline ,group_body, CASE WHEN TIMESTAMPDIFF(MINUTE ,group_date , NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE ,group_date , NOW()),"분 전") WHEN TIMESTAMPDIFF(MINUTE ,group_date , NOW()) BETWEEN 60 AND 1440 THEN CONCAT(TIMESTAMPDIFF(HOUR ,group_date , NOW()),"시간 전") ELSE DATE_FORMAT(group_date,"%y.%m.%d") END AS time_diff  FROM group_table ORDER BY group_key DESC LIMIT ?,8';
  var params = [row_start];

  connection.query(sql, params, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

router.post("/meeting_rowscount", function (req, res) {
  var board_key = req.body.board_key;
  var sql = "SELECT COUNT(group_key) AS rows_count FROM group_table";
  var params = [board_key];
  connection.query(sql, params, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      console.log("게시글 수 데이터 전송");
      res.json(rows);
    }
  });
});

//공지훈

router.post("/postage_modify", function (req, res) {
  var postage_key = req.body.postage_key;
  var title = req.body.title;
  var contents = req.body.contents;
  var sql =
    "UPDATE postage_table SET postage_title = ?, postage_body = ? WHERE postage_key = ?";
  var params = [title, contents, postage_key];
  connection.query(sql, params, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("게시물 수정 완료");
    }
  });
});
router.post("/postage_modify_row", function (req, res) {
  var postage_key = req.body.postage_key;
  var sql =
    "SELECT postage_title, postage_body FROM postage_table WHERE postage_key =?";
  var params = [postage_key];
  connection.query(sql, params, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      console.log("수정할 게시물의 제목과 내용 전송");
      res.json(rows);
    }
  });
});

router.post("/postage_write", function (req, res) {
  var board_key = req.body.board_key;
  var nickname = req.body.nickname;
  var title = req.body.title;
  var contents = req.body.contents;

  var sql =
    "INSERT INTO postage_table (postage_UN, user_nickname, postage_title,postage_body,user_key,postage_date) VALUES(?,?,?,?,(SELECT user_key FROM user_table WHERE user_nickname = ?),DEFAULT)";
  var params = [board_key, nickname, title, contents, nickname];
  connection.query(sql, params, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("게시판에 게시글 등록 완료");
    }
  });
});

router.post("/get_rows", function (req, res) {
  var page = req.body.curpage;
  var board_key = req.body.board_key;
  var rowsPerPage = req.body.rowsPerPage;
  var row_start;
  if (page === 1) {
    row_start = 0;
  } else {
    row_start = (page - 1) * rowsPerPage;
  }

  var sql =
    'SELECT v.* from (SELECT @rownum:= @rownum+1 as rownum, postage_key, user_nickname, postage_title, postage_love, CASE WHEN TIMESTAMPDIFF(MINUTE ,postage_date , NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE ,postage_date , NOW()),"분 전") WHEN TIMESTAMPDIFF(MINUTE ,postage_date , NOW()) BETWEEN 60 AND 1440 THEN CONCAT(TIMESTAMPDIFF(HOUR ,postage_date , NOW()),"시간 전") ELSE DATE_FORMAT(postage_date,"%y.%m.%d") END AS time_diff, postage_views, postage_comment FROM postage_table, (SELECT @rownum:=0) TMP WHERE postage_UN= ? ORDER BY postage_key DESC,rownum DESC LIMIT ?,18) v';
  var params = [board_key, row_start];

  connection.query(sql, params, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      console.log("페이지에 따른 데이터 전송");
      res.json(rows);
    }
  });
});

router.post("/rowscount", function (req, res) {
  var board_key = req.body.board_key;
  var sql =
    "SELECT COUNT(postage_key) AS rows_count FROM postage_table WHERE postage_UN = ?";
  var params = [board_key];

  connection.query(sql, params, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      console.log("게시글 수 데이터 전송");
      res.json(rows);
    }
  });
});
router.post("/view_post_love_state", function (req, res) {
  var board_key = req.body.board_key;
  var nickname = req.body.nickname;
  var postage_key = req.body.postage_key;
  var sql =
    "SELECT postage_key FROM postage_love_state WHERE postage_key = ? AND user_key = (SELECT user_key FROM user_table WHERE user_nickname = ?);";
  var params = [postage_key, nickname];

  connection.query(sql, params, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});
router.post("/view_post", function (req, res) {
  var board_key = req.body.board_key;
  var postage_key = req.body.postage_key;
  var sql_up_see =
    "UPDATE postage_table SET postage_views = postage_views + 1 WHERE postage_UN = ? AND postage_key = ?";
  var sql =
    'SELECT user_nickname, DATE_FORMAT(postage_date,"%Y.%m.%d  %H: %i: %S") AS postage_date, postage_views, postage_love, postage_body, postage_title, postage_comment FROM postage_table WHERE postage_UN = ? AND postage_key = ?';
  var params = [board_key, postage_key];
  connection.query(sql_up_see, params, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("조회수 증가");
    }
  });
  connection.query(sql, params, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      console.log("게시물 데이터 전송");
      console.log(rows);
      res.json(rows);
    }
  });
});
router.post("/post_love_adjustment", function (req, res) {
  var board_key = req.body.board_key;
  var postage_key = req.body.postage_key;
  var love_state = req.body.love_state;
  if (love_state === false) {
    var sql =
      "UPDATE postage_table SET postage_love = postage_love + 1 WHERE postage_UN = ? AND postage_key = ?";
  } else {
    var sql =
      "UPDATE postage_table SET postage_love = postage_love - 1 WHERE postage_UN = ? AND postage_key = ?";
  }
  var params = [board_key, postage_key];

  connection.query(sql, params, function (err) {
    if (err) {
      console.log(err);
    } else {
      if (love_state === true) {
        console.log(postage_key + "번 게시물 좋아요 수 다운");
      } else {
        console.log(postage_key + "번 게시물 좋아요 수 업");
      }
    }
  });
});
router.post("/pre_and_next_post", function (req, res) {
  var board_key = req.body.board_key;
  var postage_key = req.body.postage_key;
  var sql =
    'SELECT user_nickname, postage_title, postage_key, postage_love, postage_comment, postage_views, DATE_FORMAT( postage_date,"%c.%e") AS post_date FROM postage_table WHERE postage_key IN ((SELECT  postage_key FROM postage_table WHERE postage_UN = ? AND postage_key < ? ORDER BY postage_key DESC LIMIT 1), (SELECT postage_key FROM postage_table WHERE postage_UN = ? AND postage_key > ?  ORDER BY postage_key LIMIT 1))';
  var params = [board_key, postage_key, board_key, postage_key];

  connection.query(sql, params, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      console.log("이전, 다음 게시물 전송");
      res.json(rows);
    }
  });
});
router.post("/user_post_love_state_update", function (req, res) {
  var postage_key = req.body.postage_key;
  var love_state = req.body.love_state;
  var nickname = req.body.nickname;
  if (love_state === true) {
    var sql =
      "DELETE FROM postage_love_state WHERE postage_key = ? AND user_key = (SELECT user_key FROM user_table WHERE user_nickname = ?)";
  } else {
    var sql =
      "INSERT INTO postage_love_state (postage_key, user_key) VALUES (?,(SELECT user_key FROM user_table WHERE user_nickname = ?))";
  }
  var params = [postage_key, nickname];

  connection.query(sql, params, function (err) {
    if (err) {
      console.log(err);
    }
    console.log(postage_key + "에" + nickname + "가 좋아요 하거나 취소");
  });
});
router.post("/post_delete", function (req, res) {
  var postage_key = req.body.postage_key;
  var sql = "DELETE FROM postage_table WHERE postage_key=? ";
  var params = [postage_key];
  var sql_love_d = "DELETE FROM postage_love_state WHERE postage_key = ?";
  connection.query(sql_love_d, params, function (err) {
    if (err) {
      console.log(err);
    }
  });
  connection.query(sql, params, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(postage_key + "게시글 삭제");
    }
  });
});

//오민정
  /*club DB*/

router.post('/ClubPostageWrite',function(req,res){
  var clubTitle = req.body.clubTitle;
  var clubSubtitle = req.body.clubSubtitle;
  var clubShowbody =req.body.clubShowbody;
  var clubBody = req.body.clubBody;
  var nickname = req.body.nickname;

  console.log("닉 : ", nickname+"ㅇㅇㅇ"+clubTitle, clubSubtitle, clubShowbody, clubBody);

  connection.query('INSERT INTO card_table (card_UN,card_nickname,card_body,card_showbody,card_subtitle,card_title, user_key) VALUES(2,?,?,?,?,?,(SELECT user_key FROM user_table WHERE user_nickname = ?))',
  [nickname,clubBody,clubShowbody,clubSubtitle,clubTitle,nickname],function(err,rows,fields){
      if(err){
          console.log(err);
      }else{
          console.log(rows.insertId);
          let postNum = JSON.stringify(rows.insertId);
          res.send(postNum);
      }
        
  })
})
router.post('/clubupdate',function(req,res){
  var clubTitle = req.body.clubTitle;
  var clubSubtitle = req.body.clubSubtitle;
  var clubShowbody =req.body.clubShowbody;
  var clubBody = req.body.clubBody;
  var postNum= req.body.postNum;

  console.log("변경할 postNum : ",postNum);

  connection.query('UPDATE card_table SET card_title=?,card_subtitle=?,card_showbody=?,card_body=? WHERE card_key=? AND card_UN=2 LIMIT 1' ,
  [clubTitle,clubSubtitle,clubShowbody,clubBody,postNum],function(err,rows,fields){
      if(err){
          console.log(err);
      }else{
          console.log(rows.insertId);
          let postNum = JSON.stringify(rows.insertId);
          res.send(postNum);
      }
        
  })
})


router.post('/getsixpostclubtable',function(req,res){
  var startPostNum = req.body.startPostNum;
  connection.query('SELECT card_key, card_showbody, card_subtitle,card_title from card_table where card_UN=2 order by card_key desc limit ?,6;',[startPostNum],function(err,rows){
      console.log("getSixpost 쇼바디: ",rows.card_showbody);
  
      res.send(rows);
  })
})

router.post('/getclubpost',function(req,res){
  var card_key = req.body.postNum;
  connection.query('SELECT card_nickname, card_title,card_showbody, card_body, card_subtitle from card_table where card_UN=2 and card_key=?;',[card_key],function(err,rows){
      console.log("getPost: ",rows[0].card_body);
  
      res.send(rows);
  })
})

{/*market DB*/}

router.post('/getsixpostmarkettable',function(req,res){
  var startPostNum = req.body.startPostNum;
  connection.query('SELECT card_key,card_title,card_price,CASE WHEN TIMESTAMPDIFF(MINUTE ,card_date , NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE ,card_date , NOW()),"분 전") WHEN TIMESTAMPDIFF(MINUTE ,card_date , NOW()) BETWEEN 60 AND 1440 THEN CONCAT(TIMESTAMPDIFF(HOUR ,card_date , NOW()),"시간 전") ELSE CONCAT(TIMESTAMPDIFF(DAY ,card_date , NOW()),"일 전") END AS card_date, card_body,card_likes, card_location, card_sale_check from card_table where card_UN=0 order by card_key desc limit ?,6;',[startPostNum],function(err,rows){
      console.log("0번째",rows[0].card_title);
  
      res.send(rows);
  })
})
router.post('/getmarketpost',function(req,res){
  var card_key = req.body.postNum;
  
  connection.query('SELECT card_nickname,card_title,card_price, card_body, card_location, card_sale_check from card_table where card_UN=0 and card_key=?;',[card_key],function(err,rows){
      console.log("getmarketpost 0번째",rows[0].card_title);
  
      res.send(rows);
  })
})
router.post('/market',function(req,res){
  var title = req.body.productName;
  var price = req.body.price;
  var location =req.body.location;
  var body = req.body.content;
  var nickname =req.body.nickname;

  console.log("요소", title, price, location,body);

  connection.query('INSERT INTO card_table (card_UN,card_likes,card_nickname,card_title,card_price,card_body,card_location,card_sale_check) VALUES(0,0,?,?,?,?,?,0)',
  [nickname,title,price,body,location],function(err,rows,fields){
      if(err){
          console.log(err);
      }else{
          console.log(rows.insertId);
          let postNum = JSON.stringify(rows.insertId);
          res.send(postNum);
      }
        
  })
})

router.post('/marketupdate',function(req,res){
  var title = req.body.productName;
  var price = req.body.price;
  var location =req.body.location;
  var body = req.body.content;
  var postNum = req.body.postNum;

  console.log("변경할 postNum : ",postNum);

  connection.query('UPDATE card_table SET card_title=?,card_price=?,card_location=?,card_body=? WHERE card_key=? AND card_UN=0 LIMIT 1' ,
  [title,price,location,body,postNum],function(err,rows,fields){
      if(err){
          console.log(err);
      }else{
          console.log(rows.insertId);
          let postNum = JSON.stringify(rows.insertId);
          res.send(postNum);
      }
        
  })
})


{/*room DB*/}

router.post('/totalpostnum',function(req,res){
  var card_UN = req.body.card_UN;
  connection.query('select count(*) count from card_table where card_UN=?;',[card_UN],function(err,rows){
      console.log("카드 개수:",rows);
  
      res.send(rows);
  })
})

router.post('/getsixpostroom',function(req,res){
  var startPostNum = req.body.startPostNum;
  connection.query('SELECT card_key,card_subtitle,card_price,card_body,card_location,card_options, CASE WHEN TIMESTAMPDIFF(MINUTE ,card_date , NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE ,card_date , NOW()),"분 전") WHEN TIMESTAMPDIFF(MINUTE ,card_date , NOW()) BETWEEN 60 AND 1440 THEN CONCAT(TIMESTAMPDIFF(HOUR ,card_date , NOW()),"시간 전") ELSE CONCAT(TIMESTAMPDIFF(DAY ,card_date , NOW()),"일 전") END AS card_date, card_likes,card_sale_check from card_table where card_UN=1 order by card_key desc limit ?,6;',[startPostNum],function(err,rows){
      console.log("0번째",rows[0].card_subtitle);
  
      res.send(rows);
  })
})
router.post('/getroompost',function(req,res){
  var card_key = req.body.postNum;
  console.log("card_key: ",card_key);
  console.log("room!!");
  connection.query('SELECT card_subtitle,card_price,card_body,card_location,card_options,card_nickname,card_sale_check from card_table where card_UN=1 and card_key=?;',[card_key],function(err,rows){
      console.log(rows[0]);
      console.log("getmarketpost 0번째",rows[0].card_subtitle);
  
      res.send(rows);
  })
})
router.post('/room',function(req,res){
  var mode=req.body.mode;
  var options=req.body.option;
  var price=req.body.price;  
  var location=req.body.location; 
  var content=req.body.content;  
  var nickname=req.body.nickname;
 
  console.log("room new value insert");
  connection.query('INSERT INTO card_table (card_UN,card_subtitle,card_nickname,card_price,card_body,card_location,card_options) VALUES(1,?,?,?,?,?,?)',
  [mode,nickname,price,content,location,options],function(err,rows,fields){
      if(err){
          console.log(err);
      }
  })
})

router.post('/roomupdate',function(req,res){
  console.log("변경된 값: ",req.body);
  var mode=req.body.mode;
  var options=req.body.option;
  var price=req.body.price;  
  var location=req.body.location; 
  var content=req.body.content;  
  var postNum = req.body.postNum;

  console.log("변경할 postNum : ",postNum);
  console.log("room update");
  connection.query('UPDATE card_table SET card_subtitle=?,card_price=?,card_body=?,card_location=?,card_options=? WHERE card_key=? AND card_UN=1 LIMIT 1' ,
  [mode,price, content,location,options,postNum],function(err,rows,fields){
      if(err){
          console.log(err);
      }
  })
})

router.post('/deletecardpost',function(req,res){
  var card_UN = req.body.card_UN;
  var postNum = req.body.postNum;

  connection.query('DELETE FROM card_table WHERE card_UN=? AND card_key=?',[card_UN,postNum],function(err,rows,fields){
      res.send(rows);
  })
})
router.post('/soldoutcard',function(req,res){
  var card_key= req.body.card_key;

  connection.query('update card_table set card_sale_check=1 where card_key=?',[card_key],function(err,rows){
      console.log("판매 완료!");
  })
})
router.post('/likecheck',function(req,res){
  console.log(req.body);
  var nickname = req.body.nickname;
  var card_key = req.body.card_key;

  connection.query('SELECT nickname from cardlike_table where nickname = ? and card_key=?',[nickname,card_key],function(err,rows,fields){
      if(rows[0] === undefined){
          res.send(false);
      }else{
          res.send(true);
      }
  })
})

router.post('/likechange',function(req,res){
  console.log(req.body);
  var body = req.body;
  var nickname= req.body.nickname//req.body.post.nickname;
  
  if(body.like===false){
      connection.query('INSERT INTO cardlike_table (card_key,nickname) VALUES(?,?);',[body.card_key,nickname],function(err,rows,fields){
          console.log("like insert");
      })
      connection.query('update card_table set card_likes=card_likes+1 where card_key=?;', [body.card_key], function(err,rows){
          console.log(body.card_key,"번 카드 좋아요 +1");
      });

  }else if(body.like===true){
      
      connection.query('DELETE FROM cardlike_table where nickname = ? and card_key=?',[nickname,body.card_key],function(err,rows,fields){
          console.log("like delete");
         
      })
      connection.query('update card_table set card_likes=card_likes-1 where card_key=?;', [body.card_key] ,function(err,rows){
          console.log(body.card_key,"번 카드 좋아요 -1");
      });

  }

})
//Home 화면 TOP6 게시글
router.post("/TodayTop6Postage", function (req, res) {

  TodayTop6Postagesql =
    "SELECT postage_key, postage_title, postage_comment, postage_love, postage_UN, CASE postage_UN WHEN '0' THEN 'free' WHEN '1' THEN 'anonymous' WHEN '2' THEN 'new' WHEN '3' THEN 'love' WHEN '4' THEN 'politic' WHEN '5' THEN 'changbam' WHEN '6' THEN 'changwon' WHEN '7' THEN 'study' WHEN '8' THEN 'old' WHEN '9' THEN 'EmploymentReview' ELSE 'EmploymentAnnouncement' END 'board_name' FROM postage_table WHERE date_format(postage_date, '%y%m%d') = date_format(now(),'%y%m%d') ORDER BY postage_love DESC, postage_comment DESC LIMIT 6";

    connection.query(TodayTop6Postagesql,function (err,rows) {
      if(err){
        console.log(err);
      }
      else{
        
        res.json(rows);
      }
    });
});
router.post("/FreeTop6Postage", function (req, res) {

  FreeTop6sql =
    "SELECT postage_key, postage_title, postage_comment, postage_love FROM postage_table WHERE postage_UN = 0 ORDER BY postage_date DESC LIMIT 6";

    connection.query(FreeTop6sql,function (err,rows) {
      if(err){
        console.log(err);
      }
      else{
        res.json(rows);
      }
    });
});
router.post("/AnonymousTop6Postage", function (req, res) {

  AnonymousTop6sql = 
  "SELECT postage_key, postage_title, postage_comment, postage_love FROM postage_table WHERE postage_UN = 1 ORDER BY postage_date DESC LIMIT 6";
  
    connection.query(AnonymousTop6sql,function (err,rows) {
      if(err){
        console.log(err);
      }
      else{
        res.json(rows);
      }
    });
});
router.post("/EmploymentTop6Postage", function (req, res) {

  EmploymentTop6sql = 
  "SELECT postage_key, postage_title, postage_comment, postage_love FROM postage_table WHERE postage_UN = 9 ORDER BY postage_date DESC LIMIT 6";
  
    connection.query(EmploymentTop6sql,function (err,rows) {
      if(err){
        console.log(err);
      }
      else{
        res.json(rows);
      }
    });
});
//존재하는 게시물인지 확인
router.post("/PostageCheck", function (req, res) {
  var postage_key = req.body.postage_key;
  var board_key = req.body.board_key;
  var params = [postage_key, board_key];
var PostageChecksql = 
      "SELECT * FROM postage_table WHERE postage_key = ? AND postage_UN = ?"
  connection.query(PostageChecksql,params,function (err,rows) {
    if(err){
      console.log(err);
    }
    else{
      if (rows[0] === undefined) {
        res.send(false);
      } else {
        res.send(true);
      }     
    }
  });
});
module.exports = router;
