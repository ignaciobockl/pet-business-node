import { execSync } from 'child_process';
import gradient from 'gradient-string';

const runPrepareScript = () => {
  try {
    console.clear();
    process.stdout.write(
      '\x1b[33m Ejecutando script de preparación...\x1b[0m\n\n'
    );

    process.stdout.write('⌛ (1/1) Instalando dependencias globales...');
    execSync('pnpm install --global eslint prettier');
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write('✅ (1/1) Dependencias globales instaladas\n');

    process.stdout.write(
      '⌛ (2/2) Verificando actualizaciones de dependencias...'
    );
    const updates = execSync('ncu');
    console.log(`\n${updates}`);
    process.stdout.write(
      '✅ (2/2) Actualizaciones de dependencias verificadas\n'
    );

    setTimeout(() => {
      const successMessage = gradient(
        '#7aecdd',
        '#ffffff',
        '#f78df7'
      )('Script de preparación ejecutado correctamente!');

      console.log(
        '\n═════════════════════════════════════════════════════════════'
      );
      console.log(`\n\x1b[32m✨ ${successMessage} \x1b[0m\n`);
      console.log(
        '\n═════════════════════════════════════════════════════════════\n'
      );

      console.log(
        '\x1b[33m❗ Asegúrate de revisar las actualizaciones de dependencias mencionadas anteriormente y sus implicaciones, especialmente en \x1b[31mcambios importantes.'
      );
      console.log('\x1b[33m❗ Para actualizarlas todas, ejecuta \x1b[0mncu -u');
      console.log(
        '\x1b[33m❗ Para actualizar solo una (o más) de ellas, ejecuta \x1b[0mncu [nombre(s) de la dependencia] -u\n'
      );
    }, 1000);
  } catch (e: unknown) {
    const error = e as Error;

    console.log(
      '\n═════════════════════════════════════════════════════════════'
    );
    console.error(' \n\x1b[31mScript de preparación FINALIZADO \x1b[0m\n');
    console.log(
      '═════════════════════════════════════════════════════════════\n'
    );
    console.error(`Registro de error: ${error.message}`);
  }
};

runPrepareScript();
