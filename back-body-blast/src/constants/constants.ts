import { Static } from '../static/Static';

export enum UserRole {
  Client = 'client',
  Influencer = 'influencer',
  Admin = 'admin',
}

export enum PeriodTime {
  weekTime = 7 * 24 * 60 * 60 * 1000,
  dayTime = 24 * 60 * 60 * 1000,
}

export class Constants {
  public static UserRoleList = new Static(UserRole.Client, UserRole.Influencer, UserRole.Admin);
}

export enum Action {
  All = 'manage',
  Create = 'create',
  Read = 'read',
  ReadAll = 'read all',
  Update = 'update',
  Delete = 'delete',
}
