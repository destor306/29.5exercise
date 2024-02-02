/** Command-line tool to generate Markov text. */
const fs = require('fs');
const process =require('process');
const {MarkovMachine} = require('./markov');
const axios = require('axios');

function generateText(data){
    let result = new MarkovMachine(data);
    console.log(result.makeText());
}

function extract(path, format){
    if (format=='file'){
        fs.readFile(path, 'utf8', function(err,data){
            if(err){
                console.error(`Error reading ${path}: ${err}`)
                process.exit(1);
            }
            
            console.log(`generated text from ${format} ${path}`)
            generateText(data);
        })
    }
    else if (format=='url'){
        webCat(path)
    }
    
}


async function webCat(url){
    try {
        let resp = await axios.get(url);
        console.log(`generated text from url ${url}`)
        generateText(resp.data);
    }
    catch(err){
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

extract(process.argv[3], process.argv[2]);