export const pageComponentTemplate = (name, selector) =>
  `import { IonicPage } from "ionic-angular"
import { Component } from "@angular/core"

@IonicPage()
@Component({
  templateUrl: "${selector}.html"
})
export class ${name}Page {}`

export const pageModuleTemplate = (name, selector) =>
  `import { NgModule } from "@angular/core"
import { IonicPageModule } from "ionic-angular"
import { ${name}Page } from "./${selector}"

@NgModule({
  declarations: [${name}Page],
  entryComponents: [${name}Page],
  imports: [IonicPageModule.forChild(${name}Page)]
})
export class ${name}PageModule {}`

export const pageHtmlTemplate = name =>
  `<ion-header>
  <ion-navbar>
    <ion-title>${name}</ion-title>
  </ion-navbar>
</ion-header>
<ion-content padding>

</ion-content>
`

export const pageScssTemplate = selector =>
  `${selector} {
}`
