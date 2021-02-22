'use babel';

import AtomColorTabsView from './atom-color-tabs-view';
import {
  CompositeDisposable
} from 'atom';

export default {

  atomColorTabsView: null,
  modalPanel: null,
  subscriptions: null,
  config: {
    "File Extension Colors": {
      "description": "Please input any custom file extension and color combinations you may have.",
      "type": "string",
      "default": "css,green"
    }
  },

  activate(state) {
    this.atomColorTabsView = new AtomColorTabsView(state.atomColorTabsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomColorTabsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-color-tabs:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomColorTabsView.destroy();
  },

  serialize() {
    return {
      atomColorTabsViewState: this.atomColorTabsView.serialize()
    };
  },

  toggle() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let reversed = selection.split('').reverse().join('')
      editor.insertText(reversed)
    }
    console.log('AtomColorTabs was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};