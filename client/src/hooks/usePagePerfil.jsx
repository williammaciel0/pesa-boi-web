import { useLocation, useNavigate } from 'react-router-dom';

export function usePagePerfil(id = 0, nome = '', senha = '', email = ''){
    const navigate = useNavigate();
    console.log(id, nome, senha, email)
    try {
        // const result = fetch(`http://localhost:3000/produtor?nome=${nome}&senha=${senha}`);
        // const dados = result.json()
        return navigate('/page_perfil', {
            state: {
                id: id,
                nome: nome,
                senha: senha,
                email: email
            }
        });
        
    } catch (error) {
        
    }
    
}