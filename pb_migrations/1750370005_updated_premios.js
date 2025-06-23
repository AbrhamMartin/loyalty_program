/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1380756695")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number494360628",
    "max": null,
    "min": null,
    "name": "value",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1380756695")

  // remove field
  collection.fields.removeById("number494360628")

  return app.save(collection)
})
