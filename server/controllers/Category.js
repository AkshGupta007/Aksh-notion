const Category=require('../models/Category');

exports.createCategory= async(req,res)=>{
    try{
        const {name,description}=req.body;
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"name and description are required"
            })
        }
        const newCategory= await Category.create({
            name,
            description
        })

        return res.status(201).json({
            success:true,
            message:"category created successfully",
            data:newCategory
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"error in creating category",
        })

    }
}

exports.getallCategory= async(req,res)=>{
    try{
        const categories = await Category.find({}).populate("courses").exec();
        return res.status(200).json({
            success:true,
            message:"categories fetched successfully",
            data:categories
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"error in fetching categories",
        })
    }
        
};

exports.getcategorypagedetails= async(req,res)=>{
    try{
        const {categoryid}=req.body;

        const selectedcategory = await Category.findById(categoryid).populate("courses").exec();
        if(!selectedcategory){
            return res.status(404).json({
                success:false,
                message:"category not found"
            })
        }

        const differentcategories = await Category.find({_id:{$ne:categoryid}}).populate("courses").exec();

        return res.status(200).json({
            success:true,
            message:"category page details fetched successfully",
            data:{
                selectedcategory,
                differentcategories
            }
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"error in fetching category page details",
        })
    }
}