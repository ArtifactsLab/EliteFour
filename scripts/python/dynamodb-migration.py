import boto3
import csv
import json

ONLINE = True
VERBOSE = False
BATCH_LIMIT = 3
BATCH_SIZE = 25

def build_put_pokemon(pokemon):
    return {
        'PutRequest': {
            'Item': {
                'name': {
                    'S': pokemon['name']
                },
                'height': {
                    'S': pokemon['height']
                },
                'weight': {
                    'S': pokemon['weight']
                },
                'attack': {
                    'S': pokemon['attack']
                },
                'defense': {
                    'S': pokemon['defense']
                },
                'hp': {
                    'S': pokemon['hp']
                },
                'special-attack': {
                    'S': pokemon['special-attack']
                },
                'special-defense': {
                    'S': pokemon['special-defense']
                },
                'speed': {
                    'S': pokemon['speed']
                }
            }
        }
    }

def write_batch(client, table, items, batch):
    print "batch {0} size {1}".format(batch, len(items))
    request_items = {}
    request_items[table] = items
    if ONLINE is True:
        client.batch_write_item(RequestItems = request_items)
    if VERBOSE is True:
        print(request_items)

def upload(client, table, csv_location, parse):
    items = []
    batch = 1
    count = 0

    with open(csv_location) as csv_file:
        reader = csv.DictReader(csv_file)
        for row in reader:
            item = parse(row)
            items.append(item)
            count += 1

            if count % BATCH_SIZE == 0:
                write_batch(client, table, items, batch)
                batch += 1

                if batch == BATCH_LIMIT:
                    break

                items = []

    write_batch(client, table, items, batch)

def run():

    with open('../../access/aws-sdk_config.json') as access_file:
        access_data = json.load(access_file)

    client = boto3.client(
        'dynamodb',
        region_name = access_data['region'],
        aws_access_key_id = access_data['accessKeyId'],
        aws_secret_access_key = access_data['secretAccessKey']
    )

    upload(client, 'EliteFour-Pokemon', '../../data/clean/pokemon_clean.csv', build_put_pokemon)

run()
