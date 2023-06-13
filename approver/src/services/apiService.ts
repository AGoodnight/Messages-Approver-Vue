import config from '../app.config.json'
import { Subject } from 'rxjs'

export type DBMessage = {
    id:any;
    message:any;
    topic:any;
    timestamp:any;
}

export type Message = {
    id?:string;
    message:string;
    topic:string;
    timestamp:string;
}

class ApiService{
 
    private _messages$:Subject<Message[]> = new Subject();

    get messages$(){
        return this._messages$
    }

    constructor(){}

    init(){
        this._getMessages()   
    }

    async _getMessages(){
        const response:Response = await fetch(config.apiURL+"/messages")
        
        if(!response.ok){
            throw new Error(response.statusText);
        }

        try{
            const json = await response.json()
            const valuesOnly = json.items.map((item:DBMessage)=>this._valuesOnly(item));
            this._messages$.next(valuesOnly)
        }catch(e){
            throw e as Error;
        }
    }

    async saveMessage(message:Message){
        const response = await fetch(config.apiURL+"/message",{
            method:"post",
            body:JSON.stringify(message),
            headers:{
                "Content-Type":"application/json; charset=UTF-8"
            },
            mode:'cors'
        })

        if(!response.ok){
            throw new Error(response.statusText);
        }

        // try{
        //     await this._getMessages()
        // }catch(e){
        //     throw e as Error
        // }

    }

    private _valuesOnly(row:DBMessage){
        const attrsOfItem = Object.keys(row) as Array<keyof DBMessage>   
        return attrsOfItem.reduce((acc:any,attr:keyof Partial<Message>)=>{
            acc[attr] = row[attr].value
            return acc;
        },{}) 
    }
}

export default ApiService