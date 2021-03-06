import mongo from 'mongodb'
const { ObjectID } = mongo

export default async (_, args, ctx) => {
  await ctx.user.ensureDataScientist(ctx)
  const { Databooks } = await ctx.mongo.collections

  const { id, ...otherArgs } = args
  const $set = { ...otherArgs, modifiedAt: new Date() }

  const response = await Databooks.findOneAndUpdate(
    { _id: ObjectID(id) },
    {
      $set,
    },
    {
      returnOriginal: false,
      upsert: false,
    }
  )

  return response.value
}
