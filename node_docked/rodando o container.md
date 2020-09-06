#### Gerando a imagem com o nome "deive/node-docked" usando o arquivo na pasta atual "."
docker build -t deive/node-docked .

#### Exibindo as imagens disponíveis
docker images

#### Criando o container redirecionando a porta 3000 do container para a 3001 no host
docker run -d -p 3001:3000 --name container-docked deive/node-docked