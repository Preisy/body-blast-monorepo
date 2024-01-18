import { Static } from '../static/Static';

export enum UserRole {
  Client = 'client',
  Influencer = 'influencer',
  Admin = 'admin',
}

export enum CustomCronExpression {
  VERY_THREE_DAYS_AT_1PM = '0 13 */3 * *',
  EVERY_WEEK_AT_1PM = '0 13 */7 * *',
  EVERY_TEN_DAYS_AT_1PM = '0 13 */10 * *',
  EVERY_TWO_WEEKS_AT_1PM = '0 13 */14 * *',
}

export class Constants {
  public static UserRoleList = new Static(UserRole.Client, UserRole.Influencer, UserRole.Admin);
}
