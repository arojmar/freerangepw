import { test, expect } from '@playwright/test';

const REPO = 'freerangepw';
const USER = 'arojmar';

test('Se puede crear un Issue en el repositorio de Github', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: 'Issue creado desde Playwright Example para FreeRangePW',
            body: 'Este issue fue creado para mostrar ejemplo de como testear API desde Playwright',
        },
    });
    // expect(newIssue.ok()).toBeTruthy();
    expect(newIssue.status()).toBe(201);

    const issue = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issue.status()).toBe(200);
    expect( await issue.json()).toContainEqual(expect.objectContaining({
        title: 'Issue creado desde Playwright Example para FreeRangePW',
        body: 'Este issue fue creado para mostrar ejemplo de como testear API desde Playwright',
    }));
})
