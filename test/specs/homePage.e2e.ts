import { browser } from '@wdio/globals';

describe('Home Page', () => {
  it('should load the login page', async () => {
    await browser.url('/');
    
    const title = await browser.getTitle();
    console.log(`Page title is: ${title}`);
    
    // Verificar que estamos en la página de inicio
    const headingText = await $('h1').getText();
    expect(headingText).toContain('Aplicación Demo Dirección de Seguridad Pública Municipal');
    
    // Verificar que el formulario de login está presente
    const emailField = await $('#email');
    const passwordField = await $('#password');
    const loginButton = await $('button[type="submit"]');
    
    expect(await emailField.isExisting()).toBe(true);
    expect(await passwordField.isExisting()).toBe(true);
    expect(await loginButton.isExisting()).toBe(true);
    
    // Tomar una captura de pantalla
    await browser.saveScreenshot('./errorShots/home-page.png');
  });

  it('should show login error with invalid credentials', async () => {
    await browser.url('/');
    
    // Intentar iniciar sesión con credenciales incorrectas
    const emailField = await $('#email');
    const passwordField = await $('#password');
    const loginButton = await $('button[type="submit"]');
    
    await emailField.setValue('wrong@example.com');
    await passwordField.setValue('wrongpassword');
    await loginButton.click();
    
    // Esperar a que aparezca el mensaje de error
    const errorAlert = await $('.MuiAlert-root');
    await errorAlert.waitForExist({ timeout: 5000 });
    
    // Verificar el mensaje de error
    expect(await errorAlert.getText()).toContain('Credenciales inválidas');
    
    // Tomar una captura de pantalla
    await browser.saveScreenshot('./errorShots/login-error.png');
  });
});
