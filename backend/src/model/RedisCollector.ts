import Redis from 'ioredis'
import { Dump , RequestData ,newDump ,addRequest, addMock } from './Dump';
require('dotenv').config();


const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error('REDIS_URL is not defined');
}
const client = new Redis(redisUrl);

export default class RedisCollector {

    public async createDump() :Promise<Dump>  {
        const dump: Dump = newDump();

        await client.set(dump.name, JSON.stringify(dump), 'EX', 60 * 60 * 2);

        return dump;
    }

    public async createRequest(dump : Dump, request : RequestData) {
        const updatedDump =  addRequest(dump,request);
        await client.set(dump.name, JSON.stringify(updatedDump), 'EX', 60 * 60 * 2).then(() => {
        });
        return updatedDump;
    }
    
    public async createMockResponse(dump: Dump){
        const updatedDump =  addMock(dump,dump.mockResponse);
        await client.set(dump.name, JSON.stringify(updatedDump), 'EX', 60 * 60 * 2).then(() => {
        });
        return updatedDump;
    }
    
    public async getDump(name : string) : Promise<Dump | null> {
    return await client.get(name).then((res) => {
        if (res) {
            return JSON.parse(res) as Dump;
        } else {
            return null;
        }
    }).catch((err) => {
        return null;
    });
}
}

