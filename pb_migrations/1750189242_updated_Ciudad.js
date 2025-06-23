/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3191438822")

  // update collection data
  unmarshal({
    "name": "ciudad"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3191438822")

  // update collection data
  unmarshal({
    "name": "Ciudad"
  }, collection)

  return app.save(collection)
})
