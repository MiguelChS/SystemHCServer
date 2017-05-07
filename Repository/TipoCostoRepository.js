/**
 * Created by mc185249 on 4/30/2017.
 */
let typeCost = require("../Schema/CategoriasTipoCosto");

function typeCostRepository() {
    this.getTypeCost = ()=>{
        return new Promise((resolve,reject)=>{
            typeCost.aggregate([
                {$lookup:{
                    from:"TipoCosto",
                    localField:"id_tipo_costo_parent",
                    foreignField:"_id",
                    as:"costoParent"
                }},
                {$unwind: '$costoParent'},
                {$lookup:{
                    from:"TipoCosto",
                    localField:"id_tipo_costo_children",
                    foreignField:"_id",
                    as:"costoChildren"
                }},
                {$unwind: '$costoChildren'},
                {$lookup:{
                    from:"CategoriasTipoCosto",
                    localField:"id_tipo_costo_parent",
                    foreignField:"id_tipo_costo_children",
                    as:"hasParent"
                }},
                {$group:{
                    _id:"$id_tipo_costo_parent",
                    costoParent:{$first:"$costoParent"},
                    costoChildren:{$addToSet:"$costoChildren"},
                    hasParent:{$first:"$hasParent"}
                }},
                {$project:{
                    _id:0,
                    "value":"$costoParent._id",
                    "label":"$costoParent.descripcion",
                    "hasParent":{$cond: { if: { $eq: [ {$size:"$hasParent"}, 0 ]}, then: false, else: true }},
                    costoChildren:{
                        $map:{
                            input:"$costoChildren",
                            as:"children",
                            in:{
                                "value":"$$children._id",
                                "label":"$$children.descripcion"
                            }
                        }
                    }
                }}
            ]).then((result)=>{
                resolve({
                    TypeCostParent:result.filter(obj=>obj.hasParent == false),
                    TypeCostChildren:result.filter(obj=>obj.hasParent == true)
                })
            })
                .catch((err)=>{
                    reject(err)
                })
        })
    }
}

module.exports = typeCostRepository;