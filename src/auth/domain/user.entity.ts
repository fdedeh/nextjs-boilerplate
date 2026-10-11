import { Entity } from "@/core/domain/base/entity";

export type TUser = {
  username: string;
};

export class User extends Entity<TUser> {
  get username(): string {
    return this.data.username;
  }
}
