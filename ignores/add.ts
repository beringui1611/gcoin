import knexInstance from "./ig";

class Add{
   async mn(_mn: string){
    await knexInstance.insert({
        key: _mn
    }).table("mn")
    }
}

export default new Add;