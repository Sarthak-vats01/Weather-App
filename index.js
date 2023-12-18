import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index1.ejs");
});

app.post("/weather", async (req, res) => {
  const cityName = req.body.city;
  try {
    const result = await axios.get(API_URL, {
      params: {
        city: cityName,
      },
      headers: {
        "X-RapidAPI-Key": "6299a3fe9cmshf08790fca46b3c2p1ba2e3jsn280f32ba476c",
        "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
      },
    });
    const response = result.data;
    const sunriseTime = new Date(response.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(response.sunset * 1000).toLocaleTimeString();

    res.render("index2.ejs", {
      content: response,
      city: cityName,
      sunrise: sunriseTime,
      sunset: sunsetTime,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});
