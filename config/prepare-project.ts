import { execSync } from 'child_process';
import gradient from 'gradient-string';

const runPrepareScript = () => {
  try {
    console.clear();
    process.stdout.write('\x1b[33m🔧 Running prepare script...\x1b[0m\n\n');

    process.stdout.write('⌛ (1/2) Installing global dependencies...');
    execSync('pnpm add --global eslint prettier ncu');
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);

    process.stdout.write('⌛ (2/2) Verifying dependency updates...');
    const updates = execSync('ncu');
    console.log(`\n${updates}`);
    process.stdout.write('✅ (2/2) Verified dependency updates\n');

    setTimeout(() => {
      const successMessage = gradient(
        '#7aecdd',
        '#ffffff',
        '#f78df7'
      )('Preparation script executed successfully!');

      console.log(
        '\n═════════════════════════════════════════════════════════════'
      );
      console.log(`\n\x1b[32m✨ ${successMessage} \x1b[0m\n`);
      console.log(
        '\n═════════════════════════════════════════════════════════════\n'
      );

      console.log(
        '\x1b[33m❗ Be sure to review the dependency updates mentioned above and their implications, especially in \x1b[31mimportant changes.'
      );
      console.log('\x1b[33m❗ To update them all, run \x1b[0mncu -u');
      console.log(
        '\x1b[33m❗ To update just one (or more) of them, run \x1b[0mncu [dependency name(s)] -u\n'
      );
    }, 1000);
  } catch (e: unknown) {
    const error = e as Error;

    console.log(
      '\n═════════════════════════════════════════════════════════════'
    );
    console.error(' \n\x1b[31mPreparation script FINISHED \x1b[0m\n');
    console.log(
      '═════════════════════════════════════════════════════════════\n'
    );
    console.error(`Error log: ${error.message}`);
  }
};

runPrepareScript();
