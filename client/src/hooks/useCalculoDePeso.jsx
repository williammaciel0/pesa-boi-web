export function useCalculoDePeso(perimetro = 0, genero = 0){
        if(perimetro >= 174 && perimetro <= 182 && genero == 'macho'){
            const resultado = perimetro * 2.8
            return resultado
        } else if(perimetro >= 186 && perimetro <= 189 && genero == 'femea'){
            const resultado = perimetro * 2.8
            return resultado
        } else if(perimetro >= 147 && perimetro <= 169 && genero == 'femea'){
            const resultado = 65.36 - (1.966*perimetro)+(0.01959*(perimetro*perimetro))+(0.00001691*(perimetro*perimetro*perimetro))
            return resultado
        } else {
            if(perimetro == 147 && genero == 'macho'){
                const resultado = 268
                return resultado
            } else if (perimetro == 148 && genero == 'macho'){
                const resultado = 276
                return resultado
            } else if (perimetro == 149 && genero == 'macho'){
                const resultado = 283
                return resultado
            } else if (perimetro == 150 && genero == 'macho'){
                const resultado = 288
                return resultado
            } else if (perimetro == 151 && genero == 'macho'){
                const resultado = 294
                return resultado
            } else if (perimetro == 152 && genero == 'macho'){
                const resultado = 283
                return resultado
            } else if (perimetro == 153 && genero == 'macho'){
                const resultado = 310
                return resultado
            } else if (perimetro == 154 && genero == 'macho'){
                const resultado = 316
                return resultado
            } else if (perimetro == 155 && genero == 'macho'){
                const resultado = 324
                return resultado
            } else if (perimetro == 156 && genero == 'macho'){
                const resultado = 330
                return resultado
            } else if (perimetro == 157 && genero == 'macho'){
                const resultado = 336
                return resultado
            } else if (perimetro == 158 && genero == 'macho'){
                const resultado = 343
                return resultado
            } else if (perimetro == 159 && genero == 'macho'){
                const resultado = 346
                return resultado
            } else if (perimetro == 160 && genero == 'macho'){
                const resultado = 352
                return resultado
            } else if (perimetro == 161 && genero == 'macho'){
                const resultado = 358
                return resultado
            } else if (perimetro == 162 && genero == 'macho'){
                const resultado = 363
                return resultado
            } else if (perimetro == 163 && genero == 'macho'){
                const resultado = 371
                return resultado
            } else if (perimetro == 164 && genero == 'macho'){
                const resultado = 381
                return resultado
            } else if (perimetro == 165 && genero == 'macho'){
                const resultado = 389
                return resultado
            } else if (perimetro == 166 && genero == 'macho'){
                const resultado = 395
                return resultado
            } else if (perimetro == 167 && genero == 'macho'){
                const resultado = 407
                return resultado
            } else if (perimetro == 168 && genero == 'macho'){
                const resultado = 411
                return resultado
            } else if (perimetro == 169 && genero == 'macho'){
                const resultado = 417.5
                return resultado
            } else if (perimetro == 170 && genero == 'macho'){
                const resultado = 426
                return resultado
            } else if (perimetro == 170 && genero == 'femea'){
                const resultado = 395
                return resultado
            } else if (perimetro == 171 && genero == 'macho'){
                const resultado = 436
                return resultado
            } else if (perimetro == 171 && genero == 'femea'){
                const resultado = 404
                return resultado
            } else if (perimetro == 172 && genero == 'macho'){
                const resultado = 443
                return resultado
            } else if (perimetro == 172 && genero == 'femea'){
                const resultado = 411
                return resultado
            } else if (perimetro == 173 && genero == 'macho'){
                const resultado = 449.5
                return resultado
            } else if (perimetro == 173 && genero == 'femea'){
                const resultado = 417
                return resultado
            } else if (perimetro == 174 && genero == 'macho'){
                const resultado = 456.5
                return resultado
            } else if (perimetro == 174 && genero == 'femea'){
                const resultado = 423
                return resultado
            } else if (perimetro == 175 && genero == 'macho'){
                const resultado = 463
                return resultado
            } else if (perimetro == 175 && genero == 'femea'){
                const resultado = 429
                return resultado
            } else if (perimetro == 176 && genero == 'macho'){
                const resultado = 477.5
                return resultado
            } else if (perimetro == 176 && genero == 'femea'){
                const resultado = 487.5
                return resultado
            } else if (perimetro == 178 && genero == 'macho'){
                const resultado = 487.5
                return resultado
            } else if (perimetro == 178 && genero == 'femea'){
                const resultado = 451.5
                return resultado
            } else if (perimetro == 179 && genero == 'femea'){
                const resultado = 461.5
                return resultado
            } else if (perimetro == 181 && genero == 'femea'){
                const resultado = 477.5
                return resultado
            } else if (perimetro == 183 && genero == 'macho'){
                const resultado = 530.5
                return resultado
            } else if (perimetro == 183 && genero == 'macho'){
                const resultado = 491.5
                return resultado
            } else if (perimetro == 184 && genero == 'macho'){
                const resultado = 539
                return resultado
            } else if (perimetro == 184 && genero == 'femea'){
                const resultado = 500
                return resultado
            } else if (perimetro == 185 && genero == 'macho'){
                const resultado = 548
                return resultado
            } else if (perimetro == 185 && genero == 'femea'){
                const resultado = 508
                return resultado
            } else {
                const resultado = ''
                return resultado
            }
        } 
    }