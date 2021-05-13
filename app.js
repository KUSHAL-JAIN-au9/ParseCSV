var fs = require('fs')
var csv = require('fast-csv')
const pool = require('./pgdb')


pool.connect(function(err){

    if(err){
        console.log(err);
    }
})


let counter = 0

// let header = []

// let data = []

let csvStream = csv.parseFile(".\\csv\\5mSalesRecords.csv", { headers : true })
    .on("data", function(record){
        csvStream.pause()

        if(counter<10){

            let Region = record.Region
            let Country = record.Country
            let ItemType = record.ItemType
            let SalesChannel = record.SalesChannel
            let orderPriority = record.OrderPriority
            let orderDate = record.OrderDate
            let orderID = record.orderID
            let ShipDate = record.ShipDate
            let UnitsSold = record.UnitsSold
            let UnitPrice = record.UnitPrice
            let UnitCost = record.UnitCost
            let TotalRevenue = record.TotalRevenue
            let TotalCost = record.TotalCost
            let TotalProfit = record.TotalProfit


            pool.query("INSERT INTO 5m Sales Records.csv(Region,Country,ItemType,SalesChannel,orderPriority,orderDate,orderID,ShipDate,UnitsSold,UnitCost,TotalRevenue,TotalCost,TotalProfit)\
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) ",[Region,Country,ItemType,SalesChannel,orderPriority,orderDate,orderID,ShipDate,UnitsSold,UnitPrice,UnitCost,TotalRevenue,TotalCost,TotalProfit],function(err){

                if(err){
                    console.log(err);
                }
            })
            ++counter;

        }

        csvStream.resume()
    }).on("end", function(err){

        console.log(err);
    })