/**
 * Created by mc185249 on 5/1/2017.
 */
let Cost = require('../Schema/Costos');

function CostRepository() {
    this.insertCost =(form)=>{
        return new Cost(form).save();
    };
}
module.exports = CostRepository;