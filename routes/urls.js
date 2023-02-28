import express from 'express';
import {nanoid} from 'nanoid';
import Url from '../models/Url.js'
import { validateUrl } from '../utils/utils.js';
import dotenv from 'dotenv';
dotenv.config();

const router=express.Router();

//short url generator
router.post('/short',async(req,res)=>{
    const {originalUrl} =req.body;
    const base=process.env.BASE;

    const urlId=nanoid();
    if(validateUrl(originalUrl)){
        try{
            let url=await Url.findOne({originalUrl});
            if(url){
                res.json(url);
            }else{
                const shortUrl=`${base}/${urlId}`;

                url=new Url({
                    originalUrl,
                    shortUrl,
                    urlId
                });

                await url.save();
                res.json(url);
            }
        }catch(err){
            console.log(err);
            res.status(500).json('Server error');
        }
    }else{
        res.status(400).json('Invalid Original URL');
    }
})

export default router;