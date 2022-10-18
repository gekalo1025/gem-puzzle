# Pages

If you have page-specific styles, it is better to put them in a `pages/` folder, in a file named after the page. For instance, it’s not uncommon to have very specific styles for the home page hence the need for a `_home.scss` file in `pages/`.

_Note — Depending on your deployment process, these files could be called on their own to avoid merging them with the others in the resulting stylesheet. It is really up to you._

Reference: [Sass Guidelines](https://sass-guidelin.es/) > [Architecture](https://sass-guidelin.es/#architecture) > [Pages folder](https://sass-guidelin.es/#pages-folder)

Если у вас есть стили, специфичные для страницы, лучше поместить их в папку `pages/`, в файл с именем страницы. Например, не редкость иметь очень специфические стили для домашней страницы, поэтому необходим файл `_home.scss` в `pages/`.

_Примечание. В зависимости от вашего процесса развертывания эти файлы могут вызываться сами по себе, чтобы избежать их объединения с другими в результирующей таблице стилей. Это действительно зависит от вас._
