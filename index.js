const express = require('express');
const client = require("prom-client"); //for metric collection 
const { doSomeHeavyTask }  = require("./util");

const app = express();
const PORT = process.env.PORT || 8000;

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

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
)

app.get("/metrics", async (req, res) => {
    res.setHeader('Content-Type', client.register.contentType)
    const metrics = await client.register.metrics();
    res.send(metrics);
});

app.listen(PORT, () => {
    console.log(`Bhai Server is running on port ${PORT}`);
});