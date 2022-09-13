import mongodb from 'mongodb';
let MongoClient = mongodb.MongoClient;
import bcrypt from 'bcrypt';
import express from 'express';
//const uri = "mongodb+srv://test:test@cluster0.mdmzq.mongodb.net/?retryWrites=true&w=majority";
 const uri = "mongodb+srv://gowthami123:gowthami@cluster0.7vwrl4g.mongodb.net/?retryWrites=true&w=majority";
import xlsxFile from 'read-excel-file/node';
import jwt from 'jsonwebtoken';

//var privateKey = fs.readFileSync('private.key');
var privateKey = '0000'
const saltRounds = 10;

//just not to do spelling mistakes
const timings = {
    'BRF': 'BRF',
    'LCH': 'LCH',
    'DNR': 'DNR',
    'NGT': 'NGT',
    'SKS': 'SKS',
    'DRK': 'DRK',
};

const cuisine = {
    'NI': 'NI',
    'SI': 'SI'
}

const locationCodes = {
    'BLR': 'BLR',
    'MUM': 'MUM',
    'CHN': 'CHN',
    'AP': 'AP'
}

const restuarants = [
    {
        'name': 'Barbeque Nation 1',
        'code': 'BNQ',
        'location_codes': [locationCodes.BLR, locationCodes.CHN],
        'timing_codes': [timings.DNR, timings.LCH, timings.BRF],
        'cuisine': [cuisine.NI, cuisine.SI],
        'cost': 550,
        'overview': 'Gives dnr,lnc,brf in blr and chn',
        'images': ['/images/breakfast-detail.png', '/images/breakfast-detail.png'],
        "address": "#32 Koramangala stree blr"
    },
    {
        'name': 'Barbeque Nation 2',
        'code': 'BNQ',
        'location_codes': [locationCodes.BLR, locationCodes.CHN],
        'timing_codes': [timings.DNR, timings.LCH, timings.BRF],
        'cuisine': [cuisine.NI, cuisine.SI],
        'cost': 550,
        'overview': 'Gives dnr,lnc,brf in blr and chn',
        'images': ['/images/breakfast-detail.png', '/images/breakfast-detail.png'],
        "address": "#32 Koramangala stree blr"
    },
    {
        'name': 'Barbeque Nation 3',
        'code': 'BNQ',
        'location_codes': [locationCodes.BLR, locationCodes.CHN],
        'timing_codes': [timings.DNR, timings.LCH, timings.BRF],
        'cuisine': [cuisine.NI, cuisine.SI],
        'cost': 550,
        'overview': 'Gives dnr,lnc,brf in blr and chn',
        'images': ['/images/breakfast-detail.png', '/images/breakfast-detail.png'],
        "address": "#32 Koramangala stree blr"
    },
    {
        'name': 'Barbeque Nation 4',
        'code': 'BNQ',
        'location_codes': [locationCodes.BLR, locationCodes.CHN],
        'timing_codes': [timings.DNR, timings.LCH, timings.BRF],
        'cuisine': [cuisine.NI, cuisine.SI],
        'cost': 550,
        'overview': 'Gives dnr,lnc,brf in blr and chn',
        'images': ['/images/breakfast-detail.png', '/images/breakfast-detail.png'],
        "address": "#32 Koramangala stree blr"
    },
    {
        'name': 'Barbeque Nation 5',
        'code': 'BNQ',
        'location_codes': [locationCodes.BLR, locationCodes.CHN],
        'timing_codes': [timings.DNR, timings.LCH, timings.BRF],
        'cuisine': [cuisine.NI, cuisine.SI],
        'cost': 550,
        'overview': 'Gives dnr,lnc,brf in blr and chn',
        'images': ['/images/breakfast-detail.png', '/images/breakfast-detail.png'],
        "address": "#32 Koramangala stree blr"
    },
    {
        'name': 'Barbeque Nation 6',
        'code': 'BNQ',
        'location_codes': [locationCodes.BLR, locationCodes.CHN],
        'timing_codes': [timings.DNR, timings.LCH, timings.BRF],
        'cuisine': [cuisine.NI, cuisine.SI],
        'cost': 550,
        'overview': 'Gives dnr,lnc,brf in blr and chn',
        'images': ['/images/breakfast-detail.png', '/images/breakfast-detail.png'],
        "address": "#32 Koramangala stree blr"
    },
    {
        'name': 'Barbeque Nation 7',
        'code': 'BNQ',
        'location_codes': [locationCodes.BLR, locationCodes.CHN],
        'timing_codes': [timings.DNR, timings.LCH, timings.BRF],
        'cuisine': [cuisine.NI, cuisine.SI],
        'cost': 550,
        'overview': 'Gives dnr,lnc,brf in blr and chn',
        'images': ['/images/breakfast-detail.png', '/images/breakfast-detail.png'],
        "address": "#32 Koramangala stree blr"
    },
    {
        'name': 'Cafe Masala',
        'code': 'CM',
        'location_codes': [locationCodes.MUM, locationCodes.AP],
        'timing_codes': [timings.BRF],
        'cuisine': [cuisine.SI],
        'cost': 1500,
        'overview': 'Gives brf in mum and ap',
        'images': ['/images/breakfast-detail.png'],
        "address": "#32 Koramangala stree blr"
    },
    {
        'name': ' Ragreza',
        'code': 'RZ',
        'location_codes': [locationCodes.MUM, locationCodes.AP],
        'timing_codes': [timings.DNR],
        'cuisine': [cuisine.NI],
        'cost': 900,
        'overview': 'Dnr in mum , ap',
        'images': ['/images/breakfast-detail.png'],
        "address": "#32 Koramangala stree blr"
    },
]

const quickResturantFilters = [
    {
        'timing': 'Breakfast',
        'code': timings.BRF,
        'image': '/images/breakfast.png',
        'description': 'Start Your day with exclusive breakfast options'
    },
    {
        'timing': 'Lunch',
        'code': timings.LCH,
        'image': '/images/lunch.png',
        'description': 'Start Your day with exclusive breakfast options'
    },
    {
        'timing': 'Dinner',
        'code': timings.DNR,
        'image': '/images/dinner.png',
        'description': 'Start Your day with exclusive breakfast options'
    },
    {
        'timing': 'Snacks',
        'code': timings.SKS,
        'image': '/images/snacks.png',
        'description': 'Start Your day with exclusive breakfast options'
    },
    {
        'timing': 'Night',
        'code': timings.NGT,
        'image': '/images/night.png',
        'description': 'Start Your day with exclusive breakfast options'
    },
    {
        'timing': 'Drinks',
        'code': timings.DRK,
        'image': '/images/drink.png',
        'description': 'Start Your day with exclusive breakfast options'
    }
]

const client = new MongoClient(uri, {
});

const app = express();
const PORT = 9191;

app.use(express.json());
app.use(express.urlencoded());

client.connect(err => {
    if (err) {
        console.log(err)
    }
    console.log("CONNECTED TO DB")
})

const db = client.db('test');
client.close();


function getHeaderFromToken(token) {
    const decodedToken = jwt.decode(token, {
        complete: true
    });

    if (!decodedToken) {
        throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, `provided token does not decode as JWT`);
    }

    return decodedToken;
}

// GETTING END POINTS
app.get('/getFood', async (req, res) => {
    try {
        console.log(req.headers.token)
        const tokenHeaders = getHeaderFromToken(req.headers.token);
        console.log(tokenHeaders);
        const limitGiven = parseInt(req.query.limit) || 100;
        const pageGiven = parseInt(req.query.page) || 1;
        const itemsToSkip = (pageGiven - 1) * limitGiven;

        const totalRecord = await (await db.collection('food').find({}).toArray()).length;
        const foods = await db.collection('food').find({}).skip(itemsToSkip).limit(limitGiven).toArray();
        res.send({
            'status': 200,
            'data': foods,
            'total': totalRecord
        })
    } catch (e) {
        res.send({
            'status': 500,
            'data': e
        })
    }
});

app.get('/getQuickResurantFilters', async (req, res) => {
    try {
        res.send({
            'status': 200,
            'data': quickResturantFilters,
        })
    } catch (e) {
        res.send({
            'status': 200,
            'data': quickResturantFilters
        })
    }
});

app.get('/getLocations', async (req, res) => {
    const locations = [
        {
            'name': 'Bangalore',
            'code': locationCodes.BLR
        },
        {
            'name': 'Chennai',
            'code': locationCodes.CHN
        },
        {
            'name': 'Andra',
            'code': locationCodes.AP
        },
        {
            'name': 'Mumbai',
            'code': locationCodes.MUM
        }

    ]
    try {
        res.send({
            'status': 200,
            'data': locations,
        })
    } catch (e) {
        res.send({
            'status': 200,
            'data': locations
        })
    }
});

app.get('/getResturants', async (req, res) => {
    const location_code = req.query?.location_code;
    const timing_code = req.query?.timing_codes;
    const selectedCuisine = req.query?.selectedCuisine;

    const page = req.query?.page || 1;
    const limit = req.query?.limit || 2;

    let costFilter = req.query?.selectedCostRange;

    let filters = {};
    if (location_code) {
        filters['location_codes'] = location_code.join(',')
    }
    if (timing_code) {
        filters['timing_codes'] = timing_code.join(',')
    }
    if (selectedCuisine) {
        filters['cuisine'] = selectedCuisine.join(',')
    }
    console.log(filters)

    let filtered_restuarants = [];

    // These are filter applied
    filtered_restuarants = restuarants.filter(resturant => {
        return Object.keys(filters).every(filter => {
            // return resturant[filter].includes(filters[filter])
            return resturant[filter].some((item, index) => satisfyCallBack(item, index, filters[filter]))
        });
    });

    // cost filters
    if (costFilter) {
        console.log(costFilter)
        costFilter = JSON.parse(costFilter)
        filtered_restuarants = filtered_restuarants.filter((item) => {
            console.log(costFilter.from)
            return (item.cost >= costFilter.from && item.cost <= costFilter.to)
        });
    }

    const skip = (page-1)*limit;

    const tempFr = [...filtered_restuarants];
    tempFr.splice(0,skip);// To skip
    //give 0 - limit-1 items
    const limitAppliedItems = tempFr.slice(0,limit)
    // on top of applying filters i also need specific page data

    try {
        res.send({
            'status': 200,
            'data': {
                'resturants':limitAppliedItems,
                'total':filtered_restuarants.length
            },
        })
    } catch (e) {
        console.error(e)
        res.send({
            'status': 200,
            'data': filtered_restuarants
        })
    }
});

function satisfyCallBack(resturantItem, index, filterItem) {
    let flag = false;
    const splitArray = filterItem.split(',');
    splitArray.forEach(element => {
        flag = flag || (element == resturantItem);
    });
    return (flag);
}

app.get('/getResturantDetails', async (req, res) => {
    const resturantCode = req.query.code;

    const resrurantDetails = restuarants.find((item) => {
        return item.code == resturantCode;
    })
    try {
        res.send({
            'status': 200,
            'data': resrurantDetails,
        })
    } catch (e) {
        res.send({
            'status': 200,
            'data': resrurantDetails
        })
    }
});

// i want : kya delete karna
// unique identified -- automically aata hai har ek doc ..
//_id 
// string part of the id -- i can manage to get from UI

//recieve id using --request.body
// requet.body.deleteId 
//db.collection('food').deleteOne({_id:mongodb.Object()})
//ORM - M
// connect to db
// c r d
app.get('/filterFood', async (req, res) => {
    const foods = await db.collection('food').find({ 'cuisine': 'breakfast', 'cost': '200' }).toArray();
    res.send({
        'status': 200,
        'data': foods
    })
});

app.post('/addFood', async (req, res) => {
    const result = await db.collection('food').insertOne({ ...req.body })
    res.send({
        'status': 200,
        'message': 'Food item addded successfully',
        'data': result.insertedId
    })
});

app.post('/signup', async (req, res) => {
    console.log(req)
    // if username exists ....
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, async function (err, hash) {
            console.log(hash);
            const result = await db.collection('user').insertOne({ ...req.body, 'password': hash })
            if (result.acknowledged) {
                res.send({
                    'status': 200,
                    'message': 'user item addded successfully',
                })
            }

        });
    });
});

app.post('/login', async (req, res) => {
    let result;
    // const user = await db.collection('user').find({ 'username': req.body.username }).limit(1).toArray();
    // console.log(user)
    const user = [
        {
          _id: "631dede020350397f424bbde",
          username: 'sushma@gmail.com',
          password: '$2b$10$FU/Oh7C/GG6qakX38lNMJuM8nxh6Hxsb3syDs8WaRCWKHsBsz7bIK',
          role: 'admin'
        }
    ]
    if (user.length) {
        bcrypt.compare(req.body.password, user[0].password, function (err, result) {
            if (result) {

                const tokenSignature = {
                                    'userDetails':{
                                        'firstName':user[0].username,
                                        'lastName':user[0].username,
                                        'userName':user[0].username,
                                        'email':user[0].username,
                                    },
                                    'authorizationDetails':{
                                            'routes': ['resturantList', 'addResturant','addFilters'] 
                                    }
                }
                const token = jwt.sign(tokenSignature, 'secret');
                console.log(token)
                result = {
                    'status': 200,
                    'data': {
                        'token': token
                    },

                }
                res.send({ ...result })
            } else {
                result = {
                    'status': 401,
                    'data': 'Passwword mismatch'
                }
                res.send({ ...result })
            }
        });

    } else {
        /*result = {
            'status':401,
            'data': 'No user found'
        }*/

        result = {
            "status": 200,
            "data": {
                'token': '111111'
            },
        }
        res.send({ ...result })
    }
});

app.post('/addFoods', async (req, res) => {
    let result = '';
    const schema = {
        'name': {
            prop: 'name',
            type: String
        },
        'cuisine': {
            prop: 'cuisine',
            type: Array
        },
        'cost': {
            prop: 'cost',
            type: Number
        },
        'index': {
            prop: 'index',
            type: Number
        },
        'description': {
            prop: 'index',
            type: Number
        },
        'overview': {
            prop: 'index',
            type: Number
        }
    }
    xlsxFile('./foods.xlsx', { schema }).then((rows) => {
        //const result = await db.collection('food').insertOne({...rows}])
        result = db.collection('food').insertMany([...rows.rows])
        //rows.e(element => {
        // console.log(element)
        //const result = db.collection('food').insertOne({...element})
        //console.table(result);
        // });
        //const result = db.collection('food').insertMany([...rows])
        //console.table(rows);
    })

    //const result1 = ''//await db.collection('food').insertMany([{...req.body},{...req.body},{...req.body}])
    res.send({
        'status': 200,
        'message': 'Food item addded successfully',
        'resultWeGot': result
    })
});

app.delete('/deleteFood', async (req, res) => {
    const mongoObjectToDelete = mongodb.ObjectId(req.body.deleteId);
    const foodCollection = db.collection('food');
    const result = await foodCollection.deleteOne({ _id: mongoObjectToDelete })
    if (result.acknowledged && result.deletedCount == 1) {
        res.send({
            'status': 200,
            'message': 'Food item deleted successfully'
        });
    } else {
        res.send({
            'status': 500,
            'message': 'DELETE OPERATION FAILED'
        });
    }
});

app.delete('/deleteAllFood', async (req, res) => {
    const foodCollection = db.collection('food');
    const result = await foodCollection.deleteMany({})
    if (result.acknowledged) {
        res.send({
            'status': 200,
            'message': 'All Food item deleted successfully',
            'result': result
        });
    } else {
        res.send({
            'status': 500,
            'message': 'MULTIPLE DELETE OPERATION FAILED',
            'result': result
        });
    }

});

app.put('/updateFood', async (req, res) => {

    const mongoObjectToUpdate = mongodb.ObjectId(req.body._id);
    console.error(req.body);
    // What to update with
    const foodCollection = db.collection('food');

    let updatedObject = {
        'name': req.body.name,
    }

    // If new value comes take it ... else please dont give the key itself such that i can keep the old values

    // add if item is [greater than 5 and less than 10]


    if (req.body.cuisine) {
        updatedObject = { ...updatedObject, 'cuisine': req.body.cuisine }
    }

    if (req.body.cost) {
        updatedObject = { ...updatedObject, 'cost': req.body.cost }
    }

    const result = await foodCollection.updateOne(
        { _id: mongoObjectToUpdate },
        {
            $set: updatedObject
        }
    );

    if (result.acknowledged && result.modifiedCount == 1) {
        res.send({
            'status': 200,
            'message': 'Food item modified successfully'
        });
    } else {
        res.send({
            'status': 500,
            'message': 'Modification operation failed'
        });
    }
});

// CALL A SERVER AND LISTEN
app.listen(PORT, function (err) {
    if (err) console.error(err)
    console.log("Server is running in port", PORT)
});