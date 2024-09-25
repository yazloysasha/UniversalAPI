import { Types } from "mongoose";

/**
 * Получить Mongoose ID из string
 */
export const OID = (_id: string): Types.ObjectId => {
  return new Types.ObjectId(_id);
};

/**
 * Сравнение Mongoose ID
 */
export const compareID = (
  _id1: Types.ObjectId | string,
  _id2: Types.ObjectId | string
): boolean => {
  return String(_id1) === String(_id2);
};
