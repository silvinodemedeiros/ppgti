import requests
import json

from datetime import datetime, timezone

def weather(lat, lon, api_key, orion_url, entity_id):

    # Obter dados da API do OpenWeatherMap
    weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}"
    response = requests.get(weather_url)

    if response.status_code == 200:
        dados = response.json()

        # Prepara os atributos para atualização no Orion
        updated_attributes = {
            "coord": {
                "type": "geo:json",
                "value": {
                    "type": "Point",
                    "coordinates": [dados["coord"]["lon"], dados["coord"]["lat"]]
                }
            },
            "weather": {"type": "Text", "value": dados["weather"][0]["main"]},
            "description": {"type": "Text", "value": dados["weather"][0]["description"]},
            "icon": {"type": "Text", "value": dados["weather"][0]["icon"]},
            "temperature": {"type": "Number", "value": dados["main"]["temp"]},
            "feels_like": {"type": "Number", "value": dados["main"]["feels_like"]},
            "temp_min": {"type": "Number", "value": dados["main"]["temp_min"]},
            "temp_max": {"type": "Number", "value": dados["main"]["temp_max"]},
            "pressure": {"type": "Number", "value": dados["main"]["pressure"]},
            "humidity": {"type": "Number", "value": dados["main"]["humidity"]},
            "sea_level": {"type": "Number", "value": dados["main"].get("sea_level", None)},
            "grnd_level": {"type": "Number", "value": dados["main"].get("grnd_level", None)},
            "visibility": {"type": "Number", "value": dados.get("visibility", None)},
            "windSpeed": {"type": "Number", "value": dados["wind"]["speed"]},
            "windDirection": {"type": "Number", "value": dados["wind"]["deg"]},
            "cloudiness": {"type": "Number", "value": dados["clouds"]["all"]},
            "timestamp": {"type": "DateTime", "value": datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')},
            "sunrise": {"type": "DateTime", "value": datetime.fromtimestamp(dados["sys"]["sunrise"], tz=timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')},
            "sunset": {"type": "DateTime", "value": datetime.fromtimestamp(dados["sys"]["sunset"], tz=timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')},
            "country": {"type": "Text", "value": dados["sys"]["country"]},
            "city": {"type": "Text", "value": dados["name"]}
        }

        # URL para atualizar os atributos da entidade
        update_url = f"{orion_url}/{entity_id}/attrs"

        # Enviar atualização para o Orion
        headers = {"Content-Type": "application/json"}
        response_orion = requests.patch(update_url, data=json.dumps(updated_attributes), headers=headers)

        if response_orion.status_code in [204]:
            print(f"Entidade atualizada com sucesso: {entity_id}", flush=True)

        else:
            print("Erro ao atualizar no Orion:", response_orion.status_code, response_orion.text, flush=True)

    else:
        print("Erro ao obter dados da API:", response.status_code, flush=True)