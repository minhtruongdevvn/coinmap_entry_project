import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
    includes?: string[],
  ): Promise<T | null> {
    const query = this.entityModel.findOne(entityFilterQuery, {
      __v: 0,
      ...projection,
    });

    return populate(query, includes).exec();
  }

  find(
    entityFilterQuery?: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T[] | null> {
    return this.entityModel
      .find(entityFilterQuery, {
        __v: 0,
        ...projection,
      })
      .exec();
  }

  create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOneAndUpdate(entityFilterQuery, updateEntityData, {
        new: true,
      })
      .exec();
  }

  async findOneAndDelete(entityFilterQuery: FilterQuery<T>): Promise<void> {
    await this.entityModel.findOneAndDelete(entityFilterQuery);
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel
      .deleteMany(entityFilterQuery)
      .exec();

    return deleteResult.deletedCount >= 1;
  }

  aggregate<T>() {
    return this.entityModel.aggregate<T>();
  }
}

const populate = (query: any, includes?: string[]) => {
  if (Array.isArray(includes)) {
    for (const include of includes) {
      query = query.populate(include, { __v: 0 });
    }
  }

  return query;
};
