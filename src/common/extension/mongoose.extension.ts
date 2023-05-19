import { Aggregate } from 'mongoose';
import { UserSummary } from '../dto';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ResultType<T> = T extends Aggregate<infer U> ? U : never; // query type of U

declare module 'mongoose' {
  interface Aggregate<ResultType> {
    processSummaryData(this: Aggregate<UserSummary[]>): Aggregate<ResultType>;
  }
}

Aggregate.prototype.processSummaryData = function (
  this: Aggregate<UserSummary[]>,
) {
  return this.lookup({
    from: 'User',
    localField: 'owner',
    foreignField: '_id',
    as: 'owner',
  })
    .group({
      _id: '$owner._id', // group by owner id
      owner: { $first: '$owner' },
      totalPoint: { $sum: '$point' },
      completed: { $sum: 1 },
    })
    .project({
      _id: 0,
      'owner.email': 0,
      'owner.createdAt': 0,
      'owner.__v': 0,
    });
};
