import { test, Browser, Page, expect} from '@playwright/test';

(async () => {
    let Browser: Browser;
    let Page: Page;
    let textoAEscribir = 'Estyo aprendiendo Playwright';

    test.describe('Acciones en el Automation Sandbox', () => {

        test('Click en el ID dinamico', async ({ page }) => {
            await test.step('Dado que navego al sandbox de Automation de Free range testers', async () => {
                await page.goto('');
            })
            
            await test.step('Puedo hacer clic en el boton ID dinamico', async () => {
                const botonIDDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto' });
                await botonIDDinamico.click();
                await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();
                // await botonIDDinamico.dblclick();
                // await botonIDDinamico.click( { force: true });
                // await botonIDDinamico.click( { button: 'right' });
                // await botonIDDinamico.click( { modifiers: ['Shift'] });
                // await botonIDDinamico.hover();
            })
            
        })

        test('Lleno un campo de texto en Automation @Sandbox', async ({ page, browserName }) => {
            test.skip(browserName === 'webkit', 'No se puede ejecutar en Webkit');
            await test.step('Dado que navego al sandbox de Automation de Free range testers', async () => {
                await page.goto('');
            })
            await test.step('Puedo ingresar texto en en el campo un Aburrido texto', async () => {
                await expect(page.getByPlaceholder('Ingresá texto'), 'El campo de texto no admite edicion').toBeEditable();
                await page.getByPlaceholder('Ingresá texto').fill(textoAEscribir);
                await expect(page.getByPlaceholder('Ingresá texto'), 'El texto tiene un valor distinto al introducido').toHaveValue(textoAEscribir);
            })
            await test.step('Puedo seleccionar el checkbox para Pasta', async () => {
                await page.getByLabel('Pasta 🍝').check();
                await expect(page.getByLabel('Pasta 🍝'), 'El checkbox no estaba seleccionado').toBeChecked();

            })

            await test.step('Puedo deseleccionar el checkbox para Pasta', async () => {
                await page.getByLabel('Pasta 🍝').uncheck();
                await expect(page.getByLabel('Pasta 🍝')).not.toBeChecked();
            })
            

            await test.step('Puedo seleccionar el radio button para No', async () => {
                await page.getByLabel('No').check();
                await expect(page.getByLabel('No'), 'El radiobutton no esta seleccionado').toBeChecked();
            })
            
        })
        
        test('Puedo seleccionar un item del Dropdown', async ({ page }) => {
            test.info().annotations.push({
                type: 'User story',
                description: 'Como usuario quiero poder seleccionar un deporte en el dropdown para poder ver los detalles de ese deporte'
            });
            await test.step('Dado que navego al Sandbox de Automation de free range testers', async () => {
                await page.goto('');
            })
            await test.step('Seleciono un deporte', async () => {
                await page.getByLabel('Dropdown').selectOption('Tennis');
            })

        })

        test('Los items del dropdown son los esperados', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de free range testers', async () => {
                await page.goto('');
            })

            await test.step('Valido qie la lista del dropdown tiene los deportes esperados', async () => {
                const deportesEsperados = ['Fútbol', 'Tennis', 'Basketball'];

                for(let opcion of deportesEsperados){
                    const elemento = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);
                    if(elemento){
                        console.log(`El elemento ${opcion} esta presente en el dropdown`);
                    } else {
                        throw new Error(`El elemento ${opcion} no esta presente en el dropdown`);
                    }
                }
            

            
            })
            
        })
        

        test('Puedo seleccionar un dia del dropdown Dias de la semana', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de free range testers', async () => {
                await page.goto('');
            })
            await test.step('Selecion un dia de la semana ', async () => {
                await page.getByRole('button', { name: 'Día de la semana' }).click();
                await page.getByRole('link', { name: 'Martes' }).click();
                
            })

        })

        test.skip('Puedo subir archivos a Automation @Snadbox', async ({ page }) => {
            await test.step('DAdo que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })

            await test.step('Agrego archivos para ser subidos', async () => {
                await page.getByLabel('Upload file').setInputFiles(['pahtArchivo.pdf', 'segundoArchivo.pdf', 'otrosArchivos.pdf']);  
                // Si queremos vaciar el campo de archivos
                // await page.getByLabel('Upload file').setInputFiles([]);    
            })
            
        })
        
        test.skip('Puedo hacer un drag and drop de elementos en Automation @Snadbox', async ({ page }) => {
            await test.step('DAdo que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })

            await test.step('Selecciono un dia de la semana en ', async () => {
                await page.getByTestId('DragFrom').dragTo(page.getByTestId('DropTo'));
            })
            
            
        })
        
        test.only('Valido la columna de la tabla estatica', async ({ page }) => {

            await test.step('DAdo que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })

            await test.step('Puedo validar los elementos para la columna Nombre de la tabla estatica', async () => {
                const valoresColumnaNombre = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', el => el.map(el => el.textContent));

                const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];

                expect(valoresColumnaNombre).toEqual(nombresEsperados);
            })
            await test.info().attach('screenshot', {
                body: await page.screenshot({ fullPage: true }),
                contentType: 'image/png',
            });
            
        })
        
        test('Valido la segunda columna de la tabla dinamica', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })

            await test.step('Valido que los valores cambiaron al hacer un reload a la web', async () => {
                const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', el => el.map(el => el.textContent));
                console.log(valoresTablaDinamica);
                await page.reload();

                const nuevosValoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', el => el.map(el => el.textContent));
                console.log(nuevosValoresTablaDinamica);
                expect(valoresTablaDinamica).not.toEqual(nuevosValoresTablaDinamica);
            })
            
        })

        test('Ejemplo de Soft assertions', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })

            await test.step('Valido que todos los elementos de los checkboxes son los correctos', async () => {
                await expect.soft(page.getByText('Pastas 🍝'), 'No se encontro el elemento Pasta').toBeVisible();
                await expect.soft(page.getByText('Pizza 🍕')).toBeVisible();
                await expect.soft(page.getByText('Hamburguesa 🍔')).toBeVisible();
                await expect.soft(page.getByText('Helados 🍧'), 'No se encontro el elemento Helados').toBeVisible();
                await expect.soft(page.getByText('Torta 🍰')).toBeVisible();
            })            
        })
        
        test('Validando dentro de un popup', async ({ page }) => {
            // const popupPromise = page.waitForEvent('popup');

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })

            await test.step('Cuando hago click en el boton popup', async () => {
                await page.getByRole('button', { name: 'Mostrar popup' }).click();
            })

            await test.step('Puedo validar un elemento dentro del popup', async () => {
                // const popup = await popupPromise;
                // await popup.waitForLoadState();
                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
                await page.getByRole('button', { name: 'Cerrar' }).click();
            })
            
            
        })
        
    })
    
})();
