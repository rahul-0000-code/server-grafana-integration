const express = require('express');
const { doSomeHeavyTask }  = require("../util");

const app = express();
const PORT = process.env.PORT || 8000;


app.get("/", (req, res) => {
    return res.json({
        message: "Hello your server is runnning as makhaan"
    });
    
})


app.get("/slow", async (req, res) => {
    try{
        const timeTaken = await doSomeHeavyTask();
        return res.json({
            status: "Success",
            message: `Heavy kaam hoagya inn ${timeTaken}`,
        });
    }
        catch(error) {
            return res.status(500).json({
                status: "Error",
                message: "Something went wrong",
                });
        }
    }
})

app.listen(PORT, () => {
    console.log(`Bhai Server is running on port ${PORT}`);
});