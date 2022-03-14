const fs = require('fs');
const path = require('path');

const envExamplePath = path.join(__dirname, '..', '.env.example');
const envPath = path.join(__dirname, '..', '.env');
const envPostPath = path.join(__dirname, 'post-local', '.env');

if(!fs.existsSync(envPath)) envPath = envExamplePath;

if(fs.existsSync(envPath)){

    //Remove arquivo de configuração para o docker post caso já exista
    if(fs.existsSync(envPostPath)){
        const envPostPathOld = envPostPath + '.old';
        if(fs.existsSync(envPostPathOld)) fs.unlinkSync(envPostPathOld);
        fs.copyFileSync(envPostPath, envPostPathOld);
        fs.unlinkSync(envPostPath);
    }

    fs.copyFileSync(envPath, envPostPath);
}

//Saida positiva sempre
process.exit(0);
