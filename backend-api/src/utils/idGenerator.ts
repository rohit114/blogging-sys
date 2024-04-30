import { v4 as uuidv4 } from 'uuid';
const moment = require('moment-timezone');

export class IdGeneratorUtil {
  static userId() {
    return `USR${this.getUUIDv4()}`.toUpperCase();
  }

  static postId() {
    return `PO${this.getUUIDv4()}`.toUpperCase();
  }

  private static getUUIDv4() {
    let uuid: string = uuidv4().substring(0, 12);
    return uuid.replace('-', '');
  }
}
