import time
from data_extract import weather

orion_url = 'http://fiware-orion:1026/v2/entities'

# Dados climáticos
api_key = "a75df0516b276633891042d2858ae8b1"
lon, lat = -35.21, -5.79
id_weather = 'urn:ngsi-ld:Entity:clima'

while True:

    try:

        print("Atualizando entidades.", flush=True)

        weather(lat, lon, api_key, orion_url, id_weather)

        time.sleep(60 * 5)
    
    except:

        time.sleep(10)