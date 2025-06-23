/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // remove field
  collection.fields.removeById("relation643686883")

  // remove field
  collection.fields.removeById("relation2391147934")

  // add field
  collection.fields.addAt(13, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text643686883",
    "max": 0,
    "min": 0,
    "name": "estado",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(14, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2391147934",
    "max": 0,
    "min": 0,
    "name": "ciudad",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // add field
  collection.fields.addAt(11, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2093311838",
    "hidden": false,
    "id": "relation643686883",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "estado",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3191438822",
    "hidden": false,
    "id": "relation2391147934",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "ciudad",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("text643686883")

  // remove field
  collection.fields.removeById("text2391147934")

  return app.save(collection)
})
