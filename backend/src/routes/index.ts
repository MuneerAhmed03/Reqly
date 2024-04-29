import express from "express";
import { v4 as uuidv4 } from "uuid";
import RedisCollector from "../model/RedisCollector";
import { Dump, RequestData } from "../model/Dump";
import { getIO } from "../io/io";

const router = express.Router();

const redisCollector = new RedisCollector();

router.get("/generate", async (req, res) => {
  await redisCollector.createDump().then((dump) => {
    res.send(dump.name);
  });
});

router.all("/inspect/:randomUrl", async (req, res) => {
  const dump : Dump | null = await redisCollector.getDump(req.params.randomUrl);
  if(dump!=null){

    const requestData : RequestData = {
      url: req.params.randomUrl,
      body: req.body,
      method: req.method,
      headers: Object.entries(req.headers).map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, value.join(', ')];
        } else {
          return [key, value || ''];
        }
      }),
      query : req.query as Record<string, string | undefined>,
    };
    console.log(requestData);
    await redisCollector.createRequest(dump, requestData).then(() => {
        getIO().emit("newRequest", { dump: dump.name, request: requestData });
        
      res.send(dump.mockResponse);
    });
  }
  else{
    res.send("Invalid URL");
  }
});

router.post("/response", async (req,res)=>{
    const key=req.query.key as string;
    const dump : Dump | null = await redisCollector.getDump(key);
    const mock = req.body;
    if(dump!=null){
        await redisCollector.createMockResoponse(dump,mock)
    }else{
        res.send("Invalid key");
    }
    
});

export=router;