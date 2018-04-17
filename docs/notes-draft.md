# coisas a melhorar:
- Design - cores, alinhamentos, disposição da informação, tipografia...
- temas de CSS, ter o seu tema com paletes de cor, tipografias, etc
- adicionar debounce ao loader
- normalizacao da store
- substituir arrays por objetos na store
- unique key para errors
- usar placeholder images para layout não alterar-se quando a imagem do jogador é recebida
- Acessibilidade (meta tags, aria labels...)
- Responsiveness (ocultar algumas colunas da listagem talvez?)
- Tornar isto numa PWA
- Separar componentes em containers e components

# Possivel setup mais simples
- Webpack 4 com o `mode=production|development`
 - desnecessário `configs` por environment
- Redux é desnecessário. Smart components é suficiente
- usar CSS com autoprefixer (postcss) em vez de styled components
