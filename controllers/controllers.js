const Blog=require('../module/module');

exports.getall=async(req,res)=>{

    
   let data;
   try {
       data = await Blog.find();
  console.log(data);

   } catch (err) {
       if(err) return res.status(500).json(err);
   }
   res.status(200).json(data);


   /* Blog.find()
    .then((data)=>{
        res.status(200).json(data);
    })
    .catch((err)=>{
        if(err) res.status(500).json(err)
    });
    */
}

exports.getone=async(req,res)=>{
    let data;
    try{
        data= await Blog.findById( req.params.blogID);
        if(!data) return res.status(404).json({"msg":"blog not found"});
     }
     catch(err){
          if(err) return res.status(500).json(err);  
     }
     res.status(200).json(data);
    /*Blog.findById(req.params.blogID)
        .then((data)=>{
            if(!data) return res.status(404).json({"mag":"Blog not found"});
            res.status(200).json(data);
        })
        .catch((err)=>{
            if(err) res.status(500).json(err);
        })*/

}

exports.bytitle=(req,res)=>{

    Blog.findOne({title:req.params.blogTitle})
    .then((data)=>{
        if(!data) return res.status(404).json({"mag":"Blog not found"});
        res.status(200).json(data);
    })
    .catch((err)=>{
        if(err) res.status(500).json(err);
    })
}

exports.byauthor=(req,res)=>{

    Blog.findOne({author:req.params.blogauthor})
    .then((data)=>{
        if(!data) return res.status(404).json({"mag":"Blog not found"});
        res.status(200).json(data);
    })
    .catch((err)=>{
        if(err) res.status(500).json(err);
    })
}

exports.bydesc=(req,res)=>{

    Blog.findOne({desc :req.params.blogdesc})
    .then((data)=>{
        if(!data) return res.status(404).json({"mag":"Blog not found"});
        res.status(200).json(data);
    })
    .catch((err)=>{
        if(err) res.status(500).json(err);
    })
}  

exports.create=async(req,res)=>{

    const newBlog=new Blog({
        title:req.body.title,
        author:req.body.author,
       desc:req.body.desc
   })
   try{
       await newBlog.save()
   }
   catch(err){
       if(err) return res.status(500).json(err);
   }
   res.status(201).json({
       "msg":"blog created",
       "doc":newBlog
   });
   /* const newblog=new Blog({
        title:req.body.title,
        author:req.body.author,
        desc:req.body.desc
    });
    //console.log(newblog);
    
    newblog.save().then((blog)=>{
        res.status(201).json({"msg":"created","blog":blog});
    }).catch((err)=>{
        if(err) return res.status(500).json(err);
    })*/
}

exports.updateone=async(req,res)=>{

    if(!req.body.title||!req.body.desc||!req.body.author)
    return res.status(500).json({"msg":"fill all the fields"});
  let data;
  
  try{
     
      data= await Blog.findByIdAndUpdate(req.params.blogID,{
              title: req.body.title,
              author:req.body.author,
              desc:req.body.desc
             },{new:true});
      if(!data) return res.status(404).json({"msg":"Not found"});
  }
  catch(err){
      if(err) return res.status(500).json(err);
  }
  res.status(202).json({
                    "msg":"updated",
                    "doc":data
                });
    /*if(!req.body.title||!req.body.desc||!req.body.author)
        return res.status(500).json({"msg":"fill all the fields"});
    
    Blog.findByIdAndUpdate(req.params.blogID,{
        title: req.body.title,
        author:req.body.author,
        desc:req.body.desc
    },{new: true})
        .then((data)=>{

            if(!data) return res.status(404).json({"msg":"Not found"});
            res.status(202).json({
                "msg":"updated",
                "doc":data
            });
        })
        .catch((err)=>{
            if(err) res.status(500).json(err)
        }) */   
}

exports.deleteone=async(req,res)=>{

    let data;
    try{
        data= await Blog.findByIdAndDelete( req.params.blogID);
        if(!data) return res.status(404).json({"msg":"blog not found"});
     }
     catch(err){
          if(err) return res.status(500).json(err);  
     }
     res.status(200).json({
         "msg" : "deleted",
         "doc":data
     });
   /* Blog.findByIdAndDelete(req.params.blogID)
        .then((data)=>{

            if(!data) return res.status(404).json({"msg":"Blog not found"});

            res.status(202).json({
                "msg":"deleted",
                "doc":data
            });

        })
        .catch((err)=>{
            if(err) res.status(500).json(err);
        });*/

}