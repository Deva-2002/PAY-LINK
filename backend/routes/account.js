
const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db/db');
const { default: mongoose } = require('mongoose');


const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    
    // const session = await mongoose.startSession();

    // console.log("control1");
    // session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId })
    // console.log("control1");


    if (!account || account.balance < amount) {
        
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    // console.log("control1");


    const toAccount = await Account.findOne({ userId: to })

    if (!toAccount) {
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // console.log("control1");


    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

    // Commit the transaction
    // await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });

    console.log("control1");

});

module.exports = router;