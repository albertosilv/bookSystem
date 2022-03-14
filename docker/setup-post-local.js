const fs = require('fs');
const path = require('path');

const envExamplePath = path.join(__dirname, '..', '.env.example');
const envPath = path.join(__dirname, '..', '.env');
const envMongoPath = path.join(__dirname, 'mongo-local', '.env');

if(!fs.existsSync(envPath)) envPath = envExamplePath;

if(fs.existsSync(envPath)){

    //Remove arquivo de configuração para o docker mongodb caso já exista
    if(fs.existsSync(envMongoPath)){
        const envMongoPathOld = envMongoPath + '.old';
        if(fs.existsSync(envMongoPathOld)) fs.unlinkSync(envMongoPathOld);
        fs.copyFileSync(envMongoPath, envMongoPathOld);
        fs.unlinkSync(envMongoPath);
    }

    fs.copyFileSync(envPath, envMongoPath);
}

//Saida positiva sempre
process.exit(0);
