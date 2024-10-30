import { test, expect } from '@playwright/test';

const REPO = 'freerangepw';
const USER = 'arojmar';

let apiContext: any;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
            'Accept' : 'application/vnd.github.v3+json',
            'Authorization': `token ${process.env.PW_EXAMPLE_TOKEN}`,
        },
    });
});

test.afterAll(async ({  }) => {
    await apiContext.dispose();
})

test('El ultimo issue creado es el primero en la lista', async ({ page }) => {
    const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
        data : {
            title : '[Feature] Feature nueva',
        },
    });
    expect(newIssue.status()).toBe(201);

    await page.goto(`https://github.com/${USER}/${REPO}/issues`);
    const firstIssue = page.locator(`a[data-hovercard-type='issue']`).first();
    await expect(firstIssue).toHaveText('[Feature] Feature nueva');
})


