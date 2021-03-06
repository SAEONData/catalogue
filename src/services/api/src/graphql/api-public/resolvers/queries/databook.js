import mongodb from 'mongodb'
const { ObjectID } = mongodb

export default async (self, args, ctx) => {
  await ctx.user.ensureDataScientist(ctx)

  const { id } = args
  const { Databooks } = await ctx.mongo.collections
  return await Databooks.findOne({ _id: ObjectID(id) })
}
