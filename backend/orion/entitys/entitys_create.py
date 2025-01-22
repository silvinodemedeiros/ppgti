from entitys_functions import create_entitys

# Criando entidade de clima

id_weather = 'urn:ngsi-ld:Entity:clima'

data_weather = {
  "id": id_weather,
  "type": "WeatherObservation",
  "coord": {
    "type": "geo:json",
    "value": {
      "type": "Point",
      "coordinates": [0, 0]
    }
  },
  "weather": {
    "type": "Text",
    "value": "Clouds"
  },
  "description": {
    "type": "Text",
    "value": "scattered clouds"
  },
  "icon": {
    "type": "Text",
    "value": "03d"
  },
  "temperature": {
    "type": "Number",
    "value": 0
  },
  "feels_like": {
    "type": "Number",
    "value": 0
  },
  "temp_min": {
    "type": "Number",
    "value": 0
  },
  "temp_max": {
    "type": "Number",
    "value": 0
  },
  "pressure": {
    "type": "Number",
    "value": 0
  },
  "humidity": {
    "type": "Number",
    "value": 0
  },
  "sea_level": {
    "type": "Number",
    "value": 0
  },
  "grnd_level": {
    "type": "Number",
    "value": 0
  },
  "visibility": {
    "type": "Number",
    "value": 0
  },
  "windSpeed": {
    "type": "Number",
    "value": 0
  },
  "windDirection": {
    "type": "Number",
    "value": 0
  },
  "cloudiness": {
    "type": "Number",
    "value": 0
  },
  "timestamp": {
    "type": "DateTime",
    "value": "2024-11-26T14:35:09Z"
  },
  "sunrise": {
    "type": "DateTime",
    "value": "2024-11-26T05:29:17Z"
  },
  "sunset": {
    "type": "DateTime",
    "value": "2024-11-26T18:41:00Z"
  },
  "country": {
    "type": "Text",
    "value": "BR"
  },
  "city": {
    "type": "Text",
    "value": "Natal"
  }
}

create_entitys(id_weather, data_weather)