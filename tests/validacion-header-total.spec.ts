import { test, Browser, Page, expect } from "@playwright/test";

(async () => {
    let browser: Browser;
    let page: Page;

    test.describe('Navegacion en www.freerangetesters.com', () => {

        const secciones = [
            { nombre: 'Cursos', url: '/cursos', tituloEsperado: 'Cursos' },
            { nombre: 'Udemy', url: '/udemy', tituloEsperado: 'Udemy'},
            { nombre: 'Recursos', url: '/recursos', tituloEsperado: 'Recursos'},
            { nombre: 'Acceder', url: '/login', tituloEsperado: 'Acceder a Free Range Testers'}
        ];
        for (const seccion of secciones) {
            test(`Validar la redireccion a la seccion "${seccion.nombre}"`, async ({ page }) => {
                await test.step('Estando yo en la web principal www.freerangetesters.com', async () => {
                    page.goto('https://www.freerangetesters.com');
                    await expect(page).toHaveTitle("Free Range Testers");
                })
                await test.step(`Cuando hago click en "${seccion.nombre}"`, async () => {
                    page.locator('#page_header').getByRole('link', { name: seccion.nombre, exact: true }).click();
                    await page.waitForURL(`**${seccion.url}`);
                })
                await test.step(`Soy redirigido a la seccion de titulo ${seccion.tituloEsperado}`, async () => {
                    await expect(page).toHaveTitle(seccion.tituloEsperado); 
                })
                
            })
        }
        
    })
})();
    