var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var app = express();
app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());

var conString = "mongodb://127.0.0.1:27017";

/* ------ API ---------*/

//search
app.get("/users", (req, res) => {
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("todo-react-app")
        database.collection("userReg").find({}).toArray().then(document=>{
            res.send(document)
            res.end()
        })
    })
})
 

// add
app.post("/register-user",(req,res)=>{
    var user={
        UserId:req.body.UserId,
        UserName:req.body.UserName,
        Password:req.body.Password,
        Email:req.body.Email,
        Mobile:req.body.Mobile
    }
    mongoClient.connect(conString).then(clientObj=>{
        var database=clientObj.db("todo-react-app")
        database.collection("userReg").insertOne(user).then(()=>{
            console.log('User  Registered.. ')
            res.end()
        })
    })
})

app.put("/edit-userDetails/:id",(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        var database=clientObj.db("todo-react-app")
        database.collection("userReg").updateOne({UserId:req.params.id},{$set:{UserId:req.body.UserId,UserName:req.body.UserName,Password:req.body.Password,Email:req.body.Email,Mobile:req.body.Mobile}}).then(()=>{
            console.log('User Details updaated...')
            res.end()
        })
    })
})

//
app.delete("/delete-userDetails/:id",(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        var database=clientObj.db("todo-react-app")
        database.collection("userReg").deleteOne({UserId:req.params.id}).then(()=>{
            console.log('User Deleted..')
            res.end()
        })
    })
})


// Route for appointment (API)

app.get("client/:id",(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db("todo-react-app")
        database.collection("tblappointment").find({UserId:req.params.id}).toArray().then((document)=>{
            console.log('appointment found..')
            res.send(document)
            res.end()
        })
    })
})

app.post("/add-appointment",(req,res)=>{
    var appointment={
        AppointmentId:parseInt(req.body.AppointmentId),
        Title:req.body.Title,
        Description:req.body.Description,
        Date:new Date(req.body.Date),
        UserId:req.body.UserId

    }
    mongoClient.connect(conString).then(clientObj=>{
        var database=clientObj.db("todo-react-app")
        database.collection("tblappointment").insertOne(appointment).then(()=>{
            console.log('Appointment registered successfully..')
            res.end()
        })
    })
})
/*
app.put("/edit-appointment/:id",(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        const database=clientObj.db("todo-react-app")
        database.collection("tblappointment").updateOne({AppointmentId:parseInt(req.body.id)},
        {
            $set:{
                AppointmentId:parseInt(req.body.AppointmentId),
                Title:req.body.Title,
                Description:req.body.Description,
                Date:new Date(req.body.Date),
                UserId:req.body.User
            }
        }).then(()=>{
            console.log('Appointment changed... ')
            res.end()
        })
    })
})*/


app.put("/edit-appointment/:id", (req, res) => {
    const appointmentId = parseInt(req.params.id); // Parse the ID from the URL parameter
    
    mongoClient.connect().then(clientObj => {
        const database = clientObj.db("todo-react-app");
        database.collection("tblappointment").updateOne(
            { AppointmentId: appointmentId },
            {
                $set: {
                    AppointmentId: appointmentId, // Optional: Keep it if you want to ensure it remains unchanged
                    Title: req.body.Title,
                    Description: req.body.Description,
                    Date: new Date(req.body.Date),
                    UserId: req.body.UserId
                }
            }
        ).then(result => {
            if (result.matchedCount > 0) {
                console.log('Appointment changed...');
                res.status(200).json({ message: "Appointment updated successfully." });
            } else {
                res.status(404).json({ message: "Appointment not found." });
            }
        }).catch(err => {
            console.error('Error updating appointment:', err);
            res.status(500).json({ error: "An error occurred while updating the appointment." });
        }).finally(() => {
            clientObj.close();
        });
    }).catch(err => {
        console.error('Error connecting to MongoDB:', err);
        res.status(500).json({ error: "Could not connect to the database." });
    });
});

app.delete("/delete-appointment/:id",(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        var database=clientObj.db("todo-react-app")
        database.collection("tblappointment").deleteOne({AppointmentId:parseInt(req.params.id)}).then(()=>{
            console.log('Appointment deleted..')
            res.end()
        })
    })
})
app.listen(3200)
console.log("Server Started : http://127.0.0.1.3200")
