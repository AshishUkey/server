import bcrypt from "bcrypt";
import express from "express";
import xlsxFile from "read-excel-file/node";
import jwt from "jsonwebtoken";

//var privateKey = fs.readFileSync('private.key');
var privateKey = "0000";
const saltRounds = 10;

//just not to do spelling mistakes
const timings = {
  BRF: "BRF",
  LCH: "LCH",
  DNR: "DNR",
  NGT: "NGT",
  SKS: "SKS",
  DRK: "DRK",
};

const cuisine = {
  NI: "NI",
  SI: "SI",
};

const locationCodes = {
  BLR: "BLR",
  MUM: "MUM",
  CHN: "CHN",
  AP: "AP",
};

const restuarants = [
  {
    name: "Barbeque Nation",
    code: "BNQ",
    location_codes: [locationCodes.BLR, locationCodes.CHN],
    timing_codes: [timings.DNR, timings.LCH, timings.BRF],
    cuisine: [cuisine.NI, cuisine.SI],
    cost: 550,
    overview: "Gives dnr,lnc,brf in blr and chn",
    images: ["/images/breakfast-detail.png", "/images/breakfast-detail.png"],
    address: "#32 Koramangala stree blr",
  },
  {
    name: "Cafe Masala",
    code: "CM",
    location_codes: [locationCodes.MUM, locationCodes.AP],
    timing_codes: [timings.BRF],
    cuisine: [cuisine.SI],
    cost: 1500,
    overview: "Gives brf in mum and ap",
    images: ["/images/breakfast-detail.png"],
    address: "#32 Koramangala stree blr",
  },
  {
    name: " Ragreza",
    code: "RZ",
    location_codes: [locationCodes.MUM, locationCodes.AP],
    timing_codes: [timings.DNR],
    cuisine: [cuisine.NI],
    cost: 900,
    overview: "Dnr in mum , ap",
    images: ["/images/breakfast-detail.png"],
    address: "#32 Koramangala stree blr",
  },
];

const quickResturantFilters = [
  {
    timing: "Breakfast",
    code: timings.BRF,
    image: "/images/breakfast.png",
    description: "Start Your day with exclusive breakfast options",
  },
  {
    timing: "Lunch",
    code: timings.LCH,
    image: "/images/lunch.png",
    description: "Start Your day with exclusive breakfast options",
  },
  {
    timing: "Dinner",
    code: timings.DNR,
    image: "/images/dinner.png",
    description: "Start Your day with exclusive breakfast options",
  },
  {
    timing: "Snacks",
    code: timings.SKS,
    image: "/images/snacks.png",
    description: "Start Your day with exclusive breakfast options",
  },
  {
    timing: "Night",
    code: timings.NGT,
    image: "/images/night.png",
    description: "Start Your day with exclusive breakfast options",
  },
  {
    timing: "Drinks",
    code: timings.DRK,
    image: "/images/drink.png",
    description: "Start Your day with exclusive breakfast options",
  },
];

const app = express();
const PORT = 9191;

app.use(express.json());
app.use(express.urlencoded());

function getHeaderFromToken(token) {
  const decodedToken = jwt.decode(token, {
    complete: true,
  });

  if (!decodedToken) {
    throw new Parse.Error(
      Parse.Error.OBJECT_NOT_FOUND,
      `provided token does not decode as JWT`
    );
  }

  return decodedToken;
}

app.get("/getFood", async (req, res) => {
  res.send({
    status: 200,
    data: [],
  });
});

app.get("/getQuickResurantFilters", async (req, res) => {
  try {
    res.send({
      status: 200,
      data: quickResturantFilters,
    });
  } catch (e) {
    res.send({
      status: 200,
      data: quickResturantFilters,
    });
  }
});

app.get("/getLocations", async (req, res) => {
  const locations = [
    {
      name: "Bangalore",
      code: locationCodes.BLR,
    },
    {
      name: "Chennai",
      code: locationCodes.CHN,
    },
    {
      name: "Andra",
      code: locationCodes.AP,
    },
    {
      name: "Mumbai",
      code: locationCodes.MUM,
    },
  ];
  try {
    res.send({
      status: 200,
      data: locations,
    });
  } catch (e) {
    res.send({
      status: 200,
      data: locations,
    });
  }
});

app.get("/getResturants", async (req, res) => {
  const location_code = req.query?.location_code;
  const timing_code = req.query?.timing_codes;
  const selectedCuisine = req.query?.selectedCuisine;
  let costFilter = req.query?.selectedCostRange;

  let filters = {};
  if (location_code) {
    filters["location_codes"] = location_code.join(",");
  }
  if (timing_code) {
    filters["timing_codes"] = timing_code.join(",");
  }
  if (selectedCuisine) {
    filters["cuisine"] = selectedCuisine.join(",");
  }
  console.log(filters);

  let filtered_restuarants = [];

  filtered_restuarants = restuarants.filter((resturant) => {
    return Object.keys(filters).every((filter) => {
      // return resturant[filter].includes(filters[filter])
      return resturant[filter].some((item, index) =>
        satisfyCallBack(item, index, filters[filter])
      );
    });
  });

  // cost filters
  if (costFilter) {
    console.log(costFilter);
    costFilter = JSON.parse(costFilter);
    filtered_restuarants = filtered_restuarants.filter((item) => {
      console.log(costFilter.from);
      return item.cost >= costFilter.from && item.cost <= costFilter.to;
    });
  }

  try {
    res.send({
      status: 200,
      data: filtered_restuarants,
    });
  } catch (e) {
    console.error(e);
    res.send({
      status: 200,
      data: filtered_restuarants,
    });
  }
});

function satisfyCallBack(resturantItem, index, filterItem) {
  let flag = false;
  const splitArray = filterItem.split(",");
  splitArray.forEach((element) => {
    flag = flag || element == resturantItem;
  });
  return flag;
}

app.get("/getResturantDetails", async (req, res) => {
  const resturantCode = req.query.code;

  const resrurantDetails = restuarants.find((item) => {
    return item.code == resturantCode;
  });
  try {
    res.send({
      status: 200,
      data: resrurantDetails,
    });
  } catch (e) {
    res.send({
      status: 200,
      data: resrurantDetails,
    });
  }
});

app.get("/filterFood", async (req, res) => {
  const foods = await db
    .collection("food")
    .find({ cuisine: "breakfast", cost: "200" })
    .toArray();
  res.send({
    status: 200,
    data: foods,
  });
});

app.post("/login", async (req, res) => {
  let result;
  // const user = await db.collection('user').find({ 'username': req.body.username }).limit(1).toArray();
  // console.log(user)
  const user = [
    {
      _id: "631dede020350397f424bbde",
      username: "sushma@gmail.com",
      password: "$2b$10$FU/Oh7C/GG6qakX38lNMJuM8nxh6Hxsb3syDs8WaRCWKHsBsz7bIK",
      role: "admin",
    },
  ];
  if (user.length) {
    bcrypt.compare(req.body.password, user[0].password, function (err, result) {
      if (result) {
        const tokenSignature = {
          userDetails: {
            firstName: user[0].username,
            lastName: user[0].username,
            userName: user[0].username,
            email: user[0].username,
          },
          authorizationDetails: {
            routes: ["resturantList", "addResturant", "addFilters"],
          },
        };
        const token = jwt.sign(tokenSignature, "secret");
        console.log(token);
        result = {
          status: 200,
          data: {
            token: token,
          },
        };
        res.send({ ...result });
      } else {
        result = {
          status: 401,
          data: "Passwword mismatch",
        };
        res.send({ ...result });
      }
    });
  } else {
    /*result = {
            'status':401,
            'data': 'No user found'
        }*/

    result = {
      status: 200,
      data: {
        token: "111111",
      },
    };
    res.send({ ...result });
  }
});

// CALL A SERVER AND LISTEN
app.listen(PORT, function (err) {
  if (err) console.error(err);
  console.log("Server is running in port", PORT);
});
