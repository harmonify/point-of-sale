import * as bcrypt from 'bcryptjs';

export class HashUtil {
  private static SALT_ROUNDS = process.env.SALT_ROUNDS || 11;

  /**
   * Hash plain string
   * @returns Returns hashed
   */
  static async hash(str: string): Promise<string> {
    return await bcrypt.hash(str, this.SALT_ROUNDS);
  }

  /**
   * Hash plain string synchronously
   * @returns Returns hashed
   */
  static hashSync(str: string): string {
    return bcrypt.hashSync(str, this.SALT_ROUNDS);
  }

  /**
   * Compares hashed and provided string
   * @returns Returns true if the provided string and hashed string are equal
   */
  static async compare(plain: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(plain, hashed);
  }
}
