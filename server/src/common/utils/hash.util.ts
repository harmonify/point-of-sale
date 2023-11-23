import * as bcrypt from 'bcryptjs';

export class HashUtil {
  private static SALT_ROUNDS = 10;

  /**
   * Encrypts plain string
   * @param str {string}
   * @returns Promise<string> Returns encrypted
   */
  static async encrypt(str: string): Promise<string> {
    return await bcrypt.hash(str, this.SALT_ROUNDS);
  }

  /**
   * Compares encrypted and provided string
   * @param plain {string}
   * @param encrypted {string}
   * @returns Promise<boolean> Returns Boolean if provided string and encrypted string are equal
   */
  static async compare(plain: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(plain, encrypted);
  }
}
