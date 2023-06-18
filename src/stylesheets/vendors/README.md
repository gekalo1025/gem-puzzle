# Vendors

Most projects will have a `vendors/` folder containing all the CSS files from external libraries and frameworks – Normalize, Bootstrap, jQueryUI, FancyCarouselSliderjQueryPowered, and so on. Putting those aside in the same folder is a good way to say “Hey, this is not from me, not my code, not my responsibility”.

If you have to override a section of any vendor, I recommend you have an 8th folder called `vendors-extensions/` in which you may have files named exactly after the vendors they overwrite. For instance, `vendors-extensions/_bootstrap.scss` is a file containing all CSS rules intended to re-declare some of Bootstrap’s default CSS. This is to avoid editing the vendor files themselves, which is generally not a good idea.

Reference: [Sass Guidelines](https://sass-guidelin.es/) > [Architecture](https://sass-guidelin.es/#architecture) > [Vendors folder](https://sass-guidelin.es/#vendors-folder)

В большинстве проектов будет папка «vendors/», содержащая все файлы CSS из внешних библиотек и фреймворков — Normalize, Bootstrap, jQueryUI, FancyCarouselSliderjQueryPowered и т. д. Поместить их в одну папку — хороший способ сказать: «Эй, это не от меня, не мой код, не моя ответственность».

Если вам нужно переопределить раздел любого поставщика, я рекомендую вам иметь 8-ю папку под названием «vendors-extensions/», в которой у вас могут быть файлы, названные точно в честь поставщиков, которых они перезаписывают. Например, `vendors-extensions/_bootstrap.scss` — это файл, содержащий все правила CSS, предназначенные для повторного объявления некоторых CSS по умолчанию Bootstrap. Это делается для того, чтобы избежать редактирования самих файлов поставщиков, что, как правило, не является хорошей идеей.
