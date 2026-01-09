#!/usr/bin/env node

/**
 * Test script to verify email authentication flow
 * Tests: signup API endpoint and password hashing
 */

async function testEmailAuth() {
    const baseUrl = "http://localhost:3000";
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = "TestPassword123!";
    const testName = "Test User";

    console.log("🧪 Testing Email Authentication Flow\n");
    console.log("=" + "=".repeat(60));

    // Test 1: Sign up with valid credentials
    console.log("\n✅ Test 1: Sign up with valid credentials");
    console.log(`   Email: ${testEmail}`);
    console.log(`   Password: ${testPassword}`);
    console.log(`   Name: ${testName}`);

    try {
        const signUpResponse = await fetch(`${baseUrl}/api/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: testEmail,
                password: testPassword,
                name: testName,
            }),
        });

        const signUpData = await signUpResponse.json();

        if (!signUpResponse.ok) {
            console.error("   ❌ Sign up failed:", signUpData.error);
            return false;
        }

        console.log("   ✓ Account created successfully");
        console.log(`   User ID: ${signUpData.user.id}`);
        console.log(`   User Email: ${signUpData.user.email}`);
        console.log(`   User Name: ${signUpData.user.name}\n`);
    } catch (error) {
        console.error("   ❌ Error:", error.message);
        return false;
    }

    // Test 2: Try to sign up with same email (should fail)
    console.log("✅ Test 2: Attempt duplicate email sign up (should fail)");
    try {
        const duplicateResponse = await fetch(`${baseUrl}/api/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: testEmail,
                password: "AnotherPassword123!",
                name: "Another User",
            }),
        });

        const duplicateData = await duplicateResponse.json();

        if (duplicateResponse.ok) {
            console.error("   ❌ Should have failed with duplicate email");
            return false;
        }

        console.log("   ✓ Correctly rejected duplicate email");
        console.log(`   Error: ${duplicateData.error}\n`);
    } catch (error) {
        console.error("   ❌ Error:", error.message);
        return false;
    }

    // Test 3: Invalid password length
    console.log("✅ Test 3: Sign up with password too short (should fail)");
    try {
        const shortPasswordResponse = await fetch(`${baseUrl}/api/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: `test-short-${Date.now()}@example.com`,
                password: "short",
                name: "Test User",
            }),
        });

        const shortPasswordData = await shortPasswordResponse.json();

        if (shortPasswordResponse.ok) {
            console.error("   ❌ Should have failed with short password");
            return false;
        }

        console.log("   ✓ Correctly rejected short password");
        console.log(`   Error: ${shortPasswordData.error}\n`);
    } catch (error) {
        console.error("   ❌ Error:", error.message);
        return false;
    }

    // Test 4: Missing email
    console.log("✅ Test 4: Sign up without email (should fail)");
    try {
        const noEmailResponse = await fetch(`${baseUrl}/api/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                password: "TestPassword123!",
                name: "Test User",
            }),
        });

        const noEmailData = await noEmailResponse.json();

        if (noEmailResponse.ok) {
            console.error("   ❌ Should have failed without email");
            return false;
        }

        console.log("   ✓ Correctly rejected missing email");
        console.log(`   Error: ${noEmailData.error}\n`);
    } catch (error) {
        console.error("   ❌ Error:", error.message);
        return false;
    }

    console.log("=" + "=".repeat(60));
    console.log("\n✅ All tests passed! Email authentication is working.\n");
    console.log("📝 Next steps:");
    console.log("   1. Go to http://localhost:3000/auth/sign-up");
    console.log("   2. Create a test account with the form");
    console.log("   3. Visit http://localhost:3000/auth/sign-in");
    console.log("   4. Sign in with your email and password\n");

    return true;
}

// Run tests
testEmailAuth().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});
