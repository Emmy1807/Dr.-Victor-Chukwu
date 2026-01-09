import bcrypt from "bcryptjs";

/**
 * Hash a password using bcrypt
 * @param password - The plain text password to hash
 * @returns Promise<string> - The hashed password
 */
export async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

/**
 * Verify a password against its hash
 * @param password - The plain text password to verify
 * @param hash - The hashed password to compare against
 * @returns Promise<boolean> - True if password matches, false otherwise
 */
export async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}
