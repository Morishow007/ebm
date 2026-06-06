Guia Sketchfab — passo a passo
1. Criar conta gratuita
Aceder a sketchfab.com → Sign Up → pode usar Google/GitHub.

2. Exportar o modelo do Revit
Via IFC (mantém dados BIM):
File → Export → IFC → formato IFC 2x3

Via FBX (mais simples, só geometria):
File → Export → FBX

3. Fazer upload no Sketchfab
No dashboard → Upload
Arrastar o ficheiro .ifc ou .fbx (limite: 200MB na conta gratuita)
O Sketchfab converte automaticamente — pode demorar 2–10 minutos conforme o tamanho
Preencher: Title, Description (usar palavras-chave: "EBM Engenharia", "Rio Grande RS")
Visibility → Public (necessário para o embed gratuito)
Guardar
4. Configurar o viewer no Sketchfab
No editor do modelo (após upload):

Background: Dark ou cor personalizada
Lighting: Studio ou exterior
Post-processing: Ativar SSAO (sombras de contato) para realismo
Clicar em Save Settings
5. Obter o Model ID
No URL do modelo: sketchfab.com/3d-models/nome-do-modelo-a1b2c3d4e5f6789

O ID é a string alfanumérica no final da URL.

6. Configurar no projeto
No ficheiro .env.local (criar na raiz do projeto se não existir):


VITE_SKETCHFAB_MODEL_ID=a1b2c3d4e5f6789
Reiniciar o servidor (npm run dev) — o viewer aparece em /projetos/3d.

7. Deploy
Em produção (Vercel/Netlify), adicionar a variável de ambiente VITE_SKETCHFAB_MODEL_ID nas configurações do projeto. Nenhum rebuild manual necessário — ao mudar de modelo, basta atualizar o ID na plataforma e fazer redeploy.