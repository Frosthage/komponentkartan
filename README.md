# Komponentkartan

Grafiska komponenter för ersättningssystem inom VGR, implementerade i Angular 4

## Komma igång

### 0. Förutsättningar
Komponentkartan förutsätter att Angular är konfigurerat. Se [Demoprojektet](https://github.com/Vastra-Gotalandsregionen/komponentkartan-demo) för en exempeluppsättning.

### 1. Installera vgr-komponentkartan via **npm**
```npm
npm install vgr-komponentkartan
```

### 2a (Om du använder SASS)
I din SCSS-fil, importera komponentkartan.
```css
@import "../node_modules/vgr-komponentkartan/Content/komponentkartan.scss";
```

### 2b (Om du inte använder SASS)
I index.html (eller liknande)
```html
    <LINK href="node_modules/vgr-komponentkartan/Content/komponentkartan.css" rel="stylesheet" type="text/css">
```

### 3 Konfigurera JQuery.Scrollbar
För närvarande används [JQuery.Scrollbar](https://github.com/gromo/jquery.scrollbar), en JQuery-plugin för att hantera scrollning i komponenterna. Detta medför ett beroende till JQuery. Dettta innebär att du måste inkludera JQuery samt JQuery.Scrollbar i index.html.

Detta är något vi hoppas undvika i framtida releaser.

```html

<LINK href="node_modules/jquery.scrollbar/jquery.scrollbar.css" rel="stylesheet" type="text/css">
<script src="node_modules/jquery/dist/jquery.min.js" type="text/javascript"></script>
<script src="node_modules/jquery.scrollbar/jquery.scrollbar.min.js"></script>
```

## Kod
Koden är skriven i html, typescript och Sass.

### Tester
Samtliga komponenter är täckta av tester via Jasmine.

Testerna är uppdelade i två typer, tester med Angular och tester utan Angular. Tester **med** Angular benämns *komponent*.**angular**.spec.ts. Tester **utan** Angular namnges endast med *komponent*.spec.ts


## Byggt med

* [Angular 4](https://angular.io/) - Web framework
* [Typescript](https://www.typescriptlang.org/) - Javascript that scales
* [SASS](sass-lang.com) - SASS - Syntactically Awesome Style Sheets
* [NPM](https://www.npmjs.com/) - Dependency Management
* CSS struktureras enligt ITCSS. Se [ITCSS: SCALABLE AND MAINTAINABLE CSS ARCHITECTURE] (https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) för mer information.


## Versioner

Vi använder [SemVer](http://semver.org/) för versionering.

## Författare
VGR IT

## Licens

TODO

