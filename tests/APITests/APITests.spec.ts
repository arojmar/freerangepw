import { test, expect } from '@playwright/test';

const REPO = 'repo-para-pruebas-2';
const USER = 'arojmar';

test.beforeAll(async ({ request }) => {
    const response = await request.post(`user/repos`, {
        data: {
            name: REPO,
            description: 'Repositorio para pruebas de Playwright',
        },
    });
    expect(response.status()).toBe(201);
})


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

test('Puedo crear un request de una nueva feature', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: 'Request de features',
            body: 'Quiero crear un request para una nueva feature',
        },
    });
    expect(newIssue.status()).toBe(201);

    const issue = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issue.status()).toBe(200);
    expect( await issue.json()).toContainEqual(expect.objectContaining({
        title: 'Request de features',
        body: 'Quiero crear un request para una nueva feature',
    }));    
});

test.afterAll(async ({ request }) => {
    const response = await request.delete(`/repos/${USER}/${REPO}`);
    expect(response.status()).toBe(204);
})

