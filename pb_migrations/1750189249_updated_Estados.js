/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2093311838")

  // update collection data
  unmarshal({
    "name": "estados"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2093311838")

  // update collection data
  unmarshal({
    "name": "Estados"
  }, collection)

  return app.save(collection)
})
