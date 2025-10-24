import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
    test('API POST REQUEST test', async ({ request }) => {
        try {
            // Log the request we're about to make
            const requestData = {
                title: 'foo',
                body: 'bar',
                userId: 1
            };
            console.log('\n=== Request Details ===');
            console.log('URL:', 'https://jsonplaceholder.typicode.com/posts');
            console.log('Method:', 'POST');
            console.log('Request Data:', JSON.stringify(requestData, null, 2));
            
            // Make the POST request using Playwright's format
            const response = await request.post('/posts', {
                data: requestData
            });
            
            // Log response details for debugging
            const responseText = await response.text();
            console.log('Response Text:', responseText);
            
            // We should get a 201 (Created)
            expect(response.status()).toBe(201);

            // Parse and check the response
            const responseBody = JSON.parse(responseText);
            // Check the response data
            expect(responseBody).toHaveProperty('title', 'foo');
            expect(responseBody).toHaveProperty('body', 'bar');
            expect(responseBody).toHaveProperty('userId', 1);
            expect(responseBody).toHaveProperty('id');
            expect(responseBody).toHaveProperty('phone');
            
            // Log detailed response information
            console.log('\n=== Response Details ===');
            console.log('Status Code:', response.status());
            console.log('Status Text:', response.statusText());
            console.log('\nResponse Headers:');
            const headers = response.headers();
            Object.entries(headers).forEach(([key, value]) => {
                console.log(`${key}: ${value}`);
            });
            console.log('\nResponse Body:');
            console.log(JSON.stringify(responseBody, null, 2));

        } catch (error) {
            console.error('API Test Failed:', error);
            throw error;
        }
    });

    test('API GET REQUEST test', async ({ request }) => {
        try {
            // Make the GET request
            const response = await request.get('/posts/1');  // Using JSONPlaceholder as an example public API
            
            // Status code assertion
            expect(response.status()).toBe(200);
            
            // Response headers validation
            expect(response.headers()['content-type']).toContain('application/json');
            
            // Parse response body
            const responseBody = await response.json();
            console.log(responseBody);
            
            // Data structure validation
            expect(responseBody).toHaveProperty('userId');
            expect(responseBody).toHaveProperty('id');
            expect(responseBody).toHaveProperty('title');
            expect(responseBody).toHaveProperty('body');
            //expect(responseBody).toHaveProperty('boxdy');
            
            // Optional: Specific data validation
            expect(typeof responseBody.id).toBe('number');
            expect(typeof responseBody.userId).toBe('number');
            expect(typeof responseBody.title).toBe('string');
            expect(typeof responseBody.body).toBe('string');
            //expect(typeof responseBody.data.phone).toBe('number');
            
        } catch (error) {
            console.error('API Test Failed:', error);
            throw error;
        }
    });
});

