
const USER_ERROR = {   // erros de usuário
    ALREADY_EXIST: {
        statusCode: 409,
        message: "Usuário já existe!"
    },
    DOESNT_EXIST: {
        statusCode: 404,
        message: "Usuário não existe!"
    },
    FORBIDDEN_EDIT: {
        statusCode: 403,
        message: "Ação não permitida!"
    },
    INVALID_ID: {
        statusCode: 400,
        message: "ID inválido!"
    }, 
    MISSING_REQUIRED_FIELDS: {
        statusCode: 400,
        message: "Todos os campos obrigatórios devem ser fornecidos!"
    },
    INCORRECT_CURRENT_PASSWORD: { 
        statusCode: 403,
        message: "Senha atual inserida errada!"
    },
    MISSING_OLD_PASSWORD: { 
        statusCode: 400,
        message: "É preciso inserir a senha antiga"
    },
    INVALID_OLD_PASSWORD: { 
        statusCode: 401,
        message: "A senha antiga não confere"
    },
    INVALID_LOGIN: {
        statusCode: 401,
        message: "Credenciais inválidas"
    },
    INVALID_MATRICULA: {
        statusCode: 406,
        message: "A matrícula deve conter 8 dígitos"
    },
    INVALID_EMAIL: {
        statusCode: 412,
        message: "Email inválido"
    },
    INVALID_NAME: {
        statusCode: 400,
        message: "Nome inválido. O nome deve ter no mínimo 7 caracteres e não pode conter números!"
    },
    NOT_ADMIN: {
        statusCode: 401,
        message: "O usuário não é admin"
    },
    NOT_STUDENT: {
        statusCode: 401,
        message: "O usuário não é aluno"
    },
    NOT_PROFESSOR: {
        statusCode: 401,
        message: "O usuário não é professor"
    },
}

const DISCIPLINA_ERROR = {   // erros de disciplina
    ALREADY_EXIST: {
        statusCode: 409,
        message: "Já existe uma disciplina com esse nome!"
    },
    DOESNT_EXIST: { 
        statusCode: 404,
        message: "Disciplina não existe!"        
    },
    NAME_CONFLICT: {
        statusCode: 400,
        message: "O nome informado é diferente do que consta no banco!"
    }, 
    ID_REQUIRED: {
        statusCode: 400,
        message: "É necessário o ID da disciplina!"
    },
    MISSING_FIELDS: {
        statusCode: 400,
        message: "É necessário enviar o nome ou professor ID para editar a disciplina!"
    },
    INVALID_NAME: {
        statusCode: 422,
        message: "Nome inválido. O nome deve ter no mínimo 3 caracteres!"
    },
    NOT_HAVE: {
        statusCode: 404,
        message: "O usuário não possui disciplinas"
    },
}

const RELATION_ERROR = {  // erros de relação aluno disciplina
    ALREADY_EXIST: {
        statusCode: 400,
        message: 'Relação de aluno com disciplina já existe!',
    },
    DOESNT_EXIST: { 
        statusCode: 404,
        message: "Disciplina ou usuário não existe!"        
    },
    DOESNT_EXIST_RELATION: { 
        statusCode: 404,
        message: "Disciplina e usuário não estão relacionados"        
    },

}

const TOKEN_ERROR = {  // erros de token
    DOESNT_EXIST: { 
        statusCode: 404,
        message: "Token não está atribuído a nenhum usuário"        
    },

};

const REFRESH_TOKEN_ERROR = {  // erros de REFRESH token
    DOESNT_EXIST: { 
        statusCode: 404,
        message: "O refreshtoken não foi encontrado no banco"        
    },

};

const QUIZZ_ERROR = {  // erros de quizzes
    DOESNT_EXIST: { 
        statusCode: 404,
        message: "O QUIZZ não foi encontrado"        
    },
    CREATE_ERROR: { 
        statusCode: 500,
        message: "Erro ao criar o quizz"        
    },

};

module.exports = {USER_ERROR, DISCIPLINA_ERROR, RELATION_ERROR, TOKEN_ERROR, REFRESH_TOKEN_ERROR, QUIZZ_ERROR}