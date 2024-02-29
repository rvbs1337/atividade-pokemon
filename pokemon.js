const fs = require('fs');

var arrayPokemon = [];

async function escreverArquivoCallback(nomeArquivo, dados) {
    try {
        console.log(`Escrevendo dados no arquivo ${nomeArquivo}...`)
        fs.writeFile(nomeArquivo, dados)
        console.log(`Dados escritos no arquivo ${nomeArquivo} com sucesso.`);
    } catch (error) {
        console.error(`Erro ao escrever dados no arquivo ${nomeArquivo}:`, error)
    }
}

async function criaArrayPokemon(linkPokemon) {
    try {
        const pokemonApi = await fetch(linkPokemon);
        const resposta = await pokemonApi.json();
        const pokemonInfo = {
            nome: resposta.name,
            tipos: resposta.types.map(type => type.type.name),
            peso: resposta.weight,
            altura: resposta.height,
            Numero_Dex: resposta.order,
            sprite: resposta.sprites.back_shiny
        }
        return pokemonInfo;
    } catch (error) {
        console.log("Falha ao criar buscar pokemon")
    }
}

async function getPokemonDataWithCallbacks() {
    try {
        console.log("Aguardando retorno da Poke API")
        const pokemonApi = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        const resposta = await pokemonApi.json();

        for (i in resposta.results) {
            arrayPokemon.push(await criaArrayPokemon(resposta.results[i].url))
        }

        escreverArquivoCallback("pokemon.json", JSON.stringify(arrayPokemon));

    } catch (error) {
        console.log("MAMOU OTARIO", error);
    }
}

getPokemonDataWithCallbacks();