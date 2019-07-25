export class PanelData {
  panelTitle: string;
  panelItemNames: string[];

   constructor(panelTitle?: string, panelItemNames?: string[]) {
    this.panelTitle = panelTitle;
    this.panelItemNames = panelItemNames;
  }
}
