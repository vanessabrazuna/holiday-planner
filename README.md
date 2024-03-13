# Holiday Planner

## Componente VacationManager:

O componente VacationManager é o componente principal da aplicação, que gerencia a lista de planos de férias e permite aos usuários criar, atualizar e excluir planos de férias. Ele usa o hook useState para gerenciar o estado da lista de planos de férias e o hook useForm do react-hook-form para gerenciar o estado do formulário e a validação. O resolver zodResolver é usado para vincular o esquema de validação validationSchema ao formulário.

O componente VacationManager é renderizado com uma lista de planos de férias obtidos da API usando a função getAllVacations do componente Api. Cada plano de férias é exibido com o título, descrição, data, local e número de participantes. Os usuários podem criar um novo plano de férias clicando no botão "Novo Plano de Férias" e preenchendo o formulário. Os usuários também podem atualizar um plano de férias existente clicando no botão "Editar" ao lado de um plano de férias existente e editando as informações no formulário. Os usuários podem excluir um plano de férias clicando no botão "Excluir" ao lado de um plano de férias existente.

## Componente Vacation:

O componente Vacation é um componente React que representa um plano de férias individual. Ele recebe as informações do plano de férias como uma prop e exibe-as com os títulos, descrição, data, local e número de participantes. O componente Vacation também pode ser usado para editar um plano de férias existente, se a prop isEditing for verdadeira. Nesse caso, o componente Vacation renderiza um formulário com os campos preenchidos com as informações do plano de férias. Os usuários podem editar as informações e clicar no botão "Salvar" para atualizar o plano de férias.

## Componente Validation:

O componente Validation é um componente React que contém o esquema de validação para o formulário de plano de férias. Ele usa a biblioteca zod para definir o esquema de validação e o hook useForm do react-hook-form para vincular o esquema de validação ao formulário. O componente Validation é usado no componente VacationManager para validar as informações do formulário antes de enviá-las para a API.

### Funcionalidade da UI:

A UI da aplicação é composta por três componentes principais: VacationManager, Vacation e Validation. O componente VacationManager é o componente principal da aplicação, que exibe a lista de planos de férias e o formulário para criar e atualizar planos de férias. O componente Vacation é usado para exibir as informações de um plano de férias individual e pode ser usado para editar um plano de férias existente. O componente Validation é usado para validar as informações do formulário antes de enviá-las para a API.

Para usar a aplicação, os usuários podem abrir a página da aplicação no navegador e verão a lista de planos de férias obtidos da API. Os usuários podem criar um novo plano de férias clicando no botão "Novo Plano de Férias" e preenchendo o formulário com as informações necessárias. Os usuários também podem atualizar um plano de férias existente clicando no botão "Editar" ao lado de um plano de férias existente e editando as informações noformulário. Os usuários podem excluir um plano de férias clicando no botão "Excluir" ao lado de um plano de férias existente. A aplicação usa a biblioteca zod para validar as informações do formulário e garantir que as informações sejam válidas antes de enviá-las para a API.O componente VacationManager pode ser atualizado para incluir o hook useForm do react-hook-form e o esquema de validação validationSchema do componente Validation. O componente Vacation pode ser atualizado para aceitar a prop isEditing e renderizar um formulário para editar um plano de férias existente.