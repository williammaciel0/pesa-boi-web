const calculoDoPeso = (perimetro, genero) => {
    const pesosAninhados = [[174, 182, 'macho'], [186, 189, 'femea'], [147, 169, 'femea']];
    
    for(let i = 0; i < pesosAninhados.length; i++){
        for(let j = 0; j < pesosAninhados[i].length; j++){
            const tamanho = pesosAninhados[i][1] - pesosAninhados[i][0]
            for(let result = 0; result <= tamanho; result++){
                console.log(pesosAninhados[i][0]++)
            
            }
             
        }
    }
}

calculoDoPeso(123,'macho')